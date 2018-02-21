$(document).ready(function() {

  //add a like
  $('.heart').on('click', function(e){
    e.preventDefault();
    const title = e.target.parentElement.parentElement.offsetParent.childNodes[3].textContent;
    //get owner name
    let owner;
    //this is because html is diffirent between index and cloneBoard pages
    if (!e.target.parentElement.parentElement.offsetParent.childNodes[7]) {
      owner = e.target.parentElement.parentElement.offsetParent.childNodes[5].firstElementChild.textContent;
    }else{
      owner = e.target.parentElement.parentElement.offsetParent.childNodes[7].firstElementChild.textContent;
    }

    $.ajax({
      type: 'PUT',
      contentType: "application/json",
      url: '/cloneBoard',
      data: JSON.stringify({'title': title,
                            'owner': owner
                          }),
      success: data => {

        if(data === 'already voted'){
          alert('you have already voted')
        }else{
          location.reload()
        }
      }
    })
  })
});
