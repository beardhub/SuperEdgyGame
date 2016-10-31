function DrawingFramework(){
	this.frameworkName = "DrawingFramework";
	this.Sprite = function(img){
		this.img = img;
		this.x = 0;
		this.y = 0;
		this.scalex = 1;
		this.scaley = 1;
		this.originx = 0;
		this.originy = 0;
		this.rotation = 0;
		this.setOriginCenter = function(){
			this.originx = this.img.width/2;
			this.originy = this.img.height/2;
			//console.log(this.originx+ " "+this.img.width);
		}
		this.rotate = function(a){
			this.rotation+=a;
		}
		this.rotateto = function(a){
			this.rotation = a;
		}
		this.render = function(g){
			g.save();
			g.translate(this.x,this.y);//+this.originx,this.y+this.originy);
			g.rotate(this.rotation);
			g.scale(this.scalex,this.scaley);
			g.translate(-this.originx,-this.originy);
			g.drawImage(this.img,0,0,this.img.width,this.img.height);
			g.restore();
		}
	}
}
/*
images
text
shapes

*/