
export default class StringifyingMap<K, V>{
	m = new Map<string, V>();
	constructor(private catToString:(k:K)=>string){}
	set(k:K, v:V) {
		return this.m.set(this.catToString(k), v)
	}
	get(k:K):V {
		return this.m.get(this.catToString(k))
	}
	delete(k:K) {
		return this.m.delete(this.catToString(k))
	}
	get size(){
		return this.m.size
	}
}







//I wanted to do an Interner but realized I couldn't because JS WeakMaps are weak in the wrong way. The key is weakref'd, not the value. It would need to sort of weakref both at once
// class Interner<T>{ //essentially turns comparisons by reference into comparisons by value. Give the interner the data, a hash function for the data and a true equality function. It will then give you a single reference to the data. Any two references provided by the interner that are equal in contents will be equal by reference too. By using a weakmap, whe interner only holds onto entries that are being used by some other part of the program.
// 	wm = WeakMap<number, T[]>;
// 	constructor(private hash:(T)=>number, private trueEqual:(T,T)=>boolean){}
// 	get(v:T):T {
// 		var res = wm.get(v)
// 	}
// }