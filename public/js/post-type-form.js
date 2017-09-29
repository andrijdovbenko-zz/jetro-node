let formContent = document.getElementById('form_content');
let linkPostElement = document.createElement('div');
linkPostElement.innerHTML = `
  <input type="text" placeholder="Header" name="header" id="header">
  <input type="text" placeholder="Link" name="link">
  <textarea name="text"></textarea>
`;
let videoPostElement = document.createElement('div');
videoPostElement.innerHTML = `
  <input type="text" placeholder="Header" name="header" id="header">
  <input type="url" placeholder="Url" name="videoSrc">
  <div>
    <p>Choose tags:</p>
    <div>
      <input type="checkbox" id="website" name="tags" value="website">
      <label for="website">Website</label>
    </div>
    <div>
      <input type="checkbox" id="design" name="tags" value="design">
      <label for="design">Design</label>
    </div>
  </div>
  <textarea name="text"></textarea>
`;
let quotePostElement = document.createElement('div');
quotePostElement.innerHTML = `
  <input type="text" placeholder="Header" name="header">
  <textarea name="text"></textarea>
`;
let imagePostElement = document.createElement('div');
imagePostElement.innerHTML = `
  <input type="text" placeholder="Header" name="header" id="header">
  <input type="file" name="img">
  <div>
  <p>Choose tags:</p>
    <div>
      <input type="checkbox" id="website" name="tags" value="website">
      <label for="website">Website</label>
    </div>
    <div>
      <input type="checkbox" id="design" name="tags" value="design">
      <label for="design">Design</label>
    </div>
  </div>
  <textarea name="text"></textarea>
`;
let galleryPostElement = document.createElement('div');
galleryPostElement.innerHTML = `
  <input type="text" placeholder="Header" name="header" id="header">
  <input type="file" name="gallery">
  <div>
    <p>Choose tags:</p>
    <div>
      <input type="checkbox" id="website" name="tags" value="website">
      <label for="website">Website</label>
    </div>
    <div>
      <input type="checkbox" id="design" name="tags" value="design">
      <label for="design">Design</label>
    </div>
  </div>
  <textarea name="text"></textarea>
`;
let postTypeElement = document.getElementById('post_type');
postTypeElement.addEventListener('change', function () {
  let postType = postTypeElement.value;
  console.log(postType);
  if (postType === 'link') {
    formContent.innerHTML = '';
    formContent.prepend(linkPostElement);
  } else if (postType === 'video') {
    formContent.innerHTML = '';
    formContent.prepend(videoPostElement);
  } else if (postType === 'quote') {
    formContent.innerHTML = '';
    formContent.prepend(quotePostElement);
  } else if (postType === 'image') {
    formContent.innerHTML = '';
    formContent.prepend(imagePostElement);
  } else if (postType === 'gallery') {
    formContent.innerHTML = '';
    formContent.prepend(imagePostElement);
  }
});
