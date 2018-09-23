
import Classification from '../models/classification.model';
import Canvas from 'canvas';
import sizeOf from 'image-size';
import getPixels from 'get-pixels';
import { readFile } from '../utils/filesystem';
import fs from 'fs';

exports.hello = (req, res) => {
  res.status(200)
  return res.json({ label: 'OK'})
}

exports.load = (req, res) => {
  const classification = new Classification;
  classification.load();
  res.status(200)
  return res.json({ label: 'Processed'})
}

exports.main = async (req, res) => {
  const upload = await readFile(req.file.path, 'binary')

  const dimensions = sizeOf(upload)
  const classification = new Classification;
  await classification.load();

  const img = new Canvas.Image;
  img.src = upload;
  const canvas = new Canvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height)

  await classification.prepImage(canvas)
  await classification.predict()
  classification.makeTopK(5)
  classification.labelTopK()

  

  res.status(200)
  return res.json(classification.output())
}