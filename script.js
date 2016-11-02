document.createElement("body");
function addScript(src){
	var script = document.createElement("script");
	script.setAttribute("src",src);
	document.head.appendChild(script);
}
// Link other necessary scripts here with addScript function
addScript("Main.js");
addScript("Keys.js");
addScript("UI.js");
addScript("Assets.js");
addScript("Drawing.js");
window.onload = init;
/*
	Load images and audio here using 
	loadImage(referenceName, fileLocation);
	and
	loadAudio(referenceName, fileLocation);
	create canvas 
*/
//var x = 100, y = 100, w = false, a = false, s = false, d = false, speed = 5;
var eatiing;
function init(){
	registerFramework(MainFramework,"M");
	registerFramework(KeysFramework,"K");
	registerFramework(UIFramework,"UI");
	registerFramework(AssetsFramework,"A");
	registerFramework(DrawingFramework,"D");
	window.addEventListener("touchmove",function(e){e.preventDefault();});
	//makeShortcut(new AFr.Manager(),"A");
	makeShortcut(new UI.DBox(0,0,800,600), "U");
	A.loadImage("shipbase","ShipBase.png");
	A.load();
	var blah = function(){
		console.log(A.ready);
		setTimeout(blah, 100);
	}
	//blah();
	makeShortcut(A.i,"img");
	makeShortcut(A.a,"aud");
	//makeShortcut(K.Keys,"Keys");
	//console.log(K.Keys);
	//for (var p in window) console.log(p);
	M.createCanvas();
	//M.makeShortcut(M.canvas.getContext("2d"),"G");
	makeShortcut(M.canvas,"C");
	
	var loop = function(){
		U.update();
		U.render(C.getContext("2d"));
		//var g = ccontext;//M.canvas.getContext("2d");
		//var g = C.getContext("2d");
		//g.clearRect(0,0,C.width,C.height);//50,50,100,100);
		//if (w) y-=speed;
		//if (a) x-=speed;
		//if (s) y+=speed;
		//if (d) x+=speed;
		//g.fillStyle = "black";
		//g.fillRect(x,y,10,10);
		//if (Keys.W.down) y-=5;
		//if (Keys.S.down) y+=5;
		//if (Keys.A.down) x-=5;
		//if (Keys.D.down) x+=5;
	}
	M.setLoop(loop);
	//M.canvas.getContext("2d").clearRect(0,0,100,100);
	//M.canvas.background = "black";
	makeShortcut(K.KeyHub,"KH");
	var hub = new KH;//.KeyHub();
	hub.down = function(key){
		if (key === K.Keys.W) w = true;
		if (key === K.Keys.A) a = true;
		if (key === K.Keys.S) s = true;
		if (key === K.Keys.D) d = true;
		//console.log(key);
	}
	hub.up = function(key){
		if (key === K.Keys.W) w = false;
		if (key === K.Keys.A) a = false;
		if (key === K.Keys.S) s = false;
		if (key === K.Keys.D) d = false;
	}
	//hub.up = function(key){
	//	console.log(key);}
	//hub.pressed = function(key){
	//	console.log(key);}//*/
		//hub.refresh();
	K.setupListeners(hub);
	M.startLoop();
}
function Foodses(){
	var a = 0;
	var speed = 0.5;
	this.init = function(){
		this.x = ((Math.random())/2+1/4)*this.container.w;
		this.y = ((Math.random())/2+1/4)*this.container.h;
		a = Math.atan2(this.y-this.container.h/2,this.x-this.container.w/2);
	}
	this.update = function(){
		if (this.x < 0 || this.x > C.width || this.y < 0 || this.y > C.height){
			this.container.remove(this);
			U.get("p").lose();
		}
		if (Math.abs(U.get("p").x - this.x)<40&Math.abs(U.get("p").y - this.y)<40){
			U.get("p").eat();
			this.container.add(new Foodses());
			this.container.remove(this);
		}
		this.x+=Math.cos(a)*speed;
		this.y+=Math.sin(a)*speed;
	}
	this.render = function(g){
		g.fillStyle = "white";
		g.fillRect(this.x,this.y,10,10);
	}
}
function Feeder(){
	
}
function WittleBittySquare(){
	this.x = C.width/2;
	this.y = C.height/2;
	var spr = new D.Sprite(img("shipbase"));
	//console.log(img("shipbase").width);
	//spr.scalex = .2;
	//spr.scaley = .2;
	spr.setOriginCenter();
	//spr.originx = 25;
	var speed = 5;
	var score = 0;
	var high = 0;
	this.eat = function(){
		score++;
		if (score > high)
			high = score;
		console.log(score);
		if (score > 250)
			clearInterval (eating);
	}
	this.lose = function(){
		score = Math.round(score*.85);
		console.log(score);
	}
	this.init = function(){
		this.container.add(new UI.Follow(spr,this));
	}
	this.update = function(){
		if (K.Keys.W.down) this.y-=speed;
		if (K.Keys.S.down) this.y+=speed;
		if (K.Keys.A.down) this.x-=speed;
		if (K.Keys.D.down) this.x+=speed;
	}
	this.render = function(g){
		g.fillStyle = "white";
		//g.fillRect(this.x,this.y,10,10);
		spr.render(g);
		g.font = "15px Arial";
		g.fillText("score   "+score, this.x-30, this.y);
		g.fillText("hiscore "+high, this.x-30, this.y+15);
	/*if (typeof dt == "string"){
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(dt, x, y);
		return;
	}
	var d = dt.get();
	g.save();
	g.translate(x,y);
	g.rotate(d.a);
	g.scale(d.sx,d.sy);
	g.fillStyle = d.c;
	g.globalAlpha = d.al;
	g.font = d.f;
	g.textAlign = d.h;
	g.textBaseline = d.v;
	g.translate(d.ox,d.oy);
	g.fillText(d.t,0,0);
	g.restore();*/
	}
}
// Setup before beginning update loop
function start(){
	//console.log(A.ready);
	U.add(new WittleBittySquare(),"p");
	U.add(new Foodses());
	U.color = "black";
	eating = setInterval(function(){U.add(new Foodses());},10000);
	//var mini = new UI.DBox(700,0,100,100);
	//U.add(mini);
	//mini.color = "red";
	//mini.add(new WittleBittySquare(),"p2");
	//U.add(new UI.Follow(mini,U.get("p"),140,140));
	//mini.add(new UI.Follow(mini.camera,mini.get("p2"),0,0));
}
