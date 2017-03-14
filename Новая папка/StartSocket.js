
var socket = new WebSocket("ws://127.0.0.1:9000");

socket.onopen = function(ev) { // connection is open 
	 socket.send(nicName);
 }

socket.onmessage = function(ev) {
   addMessage('MoreTxt',ev.data);
}
//socket.onclose = function(ev){ alert("Disconect"); }
socket.onclose = function(ev) {
	  if (ev.wasClean) {
		  alert('Соединение закрыто');
		  } 
	  else {
	    alert('Обрыв соединения'); // например, "убит" процесс сервера
	    setTimeout(function(){location.reload()}, 30000); // перезагрузка через 30 секунд
		}
}
		
	 	
function Otpravka(){ 
		var mmessage=document.getElementById('MesTxt').value;
		if (mmessage.trim()=="") {
			document.getElementById('MesTxt').value="";
			alert("Вы не ввели сообщение");
			}
		else{
			var ch=BlokStyle.querySelectorAll('[name="colortext"]:checked');
			var bol=BlokStyle.querySelectorAll('[name="boldtext"]');
			var it=BlokStyle.querySelectorAll('[name="italic"]');
			var fon=BlokStyle.querySelectorAll('[name="font"]:checked');
			var boldTxt=(bol[0].checked)?"bolder":"lighter";
			var italicTxt=(it[0].checked)?"italic":"normal";
			var StMess= { //объект стиля с сообщением 
				colortext : ch[0].value,
				boldtext : boldTxt,
				italic : italicTxt,
				font : fon[0].value,
				message : mmessage,
				UserName : nicName
				};
			socket.send(JSON.stringify(StMess));
			document.getElementById('MesTxt').value="";
			}
}		


function addMessage(Blok, Massiv){	
			var Massiv=JSON.parse(Massiv);
			var date = new Date();
		    var optionDate = {
		    		hour: 'numeric',
		    		minute: 'numeric',
		    		second: 'numeric'
		    };
		    var time=date.toLocaleString("ru",optionDate);
		if(Massiv.UserName) {
		    var newMessageDIV=document.createElement('div');
		    //alert(Massiv.UserName);
		    if (Massiv.UserName=="system"){
		    	newMessageDIV.id='message';
			    newMessageDIV.className='system';
			    if (Massiv.nic!=null) {
			    	newMessageDIV.innerHTML='<span class=\"time\">['+time+'] </span><span class="nic"><a href="javascript:void(0)" onclick=ClickNic(this.innerHTML)>'+Massiv.nic+'</a></span> '+Massiv.message;
			    } else {
			    	newMessageDIV.innerHTML='<span class=\"time\">['+time+'] </span>'+Massiv.message;
				}
			}
			else if (Massiv.UserName=="NicList") {
				actionNicList('List', Massiv);
				return;
			}
		    else {
			    newMessageDIV.id='message';
			    newMessageDIV.style.color=Massiv.colortext;
			    newMessageDIV.style.fontFamily=Massiv.font;
			    newMessageDIV.style.fontWeight=Massiv.boldtext;
			    newMessageDIV.style.fontStyle=Massiv.italic;
		    	newMessageDIV.innerHTML='<span class=\"time\">['+time+'] </span><a href="javascript:void(0)" onclick=ClickNic(this.innerHTML)>'+Massiv.UserName+'</a>: '+Massiv.message;
			};
		    document.getElementById(Blok).appendChild(newMessageDIV);
		    document.getElementById(Blok).scrollTop = document.getElementById(Blok).scrollHeight;
		    deleteMoreMess(Blok, "message", 100); //100-максимальное количество сообщений
			scrolerVisio(Blok);
		}
}

function ClickNic(e) {
	var inputTxt=document.getElementById('MesTxt').value;
	inputTxt+=e+", ";
	document.getElementById('MesTxt').value=inputTxt;
}

function findEnter(e) {
	        if (e.keyCode === 13) {
	            Otpravka();
	            e.preventDefault();
	        }

	return false;
}

function actionNicList(Blok, Massiv) {
	var elem=document.getElementById(Blok);
		//удаляем весь список 
		elem.innerHTML='';
		var nicNames=Massiv.message;
		for(var key in nicNames) {
			if (nicNames[key]!=null) {
				var newMessageA=document.createElement('div');
				newMessageA.innerHTML=nicNames[key];
				elem.appendChild(newMessageA);
				newMessageA.className='nic';
				newMessageA.style.textAlign='left';
				newMessageA.onclick=function() {ClickNic(this.innerHTML);} 
			};
		};
	scrolerVisio(elem.parentNode.id);
}

function deleteMoreMess(Blok, message, max) {
	var blokDelMes=document.getElementById(Blok);
	var deleteMess=blokDelMes.querySelectorAll('#message');
	var le=deleteMess.length-max;
	if ( le > 0) {
		//alert("Элементов message = " + deleteMess.length);
		for (var i=0; i<le; i++) {
			blokDelMes.removeChild(deleteMess[i]); 
		}
	};
}
