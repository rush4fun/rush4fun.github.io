// VIDEO SLIDER
let videos = document.querySelectorAll('.js-hero-image__carousel-vid');
var btn = document.querySelector(".js-hero-image__btn");
let indicators = document.querySelectorAll('.js-hero-image__indicators');

indicators.forEach(item => {
    item.addEventListener('click', function () {
        btn.style.display = 'inline-block';
        for (let i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
    })
})

btn.addEventListener('click', function () {
    this.style.display = 'none';
    videos.forEach(item => {
        if (item.parentElement.classList.contains('active')) {
            if (item.pause) {
                item.play();
            }
        }
    });
})

videos.forEach(item => {
    item.addEventListener('click', function () {
        this.pause();
        btn.style.display = 'inline-block';
    })
})
//  ACCORDION
let detailBtns = document.querySelectorAll('.js-detailBtn');

detailBtns.forEach(item => {
    item.addEventListener('click', function () {
        if (this.childNodes[1].classList.contains('fa-chevron-up')) {
            this.childNodes[1].classList.remove('fa-chevron-up');
            this.childNodes[1].classList.add('fa-chevron-down');
        } else {
            this.childNodes[1].classList.remove('fa-chevron-down');
            this.childNodes[1].classList.add('fa-chevron-up');
        }
    })
})