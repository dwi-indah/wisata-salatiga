document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    const showAnim = gsap.from('.navbar', {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            if (self.direction === 1) {
                showAnim.reverse();
            } else {
                showAnim.play();
            }
        }
    });

});