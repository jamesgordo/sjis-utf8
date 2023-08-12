const fs = require("fs");
const iconv = require("iconv-lite");
const detectCharacterEncoding = require("detect-character-encoding");
const chalk = require("chalk");

const sjisUtf8 = async (source, output, encoding = "UTF8") => {
  return await new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(source);
    const outputFilename = output || `converted-${source}`;
    const { encoding: sourceEncoding } = detectCharacterEncoding(fileBuffer);
    const streamReader = fs.createReadStream(source);
    const streamWriter = fs.createWriteStream(outputFilename);

    streamReader
      .pipe(iconv.decodeStream(sourceEncoding))
      .pipe(iconv.encodeStream(encoding))
      .pipe(streamWriter);

    streamWriter.on("finish", () => {
      resolve(outputFilename);
      console.log(chalk.bold.green(`Encoding updated successfully!`));
      console.log(`File created ${chalk.bold(outputFilename)}.\n`);
    });
    streamWriter.on("error", (err) => reject(err));
  });
};

module.exports = sjisUtf8;
