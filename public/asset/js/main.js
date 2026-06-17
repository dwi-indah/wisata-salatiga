let splitEl = SplitText.create(".introText", { type: "words" });
let imgIntro = gsap.utils.toArray(".introImg");
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

let imgGallery = gsap.utils.toArray(".introGallery-img");

const colorHight = "#173021";

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(GSDevTools, ScrollTrigger, SplitText)

    let tl = gsap.timeline();
    tl.to(splitEl.words, { color: colorHight, stagger: 0.1 })

    imgIntro.forEach((el) => {
        gsap.from(el, {
            scale: 0.8,
            opacity: 0.3,
            ease: "power1.inOut",
            duration: 0.5,
            filter: "blur(2px)",
            transformOrigin: "50% 50%",
            scrollTrigger: {
                scrub: true,
                trigger: el,
                start: "top 80%",
                end: () => "+=" + el.offsetHeight,
                // markers: true,
            }
        })
    })

    const st = ScrollTrigger.create({
        trigger: ".intro",
        start: "top 80%",
        end: "top top",
        animation: tl,
        scrub: true,
        // markers: true
    });

    imgGallery.forEach((el) => {
        gsap.to(imgGallery, {
            scale: 1,
            opacity: 1,
            transformOrigin: "50% 50%",
            stagger: {
                from: "center",
                ease: 'power2.inOut',
                amount: 1,
            },
            scrollTrigger: {
                scrub: true,
                trigger: ".introText",
                start: "top 20%",
                end: "top 0",
            }
        })
    })

});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        // Toggle active state on buttons
        tabBtns.forEach(b => b.classList.remove('active-tab'));
        btn.classList.add('active-tab');

        // Show/hide panels
        tabPanels.forEach(panel => {
            if (panel.dataset.panel === target) {
                panel.classList.remove('hidden');
            } else {
                panel.classList.add('hidden');
            }
        });
    });
});

const eventSwiper = new Swiper('.event-swiper', {

    slidesPerView: "auto",

    spaceBetween: 8,

    grabCursor: true,

    watchOverflow: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {

        768: {
            slidesPerView: 2,
        },

        1024: {
            slidesPerView: 3,
        },

        1440: {
            slidesPerView: 4,
        }

    }

});