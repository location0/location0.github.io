let isFinished = false;
let textTimeNow = "";
let textNow = "";
let theText = "新年即将到来🎉，提前祝你新年快乐🎊，祝你幸福无限🌈\n\
愿你事业有成💼，家庭幸福👨‍👩‍👧‍👦，健康快乐🏃‍♂️，梦想成真🎉\n\
转发给10个最好的朋友💬，新年愿望都能实现哦💌";//祝福语
let theTargetTime = "2024/1/1 00:00:00";//目标时间
let isVisible = 1;//默认显示文字和打赏

//获取元素对象
let pOfText = document.getElementById("text");
let pOfTime = document.getElementById("time");
let btnOfVisibility = document.getElementById("visibility");
let aOfReward = document.getElementById("reward");
let divOfmText = document.getElementById("myText");
let divOfLeftBottom = document.getElementById("leftBottom")

//分辨率设置文字字体
function refreshFont(){
    let windowWidth = window.document.body.offsetWidth;
    if(windowWidth<530){
        pOfTime.setAttribute("style","font-size:4.8vw");
        pOfText.setAttribute("style","font-size:3vw");
    }
    else{
        pOfTime.setAttribute("style","font-size:23px");
        pOfText.setAttribute("style","font-size:17px");
    }
}
setInterval(refreshFont,100);

//切换隐藏
btnOfVisibility.onclick = function(){
    if(isVisible==0){
        btnOfVisibility.innerText = "隐藏";
        isVisible = 1;
        aOfReward.setAttribute("style","visibility : visible");
        divOfmText.setAttribute("style","visibility : visible");
        divOfLeftBottom.setAttribute("style","visibility : visible");
    }
    else{
        btnOfVisibility.innerText = "显示";
        isVisible = 0;
        aOfReward.setAttribute("style","visibility : hidden");
        divOfmText.setAttribute("style","visibility : hidden");
        divOfLeftBottom.setAttribute("style","visibility : hidden");
    }
}

//将不满10的补0
function isUnder10(thenum)
{
    return thenum<10?"0"+thenum:thenum;
}

//倒计时
function countDown(time)
{
    let nowTime = +new Date();//当前时间毫秒数
    let targetTime = +new Date(time);//传入目标时间的毫秒数
    let deltaTime = targetTime - nowTime;
    if(deltaTime>0){
        let deltaDay = parseInt(deltaTime/1000/60/60/24);
        let deltaHour = isUnder10(parseInt(deltaTime/1000/60/60%24));
        let deltaMinute = isUnder10(parseInt(deltaTime/1000/60%60));
        let deltaSecond = isUnder10(parseInt(deltaTime/1000%60));
        return ["还有",String(deltaDay),String(deltaHour),String(deltaMinute),String(deltaSecond)];
    }
    else
    {
        deltaTime=-deltaTime;
        let deltaDay = parseInt(deltaTime/1000/60/60/24);
        let deltaHour = isUnder10(parseInt(deltaTime/1000/60/60%24));
        let deltaMinute = isUnder10(parseInt(deltaTime/1000/60%60));
        let deltaSecond = isUnder10(parseInt(deltaTime/1000%60));
        theText = "新年的钟声敲响🔔，祝福的音符传递🎵。\n\
        在这个美好的时刻里🌟，祝愿你事业有成💼，家庭幸福👨‍👩‍👧‍👦，健康快乐🏃‍♂️，梦想成真🎉。\n\
        新年快乐🎊！祝福你新年无限精彩🌈。\n\
        转发给10个最好的朋友💬，新年愿望都能实现哦💌";
        return ["已经",String(deltaDay),String(deltaHour),String(deltaMinute),String(deltaSecond)];
    }
}
//分割字符
let cdArr = countDown(theTargetTime);//倒计时结果数组
let splitedTime = ("距离2024年元旦"+cdArr[0]+cdArr[1]+"天"+cdArr[2]+"时"+cdArr[3]+"分"+cdArr[4]+"秒").split("");
let splitedText = theText.split("");

//刷新时间
function refreshTime(){
    cdArr = countDown(theTargetTime);//刷新倒计时结果
    pOfTime.innerHTML = "距离2024年元旦"+cdArr[0]+
                        "<span style=\"color:orange\">"+cdArr[1]+"</span>天"+
                        "<span style=\"color:orange\">"+cdArr[2]+"</span>时"+
                        "<span style=\"color:orange\">"+cdArr[3]+"</span>分"+
                        "<span style=\"color:orange\">"+cdArr[4]+"</span>秒";
}
let intervalShowTime = setInterval(showTime,140);//出字频率
let intervalShowText;
function showTime(){
    if (splitedTime.length>0){
        textTimeNow = textTimeNow + splitedTime.shift();
        pOfTime.innerText = textTimeNow;
    }
    else{
        clearInterval(intervalShowTime);
        setInterval(refreshTime,1000);
        intervalShowText = setInterval(showText,150);

    }
}

function showText(){
    if (splitedText.length>0){
        textNow = textNow + splitedText.shift();
        pOfText.innerText = textNow;
    }
    else{
        clearInterval(intervalShowText);
    }
}

