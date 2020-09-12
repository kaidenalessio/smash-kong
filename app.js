const ctx = myCanvas.getContext('2d');

myCanvas.style.backgroundImage = 'radial-gradient(white 33%, lightgray)';

const w = 640, h = 360;
let mx = 0, my = 0, sz = 96, ssz = 0, lx = 0, ly = 0, d = 0, l = 0;

const overlayCanvas = document.createElement('canvas');
overlayCanvas.width = w;
overlayCanvas.height = h;

const overlayCtx = overlayCanvas.getContext('2d');

const Draw = {
	circle(ctx, x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	}
};

window.onmousemove = (e) => {
	const b = myCanvas.getBoundingClientRect();
	mx = e.x - b.x;
	my = e.y - b.y;
};

window.onwheel = (e) => {
	sz = Math.max(1, sz + Math.sign(e.wheelDelta) * 5);
};

const loop = (t) => {

	// creating overlay
	overlayCtx.clearRect(0, 0, w, h);

	ssz -= (ssz - sz) * 0.2;
	Draw.circle(overlayCtx, mx, my, ssz);

	d += Math.PI * 0.02;
	l = ssz + Math.sin(t * 0.005) * ssz * 0.5;

	for (let i = 0; i < 2 * Math.PI; i += Math.PI * 0.25) {
		lx = Math.cos(d + i) * l;
		ly = Math.sin(d + i) * l;
		Draw.circle(overlayCtx, mx + lx, my + ly, ssz);
	}

	// existing content
	for (let i = 0; i < 100; i++) {
		ctx.fillStyle = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, ${Math.random()})`;
		Draw.circle(ctx, Math.random() * w, Math.random() * h, 24 + Math.random() * 48);
	}

	// filter
	ctx.globalCompositeOperation = 'destination-in';

	// new content
	ctx.drawImage(overlayCanvas, 0, 0);

	// reset filter
	ctx.globalCompositeOperation = 'source-over';

	requestAnimationFrame(loop);
};

loop(0);