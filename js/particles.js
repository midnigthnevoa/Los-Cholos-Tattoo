/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado que se afastam do mouse
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouseX, mouseY, isMobile;
  
  var config = {
    particleCount: 60,
    particleMinSize: 1,
    particleMaxSize: 2.5,
    particleColor: { r: 200, g: 117, b: 51 },
    particleColorAlt: { r: 232, g: 168, b: 124 },
    mouseRadius: 80,
    mouseForce: 0.08,
    returnForce: 0.03,
    lineDistance: 70,
    lineOpacity: 0.05
  };
  
  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    particles = [];
    mouseX = -1000;
    mouseY = -1000;
    isMobile = window.innerWidth < 768;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    createParticles();
    bindEvents();
    animate();
  }
  
  function createParticles() {
    particles = [];
    var count = isMobile ? 25 : config.particleCount;
    var w = canvas.width;
    var h = canvas.height;
    for (var i = 0; i < count; i++) {
      var x = Math.random() * w;
      var y = Math.random() * h;
      particles.push({
        x: x,
        y: y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        size: config.particleMinSize + Math.random() * (config.particleMaxSize - config.particleMinSize),
        opacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? config.particleColor : config.particleColorAlt
      });
    }
  }
  
  function bindEvents() {
    document.addEventListener("mousemove", function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    document.addEventListener("mouseleave", function() {
      mouseX = -1000;
      mouseY = -1000;
    });
    
    document.addEventListener("touchstart", function(e) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchmove", function(e) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchend", function() {
      mouseX = -1000;
      mouseY = -1000;
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateParticles();
    drawLines();
    drawParticles();
    
    requestAnimationFrame(animate);
  }
  
  function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      // Mouse/touch repulsion
      var dx = p.x - mouseX;
      var dy = p.y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < config.mouseRadius && dist > 0) {
        var force = (config.mouseRadius - dist) / config.mouseRadius;
        var angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * config.mouseForce;
        p.vy += Math.sin(angle) * force * config.mouseForce;
      }
      
      // Return to home position
      p.vx += (p.homeX - p.x) * config.returnForce;
      p.vy += (p.homeY - p.y) * config.returnForce;
      
      // Friction
      p.vx *= 0.85;
      p.vy *= 0.85;
      
      // Apply velocity
      p.x += p.vx;
      p.y += p.vy;
    }
  }
  
  function drawParticles() {
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
          ctx.strokeStyle = "rgba(" + config.particleColor.r + "," + config.particleColor.g + "," + config.particleColor.b + "," + opacity + ")";
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
