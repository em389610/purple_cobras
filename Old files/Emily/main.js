var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'AND.png') {
      myImage.setAttribute ('src','OR.png');
    } 
    if(mySrc === 'OR.png') {
      myImage.setAttribute ('src','NOT.png');
    }
    if(mySrc === 'NOT.png') {
      myImage.setAttribute ('src','AND.png');
    }
} 

