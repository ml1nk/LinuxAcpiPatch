import { patch } from '../helper.js'

function cb(binary) {
    const c0 = String.fromCharCode(0)
    const c1 = String.fromCharCode(1)
    const c8 = String.fromCharCode(8)

    return binary
        .replace("SS1_"+c0+c8, "SS1_"+c1+c8)
        .replace("SS2_"+c0+c8, "SS2_"+c1+c8)
        .replace("SS3_"+c0+c8, "SS3_"+c1+c8)
}

patch(cb)