/* =========================================================
   PARTICLES — Los Cholos Tattoo
   Partículas copper/dourado que se afastam do mouse
   ========================================================= */

(function() {
  var canvas, ctx, particles, mouseX, mouseY, isTouching, isMobile, scrollVelocity;
  
  var config = {
    particleCount: 60,
    particleMinSize: 1,
    particleMaxSize: 2.5,
    particleSpeed: 0.15,
    particleColor: { r: 200, g: 117, b: 51 }, // #C87533 copper
    particleColorAlt: { r: 232, g: 168, b: 124 }, // #E8A87C copper-light
    mouseRadius: 80,
    mouseForce: 0.05,
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
    isTouching = false;
    isMobile = window.innerWidth < 768;
    scrollVelocity = 0;
    
    resize();
    createParticles();
    bindEvents();
    animate();
  }
  
  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr);
  }
  
  function createParticles() {
    particles = [];
    var count = isMobile ? 30 : config.particleCount;
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        originX: Math.random() * window.innerWidth,
        originY: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * config.particleSpeed,
        vy: (Math.random() - 0.5) * config.particleSpeed,
        size: config.particleMinSize + Math.random() * (config.particleMaxSize - config.particleMinSize),
        opacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? config.particleColor : config.particleColorAlt
      });
    }
  }
  
  function bindEvents() {
    var resizeTimeout;
    window.addEventListener("resize", function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        isMobile = window.innerWidth < 768;
        resize();
        createParticles();
      }, 200);
    });
    
    // Track scroll velocity
    var lastScrollY = window.scrollY;
    var scrollTimeout;
    window.addEventListener("scroll", function() {
      scrollVelocity = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        scrollVelocity = 0;
      }, 50);
    }, { passive: true });
    
    document.addEventListener("mousemove", function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    document.addEventListener("mouseleave", function() {
      mouseX = -1000;
      mouseY = -1000;
    });
    
    // Touch support - always track touch position
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
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    updateParticles();
    drawLines();
    drawParticles();
    
    requestAnimationFrame(animate);
  }
  
  function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      // Mouse/touch repulsion - always active
      var dx = p.x - mouseX;
      var dy = p.y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < config.mouseRadius && dist > 0) {
        var force = (config.mouseRadius - dist) / config.mouseRadius;
        var angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * config.mouseForce;
        p.vy += Math.sin(angle) * force * config.mouseForce;
      }
      
      // Apply velocity (reduced during scroll for stability)
      var scrollFactor = scrollVelocity > 2 ? 0.3 : 1;
      p.x += p.vx * scrollFactor;
      p.y += p.vy * scrollFactor;
      
      // Friction
      p.vx *= 0.94;
      p.vy *= 0.94;
      
      // Return to origin slowly
      p.vx += (p.originX - p.x) * 0.0003;
      p.vy += (p.originY - p.y) * 0.0003;
      
      // Bounds - wrap around
      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.y < -10) p.y = window.innerHeight + 10;
      if (p.y > window.innerHeight + 10) p.y = -10;
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
  
  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();