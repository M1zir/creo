// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MotionPathPlugin);
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



