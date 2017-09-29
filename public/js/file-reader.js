let imgPath;
$('input:file').change(function () {
  let myReader = new FileReader();
  myReader.onloadend = () => {
    imgPath = 'data:image/jpg;base64,' + btoa(myReader.result);
  };
  let formId = $(this).parents('form').attr('id');
  myReader.readAsBinaryString(document.forms[formId].elements['img'].files[0]);
});