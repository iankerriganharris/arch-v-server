import fetch from 'node-fetch';
global.fetch = fetch;
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import { readFile } from '../utils/filesystem';

class Classification {
  constructor() {
    this.inputWidth = 224;
    this.inputHeight = 224;
    this.inputNodeName = 'Placeholder';
    this.outputNodeName = 'final_result';
    this.preprocessDivisor = tf.scalar(255 / 2);
    this.modelUrl = 'https://s3-us-west-2.amazonaws.com/arch-v/public/tfjs-models/mobilenet_v2_classification/tensorflowjs_model.pb';
    this.weightsUrl = 'https://s3-us-west-2.amazonaws.com/arch-v/public/tfjs-models/mobilenet_v2_classification/weights_manifest.json';
    this.labelsUrl = 'https://s3-us-west-2.amazonaws.com/arch-v/public/etc/style_labels.txt';
  }

  load = async () => {
    this.model = await tf.loadFrozenModel(this.modelUrl, this.weightsUrl);
    // const labelsBuffer = await readFile(this.labelsUrl);
    const labelsBuffer = fetch('https://s3-us-west-2.amazonaws.com/arch-v/public/etc/style_labels.txt');
    this.labels = labelsBuffer.toString().split('\n');
  }

   prepImage = async (img) => {
    const tfImg = await tf.fromPixels(img)
    const smallImg = tf.image.resizeBilinear(tfImg, [this.inputWidth, this.inputHeight])
    const preprocessedImg = tf.div(
      tf.sub(smallImg.asType('float32'), this.preprocessDivisor),
      this.preprocessDivisor);
    const preppedImage =
      preprocessedImg.reshape([-1, ...preprocessedImg.shape]);
    this.image = preppedImage;
  }

  predict = () => {
    this.logits = this.model.execute(
      {[this.inputNodeName]: this.image}, this.outputNodeName);
    const predictions = tf.tidy(() => {
      return tf.softmax(this.logits);
    });
    this.predictions = predictions.dataSync();
    predictions.dispose();
  }

  makeTopK = (k) => {
    let predictionList = [];
    for (let i = 0; i < this.predictions.length; i++) {
      predictionList = [...predictionList, {value: this.predictions[i], index: i}]
    }
    this.topK = predictionList
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, k);
  }

  labelTopK = () => {
    this.labeledTopK = this.topK.map(k => {
      return {label: this.labels[k.index], value: k.value}
    })
  }

  output = () => {
    return this.labeledTopK;
  }

}

export default Classification;
