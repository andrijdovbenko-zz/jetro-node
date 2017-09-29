$('main .filter span[data-filter]').click(function (event) {
  let attr = $(event.target).attr("data-filter");

  $('main .filter span').removeClass('active');
  $('main .filter span[data-filter="' + attr + '"]').addClass("active");
  $('.works .item').parent().parent().hide();

  if (attr == 'all') {
    $('.works div[data-filter]').parent().parent().fadeIn();
  }
  else {
    $('.works div[data-filter="' + attr + '"]').parent().parent().fadeIn();
  }

});
