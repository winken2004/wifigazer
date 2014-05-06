<!-- 
// ver2.8
var sc=1;              //動態scale變數
var moveY=0;		   //動態X位移變數
var moveX=0;		   //動態Y位移變數 no use now
var defaultOffsetX = 45;//X方向位移量 地圖上x=0
var defaultOffsetY = 1000//Y方向位移量 地圖上y=0
var offsetX=45;        
var offsetY=100+900;   
var defaultScale=20;   //預設scale大小
var fontLevel =12;     //預設字型大小
var state = 0;
var person = 0;
var personPosX='null';
var personPosY='null';
var current_play_video = "";
var enable_video = 0;	//假如使用者不想聽影片的話，影片不會因為資料更新而自動播放



var t = 0; //position test variable
var PersonPosition;

function initCanvas()
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");	
	c.width = 1400*sc;
	c.height = 1200*sc;
}

///////////////////////////////////////////
// this function need to modify the formula
function setViewport(x,y)
{
	var tempX = 23;
	var tempY = 16;
	var xy = MapToScreen(x-tempX,y+tempY)
	offsetX=offsetX-xy[0]-(sc-1)*tempX*20;
	offsetY=offsetY-xy[1]-(sc-1)*tempY*20;
	/*alert(offsetX);
	alert(offsetY);*/
	
drawMap();
//sc=1;	
}
//////////////////////////////////////////////

///////////////////////////////////////
//Draw line tool , draw in the canvas
function drawLine(x,y,length,dir)
{
/*
x,y=地圖上起點座標
length=邊長
dir="x+" for x方向向右
	"x-" for x方向向左
	"y+" for y方向向上
	"y-" for y方向向下
	
回傳值coordx,coordy = 目的地圖座標
	
	螢幕座標與地圖座標轉換公式:
	Xscreen = offsetX+(sc*Xmap*defaultScale)
	Yscreen = offsetY-(sc*Ymap*defaultScale)
*/

	var coordx;
	var coordy;
	coordy=y;//(y+offsetY)/defaultScale;
	coordx=x;
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");

	ctx.lineWidth = 5;
    ctx.beginPath();  
    ctx.moveTo(offsetX+(sc*x*defaultScale),offsetY-(sc*y*defaultScale));
	if(dir=="y+"){ //y direct up
		ctx.lineTo(offsetX+(sc*x*defaultScale),offsetY-(sc*(y+length)*defaultScale)); 
		coordy = y+length;
	}
	else if(dir=="x+"){ //x direct right
		ctx.lineTo(offsetX+(sc*(x+length)*defaultScale),offsetY-(sc*y*defaultScale));
		coordx = x+length;
	}
	else if(dir=="y-"){ //y direct down
		ctx.lineTo(offsetX+(sc*x*defaultScale),offsetY-(sc*(y-length)*defaultScale)); 
		coordy = y-length;
	}
	else if(dir=="x-"){ //x direct left
		ctx.lineTo(offsetX+(sc*(x-length)*defaultScale),offsetY-(sc*y*defaultScale));
		coordx = x-length;
	}
    ctx.closePath();  
    ctx.stroke();
	
	return [coordx,coordy];
}

function drawLine2(x, y, x1, y1) {
/*
x,y=地圖上起點座標
x1,y1=地圖上終點座標
*/
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");  
        ctx.beginPath();  
        ctx.moveTo(offsetX+(sc*x*defaultScale),offsetY-(sc*y*defaultScale));  
        ctx.lineTo(offsetX+(sc*x1*defaultScale),offsetY-(sc*y1*defaultScale));  
        ctx.closePath();  
        ctx.stroke();  
}
/////////////////////////////////////////

/////////////////////////////////////////
// Picture draw tool , draw in the canvas
function drawPic(src,x,y,width,height)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d"); 
	var img = new Image();		
	var centerX;
	var centerY;
	centerX = x+width/2;
	centerY = y+height/2;
	x=offsetX+(sc*x*defaultScale);
	y=offsetY-(sc*y*defaultScale);
	img.onload = function(){
	ctx.drawImage(img,x,y,width*/*Math.sqrt*/(sc),height*/*Math.sqrt*/(sc));
	}
	img.src ="img/"+src;
	return [centerX,centerY];
	
}
///////////////////////////////////////
	
//////////////////////////////////////
//Coordinate transform tool 	
function ScreenToMap(x,y)
{
	var Xmap;
	var Ymap;
	
	Xmap=(x-offsetX)/(defaultScale*sc);
	Ymap=-(y-offsetY)/(defaultScale*sc);
	
	return [Xmap,Ymap];
}	

function MapToScreen(x,y)
{
	var Xscreen;
	var Yscreen;
	
	Xscreen=offsetX+(sc*x*defaultScale);
	Yscreen=offsetY-(sc*y*defaultScale);

	return [Xscreen,Yscreen];
}

function ScreenToPage(x,y)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var Top = c.offsetTop;
	var Left = c.offsetLeft;
	var Xpage = x+Left;
	var Ypage = y+Top;
	
	return [Xpage,Ypage];	
}
/////////////////////////////////////

////////////////////
//For test
var personX=30;
var personY=30;
///////////////////

function newMapDraw()
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");	
	var xy;	
	
	ctx.font = fontLevel+"px Arial";	
	ctx.fillText("Unit : meter",15,15);
	
	//drawPic("floor.jpg",0.06,34.8,2.5*20*sc,34.74*20*sc);
	
	// draw buttons
	//drawButton();
	
	//template
	buttonMove("po",0.42-0.5,0.225+0.5,10);
	buttonMove("po2",2.7+0.8+10.66-1.21-0.5,1.6+30.61-1.88+0.5,10);
	buttonMove("po3",19.86-0.5,35.61+0.5,10);
	
	//Map
	drawCorner(0,0,"#FF0000");
	xy=drawLine(0,0,34.85,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],55.742+0.75,"x+"); 
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],5.81,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],2.13,"x+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],40.34,"y-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],2.2,"x-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],2.13,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],4.72,"x-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],2.81,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],4.72,"x+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],18.16,"y+");
	//drawCorner(xy[0],xy[1],"#1FBD21");
	//講堂
	xy=drawLine(xy[0],xy[1],1.81,"y+");
	//drawCorner(xy[0],xy[1],"#1FBD21");
	//55.742 25.23
	//
	xy=drawLine(xy[0],xy[1],7.3,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],23.43,"x-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],6.55,"y-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],5.93,"x-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],6.55,"y+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],24.46,"x-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],30.61,"y-");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],3,"x+");
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],1.9,"y-"); //1.6
	drawCorner(xy[0],xy[1],"#FF0000");
	xy=drawLine(xy[0],xy[1],3,"x-");
	//drawCorner(xy[0],xy[1],"#FF0000");
	drawLine2(xy[0],xy[1],0,0);
	//drawCorner(xy[0],xy[1],"#FF0000");
	
	//系圖
	drawRect(6.1,44.7,20.5,34.85,"#00F7FA");	
	var rxy;
	drawCorner(18.66+1.83+0.1,34.85,"#FF0000");
	//drawCorner(18.66+1.83,34.85,"#1FBD21");
	//drawCorner(18.66,34.85,"#1FBD21");
	drawDoor(18.66+1.83,34.85,1.83,"y+","#FFD8AF","#000000");
	rxy=drawLine(18.66+1.83,34.85,9.92,"y+"); //1.83=門的長度
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],14.39,"x-");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],9.92,"y-");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	
	//電腦room
	drawDoor(2.7+9.5,32.53,1.81,"y-","#FFD8AF","#000000");
	drawRect(3.45,32.55,14.1,25.95,"#C9A1EF");
	//drawCorner(2.7+9.5,32.53,"#1FBD21");
	//drawCorner(2.7+9.5+1.81,32.53,"#1FBD21");
	drawCorner(2.7+0.8,32.53,"#FF0000");
	rxy=drawLine(2.7+0.8,32.53,6.7,"y-");  //Y軸理論值32.21 有誤差
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],10.66,"x+");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],6.7,"y+");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	
	//820
	drawDoor(33+0.026+0.456*8+0.048+0.31+0.126+0.19,32.5,0.456*2-0.048+0.026,"y-","#FFD8AF","#000000");
	drawRect(35.3,32.5,39.15,25.9,"#C7EFA1");
	drawCorner(40.19-0.97,32.53,"#FF0000");
	rxy=drawLine(40.19-0.97,32.53,6.72,"y-"); //Y軸理論值32.21
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],3.93,"x-");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],6.72,"y+");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	
	

	//錦成講堂
	drawDoor(56.4,25.25,1.81,"x-","#FFD8AF","#000000");
	drawRect(45.95,25.85,56.35,16.15,"#E76E6D");
	drawCorner(55.742+0.75,25.23+0.6,"#FF0000");
	rxy=drawLine(55.742+0.75,25.23+0.6,10.51,"x-");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],9.7,"y-");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	rxy=drawLine(rxy[0],rxy[1],10.51,"x+");
	drawCorner(rxy[0],rxy[1],"#FF0000");
	
	// Wall detect
	Wall();
	
	//Draw AP
	APdraw();
	
	// Draw dien ti
	drawPic("elevator_p.gif",33,29.75,35,35);
	
	drawOthers();
	buttonMove("ED",12,37.5,20);
	buttonMove("ED5",7.5,27.65,20);
	buttonMove("ED6",35.8,27.1,20);
	buttonMove("ED7",49.7,20,20);
	// Draw user
	// getAP();
	
	//For test
	//PersonPos("user",personX+moveX,personY+moveY);
	//
	
	//Person draw
	
	//video and text guide part
	//錦成講堂 45.95 ,25.85, 56.35, 16.15,
	if (personX+moveX>45.95&&personX+moveX<55.35&&personY+moveY>16.15&&personY+moveY<26.85)
		{
		if(current_play_video!="IIdmUqUzrxo")
			{
			top.leftFrame.player.loadVideoById("IIdmUqUzrxo");
			current_play_video="IIdmUqUzrxo";
			enable_video = 0;
			}
		
		if(enable_video) 
			{
			top.leftFrame.document.getElementById("textbox").innerHTML = "</br>喵喵喵</br>喵喵喵喵喵";
			top.leftFrame.play();
			enable_video = 0;
			}
		}
	//820 35.3 ,32.5 ,39.15 ,25.9
	else if (personX+moveX>35.3&&personX+moveX<39.15&&personY+moveY>25.9&&personY+moveY<33.5)
		{
		if(current_play_video!="ZZ5LpwO-An4")
			{
			top.leftFrame.player.loadVideoById("ZZ5LpwO-An4","30");
			current_play_video="ZZ5LpwO-An4";
			}
		if(enable_video) 
			{
			top.leftFrame.document.getElementById("textbox").innerHTML = "</br>嘿耶耶~</br>嘿耶耶 嘿耶耶~</br></br>I say HEY</br></br>What is going on~~";
			top.leftFrame.play();
			enable_video = 0;
			}
		}
	//814 電腦room 3.45, 32.55, 14.1, 25.95
	else if (personX+moveX>3.45&&personX+moveX<14.1&&personY+moveY>25.95&&personY+moveY<33.55)
		{
		if(current_play_video!="Vl75aVHhNxU")
			{
			top.leftFrame.player.loadVideoById("Vl75aVHhNxU");
			current_play_video="Vl75aVHhNxU";
			enable_video = 0;
			}
		if(enable_video) 
			{
			top.leftFrame.document.getElementById("textbox").innerHTML = "</br>sunshine girl<br/>sunshine for you!";
			top.leftFrame.play();
			enable_video = 0;
			}
		}
	//816 系圖 6.1, 44.7, 20.5, 34.85
	else if (personX+moveX>6.1&&personX+moveX<20.5&&personY+moveY>35.85&&personY+moveY<44.7)
		{
		if(current_play_video!="0fLUINWsoes")
			{
			top.leftFrame.player.loadVideoById("0fLUINWsoes","35");
			current_play_video="0fLUINWsoes";
			enable_video = 0;
			}
		if(enable_video) 
			{
			top.leftFrame.document.getElementById("textbox").innerHTML = "</br>南無痂藍喔~</br></br>痂藍</br></br>甘那赤藍</br></br>洽~壓~~壓~~";
			top.leftFrame.play();
			enable_video = 0;
			}
		}
	else
		{
		top.leftFrame.player.pauseVideo();
		top.leftFrame.document.getElementById("textbox").innerHTML = "</br>歡迎光臨</br>四處走走吧";
		enable_video = 1;
		}
	//video and text guide part
	
	if(personPosX!='null' || personPosY!='null'){
	buttonMove("user",personPosX,personPosY);
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var screenXY = MapToScreen(personPosX+1,personPosY-0.3);
	var numX = new Number(personPosX+22.5/(20*sc));
	var numY = new Number(personPosY-22.5/(20*sc));
	
	var tx=numX.toFixed(2);
	var ty=numY.toFixed(2);
	ctx.fillStyle = "black";
	ctx.fillText("("+tx+","+ty+")",screenXY[0],screenXY[1]);
	ctx.fillStyle = "gray";
	}
	
	//Draw pop info
	drawInfo("ED816",18.40-3,36.75,personPosX,personPosY,20.45-18.70,36.75-34.85);
	drawInfo("ED814",9,35,personPosX,personPosY,11,11);
	drawInfo("ED820",36.4,33.75,personPosX,personPosY,38-36.4,33.75-31.55);
	drawInfo("ED824",54.50,26.3,personPosX,personPosY,56.8-54.50,26.3-23.5);
	
	/*drawInfo("ED816",18.40-3,36.75,personX+moveX-22.5/20,personY+moveY-22.5/20,20.45-18.70,36.75-34.85);
	drawInfo("ED814",11,34,personX+moveX-22.5/20,personY+moveY-22.5/20,14.1-11,34-30.75);
	drawInfo("ED820",36.4,33.75,personX+moveX-22.5/20,personY+moveY-22.5/20,38-36.4,33.75-31.55);
	drawInfo("ED824",54.50,26.3,personX+moveX-22.5/20,personY+moveY-22.5/20,56.8-54.50,26.3-23.5);*/
	
	/*personX=personX+1;
	personY=personY+1;*/
	/*/////////////// Maybe write to be a function in future
	//draw person position
	if(person==1) //person exist
	{	// fake data for test
		var x = [32,31,30,30,29,28,27,26,25,24,23,22,21,20,19];
		var y = [30,31,32,33,33,33,33,34,34,33.5,33,33,34,34,33];
		if(t>=x.length-1) 
		{
		//alert(t);
			drawPerson(x[x.length-1],y[y.length-1]);
			//drawImfo(x[x.length-1],y[y.length-1]);
			person=1;
			//t=0;
		}
		else{
		drawPerson(x[t],y[t]);
		//drawImfo(x[t],y[t]);
		}		
	}
	///////////////	*/
	/*if(person>=1)
	initPerson();*/
	
}

function APdraw()
{
	var src="AP.png";
	var offset=0.5;
	
	drawPic(src,1.3-offset,7.08+offset,20,20); //AP14
	buttonMove("AP14",1.3-offset,7.08+offset,10);
	
	drawPic(src,1.67-offset,34.4+offset,20,20); //AP1
	buttonMove("AP1",1.67-(offset),34.4+offset+0.25,10);
	var tet = document.getElementById("test").innerHTML;
	document.getElementById("test").innerHTML	= '<p>AP1</p><p>X:1.67</p><p>Y:34.4</p>';	
	
	var temp1 = 32.53-6.7+0.9;
	var temp2 = 2.7+9.5+1.81-2.35;
	drawPic(src,temp2-offset,temp1+offset,20,20); //AP12
	buttonMove("AP12",temp2-offset,temp1+offset,10);
	
	temp1=7.75+4.6+4.6+1.71+1.83-14.39+4.9;
	temp2=34.85+9.9-2.07;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP19
	buttonMove("AP19",temp1-offset,temp2+offset,10);
	
	temp1=38.06;
	temp2=28.63;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP17
	buttonMove("AP17",temp1-offset,temp2+offset,10);
	
	temp1=56.52+2.2-1.64;
	temp2=34.85+5.81-1.9;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP15 位置可能有誤
	buttonMove("AP15",temp1-offset,temp2+offset,10);
	
	temp1=56.52+(-4.2);
	temp2=32.53-7.3-3;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP16
	buttonMove("AP16",temp1-offset,temp2+offset,10);
	
	temp1=56.52+2.13-0.9;
	temp2=34.85+5.81-40.34+2.3;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP11
	buttonMove("AP11",temp1-offset,temp2+offset,10);
	
	temp1=2.7+24.46+2.85;
	temp2=32.53+1.35;
	drawPic(src,temp1-offset,temp2+offset,20,20); //AP13
	buttonMove("AP13",temp1-offset,temp2+offset,10);	
		
}

//////////////////////////////
//Clear map and draw new map
function drawMap()
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	ctx.restore();
	ctx.clearRect(-50, -50, c.width+50, c.height+50);
	newMapDraw();
	
	//setTimeout("drawMap()" , 2000);
}
//////////////////////////////

//////////////////////////////
// Draw Info
function drawInfo(id,x,y,uX,uY,width,height)
{
	var c = document.getElementById(id);
	c.style.width=width*20*sc;
	c.style.height=height*20*sc;
	c.style.position="absolute";
	var xy = MapToScreen(x,y);
	xy = ScreenToPage(xy[0],xy[1]);
	c.style.top=xy[1]+"px";
	c.style.left=xy[0]+"px";
	c.style.display = "none";
	c.style.backgroundColor = "white";
	
	if((uX>x && uX<x+width) && (uY<y && uY>y-height) )
	{
		c.style.display = "inline";
	}
	
}
////////////////////////////////

function drawOthers(){
	drawLine(2.58,24.80,11.45-2.58,"x+");//左下
	drawLine(11.45,24.80,24.80-3.50,"y-");
	drawLine(11.45,3.50,11.45-2.58,"x-");
	drawLine(2.58,17.85,11.45-2.58,"x+");
	drawLine(2.58,10.85,11.45-2.58,"x+");
	drawRect(2.60,24.85,11.30,3.65,"#333333");
	
	drawLine(15.90,32.65,32.65-25.95,"y-");//左中
	drawLine(15.90,25.95,25.95-15.90,"x+");
	drawLine(25.95,25.95,32.65-25.95,"y+");
	drawRect(15.90,32.65,25.95,25.95,"#333333");
	
	drawLine(40.60,32.60,32.60-26.80,"y-");//右中
	drawLine(40.60,26.80,55.10-40.60,"x+");
	drawLine(55.10,26.80,32.60-26.80,"y+");
	drawLine(47.80,32.60,32.60-26.80,"y-");
	drawRect(40.60,32.60,55.10,26.80,"#333333");
	
	drawLine(46.00,16.30,16.30-6.90,"y-");//右下
	drawLine(46.00,6.90,56.50-46.00,"x+");
	drawRect(46.00,16.30,56.50,6.90,"#333333");
	
	drawLine(20.55,44.80,54.30-20.55,"x+");//右上
	drawLine(54.30,44.80,44.80-34.95,"y-");
	drawLine(31.00,44.80,44.80-34.95,"y-");
	drawRect(20.55,44.80,54.30,34.95,"#333333");
	
	drawLine(6.00,44.80,6.00-0.55,"x-");//左上
	drawLine(0.55,44.80,44.80-34.95,"y-");
	drawRect(0.55,44.80,6.00,34.95,"#333333");
	
	drawLine(-0.10,34.95,-0.10+6.00,"x-");//左
	drawLine(-6.00,34.95,34.95-2.75,"y-");
	drawLine(-6.00,2.75,-0.10+6.00,"x+");
	drawLine(-6.00,28.00,-0.10+6.00,"x+");
	drawLine(-6.00,24.00,-0.10+6.00,"x+");
	drawLine(-6.00,20.00,-0.10+6.00,"x+");
	drawLine(-6.00,16.00,-0.10+6.00,"x+");
	drawLine(-6.00,12.00,-0.10+6.00,"x+");
	drawLine(-6.00,8.00,-0.10+6.00,"x+");
	drawRect(-6.00,34.95,-0.10,2.82,"#333333");
	
	drawLine(58.70,40.70,65.00-58.70,"x+");//右
	drawLine(65.00,40.70,40.70-6.50,"y-");
	drawLine(65.00,6.50,65.00-58.70,"x-");
	drawLine(58.70,36.00,65.00-58.70,"x+");
	drawLine(58.70,32.00,65.00-58.70,"x+");
	drawLine(58.70,28.00,65.00-58.70,"x+");
	drawLine(58.70,24.00,65.00-58.70,"x+");
	drawLine(58.70,20.00,65.00-58.70,"x+");
	drawLine(58.70,16.00,65.00-58.70,"x+");
	drawLine(58.70,12.00,65.00-58.70,"x+");
	drawRect(58.70,40.70,65.00,6.50,"#333333");
	
	
}

////////////////////////////////////////
//find wall         y for up and x for right
function wallDetect(x,y,length,x2,y2,ux,uy,dir)
{
	if(dir=="x-")
	{
		if((ux<=x && ux>=x2) && (uy>=y && uy<=y+length))
			{
				moveX=-(personX-x);
			}

	}
	else if(dir=="x+")
	{
		if((ux>=x && ux<=x2) && (uy>=y && uy<=y+length))
			{
				moveX=-(personX-x);
			}
	}
	else if(dir=="y+")
	{
		if((uy>=y && uy<=y2) && (ux>=x && ux<=x+length))
			{
				moveY=-(personY-y);
			}
	}
	else if(dir=="y-")
	{
		if((uy<=y && uy>=y2) && (ux>=x && ux<=x+length))
			{
				moveY=-(personY-y);
			}
	}
}
// 22.5 means the user picture's 1/2width/height
function Wall()
{
	var smalloffset=0.5;
	wallDetect(0,0,34.85+22.5/20+smalloffset,-1000,-1000,personX+moveX,personY+moveY,"x-");
	wallDetect(2.6-22.5/20,1.92,32.45-1.92+22.5/20+smalloffset,3.5-22.5/20,-1000,personX+moveX,personY+moveY,"x+");
	wallDetect(0,0+22.5/20+smalloffset,5.6+22.5/20+smalloffset,-1000,-1000,personX+moveX,personY+moveY,"y-");
	wallDetect(5.6-22.5/20-smalloffset,0+22.5/20+smalloffset,1.92+22.5/20+smalloffset,+47,-1000,personX+moveX,personY+moveY,"x+");
	wallDetect(2.6-22.5/20,1.92,3+22.5/20+smalloffset,-1000,+4,personX+moveX,personY+moveY,"y+");
	//wallDetect(56.42,5.26,32.53-5.26+22.5/20+smalloffset,2.6,-1000,personX+moveX,personY+moveY,"x-");
}
////////////////////////////////////////


function drawCoord(x,y)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var screenXY = MapToScreen(x,y);
	var numX = new Number(x);
	var numY = new Number(y);
	
	x=numX.toFixed(2);
	y=numY.toFixed(2);
	if(state == 1){
	ctx.fillStyle = "gray";
	ctx.fillText("("+x+","+y+")",screenXY[0],screenXY[1]);}
	else{}
}

/////////////////////////////////
//button function
function bigger()
{
	sc=sc+0.5;
	fontLevel=fontLevel+2;
	if(sc>2.5) {sc=5;alert("This is the biggest scale level.") }
	main();
}

function smaller()
{
	sc=sc-0.5;
	fontLevel=fontLevel-2;
	if(sc<1) {sc=1; alert("This is the smallest scale level.") }
	main();
}

function upper()
{
	offsetY=offsetY-5;
	drawMap();
}

function down()
{
	offsetY=offsetY+5;
	drawMap();
}

function left()
{
	offsetX=offsetX-5;
	drawMap();
}

function right()
{
	offsetX=offsetX+5;
	drawMap();
}

function ShowCoord()
{
	if(state==0) state=1;
	else state=0;
	drawMap();
}
///////////////////////////////////


function mouseCoord()
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var Top = c.offsetTop;
	var Left = c.offsetLeft;
	var Xscreen = event.clientX-Left+document.body.scrollLeft;
	var Yscreen = event.clientY-Top+document.body.scrollTop;
	
	return [Xscreen,Yscreen];
}

function DisplayData()
{
	var cn = document.getElementById("floor_8");
	var ctx = cn.getContext("2d");
	var c = mouseCoord();
	var bn = ScreenToMap(c[0],c[1]);
	var numX = new Number(bn[0]);
	var numY = new Number(bn[1]);
	
	var x=numX.toFixed(2);
	var y=numY.toFixed(2);	
	ctx.fillText("("+x+","+y+")",c[0],c[1]);
	setTimeout("drawMap()" , 1500);
}

function ViewSet()
{
	var t = mouseCoord();
	var m = ScreenToMap(t[0],t[1]);
	//sc=2;
	setViewport(m[0],m[1]);
	//alert(m[0]);
}

////////////////////////////
//Direct draw a black circle as person by canvas tool in canvas  
function drawPerson(x,y)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var xy = MapToScreen(x,y);
	ctx.fillstyle="#000000";
	ctx.beginPath();
	ctx.arc(xy[0],xy[1], 5, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();	
}
////////////////////////////

////////////////////////////
//just draw a circle in canvas
function drawCorner(x,y,color)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var cxy = MapToScreen(x,y);
	ctx.fillStyle=color;
	ctx.beginPath();
	ctx.arc(cxy[0],cxy[1], 5, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle="#000000";
	
	drawCoord(x,y);
}
/////////////////////////////

/////////////////////////////
//just draw a rect in canvas
function drawRect(x,y,x2,y2,color)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var cxy = MapToScreen(x,y);
	var dxy = MapToScreen(x2,y2);
	ctx.globalAlpha=0.3;
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.rect(cxy[0],cxy[1],dxy[0]-cxy[0],dxy[1]-cxy[1]);
	//alert(x-x2);//14.4
	//alert(dxy[0]-cxy[0]);//288
	ctx.fill();
	ctx.globalAlpha=1;
}
/////////////////////////////

/////////////////////////////
//Draw a door in canvas
function drawDoor(x,y,length,dir,ccolor,lcolor)
{
	var c = document.getElementById("floor_8");
	var ctx = c.getContext("2d");
	var cxy = MapToScreen(x,y);
	length=length*20*sc;
	ctx.beginPath();
	//ctx.globalAlpha=0.3;
	if(dir=="y+"){
		ctx.arc(cxy[0],cxy[1],length,Math.PI,1.5*Math.PI,false);
		ctx.lineTo(cxy[0],cxy[1]);
		ctx.closePath();
	}
	else if(dir=="y-"){
		ctx.arc(cxy[0],cxy[1],length,0,0.5*Math.PI,false);
		ctx.lineTo(cxy[0],cxy[1]);
		ctx.closePath();
	}
	else if(dir=="x+"){
		ctx.arc(cxy[0],cxy[1],length,1.5*Math.PI,0,false);
		ctx.lineTo(cxy[0],cxy[1]);
		ctx.closePath();
	}
	else if(dir=="x-"){
		ctx.arc(cxy[0],cxy[1],length,0.5*Math.PI,1*Math.PI,false);
		ctx.lineTo(cxy[0],cxy[1]);
		ctx.closePath();
	}	
	ctx.lineWidth = 2;
	ctx.fillStyle = ccolor;
	ctx.fill();
	ctx.strokeStyle = lcolor;
	ctx.stroke();
	ctx.lineWidth=1;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#000000";
	ctx.globalAlpha=1;
	
}
/////////////////////////////////

/////////////////////////////////
//Draw a html button / image / <div> / dom  "on" the canvas
function buttonMove(ID,x,y,width)
{
	var b = document.getElementById(ID);
	var xy=MapToScreen(x,y);
	xy=ScreenToPage(xy[0],xy[1]);
	b.style.display="inline";
	b.style.zIndex =2;
	b.style.position="absolute";
	b.style.top=xy[1]+"px";
	b.style.left=xy[0]+"px";
	b.width=width+"px";
}
////////////////////////////////

function ImgScale(ID,width,height)
{
	var b = document.getElementById(ID);
	b.width=width+"px";
}

//////////////////////////////
// keyboard function
function keyFunction() {
	if (event.keyCode==38) {
		sc=sc+0.5;
		fontLevel=fontLevel+2
		if(sc>5) {sc=5;alert("It is biggest scale level.") }
		drawMap();
	} else if (event.keyCode==40) {
	    sc=sc-0.5;
		fontLevel=fontLevel-2;
		if(sc<0.5) {sc=0.5;alert("It is smallest scale level.") }
		drawMap();
	} 
	else if(event.keyCode==87){
		moveY=moveY+0.5;
		setViewport(personX+moveX,personY+moveY);
	}
	else if(event.keyCode==65){
		moveX=moveX-0.5;
		setViewport(personX+moveX,personY+moveY);	
	}
	else if(event.keyCode==83){
		moveY=moveY-0.5;
		setViewport(personX+moveX,personY+moveY);	
	}
	else if(event.keyCode==68){
		moveX=moveX+0.5;
		setViewport(personX+moveX,personY+moveY);	
	}
	else if(event.keyCode==13){
		person=person+1;
		drawMap();
	}
}
document.onkeydown=keyFunction;
/////////////////////////////////////////

//////////////////////////////////////////////
//Clear to default
function Clear()
{
	sc=1;              
	offsetX=defaultOffsetX;        
	offsetY=defaultOffsetY; 
	defaultScale=20;   
	fontLevel =12;    
	main();
}

//////////////////////////////////////////////

/////////
// temp person pos function
function PersonPos(id,x,y)
{

	var t = document.getElementById("person");
	t.width=45*sc;
	t.height=45*sc;
	buttonMove(id,x,y,10);

}

/////////

///////////////////////////////////////////////
// person object
/*
function initPerson()
{
	this.getAP=function(){
		if(window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
			if(xmlhttp != null)
			{
				xmlhttp.onreadystatechange = this.stateChange;
				xmlhttp.open("Get","php/example.php",true);
				xmlhttp.send();
			}
		}
		else
		{
			alert('does not support XMLHttpRequest');
		}
	}
	this.stateChange=function(){
		if(xmlhttp.readyState==4)
		{
			if(xmlhttp.status == 200)
			{
				var point = xmlhttp.responseText;
				this.Pos(point);
			}
		}		
	}
	this.Pos(point){
		var UserPos = JSON.parse(point);
		this.uID=UserPos[0].Var1;
		this.x=UserPos[0].Var2;
		this.y=UserPos[0].Var3;
		buttonMove("user",this.x,this.y);
	}
}
*/
///////////////////////////////////////////////

///////////////////////////////////////////////
//Person Position function

function getAP()
{
	if(window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
			if(xmlhttp != null)
			{
				xmlhttp.onreadystatechange = stateChange;
				xmlhttp.open("Get","php/example.php",true);
				xmlhttp.send();
			}
		}
	else
		{
			alert('does not support XMLHttpRequest');
		}	
}

function stateChange()
{
	if(xmlhttp.readyState==4)
		{
			if(xmlhttp.status == 200)
			{
				var point = xmlhttp.responseText;
				uPos(point);
			}
		}		
}
function uPos(point)
{
		var UserPos = JSON.parse(point);
		//var uID=UserPos[0].Var1;
		personPosX=parseFloat(UserPos[0].Xlocation)-22.5/(20*sc);
		personPosY=parseFloat(UserPos[0].Ylocation)+22.5/(20*sc);
}
///////////////////////////////////////////////


///////////////////////////////////////////////							
// jQuerry part
/*$(function () {
        $('.bubbleInfo').each(function () {
            var distance = 10;
            var time = 250;
            var hideDelay = 500;

            var hideDelayTimer = null;

            var beingShown = false;
            var shown = false;
            var trigger = $('.trigger', this);
            var info = $('.popup', this).css('opacity', 0);


            $([trigger.get(0), info.get(0)]).mouseover(function () {
                if (hideDelayTimer) clearTimeout(hideDelayTimer);
                if (beingShown || shown) {
                    // don't trigger the animation again
                    return;
                } else {
                    // reset position of info box
                    beingShown = true;

                    info.css({
                        top: -90,
                        left: -33,
                        display: 'block'
                    }).animate({
                        top: '-=' + distance + 'px',
                        opacity: 1
                    }, time, 'swing', function() {
                        beingShown = false;
                        shown = true;
                    });
                }

                return false;
            }).mouseout(function () {
                if (hideDelayTimer) clearTimeout(hideDelayTimer);
                hideDelayTimer = setTimeout(function () {
                    hideDelayTimer = null;
                    info.animate({
                        top: '-=' + distance + 'px',
                        opacity: 0
                    }, time, 'swing', function () {
                        shown = false;
                        info.css('display', 'none');
                    });

                }, hideDelay);

                return false;
            });
        });
    });*/
var $j = jQuery.noConflict();

$j(function () {
  $j('.bubbleInfo').each(function () {
    // options
    var distance = 10;
    var time = 250;
    var hideDelay = 500;

    var hideDelayTimer = null;

    // tracker
    var beingShown = false;
    var shown = false;
    
    var trigger = $j('.trigger', this);
    var popup = $j('.popup', this).css('opacity', 0);

    // set the mouseover and mouseout on both element
    $j([trigger.get(0), popup.get(0)]).mouseover(function () {
      // stops the hide event if we move from the trigger to the popup element
      if (hideDelayTimer) clearTimeout(hideDelayTimer);

      // don't trigger the animation again if we're being shown, or already visible
      if (beingShown || shown) {
        return;
      } else {
        beingShown = true;

        // reset position of popup box
        popup.css({
          top: -100,
          left: -33,
          display: 'block' // brings the popup back in to view
        })

        // (we're using chaining on the popup) now animate it's opacity and position
        .animate({
          top: '-=' + distance + 'px',
          opacity: 1
        }, time, 'swing', function() {
          // once the animation is complete, set the tracker variables
          beingShown = false;
          shown = true;
        });
      }
    }).mouseout(function () {
      // reset the timer if we get fired again - avoids double animations
      if (hideDelayTimer) clearTimeout(hideDelayTimer);
      
      // store the timer so that it can be cleared in the mouseover if required
      hideDelayTimer = setTimeout(function () {
        hideDelayTimer = null;
        popup.animate({
          top: '-=' + distance + 'px',
          opacity: 0
        }, time, 'swing', function () {
          // once the animate is complete, set the tracker variables
          shown = false;
          // hide the popup entirely after the effect (opacity alone doesn't do the job)
          popup.css('display', 'none');
        });
      }, hideDelay);
    });
  });
});

// reference http://jqueryfordesigners.com/coda-popup-bubbles/
//////////////////////////////////////////////


//////////////////////////////////////////////
// main
function main()
{
	//var user = new initPerson();
	initCanvas();
	getAP();
	if(personPosX == 'null' || personPosY == 'null')
	setViewport(30,30);
	else
	setViewport(personPosX,personPosY);
	//setViewport(personX+moveX,personY+moveY);
	setTimeout("main()" , 2500);	
	//drawMap();
}

//////////////////////////////////////////////

-->


