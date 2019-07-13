const getTemplate = options => {
  // prettier-ignore
  const template = {
    esp8266: `{
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
      "author": "${options.author}",
      "license": "ISC",
      "devDependencies": {
        "espruino": "0.1.28",
        "uglify-js": "3.6.0"
      }
    }`,
    esp32: `{
      "name": "${options.name}",
      "version": "0.0.1",
      "description": "Espruino Boilerplate for ESP8266 server",
      "main": "index.js",
      "scripts": {
        "erase": "esptool.py --port ${options.port} erase_flash",
        "flash": "esptool.py --chip esp32 --port ${options.port}  --baud ${options.baud} --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 0x1000 firmware/bootloader.bin 0x8000 firmware/partitions_espruino.bin 0x10000 firmware/espruino_esp32.bin",
        "reset": "npm run erase && npm run flash",
        "reupload": "npm run reset && npm run upload",
        "screen": "screen ${options.port} ${options.baud}",
        "uglify": "uglifyjs src/* --compress --mangle -o ./index.js ",
        "upload": "npm run uglify && espruino --port ${options.port}  --board boards/ESP32.json -b ${options.baud} -e 'save()' index.js"
      },
      "author": "${options.author}",
      "license": "ISC",
      "devDependencies": {
        "espruino": "0.1.28",
        "uglify-js": "3.6.0"
      }
    }`
  };

  return template[options.chip];
}


module.exports = {
  getTemplate
};
