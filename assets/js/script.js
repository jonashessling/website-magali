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