
var major = {
	obj: null,
	draw: false
};
var minor = {
	obj: null,
	draw: false
};
var pos = null;
var draw_start = false;

function major_ampullate(pos) {
	this.pos = pos;
	this.draw_web = function() {
		let size = random(400, 800);
		stroke("#ffff00");
		noFill();
		triangle(this.pos.x, this.pos.y, 
			this.pos.x + size, this.pos.y, 
			this.pos.x + size / 2, this.pos.y + size * .866);
	}
}

function minor_ampullate(pos) {
	this.pos = pos;
	this.angle = 0;
	this.len = random(40, 400);
	this.draw_web = function() {
		stroke("#ff69b4");
		noFill();
		new_pos = {x: this.pos.x + this.len * cos(this.angle), y: this.pos.y + this.len * sin(this.angle)};
		line(this.pos.x, this.pos.y, new_pos.x, new_pos.y);
		this.angle += 60;
		this.pos = new_pos;
		this.len += 10;
	}
}

function preload() {
	
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent("p5-container");

	background("#000");	
	text("Press UP_ARROW for major ampullate. Press DOWN_ARROW for minor ampullate", windowWidth / 2, windowHeight / 2, 30, 20);
	angleMode(DEGREES);

	pos = {x: windowWidth / 2, y: windowHeight / 2};

	major.obj = new major_ampullate(pos);
	minor.obj = new minor_ampullate(pos);
}

function draw() {
	if (major.draw) {
		major.obj.draw_web();
		// console.log("major");
	}
	if (minor.draw) {
		minor.obj.draw_web();
		// console.log("minor");
	}
}

function keyPressed() {
	if (!draw_start) {
		draw_start = true;
		background("#000");
	}

	if (keyCode === UP_ARROW) {
		major.draw = true;
		// console.log("UP");
	}

	if (keyCode === DOWN_ARROW) {
		minor.draw = true;
	}
}

function keyReleased() {
	if (keyCode === UP_ARROW) {
		major.draw = false;
		major.obj.pos = {x: random(-30, windowWidth - 10), y: random(10, windowHeight - 10)};
	}

	if (keyCode === DOWN_ARROW) {
		minor.draw = false;
		minor.obj.len = random(40, 400);
		minor.obj.angle = 0;
		minor.obj.pos = {x: random(10, windowWidth - 10), y: random(10, windowHeight - 10)};
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

