import '../styles/index.sass';
import './pace.min.js';
import gsap from 'gsap';
import barba from '@barba/core';
import * as PIXI from 'pixi.js';

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 1,
    transformOrigin: 'top left',
    stagger: 0.2,
  });
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 0,
    transformOrigin: 'top left',
    stagger: 0.1,
    delay: 0.1,
  });
}

function contentAnimation() {
  gsap.from('main', {
    duration: 0.2,
    y: 30,
    autoAlpha: 0,
    delay: 0.5,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,

  to: {
    namespace: ['home'],
  },

  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter({ current, next, trigger }) {
        contentAnimation();
        if (next.namespace === 'home') homeAnimations();
        else if (next.namespace === 'about') detailAnimation();
      },

      async once({ current, next, trigger }) {
        contentAnimation();
        if (next.namespace === 'home') homeAnimations();
        else if (next.namespace === 'about') detailAnimation();
      },
    },
  ],
});

function homeAnimations() {
  function imgamation(src) {
    var app, displacementSprite, displacementFilter;

    function initPixi() {
      app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
      document.querySelector('main').appendChild(app.view);
      app.renderer.backgroundColor = 0xffffff;

      var image = new PIXI.Sprite.from(src);

      image.width = window.innerWidth;
      image.height = window.innerHeight;

      app.stage.addChild(image);

      displacementSprite = new PIXI.Sprite.from('./assets/img/texture.jpg');
      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

      app.stage.addChild(displacementSprite);
      app.stage.filters = [displacementFilter];
      app.renderer.view.style.transform = 'scale(1.02)';

      displacementSprite.scale.x = 3;
      displacementSprite.scale.y = 3;

      animate();
    }

    function animate() {
      displacementSprite.x += 10;
      displacementSprite.y += 4;
      requestAnimationFrame(animate);
    }

    initPixi();
  }

  imgamation('./assets/img/panel1-full.jpg');
  imgamation('./assets/img/panel2-full.jpg');
  imgamation('./assets/img/panel3-full.jpg');

  const $panels = document.querySelectorAll('.panel');
  const $images = document.querySelectorAll('canvas');

  $panels.forEach((panel) => {
    panel.addEventListener('mouseover', showImagination);
  });

  function showImagination(e) {
    const target = e.currentTarget;
    const current = target.dataset.panel;

    $images.forEach((e) => (e.style.zIndex = '-2'));
    $images[current].style.zIndex = '-1';

    gsap.to('.panel__img', {
      autoAlpha: 1,
      duration: 0.1,
    });

    gsap.to(target.querySelector('.panel__img'), {
      autoAlpha: 0,
      duration: 0.3,
    });
  }
}

function detailAnimation() {
  const $slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  function nextSlide() {
    const currentSlide = $slides[currentIndex];
    // gsap.to('.menu', { background: '#c9a578', delay: 1 });
    // gsap.to('.slide__sub-title', { color: '#c9a578', delay: 1 });

    // console.log(currentIndex);

    gsap.to(currentSlide.querySelector('.slide__caption'), {
      scale: 70,
      duration: 2,
      autoAlpha: 0,
      ease: 'power4.in',
    });

    gsap.to(currentSlide.querySelector('.slide__img'), {
      scale: 4,
      duration: 2,
      autoAlpha: 0,
      ease: 'power4.in',
    });

    if (currentIndex === $slides.length - 1) {
      gsap.to($slides[0], {
        autoAlpha: 1,
        delay: 2,
        duration: 1,
      });
      currentIndex = 0;
    } else {
      gsap.to($slides[currentIndex + 1], {
        autoAlpha: 1,
        delay: 2,
        duration: 1,
      });
      currentIndex++;
    }
  }

  setTimeout(() => nextSlide(), 3000);
  setTimeout(() => nextSlide(), 8000);

  const $slideAction = document.querySelectorAll('.slide__actions');
  $slideAction.forEach((e) => e.addEventListener('click', showSidebar));

  function showSidebar() {
    gsap.to('.reveal span', {
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });

    gsap.to('.slide__detail', {
      x: 0,
      duration: 0.5,
      ease: 'power4.out',
    });
  }
  const tl = gsap.timeline();

  tl.to('.slider-pagination__item:first-child img', {
    x: -11,
    y: -44,
    duration: 0.4,
    ease: 'power2.out',
  });

  tl.from('.slider-pagination__item:first-child .slide-pagination__loader', {
    autoAlpha: 0,
  });

  tl.to('.slider-pagination__item:first-child .slide-pagination__loader', {
    scaleX: 1,
    duration: 2,
    ease: 'power2.in',
  });

  tl.to('.slider-pagination__item:first-child img', {
    x: 0,
    y: 0,
    duration: 0.4,
    delay: 1,
    ease: 'power2.out',
    boxShadow: '0 9px 24px 0 rgba(0,0,0,0.30)',
  });

  tl.to('.slider-pagination__item:first-child .slide-pagination__loader', {
    autoAlpha: 0,
    delay: -0.4,
    duration: 0.1,
  });

  tl.to('.slider-pagination__item', {
    x: -141,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power2.out',
  });

  //
  tl.to('.slider-pagination__item:nth-child(2) img', {
    x: -11,
    y: -44,
    duration: 0.4,
    ease: 'power2.out',
  });

  tl.to('.slider-pagination__item:nth-child(2) .slide-pagination__loader', {
    scaleX: 1,
    duration: 2,
    ease: 'power2.in',
  });

  tl.to('.slider-pagination__item:nth-child(2) img', {
    x: 0,
    y: 0,
    duration: 0.4,
    delay: 1,
    ease: 'power2.out',
    boxShadow: '0 9px 24px 0 rgba(0,0,0,0.30)',
  });

  tl.to('.slider-pagination__item:nth-child(2) .slide-pagination__loader', {
    autoAlpha: 0,
    delay: -0.4,
    duration: 0.1,
  });

  tl.to('.slider-pagination__item', {
    x: -282,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power2.out',
  });

  tl.to('.slider-pagination__item:nth-child(3) img', {
    x: -11,
    y: -44,
    duration: 0.4,
    ease: 'power2.out',
  });
}

const $bigCircle = document.querySelector('.cursor__circle--big');
const $smallCircle = document.querySelector('.cursor__circle--small');
const $smallPlus = document.querySelector('.cursor__plus');
const $smallPlusArea = document.querySelector('.cursor__plus--area');
const $hoverables = document.querySelectorAll('.hoverable');
const hoverablesArea = document.querySelectorAll('.hoverableArea');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);

for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

for (let i = 0; i < hoverablesArea.length; i++) {
  hoverablesArea[i].addEventListener('mouseenter', onMouseHoverArea);
  hoverablesArea[i].addEventListener('mouseleave', onMouseHoverAreaOut);
}

// Move the cursor
function onMouseMove(e) {
  gsap.to($bigCircle, 0.4, {
    x: e.clientX,
    y: e.clientY,
  });
  gsap.to($smallCircle, 0.1, {
    x: e.clientX,
    y: e.clientY,
  });
  gsap.to($smallPlus, 0.1, {
    x: e.clientX,
    y: e.clientY,
  });
}

// Hover an element
function onMouseHover() {
  gsap.to('#bigCircle', {
    attr: {
      r: 25,
    },
  });
}
function onMouseHoverOut() {
  gsap.to('#bigCircle', {
    attr: {
      r: 18,
    },
  });
}

// Hover img an element
function onMouseHoverArea() {
  gsap.to($bigCircle, 0.3, {
    fill: '#212121',
    mixBlendMode: 'normal',
  });
  gsap.to($smallCircle, 0.3, {
    fill: 'transparent',
  });
  gsap.to($smallPlusArea, 0.3, {
    stroke: '#DEDEDE',
  });
}
function onMouseHoverAreaOut() {
  gsap.to($bigCircle, 0.3, {
    fill: 'transparent',
    mixBlendMode: 'difference',
  });
  gsap.to($smallCircle, 0.3, {
    fill: '#DEDEDE',
  });
  gsap.to($smallPlusArea, 0.3, {
    stroke: 'transparent',
  });
}
