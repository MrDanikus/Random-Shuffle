var rc4 = require('./rc4.js');
var SHA256 = require('./SHA256.min.js');
var prefs = require("./prefs.json");


function _str_to_num(str){
	let num = 0n;
	for(let i = 0; i < str.length; ++i){
		for(let j = 1; j < 256; j<<=1){
			num+=BigInt(str.charCodeAt(i)&(j));
			num*=2n;
		}
	}
	return num;
}



/**
 * 
 * @param {String} key 
 * @param {Array} array
 * 
 * @returns {Array} 
 */
function random_shuffle(key,array){
	if(!Array.isArray(array)){
		return "Should be an instance of array";
	}
	if(typeof(key) !== 'string'){
		return "First param should be a string"
	}
	var initVector = SHA256(array);
	var ciph = rc4(key,initVector);
	for(let i = array.length -1; i >= 1; --i){
		let j = Number(_str_to_num(ciph)%BigInt(i+1));
		let b = array[i];
		array[i] = array[j];
		array[j] = b;
		ciph = rc4(ciph,initVector);
	}
	return array;
}





console.log(random_shuffle(prefs.key,prefs.array));
