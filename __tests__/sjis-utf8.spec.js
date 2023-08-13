const path = require("path");
const exec = require("child_process").exec;
const fs = require("fs");

const cli = (args, cwd) => {
  return new Promise((resolve) => {
    exec(
      `node ${path.resolve("./bin/index")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      }
    );
  });
};

test("Should return error if no input file specified.", async () => {
  let result = await cli([], ".");
  expect(result.code).toBe(1);
  expect(result.stderr).toBe(
    "error: required option '-f, --file <filePath>' not specified\n"
  );
});

test("Should return error if input file does not exist.", async () => {
  let result = await cli(["-f non-existing.csv"], ".");
  expect(result.stdout.includes("no such file or directory")).toBe(true);
});

test("Should return error if input is a directory.", async () => {
  const result = await cli(["-f src"], ".");
  expect(result.stdout).toBe(
    "Unable to convert a directory. Please specify the source file, not the directory.\n"
  );
});

test("Should return the converted file with specified output filename.", async () => {
  const outputFile = "converted.csv";
  const result = await cli(
    ["-f ./__tests__/test.csv", `-o ${outputFile}`],
    "."
  );
  const message = `Encoding updated successfully!\nFile created ${outputFile}\n\n`;

  expect(fs.existsSync(outputFile)).toBe(true);
  expect(result.stdout).toBe(message);
  fs.unlinkSync(outputFile); // remove test file
});

test("Should return the converted file without specified output filename.", async () => {
  const inputFile = "test.csv";
  // `converted- prefix is added to input filename
  const outputFile = `converted-${inputFile}`;
  const outputFilePath = path.resolve(process.cwd(), "__tests__", outputFile);
  const result = await cli(["-f ./__tests__/test.csv"], ".");
  expect(fs.existsSync(outputFilePath)).toBe(true);
  expect(result.stdout.includes(outputFile)).toBe(true);
  const fileContent = fs.readFileSync(outputFilePath, {
    encoding: "utf8",
    flag: "r",
  });
  expect(fileContent.includes("こんにちは"));
  fs.unlinkSync(path.resolve(process.cwd(), "__tests__", outputFile)); // remove test file
});
