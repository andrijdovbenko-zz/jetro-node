$(document.forms['registration_form']).on('submit', function () {
  let form = $(this);
  $.ajax({
    url: window.location.pathname,
    method: "POST",
    data: form.serialize(),
    statusCode: {
      200: function () {
        alert('You are registered, please log in.');
        window.location.href = '/login';
      },
      400: function (jqXHR) {
        let error = JSON.parse(jqXHR.responseText);
        $('small.error').html('');
        $(`input#${error.field} + small.error`).html('Error: ' + error.text + '. Try again.');
      },
      409: function (jqXHR) {
        let error = JSON.parse(jqXHR.responseText);
        $('small.error').html('');
        $(`input#${error.field} + small.error`).html('Error: ' + error.text + '. Try again.');
      }
    }
  });
  return false;
});