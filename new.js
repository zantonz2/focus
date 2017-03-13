
var produkt=[{
	name:'СТАНДАРТНЫЙ ПАКЕТ',
	time:'08 апреля 2012',
	bg:'shot__baground_shot1'
	},
	{
	name:'НОВЫЙ ЦФТ-БАНК',
	time:'09 сентября 2016',
	bg:'shot__baground_shot2'
	},
	{
	name:'КАТАЛОГ РАЗРАБОТОК',
	time:'03 марта 2015',
	bg:'shot__baground_shot3'
	}];


	
function fillBox(block, content,f) {
	var length=content.length;
	var el=document.querySelector(block);
	for (var i=0; i<length; i++) {
		f(el,content,i);
	}
}


function createHref(elem,content,i){
		var Col3=createBlock('div','col3');
		var fig=createBlock('figure','figure');
		var shot=createBlock('div','shot shot__size_med '+content[i].bg);
		var figcap=createBlock('figcaption', 'figcaption main__hover_red');
		figcap.innerHTML=content[i].name;
		var time=createBlock('time','time');
		time.innerHTML=content[i].time;
		fig=Col3.appendChild(fig);
		fig.appendChild(shot);
		figcap=fig.appendChild(figcap);
		figcap.appendChild(time);
		elem.appendChild(Col3);
}

function createBlock(tag, cl) {
	var div=document.createElement(tag);
	div.className=cl;
	return div;
}


function clearBox(block) {
	var rowCol3=document.querySelector(block);
	rowCol3.innerHTML='';
}

function rndBox(block, content ,delay) {
	fillBox(block, content);
		setInterval(function(){
			content.sort(rand);
			clearBox(block);
			fillBox(block, content);
		},delay);
}


var moreProdukt=generateArray(produkt,7).sort(rand);

console.log(moreProdukt);


function rand(){
		return (Math.random()<0.5)? -1: 1;
	};
	

function generateArray(arrObj, leng) {
	var arr=[], i=0;
	var lengthArrObj=arrObj.length;
	for (i=0;i<leng;i++) {
		arr.push(arrObj[parseInt(Math.random()*(lengthArrObj))]);
	}
	return arr;
}

function CaruselFillBox(block, content) {
	var caruselPoint=document.querySelectorAll('.carusel__point');
	for (var i=0; i<caruselPoint.length; i++) {
		if (caruselPoint[i].className==='carusel__point carusel__point_active') break;
	}
	i=(i<1)?1:i;
	i=(i===(caruselPoint.length-1))?(caruselPoint.length-2):i;
	var rowCol3=document.querySelector(block);
	for (var j=0; j<3; j++) {
	//	console.log(j);
		createHref(rowCol3,content,i-1+j);
	}
}
/*----------нужен target---*/
/*function caruselLeft() {
	//console.log('left');
	var caruselPoint=document.querySelectorAll('.carusel__point');
	for (var i = 0; i<caruselPoint.length;  i++) {
		if (caruselPoint[i].className==='carusel__point carusel__point_active') break;
	}
	caruselPoint[i].className='carusel__point';
	if (i>0) {
		caruselPoint[i-1].className='carusel__point carusel__point_active';
	} else {
		caruselPoint[0].className='carusel__point carusel__point_active'
	};
	//console.log(i);
	clearBox('.row-3col');
	CaruselFillBox('.row-3col', moreProdukt);
}*/

function clickLR(ev) {
	var cl=ev.target.className.indexOf('right');
	//console.log(cl);
	var caruselPoint=document.querySelectorAll('.carusel__point');
	var length=caruselPoint.length
	for (var i = 0; i<length;  i++) {
		if (caruselPoint[i].className==='carusel__point carusel__point_active') break;
	}
	caruselPoint[i].className='carusel__point';
	if (~cl) {
		if (i<length-1) {
			caruselPoint[i+1].className='carusel__point carusel__point_active';
		} else {
			caruselPoint[length-1].className='carusel__point carusel__point_active'
		}
	}else{
		if (i>0) {
		caruselPoint[i-1].className='carusel__point carusel__point_active';
		} else {
		caruselPoint[0].className='carusel__point carusel__point_active'
		}
	}
	clearBox('.row-3col');
	CaruselFillBox('.row-3col', moreProdukt);
}

function clickPoint(ev) {
	//console.log(ev.target);
	var caruselPoint=document.querySelectorAll('.carusel__point');
	var length=caruselPoint.length
	for (var i = 0; i<length;  i++) {
		caruselPoint[i].className='carusel__point';
		if (ev.target===caruselPoint[i]) {
			var j=i;
		};
	}
	caruselPoint[j].className='carusel__point carusel__point_active';
	clearBox('.row-3col');
	CaruselFillBox('.row-3col', moreProdukt);	
}



/*---------rnd list--------------*/
var list= [
'Стандартный пакет',
'Новый ЦФТ-Банк',
'Cash Management',
'Аренда сейфов',
'Банковские гарантии',
'Казначейство',
'Страхование',
'Казначейство',
'Факторинговое обслуживание',
'Переводы средств',
'Расчетный центр',
'Пластиковые карты',
'Финансовый мониторинг',
'Депозиты и вклады',
'Инвестиции'
]

var newList=generateArray(list,20).sort(rand);
console.log(newList);

function createList(elem,content,i){
	var ul=createBlock('ul','aside__ul');
	var li=createBlock('li','aside__list');
	var a=createBlock('a','aside__href main__hover_red main__hover_underline');
	a.setAttribute('href','#');
	a.innerHTML=content[i];
	li.appendChild(a);
	ul.appendChild(li);
	elem.appendChild(li);
}



