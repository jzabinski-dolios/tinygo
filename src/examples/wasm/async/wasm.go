package main

import "syscall/js"

func callPromise() {
	console := js.Global().Get("console")
	wait := make(chan interface{})
	js.Global().Call("sayHello", 500).Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		console.Call("log", args[0])
		wait <- nil
		return nil
	}))
	<-wait
	console.Call("log", "and done")
}

func main() {
	callPromise()
}

//export exported
func Exported() {
	callPromise()
}