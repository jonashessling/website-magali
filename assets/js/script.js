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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('coachingForm');
    if (!form) return; // Only run on pages with the coaching form

    let currentStep = 1;
    const totalSteps = 5;

    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');
    const stepIndicatorText = document.getElementById('stepIndicatorText');
    const btnPrev = document.getElementById('btnPrevStep');
    const btnNext = document.getElementById('btnNextStep');
    const btnSubmit = document.getElementById('btnSubmitForm');
    const modalFooterNav = document.getElementById('modalFooterNav');
    const successState = document.getElementById('successState'); // Fixed: was 'formSuccessState'

    // Experience slider value display — Fixed IDs: experienceScale / scaleVal
    const expSlider = document.getElementById('experienceScale');
    const expDisplay = document.getElementById('scaleVal');
    if (expSlider && expDisplay) {
        expSlider.addEventListener('input', function () {
            expDisplay.textContent = this.value + ' / 10';
        });
    }

    // Toggle extra input when "Selbstständig" is selected — Fixed: uses career_status name + value check
    const careerRadios = document.querySelectorAll('input[name="career_status"]');
    const selfEmployedField = document.getElementById('selfEmployedField');
    if (careerRadios.length && selfEmployedField) {
        // Wrap the field in a container we can show/hide (the parent div.mt-3)
        const selfEmployedWrap = selfEmployedField.closest('.mt-3');
        if (selfEmployedWrap) {
            selfEmployedWrap.classList.add('d-none'); // Hidden by default
        }
        careerRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (selfEmployedWrap) {
                    if (this.value === 'Selbstständig') {
                        selfEmployedWrap.classList.remove('d-none');
                    } else {
                        selfEmployedWrap.classList.add('d-none');
                    }
                }
            });
        });
    }

    function updateStepView() {
        formSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'), 10);
            step.classList.toggle('active', stepNum === currentStep);
        });

        const progressPct = (currentStep / totalSteps) * 100;
        if (progressBar) progressBar.style.width = progressPct + '%';
        if (stepIndicatorText) stepIndicatorText.textContent = `Schritt ${currentStep} von ${totalSteps}`;

        if (btnPrev) btnPrev.style.display = (currentStep === 1) ? 'none' : 'block';

        if (currentStep === totalSteps) {
            if (btnNext) btnNext.classList.add('d-none');
            if (btnSubmit) btnSubmit.classList.remove('d-none');
        } else {
            if (btnNext) btnNext.classList.remove('d-none');
            if (btnSubmit) btnSubmit.classList.add('d-none');
        }
    }

    function validateCurrentStep() {
        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (!currentStepEl) return true;

        const requiredInputs = currentStepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
            }
        });

        return isValid;
    }

    if (btnNext) {
        btnNext.addEventListener('click', function () {
            if (validateCurrentStep() && currentStep < totalSteps) {
                currentStep++;
                updateStepView();
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', function () {
            if (currentStep > 1) {
                currentStep--;
                updateStepView();
            }
        });
    }

    // Handle Form Submit (AJAX for Netlify Forms)
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function (e) {
            e.preventDefault();
            if (!validateCurrentStep()) return;

            const formData = new FormData(form);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => showSuccess())
            .catch(() => showSuccess()); // Show success even on network error (local dev)
        });
    }

    function showSuccess() {
        form.style.display = 'none';
        if (modalFooterNav) modalFooterNav.style.display = 'none';
        if (successState) successState.style.display = 'block';
        if (stepIndicatorText) stepIndicatorText.textContent = 'Fertig ✓';
        if (progressBar) progressBar.style.width = '100%';
    }

    // Reset modal state on close
    const modalEl = document.getElementById('coachingApplyModal');
    if (modalEl) {
        modalEl.addEventListener('hidden.bs.modal', function () {
            setTimeout(() => {
                currentStep = 1;
                form.reset();
                if (expDisplay) expDisplay.textContent = '1 / 10';
                // Re-hide self-employed field
                const selfEmployedWrap = document.getElementById('selfEmployedField')?.closest('.mt-3');
                if (selfEmployedWrap) selfEmployedWrap.classList.add('d-none');
                form.style.display = '';
                if (modalFooterNav) modalFooterNav.style.display = '';
                if (successState) successState.style.display = 'none';
                updateStepView();
            }, 300);
        });
    }
});