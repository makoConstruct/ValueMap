
import ValueMap from './ValueMap'



function assertEq(a, b){
	if(a != b){
		throw 'test failure. '+a+' did not equal '+b
	}
}



//this is the complex key type we use during the testing:
class MoAddress{
	constructor(
		public id:number,
		public module:string
	){}
}
function hashString(str:string):number{ // https://jsperf.com/hashing-strings
	var res = 0
	var len = str.length
	for(var i=0; i < len; i++){
		res = res * 31 + str.charCodeAt(i)
		res = res & res
	}
	return res
}
function moahash(v:MoAddress):number {
	return v.id ^ hashString(v.module)
}
function moaeq(a:MoAddress, b:MoAddress):boolean{ return a.id == b.id && a.module == b.module }


function newmap():ValueMap<MoAddress, string>{ return new ValueMap<MoAddress, string>(moahash, moaeq) }

//test basic
var vm = newmap()

vm.set(new MoAddress(0, "makoconstruct/edmo"), "red")
vm.set(new MoAddress(1, "makoconstruct/edmo"), "blue")
vm.set(new MoAddress(0, "makoconstruct/edmo"), "green")
vm.set(new MoAddress(0, "neauoire/edmo"), "orange")

assertEq(vm.size, 3)

assertEq(vm.get(new MoAddress(0, "makoconstruct/edmo")), "green")










//testing StringifyingMap, which was only here for a perf test, so if you just want ValueMap you can ignore this
import StringifyingMap from './StringifyingMap'

function catToString(v:MoAddress):string { return v.id+'::'+v.module }

//test basic
var sm = new StringifyingMap<MoAddress, string>(catToString)

sm.set(new MoAddress(0, "makoconstruct/edmo"), "red")
sm.set(new MoAddress(1, "makoconstruct/edmo"), "blue")
sm.set(new MoAddress(0, "makoconstruct/edmo"), "green")
sm.set(new MoAddress(0, "neauoire/edmo"), "orange")

assertEq(sm.size, 3)

assertEq(sm.get(new MoAddress(0, "makoconstruct/edmo")), "green")




console.log('all tests passed')