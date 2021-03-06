window.onload = () => {
    setTimeout(() => {
        const images = document.querySelectorAll('.slider .slider-line img');
        const sliderLine = document.querySelector('.slider .slider-line');
        let count = 0;
        let width;

        function init() {
            width = document.querySelector('.slider').offsetWidth;
            // let height = document.querySelector('.slider').offsetHeight/2;
            // document.getElementsByClassName("slider-prev")[0].style.top = height.toString() + "px";
            // console.log(prev)
            sliderLine.style.width = width * images.length + 'px';
            images.forEach(item => {
                item.style.width = width + 'px';
                // item.style.height = 'auto';
            });
            rollSlider();
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
    }, 0)
}


