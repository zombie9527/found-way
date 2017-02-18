(function(window,document){
    var theNum = 400,
        flag = 1,
        startPort = 0,
        endPort = 0,
        openList = [],
        closeList = [],
        size = 20,
        time;

    var ulBox = document.createElement("ul"),
        box = document.getElementById('box'),
        start = document.getElementById("begin"),
        btOne = document.getElementById("bt-one"),
        btTwo = document.getElementById("bt-two"),
        btThree = document.getElementById("bt-three"),
        startLi = document.getElementsByClassName("theStart"),
        endLi = document.getElementsByClassName("theEnd"),
        blockLi = document.getElementsByClassName("roadBlock"),
        allLi;

    for(let i = 0;i<theNum;i++){
        let ali = document.createElement("li");
        ali.onclick = function(){
            switch(flag){
                case 1:if(!startPort){this.className = "theStart";startPort++;flag=2;};break;
                case 2:if(!endPort){this.className = "theEnd";endPort++;flag=3;}break;
                case 3:this.className = "roadBlock";break;
            }
        }
        if(!(Math.ceil(Math.random()*4)-1)){
            ali.className = "roadBlock";
        }
        ulBox.appendChild(ali);
    }
    ulBox.style.height = ulBox.style.width = Math.sqrt(theNum)*(size+1) + "px";
    box.appendChild(ulBox);

    btOne.onclick = function(){
        this.className = "choose";
        btTwo.className = btThree.className = "";
        flag = 1;
        if(!startLi.length){
            startPort = 0;
        }
    }
    btTwo.onclick = function(){
        this.className = "choose";
        btOne.className = btThree.className = "";
        flag = 2;
        if(!endLi.length){
            endPort = 0;
        }
    }
    btThree.onclick = function(){
        this.className = "choose";
        btTwo.className = btOne.className = "";
        flag = 3;
    }

    start.onclick = foundInit;
    function foundInit(){
        allLi = ulBox.getElementsByTagName("li");
        openList.push(startLi[0]);
        for(let i = 0;i<blockLi.length;i++){
            closeList.push(blockLi[i]);
        }
        openFn();
    }
    function f(nodeli){
        
        return g(nodeli) + h(nodeli);
    }
    function g(nodeli){
        var b = startLi[0].offsetLeft - nodeli.offsetLeft;
        var a = startLi[0].offsetTop - nodeli.offsetTop;
        return c = Math.sqrt(a*a+b*b);
    }
    function h(nodeli){
        var b = endLi[0].offsetLeft - nodeli.offsetLeft;
        var a = endLi[0].offsetTop - nodeli.offsetTop;
        return c = Math.sqrt(a*a+b*b);
    }

    function openFn(){
        var newLi = openList.shift();
        closeFn(newLi);
        lookUp(newLi);
        
        // console.log(openList);
        if(endLi[0]==newLi){
            showLi();
            return;
        }
        openList.sort(function(li1,li2){
            return li1.num-li2.num;
        })
        openFn();
    }
    function closeFn(newLi){
        closeList.push(newLi)
    }
    function lookUp(newLi){
        var result = [];
        for(let i=0;i<allLi.length;i++){
            if(filter(allLi[i])){
                result.push(allLi[i]);
            }
        }
        for(let i = 0; i<result.length;i++){
            if((Math.abs(newLi.offsetLeft-result[i].offsetLeft)<=size+1&&Math.abs(newLi.offsetTop-result[i].offsetTop)==0)||(Math.abs(newLi.offsetLeft-result[i].offsetLeft)==0&&Math.abs(newLi.offsetTop-result[i].offsetTop)<=size+1)){
                result[i].num = f(result[i]);
                result[i].preli = newLi;
                openList.push(result[i]);
            }
        }
    }
    //筛选
    function filter(li){
        for(let i = 0;i<closeList.length;i++){
            if(closeList[i] == li)
                return false;
        }
        for(let i = 0;i<openList.length;i++){
            if(openList[i] == li)
                return false;
        }
        return true;
    }
    function showLi(){
        var result = [];
        var pli = closeList.pop();
        while(pli!=startLi[0]){
            result.unshift(pli);
            pli = pli.preli;
        }
        time = setInterval(function(){
            if(result.length){
                result.shift().className = "path";
            }else{
                clearInterval(time);
            }
        },100);
    }
})(window,document);