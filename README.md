#ValueMap

A map that provides value based indexing by taking a custom hash reduction function and a custom equality function, and storing entries with the same custom hash in buckets to deal with collisions.

It is terrible and you shouldn't use it, [because in es6 it's faster](https://jsperf.com/value-based-map-implementations-in-es6) to just concatenate stringification of content and use the resultant string as a key in a normal Map, which I should have seen coming, and did, but I was in deep enough at that point that I figured I should just push ahead and finish.

I have provided a Map wrapper that does exactly that, but it's like 10 lines, so mostly what this repo serves to do is serve to warn people not to bother trying what I just spent 3 hours on.

#StringifyingMap

stringifying map is okay.

```javascript
import StringifyingMap from './StringifyingMap'

class MoAddress{ //this is the complex key type we will be using for this example
	constructor(
		public id:number,
		public module:string
	){}
}
function catToString(v:MoAddress):string { return v.id+'::'+v.module }


var sm = new StringifyingMap<MoAddress, string>(catToString)

sm.set(new MoAddress(0, "makoconstruct/edmo"), "red")
sm.set(new MoAddress(1, "makoconstruct/edmo"), "blue")
sm.set(new MoAddress(0, "makoconstruct/edmo"), "green")
sm.set(new MoAddress(0, "neauoire/edmo"), "orange")

assertEq(sm.size, 3)

assertEq(sm.get(new MoAddress(0, "makoconstruct/edmo")), "green")
```