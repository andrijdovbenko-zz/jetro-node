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

function deleteComment(commentId) {
  let postId = window.location.pathname.split('/').reverse()[0];
  let answer = confirm('Are you sure?');
  if (answer) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/admin',
      data: {id: postId, type: 'comment', commentId: commentId},
      statusCode: {
        200: function () {
          alert('Comment is deleted :)');
          window.location.reload();
        }
      }
    });
  }
}