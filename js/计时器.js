let bgDiv=document.getElementById("bg");//大背景
let outputP=document.getElementById("output");//时间显示
let recordP2=document.getElementById("recordP2");//记录内容

let seniorBtn = document.getElementById("seniorBtn");//是否开启高级模式
let seniorBtnicon = document.getElementById("senioricon");//状态


let isTiming=0;
let isStarted=0;
let startTime=0;
let isSenior=0;
let deltaTime=0
let output="00:00.000";
const record=[];

bgDiv.addEventListener("touchend",function(){
    //开始计时
    if(isStarted==1){
        startTime=+new Date();
        isTiming=1;
    }
})
bgDiv.addEventListener("touchstart",function(){
    if(isStarted==1){//结束计时
        isStarted=0;
        isTiming=0;
        outputP.innerText=toOutputTime(deltaTime);
        showRecord(deltaTime);
    }
    else{
        isStarted=1;
        output="<span style=\"color:mediumspringgreen;\">00:00.000</span>";
    }
})



function toOutputTime(timeStamp){
    var milliSecond=timeStamp%1000;
    var second=((timeStamp-milliSecond)/1000)%60;
    var minute=((timeStamp-second*1000-milliSecond)/60000)%60;
    return myFuncs.insert0(minute)+":"+myFuncs.insert0(second)+"."+myFuncs.insert0Of1000(milliSecond);
}

function showTheTime(){
    if(isTiming==1){
        if(isSenior==0){
            deltaTime=+new Date()-startTime;
        }
        else{
            deltaTime=Math.floor((+new Date()-startTime)/2);
        }
        output=toOutputTime(deltaTime);
    }
    outputP.innerHTML=output;
}
setInterval(showTheTime,1);

function showRecord(theTime){
    var theText = "";
    if(record.length>4){
        for(var i=0;i<4;i++){
            record[i]=record[i+1];
        }
        record[4]=toOutputTime(theTime);
    }
    else{
        record.push(toOutputTime(theTime));
    }

    for(var i=0;i<record.length;i++){
        theText = theText+String(i+1)+". "+record[i]+"<br>";
    }
    recordP2.innerHTML=theText;
}

//高级
seniorBtn.addEventListener("click",function(){
    if(isSenior==0){
        seniorBtnicon.style.marginLeft = "35px";
        seniorBtn.style.backgroundColor = "rgb(101,196,104)";      
        isSenior = 1;
    }
    else{
        seniorBtnicon.style.marginLeft = "3px";
        seniorBtn.style.backgroundColor = "gainsboro";
        isSenior = 0;
    }
})