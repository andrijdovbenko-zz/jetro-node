$(document.forms['registration_form']).on('submit', function () {
  let form = $(this);
  console.log(form);
  $.ajax({
    url: window.location.pathname,
    method: "POST",
    data: form.serialize(),
    statusCode: {
      200: function () {
        alert('You are registered, please log in.');
        window.location.href = '/login'
      },
      400: function (jqXHR) {
        let error = jqXHR.responseText;
        alert('Error: ' + error + '. Some problems with password');
        form[0].reset();
      },
      409: function () {
        alert('User with such a login is already registered');
        form[0].reset();
        window.location.reload();
      }
    }
  });
  return false;
});