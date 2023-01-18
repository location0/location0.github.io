function isUnder10(thenum)//将不满10的补0
{
    return thenum<10?"0"+thenum:thenum;
}
function toTime(theTime){
    theTime = Math.abs(theTime);
    var deltaDay = isUnder10(parseInt(theTime/1000/60/60/24))
    var deltaHour = isUnder10(parseInt(theTime/1000/60/60%24));
    var deltaMinute = isUnder10(parseInt(theTime/1000/60%60));
    var deltaSecond = isUnder10(parseInt(theTime/1000%60));
    return [String(deltaDay),String(deltaHour),String(deltaMinute),String(deltaSecond)];
}
function countDown(time)//倒计时
{
    var nowTime = +new Date();//当前时间毫秒数
    var targetTime = +new Date(time);//传入目标时间的毫秒数
    var result = toTime(targetTime - nowTime);
    if(targetTime-nowTime>0){
        return "还有"+result[0]+"天"+result[1]+"时"+result[2]+"分"+result[3]+"秒";
    }
    else{
        return "已经"+result[0]+"天"+result[1]+"时"+result[2]+"分"+result[3]+"秒";
    }
}

var pOfButton = document.querySelector("#pOfButton"); //点击按钮
var button1 = document.getElementById("button1");
button1.onclick = function(){
    pOfButton.innerHTML = "没错你点了我";
}

var pOfTimer = document.querySelector("#pOfTimer");
var pOfnowTime = document.querySelector("#nowTime");

function showTime(){//显示时间函数
    pOfTimer.innerHTML = "距离农历新年"+countDown("2023/1/22 00:00:00");
}

setInterval(showTime,1000);//刷新时间

