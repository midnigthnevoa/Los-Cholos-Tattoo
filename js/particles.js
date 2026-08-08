/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado que se afastam do mouse
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouseX, mouseY, isTouching;
  
  var config = {
    particleCount: 80,
    particleMinSize: 1,
    particleMaxSize: 3,
    particleSpeed: 0.3,
    particleColor: { r: 200, g: 117, b: 51 }, // #C87533 copper
    particleColorAlt: { r: 232, g: 168, b: 124 }, // #E8A87C copper-light
    mouseRadius: 120,
    mouseForce: 0.08,
    lineDistance: 100,
    lineOpacity: 0.08
  };
  
  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    particles = [];
    mouseX = -1000;
    mouseY = -1000;
    isTouching = false;
    
    resize();
    createParticles();
    bindEvents();
    animate();
  }
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticles() {
    particles = [];
    for (var i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.particleSpeed,
        vy: (Math.random() - 0.5) * config.particleSpeed,
        size: config.particleMinSize + Math.random() * (config.particleMaxSize - config.particleMinSize),
        opacity: 0.2 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? config.particleColor : config.particleColorAlt
      });
    }
  }
  
  function bindEvents() {
    window.addEventListener("resize", function() {
      resize();
      createParticles();
    });
    
    document.addEventListener("mousemove", function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    document.addEventListener("mouseleave", function() {
      mouseX = -1000;
      mouseY = -1000;
    });
    
    // Touch support
    document.addEventListener("touchstart", function(e) {
      isTouching = true;
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchmove", function(e) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchend", function() {
      isTouching = false;
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
      
      if (dist < config.mouseRadius) {
        var force = (config.mouseRadius - dist) / config.mouseRadius;
        var angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * config.mouseForce;
        p.vy += Math.sin(angle) * force * config.mouseForce;
      }
      
      // Apply velocity
      p.x += p.vx;
      p.y += p.vy;
      
      // Friction
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      // Bounds
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
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
    ctx.strokeStyle = "rgba(" + config.particleColor.r + "," + config.particleColor.g + "," + config.particleColor.b + "," + config.lineOpacity + ")";
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
  
  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();