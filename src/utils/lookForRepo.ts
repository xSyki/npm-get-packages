import { lstatSync, readFileSync, readdirSync } from 'fs'
import logger from './logger'

interface IPackages {
    dependencies: string[]
    devDependencies: string[]
}

export function lookForRepo(dir: string, deep: boolean): IPackages {
    let files: string[]

    const packages: {
        dependencies: string[]
        devDependencies: string[]
    } = {
        dependencies: [],
        devDependencies: [],
    }

    try {
        files = readdirSync(dir)
    } catch {
        return packages
    }

    if (files.includes('package.json')) {
        const file = readFileSync(`${dir}/package.json`, 'utf8')

        let json

        try {
            json = JSON.parse(file)
        } catch {
            logger.error(`Error parsing ${dir}/package.json`)

            return packages
        }

        const dependencies = Object.keys(json.dependencies || {})
        const devDependencies = Object.keys(json.devDependencies || {})

        if (json.name) {
            logger.info(
                `Found ${json.name} in ${dir}} with ${dependencies.length} dependencies and ${devDependencies.length} devDependencies`
            )
        }

        packages.dependencies = [...packages.dependencies, ...dependencies]
        packages.devDependencies = [
            ...packages.devDependencies,
            ...devDependencies,
        ]

        if (!deep) {
            return packages
        }
    }

    files
        .filter((file) => !file.startsWith('.'))
        .forEach((file) => {
            const path = `${dir}/${file}`

            let isDir: boolean

            try {
                isDir = lstatSync(path).isDirectory()
            } catch {
                return
            }

            if (!isDir) return

            const { dependencies, devDependencies } = lookForRepo(path, deep)

            packages.dependencies = [...packages.dependencies, ...dependencies]
            packages.devDependencies = [
                ...packages.devDependencies,
                ...devDependencies,
            ]
        })

    return packages
}
