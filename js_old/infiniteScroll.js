const infiniteScroll = {
    curPage: 0, //if curPage == 0 means showing shimmers,
    loading: false,
    currentCategories: null,
    scrollFinished: false,
    initScroll: function () {
        window.addEventListener('scroll', function () {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            console.log(scrollTop + clientHeight, scrollHeight)
            if (scrollTop + clientHeight >= scrollHeight - 500) {
                if (infiniteScroll.curPage > 0 && !infiniteScroll.loading && !infiniteScroll.scrollFinished) {
                    loadDreams(infiniteScroll.currentCategories, infiniteScroll.curPage + 1)
                }
            }
        });
    }
}