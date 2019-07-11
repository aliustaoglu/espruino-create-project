# Espruino Create Project

Easily create boilerplates that can flash Espruino firmware and upload an embedded JavaScript program to either ESP8266 or ESP32.

### Prerequisites
Install esptool.py from:

https://github.com/espressif/esptool

Connect esp32 or esp8266 using a serial/usb port and find out the name of the port.

### Demo

![Demo](https://raw.githubusercontent.com/aliustaoglu/espruino-create-project/master/help/demo.gif)


### Installation

```bash
npm install -g espruino-create-project
```

### Usage

Create a boilerplate using globally installed espruino-create-project library

```bash
espruino-create-project init my-esp8266-project --chip esp8266 --baud 115200 --port PORT1 --author 'Cuneyt Aliustaoglu'
```

Then

```bash
cd  my-esp8266-project
```

Erase the existing firmware

```bash
npm run erase
```

```bash
$ npm run erase

> my-esp8266-project@0.0.1 erase /Development/my-esp8266-project
> esptool.py --port /dev/cu.SLAB_USBtoUART erase_flash

esptool.py v2.5.0
Serial port /dev/cu.SLAB_USBtoUART
Connecting........_
Detecting chip type... ESP8266
Chip is ESP8266EX
Features: WiFi
MAC: 80:7d:3a:5b:b2:17
Uploading stub...
Running stub...
Stub running...
Erasing flash (this may take a while)...
Chip erase completed successfully in 6.8s
Hard resetting via RTS pin...
```

Write Espruino firmware into your chip:

```bash
npm run flash
```

```bash
$ npm run flash

> my-esp8266-project@0.0.1 flash /Development/my-esp8266-project
> esptool.py --port /dev/cu.SLAB_USBtoUART --baud 115200 write_flash --flash_freq 80m  -fm dio --flash_size 4MB 0x0000 firmware/bo

esptool.py v2.5.0
Serial port /dev/cu.SLAB_USBtoUART
Connecting........_
Detecting chip type... ESP8266
Chip is ESP8266EX
Features: WiFi
MAC: 80:7d:3a:5b:b2:17
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Flash params set to 0x024f
Compressed 3856 bytes to 2763...
Wrote 3856 bytes (2763 compressed) at 0x00000000 in 0.2 seconds (effective 125.2 kbit/s)...
Hash of data verified.
Compressed 459684 bytes to 320164...
Wrote 459684 bytes (320164 compressed) at 0x00001000 in 28.2 seconds (effective 130.5 kbit/s)...
Hash of data verified.
Compressed 128 bytes to 75...
Wrote 128 bytes (75 compressed) at 0x003fc000 in 0.0 seconds (effective 92.1 kbit/s)...
Hash of data verified.
Compressed 4096 bytes to 26...
Wrote 4096 bytes (26 compressed) at 0x003fe000 in 0.0 seconds (effective 5234.6 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
```

Empty project file is located under `src/main.js`. Change this file as you wish

```javascript
E.on('init', function() {
  digitalWrite(2, 0);
})
```

and just use below command to upload it to the chip:

```bash
npm run upload
```

```bash
$ npm run upload

> my-esp8266-project@0.0.1 upload /Development/my-esp8266-project
> npm run uglify && espruino -p /dev/cu.SLAB_USBtoUART -b 115200 --board boards/ESP8266_4MB.json -e 'save()' index.js


> my-esp8266-project@0.0.1 uglify /Development/my-esp8266-project
> uglifyjs src/* --compress --mangle -o ./index.js 

Espruino Command-line Tool 0.1.20
-----------------------------------

Explicit board JSON supplied: "boards/ESP8266_4MB.json"
Connecting to '/dev/cu.SLAB_USBtoUART'
Connected
--] 
--]  ____                 _ 
--] |  __|___ ___ ___ _ _|_|___ ___ 
--] |  __|_ -| . |  _| | | |   | . |
--] |____|___|  _|_| |___|_|_|_|___|
--]          |_| espruino.com
--]  2v04 (c) 2019 G.Williams
--] 
--] Espruino is Open Source. Our work is supported
--] only by sales of official boards and donations:
--] http://espruino.com/Donate
--] Flash map 4MB:512/512, manuf 0xef chip 0x4016
--] 
--] >
--] Compacting Flash...
--] Calculating Size...
--] Writing..


```

If you created the boilerplate with wrong parameters you can update parameters using update command. You need to be inside your project when you execute this.

```bash
espruino-create-project update --chip esp32 --baud 9600 --port PORT2 --author 'My Name'
```

### Commands
npm run <one of the commands below>

erase: erase flash in ESP8266
flash: flash new firmware
reset erase then flash
reupload: erase flash, flash new firmware, uglify javascript code and then upload
uglify: just uglify the code and bundle in index.js
upload: upload the bundled code to ESP8266
screen: serial monitor your device


### Notes
All files under /src will be merged into a single file, uglified and then uploaded into the chip.