let sendPostButton = document.getElementById('sendPost');
sendPostButton.addEventListener('click', function () {
  let now = new Date();

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let date = now.toLocaleString("en-US", options);
  let sendDate = {
    tags: [],
    form_id: 'send_post_form',
    comments: [],
    date: date
  };
  for (let key of document.forms['send_post_form'].elements) {
    console.log(key.name, key.value);
    if (key.name === 'tags') {
      if (key.checked) {
        sendDate.tags.push(key.value);
      }
    } else if (key.name === 'img') {
      sendDate.img = imgPath;
    } else {
      sendDate[key.name] = key.value;
    }
  }

  $.ajax({
    type: 'POST',
    url: '/admin',
    data: {data: JSON.stringify(sendDate)},
    statusCode: {
      200: function () {
        window.location.reload();
      }
    }
  });
});

function deletePost(id) {
  let answer = confirm('Are you sure?');
  if (answer) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/admin',
      data: {id: id, type: 'post'},
      statusCode: {
        200: function () {
          window.location.reload();
        }
      }
    });
  }
}

function readMore(id) {
  window.location.href = "/admin/blog/" + id;
}