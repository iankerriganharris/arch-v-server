import fs from 'fs';

const readFile = (path, opts = 'utf8') =>
    new Promise(resolve => {
      const stream = fs.createReadStream(path, {encoding: opts});
      let chunks = [];
      let totalLength = 0;
      stream.on('data', chunk => {
        const newBuffer = Buffer.from(chunk, opts)
        totalLength += newBuffer.length;
        chunks = [...chunks, newBuffer]
      });
      stream.on('end', () => {
        return resolve(Buffer.concat(chunks), totalLength);
      })
      stream.on('error', (err) => console.log(err))
    })

module.exports = {
    readFile
}