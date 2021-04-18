class Slider {

    static loadSlider() {
        const images = document.querySelectorAll('.slider .slider-line img');
        const sliderLine = document.querySelector('.slider .slider-line');
        let count = 0;
        let width;

        Slider.init(sliderLine, images, count);
        window.addEventListener('resize', Slider.init);

        Slider.previous();
        Slider.next();


    }

    static init(sliderLine, images, count) {
        let width = document.querySelector('.slider').offsetWidth;
        Slider.rollSlider(sliderLine, count, width);
        Slider.imgByCenter(images, width);
    }

    static next() {
        let count1 = 0;
        const sliderLine1 = document.querySelector('.slider .slider-line');
        let width1 = document.querySelector('.slider').offsetWidth;
        const images1 = document.querySelectorAll('.slider .slider-line img');

        document.querySelector('.slider-next').addEventListener('click', function () {
            count1++;
            if (count1 >= images1.length) {
                count1 = 0;
            }
            Slider.rollSlider(sliderLine1, count1, width1);
        });
    }

    static previous() {
        let count1 = 0;
        const sliderLine1 = document.querySelector('.slider .slider-line');
        let width1 = document.querySelector('.slider').offsetWidth;
        const images1 = document.querySelectorAll('.slider .slider-line img');

        document.querySelector('.slider-prev').addEventListener('click', function () {
            count1--;
            if (count1 < 0) {
                count1 = images1.length - 1;
            }
            Slider.rollSlider(sliderLine1, count1, width1);
        });
    }


    static rollSlider(sliderLine, count, width) {
        const sliderLine2 = document.querySelector('.slider .slider-line');

        sliderLine2.style.transform = 'translate(-' + count * width + 'px)';

    }

    static imgByCenter(images, width) {
        if (images != null) {
            console.log(images.length);
            for (let i = 0; i < images.length; i++) {
                let prevDifference;
                let currentDifference = (width - images[i].width) / 2;
                if (images[i - 1] == null) {
                    images[i].style.marginLeft = currentDifference + "px";
                    console.log("IF CURRENT WIDTH" + width + "__" + currentDifference);
                } else {
                    prevDifference = (width - images[i - 1].width) / 2;
                    images[i].style.marginLeft = (prevDifference + currentDifference) + "px";
                    console.log("ELSE CURRENT " + currentDifference);

                }

            }

        }
    }
}

window.onload = () => {
    setTimeout(() => {
        const images = document.querySelectorAll('.slider .slider-line img');
        const sliderLine = document.querySelector('.slider .slider-line');
        let count = 0;
        let width;

        function init() {
            width = document.querySelector('.slider').offsetWidth;
            rollSlider();
            imgByCenter();
        }

        init();

        window.addEventListener('resize', init);

        document.querySelector('.slider-next').addEventListener('click', function () {
            count++;
            if (count >= images.length) {
                count = 0;
            }
            rollSlider();
        });
        document.querySelector('.slider-prev').addEventListener('click', function () {
            count--;
            if (count < 0) {
                count = images.length - 1;
            }
            rollSlider();
        });

        function rollSlider() {
            sliderLine.style.transform = 'translate(-' + count * width + 'px)';

        }

        function imgByCenter() {
            for (let i = 0; i < images.length; i++) {
                let prevDifference;
                let currentDifference = (width - images[i].width) / 2;
                if (images[i - 1] == null) {
                    images[i].style.marginLeft = currentDifference + "px";
                } else {
                    prevDifference = (width - images[i - 1].width) / 2;
                    images[i].style.marginLeft = (prevDifference + currentDifference) + "px";
                }

            }
        }
    }, 0)
}


