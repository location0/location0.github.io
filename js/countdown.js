//获取用户数据
let usersArr = JSON.parse(localStorage.getItem("uArr"));
let openTime = new Date();
openTime = String(openTime.getFullYear())+"/"+String(openTime.getMonth()+1)+"/"+String(openTime.getDate())+" "+myFuncs.insert0(openTime.getHours())+":"+myFuncs.insert0(openTime.getMinutes())+":"+myFuncs.insert0(openTime.getSeconds())
if(usersArr==null){
    usersArr = [[0],["访问本网站",openTime,0,0]];
    localStorage.setItem("uArr",JSON.stringify(usersArr));
}
let showArr = sortArr(usersArr,usersArr[0][0]);
console.log(usersArr)

let timesArr = ["year","month","day","hour","minute","second"];
let targetTime;

//--获取元素--
function getEles(eleName){
    return document.getElementById(eleName);
}
let theTable = getEles("mainTbody");//表格
let newBtn = getEles("new");//新建按钮

let chooserDiv = getEles("timeChooser");//时间选择器背景
let closeChooserBtn = getEles("closeChooser");//时间选择器关闭按钮
let commitBtn = getEles("commit");//提交按钮
let titleInput = getEles("title");//标题输入框
let newWarningBG = getEles("newWarningBG");//不合法日期提示的背景
let newWarningOk = getEles("newWarningOk");//提示的确认按钮

let cycleBtn = getEles("cycleBtn");//是否循环
let cycleBtnicon = getEles("cycleicon");//状态
let chooserLabel = getEles("chooserLabel");//新建的背景
let cycleDiv = getEles("cycleDiv");//循环的页面
let cycleInput = getEles("cycleInput");//获取循环周期的输入框

let settingsBtn = getEles("settings");//设置按钮
let settingsDiv = getEles("settingsDiv");//设置页面背景

let editBtn = getEles("editBtn");//获取设置的编辑按钮
let editBG = getEles("editBG");//编辑页背景
let editTable = getEles("editTable");//编辑页面的表格
let editDown = getEles("editDown");//编辑页“完成”
let editWaringSpan = getEles("editWarning");//没有计时提示

let clearBtn = getEles("clearBtn");//清空数据
let clearBG = getEles("clearBG");//清空数据背景
let dataSizeSpan = getEles("dataSize");//获取填写数据大小的span
let confirmClearBtn = getEles("confirmClear");//确认清空缓存
let cancelClearBtn = getEles("cancelClear");//取消清空

let orderBtn = getEles("orderBtn");//排列顺序按钮
let orderSpan = getEles("orderSpan");//当前排列顺序

let helpBtn = getEles("helpBtn");//帮助按钮
let helpBG = getEles("helpBG");//帮助页背景
let helpDownBtn = getEles("helpDownBtn");//完成

//循环获取所有输入框元素
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


//选中input后自动全选
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
    //大部分浏览器添加滚动选择
    element.onmousewheel = function (event){
        targetTime = new Date(String(inputsArr[0].value)+"/"+String(inputsArr[1].value)+"/"+String(inputsArr[2].value)+" "+String(inputsArr[3].value)+":"+String(inputsArr[4].value+":")+String(inputsArr[5].value));
        //上滚
        if (event.wheelDelta > 0){
            //月份是SB
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
        if(!isNaN(targetTime)){
            refreshInputValues(targetTime);
        }
    }
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
    targetTimeString = String(inputsArr[0].value)+"/"+String(inputsArr[1].value)+"/"+String(inputsArr[2].value)+" "+myFuncs.insert0(parseInt(inputsArr[3].value))+":"+myFuncs.insert0(parseInt(inputsArr[4].value))+":"+myFuncs.insert0(parseInt(inputsArr[5].value));
    if(isNaN(+new Date(targetTimeString))){
        newWarningBG.style.display = "block";
    }
    else{
        if(isCycle==0){
            usersArr.push([titleInput.value,targetTimeString,0,0]);
        }
        else{
            usersArr.push([titleInput.value,targetTimeString,1,parseInt(cycleInput.value)]);
        }
        localStorage.setItem("uArr",JSON.stringify(usersArr));
        showArr = sortArr(usersArr,usersArr[0][0]);
    }
})

newWarningOk.addEventListener("click",function(){
    newWarningBG.style.display = "none";
})
window.addEventListener("click",function(event){
    if(event.target==newWarningBG){
        newWarningBG.style.display = "none";
    }
})


let isCycle = 0;
cycleBtn.addEventListener("click",function(){
    if(isCycle==0){
        cycleBtnicon.style.marginLeft = "27px";
        cycleBtn.style.backgroundColor = "rgb(101,196,104)";
        chooserLabel.style.height = "400px";
        setTimeout("cycleDiv.style.display = \"block\";",100);        
        isCycle = 1;
    }
    else{
        cycleBtnicon.style.marginLeft = "3px";
        cycleBtn.style.backgroundColor = "gainsboro";
        chooserLabel.style.height = "215px";
        setTimeout("cycleDiv.style.display = \"none\";",210);
        isCycle = 0;
    }
})
varify(cycleInput,1,Infinity);
cycleInput.addEventListener("focus",function(){
    cycleInput.select();
})
cycleInput.value = 1;
cycleInput.onmousewheel = function(event){
    if(event.wheelDelta>0){
        cycleInput.value = parseInt(cycleInput.value)+1;
    }
    else if(parseInt(cycleInput.value)>1){
        cycleInput.value = parseInt(cycleInput.value)-1;
    }
}



//--设置部分--
//点击设置按钮
settingsBtn.addEventListener("click",function(){
    settingsDiv.style.display = "block";
    if(usersArr[0][0]==0){
        orderSpan.innerText = "默认";
    }
    else if(usersArr[0][0]==1){
        orderSpan.innerText = "升序";
    }
    else{
        orderSpan.innerText = "降序";
    }
})

//点击屏幕其他位置
window.addEventListener("click",function(event){
    if(event.target==settingsDiv){
        settingsDiv.style.display = "none";
    }
})


//编辑
let newUsersArr = [].concat(usersArr);
function refreshEditTable(){
    let tbodyOfEdit = "";
    for(let r=1;r<newUsersArr.length;r++){
        let cycleTxt = "不重复";
        if(newUsersArr[r][2]==1){
            cycleTxt = "每"+newUsersArr[r][3]+"天  ";
        }
        tbodyOfEdit = tbodyOfEdit + "<tr>" + "<td class=\"editTd\" style=\"font-size:10px;color:rgba(0,0,0,0.7);\">"+cycleTxt+"</td>"+
                    "<td class=\"editTd\" style=\"font-size:8px;color:rgba(0,0,0,0.6);\">"+newUsersArr[r][1]+"</td>"+
                    "<td class=\"editTd\">" + newUsersArr[r][0] + "</td>"+
                    "<td class=\"editTd\"><button class=\"editTableBtn\" id=\"editBtnsUp"+String(r)+"\">↑</button><button class=\"editTableBtn\" id=\"editBtnsDown"+String(r)+"\">↓</button>"+
                    "<button class=\"editDeleteBtn\" id=\"editDeleteBtn"+String(r)+"\">⛔</button></td>";
    }
    editTable.innerHTML = tbodyOfEdit;
    for(let r=1;r<newUsersArr.length;r++){
        upBtn = getEles(String("editBtnsUp"+r));
        downBtn = getEles("editBtnsDown"+String(r));
        deleteBtn = getEles("editDeleteBtn"+String(r));
        upBtn.addEventListener("click",function(){
            if(r!=1){
                let temp = newUsersArr[r];
                newUsersArr[r] = newUsersArr[r-1];
                newUsersArr[r-1] = temp;
                refreshEditTable();
            }
        })
        downBtn.addEventListener("click",function(){
            if(r!=newUsersArr.length-1){
                let temp = newUsersArr[r];
                newUsersArr[r] = newUsersArr[r+1];
                newUsersArr[r+1] = temp;
                refreshEditTable();
            }
        })
        deleteBtn.addEventListener("click",function(){
            newUsersArr.splice(r,1);
            refreshEditTable();
        })
    }
}

editBtn.addEventListener("click",function(){
    editBG.style.display = "block";
    if(usersArr.length==1){
        editWaringSpan.style.display = "block";
    }
    else{
        editWaringSpan.style.display = "none";
    }
    newUsersArr = [].concat(usersArr);
    refreshEditTable();
})
editDown.addEventListener("click",function(){
    editBG.style.display = "none";
    usersArr = [].concat(newUsersArr);
    localStorage.setItem("uArr",JSON.stringify(usersArr));
    showArr = sortArr(usersArr,usersArr[0][0]);
})
window.addEventListener("click",function(event){
    if(event.target==editBG){
        editBG.style.display = "none";
    }
})



//清空
clearBtn.addEventListener("click",function(){
    clearBG.style.display="block";
    dataSizeSpan.innerText = ((new Blob(usersArr)).size/1024).toFixed(2);
})
confirmClearBtn.addEventListener("click",function(){
    clearBG.style.display = "none";
    localStorage.removeItem("uArr");
})
cancelClearBtn.addEventListener("click",function(){
    clearBG.style.display = "none";
})

window.addEventListener("click",function(event){
    if(event.target==clearBG){
        clearBG.style.display = "none";
    }
})

//排列顺序
function sortArr(inarr,n){
    let arr = [inarr[1]];
    for(let i=1;i<inarr.length;i++){//判断循环
        arr[i] = [].concat(inarr[i]);
        if(inarr[i][2]==1&&+new Date()>+new Date(inarr[i][1])){
            arr[i][1] = new Date(
                Math.ceil(
                    (+new Date()- +new Date(arr[i][1]))/(1000*60*60*24*arr[i][3]))*(1000*60*60*24*arr[i][3]
                )+ +new Date(arr[i][1])
            );
       }
    }

    //排序
    if(arr.length<2||n==0){
        return arr;
    }
    else if(n==1){
        for(let i=1;i<arr.length-1;i++){
            for(let j=1;j<arr.length-i;j++){
                if(+new Date(arr[j][1])>+new Date(arr[j+1][1])){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr
    }
    else{
        for(let i=1;i<arr.length-1;i++){
            for(let j=1;j<arr.length-i;j++){
                if(+new Date(arr[j][1])<+new Date(arr[j+1][1])){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr
    }
}

orderBtn.addEventListener("click",function(){
    if(usersArr[0][0]==0){
        usersArr[0][0]=1;
        localStorage.setItem("uArr",JSON.stringify(usersArr));
        showArr = sortArr(usersArr,1);
        orderSpan.innerText = "升序";
    }
    else if(usersArr[0][0]==1){
        usersArr[0][0]=2;
        localStorage.setItem("uArr",JSON.stringify(usersArr));
        showArr = sortArr(usersArr,2);
        orderSpan.innerText = "降序";
    }
    else{
        usersArr[0][0]=0;
        localStorage.setItem("uArr",JSON.stringify(usersArr));
        showArr = sortArr(usersArr,0);
        orderSpan.innerText = "默认";
    }
})

//帮助
helpBtn.addEventListener("click",function(){
    helpBG.style.display="block";
})
helpDownBtn.addEventListener("click",function(){
    helpBG.style.display="none";
})
window.addEventListener("click",function(event){
    if(event.target==helpBG){
        helpBG.style.display = "none";
    }
})



//--显示主表格--
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
                        "<td class=\"mainTd\">"+arr[r][0]+"</td>"+
                        "<td class=\"mainTd\" style=\"color:blue\">"+arr[r][1]+"</td>"+
                        "<td class=\"mainTd\">"+arr[r][2]+"</td>"+
                        "</tr>";
        }
        else{
            theTbody = theTbody + "<tr>"+
                        "<td class=\"mainTd\">"+arr[r][0]+"</td>"+
                        "<td class=\"mainTd\" style=\"color:orange\">"+arr[r][1]+"</td>"+
                        "<td class=\"mainTd\">"+arr[r][2]+"</td>"+
                        "</tr>";
        }
    }
    return theTbody;
}

//更新表格
function showTable(){
    theTable.innerHTML = writeHTMLOfTbody(toDisplayArray(showArr));
}
setInterval(showTable,50);