class Slider {

    static position = 0
    static imagesCount = 0
    static sliderLine;

    static loadSlider() {
        Slider.sliderLine = document.querySelector('.slider .slider-line');
        Slider.position = 0;
        Slider.imagesCount = document.querySelectorAll('.slider .slider-line img').length;

        Slider.initPrevious();
        Slider.initNext();
        Slider.rollSlider(0)

        window.addEventListener('resize', Slider.rollSlider);

        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    Slider.doPrev();
                    break;
                case "ArrowRight":
                    Slider.doNext();
                    break;
            }
        });
        setTimeout(Slider.rollSlider, 50);
    }

    static initNext() {
        document.querySelector('.slider-next').addEventListener('mousedown', function () {
            Slider.doNext();
        });
        document.querySelector('.slider-line').addEventListener('mousedown', function () {
            Slider.doNext();
        });

        if (Slider.imagesCount < 2) {
            document.querySelector('.slider-next').style.display = "none";
        }
    }


    static initPrevious() {
        document.querySelector('.slider-prev').addEventListener('mousedown', function () {
            Slider.doPrev();
        });
        if (Slider.imagesCount < 2) {
            document.querySelector('.slider-prev').style.display = "none";
        }
    }

    static doNext() {
        Slider.position++;
        if (Slider.position >= Slider.imagesCount) {
            Slider.position = 0;
        }
        Slider.rollSlider();
    }

    static doPrev() {
        Slider.position--;

        if (Slider.position < 0) {
            Slider.position = Slider.imagesCount - 1;
        }
        Slider.rollSlider();
    }

    static rollSlider() {
        let transWidth = document.querySelector('.slider').offsetWidth;
        if (!transWidth) {
            transWidth = document.querySelector('.donate-column-1').offsetWidth;
        }

        document.querySelectorAll(".slider_img").forEach(node => node.style.width = transWidth + "px");

        Slider.sliderLine.style.transform = 'translate(-' + Slider.position * transWidth + 'px)';
    }
}