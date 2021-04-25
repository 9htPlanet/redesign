let sliderParams = {
    position: 0,
    imagesCount: 0,
    sliderLine: undefined
}

class Slider {
    static loadSlider() {
        sliderParams.sliderLine = document.querySelector('.slider .slider-line');
        sliderParams.position = 0;
        sliderParams.imagesCount = document.querySelectorAll('.slider .slider-line img').length;

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

        if (sliderParams.imagesCount < 2) {
            document.querySelector('.slider-next').style.display = "none";
        }
    }


    static initPrevious() {
        document.querySelector('.slider-prev').addEventListener('mousedown', function () {
            Slider.doPrev();
        });
        if (sliderParams.imagesCount < 2) {
            document.querySelector('.slider-prev').style.display = "none";
        }
    }

    static doNext() {
        sliderParams.position++;
        if (sliderParams.position >= sliderParams.imagesCount) {
            sliderParams.position = 0;
        }
        Slider.rollSlider();
    }

    static doPrev() {
        sliderParams.position--;

        if (sliderParams.position < 0) {
            sliderParams.position = sliderParams.imagesCount - 1;
        }
        Slider.rollSlider();
    }

    static rollSlider() {
        let transWidth = document.querySelector('.slider').offsetWidth;
        if (!transWidth) {
            transWidth = document.querySelector('.donate-column-1').offsetWidth;
        }

        document.querySelectorAll(".slider_img").forEach(node => node.style.width = transWidth + "px");

        sliderParams.sliderLine.style.transform = 'translate(-' + sliderParams.position * transWidth + 'px)';
    }
}