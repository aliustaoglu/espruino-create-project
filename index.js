#!/usr/bin/env node

const chalk = require('chalk').default;
const help = require('./commands/help');
const program = require('commander');
const list = require('./commands/list');
const init = require('./commands/init');

program
  .command('list')
  .description('List supported devices')
  .action(list.listDevices);

program
  .command('init [projectName]')
  .description('Create a boilerplate for ESP8266/ESP32 project')
  //.option('-n, --name <type>', 'Name of project', 'my-espruino-project')
  .option('-e, --esp <type>', 'Which ESP to use? esp8266 or esp32?', 'esp8266')
  .option('-p, --port <type>', 'Default port name', '/dev/cu.wchusbserial1420')
  .option('-b, --baud <type>', 'Default baud rate', 115200)
  .option('-a, --author <type>', 'Author', 'My Name')
  .action(init.newProject);

if (process.argv.length < 3) {
  const helpCmd = chalk.bgWhiteBright("espruino-create-project --help")
  console.log(chalk.redBright(`Not enough parameters.\r\nType ${helpCmd} for options`));
} else {
  program.parse(process.argv);
}
