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

KONG.Room = {
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

KONG.Game = {
	init() {
		KONG.Input.init();
		window.addEventListener('keyup', KONG.Input.keyUpEventHandler);
		window.addEventListener('keydown', KONG.Input.keyDownEventHandler);
		window.addEventListener('mouseup', KONG.Input.mouseUpEventHandler);
		window.addEventListener('mousedown', KONG.Input.mouseDownEventHandler);
	},
	start() {
		window.requestAnimationFrame(KONG.Game.update);
	},
	update(t) {
		KONG.Time.update(t);
		KONG.Room.update();
		KONG.Room.render();
		KONG.Input.reset();
		window.requestAnimationFrame(KONG.Game.update);
	}
};

const ROOM_Menu = KONG.Room.create('Menu');

ROOM_Menu.start = () => {
	console.log('start menu');
};

ROOM_Menu.update = () => {
	// if (KONG.Input.keyDown(KONG.KeyCode.Space)) {
	// 	KONG.Room.start('Game');
	// }
	console.log(KONG.Time.deltaTime.toFixed(2), KONG.Time.time);
};

ROOM_Menu.render = () => {
	// console.log('render menu');
};

const ROOM_Game = KONG.Room.create('Game');

ROOM_Game.start = () => {
	console.log('start game');
};

ROOM_Game.update = () => {
	if (KONG.Input.keyDown(KONG.KeyCode.Space)) {
		KONG.Room.start('Menu');
	}
};

ROOM_Game.render = () => {
	console.log('render game');
};

KONG.Room.add(ROOM_Menu);
KONG.Room.add(ROOM_Game);

KONG.Game.init();
KONG.Game.start();
KONG.Room.start('Menu');