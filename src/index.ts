import { Command } from 'commander'
import { IOptions } from './types/options'
import logger from './utils/logger'
import { lookForRepo } from './utils/lookForRepo'
import { writeFileSync } from 'fs'

const packageJson = require('../package.json')
const version: string = packageJson.version

const program = new Command()

program
    .name('npm-get-packages')
    .description(
        `NPM get packages is a tool to get all dependencies and devDependencies from a directory
Author: xSyki

Example: npm-get-packages -p ~/Documents/Projects/npm-get-packages ./`
    )
    .version(version)
    .option('-p, --path <path>', 'Specify start directory of scan', '/')
    .option('-o, --out <out>', 'Specify out json direction')
    .option(
        '-d, --deep',
        'Deep scan. Include also dependencies of your dependencies',
        false
    )

program.parse(process.argv)

const options = program.opts<IOptions>()

async function main(options: IOptions) {
    const { dependencies, devDependencies } = lookForRepo(
        options.path,
        options.deep
    )

    const packages = {
        dependencies: Array.from(new Set(dependencies)),
        devDependencies: Array.from(new Set(devDependencies)).filter(
            (dependencie) => !dependencies.includes(dependencie)
        ),
    }

    logger.info(
        `Found ${packages.dependencies.length} dependencies and ${packages.devDependencies.length} devDependencies`
    )

    if (options.out) {
        writeFileSync(
            `${options.out}/out.json`,
            JSON.stringify(packages, null, 4)
        )
    } else {
        console.log(JSON.stringify(packages, null, 4))
    }
}

main(options)
