# Welcome to npm-get-packages 👋

Scan directories to find out all of dependencies and devDependencies of npm packages

[NPM](https://www.npmjs.com/package/npm-get-packages)
[GITHUB](https://github.com/xSyki/npm-get-packages)

## To run

```bash
npx npm-get-packages -p ~/Documents/Projects/npm-get-packages
```

### Results

```bash
info: Found npm-get-packages in /Users/mikolajsykula/Documents/Projekty/Programowanie/npm-get-packages} with 2 dependencies and 14 devDependencies
info: Found 2 dependencies and 14 devDependencies
{
    "dependencies": [
        "commander",
        "winston"
    ],
    "devDependencies": [
        "@types/jest",
        "@types/node",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-node",
        "eslint-plugin-prettier",
        "jest",
        "lint-staged",
        "prettier",
        "ts-jest",
        "ts-node",
        "typescript"
    ]
}
```

## To run with out

```bash
npx npm-get-packages -p ~/Documents/Projects/npm-get-packages ./
```

## To install

```bash
npm i -g npm-get-packages
```

## Documentation

```bash
Usage: npm-get-packages [options]

NPM get packages is a tool to get all dependencies and devDependencies from a directory
Author: xSyki

Example: npm-get-packages -p ~/Documents/Projects/npm-get-packages ./

Options:
  -V, --version      output the version number
  -p, --path <path>  Specify start directory of scan (default: "/")
  -o, --out <out>    Specify out json direction
  -d, --deep         Deep scan. Include also dependencies of your dependencies (default: false)
  -h, --help         display help for command
```

## Contribute

All contributions are welcome. General instructions on _how_ to contribute are in [CONTRIBUTING](CONTRIBUTING.md).
