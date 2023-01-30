let testArray = [[],
    ["吃饭","2023/11/11",0],
    ["6","2023/1/29 16:30",1]
];
let openTime = new Date();
let timesArr = ["year","month","day","hour","minute","second"];
let targetTime;

//--获取元素--
let theTable = document.querySelector("tbody");
let chooserDiv = document.getElementById("timeChooser");
let newBtn = document.getElementById("new");
let closeTimeChooserSpan = document.getElementById("closeTimeChooser");

//循环获取所有输入框
let inputsArr = [];
for(a=0;a<timesArr.length;a++){
    inputsArr[a] = document.getElementById(timesArr[a]);
}

//--添加事件监听--

//点击新增按钮
newBtn.addEventListener("click",function(){
    chooserDiv.style.display = "block";
    targetTime = new Date();
    refreshInputValues(targetTime);
})


//关闭新增时间
closeTimeChooserSpan.addEventListener("click",function(){
    chooserDiv.style.display = "none";
})

//点击屏幕窗口消失
window.addEventListener("click",function(event){
    if(event.target==chooserDiv){
        chooserDiv.style.display = "none";
    }
})

//选中input自动全选
for(a=0;a<inputsArr.length;a++){
    inputsArr[a].addEventListener("focus",function(){
        this.select();
    })
}

//注册监听鼠标滚动函数
function mouseWheelChoosingTime(element,setmethod){
    //大部分浏览器
    element.onmousewheel = function (event){
        targetTime = new Date(String(inputsArr[0].value)+"/"+String(inputsArr[1].value)+"/"+String(inputsArr[2].value)+" "+String(inputsArr[3].value)+":"+String(inputsArr[4].value+":")+String(inputsArr[5].value));
        if (event.wheelDelta > 0){
            if(element==inputsArr[1]){
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value))+")");
            }   
            else{      
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)+1)+")");
            }
        }
        else {
            if(element==inputsArr[1]){
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)-2)+")");
            }   
            else{      
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)-1)+")");
            }
        }
        refreshInputValues(targetTime);
    }
    //火狐
    element.addEventListener('DOMMouseScroll', (event) => {
        targetTime = new Date(String(inputsArr[0].value)+"/"+String(inputsArr[1].value)+"/"+String(inputsArr[2].value)+" "+String(inputsArr[3].value)+":"+String(inputsArr[4].value+":")+String(inputsArr[5].value));
        if (event.detail > 0) {
            if(element==inputsArr[1]){
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)+2)+")");
            }   
            else{      
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)+1)+")");
            }
        }
        else {
            if(element==inputsArr[1]){
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value))+")");
            }   
            else{      
                eval("targetTime"+"."+String(setmethod)+"("+String(parseInt(element.value)-1)+")");
            }
        }
    }, false);
}

//注册鼠标滚动
mouseWheelChoosingTime(inputsArr[0],"setFullYear");
mouseWheelChoosingTime(inputsArr[1],"setMonth");
mouseWheelChoosingTime(inputsArr[2],"setDate");
mouseWheelChoosingTime(inputsArr[3],"setHours");
mouseWheelChoosingTime(inputsArr[4],"setMinutes");
mouseWheelChoosingTime(inputsArr[5],"setSeconds");


//年和月的规则总是让人捉摸不透
//年
// inputsArr[0].onmousewheel = function (event){
//     let tempTime = new Date(targetTimeStamp)
//     if (event.wheelDelta > 0){
//         tempTime.setFullYear(tempTime.getFullYear()+1);
//         targetTimeStamp = +new Date(tempTime);
//         console.log(targetTimeStamp);
//     }
//     else {
//         tempTime.setFullYear(tempTime.getFullYear()-1);
//         targetTimeStamp = +new Date(tempTime);
//     }
//     refreshInputValues(targetTimeStamp);
// }
// //火狐
// inputsArr[0].addEventListener('DOMMouseScroll', (event) => {
//     if (event.detail > 0) {
//         tempTime.setFullYear(tempTime.getFullYear+1);
//         targetTimeStamp = +new Date(tempTime);
//     }
//     else {
//         tempTime.setFullYear(tempTime.getFullYear-1);
//         targetTimeStamp = +new Date(tempTime);
//     }
//     refreshInputValues(targetTimeStamp);
// }, false);



//将input默认值设为当前时间
function refreshInputValues(_Time){
    inputsArr[0].value = _Time.getFullYear();
    inputsArr[1].value = _Time.getMonth()+1;
    inputsArr[2].value = _Time.getDate();
    inputsArr[3].value = _Time.getHours();
    inputsArr[4].value = _Time.getMinutes();
    inputsArr[5].value = _Time.getSeconds();
}






//转为输出数组
function toDisplayArray(arr){
    let rows = arr.length;
    let tempArr = [rows];
    tempArr[0]=[];
    for(let row=1;row<rows;row++){
        let timeArr = myFuncs.countDown(arr[row][1]);
        //去除0开头的时间
        let time_
        if(timeArr[1]=="00"){
            if(timeArr[2]=="00"){
                if(timeArr[3]=="00"){
                    time_ = timeArr[4]+"秒";
                }
                else{
                    time_ = timeArr[3]+"分"+timeArr[4]+"秒";
                }
            }
            else{
                time_ = timeArr[2]+"时"+timeArr[3]+"分"+timeArr[4]+"秒";
            }
        }
        else{
            time_ = timeArr[1]+"天"+timeArr[2]+"时"+timeArr[3]+"分"+timeArr[4]+"秒";
        }
        
        tempArr[row] = [arr[row][0],timeArr[0],time_];
    }
    return tempArr;
}

//将数组显示在表格中
function writeHTMLOfTbody(arr){
    let theTbody = "";
    for(let r=1;r<arr.length;r++){
        if(arr[r][1]=="还有"){
            theTbody = theTbody + "<tr>"+
                        "<td>"+arr[r][0]+"</td>"+
                        "<td style=\"color:blue\">"+arr[r][1]+"</td>"+
                        "<td>"+arr[r][2]+"</td>"+
                        "</tr>";
        }
        else{
            theTbody = theTbody + "<tr>"+
                        "<td>"+arr[r][0]+"</td>"+
                        "<td style=\"color:orange\">"+arr[r][1]+"</td>"+
                        "<td>"+arr[r][2]+"</td>"+
                        "</tr>";
        }
    }
    return theTbody;
}

//更新表格
function showTable(){
    theTable.innerHTML = writeHTMLOfTbody(toDisplayArray(usersArr));
}
//默认表格
function defaultTable(){
    theTable.innerHTML = writeHTMLOfTbody(toDisplayArray([[],["访问本网站",openTime]]));
}

localStorage.setItem("uArr",JSON.stringify(testArray));
localStorage.removeItem("uArr");


let usersArr = JSON.parse(localStorage.getItem("uArr"));
if(usersArr!=null){
    setInterval(showTable,300);
}
else{
    setInterval(defaultTable,300);
}
