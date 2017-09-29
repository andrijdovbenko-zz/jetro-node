function deletePortfolioItem(id) {
  let answer = confirm('Are you sure?');
  if (answer) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/admin',
      data: {id: id, type: 'portfolioItem'},
      statusCode: {
        200: function () {
          window.location.reload()
        }
      }
    })
  }
}

let sendPortfolioItemButton = document.getElementById('sendPortfolioItem');
sendPortfolioItemButton.addEventListener('click', function () {

  let now = new Date();
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let date = now.toLocaleString("en-US", options);

  let sendDate = {
    form_id: 'send_portfolio_item_form',
    date: date
  };
  for (let key of document.forms['send_portfolio_item_form'].elements) {
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
      200: function () {
        window.location.reload()
      }
    }
  })

});