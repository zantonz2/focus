	
var obj_compliance = {
"87b370e0-31e5-4a90-b447-c1c35d8ea568":"shot__baground_shot1",
"20f2a7ab-5946-4d76-b943-ff4dc4913c72":"shot__baground_shot2",
"ae8b3202-1f61-4c8d-a5f3-9d2e5df0787a":"shot__baground_shot3",
"668c7af2-43c1-40c8-8ed2-c41dd701d08b":"shot__baground_shot1",
"6e02a914-1538-4d88-b6f4-f9a926cc8873":"shot__baground_shot2",
"b0f94a6e-86c9-4d9b-8df6-0dc5e0152edc":"shot__baground_shot3",
"2ca44ad5-b06b-41e8-912d-fd7070390c49":"shot__baground_shot1"
}

var carusel=(function(){

	function CaruselFillBox(block, content, f) {
		var caruselPoint=document.querySelectorAll('.carusel__point');
		for (var i=0; i<caruselPoint.length; i++) {
			if (caruselPoint[i].className==='carusel__point carusel__point_active') break;
		}
		i=(i<1)?1:i;
		i=(i===(caruselPoint.length-1))?(caruselPoint.length-2):i;
		var rowCol3=document.querySelector(block);
		for (var j=0; j<3; j++) {
			f(rowCol3,content,i-1+j);
		}
	};

	function createBlock(tag, cl) {
		var div=document.createElement(tag);
		div.className=cl;
		return div;
	};

	function clearBox(block) {
		var rowCol3=document.querySelector(block);
		rowCol3.innerHTML='';
	};

			
	function createBoxProduct(elem, content, i){
		if (typeof content[i] !== 'undefined') {
			var Col3=createBlock('div','col3');
			var fig=createBlock('figure','figure');
			var shot=createBlock('div','shot shot__size_med '+obj_compliance[content[i].guid]);
			var figcap=createBlock('figcaption', 'figcaption main__hover_red');
			figcap.innerHTML=content[i].title;
			var time=createBlock('time','time');
			time.innerHTML= addDate(content[i].lastUpdate*1000);
			fig=Col3.appendChild(fig);
			fig.appendChild(shot);
			figcap=fig.appendChild(figcap);
			figcap.appendChild(time);
			elem.appendChild(Col3);
				
				function addDate(time) {
					var option={
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					};
					var date=new Date(time);
					return date.toLocaleString("ru",option);
				}
		}
	};

	
	function createCarusel(inBlock, content){
		var carusel=document.querySelector(inBlock);
		//drav point
		var ul=createBlock('ul','');
		for (var i = 0; i < content.length; i++) {
			var li=createBlock('li','carusel__point');
			ul.appendChild(li);
		}

		if (!ul.querySelector('.carusel__point_active')) {
			//console.log(ul.querySelector('.carusel__point_active'));
			var point=ul.querySelectorAll('.carusel__point');
			point[3].className+=' carusel__point_active';
		}
		ul.onclick=clickPoint;
		carusel.appendChild(ul);
		
		//draw arrows
		var caruselArrowLeft=createBlock('div','carusel__arrow carusel__arrow_left');
		caruselArrowLeft.innerHTML='<';
		carusel.appendChild(caruselArrowLeft);
		caruselArrowLeft.onclick=function(){clickLR('left', content)};
		var caruselArrowRight=createBlock('div','carusel__arrow carusel__arrow_right');
		caruselArrowRight.innerHTML='>';
		carusel.appendChild(caruselArrowRight);
		caruselArrowRight.onclick=function(){clickLR('right', content)};
		
		function clickLR(ev,content) {
			var caruselPoint=document.querySelectorAll('.carusel__point');
			//console.log(ev); 
			var cl=ev.indexOf('right');
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
			CaruselFillBox('.row-3col', content ,createBoxProduct);
		};

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
			CaruselFillBox('.row-3col', content ,createBoxProduct);	
		}
	}

	return {
		create:function(){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'app/app_packages.json', true);
			xhr.send();
			xhr.onreadystatechange=function(e) {
				if (xhr.readyState===XMLHttpRequest.DONE) {
					console.log(xhr.responseText);
					var result=JSON.parse(xhr.responseText);
					//console.log('result='+result);
					CaruselFillBox('.row-3col', result, createBoxProduct);
					createCarusel('.carusel',result);
				}
		}
	}
}
}());



/*---------rnd list--------------*/
/*var list= [
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
];*/

//var newList=generateArray(list,20).sort(rand);
//console.log(newList);

var catalogList=(function(){
	
	function fillBox(block, content,f) {
		var length=content.length;
		var el=document.querySelector(block);
		for (var i=0; i<length; i++) {
			f(el,content,i);
		}
	}

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
	return {
		create:function(){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'app/apps_list.json', true);
			xhr.send();
			xhr.onreadystatechange=function(e) {
				if (xhr.readyState===XMLHttpRequest.DONE) {
					console.log(xhr.responseText);
					var result=JSON.parse(xhr.responseText);
					//console.log('result='+result);
					fillBox('.container__aside', result, createList);
				}
			}
		}
	}
}());

