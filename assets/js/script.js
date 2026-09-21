// ------------------------------------------------------------- Navbar Function:

document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar');
    var collapse = document.querySelector('.navbar-collapse');

    function updateNavbar() {
        if (!navbar) {
            return;
        }

        var scrolled = window.scrollY > 10;
        var menuOpen = collapse && collapse.classList.contains('show');

        if (scrolled || menuOpen) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);

    if (collapse) {
        collapse.addEventListener('shown.bs.collapse', updateNavbar);
        collapse.addEventListener('hidden.bs.collapse', updateNavbar);
    }
});

// ------------------------------------------------------------- Navigation Card Slider Function:

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('heroHomeSlider');
    const btnLeft = document.getElementById('slideLeft');
    const btnRight = document.getElementById('slideRight');

    if (slider && btnLeft && btnRight) {
        // Berechnet die Scroll-Weite (Breite einer Karte + gap)
        const scrollAmount = 320; 

        btnLeft.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        btnRight.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

// ------------------------------------------------------------- Team Card Slider Function:

document.addEventListener('DOMContentLoaded', () => {
    const teamSlider = document.getElementById('teamCardsSlider');
    const teamBtnLeft = document.getElementById('teamSlideLeft');
    const teamBtnRight = document.getElementById('teamSlideRight');

    if (teamSlider && teamBtnLeft && teamBtnRight) {
        const scrollAmount = 300; 

        teamBtnLeft.addEventListener('click', () => {
            teamSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        teamBtnRight.addEventListener('click', () => {
            teamSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

// ------------------------------------------------------------- UGC Video Cards & Modal:

document.addEventListener('DOMContentLoaded', function () {
    const ugcCards = document.querySelectorAll('.ugc-card[data-video-src]');
    const modalEl = document.getElementById('ugcVideoModal');
    const modalVideo = document.getElementById('ugcModalVideo');
    const modalTitle = document.getElementById('ugcModalTitle');
    const modalCategory = document.getElementById('ugcModalCategory');
    const showcaseCarousel = document.getElementById('ugcShowcaseCarousel');

    if (!modalEl || !modalVideo) return;

    // Bei Slide-Wechsel im Slider: nur das aktive Video abspielen
    if (showcaseCarousel) {
        showcaseCarousel.addEventListener('slid.bs.carousel', function (e) {
            const allVideos = showcaseCarousel.querySelectorAll('video');
            allVideos.forEach(function (v) { v.pause(); });
            const activeVideo = e.relatedTarget ? e.relatedTarget.querySelector('video') : null;
            if (activeVideo) {
                activeVideo.play().catch(function () {});
            }
        });
    }

    ugcCards.forEach(function (card) {
        function openModal() {
            const videoSrc = card.getAttribute('data-video-src');
            const brandName = card.getAttribute('data-brand-name') || 'Brand Deal';
            const category = card.getAttribute('data-category') || 'UGC Video';

            if (modalTitle) modalTitle.textContent = brandName;
            if (modalCategory) modalCategory.textContent = category;

            if (videoSrc) {
                modalVideo.src = videoSrc;
                modalVideo.load();
            }

            const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
            bsModal.show();
        }

        card.addEventListener('click', openModal);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    });

    // Beim Öffnen des Modals: Video mit Ton starten
    modalEl.addEventListener('shown.bs.modal', function () {
        modalVideo.currentTime = 0;
        modalVideo.muted = false;
        const playPromise = modalVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(function (err) {
                console.log('Autoplay blocked or user gesture required:', err);
            });
        }
    });

    // Beim Schließen des Modals: Video sofort stoppen und zurücksetzen
    modalEl.addEventListener('hide.bs.modal', function () {
        modalVideo.pause();
        modalVideo.src = '';
    });
});