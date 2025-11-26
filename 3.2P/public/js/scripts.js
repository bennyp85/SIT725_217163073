const clickMe = () => {
    alert("Button Clicked!");
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(()=>{
        clickMe();
    })
  });