let calBtn = document.getElementById("cal");
let firstInput = document.getElementById("fst");
let secondInput = document.getElementById("snd");
let thirdInput = document.getElementById("trd");
let forthInput = document.getElementById("fth");
let resultSpan = document.getElementById("result");


let symbols = ["+","-","*","/"];
function fullPermutation(arr){
    const permutations = [];
    function permute(array, index) {
        if (index === array.length - 1) {
            permutations.push([...array]);
            return;
        }

        for (let i = index; i < array.length; i++) {
            [array[index], array[i]] = [array[i], array[index]];
            permute(array, index + 1);
            [array[index], array[i]] = [array[i], array[index]];
        }
    }
    permute(arr,0);
    return permutations;
}

calBtn.addEventListener("click",function(){
    //希望你喜欢这个嵌套
    let inputArr=[firstInput.value,secondInput.value,thirdInput.value,forthInput.value];
    let fullPermutationArr = fullPermutation(inputArr);
    let theResult = "";

    for(let fstCalSymbol = 0;fstCalSymbol<4;fstCalSymbol++){
        for(let sndCalSymbol=0;sndCalSymbol<4;sndCalSymbol++){
            for(let trdCalSymbol=0;trdCalSymbol<4;trdCalSymbol++){
                for(let arrIndex=0;arrIndex<24;arrIndex++){
                    //abcd
                    let expression =String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //(ab)cd
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+")"+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //(abc)d
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+")"+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //a(bc)d
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+")"+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //a(bcd)
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //ab(cd)
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }

                    //(ab)(cd)
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+")"+symbols[sndCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24){
                        theResult = theResult+expression+"\n";
                    }
                }
            }
        }
    }
    console.log(theResult);
    if(theResult===""){
        console.log(1)
        resultSpan.innerText = "无解"+(new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();
    }
    else{
        resultSpan.innerText = theResult;
    }
})
