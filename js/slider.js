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


