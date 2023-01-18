var navi = document.querySelector(".navi");
var lists = navi.children;
for(var i=0;i<lists.length;i++){                 //循环给每个list注册事件
    lists[i].onmouseover = function(){
        this.children[1].style.display = "block";
    }
    lists[i].onmouseout = function(){
        this.children[1].style.display = "none";
    }
}

