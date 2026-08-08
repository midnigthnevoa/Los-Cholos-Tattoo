/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado com movimento orgânico
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouse, isMobile, w, h;
  
  var config = {
    count: 50,
    minSize: 0.8,
    maxSize: 2.2,
    speed: 0.4,
    color: { r: 200, g: 117, b: 51 },
    colorAlt: { r: 232, g: 168, b: 124 },
    mouseRadius: 150,
    mouseForce: 1.2,
    lineDistance: 120,
    lineOpacity: 0.08
  };
  
  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    mouse = { x: -9999, y: -9999 };
    isMobile = window.innerWidth < 768;
    
    w = document.documentElement.clientWidth || window.innerWidth;
    h = document.documentElement.clientHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    
    createParticles();
    bindEvents();
    animate();
  }
  
  function createParticles() {
    particles = [];
    var count = isMobile ? 25 : config.count;
    
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var spd = 0.5 + Math.random() * config.speed;
      var startX = Math.random() * w;
      var startY = Math.random() * h;
      
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        opacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? config.color : config.colorAlt,
        angle: angle,
        speed: spd,
        wanderAngle: Math.random() * Math.PI * 2,
        exploding: true,
        explodeTime: 0,
        explodeDuration: 50 + Math.random() * 40
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
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity = Math.min(0.3, p.explodeTime / 25);
        
        if (p.explodeTime >= p.explodeDuration) {
          p.exploding = false;
          p.vx = Math.cos(p.angle) * p.speed;
          p.vy = Math.sin(p.angle) * p.speed;
        }
      } else {
        // Random direction changes - organic movement
        p.wanderAngle += (Math.random() - 0.5) * 0.6;
        p.vx += Math.cos(p.wanderAngle) * 0.08;
        p.vy += Math.sin(p.wanderAngle) * 0.08;
        
        // Occasional random kick
        if (Math.random() < 0.02) {
          var kickAngle = Math.random() * Math.PI * 2;
          p.vx += Math.cos(kickAngle) * 0.5;
          p.vy += Math.sin(kickAngle) * 0.5;
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
        var maxSpeed = p.speed * 3;
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
