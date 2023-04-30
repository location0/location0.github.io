d = "2023/1/20 00:00:00";
console.log(isNaN(+new Date(d)));
if(isNaN(+new Date(d))){
    console.log(1);
}
else{
    console.log(2);
}