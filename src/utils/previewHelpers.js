export const setHeight = () => {
  const $postPreviews = $('.post-preview-top');
  const previewHeight = $postPreviews.eq(0).width() * 0.5625;
  $postPreviews.css('height', previewHeight);
};

export const clipImage = (img) => {
  const $img = $(img);
  const $postPreview = $('.post-preview-top').eq(0);
  const width = $postPreview.width();
  const height = $postPreview.height();
  let offset = 0;
  if (height > $img.height()) {
    $img.css('width', 'initial').css('height', '100%');
    offset = ($img.width() - width) / 2;
    $img.css('left', `${-offset}px`);
  }
  $img.css('clip', `rect(0px ${width + offset}px ${height}px ${offset}px)`)
  .css('visibility', 'visible');
};

export const reclipImages = () => {
  setHeight();
  const $images = $('.post-preview-top img');
  $images.css('visibility', 'hidden').css('width', '100%')
  .css('clip', 'auto').css('height', 'initial');
  $images.each(idx => {
    clipImage($images.eq(idx));
  });
};
