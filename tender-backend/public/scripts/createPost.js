function convertToBase64(callback) {
  console.log("Trying to save picture to database");

  var $ = window.jQuery;
  var image = document.querySelector("input[type=file]").files[0];
  // text for the photo posted
  var text = document.getElementById('foodMessage').value;
  console.log(text);
  var reader = new FileReader();
  console.log(image);
  if (image) {
    reader.readAsDataURL(image);
    reader.onload = function() {
      $.post('http://localhost:2403/pictures', {
        'file': reader.result, 'message': text
      }, function(result) {
        $.get("http://localhost:2403/pictures", function(result) {
          console.log(result);
          fillOutPost(result[result.length-1].file,result[result.length-1].message);
          // $("#my_image").attr("src", result[result.length-1].file);
          // $("#my_description").text(result[result.length-1].message);
        });
      });
    };
    // close the modal box on submitted
    $("#myModal").modal("hide");
    $("#submitError").hide();

    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }
  else{
    $("#submitError").show();
  }
}

function intialPosts()
{
  $.get("http://localhost:2403/pictures", function(result) {
    var i;
    for(i = result.length-1; i >= 0; i--)
    {
      fillOutPost(result[i].file,result[i].message);
    }
  });
}

function fillOutPost(imgSrc, message)
{
  var $ = window.jQuery;

  $("#content > div:nth-child(2)").after(
  '<div class="detailBox">' +
    '<div class="titleBox">' +
      '<label>Posted At Some Time by Location</label>' +
      '<button type="button" class="close" aria-hidden="true">&times;</button>' +
    '</div>' +
    '<div class="commentBox">' +
      '<img src="'+ imgSrc + '" id="my_image" alt="">' +
    '</div>' +
    '<div class="commentBox">' +
      '<p id="my_description" class="taskDescription">' + message + '</p>' +
    '</div>' +
    '<div class="actionBox">' +
      '<ul comment-list="list" id="commentList" class="commentList">' +
        '<li>' +
          '<div class="commenterImage">' +
            '<img src="http://placekitten.com/50/50" />' +
          '</div>' +
          '<div class="commentText">' +
            '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>' +
          '</div>' +
        '</li>' +
        '<li>' +
          '<div class="commenterImage">' +
            '<img src="http://placekitten.com/45/45" />' +
          '</div>' +
          '<div class="commentText">' +
            '<p class="">Hello this is a test comment and this comment is particularly very long and it goes on and on and on.</p> <span class="date sub-text">on March 5th, 2014</span>' +
          '</div>' +
        '</li>' +
        '<li>' +
          '<div class="commenterImage">' +
            '<img src="http://placekitten.com/40/40" />' +
          '</div>' +
          '<div class="commentText">' +
            '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>' +
          '</div>' +
        '</li>' +
      '</ul>' +
      '<form comment-form="form" id="comment-form" class="form-inline" role="form">' +
        '<div class="form-group">' +
          '<input class="form-control" type="text" placeholder="Your comments" />' +
        '</div>' +
        '<div class="form-group">' +
          '<button class="btn btn-default">Add</button>' +
        '</div>' +
      '</form>' +
    '</div>' +
  '</div>' +
  '<div class="line"></div>');
}

function createPost(callback)
{
  console.log("Creating a Post");
  // Used if picture has been uploaded by user
  convertToBase64();
  //fillOutPost();
}

intialPosts();
