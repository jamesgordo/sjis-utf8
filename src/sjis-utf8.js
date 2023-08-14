const fs = require("fs");
const iconv = require("iconv-lite");
const detectCharacterEncoding = require("detect-character-encoding");
const path = require("path");

const sjisUtf8 = async (source, output, encoding = "UTF8") => {
  const input = fs.statSync(path.resolve(source));
  const target = output && fs.existsSync(path.resolve(output)) ? fs.statSync(path.resolve(output)) : null;

  if (input.isDirectory()) {
    throw Error(
      "Unable to convert a directory. Please specify the source file, not the directory."
    );
  }

  return await new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(source);
    const inputDir = path.dirname(path.resolve(source));
    let outputFilename =
      output ||
      path.resolve(inputDir, `converted-${source.split("/").slice(-1)[0]}`);
    if (target && target.isDirectory())
      outputFilename = path.resolve(
        path.resolve(output),
        `converted-${source.split("/").slice(-1)[0]}`
      );
    const { encoding: sourceEncoding } = detectCharacterEncoding(fileBuffer);
    const streamReader = fs.createReadStream(source);
    const streamWriter = fs.createWriteStream(outputFilename);

    streamReader
      .pipe(iconv.decodeStream(sourceEncoding))
      .pipe(iconv.encodeStream(encoding))
      .pipe(streamWriter);

    streamWriter.on("finish", () => resolve(outputFilename));
    streamWriter.on("error", (err) => reject(err));
  });
};

module.exports = sjisUtf8;
