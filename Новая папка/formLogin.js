
function Proverka() { // Проверка на ввод Логина и пароля
	var log=document.getElementById('login').value;
	var pass=document.getElementById('password').value;
	if (log.trim()=="") {
		log="";
		document.getElementById('login').focus();
		alert("Введите логин");
		return false;}
	else if ((log.trim()).length>21) {
		document.getElementById('login').focus();
		alert("Логин должен содержать не более 20 символа");
		return false;}
	else if (pass.trim()=="") {
		pass="";
		document.getElementById('password').focus();
		alert("Введите пароль");
		return false;}
	else {
		return true;
	}
}
						
//Проверяем на логин (чтоб вывести алерт)

document.getElementById('formLogin').hidden=false
if (nicName=='') {}
else if (nicName=='NoIpPasUser') {//в паре Логин-пароль-IP не совпали пароль и IP
	alert("Данный логин уже используется \n Введите другой логин");
	}
else if (nicName=='NoPasUser') {//в паре Логин-пароль-IP не совпали пароль-логин, зато совпал IP
	alert("Вы указали неверный пароль \n Вспоминайте \n (тут можно сделать отправку на почту)")
	}
else {
	document.getElementById('formLogin').hidden=true;//скрываем div с формой для ввода логина
	//document.getElementById('formLogin').z-index=-100;//запускаем сокет
	var script = document.createElement("SCRIPT"),
	head = document.getElementsByTagName( "head" )[ 0 ];
	script.type = "text/javascript";
	script.src = 'lib/StartSocket.js';
	head.appendChild(script);
}


//Это нужно было для предыдущих версий :)
var g=new Date()
var gmtHours = -g.getTimezoneOffset()*60;
//заполняем скрытое поле с разницой в секундах по гринвичу
document.write("<input type='hidden' name='timeZone' value='"+gmtHours+"'>");
