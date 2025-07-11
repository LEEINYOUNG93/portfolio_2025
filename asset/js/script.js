const lenis = new Lenis({
  duration: 1.5,
  smooth: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      lenis.scrollTo(targetEl);
    }
  });
});

$(window).on("load", function () {
  $(window).scrollTop(0);
  intro();
  mouseEffect();
  timeBox();
  lineEffect();
  AOS.init();
});

function mouseEffect() {
  const customCursor = document.querySelector(".cursor-wrap");
  $(document).mousemove(function (e) {
    gsap.to(customCursor, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.1,
      opacity: 1,
    });
  });

  const customCursor2 = document.querySelector(".cursor-wrap .cursor");
  $("body a,body button").hover(
    function () {
      gsap.to(customCursor2, 0.1, { scale: 0.3 });
    },
    function () {
      gsap.to(customCursor2, 0.1, { scale: 1 });
    }
  );

  //마우스 이벤트
  const mouseTl = gsap.timeline({
    paused: true,
  });

  mouseTl
    .to(".cursor-wrap i", 0.1, { opacity: 1 }, "a")
    .to(".cursor-wrap .learn-more", 0.1, { opacity: 1 }, "a");

  $(".mouse-event").hover(
    function () {
      mouseTl.play();
    },
    function () {
      mouseTl.reverse();
    }
  );
}

function intro() {
  const animationOptions = {
    ease: "power3.inOut",
  };

  document.body.style.overflow = "hidden";

  const introAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: animationOptions.ease,
        duration: 1,
      },
    });

    tl.to(".intro__title", {
      duration: 1,
      y: 0,
      autoAlpha: 1,
    })
      .to(".intro__background--left, .intro__background--right", {
        scaleX: 1,
      })
      .to(".intro__background--left, .intro__background--right", {
        scaleY: 0,
        transformOrigin: "top center",
      })
      .to(
        ".intro__title",
        {
          duration: 1,
          y: -60,
          autoAlpha: 0,
        },
        "-=0.5"
      )
      .to(
        ".intro",
        {
          y: "-100%",
          autoAlpha: 0,
        },
        "-=0.5"
      );

    return tl;
  };

  const skewInElements = (elements) => {
    const tl = gsap.timeline();

    tl.from(elements, {
      duration: 1,
      ease: animationOptions.ease,
      skewY: -5,
      autoAlpha: 0,
      y: 40,
    });

    return tl;
  };

  const fadeInElements = (elements) => {
    const tl = gsap.timeline();

    tl.from(elements, {
      duration: 1,
      ease: animationOptions.ease,
      y: "20px",
      autoAlpha: 0,
      stagger: 0.1,
    });

    return tl;
  };

  const master = gsap.timeline({
    paused: false,
  });

  master
    .add(introAnimation())
    .add(fadeInElements(".header, .gnb__nav, .section__1"))
    .add(() => {
      document.body.style.overflow = "";
    });
  // .add(skewInElements("h1, .hero__col--2 img"), "-=1");
}

function timeBox() {
  const koreaTarget = document.getElementById("korTime");

  function getkoreaTime() {
    const koreaTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    koreaTarget.innerText = koreaTime;
  }

  getkoreaTime();
  setInterval(getkoreaTime, 1000);
}

function lineEffect() {
  $("[data-slideUp=true]").each(function (i, el) {
    child = $(this).find(".line");
    line = $(this).find(".border-line");
    gsap.to(line, {
      scrollTrigger: {
        trigger: el,
        start: "top 50%",
        end: "bottom center",
        ease: "power3.out",
        toggleActions: "restart none reverse none",
      },
      width: "100%",
      duration: 1,
      stagger: 0.1,
    });
    gsap.to(child, {
      scrollTrigger: {
        trigger: el,
        start: "top 50%",
        end: "bottom top",
        toggleActions: "restart none reverse none",
      },
      transform: "translateY(0%)",
      stagger: 0.1,
    });
  });
}
