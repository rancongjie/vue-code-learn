'use strict';
let data = {
    user: {
        name: "rancongjie",
        age: "23"
    },
    address: {
        city: "chongqing"
    }
};
function obverse(data) {
    this.data = data;
    this.walk(data)
}

let p = obverse.prototype;

p.walk = function (obj) {
    let val;
    for (let key in obj){
        if (obj.hasOwnProperty(key)){
            val = obj[key];
            if(typeof val === 'object'){
                new obverse(val);
            }
            this.convert(key,val)
        }
    }
};

p.convert = function (key,val) {
  Object.defineProperty(this.data,key,{
      enumerable:true,
      configurable:true,
      get: function () {
          console.log('你访问了'+key);
          return val
      },
      set: function (newVal) {
          console.log('你设置了' + key);
          console.log('新的' + key + ' = ' + newVal);
          if (newVal === val) return;
          val = newVal;
      }
  })
};
let app = new obverse(data);