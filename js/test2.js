Arr=[[],1,2,3,5,5,3,4];
function sort(arr){
    for(let i=1;i<arr.length-1;i++){
        for(let j=1;j<arr.length-i;j++){
            if(arr[j]<arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
console.log(sort(Arr));