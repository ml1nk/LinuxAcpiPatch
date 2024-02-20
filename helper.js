import { program } from 'commander'
import { readFileSync, writeFileSync } from 'fs'

export function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


export function patch(cb) {
    program
        .argument('<file>', 'path to file')
    program.parse()
    let binary = readFileSync(program.args[0], 'ascii')
    writeFileSync(program.args[0], cb(binary), 'ascii')
}