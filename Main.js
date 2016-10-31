function MainFramework(){
	this.frameworkName = "MainFramework";
	var haltFlag = false;
	//var pauseFlag;
	var loop;
	this.startLoop = function(){
			//console.log(this.allLoaded+" "+this.frameworkName);
		//if (exists(i) && exists(i.clearInterval)) i.clearInterval();
		if (this.allLoaded()){
			if (exists(start))start();
			executionLoop();
		}
		else {console.log("Waiting for frameworks to load...");setTimeout(this.startLoop.bind(this),50);}
	}
	this.createCanvas = function(w,h){
		if (typeof w == "number" && typeof h == "number")
				console.log("Creating new canvas of size "+w+" by "+h+".");
		else {	console.log("Creating new canvas of size 800 by 600.");		w = 800;h = 600;}
		this.canvas = document.createElement('canvas');
		this.canvas.width  = w;	this.canvas.height = h;
		document.body.appendChild(this.canvas);}
	this.setLoop = function(loop0){
		if (typeof loop0 == "function")
			loop = loop0;
	}
	function executionLoop(){
		if (typeof loop == "function")
			loop();
		else {
			console.log("loop is not a function.");
			return;
		}
		if (!haltFlag)
			requestAnimationFrame(executionLoop);
		else console.log("haltFlag called. Stopping execution.");
	}
	this.fN2N = function(fN){return FindFrameworkAndDo(fN,function(n){return n;});}
	this.n2FN = function(n){return FindFrameworkAndDo(n,function(f){return f.frameworkName;},true);}
	this.allLoaded = function(){
		var ready = true;
		for (var p in Frameworks){
			//console.log(p+" "+Frameworks[p].ready);
			if (typeof Frameworks[p].ready == "boolean")
				ready = ready && Frameworks[p].ready;
			else if (typeof Frameworks[p].ready == "function")
				ready = ready && Frameworks[p].ready();}
		return ready;
	}
	this.FindFrameworkAndDo = function(frameworkName, action, giveframework){
		if (typeof action == "undefined")
			action = function(){}
		for (var p in Frameworks)
			if (Frameworks[p].frameworkName == frameworkName){
				if (typeof giveframework == "boolean" && giveframework)
					action.call(Frameworks[p]);
				else action.call(p);
				return true;}
		return false;
	}
}
var Frameworks = {};
function registerFramework(framework, name){
	if (typeof framework == "function")
		framework = new framework();
	if (framework === false){
		console.log("Framework already loaded");
		return;}
	if (typeof window[name] == "undefined" && typeof framework == "object"){
		window[name] = framework;
		Frameworks[name] = framework;
	}
	else console.log("Framework name already taken in global namespace.");
}
function makeShortcut(target, name){
	if (typeof window[name] == "undefined")		window[name] = target;
	else console.log("Shortcut name already taken in global namespace.");
}
function extend(sub, sup){sub.prototype = Object.create(sup.prototype);}
function size(obj){var s = 0;for (var p in obj)if (obj.hasOwnProperty(p))s++;return s;}
function exists(thing){return (typeof thing !== "undefined");}
function existsAndIs(thing, is){return exists(thing) && thing == is;}