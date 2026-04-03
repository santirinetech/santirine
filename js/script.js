const cv = document.getElementById('canvas-bg');
const cx = cv.getContext('2d');
let W, H, pts = [];

function resize() {
  W = cv.width = window.innerWidth;
  H = cv.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 100; i++) {
  pts.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .25,
    r: Math.random() * 1.4 + .3,
    c: Math.random() > .5 ? '0,195,255' : '162,89,255',
    o: Math.random() * .5 + .1
  });
}

function draw() {
  cx.clearRect(0, 0, W, H);
  pts.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    cx.beginPath();
    cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(${p.c},${p.o})`;
    cx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j],
        dx = p.x - q.x,
        dy = p.y - q.y,
        d = Math.sqrt(dx * dx + dy * dy);
      if (d < 90) {
        cx.beginPath();
        cx.moveTo(p.x, p.y);
        cx.lineTo(q.x, q.y);
        cx.strokeStyle = `rgba(162,89,255,${.07*(1-d/90)})`;
        cx.lineWidth = .5;
        cx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}
draw();

const nums = document.querySelectorAll('.sn');
const ob = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target,
      t = +el.dataset.t;
    let c = 0;
    const s = t / 40,
      iv = setInterval(() => {
        c += s;
        if (c >= t) {
          el.textContent = t + (t === 100 ? '%' : '+');
          clearInterval(iv);
        } else el.textContent = Math.floor(c) + (t === 100 ? '%' : '+');
      }, 25);
    ob.unobserve(el);
  });
});
nums.forEach(n => ob.observe(n));

function sendWA() {
  const nome = document.getElementById('f-nome').value;
  const tel = document.getElementById('f-tel').value;
  const serv = document.getElementById('f-serv').value;
  const msg = document.getElementById('f-msg').value;
  const txt = `Olá! Vim pelo site da Santirine Tech.%0ANome: ${encodeURIComponent(nome||'não informado')}%0AWhatsApp: ${encodeURIComponent(tel||'não informado')}%0AServiço: ${encodeURIComponent(serv||'não informado')}%0AMensagem: ${encodeURIComponent(msg||'não informada')}`;
  window.open(`https://wa.me/5527988573982?text=${txt}`, '_blank');
}
