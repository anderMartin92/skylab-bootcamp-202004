'use strict'

Arroz.prototype.every = function(callback){
    if (typeof callback !== 'function')  throw new TypeError (callback + ' is not a function')
for (var i = 0; i < this.length; i++){
    if (!callback(this[i])){
return false
    }

}
  return true
}


