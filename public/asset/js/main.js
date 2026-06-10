let splitEl = SplitText.create(".introText", { type: "words" });
let imgIntro = gsap.utils.toArray(".introImg");

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

    let timelineCard = gsap.utils.toArray(".timelineItem");

    timelineCard.forEach(item => {

        gsap.from(item, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                // markers: true,
            }
        });

    });

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
    
    const track = document.querySelector(".logo-track");

    // // Menghitung lebar total dari isi track agar animasi tepat
    // const tlTrack = gsap.timeline({ repeat: -1 });

    // tlTrack.to(track, {
    // x: "-50%", // Geser sejauh 50% lebar karena kita punya 2 set logo
    // duration: 20, // Atur durasi (semakin besar angkanya, semakin lambat)
    // ease: "none" // Penting untuk animasi linear yang mulus
    // });

    // // Opsional: Pause saat di-hover
    // track.addEventListener("mouseenter", () => tl.pause());
    // track.addEventListener("mouseleave", () => tl.play());
    const totalWidth = track.offsetWidth / 2; // Lebar satu set logo (tanpa duplikat)

  gsap.to(track, {
    x: -totalWidth, // Geser tepat sejauh lebar satu set logo
    duration: 20, 
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Loop matematis yang presisi
    }
  });
});

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

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

(function () {
    const track    = document.getElementById('eventsTrack');
    const btnPrev  = document.getElementById('eventsPrev');
    const btnNext  = document.getElementById('eventsNext');
    let currentIndex = 0;

    function getCardWidth() {
        const card = track.querySelector('.flex-shrink-0');
        if (!card) return 0;
        const gap = 16; // gap-4 = 1rem = 16px
        return card.offsetWidth + gap;
    }

    function getVisibleCount() {
        return Math.floor(track.parentElement.offsetWidth / getCardWidth()) || 1;
    }

    function getTotalCards() {
        return track.querySelectorAll('.flex-shrink-0').length;
    }

    function updateButtons() {
        btnPrev.disabled = currentIndex <= 0;
        btnNext.disabled = currentIndex >= getTotalCards() - getVisibleCount();
    }

    function slide(dir) {
        const total   = getTotalCards();
        const visible = getVisibleCount();
        currentIndex  = Math.max(0, Math.min(currentIndex + dir, total - visible));
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
        updateButtons();
    }

    btnPrev.addEventListener('click', () => slide(-1));
    btnNext.addEventListener('click', () => slide(1));

    // Reset on resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        track.style.transform = 'translateX(0)';
        updateButtons();
    });

    updateButtons();
})();