import Classification from '../models/classification.model';
import Canvas from 'canvas-prebuilt';
import sizeOf from 'image-size';
import { readFile } from '../utils/filesystem';

exports.hello = (req, res) => {
  res.status(200)
  return res.json({ label: 'OK'})
}

exports.main = async (req, res) => {
  const uploadData = await readFile(req.file.path, 'binary');

  const img = new Canvas.Image;
  img.src = uploadData;
  const dimensions = sizeOf(uploadData)
  const canvas = new Canvas.Canvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height)
  
  const classification = new Classification;
  await classification.load();
  await classification.prepImage(canvas)
  await classification.predict()
  classification.makeTopK(5)
  classification.labelTopK()

  res.status(200)
  return res.json(classification.output())
}