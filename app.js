gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Animate the SVG icon
gsap.set("#Layer_2 line", { drawSVG: 0 });
gsap.to("#Layer_2 line", {
    drawSVG: "100%",
    duration: 1,
    stagger: 0.2,
    ease: "power2.inOut"
});

const pages = document.querySelectorAll(".page");

pages.forEach((page, index) => {
    gsap.from(page.children, {
        scrollTrigger: {
            trigger: page,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});