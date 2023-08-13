#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const sjisUtf8 = require("../src/sjis-utf8");

(async () => {
  program
    .name("sjis-utf8")
    .description(
      "A small Node CLI for converting Shift-JIS encoded file into a UTF-8 encoded file."
    )
    .version("1.0.0")
    .requiredOption(
      "-f, --file <filePath>",
      "The path of the File you want to convert."
    )
    .option(
      "-o, --output <filePath>",
      "The path where the converted File will be saved."
    )
    .option(
      "-e, --encoding <value>",
      "The target encoding of the converted File.",
      "UTF8"
    );

  program.parse(process.argv);

  const options = program.opts();
  const { file, output, encoding } = options;
  await sjisUtf8(file, output, encoding)
    .then((convertedFile) => {
      console.log(chalk.bold.green(`Encoding updated successfully!`));
      console.log(`File created ${chalk.bold(convertedFile)}\n`);
    })
    .catch((e) => console.log(chalk.bold.red(e.message)));
})();
