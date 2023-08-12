#!/usr/bin/env node
const { program } = require("commander");
const sjisUtf8 = require("./sjisUtf8");

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
    "The target encoding of the converted File."
  );

program.parse(process.argv);

const options = program.opts();
const { file, output, encoding } = options;

if (file) sjisUtf8(file, output, encoding);
