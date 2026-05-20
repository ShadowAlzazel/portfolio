<script>
  // Decorative HUD overlay — corner brackets, ruler ticks, grid, telemetry text
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let W = 0, H = 0;
  let ctx;
  let raf;

  const V = 'rgba(116,51,250,';
  const F = 'rgba(250,31,153,';
  const MARGIN = 24;
  const BRACKET = 36;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function drawFrame() {
    raf = requestAnimationFrame(drawFrame);
    ctx.clearRect(0, 0, W, H);

    // subtle grid
    ctx.strokeStyle = V + '0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 22; i++) {
      const y = i / 22 * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (let i = 1; i < 40; i++) {
      const x = i / 40 * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    // diagonal corner guides
    ctx.strokeStyle = V + '0.055)';
    ctx.lineWidth = 0.5;
    const diagLen = Math.max(W, H) * 0.35;
    [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]].forEach(([cx, cy, sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(cx + sx * MARGIN * 1.4, cy + sy * MARGIN * 1.4);
      ctx.lineTo(cx + sx * (MARGIN + diagLen) * 0.707, cy + sy * (MARGIN + diagLen) * 0.707);
      ctx.stroke();
    });

    // corner brackets
    ctx.strokeStyle = V + '0.38)';
    ctx.lineWidth = 1;
    [
      [MARGIN, MARGIN, 1, 1],
      [W - MARGIN, MARGIN, -1, 1],
      [MARGIN, H - MARGIN, 1, -1],
      [W - MARGIN, H - MARGIN, -1, -1],
    ].forEach(([bx, by, sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(bx + sx * BRACKET, by);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx, by + sy * BRACKET);
      ctx.stroke();
    });

    // fuchsia accent — bottom right bracket
    ctx.strokeStyle = F + '0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W - MARGIN - BRACKET, H - MARGIN);
    ctx.lineTo(W - MARGIN, H - MARGIN);
    ctx.lineTo(W - MARGIN, H - MARGIN - BRACKET);
    ctx.stroke();

    // top center marker
    ctx.strokeStyle = V + '0.32)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - BRACKET, MARGIN);
    ctx.lineTo(W / 2 + BRACKET, MARGIN);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W / 2, MARGIN);
    ctx.lineTo(W / 2, MARGIN + BRACKET * 0.5);
    ctx.stroke();

    // ruler ticks — top
    for (let i = 0; i <= 40; i++) {
      const tx = i / 40 * W;
      const major = i % 4 === 0;
      ctx.strokeStyle = V + (major ? '0.40)' : '0.18)');
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, MARGIN * 0.45);
      ctx.lineTo(tx, MARGIN * 0.45 + (major ? 10 : 4));
      ctx.stroke();
    }

    // ruler ticks — right
    for (let i = 0; i <= 22; i++) {
      const ty = i / 22 * H;
      const major = i % 4 === 0;
      ctx.strokeStyle = V + (major ? '0.40)' : '0.18)');
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W - MARGIN * 0.45 - (major ? 10 : 4), ty);
      ctx.lineTo(W - MARGIN * 0.45, ty);
      ctx.stroke();
    }

    // bottom telemetry text
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.fillStyle = V + '0.22)';
    ['MGS  245', 'TWS  967', 'STP  197', 'LTD  657'].forEach((line, i) => {
      ctx.fillText(line, MARGIN + 8, H - MARGIN - 50 + i * 13);
    });

    // bottom center label
    ctx.fillStyle = V + '0.22)';
    ctx.textAlign = 'center';
    ctx.fillText('REC  TELEMETRY  ON', W / 2, H - MARGIN - 8);

    // right numeric column
    ctx.fillStyle = V + '0.14)';
    ctx.textAlign = 'right';
    [36393, 32897, 12361, 32154, 75691, 32697, 51336].forEach((n, i) => {
      ctx.fillText(n, W - MARGIN - 16, H / 2 - 40 + i * 12);
    });
    ctx.textAlign = 'left';
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    drawFrame();
  });

  onDestroy(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  });
</script>

<canvas bind:this={canvas} style="
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 10;
"></canvas>
