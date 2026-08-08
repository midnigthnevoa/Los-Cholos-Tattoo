/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado com movimento orgânico
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouse, isMobile;
  
  var config = {
    count: 60,
    minSize: 0.8,
    maxSize: 2.2,
    speed: 0.5,
    color: { r: 200, g: 117, b: 51 },
    colorAlt: { r: 232, g: 168, b: 124 },
    mouseRadius: 120,
    mouseForce: 0.8,
    lineDistance: 100,
    lineOpacity: 0.08
  };
  
  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    mouse = { x: -9999, y: -9999 };
    isMobile = window.innerWidth < 768;
    
    var w = document.documentElement.clientWidth || window.innerWidth;
    var h = document.documentElement.clientHeight || window.innerHeight;
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
    var count = isMobile ? 30 : config.count;
    var w = canvas.width;
    var h = canvas.height;
    var cx = w / 2;
    var cy = h / 2;
    
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var expSpeed = 4 + Math.random() * 10;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * expSpeed,
        vy: Math.sin(angle) * expSpeed,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        opacity: 0,
        targetOpacity: 0.2 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? config.color : config.colorAlt,
        angle: angle,
        speed: 0.3 + Math.random() * config.speed,
        wander: Math.random() * Math.PI * 2,
        wanderSpeed: 0.02 + Math.random() * 0.03,
        exploding: true,
        explodeTime: 0,
        explodeDuration: 40 + Math.random() * 30
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawLines();
    drawDots();
    requestAnimationFrame(animate);
  }
  
  function update() {
    var w = canvas.width;
    var h = canvas.height;
    
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      if (p.exploding) {
        // Explosion phase
        p.explodeTime++;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        
        // Fade in during explosion
        p.opacity = Math.min(p.targetOpacity, p.explodeTime / 20);
        
        // End explosion
        if (p.explodeTime >= p.explodeDuration) {
          p.exploding = false;
          p.vx = Math.cos(p.angle) * p.speed;
          p.vy = Math.sin(p.angle) * p.speed;
        }
      } else {
        // Normal floating phase
        // Wander
        p.wander += p.wanderSpeed;
        p.vx += Math.cos(p.wander) * 0.05;
        p.vy += Math.sin(p.wander) * 0.05;
        
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
        
        // Friction
        p.vx *= 0.998;
        p.vy *= 0.998;
        
        // Apply
        p.x += p.vx;
        p.y += p.vy;
      }
      
      // Wrap
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
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
