$(document).ready(function() {

  // contact form animations
  $('.add').click(function() {
    $('.addForm').fadeToggle();
  })
  $(document).mouseup(function (e) {
    var container = $(".addForm");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.fadeOut();
    }
  });

  //display the image when the url is copied to the form

  $('input[name="url"]').change(function(){
    const $img = $('.imgArea img');
    $img.attr('src', $(this).val());
    //if the image is broken replace with a placeholder img
    $img.bind('error', function(e){
      $img.attr('src', 'http://www.clker.com/cliparts/J/h/C/1/o/C/broken-file-icon-hi.png');
    })
  });

  //send form info to server when submit button is clicked
  $('form').on('submit', (e) => {
    e.preventDefault();

    const $title = $('input[name="title"]');
    const $url = $('input[name="url"]');
    //check if it's a valid url
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    let img = {};
    //check if the image url is valid
    if(!pattern.test($url.val())){
      //if not alert to notify user
      console.log('no url');
      alert('Please enter a valid url');
    }else{
      //if it's valid add it to img and send to server
      img = {
        title: $title.val(),
        url: $url.val()
      };

      //send post request to server
      $.ajax({
        type: 'POST',
        url: '/cloneBoard',
        data: img,
        success: data => location.reload()
      });

      return false;
    }
  });

  //delete img
  $('.delete-btn').on('click', (e) => {
    e.preventDefault();
    //get the images title
    const title = e.target.offsetParent.childNodes[3].textContent;
    $.ajax({
      type: 'DELETE',
      url: '/cloneBoard/'+ title,
      success: data => location.reload()
    });
  });
});
