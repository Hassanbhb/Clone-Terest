const $grid = $('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  percrentPosition: true,
  columnWidth: '.grid-sizer',
  gutter: 20,
  horizontalOrder: true,
  fitWidth: true
});

$grid.imagesLoaded().progress(() => {
  $grid.masonry('layout');
})
