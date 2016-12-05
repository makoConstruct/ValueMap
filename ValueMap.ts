
function swapRemoveArrayItemAt(ar:any[], i:number){ //a constant time array removal operation that does not preserve order
	ar[i] = ar[ar.length-1]
	ar.pop()
}

export default class ValueMap<K, V>{
	m = new Map<number, {k:K, v:V}[]>();
	size:number = 0;
	constructor(private hash:(k:K)=>number, private trueEqual:(a:K,b:K)=>boolean){}
	set(k:K, v:V):V { //returns the old v for that k
		var kh = this.hash(k)
		var bucket = this.m.get(kh)
		if(bucket){
			var i = 0
			do{ //there are no empty buckets, so bucket[0] is guaranteed to be there
				var bi = bucket[i]
				if(this.trueEqual(k, bi.k)){
					var oldv = bi.v
					bi.v = v
					return oldv
				}
				++i
			}while(i < bucket.length)
			bucket.push({k,v})
			this.size += 1
			return undefined
		}else{
			this.m.set(kh, [{k,v}])
			this.size += 1
			return undefined
		}
	}
	get(k:K):V {
		var kh = this.hash(k)
		var bucket = this.m.get(kh)
		if(bucket){
			var i = 0
			do{ //there are no empty buckets, so bucket[0] is guaranteed to be there
				var bi = bucket[i]
				if(this.trueEqual(k, bi.k)){
					return bi.v
				}
				++i
			}while(i < bucket.length)
			return undefined
		}else{
			return undefined
		}
	}
	delete(k:K):V { //returns the V associated with the K if there was one
		var kh = this.hash(k)
		var bucket = this.m.get(kh)
		if(bucket){
			var i = 0
			do{ //there are no empty buckets, so bucket[0] is guaranteed to be there
				var bi = bucket[i]
				if(this.trueEqual(k, bi.k)){
					swapRemoveArrayItemAt(bucket, i)
					this.size -= 1
					return bi.v
				}
				++i
			}while(i < bucket.length)
		}
		return undefined
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