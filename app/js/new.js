	
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
/******************START*********************/
(function(){
	var basket=new Basket;
	window.addEventListener("DOMContentLoaded", function(){
		catalogList.drawApp(1);
		catalogList.create();
		basket.init('.header__box');
	});

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

			return {
				create:function(){
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'api/app_packages.json', true);
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
				},
				createBlock:createBlock,
				addDate:addDate,
			}
		}());



		var catalogList=(function(basket){
			var createBlock=carusel.createBlock;
			var addDate=carusel.addDate;

			function fillBox(block, content,f) {
				var length=content.length;
				var el=document.querySelector(block);
				for (var i=0; i<length; i++) {
					f(el,content,i);
				}
			}

			function createListASide(elem,content,i){
				var ul=createBlock('ul','aside__ul');
				var li=createBlock('li','aside__list');
				var a=createBlock('a','aside__href main__hover_red main__hover_underline');
				//a.setAttribute('href','#');
				a.innerHTML=content[i].title;
				a.onclick=function(){drawApp(content[i].id)};
				li.appendChild(a);
				ul.appendChild(li);
				elem.appendChild(li);
			}

			function drawApp(id) {
				
				var section=document.querySelector('.container__content');

				//console.log('old='+section.data+' new='+id);
				section.innerHTML='';
				section.data=id;
				

				var title=createBlock('div','title title__size_med');
				var boxLeft=createBlock('div','content__box-left');
				var time=createBlock('time','time');
				var pDesc=createBlock('p','text');
				var pRequire=createBlock('p','text');
				var titleRequire=createBlock('span','span__color_darkgrey');
				titleRequire.textContent='Требования:';
				
				section.appendChild(title);
				boxLeft.appendChild(time);
				boxLeft.appendChild(pDesc);
				boxLeft.appendChild(pRequire);
				pRequire.appendChild(titleRequire);
				section.appendChild(boxLeft);
				
				var boxRight=createBlock('div','content__box-right');
				var shot=createBlock('div','shot shot__size_big ');
				var btnIn=createBlock('input', 'button button__app button_letter-spasing');

				btnIn.value='В корзину';
				btnIn.type='button';

				boxRight.appendChild(shot);
				boxRight.appendChild(btnIn);
				section.appendChild(boxRight);

				var boxBottom=createBlock('div','content__box-bottom');
				var titleBoxBottom=createBlock('div','title title__size_med');
				titleBoxBottom.textContent='Основные функции';
				var ul=createBlock('ul','');
				boxBottom.appendChild(titleBoxBottom);
				boxBottom.appendChild(ul);
				section.appendChild(boxBottom);

				
				function createLiBoxBottom(arr, elem){
					if (typeof(arr)==='string') {
						li=createBlock('li','content__list')
						li.textContent=arr;
						elem.appendChild(li);
					}else{
						for (var i = 0; i < arr.length; i++) {
							li=createBlock('li','content__list')
							li.textContent=arr[i];
							elem.appendChild(li);
						}
					}
				};


				var xhr = new XMLHttpRequest();
					xhr.open('GET', 'api/app_info.json', true);
					xhr.send();
					xhr.onreadystatechange=function(e) {
						if (xhr.readyState===XMLHttpRequest.DONE) {
							var result=JSON.parse(xhr.responseText);
							//console.log('result='+result);
							for (var i = 0; i < result.length; i++) {
								if (result[i].id===id) {
									title.textContent=result[i].title;
									time.textContent=addDate(result[i].lastUpdate);
									pDesc.textContent=result[i].description;
									pRequire.innerHTML+=result[i].requirements;
									shot.className+=obj_compliance[result[i].guid];
									btnIn.onclick=(function(res){
										return function(){
											basket.add(res);
											buttonAppDisable(btnIn, id);
										}
									})(result[i]);
									window.addEventListener( "DOMContentLoaded", buttonAppDisable(btnIn, id));
									createLiBoxBottom(result[i].features, ul);
								}
							}
						}
					}
			};

			function buttonAppDisable(elem, id){
				//console.log(basket);
				if (basket.product.length>=0) {
					for (var i = 0; i < basket.product.length; i++) {
						if (basket.product[i].id===id) {
							elem.className+=' button__app_disable';
						}
					}
				}
			};

			return {
				create:function(){
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'api/apps_list.json', true);
					xhr.send();
					xhr.onreadystatechange=function(e) {
						if (xhr.readyState===XMLHttpRequest.DONE) {
							//console.log(xhr.responseText);
							var result=JSON.parse(xhr.responseText);
							//console.log('result='+result);
							fillBox('.container__aside', result, createListASide);
						}
					}
				},
				drawApp:drawApp,
				buttonAppDisable:buttonAppDisable,
			}
		}(basket));

		/*-----------------------BASKET------------------------------*/

		function Basket() {
			
			this.product=[];
			this.add=function(result) {
				//console.log(this.product.length);
				var matches=false;
					for (var i = 0; i < this.product.length; i++) {
						if (this.product[i].id===result.id) {
							matches=true;
						}
					}
				if (!matches) {
					this.product.push(result);
					storageRecord(this.product);
				}  
			};

			this.init=function(blok){
				
				if (storageRead()) this.product=storageRead();
				
				//if (document.readyState === "complete") {
				//	createBasket(blok);
				//} else {
				//	window.addEventListener( "DOMContentLoaded", createBasket);
				//}
			
				//function createBasket(){
					var elem=document.querySelector(blok);
					var div=document.createElement(div);
					div.textContent='Корзина';
					div.onclick=basketClick.bind(basket);			
					elem.appendChild(div);
					div.style.cursor='pointer';
				//}
			};

			this.delProduct=function (id){
				for (var i = 0; i < this.product.length; i++) {
					if (this.product[i].id===id) {
						this.product.splice(i,1);
						storageRecord(this.product);
						break;
					};
				}
			};

			this.total=function() {
				var total=0;
				for (var i = 0; i < this.product.length; i++) {
						total+=this.product[i].price;
					}
				return total;
			}

			this.clear=function() {
				this.product=[];
				storageRecord(this.product);
			}

			function basketClick(){
				console.log(this.product);
				if (this.total()) modal.page1(this.product);
			};

			function storageRead() {
				if (localStorage.getItem('bascketProduct')===null) {
					return false
				} else {
					var product=JSON.parse(localStorage.getItem('bascketProduct'));
					return product;
				}
			};

			function storageRecord(product) {
				localStorage.setItem('bascketProduct',JSON.stringify(product));
			};
		}
		/*^^^^^^^^^^^^^^^end basket^^^^^^^^^^^^^^^^^^^*/


		var modal=(function(){
			var createBlock=carusel.createBlock;
			function page1(product) {
				
				var page1=cloneTmp('.page1__tmp');
				var header=cloneTmp('.modal__header');
				var label=header.querySelectorAll('.trek__box');
				label[0].className+=' trek__box_active';
				page1.querySelector('header').appendChild(header);
				
				var row=page1.querySelector('.tmp__table_rows');
				for (var i = 0; i < product.length; i++) {
					var cloneRow=cloneTmp('.tmp__table_rows');
					var cell=cloneRow.querySelectorAll('td');
					cell[0].textContent=product[i].title;
					cell[1].textContent=product[i].price/100;
					cell[2].textContent=product[i].price/100;
					page1.querySelector('.table').appendChild(cloneRow);
					cell[3].onclick=(function(id){
										return function(){
											basket.delProduct(id);
											this.parentNode.parentNode.removeChild(this.parentNode);
											insertTotal(basket.total());
											if (!basket.total()) popUpDelete(); //не отображать пусую корзину
											if (document.querySelector('.container__content').data===id) {
												document.querySelector('.button__app').className='button button__app button_letter-spasing';
											}
										}
									})(product[i].id);
				}
				insertTotal(basket.total()); // cent
				var btnForward=page1.querySelector('.button__forward');
				btnForward.onclick=page2;
				popUpCreate().parentNode.appendChild(page1);
				//console.log(btnForward);

				
				function insertTotal(total) {
					var totalPrice=page1.querySelector('.total__price')||document.querySelector('.total__price');
					//console.log(totalPrice);
					var totalInt=Math.floor(total / 100);
					var totalFloor=total-totalInt*100;
					if (totalFloor<=9) {totalFloor='0'+totalFloor};
					totalPrice.innerHTML=totalInt
						+'<span class="total__cent">'
						+totalFloor
						+'</span>';
				}
			};

			function page2() {
				popUpDelete('wrapper');
				var parent=document.querySelector('.modal__bg').parentNode;
				var page2=cloneTmp('.page2__tmp');
				var header=cloneTmp('.modal__header');
				var label=header.querySelectorAll('.trek__box');
				label[1].className+=' trek__box_active';
				label[0].className='trek__box trek__box_enabled';
				page2.querySelector('header').appendChild(header);
				var btnForward=page2.querySelector('.button__forward');
				btnForward.onclick=page3;
				var btnForward=page2.querySelector('.button__back');
				btnForward.onclick=page1;
				parent.appendChild(page2);
			};

			function page3() {
				popUpDelete('wrapper');
				var parent=document.querySelector('.modal__bg').parentNode;
				var page3=cloneTmp('.page3__tmp');
				var header=cloneTmp('.modal__header');
				var label=header.querySelectorAll('.trek__box');
				label[2].className+=' trek__box_active';
				label[1].className='trek__box trek__box_enabled';
				label[0].className='trek__box trek__box_enabled';
				page3.querySelector('header').appendChild(header);
				var btnForward=page3.querySelector('.button__forward');
				btnForward.onclick=page4time;
				parent.appendChild(page3);
				function page4time() {
					var timeout=Math.random()*12000+3000;
					setTimeout(page4, timeout);
					timeout=cloneTmp('.timeout__tmp');
					var body=document.querySelector('body');
					body.appendChild(timeout);
				}
			}

			function page4() {
				popUpDelete('wrapper');
				var timeout=document.querySelector('.timeout');
				if (timeout) timeout.parentNode.removeChild(timeout); 
				var parent=document.querySelector('.modal__bg').parentNode;
				var page4=cloneTmp('.page4__tmp');
				var header=cloneTmp('.modal__header');
				var label=header.querySelectorAll('.trek__box');
				label[3].className+=' trek__box_active';
				label[2].className='trek__box trek__box_enabled';
				label[1].className='trek__box trek__box_enabled';
				label[0].className='trek__box trek__box_enabled';
				page4.querySelector('header').appendChild(header);
				var btnForward=page4.querySelector('.button__final');
				btnForward.onclick=function(){
					basket.clear();
					popUpDelete();
					document.querySelector('.button__app').className='button button__app button_letter-spasing';
				}
				parent.appendChild(page4);
			}

			function popUpCreate(){
				if (document.querySelector('.modal__bg')) popUpDelete();
				var modalBg=createBlock('div', 'modal__bg');
				var body=document.querySelector('body');
				body.appendChild(modalBg);
				modalBg.onclick=function(){popUpDelete();};
				return modalBg;
			};

			function popUpDelete() {
				if (arguments.length===0) {
					var elem=document.querySelector('.modal__bg');
					elem.parentElement.removeChild(elem);
				}
				var elem=document.querySelector('.wrapper');
				elem.parentElement.removeChild(elem);
			}

			function cloneTmp(classTmp) {
				var tmp=document.querySelector(classTmp);
				var clone=tmp.content.cloneNode(true);
				return clone;
			}

			return {
				page1:page1,
				page2:page2,
				page3:page3,
			}
		}());
	
}());