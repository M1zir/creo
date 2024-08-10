gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Page Loader
function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }
    currentValue += Math.floor(Math.random() * 10) + 1;
    if (currentValue > 100) {
      currentValue = 100;
    }
    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}
startLoader();

gsap.to(".counter", {
  delay: 3.5,
  opacity: 0,
  onComplete: animatePaths
});

gsap.to(".bar", {
  delay: 4,
  height: 0,
  stagger: {
    amount: 0.7
  },
  ease: "power4.inOut"
});

// Smooth scrolling
let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2
});

// Logo animation
function animatePaths() {
  const paths = document.querySelectorAll("#Layer_2 path, #Layer_2 polygon");

  paths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      stroke: "#000",
      fill: "transparent"
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(path, {
          fill: "#000",
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });
  });
}

// "What is CREO?" animation
let isCreo = new SplitType("#is-creo");

gsap.to(".char", {
  y: 0,
  stagger: 0.1,
  delay: 0.1,
  duration: 0.1,
  scrollTrigger: {
    trigger: "#is-creo",
    pin: true,
    start: "top 60%",
    end: "top 61%",
    scrub: 1
  }
});

// Line animations
function animateLine(lineSelector, color) {
  const line = document.querySelector(lineSelector + " line");
  const length = line.getTotalLength();

  gsap.set(line, {
    strokeDasharray: length,
    strokeDashoffset: length,
    stroke: color
  });

  gsap.to(line, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: lineSelector,
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });
}

animateLine("#black-line", "#000");
animateLine("#white-line", "#fff");

// General text animations
gsap.utils.toArray(".page h2, .page p").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 90%",
        scrub: 1
      }
    }
  );
});

// "To rethink" animation
let toRethinkTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#to-rethink",
    start: "top top",
    end: "bottom 10%",
    pin: true,
    scrub: true,
  }
});

toRethinkTl
  .to("#to-rethink .think", {
    x: "0.8em",
    duration: 0.5
  })
  .to(
    "#to-rethink .re",
    {
      opacity: 1,
      x: "-2.5em",
      left: "100%",
      duration: 0.8
    },
    "-=0.5"
  );

// Mindset line animations
gsap.to(".mindset-line", {
  width: "49%",
  duration: 1.5,
  scrollTrigger: {
    trigger: ".white-line",
    start: "top top",
    end: "bottom 80%",
    scrub: true,
    pin: true,
    onUpdate: function (self) {
      if (self.progress === 1) {
        gsap.to(".mindset-line2", {
          height: "50vh",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".mindset-line2",
            start: "top center",
            scrub: true,
            toggleActions: "play reverse play reverse"
          }
        });
      }
    }
  }
});

// Assimilating line animations
gsap.to(".assimilating-line", {
  height: "45vh",
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".assimilating-line-container",
    start: "top top",
    end: "bottom 40%",
    scrub: true,
    toggleActions: "play reverse play reverse"
  }
});

gsap.to(".assimilating-line2", {
  height: "50vh",
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".assimilating-line-container2",
    start: "top top",
    end: "bottom 40%",
    scrub: true,
    toggleActions: "play reverse play reverse"
  }
});

// Growth thinking animation
gsap.from(".growth-thinking h1", {
  opacity: 0,
  rotation: 15,
  scale: 0.5,
  duration: 1.5,
  scrollTrigger: {
    trigger: ".growth-thinking",
    start: "top 80%",
    end: "top 20%",
    scrub: 1
  }
});

// Requires CREO animation
let requiresCreoTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#requires-creo",
    start: "top 10%",
    end: "bottom center",
    scrub: 1,
    pin: true,
  }
});

requiresCreoTl
  .to(".growth-part", { opacity: 1, y: 0, duration: 0.5 })
  .to(".rethinking-part", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
  .to(".growth-part", { 
    opacity: 0, 
    y: -20, 
    duration: 0.5,
    onComplete: () => {
      gsap.set(".growth-part", { display: "none" });
      gsap.set(".dynamic-text", { justifyContent: "flex-start" });
    }
  }, "+=1")
  .to(".rethinking-part", { 
    x: 0, 
    duration: 0.5 
  })
  .to(".creo-part", { 
    opacity: 1, 
    duration: 0.5,
    onStart: typewriterEffect 
  }, "-=0.5"); 

function typewriterEffect() {
  const creoText = "requires CREO.";
  const creoPart = document.querySelector(".creo-part");
  creoPart.textContent = "";
  
  let i = 0;
  const typeWriter = setInterval(() => {
    if (i < creoText.length) {
      creoPart.textContent += creoText.charAt(i);
      i++;
    } else {
      clearInterval(typeWriter);
    }
  }, 50);
}