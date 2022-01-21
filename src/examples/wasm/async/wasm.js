'use strict';

const WASM_URL = 'wasm.wasm';

var wasm;

global.sayHello = (time) => {
    return new Promise(resolve => {
        console.log('waiting to resolve', time);
        setTimeout(() => resolve('hola!'), time);
    })
};

function callWASMExported() {
    wasm.exports.exported();
}

function init() {
    document.querySelector('#runButton').onclick = callWASMExported;

    const go = new Go();
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject)
        .then(function (obj) {
            wasm = obj.instance;
            go.run(wasm);
        }
        );
}

init();
