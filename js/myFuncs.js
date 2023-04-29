// 全部函数         名称                    参数类型            返回类型
//不满10补0         insert0(num)            int                 string
//时间戳转化为时间   toTime(timeStamp)       int                 arr
//倒计时            countDown(time)         String              arr
//排序              sort(arr,orderArr)      arr arr             arr
//全排列枚举        fullPermutation(arr)    arr                 arr



const myFuncs = {};
//补0
myFuncs.insert0 = (num)=>{return num<10?"0"+num:String(num);}

//时间戳转化为时间
myFuncs.toTime = (timeStamp)=>{
    timeStamp = Math.abs(timeStamp);
    let day = myFuncs.insert0(parseInt(timeStamp/1000/60/60/24))
    let hour = myFuncs.insert0(parseInt(timeStamp/1000/60/60%24));
    let minute = myFuncs.insert0(parseInt(timeStamp/1000/60%60));
    let second = myFuncs.insert0(parseInt(timeStamp/1000%60));
    return [day,hour,minute,second];
}

//倒计时
myFuncs.countDown = (time)=>{
    let nowTime = +new Date();//当前时间时间戳
    let targetTime = +new Date(time);//传入目标时间
    let result = myFuncs.toTime(targetTime - nowTime);
    if(targetTime-nowTime>0){
        return ["还有"].concat(result);
    }
    else{
        return ["已经"].concat(result);
    }
}

//按orderArr每一位的数字对应确定arr中数排在result第几
//如arr=[100,2020,300],orderArr=[2,0,1],result=[2020,100,300]
myFuncs.sort = (arr,orderArr)=>{
    let result = [orderArr.length];
    for(a=0;a<orderArr.length;a++){
        let SN = orderArr[a];
        result[SN] = arr[a];
    }
    return result;
}

myFuncs.fullPermutation = (arr)=>{
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