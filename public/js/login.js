$(document.forms['login_form']).on('submit', function () {
  let form = $(this);
  $('.error', form).html('');
  $(':submit', form).button('загрузка');

  $.ajax({
    usl: "/login",
    method: "POST",
    data: form.serialize(),
    statusCode: {
      200: function () {
        form.html('Ви ввійшли на сайт');
        window.location.href = "/";
      },
      403: function (jqXHR) {
        let error = JSON.parse(jqXHR.responseText);
        $(`input#${error.field} + small.error`).html('Error: ' + error.text + '. Try again.');
        form[0].reset();
      }
    }
  });

  return false;
});