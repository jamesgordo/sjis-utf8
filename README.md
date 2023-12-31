# sjis-utf8

A small Node CLI for converting Shift-JIS encoded file into a UTF-8 encoded file.

## Usage

To convert then encoding of a file e.g `sjis-file.csv`, run the following command.

```
npx sjis-utf8 -f sjis-file.csv -o converted.csv

# Expected Output
Encoding updated successfully!
File created converted.csv
```

Below are the available options for the `sjis-utf8` command.

```
Usage: sjis-utf8 [options]

Options:
  -V, --version            output the version number
  -f, --file <filePath>    The path of the File you want to convert.
  -o, --output <filePath>  The path where the converted File will be saved.
  -e, --encoding <value>   The target encoding of the converted File. (default: "UTF8")
  -h, --help               display help for command
```

## Test

Run the following command in the terminal

```
npm run test
```
