let calBtn = document.getElementById("cal");
let resultP = document.getElementById("result");
let chooseNumDiv = document.getElementById("chooseNumDiv");


let chosenNum = 0;
window.addEventListener("click",function(event){
    if(event.target==chooseNumDiv){
        chooseNumDiv.style.display = "none";
    }
})

//4个数
let names=["firstButton","secondButton","thirdButton","fourthButton"];
for(let i=0;i<4;i++){
    let theButton = document.getElementById(names[i]);
    theButton.addEventListener("click",function(){
        chooseNumDiv.style.display = "block";
        chosenNum = i+1;
    })
}

//九宫格选数
let inputArr=[1,1,1,1];
for(let i=0;i<9;i++){
    let chooseBtn = document.getElementById(String(i+1));
    chooseBtn.addEventListener("click",function(){
        if(chosenNum==1){
            firstButton.innerText = String(i+1);
            inputArr[0] = i+1;
        }
        else if(chosenNum==2){
            secondButton.innerText = String(i+1);
            inputArr[1] = i+1;
        }
        else if(chosenNum==3){
            thirdButton.innerText = String(i+1);
            inputArr[2] = i+1;
        }
        else{
            fourthButton.innerText = String(i+1);
            inputArr[3] = i+1;
        }
        chooseNumDiv.style.display = "none";
    })
}



let symbols = ["+","-","*","/"];
function fullPermutation(arr){ //全排列输入的arr
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
    let fullPermutationArr = fullPermutation(inputArr);
    let theResult = "";

    //遍历每种符号组合
    for(let fstCalSymbol = 0;fstCalSymbol<4;fstCalSymbol++){
        for(let sndCalSymbol=0;sndCalSymbol<4;sndCalSymbol++){
            for(let trdCalSymbol=0;trdCalSymbol<4;trdCalSymbol++){
                let expr1=0;
                let expr2=0;
                let expr3=0;
                let expr4=0;
                let expr5=0;
                let expr6=0;
                let expr7=0;
                //循环遍历输入数组全排列后的每个数组的计算可能性
                for(let arrIndex=0;arrIndex<24;arrIndex++){
                    //abcd
                    let expression =String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24&&expr1==0){
                        theResult = theResult+expression+"\n";
                        expr1=1;
                    }

                    //(ab)cd
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+")"+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24&&expr2==0&&(fstCalSymbol==0||fstCalSymbol==1)&&(sndCalSymbol==2||sndCalSymbol==3)){
                        theResult = theResult+expression+"\n";
                        expr2=1;
                    }

                    //(abc)d
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+")"+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24&&expr3==0&&(fstCalSymbol==0||fstCalSymbol==1)&&(fstCalSymbol==0||fstCalSymbol==1)&&(trdCalSymbol==2||trdCalSymbol==3)){
                        theResult = theResult+expression+"\n";
                        expr3=1;
                    }

                    //a(bc)d
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+")"+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3]);
                    if(eval(expression)==24&&expr4==0&&fstCalSymbol==3&&(sndCalSymbol==0||sndCalSymbol==1)){
                        theResult = theResult+expression+"\n";
                        expr4=1;
                    }

                    //a(bcd)
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24&&expr5==0&&
                        fstCalSymbol==3&&(sndCalSymbol==0|sndCalSymbol==1)&&(trdCalSymbol==0||trdCalSymbol==1)){
                        theResult = theResult+expression+"\n";
                        expr5=1;
                    }

                    //ab(cd)
                    expression =    String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+symbols[sndCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24&&expr6==0&&sndCalSymbol==3&&(trdCalSymbol==0||trdCalSymbol==1)){
                        theResult = theResult+expression+"\n";
                        expr6=1;
                    }

                    //(ab)(cd)
                    expression ="("+String(fullPermutationArr[arrIndex][0])+symbols[fstCalSymbol]+
                                    String(fullPermutationArr[arrIndex][1])+")"+symbols[sndCalSymbol]+"("+
                                    String(fullPermutationArr[arrIndex][2])+symbols[trdCalSymbol]+
                                    String(fullPermutationArr[arrIndex][3])+")";
                    if(eval(expression)==24&&expr7==0&&(sndCalSymbol==2||sndCalSymbol==3)&&(fstCalSymbol==0||fstCalSymbol==1)&&(trdCalSymbol==0||trdCalSymbol==1)){
                        theResult = theResult+expression+"\n";
                        expr7=1;
                    }
                }
            }
        }
    }
    if(theResult===""){
        resultP.innerText = "无解"+"\n时间："+myFuncs.insert0((new Date()).getHours())+":"+myFuncs.insert0((new Date()).getMinutes())+":"+myFuncs.insert0((new Date()).getSeconds());
    }
    else{
        resultP.innerText = theResult;
    }
})
