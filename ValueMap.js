"use strict";
function swapRemoveArrayItemAt(ar, i) {
    ar[i] = ar[ar.length - 1];
    ar.pop();
}
var ValueMap = (function () {
    function ValueMap(hash, trueEqual) {
        this.hash = hash;
        this.trueEqual = trueEqual;
        this.m = new Map();
        this.size = 0;
    }
    ValueMap.prototype.set = function (k, v) {
        var kh = this.hash(k);
        var bucket = this.m.get(kh);
        if (bucket) {
            var i = 0;
            do {
                var bi = bucket[i];
                if (this.trueEqual(k, bi.k)) {
                    var oldv = bi.v;
                    bi.v = v;
                    return oldv;
                }
                ++i;
            } while (i < bucket.length);
            bucket.push({ k: k, v: v });
            this.size += 1;
            return undefined;
        }
        else {
            this.m.set(kh, [{ k: k, v: v }]);
            this.size += 1;
            return undefined;
        }
    };
    ValueMap.prototype.get = function (k) {
        var kh = this.hash(k);
        var bucket = this.m.get(kh);
        if (bucket) {
            var i = 0;
            do {
                var bi = bucket[i];
                if (this.trueEqual(k, bi.k)) {
                    return bi.v;
                }
                ++i;
            } while (i < bucket.length);
            return undefined;
        }
        else {
            return undefined;
        }
    };
    ValueMap.prototype.delete = function (k) {
        var kh = this.hash(k);
        var bucket = this.m.get(kh);
        if (bucket) {
            var i = 0;
            do {
                var bi = bucket[i];
                if (this.trueEqual(k, bi.k)) {
                    swapRemoveArrayItemAt(bucket, i);
                    this.size -= 1;
                    return bi.v;
                }
                ++i;
            } while (i < bucket.length);
        }
        return undefined;
    };
    return ValueMap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValueMap;
//I wanted to do an Interner but realized I couldn't because JS WeakMaps are weak in the wrong way. The key is weakref'd, not the value. It would need to sort of weakref both at once
// class Interner<T>{ //essentially turns comparisons by reference into comparisons by value. Give the interner the data, a hash function for the data and a true equality function. It will then give you a single reference to the data. Any two references provided by the interner that are equal in contents will be equal by reference too. By using a weakmap, whe interner only holds onto entries that are being used by some other part of the program.
// 	wm = WeakMap<number, T[]>;
// 	constructor(private hash:(T)=>number, private trueEqual:(T,T)=>boolean){}
// 	get(v:T):T {
// 		var res = wm.get(v)
// 	}
// } 
//# sourceMappingURL=ValueMap.js.map