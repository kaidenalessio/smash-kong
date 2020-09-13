const KONG = {};

KONG.KeyCode = {
	Backspace: 8,
	Tab: 9,
	Enter: 13,
	Shift: 16,
	Control: 17,
	Alt: 18,
	Break: 19,
	CapsLock: 20,
	Escape: 27,
	PageUp: 33,
	Space: 32,
	PageDown: 34,
	End: 35,
	Home: 36,
	Left: 37,
	Up: 38,
	Right: 39,
	Down: 40,
	Print: 44,
	Insert: 45,
	Delete: 46,
	Alpha0: 48,
	Alpha1: 49,
	Alpha2: 50,
	Alpha3: 51,
	Alpha4: 52,
	Alpha5: 53,
	Alpha6: 54,
	Alpha7: 55,
	Alpha8: 56,
	Alpha9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	LeftWindow: 91,
	RightWindow: 92,
	Select: 93,
	Keypad0: 96,
	Keypad1: 97,
	Keypad2: 98,
	Keypad3: 99,
	Keypad4: 100,
	Keypad5: 101,
	Keypad6: 102,
	Keypad7: 103,
	Keypad8: 104,
	Keypad9: 105,
	KeypadMultiply: 106,
	KeypadPlus: 107,
	KeypadMinus: 109,
	KeypadPeriod: 110,
	KeypadDivide: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	Numlock: 144,
	ScrollLock: 145,
	Semicolon: 186,
	Equals: 187,
	Comma: 188,
	Minus: 189,
	Period: 190,
	Slash: 191,
	LeftBracket: 219,
	Backslash: 220,
	RightBracket: 221,
	Quote: 222
};

KONG.MouseButton = {
	Left: 0,
	Middle: 1,
	Right: 2
};

KONG.Input = {
	keys: [],
	mouses: [],
	KEYS_LENGTH: 256,
	MOUSES_LENGTH: 3,
	init() {
		this.keys.length = 0;
		this.mouses.length = 0;
		for (let i = 0; i < this.KEYS_LENGTH; i++) {
			this.keys.push(this.createKey());
		}
		for (let i = 0; i < this.MOUSES_LENGTH; i++) {
			this.mouses.push(this.createKey());
		}
	},
	reset() {
		for (let i = this.KEYS_LENGTH - 1; i >= 0; --i) {
			this.keys[i].reset();
		}
		for (let i = this.MOUSES_LENGTH - 1; i >= 0; --i) {
			this.mouses[i].reset();
		}
	},
	keyUp(i) {
		return this.keys[i].released;
	},
	keyDown(i) {
		return this.keys[i].pressed;
	},
	keyHold(i) {
		return this.keys[i].held;
	},
	mouseUp(i) {
		return this.mouses[i].released;
	},
	mouseDown(i) {
		return this.mouses[i].pressed;
	},
	mouseHold(i) {
		return this.mouses[i].held;
	},
	createKey() {
		return {
			held: false,
			pressed: false,
			released: false,
			up() {
				this.released = true;
				this.held = false;
			},
			down() {
				this.pressed = true;
				this.held = true;
			},
			reset() {
				this.pressed = false;
				this.released = false;
			}
		};
	},
	keyUpEventHandler(e) {
		KONG.Input.keys[e.keyCode].up();
	},
	keyDownEventHandler(e) {
		const k = KONG.Input.keys[e.keyCode];
		if (!k.held) k.down();
	},
	mouseUpEventHandler(e) {
		KONG.Input.mouses[e.button].up();
	},
	mouseDownEventHandler(e) {
		const m = KONG.Input.mouses[e.button];
		if (!m.held) m.down();
	}
};

class KongRoom {
	constructor(name) {
		this.name = name;
	}
	start() {}
	update() {}
	render() {}
}

KONG.Canvas = document.createElement('canvas');

KONG.Room = {
	w: 300,
	h: 150,
	mid: {
		w: 150,
		h: 75
	},
	list: {},
	current: new KongRoom(''),
	previous: new KongRoom(''),
	start(name) {
		this.previous = this.current;
		this.current = this.list[name] || null;
		if (this.current === null) {
			console.log(`Room not found: ${name}`);
			this.current = new KongRoom(name);
		}
		this.current.start();
	},
	update() {
		this.current.update();
	},
	render() {
		this.current.render();
	},
	add(room) {
		this.list[room.name] = room;
	},
	create(name) {
		return new KongRoom(name);
	},
	resizeEventHandler() {
		const b = KONG.Canvas.getBoundingClientRect();
		KONG.Room.w = KONG.Canvas.width = b.width;
		KONG.Room.h = KONG.Canvas.height = b.height;
		KONG.Room.mid.w = KONG.Room.w * 0.5;
		KONG.Room.mid.h = KONG.Room.h * 0.5;
	}
};

KONG.Time = {
	time: 0,
	lastTime: 0,
	deltaTime: 0,
	update(t) {
		this.lastTime = this.time;
		this.time = t;
		this.deltaTime = this.time - this.lastTime;
	}
};

KONG.C = {
	aliceBlue: '#f0f8ff',
	antiqueWhite: '#faebd7',
	aqua: '#00ffff',
	aquamarine: '#7fffd4',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	bisque: '#ffe4c4',
	black: '#000000',
	blanchedAlmond: '#ffebcd',
	blue: '#0000ff',
	blueViolet: '#8a2be2',
	brown: '#a52a2a',
	burlyWood: '#deb887',
	cadetBlue: '#5f9ea0',
	chartreuse: '#7fff00',
	chocolate: '#d2691e',
	coral: '#ff7f50',
	cornflowerBlue: '#6495ed',
	cornsilk: '#fff8dc',
	crimson: '#dc143c',
	cyan: '#00ffff',
	darkBlue: '#00008b',
	darkCyan: '#008b8b',
	darkGoldenRod: '#b8860b',
	darkGray: '#a9a9a9',
	darkGrey: '#a9a9a9',
	darkGreen: '#006400',
	darkKhaki: '#bdb76b',
	darkMagenta: '#8b008b',
	darkOliveGreen: '#556b2f',
	darkOrange: '#ff8c00',
	darkOrchid: '#9932cc',
	darkRed: '#8b0000',
	darkSalmon: '#e9967a',
	darkSeaGreen: '#8fbc8f',
	darkSlateBlue: '#483d8b',
	darkSlateGray: '#2f4f4f',
	darkSlateGrey: '#2f4f4f',
	darkTurquoise: '#00ced1',
	darkViolet: '#9400d3',
	deepPink: '#ff1493',
	deepSkyBlue: '#00bfff',
	dimGray: '#696969',
	dimGrey: '#696969',
	dodgerBlue: '#1e90ff',
	fireBrick: '#b22222',
	floralWhite: '#fffaf0',
	forestGreen: '#228b22',
	fuchsia: '#ff00ff',
	gainsboro: '#dcdcdc',
	ghostWhite: '#f8f8ff',
	gold: '#ffd700',
	goldenRod: '#daa520',
	gray: '#808080',
	grey: '#808080',
	green: '#008000',
	greenYellow: '#adff2f',
	honeyDew: '#f0fff0',
	hotPink: '#ff69b4',
	indianRed: '#cd5c5c',
	indigo: '#4b0082',
	ivory: '#fffff0',
	khaki: '#f0e68c',
	lavender: '#e6e6fa',
	lavenderBlush: '#fff0f5',
	lawnGreen: '#7cfc00',
	lemonChiffon: '#fffacd',
	lightBlue: '#add8e6',
	lightCoral: '#f08080',
	lightCyan: '#e0ffff',
	lightGoldenRodYellow: '#fafad2',
	lightGray: '#d3d3d3',
	lightGrey: '#d3d3d3',
	lightGreen: '#90ee90',
	lightPink: '#ffb6c1',
	lightSalmon: '#ffa07a',
	lightSeaGreen: '#20b2aa',
	lightSkyBlue: '#87cefa',
	lightSlateGray: '#778899',
	lightSlateGrey: '#778899',
	lightSteelBlue: '#b0c4de',
	lightYellow: '#ffffe0',
	lime: '#00ff00',
	limeGreen: '#32cd32',
	linen: '#faf0e6',
	magenta: '#ff00ff',
	maroon: '#800000',
	mediumAquaMarine: '#66cdaa',
	mediumBlue: '#0000cd',
	mediumOrchid: '#ba55d3',
	mediumPurple: '#9370db',
	mediumSeaGreen: '#3cb371',
	mediumSlateBlue: '#7b68ee',
	mediumSpringGreen: '#00fa9a',
	mediumTurquoise: '#48d1cc',
	mediumVioletRed: '#c71585',
	midnightBlue: '#191970',
	mintCream: '#f5fffa',
	mistyRose: '#ffe4e1',
	moccasin: '#ffe4b5',
	navajoWhite: '#ffdead',
	navy: '#000080',
	oldLace: '#fdf5e6',
	olive: '#808000',
	oliveDrab: '#6b8e23',
	orange: '#ffa500',
	orangeRed: '#ff4500',
	orchid: '#da70d6',
	paleGoldenRod: '#eee8aa',
	paleGreen: '#98fb98',
	paleTurquoise: '#afeeee',
	paleVioletRed: '#db7093',
	papayaWhip: '#ffefd5',
	peachPuff: '#ffdab9',
	peru: '#cd853f',
	pink: '#ffc0cb',
	plum: '#dda0dd',
	powderBlue: '#b0e0e6',
	purple: '#800080',
	rebeccaPurple: '#663399',
	red: '#ff0000',
	rosyBrown: '#bc8f8f',
	royalBlue: '#4169e1',
	saddleBrown: '#8b4513',
	salmon: '#fa8072',
	sandyBrown: '#f4a460',
	seaGreen: '#2e8b57',
	seaShell: '#fff5ee',
	sienna: '#a0522d',
	silver: '#c0c0c0',
	skyBlue: '#87ceeb',
	slateBlue: '#6a5acd',
	slateGray: '#708090',
	slateGrey: '#708090',
	snow: '#fffafa',
	springGreen: '#00ff7f',
	steelBlue: '#4682b4',
	tan: '#d2b48c',
	teal: '#008080',
	thistle: '#d8bfd8',
	tomato: '#ff6347',
	turquoise: '#40e0d0',
	violet: '#ee82ee',
	wheat: '#f5deb3',
	white: '#ffffff',
	whiteSmoke: '#f5f5f5',
	yellow: '#ffff00',
	yellowGreen: '#9acd32'
};

KONG.Draw = {
	ctx: KONG.Canvas.getContext('2d'),
	setFill(c) {
		this.ctx.fillStyle = c;
	},
	setStroke(c) {
		this.ctx.strokeStyle = c;
	},
	setColor(c) {
		this.ctx.fillStyle = c;
		this.ctx.strokeStyle = c;
	},
	setStrokeWeight(n) {
		this.ctx.lineWidth = n;
	},
	draw(stroke=false) {
		stroke? this.ctx.stroke() : this.ctx.fill();
	},
	rect(x, y, w, h, stroke=false) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.draw(stroke);
	},
	clear(x, y, w, h) {
		this.ctx.clearRect(x, y, w, h);
	}
};

KONG.Game = {
	init() {
		KONG.Input.init();
		window.addEventListener('keyup', KONG.Input.keyUpEventHandler);
		window.addEventListener('keydown', KONG.Input.keyDownEventHandler);
		window.addEventListener('mouseup', KONG.Input.mouseUpEventHandler);
		window.addEventListener('mousedown', KONG.Input.mouseDownEventHandler);
		window.addEventListener('resize', KONG.Room.resizeEventHandler);
		document.body.appendChild(KONG.Canvas);
		KONG.Room.resizeEventHandler();
	},
	start() {
		window.requestAnimationFrame(KONG.Game.update);
	},
	update(t) {
		KONG.Time.update(t);
		KONG.Room.update();
		KONG.Draw.clear(0, 0, KONG.Room.w, KONG.Room.h);
		KONG.Room.render();
		KONG.Input.reset();
		window.requestAnimationFrame(KONG.Game.update);
	}
};

const ROOM_Menu = KONG.Room.create('Menu');

ROOM_Menu.start = () => {
	console.log('menu start');
};

ROOM_Menu.update = () => {};

ROOM_Menu.render = () => {
	KONG.Draw.setColor(KONG.C.rebeccaPurple);
	KONG.Draw.rect(32, 32, 24, 36);
	KONG.Draw.setColor(KONG.C.lightGoldenRodYellow);
	KONG.Draw.setStrokeWeight(10);
	KONG.Draw.draw(true);
};

KONG.Room.add(ROOM_Menu);

KONG.Game.init();
KONG.Game.start();
KONG.Room.start('Menu');