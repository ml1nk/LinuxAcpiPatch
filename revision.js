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

const RevisionByte = 8

program
.argument('<file>', 'file to input')
.option('--increase', 'increase revision by one');

program.parse()

const options = program.opts();


const increase = options.increase ?? false;

let binary = readFileSync(program.args[0], 'ascii')

console.log(`revision is ${binary.charCodeAt(RevisionByte)}`)

if(increase) {   
    binary = setCharAt(binary,RevisionByte, String.fromCharCode(binary.charCodeAt(RevisionByte)+1))
    writeFileSync(program.args[0], binary, 'ascii')
    console.log(`revision written, now ${binary.charCodeAt(RevisionByte)}`)
}

