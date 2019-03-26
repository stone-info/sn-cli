#! /usr/bin/env node

var program = require('commander')

console.log(`\x1b[32m${'■'.repeat(90)}\x1b[0m`)

const execa  = require('execa')
const fs     = require('fs')
const path   = require('path')
const ora    = require('ora')
const colors = require('colors/safe')

program
  .version('0.1.0')
  .option('-v --vue [vue]', 'download vue-template')
  .option('-r --react [react]', 'download react-template')
  .option('-m --mongodb [mongodb]', 'download mongodb-template')
  .option('-j --jsonserver [jsonserver]', 'download jsonserver-template')
  .option('-i --immutable [immutable]', 'download immutable-template')
  .option('-e --es6 [es6]', 'download es6-template')
  .option('-d --decorator [decorator]', 'download decorator-template')
  .option('-a --applescript [applescript]', 'download applescript-template')
  .option('--axios [axios]', 'download axios-template')
  .option('--mocha [mocha]', 'download mocha-template')
  .option('--express [express]', 'download express-template')
  .option('--koa [koa]', 'download koa-template')
  .option('--css [css]', 'download css-template')
  .option('--antd [antd]', 'download antd-template')
  .option('--shell [shell]', 'download shell-template')

program.parse(process.argv)

if (process.argv.slice(2).length !== 2) {
  program.outputHelp(make_red)
  process.exit(0)
}

function make_red (txt) {
  return colors.red(txt) //display the help text in red on the console
}

async function changePackageName (vueOrReact) {
  let pwd          = await execa.shell('pwd')
  let current_path = pwd.stdout
  let fp           = current_path + '/' + vueOrReact + '/' + 'package.json'
  let content      = fs.readFileSync(fp, 'utf-8')
  let packageJson  = JSON.parse(content)
  packageJson.name = vueOrReact
  content          = JSON.stringify(packageJson, null, 2)
  fs.writeFileSync(fp, content)
  return current_path + '/' + vueOrReact
}

(async function () {

  let options = program.options.map(item => {
    return item.long.replace('--', '')
  })

  let [option] = Reflect.ownKeys(program).filter(item => {
    if (item.startsWith('_')) { return false}
    return !['commands', 'options', 'Command', 'Option', 'rawArgs', 'args'].includes(item)
  })

  if (options.includes(option)) {
    let [project_name] = process.argv.slice(2).filter(item => {
      if (item.startsWith('--')) {
        return item.replace('--', '') !== option
      } else if (item.startsWith('-')) {
        return false
      } else {
        return true
      }
    })
    await main(option, project_name)
  } else {
    console.log(`\x1b[33m${'command failed...'}\x1b[0m`)
  }
})()

async function main (template_name, project_name) {

  const spinner = ora(`download ${template_name}-template ...`).start()

  try {

    await execa.shell(`git clone https://github.com/stone0117/${template_name}-template.git ${project_name}`)

    let fp = await changePackageName(project_name)

    spinner.succeed('succeed')

    await execa.shell(`open ${fp}`)

  } catch (err) {
    spinner.fail(err)
  }
  process.exit(0)
}
