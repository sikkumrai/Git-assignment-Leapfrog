

this.container = document.querySelector(".carousel-container")
this.wrapper = document.querySelector(".carousel-wrapper")
this.images = document.querySelectorAll(".carousel-wrapper img")
before_pointer = document.createElement('div')
after_pointer = document.createElement('div')

let imageLength = this.images.length


wrapper.style.width = 1000 * imageLength + 'px'
wrapper.style.height = 1000 + 'px'
wrapper.style.marginLeft = '0px';
wrapper.style.position = 'absolute';
wrapper.style.left = '0px'
var wrapperLeft = 0;





this.dot_wrapper = document.createElement('div')
dot_wrapper.className = "dot_wrapper";
dot_wrapper.style.display = "inline-block";
dot_wrapper.style.position = "absolute";
dot_wrapper.style.left = '50%';
dot_wrapper.style.transform = 'translate(-50%, 0%)';
dot_wrapper.style.bottom = '50px';
dot_wrapper.margin = '0, auto';
container.appendChild(dot_wrapper);

let dot_list = []


for ( var i = 0; i < imageLength; i++) {

    this.images[i].style.float = "left"
    

    this.dot = document.createElement('div')
    dot.className = "dot";
    dot.style.display = 'inline-block';
    dot.style.height = '10px';
    dot.style.width = '10px';
    dot.style.background = '#AFACAB';
    dot.style.borderRadius = '50%';
    dot.style.marginRight = '15px';
    dot.style.cursor = 'pointer';

    dot_wrapper.appendChild(dot);

    let x = i
    dot.addEventListener('click', function(){
        
        transition(currentIndex, x);

        console.log(currentIndex, x)
        return currentIndex = x;
        
    });
    
    dot_list.push(dot)
    
    
    
}
console.log(dot_list)

 

function setActiveDot(index){
    for(var i=0; i<dot_list.length; i++){
        if (index === i){
            dot_list[i].style.backgroundColor = '#3E436F'
        } else dot_list[i].style.backgroundColor = '#AFACAB'
    }
}


before_pointer.setAttribute('id', '#before_pointer');
before_pointer.setAttribute('class', 'left');
before_pointer.style.position = 'absolute';
before_pointer.style.top = '50%';
before_pointer.style.left = '0';
before_pointer.style.padding = '100% 50px'
before_pointer.style.transform = 'translate(0, -50%)';
before_pointer.style.color = '#ffffff';
before_pointer.style.fontSize = '30px';
before_pointer.innerHTML = '◀';
before_pointer.style.opacity= '0.75'
before_pointer.style.cursor = 'pointer'
container.appendChild(before_pointer);

after_pointer.setAttribute('id', '#after_pointer');
after_pointer.setAttribute('class', 'right');
after_pointer.style.position = 'absolute';
after_pointer.style.top = '50%';
after_pointer.style.right = '0';
after_pointer.style.padding = '100% 50px';
after_pointer.style.transform = 'translate(0,-50%)';
after_pointer.style.color = '#ffffff';
after_pointer.style.fontSize = '30px';
after_pointer.style.opacity= '0.75'
after_pointer.style.cursor = 'pointer'
after_pointer.innerHTML = '▶'
container.appendChild(after_pointer);

isTransiting = false;
let currentIndex = 0;

after_pointer.addEventListener('click', function(e){
    if (!isTransiting){
        if (currentIndex == imageLength-1){
            currentIndex = 0;
            currentIndex = transition(imageLength-1, currentIndex);
        } else {
            currentIndex = transition(currentIndex, currentIndex+1);
        }
    }
});

before_pointer.addEventListener('click', function(e){
    if(!isTransiting){
       let  pastIndex = (currentIndex-1 + imageLength) % imageLength;
        currentIndex = transition(currentIndex, pastIndex)
    }
});



let transition = function(currentIndex, nextIndex){


    var interval = setInterval(function(){ 

        var dir =  nextIndex > currentIndex ? 1 : -1; 

       
        if (currentIndex ==  0 && nextIndex == imageLength-1) {
            wrapperLeft += (-dir) * (1000/20)

        } else  if (currentIndex == imageLength-1 && nextIndex == 0 ) {

            wrapperLeft += (-dir) * (1000/20)
        }
      
        wrapperLeft += (-dir) * (1000/60);   
        wrapper.style.left = wrapperLeft + 'px';

        if (dir == 1 && wrapperLeft <= -(nextIndex) * 1000) { 
            wrapper.style.left = -nextIndex * 1000 + 'px';
            setActiveDot(nextIndex);
            clearInterval(interval);
            isTransiting = false;
        } else if ( dir == -1 && wrapperLeft >= -(nextIndex) * 1000) { 
            wrapper.style.left = -nextIndex * 1000 + 'px';
            clearInterval(interval);
            setActiveDot(nextIndex);
            isTransiting = false;
        }   

        
    },16.67);

    return nextIndex;

}