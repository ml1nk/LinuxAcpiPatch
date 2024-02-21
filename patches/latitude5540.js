import { patch, indexOfMulti } from '../helper.js'

function cb(binary) {
    const S = "S".charCodeAt()
    const _ = "_".charCodeAt()

    
    const S1 = "1".charCodeAt()
    const in1 = indexOfMulti(binary, [S,S,S1,_,0,8])
    if(in1 > -1) {
        console.log("disabled SS1 flag found, enable!")
        binary[in1+4] = 1
    }

    const S2 = "2".charCodeAt()
    const in2 = indexOfMulti(binary, [S,S,S2,_,0,8])
    if(in2 > -1) {
        console.log("disabled SS2 flag found, enable!")
        binary[in2+4] = 1
    }

    const S3 = "3".charCodeAt()
    const in3 = indexOfMulti(binary, [S,S,S3,_,0,8])
    if(in3 > -1) {
        console.log("disabled SS3 flag found, enable!")
        binary[in3+4] = 1
    }

    return binary
}

patch(cb)