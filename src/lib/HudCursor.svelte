<script>
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let wrap;
  let W = 0, H = 0;
  let mx = -1, my = -1;
  let hx = -1, hy = -1;
  let dx = -1, dy = -1;
  let raf;
  let ctx;

  const V = 'rgba(116,51,250,';
  const F = 'rgba(250,31,153,';

  function lerp(a, b, t) { return a + (b - a) * t; }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    if (mx < 0) { mx = W/2; my = H/2; hx = mx; hy = my; dx = mx; dy = my; }
  }

  function onMove(e) { mx = e.clientX; my = e.clientY; }

  function draw() {
    raf = requestAnimationFrame(draw);
    hx = lerp(hx, mx, 0.10);
    hy = lerp(hy, my, 0.10);
    dx = lerp(dx, mx, 0.20);
    dy = lerp(dy, my, 0.20);

    ctx.clearRect(0, 0, W, H);

    const DIAMOND = 14;
    const gap = DIAMOND + 6;

    // hairlines
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = V + '0.35)';
    ctx.beginPath(); ctx.moveTo(0, hy);      ctx.lineTo(hx - gap, hy);      ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx + gap, hy); ctx.lineTo(W, hy);           ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx, 0);      ctx.lineTo(hx, hy - gap);      ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx, hy + gap); ctx.lineTo(hx, H);           ctx.stroke();

    // diamond reticle
    const d = DIAMOND;
    ctx.strokeStyle = V + '0.95)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(dx, dy - d);
    ctx.lineTo(dx + d, dy);
    ctx.lineTo(dx, dy + d);
    ctx.lineTo(dx - d, dy);
    ctx.closePath();
    ctx.stroke();

    // center dot
    ctx.fillStyle = V + '0.90)';
    ctx.fillRect(dx - 1.5, dy - 1.5, 3, 3);

    // coord readout
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.fillStyle = V + '0.45)';
    const cx_str = String(Math.round(mx / W * 1920)).padStart(4, '0');
    const cy_str = String(Math.round((H - my) / H * 1080)).padStart(4, '0');
    ctx.fillText(cx_str + '  ' + cy_str, dx + d + 8, dy + 4);

    // fuchsia accent on diamond corners
    ctx.strokeStyle = F + '0.35)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(dx - d - 4, dy);
    ctx.lineTo(dx - d - 10, dy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(dx + d + 4, dy);
    ctx.lineTo(dx + d + 10, dy);
    ctx.stroke();
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    draw();
  });

  onDestroy(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMove);
  });
</script>

<canvas bind:this={canvas} style="
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 9999;
"></canvas>
