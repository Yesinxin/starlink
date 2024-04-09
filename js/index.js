	  var sliderPage=document.getElementsByClassName("sliderPage")[0];
      var moveWidth=sliderPage.children[0].offsetWidth;
      var num=sliderPage.children.length -1;
      var lock=true;
      var leftBtn=document.getElementsByClassName("leftBtn")[0];
      var rightBtn=document.getElementsByClassName("rightBtn")[0];
      var timer=setTimeout(autoMove,2500);
      console.log(leftBtn);
      leftBtn.onclick=function(){
          autoMove("pre");
      }
      rightBtn.onclick=function(){
          autoMove("next")
      }
 	function autoMove(direction){
          if(lock){
              lock=false;
              clearTimeout(timer);
              if(!direction || direction=="next"){
                 startMove(sliderPage,{left:sliderPage.offsetLeft - moveWidth},
                 function(){
                      if(sliderPage.offsetLeft== - num * moveWidth){
                          sliderPage.style.left="0px";
                      }
                      var timer=setTimeout(autoMove,2500);
                      lock=true;
                  })
              }
              else if(direction=="pre"){
                  if(sliderPage.offsetLeft==0){
                      sliderPage.style.left=- num * moveWidth +"px";
                  }
                 startMove(sliderPage,{left:sliderPage.offsetLeft + moveWidth},
                 function(){
                      timer = setTimeout(autoMove,2500)
                      lock = true;
                      var timer=setTimeout(autoMove,2500);
                      lock=true;
              })
          }
          }
      }
function startMove(dom, attrObj,callback) {
    clearInterval(dom.timer)
    var iSpeed = null,
        iCur = null;  //步长(元素样式变化的长度)
    dom.timer = setInterval(function () {
        var bStop = true;
        for (var attr in attrObj) {
            if (attr == "opacity") {
                iCur = parseFloat(getStyle(dom, attr)) * 100
            } else {
                iCur = parseFloat(getStyle(dom, attr))
            }
            iSpeed = (attrObj[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
            if (attr == "opacity") {
                dom.style.opacity = (iCur + iSpeed) / 100
            } else {
                dom.style[attr] = iCur + iSpeed + "px"
            }
            if(iCur != attrObj[attr]){
                bStop = false
            }
        }
        if(bStop){
            clearInterval(dom.timer)
            typeof callback == "function" && callback()
        }
    }, 30)
}
function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom,null)[attr]
    }else{
        return dom.currentStyle[attr]
    }
}
