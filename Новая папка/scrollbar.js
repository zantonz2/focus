 
function TapScroll(id, e) {
      var areaTxt=document.getElementById(id);
      var sliderElem = document.getElementById(id+'ScrollBox');
      var thumbElem = document.getElementById(id+'Scroller');
      var HiScroll=areaTxt.scrollHeight-areaTxt.clientHeight;
      var thumbCoords = getCoords(thumbElem);
      var shiftY = e.pageY - thumbCoords.top;//положение мышки на бегунке
      var sliderCoords = getCoords(sliderElem);//бокс прокрутки

      document.onmousemove = function(e) {
        //  вычесть координату родителя, т.к. position: relative
        var newTop = e.pageY - shiftY - sliderCoords.top;//
        //Высота кнопок (одинаковые) из стилей
        var topButton=document.getElementById(id+'ScrollDown').offsetHeight;
        if (newTop < topButton) { 
          newTop = topButton;
        }
        var Down = sliderElem.offsetHeight - thumbElem.offsetHeight - topButton;
        if (newTop > Down) {
          newTop = Down;
        }

        thumbElem.style.top = newTop +'px';
        DeltaScroll=newTop-topButton; //растояние от низа кнопки до верха бегунка
        //высота от кнопки до кнопки в px
        ScrollSolid=sliderElem.offsetHeight-document.getElementById(id+'ScrollDown').offsetHeight-document.getElementById(id+'ScrollUp').offsetHeight; //высоота хода бегунка
        maxTop=ScrollSolid-thumbElem.offsetHeight;//высота хода-высота бегунка
        scrolling=DeltaScroll*HiScroll/maxTop;
        areaTxt.scrollTop=scrolling;
        sliderElem.style.top=areaTxt.scrollTop+'px';
        
        ////////////////////////////////
        //просмотр  
        //newMessage=document.createElement('text');
        //newMessage.innerHTML= scrolling+"=scrolling"+areaTxt.scrollTop+"СкролТОП <br>";
        //document.getElementById('000').appendChild(newMessage);
        ///////////////////////////////
      }

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    return false; // disable selection start (cursor change)
};


    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

//Прорисовка бегунка
function scrolerVisio(id) { //Масштабируем скроллер (Бокс)
    var areaTxt=document.getElementById(id);
    var sliderElem = document.getElementById(id+'ScrollBox');
    var thumbElem = document.getElementById(id+'Scroller');

      ////////////////////////////////
      //просмотр  
      //newMessage=document.createElement('text');
      //newMessage.innerHTML= areaTxt.offsetHeight+"-areaTxt.offsetHeight, "+areaTxt.scrollHeight+"-areaTxt.scrollHeight<br>";
      //document.getElementById('000').appendChild(newMessage);
      ///////////////////////////////

    //высота фрейма в боксе - высота бокса
    var ScrollBox = areaTxt.scrollHeight-areaTxt.offsetHeight; 
    //высота от кнопки до кнопки в px
    if (ScrollBox<0) {sliderElem.hidden=true;}//если ненужна прокрутка скрыть.
    else { 
      sliderElem.hidden=false;
      var ScrollSolid=sliderElem.offsetHeight-document.getElementById(id+'ScrollDown').offsetHeight-document.getElementById(id+'ScrollUp').offsetHeight; 
      //вычисляем процент заполнения (высоту)
      boxPer = (areaTxt.offsetHeight)/(areaTxt.scrollHeight);//доли
      Scroll=ScrollSolid*((ScrollBox>0)?((boxPer<0.1)?0.1:boxPer):1);
      
      thumbElem.style.height = Scroll+"px";

      Schift_Blok_Scroll(id,0);//Позиционирование скроллбара и бегунка
    }
                     
};


function Schift_Blok_Scroll(id, scift_Blok) {
  //для скрол колесика
    //var id=SearthScroll(id);
    var areaTxt=document.getElementById(id);
    var sliderElem = document.getElementById(id+'ScrollBox'); //alert(sliderElem);
    var thumbElem = document.getElementById(id+'Scroller');
    var scrolling=document.getElementById(id).scrollTop; //Положение прокрутки (топ фрейма)
    var maxTop=areaTxt.scrollHeight-areaTxt.offsetHeight; // Максимально возможная прокрутка
    var scrolling=((scrolling+scift_Blok)>maxTop)?maxTop:((scrolling+scift_Blok)<0)?0:scrolling+scift_Blok; // Чтоб не ушел вниз или вверх
    areaTxt.scrollTop=scrolling; //Изменяем скрол фрейма
    sliderElem.style.top=areaTxt.scrollTop+'px'; //положение скроллбара
    HightHod=sliderElem.offsetHeight-thumbElem.offsetHeight-document.getElementById(id+'ScrollDown').offsetHeight-document.getElementById(id+'ScrollUp').offsetHeight; //Высота хода бегунка
    TopScroller=scrolling*HightHod/maxTop+document.getElementById(id+'ScrollUp').offsetHeight;//положение бегунка
    thumbElem.style.top=TopScroller+'px';
    //alert(id+"::"+scift_Blok);
}


 document.ondragstart=function(){
    return false;
  };

/*Колесико */
function addOnWheel(elem, handler) {
      //var elem = document.getElementById(elem);
      if (elem.addEventListener) {
        if ('onwheel' in document) {
          // IE9+, FF17+
          elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
          // устаревший вариант события
          elem.addEventListener("mousewheel", handler);
        } else {
          // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
          elem.addEventListener("MozMousePixelScroll", handler);
        }
      } else { // IE8-
        text.attachEvent("onmousewheel", handler);
      }
    }


function onscroll(e) {
      e = e || window.event;
      var delta = e.deltaY || e.detail || e.wheelDelta;
      var target=e.target;
      while (document.getElementById(target.id+'ScrollBox')==null) { 
        target=target.parentNode; //ищем родителя у которого есть наш скроллбар
      };
      Schift_Blok_Scroll(target.id, delta);
      e.preventDefault();
      return true;
    };


function addScrollbar(element) //добавляем сам скроллБар
{
 
 var id=element.id;
 src='<div class="scrollBox" id="'+id+'ScrollBox">\n\
        <div class="scroller" id="'+id+'Scroller" onmousedown="TapScroll(\''+id+'\',event)"></div>\n\
        <div class="scrollUp" id="'+id+'ScrollUp" onmousedown="Schift_Blok_Scroll(\''+id+'\',-100)"></div>\n\
        <div class="scrollDown" id="'+id+'ScrollDown" onmousedown="Schift_Blok_Scroll(\''+id+'\',100)"></div>\n\
      </div>'
        
       //jsText = 'addOnWheel(document.getElementById('+id+'), onscroll);';
        jsText = 'document.getElementById("'+id+'").addEventListener ("mousewheel", onscroll,false);\n';
        js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        //js.setAttribute('defer', 'defer');
        js.innerHTML = jsText;
        element.innerHTML=element.innerHTML+src;
        element.appendChild(js);
        

       /* js = document.createElement('script');
 js.setAttribute('type', 'text/javascript');
 js.setAttribute('defer', 'defer');
 js.innerHTML = jsText;
 element.innerHTML=element.innerHTML+src;
 element.appendChild(js);
        ////////////////////////////////
        var Scrollbar=document.createElement(src);
        Scrollbar.innerHTML= src;
        element.appendChild(Scrollbar);*/
        scrolerVisio(id);
 
}