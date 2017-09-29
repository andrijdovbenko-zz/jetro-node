$(document.forms['comment_form']).on('submit', function () {
  let form = $(this);
  $.ajax({
    url: window.location.pathname,
    method: "POST",
    data: form.serialize(),
    statusCode: {
      200: function () {
        window.location.reload();
      },
      403: function (jqXHR) {
        let error = jqXHR.responseText;
        alert('Error: ' + error);
        form[0].reset();
      }
    }
  });
  return false;
});