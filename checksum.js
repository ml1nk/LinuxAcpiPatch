import { readFileSync, writeFileSync } from 'fs'
import { program } from 'commander'
import { setCharAt } from './helper.js'

/**
 https://wiki.osdev.org/RSDT
 struct ACPISDTHeader {
    char Signature[4]; 4
    uint32_t Length; 4
    uint8_t Revision; 1
    uint8_t Checksum; 1
    char OEMID[6]; 6
    char OEMTableID[8]; 8
    uint32_t OEMRevision; 4
    uint32_t CreatorID; 4
    uint32_t CreatorRevision; 4
  }; => 36
**/

const ChecksumByte = 9

program
.argument('<file>', 'path to file')
.option('--fix', 'fix checksum if invalid');

program.parse()

const options = program.opts();

const fix = options.fix ?? false;

let binary = readFileSync(program.args[0], null)

let checksum = 0
let curChecksum = 0

for(let i=0; i<binary.length; i++) {
    const byte = binary[i];
    if(i === ChecksumByte) {
        curChecksum = byte
    } else {
        checksum += byte
        checksum = checksum % 256
    }
}

if((checksum + curChecksum) % 256 === 0) {
    console.log(`checksum ${checksum} + ${curChecksum} % 256 == 0, valid`)
} else {
    console.log(`checksum ${checksum} + ${curChecksum} % 256 = ${(checksum+curChecksum)%256} != 0, invalid `)
    if(fix) {   
        binary[ChecksumByte] = 256 - checksum % 256
        writeFileSync(program.args[0], binary, null)
        console.log("checksum written, fixed")
    }
}