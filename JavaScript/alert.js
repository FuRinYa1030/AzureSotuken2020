function al(){
  alert("aaa");
  document.getElementById('eid_date').innerHTML = Date();
}

function start(){
  alert("aba");
    timer.style.width = "0px"// ←widthを0pxにすることで減っていくアニメーションが始まる。
}

function stop(){
    var timer = document.getElementById("timer");
    var a = timer.offsetWidth;
    alert(a);
    timer.style.width = a + "px"; // ←停止の為に、現在の幅をwidthに与える。
}


var toggle = 0;

function AnimeCont(){
  if(toggle == 0){

    $(".ball:eq(0)").css("animation-play-state","paused");
    $(".ball:eq(1)").css("animation-play-state","paused");
    $(".ball:eq(2)").css("animation-play-state","paused");
    $(".ball:eq(3)").css("animation-play-state","paused");
    $(".ball:eq(4)").css("animation-play-state","paused");
    $(".ball:eq(5)").css("animation-play-state","paused");
    $(".ball:eq(6)").css("animation-play-state","paused");

    toggle = 1;
  }

  else{
    $(".ball:eq(0)").css("animation-play-state","running");
    $(".ball:eq(1)").css("animation-play-state","running");
    $(".ball:eq(2)").css("animation-play-state","running");
    $(".ball:eq(3)").css("animation-play-state","running");
    $(".ball:eq(4)").css("animation-play-state","running");
    $(".ball:eq(5)").css("animation-play-state","running");
    $(".ball:eq(6)").css("animation-play-state","running");

    toggle = 0;
  }
}
