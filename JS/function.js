// JavaScript Document
window.onload=function(){
	waterfall('main','box');
	//dataInt用于模拟后台需要加载的数据
	var dataInt={"data":[{"src":"20.jpg"},{"src":"31.jpg"},{"src":"42.jpg"}]}
	window.onscroll=function(){
		if(checkScrollSlide()){//判断是否具备加载新图片的资格
			//将数据块渲染到页面底部
			var oParent=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
				}
			waterfall('main','box');
			
			}
		}
	}
	
function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;'
	var hArr=new Array();//存储每一列的高度

	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
			}
		else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
	//		oBoxs[i].style.left=index*oBoxW+'px';//下一行下一个元素的left
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';//方法2
			hArr[index]+=oBoxs[i].offsetHeight;
			}
		}
	}

//根据class获取元素
function getByClass(parent,clsName){
	var oElements=parent.getElementsByTagName('*');
	var boxArr=new Array(); //用于存储获取到的目标元素
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i])
			}
		}
	return boxArr;
	}
//获取hArr里最小高度minH这个元素的下标index
function getMinhIndex(arr,val){
	for(var i=0;i<arr.length;i++){//可以写成for(var i in arr)
		if(arr[i]==val){
			return i;
			}
		}
	}
//用于检测是否具备滚动加载数据块的资格
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
	}