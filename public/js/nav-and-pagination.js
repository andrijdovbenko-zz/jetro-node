/*navigation on small device*/
$('#navigation').click(function() {
  $('header nav').slideToggle('fast');
});

let path = window.location.pathname;
let queryParam = window.location.search;

/*active page css styling*/
function addActiveClassToNav(path) {
  let navPath;
  let slashPosition = path.indexOf('/', 1);
  if (slashPosition > 0) {
    navPath = path.slice(0, slashPosition);
  } else {
    navPath = path;
  }
  $(`header a[href="${navPath}"]`).addClass('active');
}

addActiveClassToNav(path);

/*active pagination page css styling*/
$(`.pages a[href="${path}${queryParam}"]`).find('span').addClass('active');
