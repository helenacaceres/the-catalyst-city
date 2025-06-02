const sliders = {};

document.addEventListener('DOMContentLoaded', function () {

    initSlider('game-slider');


    initSlider('team-slider');


    addTouchSupport();
});

// inicializar um carrossel
function initSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');

    //estado inicial
    sliders[sliderId] = {
        currentSlide: 0,
        totalSlides: slides.length
    };

    //primeiro slide
    showSlide(sliderId, 0);
}

//mostrar um slide específico
function showSlide(sliderId, index) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const dots = document.querySelector(`#${sliderId}`).parentNode.querySelectorAll('.dot');

    // diz ao sistema interno do carrossel: “agora o slide ativo é o de número tal”
    sliders[sliderId].currentSlide = index;

    // garante que exatamente um slide por vez
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // remover a classe 'active' de todos os pontos
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    //slide atual
    slides[index].style.display = 'block';

    // adicionar a classe 'active' ao ponto atual
    dots[index].classList.add('active');
}

//navegar para um slide específico
function currentSlide(sliderId, index) {
    showSlide(sliderId, index);
}

// mover para o próximo ou anterior
function moveSlide(sliderId, direction) {
    const slider = sliders[sliderId];
    let newIndex = slider.currentSlide + direction;

    //limites
    if (newIndex < 0) {
        newIndex = slider.totalSlides - 1;
    } else if (newIndex >= slider.totalSlides) {
        newIndex = 0;
    }

    showSlide(sliderId, newIndex);
}

//toque
function addTouchSupport() {
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const sliderId = slider.id;
        let startX, endX;

        //toque inicial
        slider.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        }, false);

        //fim de toque
        slider.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;

            // direção do swipe
            if (startX - endX > 50) {
                //para a esquerda (próximo slide)
                moveSlide(sliderId, 1);
            } else if (endX - startX > 50) {
                //para a direita (slide anterior)
                moveSlide(sliderId, -1);
            }
        }, false);
    });
    
    // menu 
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');

    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', () => {
            menuItems.classList.toggle('active');
            // Optional: Change aria-label for accessibility
            const isExpanded = menuItems.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        });
    }
}