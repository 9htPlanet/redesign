// Кнопка наверх
$(window).scroll(function () {
    if ($(this).scrollTop() != 0)
        $('#toTop').fadeIn();
    else
        $('#toTop').fadeOut();

});
$('#toTop').click(function () {
    $('body, html').animate({scrollTop: 0}, 1000);
});


$(document).ready(function () {
    $('a[href^="#"]').click(function () {
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $('html').animate({scrollTop: destination}, 1100);
        return false;
    });
});
