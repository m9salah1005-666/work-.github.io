 /* ============ 1. FLOATING HEART ENGINE ============ */
  function buildHearts(layerEl, count, sizeMin, sizeMax, opacity){
    for(let i=0;i<count;i++){
      const h = document.createElement('div');
      h.className = 'heart';
      const size = (Math.random()*(sizeMax-sizeMin)+sizeMin).toFixed(1);
      const left = (Math.random()*100).toFixed(2);
      const duration = (Math.random()*10+10).toFixed(2);
      const delay = (Math.random()*20).toFixed(2);
      const drift = (Math.random()*60-30).toFixed(0);
      h.style.width = size+'px';
      h.style.height = size+'px';
      h.style.left = left+'%';
      h.style.animationDuration = duration+'s';
      h.style.animationDelay = '-'+delay+'s';
      h.style.opacity = 0;
      h.style.setProperty('--drift', drift+'px');
      h.style.background = `rgba(229,213,184,${opacity})`;
      layerEl.appendChild(h);
    }
  }

  const layerBack = document.getElementById('layerBack');
  const layerMid = document.getElementById('layerMid');
  const layerFront = document.getElementById('layerFront');

  buildHearts(layerBack, 10, 6, 12, 0.22);
  buildHearts(layerMid, 10, 10, 18, 0.32);
  buildHearts(layerFront, 8, 16, 26, 0.42);

  /* ============ 2. PARALLAX ON SCROLL ============ */
  const scrollContainer = document.getElementById('scrollContainer');
  const layers = [layerBack, layerMid, layerFront];
  let ticking = false;

  function updateParallax(){
    const st = scrollContainer.scrollTop;
    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth);
      layer.style.transform = `translateY(${-(st*depth)}px)`;
    });
    ticking = false;
  }

  scrollContainer.addEventListener('scroll', () => {
    if(!ticking){
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  /* ============ 3. SCROLL-TRIGGERED REVEAL ============ */
  const revealEls = document.querySelectorAll('.reveal-el');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { root: scrollContainer, threshold: 0.2 });

  revealEls.forEach(el => io.observe(el));

  /* ============ 4. SECTION PROGRESS DOTS ============ */
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.dot');

  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const idx = Array.from(sections).indexOf(entry.target);
        dots.forEach(d => d.classList.remove('active'));
        if(dots[idx]) dots[idx].classList.add('active');
      }
    });
  }, { root: scrollContainer, threshold: 0.5 });

  sections.forEach(s => sectionIO.observe(s));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.target, 10);
      sections[idx].scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('scrollCue').addEventListener('click', () => {
    sections[1].scrollIntoView({ behavior: 'smooth' });
  });

  /* ============ 5. LIVE COUNTDOWN ============ */
  const TARGET_DATE = new Date('2026-07-24T16:00:00');

  function pad(n){ return n.toString().padStart(2,'0'); }

  function updateCountdown(){
    const now = new Date();
    let diff = TARGET_DATE - now;
    if(diff < 0) diff = 0;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById('cdDays').textContent = days;
    document.getElementById('cdHours').textContent = pad(hours);
    document.getElementById('cdMins').textContent = pad(mins);
    document.getElementById('cdSecs').textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============ 6. GATEKEEPER / CINEMATIC UNLOCK ============ */
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('enterBtn');
  const section0RevealEls = sections[0].querySelectorAll('.reveal-el');

  enterBtn.addEventListener('click', () => {
    splash.classList.add('hidden');

    setTimeout(() => {
      scrollContainer.classList.add('unlocked');

      // replay section 1 entrance for a cinematic first impression
      section0RevealEls.forEach(el => el.classList.remove('visible'));
      void scrollContainer.offsetWidth; // force reflow
      setTimeout(() => {
        section0RevealEls.forEach(el => el.classList.add('visible'));
      }, 80);

    }, 250);

    setTimeout(() => {
      splash.style.display = 'none';
    }, 1150);
  });