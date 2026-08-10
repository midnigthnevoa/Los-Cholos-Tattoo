/* =========================================================
   SMOKE PARTICLES — Los Cholos Tattoo
   Efeito de fumaça/névoa para fundo dark/blackwork
   ========================================================= */

(function() {
  var canvas, ctx, particles, isMobile, w, h;
  
  var config = {
    count: 35,
    minSize: 40,
    maxSize: 120,
    minOpacity: 0.03,
    maxOpacity: 0.1,
    speed: 0.15,
    fadeSpeed: 0.0008,
    colors: [
      { r: 34, g: 34, b: 34 },
      { r: 51, g: 51, b: 51 },
      { r: 40, g: 40, b: 40 },
      { r: 28, g: 28, b: 28 }
    ]
  };
  
  function init() {
    canvas = document.getElementById("smoke-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    isMobile = window.innerWidth < 768;
    
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    
    createParticles();
    bindEvents();
    animate();
  }
  
  function createParticles() {
    particles = [];
    var count = isMobile ? 20 : config.count;
    
    for (var i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }
  }
  
  function createParticle(randomY) {
    var size = config.minSize + Math.random() * (config.maxSize - config.minSize);
    var colorIndex = Math.floor(Math.random() * config.colors.length);
    
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + size,
      size: size,
      baseSize: size,
      opacity: config.minOpacity + Math.random() * (config.maxOpacity - config.minOpacity),
      targetOpacity: config.minOpacity + Math.random() * (config.maxOpacity - config.minOpacity),
      color: config.colors[colorIndex],
      vx: (Math.random() - 0.5) * config.speed * 0.5,
      vy: -(config.speed + Math.random() * config.speed * 0.5),
      wobbleSpeed: 0.005 + Math.random() * 0.01,
      wobbleAmount: 20 + Math.random() * 30,
      wobbleOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.002 + Math.random() * 0.005,
      pulseAmount: 0.1 + Math.random() * 0.15,
      time: 0,
      life: 0,
      maxLife: 800 + Math.random() * 600
    };
  }
  
  function bindEvents() {
    window.addEventListener("resize", function() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      isMobile = window.innerWidth < 768;
      config.count = isMobile ? 20 : 35;
    });
  }
  
  function update() {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      
      p.time++;
      p.life++;
      
      // Wobble movement (organic side-to-side)
      var wobble = Math.sin(p.time * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmount;
      p.x += p.vx + wobble * 0.01;
      p.y += p.vy;
      
      // Pulse size
      p.size = p.baseSize + Math.sin(p.time * p.pulseSpeed) * p.baseSize * p.pulseAmount;
      
      // Fade in at bottom, fade out at top
      var lifeRatio = p.life / p.maxLife;
      var yRatio = p.y / h;
      
      if (lifeRatio < 0.1) {
        p.opacity = p.targetOpacity * (lifeRatio / 0.1);
      } else if (lifeRatio > 0.7) {
        p.opacity = p.targetOpacity * (1 - (lifeRatio - 0.7) / 0.3);
      } else {
        p.opacity = p.targetOpacity;
      }
      
      // Additional fade near top of screen
      if (p.y < h * 0.2) {
        p.opacity *= p.y / (h * 0.2);
      }
      
      // Remove if off screen or dead
      if (p.y < -p.size || p.life >= p.maxLife) {
        particles.splice(i, 1);
        particles.push(createParticle(false));
      }
      
      // Wrap horizontally
      if (p.x < -p.size) p.x = w + p.size;
      if (p.x > w + p.size) p.x = -p.size;
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, w, h);
    
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      if (p.opacity <= 0) continue;
      
      // Create radial gradient for smoke effect
      var gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.size
      );
      
      var r = p.color.r;
      var g = p.color.g;
      var b = p.color.b;
      var alpha = p.opacity;
      
      gradient.addColorStop(0, "rgba(" + r + "," + g + "," + b + "," + alpha + ")");
      gradient.addColorStop(0.4, "rgba(" + r + "," + g + "," + b + "," + (alpha * 0.6) + ")");
      gradient.addColorStop(0.7, "rgba(" + r + "," + g + "," + b + "," + (alpha * 0.2) + ")");
      gradient.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
