(function(){

	var carusel=(function(){

		var obj_compliance = {
			"71930a4a-477e-4b6b-8dda-d1e1deb8eabe":"shot__baground_shot1",
			"7b5231ce-b933-4b7a-a7ad-3ca79dbf6a2f":"shot__baground_shot2",
			"3f585881-085d-4a80-8c17-ab743467cd3c":"shot__baground_shot3",
			"e78dc4c0-88e1-472f-8e7e-828333f5a27c":"shot__baground_shot1",
			"31ef14ef-583b-4d5a-bd55-3cd8f755aa42":"shot__baground_shot2",
			"0d513ddc-745a-4491-939e-3a0ef00643ba":"shot__baground_shot3",
			"9f3c7bd7-00a5-4a03-bb2f-05494448fde8":"shot__baground_shot1",
			"10bf8ab2-589d-4b80-a101-75d85b4d9abe":"shot__baground_shot2",
			"36f3e1e7-5dcb-4323-b6be-f2adc784f511":"shot__baground_shot3",
			"7b137a46-6cef-43b5-b779-7ed31d1f6110":"shot__baground_shot1",
			"b1fbb272-361a-4546-9798-6cd330b38e48":"shot__baground_shot2",
			"ed639731-3211-4dbe-be5b-cf9f0ad2f110":"shot__baground_shot3",
			"2ca44ad5-b06b-41e8-912d-fd7000390c49":"shot__baground_shot1"
		};

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
				figcap.innerHTML=content[i].title.toUpperCase();;
				var time=createBlock('time','time');
				time.innerHTML= addDate(content[i].lastUpdate*1000);
				fig=Col3.appendChild(fig);
				fig.appendChild(shot);
				figcap=fig.appendChild(figcap);
				figcap.appendChild(time);
				elem.appendChild(Col3);
					
			}
		};

		function addDate(time) {
			var option={
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			};
			var date=new Date(time);
			return date.toLocaleString("ru",option);
		}
		
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

		function loadData(url) {
			return new Promise(function(load,error) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.send();
				xhr.onreadystatechange=function(e) {
					if (xhr.readyState===XMLHttpRequest.DONE) {
						if (xhr.status===200) {
							return load(xhr.responseText);
						} else {
							return error(xhr.status); 
						}
					}
				}
			});
		};

		function renderCarusel(responseText){
			var result=JSON.parse(responseText);
			CaruselFillBox('.row-3col', result, createBoxProduct);
			createCarusel('.carusel',result);
		};

		function errorLoad(responseText){
			console.log('Произошла ошибка при загрузке данных '+responseText);
		};
		//console.log('ssss');
		var exp={
		create:function(){loadData('api/app_packages.json')
				.then(carusel.renderCarusel,carusel.errorLoad)},
			/*function(){
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'api/app_packages.json', true);
				xhr.send();
				xhr.onreadystatechange=function(e) {
					if (xhr.readyState===XMLHttpRequest.DONE) {
						//console.log(xhr.responseText);
						var result=JSON.parse(xhr.responseText);
						//console.log('result='+result);
						CaruselFillBox('.row-3col', result, createBoxProduct);
						createCarusel('.carusel',result);
					}
				}
			},*/
		createBlock:createBlock,
		addDate:addDate,
		promisLoad:loadData
		}
	window.carusel=exp;
	}());
}());
