$(document.forms['contact-form']).on('submit', sendMessage);

function sendMessage() {
  let form = $(this);
  $.ajax({
    usl: '/contact',
    method: 'POST',
    data: form.serialize(),
    statusCode: {
      200: function() {
        form[0].reset();
        alert('Повідомлення відправлено :)');
      },
      500: function(jqXHR) {
        let error = jqXHR.responseText;
        alert(`Сталась помилка: ${error}`);
      }
    }
  });
  return false;
}

function deleteMessage(id) {
  let answer = confirm('Are you sure?');
  if (answer) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/admin',
      data: {id: id, type: 'message'},
      statusCode: {
        200: function() {
          alert('Message is deleted :)');
          window.location.href = '/admin/messages';
        }
      }
    });
  }
}

function readMore(id) {
  window.location.href = '/admin/messages/' + id;
}
