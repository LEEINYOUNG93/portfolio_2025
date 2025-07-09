const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

//링크클릭
function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { scrollTo: elem });
  }
}

document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", (e) => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

scrollToHash(window.location.hash);

$(window).on("load", function () {
  intro();
  mouseEffect();
  timeBox();
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
    delay: 0.3,
  });

  master.add(introAnimation()).add(fadeInElements(".header, .gnb__nav, main"));
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
