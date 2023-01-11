#! /usr/bin/env node

'use strict'

const path = require('path')
const util = require('util')
const packageJson = require('../package.json')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)

async function runCmd (command) {
    try {
        const { stdout, stderr } = await exec(command)
        console.log(stdout)
        console.log(stderr)
    } catch {
        (error) => {
            console.log('\x1b[31m', error, '\x1b[0m')
        }
    }
}

if (process.argv.length < 3) {
    console.log('\x1b[31m', 'You have to provide project name')
    console.log('Try typing ⬇️')
    console.log('    npx create-cevo-react-app my-app', '\x1b[0m')
    process.exit(1)
}

const ownPath = process.cwd()
const folderName = process.argv[2]
const appPath = path.join(ownPath, folderName)
const repo = 'https://github.com/warren-cevo/create-cevo-react-app.git'

try {
    fs.mkdirSync(appPath)
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(
            '\x1b[31m',
            `The project directory "${appPath}" already exists, remove it or write another project name`,
            '\x1b[0m'
        )
    } else {
        console.log(err)
    }
    process.exit(1)
}

async function setup () {
    try {
        console.log('\x1b[33m', 'Downloading the project...', '\x1b[0m')
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`)

        process.chdir(appPath)

        console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m')
        await runCmd('npm install')
        console.log()

        await runCmd('npx rimraf ./.git')

        fs.unlinkSync(path.join(appPath, 'LICENSE.MD'))
        fs.rmSync(path.join(appPath, 'bin'), { recursive: true })
        fs.unlinkSync(path.join(appPath, 'package.json'))

        buildPackageJson(packageJson, folderName)

        console.log(
            '\x1b[32m',
            'The installation is done, this is ready to use !',
            '\x1b[0m'
        )
        console.log()

        console.log('\x1b[34m', 'You can start by typing:')
        console.log(`    cd ${folderName}`)
        console.log('    npm test')
        console.log('    npm run cy:ci')
        console.log('    npm run coverage')
        console.log('    npm run dev', '\x1b[0m')
        console.log()
        console.log('Check README.md for more information')
        console.log()
    } catch (error) {
        console.log(error)
    }
}

setup()

function buildPackageJson (packageJson, folderName) {
    const {
        bin,
        keywords,
        license,
        homepage,
        repository,
        bugs,
        ...newPackage
    } = packageJson

    Object.assign(newPackage, {
        name: folderName,
        version: '1.0.0',
        type: 'commonjs',
        scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            preview: 'vite preview',
            test: 'vitest',
            lint: 'eslint ./src',
            'cy:local': 'cypress open',
            'cy:ci': 'start-server-and-test dev http://localhost:5173 "cypress run"',
            coverage: 'vitest run --coverage'
        },
        dependencies: {
            '@emotion/react': '^11.10.5',
            '@emotion/styled': '^11.10.5',
            '@mui/material': '^5.11.4',
            '@reduxjs/toolkit': '^1.9.1',
            'abort-controller': '^3.0.0',
            'cross-fetch': '^3.1.5',
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            'react-redux': '^8.0.5'
        },
        devDependencies: {
            '@testing-library/jest-dom': '^5.16.5',
            '@testing-library/react': '^13.4.0',
            '@types/jest': '^29.2.6',
            '@types/node': '^18.11.18',
            '@types/react': '^18.0.26',
            '@types/react-dom': '^18.0.9',
            '@typescript-eslint/eslint-plugin': '^5.48.2',
            '@vitejs/plugin-react-swc': '^3.0.0',
            cypress: '^12.3.0',
            eslint: '^8.32.0',
            'eslint-config-prettier': '^8.6.0',
            'eslint-config-standard-with-typescript': '^30.0.0',
            'eslint-plugin-import': '^2.27.5',
            'eslint-plugin-n': '^15.6.1',
            'eslint-plugin-promise': '^6.1.1',
            'eslint-plugin-react': '^7.32.1',
            'eslint-plugin-react-hooks': '^4.6.0',
            jsdom: '^21.0.0',
            msw: '^0.49.2',
            prettier: '^2.8.2',
            'start-server-and-test': '^1.15.2',
            typescript: '^4.9.4',
            'typescript-eslint': '^0.0.1-alpha.0',
            vite: '^4.0.0',
            vitest: '^0.27.1'
        }
    }
    )

    fs.writeFileSync(
        `${process.cwd()}/package.json`,
        JSON.stringify(newPackage, null, 2),
        'utf8'
    )
}
