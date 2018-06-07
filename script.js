function Board(){
    this.render = function(rowN, columnN){
        //initialize bunch of cards
        var column = columnN;
        var row = rowN;
        var html = "";
        var idNumber = 0;
        for(var i = 0; i < row; i++){
            html += "<div class='row'>";
                for(var j = 0; j < column; j++){
                    html += "<div" + " id=" + "'" + idNumber + "'" + "class='square unclick'><span class='square-text'></span></div>";
                    idNumber += 1;
                }
            html += "</div>" 
        }
        document.getElementById("container").innerHTML = document.getElementById("container").innerHTML+html;
      
        //create a list of random Id
        var randomId = this.shuffle(column*row);
        
        //set random value in the card
        for(var i = 0; i < randomId.length; i=i+2){
            var id1 = randomId[i];
            var id2 = randomId[i+1];
            var randomNumber = Math.floor((Math.random() * 10) + 1);
            document.getElementById(id1).firstChild.innerHTML = randomNumber;
            document.getElementById(id1).firstChild.style.visibility = "hidden";
            document.getElementById(id2).firstChild.innerHTML = randomNumber; 
            document.getElementById(id2).firstChild.style.visibility = "hidden";
        }
        var count = 0
        
        //add event listener to all the cards
        for(var j = 0; j < randomId.length; j++){
            (function(){
                var square = document.getElementById(j);  
                square.addEventListener("click",function b(e){  
                    console.log(document.getElementsByClassName('click').length);
                    if(document.getElementsByClassName('click').length <= 1){
                     if(this.firstChild.style.visibility == "hidden"){
                         this.firstChild.style.visibility = "visible";
                         this.classList.add('click');
                         this.classList.remove('unclick');
                         count += 1
                         document.getElementById("count").children[1].innerHTML = count;
                         setTimeout(function(){
                           if(document.getElementsByClassName('click').length == 2){       
                            var a = document.getElementsByClassName('click')
                            if(a[0].firstChild.innerText == a[1].firstChild.innerText){
                                a[0].removeEventListener('click',b);
                                a[1].removeEventListener('click',b);
                                a[0].style.visibility = "hidden";
                                a[1].style.visibility = "hidden";
                                a[0].firstChild.style.visibility = "hidden";
                                a[1].firstChild.style.visibility = "hidden";
                                a[0].classList.remove('click');
                                a[0].classList.remove('click'); 
                            }else{
                                a[0].firstChild.style.visibility = "hidden";
                                a[1].firstChild.style.visibility = "hidden";
                                a[0].classList.add('unclick');
                                a[1].classList.add('unclick'); 
                                a[0].classList.remove('click');
                                a[0].classList.remove('click'); 
                            }  
                         };  
                         },1000);
                    }else{
                        this.firstChild.style.visibility = "hidden";
                        this.classList.remove('click');
                        this.classList.add('unclick');
                    }
                    console.log(document.getElementsByClassName('unclick'));
                    if(document.getElementsByClassName('unclick').length == 0){
                        document.getElementById("container").innerHTML = document.getElementById("container").innerHTML+ "<button  id='again'>again</button>";
                        document.getElementById("again").onclick = function(){
                            location.reload();
                        }
                       
                    }
                    }
                });
            }());   
        }
        
    }
    
   
    
    //create a list of random number
    this.shuffle = function(num){
        for (var array=[],i=0;i<num;++i) array[i]=i;
        var tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }
}

function init(){
   // location.reloa    d();
    var board = new Board();
    
    board.render(3,4)
}

function rowcol(){
    var b = document.getElementsByTagName("input");
    var array = [parseInt(b[0].value), parseInt(b[1].value)];
     if(array[0]*array[1] % 2 != 0){
        alert("相乘必须是偶数");
        return 
    }
    document.getElementById("container").innerHTML = ""
    var board = new Board();
   
    board.render(array[0],array[1]);
    
}
