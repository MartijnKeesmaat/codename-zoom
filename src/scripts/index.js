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
      },

      async once({ current, next, trigger }) {
        console.log(next.namespace);
        contentAnimation();
      },
    },
  ],
});

function imgamation(src) {
  var app, displacementSprite, displacementFilter;

  function initPixi() {
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
    document.body.appendChild(app.view);
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
