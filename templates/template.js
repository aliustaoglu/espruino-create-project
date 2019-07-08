const getTemplate = (options) => `
{
  "name": "${options.name}",
  "version": "0.0.1",
  "description": "Espruino Boilerplate for ESP8266 server",
  "main": "index.js",
  "scripts": {
    "erase": "esptool.py --port ${options.port} erase_flash",
    "flash": "esptool.py --port ${options.port} --baud ${options.baud} write_flash --flash_freq 80m  -fm dio --flash_size 4MB 0x0000 firmware/boot_v1.6.bin 0x1000 firmware/espruino_esp8266_user1.bin 0x3FC000 firmware/esp_init_data_default.bin 0x3FE000 firmware/blank.bin",
    "reset": "npm run erase && npm run flash",
    "reupload": "npm run reset && npm run upload",
    "uglify": "uglifyjs src/* --compress --mangle -o ./index.js ",
    "upload": "npm run uglify && espruino -p ${options.port} -b ${options.baud} --board boards/ESP8266_4MB.json -e 'save()' index.js",
    "screen": "screen ${options.port} ${options.baud}"
  },
  "author": "Cuneyt Aliustaoglu",
  "license": "ISC",
  "devDependencies": {
    "espruino": "^0.1.12",
    "uglify-js": "^3.4.7"
  }
}
`;

module.exports = {
  getTemplate
};