class Person{
    constructor(theName,age){
        this.name = theName;
        this.age = age;
    }
    sayHello(){
        console.log("hello");
    }
}
let XM = new Person("小明",10000);
console.log("大家好,我叫"+XM.name+"，18岁");
XM.sayHello();

console.log(navigator.hardwareConcurrency)
