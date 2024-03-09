document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    document.querySelector('.next-btn').addEventListener('click', nextSlide);

    showSlide(currentSlide);
});

// offcanvas 

document.addEventListener('DOMContentLoaded', function() {
    var mobileAsideButton = document.querySelector('.mobile-aside-button');
    var offcanvasMobileMenu = document.querySelector('#offcanvas-mobile-menu');

    mobileAsideButton.addEventListener('click', function() {
        offcanvasMobileMenu.classList.add('active');
    });

    // Close the off-canvas menu when clicking on the close button
    var mobileMenuCloseTrigger = document.querySelector('#mobile-menu-close-trigger');
    mobileMenuCloseTrigger.addEventListener('click', function() {
        offcanvasMobileMenu.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var menuExpands = document.querySelectorAll('.menu-expand');

    menuExpands.forEach(function(menuExpand) {
        menuExpand.addEventListener('click', function() {
            var subMenu = this.nextElementSibling;
            subMenu.classList.toggle('active');
        });
    });
});
