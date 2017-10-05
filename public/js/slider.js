$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  });

  $('.owl-prev').html('<img src="/img/slider-arrow/prev.png" alt="prev">');
  $('.owl-next').html('<img src="/img/slider-arrow/next.png" alt="next">');

});
