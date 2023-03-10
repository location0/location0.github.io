//获取用户数据
// localStorage.removeItem("uArr");
let usersArr = JSON.parse(localStorage.getItem("uArr"));
let openTime = new Date();
if(usersArr==null){
    usersArr = [[],["访问本网站",openTime]];
}


let timesArr = ["year","month","day","hour","minute","second"];
let targetTime;

//--获取元素--
function getEles(eleName){
    return document.getElementById(eleName);
}
let theTable = document.querySelector("tbody");//表格
let chooserDiv = getEles("timeChooser");//时间选择器背景
let newBtn = getEles("new");//新建按钮
let closeChooserBtn = getEles("closeChooser");//时间选择器关闭按钮
let commitBtn = getEles("commit");//提交按钮
let titleInput = getEles("title");//标题输入框
let settingsBtn = getEles("settings");//设置按钮
let settingsDiv = getEles("settingsDiv");//设置页面背景
let clearBtn = getEles("clearBtn");//清空数据
let clearDiv = getEles("clearDiv");//清空数据背景
let dataSizeSpan = getEles("dataSize");//获取填写数据大小的span
let confirmClearBtn = getEles("confirmClear");//确认清空缓存
let cancelClearBtn = getEles("cancelClear");//取消清空

//循环获取所有输入框
let inputsArr = [];
for(a=0;a<timesArr.length;a++){
    inputsArr[a] = getEles(timesArr[a]);
}

//--添加事件监听--

//点击新增按钮
newBtn.addEventListener("click",function(){
    chooserDiv.style.display = "block";
    targetTime = new Date();
    refreshInputValues(targetTime);
})
//关闭新增时间
closeChooserBtn.addEventListener("click",function(){
    chooserDiv.style.display = "none";
})
//点击屏幕窗口消失
window.addEventListener("click",function(event){
    if(event.target==chooserDiv){
        chooserDiv.style.display = "none";
    }
})

//设置部分
//点击设置按钮
settingsBtn.addEventListener("click",function(){
    settingsDiv.style.display = "flex";
})
//

//点击屏幕其他位置
window.addEventListener("click",function(event){
    if(event.target==settingsDiv){
        settingsDiv.style.display = "none";
    }
})


//选中input自动全选
for(a=0;a<inputsArr.length;a++){
    inputsArr[a].addEventListener("focus",function(){
        this.select();
    })
}
titleInput.addEventListener("focus",function(){
    titleInput.select();
})

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


//检验年份输入合法性
inputsArr[0].addEventListener("input", function() {
this.value = this.value.replace(/[^\d]/g, "");
});

//添加上下限
function varify(element,min,max){
    element.addEventListener("input", function() {
        element.value = element.value.replace(/[^\d]/g, "");
        if (element.value > max || element.value < min) {
            element.value = element.value.slice(0, -1);
    }
    });
}
varify(inputsArr[1],1,12);
varify(inputsArr[2],1,31);
varify(inputsArr[3],0,24);
varify(inputsArr[4],0,60);
varify(inputsArr[5],0,60);

//检测标题
titleInput.addEventListener("input",function(){
    while(titleInput.value.length>11){
        titleInput.value = titleInput.value.slice(0,-1);
    }
})

//提交
commitBtn.addEventListener("click",function(){
    targetTimeString = String(inputsArr[0].value)+"/"+String(inputsArr[1].value)+"/"+String(inputsArr[2].value)+" "+String(inputsArr[3].value)+":"+String(inputsArr[4].value+":")+String(inputsArr[5].value);
    usersArr.push([titleInput.value,targetTimeString]);
    localStorage.setItem("uArr",JSON.stringify(usersArr));
})



//--设置窗口--
//清空
clearBtn.addEventListener("click",function(){
    clearDiv.style.display="block";
    dataSizeSpan.innerText = ((new Blob(usersArr)).size/1024).toFixed(2);

})
confirmClearBtn.addEventListener("click",function(){
    clearDiv.style.display = "none";
    localStorage.removeItem("uArr");
})
cancelClearBtn.addEventListener("click",function(){
    clearDiv.style.display = "none";
})

window.addEventListener("click",function(event){
    if(event.target==clearDiv){
        clearDiv.style.display = "none";
    }
})






//将input值设为传入时间
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

setInterval(showTable,300);