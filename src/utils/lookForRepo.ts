import { lstatSync, readFileSync, readdirSync } from 'fs'
import logger from './logger'

interface IPackages {
    dependencies: string[]
    devDependencies: string[]
}

export function lookForRepo(dir: string): IPackages {
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

        const json = JSON.parse(file)

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

        return packages
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

            const { dependencies, devDependencies } = lookForRepo(path)

            packages.dependencies = [...packages.dependencies, ...dependencies]
            packages.devDependencies = [
                ...packages.devDependencies,
                ...devDependencies,
            ]
        })

    return packages
}
