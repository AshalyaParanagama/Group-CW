
var text;
var header;
var topNav;
function expandImg(imageSrc, headerId, textId) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    var modalText = document.getElementById(textId);
    var modalHeader = document.getElementById(headerId);
    topNav = document.getElementById('nav');

    topNav.style.display = 'none';
    
    text = modalText;
    header = modalHeader;

    modalHeader.style.display = "grid";
    modalText.style.display = "grid";
    modal.style.display = "grid";
    modalImg.src = imageSrc;

  }
  function closeImg() {
    var modal = document.getElementById("myModal");
    topNav.style.display = 'flex';
    text.style.display = "none";
    header.style.display = "none";
    modal.style.display = "none";
  }

  function changeColor(color){
    // var col= document.getElementById();

    document.documentElement.style.setProperty('--bgColor', color);
    console.log("button has been pressed")
  }

  const verdana = "'verdana', Arial, sans-serif";
  const comicSans = "'dyslexiFont', Arial, sans-serif";
function setFont(font) {
  const body = document.getElementById('body');

  if(font == '1'){
    body.style.fontFamily = verdana;

  }
  else{
    body.style.fontFamily = comicSans;

  }
}


  