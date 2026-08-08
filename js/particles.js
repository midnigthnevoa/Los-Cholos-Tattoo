/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado com movimento orgânico
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouse, isMobile, w, h;
  
  var config = {
    count: 120,
    minSize: 0.5,
    maxSize: 1.8,
    speed: 0.08,
    color: { r: 200, g: 117, b: 51 },
    colorAlt: { r: 232, g: 168, b: 124 },
    mouseRadius: 150,
    mouseForce: 0.5,
    lineDistance: 140,
    lineOpacity: 0.08
  };
  
  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    mouse = { x: -9999, y: -9999 };
    isMobile = window.innerWidth < 768;
    
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    
    createParticles();
    bindEvents();
    animate();
  }
  
  function createParticles() {
    particles = [];
    var count = isMobile ? 60 : config.count;
    var cx = w / 2;
    var cy = h / 2;
    var expBase = isMobile ? 2 : 3;
    var expRange = isMobile ? 4 : 6;
    
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var spd = expBase + Math.random() * expRange;
      
      particles.push({
        x: cx + (Math.random() - 0.5) * 50,
        y: cy + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        opacity: 0,
        targetOpacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? config.color : config.colorAlt,
        angle: angle,
        speed: 0.08 + Math.random() * config.speed,
        wanderAngle: Math.random() * Math.PI * 2,
        exploding: true,
        explodeTime: 0,
        explodeDuration: 60 + Math.random() * 50
      });
    }
  }
  
  function bindEvents() {
    document.addEventListener("mousemove", function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    document.addEventListener("mouseleave", function() {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    
    document.addEventListener("touchstart", function(e) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchmove", function(e) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchend", function() {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, w, h);
    update();
    drawLines();
    drawDots();
    requestAnimationFrame(animate);
  }
  
  function update() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      if (p.exploding) {
        p.explodeTime++;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity = Math.min(p.targetOpacity, p.explodeTime / 30);
        
        if (p.explodeTime >= p.explodeDuration) {
          p.exploding = false;
          p.vx = Math.cos(p.angle) * p.speed;
          p.vy = Math.sin(p.angle) * p.speed;
        }
      } else {
        // Random direction changes - organic movement
        p.wanderAngle += (Math.random() - 0.5) * 0.15;
        p.vx += Math.cos(p.wanderAngle) * 0.02;
        p.vy += Math.sin(p.wanderAngle) * 0.02;
        
        // Occasional random kick
        if (Math.random() < 0.01) {
          var kickAngle = Math.random() * Math.PI * 2;
          p.vx += Math.cos(kickAngle) * 0.15;
          p.vy += Math.sin(kickAngle) * 0.15;
        }
        
        // Mouse repulsion
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.mouseRadius && dist > 0) {
          var force = (config.mouseRadius - dist) / config.mouseRadius;
          p.vx += (dx / dist) * force * config.mouseForce;
          p.vy += (dy / dist) * force * config.mouseForce;
        }
        
        // Speed limit
        var currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        var maxSpeed = p.speed * 1.8;
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }
        
        // Very light friction
        p.vx *= 0.997;
        p.vy *= 0.997;
        
        p.x += p.vx;
        p.y += p.vy;
      }
      
      // Wrap
      if (p.x < -30) p.x = w + 30;
      if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30;
      if (p.y > h + 30) p.y = -30;
    }
  }
  
  function drawDots() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + "," + p.opacity + ")";
      ctx.fill();
    }
  }
  
  function drawLines() {
    ctx.lineWidth = 0.5;
    
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.lineDistance) {
          var opacity = (1 - dist / config.lineDistance) * config.lineOpacity;
          ctx.strokeStyle = "rgba(" + config.color.r + "," + config.color.g + "," + config.color.b + "," + opacity + ")";
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
