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
    let binary = readFileSync(program.args[0], null)
    writeFileSync(program.args[0], cb(binary), null)
}

// https://stackoverflow.com/questions/14147213/search-for-multi-byte-pattern-in-uint8array
export function indexOfMulti(arr, searchElements, fromIndex) {
    fromIndex = fromIndex || 0;

    var index = Array.prototype.indexOf.call(arr, searchElements[0], fromIndex);
    if(searchElements.length === 1 || index === -1) {
        // Not found or no other elements to check
        return index;
    }

    for(var i = index, j = 0; j < searchElements.length && i < arr.length; i++, j++) {
        if(arr[i] !== searchElements[j]) {
            return indexOfMulti(arr, searchElements, index + 1);
        }
    }

    return(i === index + searchElements.length) ? index : -1;
};