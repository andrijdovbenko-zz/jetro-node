let sendPortfolioItemButton = document.getElementById('sendPortfolioItem');
sendPortfolioItemButton.addEventListener('click', sendPortfolioItem);

function sendPortfolioItem() {
  let now = new Date();
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let date = now.toLocaleString('en-US', options);
  let sendDate = {
    formId: 'send-portfolio-item-form',
    date: date
  };
  for (let key of document.forms['send-portfolio-item-form'].elements) {
    if (key.name === 'img') {
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
      200: function() {
        window.location.reload();
      }
    }
  });
}

function deletePortfolioItem(id) {
  let answer = confirm('Are you sure?');
  if (answer) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/admin',
      data: {id: id, type: 'portfolioItem'},
      statusCode: {
        200: function() {
          window.location.reload();
        }
      }
    });
  }
}
