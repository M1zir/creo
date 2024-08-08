// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
});
// Animate the SVG paths
const paths = document.querySelectorAll("#Layer_2 path, #Layer_2 polygon");
paths.forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
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

//register the plugin (just once)
gsap.registerPlugin(MotionPathPlugin);

gsap.to("#Lines", {
  duration: 5,
  repeat: 12,
  repeatDelay: 3,
  yoyo: true,
  ease: "power1.inOut",
  motionPath: {
    path: "M17.27,-404.545 C19.088,-193.533 20.801,-59.987 22.725,-0.001 ",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  }
});
