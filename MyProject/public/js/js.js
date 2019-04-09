(function(){
    let ul = document.querySelectorAll('ul')[0]
    let p = document.querySelectorAll('p')
    let a = document.querySelectorAll('a')
    let div = document.getElementsByTagName('div');
    let span = document.getElementsByTagName('span');
    let img = document.querySelectorAll('img');
    let h2 = document.querySelectorAll('h2');
    let unnestedTXT = document.querySelector('body')



    // unnestedTXT.contents().filter(function(){ 
    //     return this.nodeType == 3; 
    //   })[0].nodeValue = "The text you want to replace with"

    // remove with and height properties - change them in styles.css

for(let i = 0; i< img.length; i++){
    img[i].removeAttribute('height');
    img[i].removeAttribute('width');

}


// Remove <ul> and its content (was used for navigation in original site?)
ul.parentNode.removeChild(ul);

// Delete all <a> elements element

for(let i = 1; i<a.length; i++){
    a[i].parentNode.removeChild(a[i]);

}

// Delete outer div - keep the content
while(div.length) {
    var parent = div[ 0 ].parentNode;
    while( div[ 0 ].firstChild ) {
        parent.insertBefore(  div[ 0 ].firstChild, div[ 0 ] );
    }
    parent.removeChild( div[ 0 ] );
}



// Delete outer span - keep the content
while(span.length) {
    var parent = span[ 0 ].parentNode;
    while( span[ 0 ].firstChild ) {
        parent.insertBefore(  span[ 0 ].firstChild, span[ 0 ] );
    }
    parent.removeChild( span[ 0 ] );
}


// add classes for styling purposes

// add class to <p>
for(let i = 0; i < p.length; i++){
    p[i].classList.add('smalltxt')
    p[i].setAttribute("tabindex", "0")
    
}


// add class to <h2>
for(let i = 0; i < h2.length; i++){
    h2[i].classList.add('header')
    
}


// add elements to their own <article> // not working yet
for(let i; i<img.length; i++){

    let newArticle = body.createElement('article')
    newArticle[i].appendChild(img[i], p[i], h4[i])
    //img.parentNode.createElement('article').innerHTML.appendChild(img, p, h4)
}


// let counter = 0;
// let counter2 = 0

// const allElements = Array.from(document.querySelector('.mya').children);
// console.log(allElements)

// allElements.forEach((element, index) =>{
//     counter = counter + 2;
//     console.log(counter, index)
//     if(index <= counter){
//         let newDiv = document.createElement('div');
//         newDiv.classList.add('test')
//         document.querySelector('.mya').appendChild(newDiv)

//     }

// })


// child.forEach((child,index)=>{
// 	const div = document.createElement('div')
// 	counter2 += 2
// 	if(index<=counter){
// 		div.appendChild(child)
// 		allElements.appendChild(div)
// 	}
// })



// Add Lazy Loading for images // not working yet

const images = Array.from(document.querySelectorAll("img"));


const options = {
    treshold: 1.0,
    rootMargin: "10px 10px 10px 10px",
}

const observer = new IntersectionObserver((e) => {
    e.forEach(entry => {
 let originalSrc = entry.target.src;

        if (entry.isIntersecting) {
            console.log('loading lazy')
            console.log(entry.target)
            console.log(originalSrc)
            entry.target.src = originalSrc
            entry.target.onload = function(e) {
                this.style.setProperty("--imgDisplay", "block");
            };
            entry.target.onprogress = function(e) {
                console.log(e)
            }
        };
    });
}, options);


images.forEach((i) => {
    observer.observe(i);
});

console.log('applied client side js-styling')

}())