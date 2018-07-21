(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  var FormHandler = App.FormHandler;
  var CommentList = App.CommentList;

  // Constructor
  function PostCreator() {}


  PostCreator.prototype.createPost = function(data) {
    console.log("Creating a Post");

    var image = document.getElementById('foodPicture').files[0];
    var text = document.getElementById('foodMessage').value;

    // TODO grab text and image from the form data parameter instead of getElementById
    //var image = data.pic;
    //var text = data.description;

    // Used if picture has been uploaded by user
    convertToBase64(image, function(convertedImage) {
      submitPost(convertedImage, text);
    });
  };


  PostCreator.prototype.intializePosts = function() {
    console.log("Initializing posts");
    $.get("http://localhost:2403/pictures", function(result) {
      var i;
      for (i = 0; i <= result.length - 1; i++) {

        // TODO get the database Id for the post object and use it to fillOutPost
        var databaseId = -1

        fillOutPost(result[i].file, result[i].message, databaseId);
      }
    });
  };

  function submitPost(convertedImage, text) {

    // post to the front end
    var postObjectId = -1; // TODO give fillOutPost the Key ID for the post object we just created
    fillOutPost(convertedImage, text, postObjectId);

    // post to the backend
    $.post('http://localhost:2403/pictures', {
      'file': convertedImage, 'message': text
    }, function(result) {
      console.log(result);
    });
  }

  function convertToBase64(image, callback) {

    var reader = new FileReader();

    // text for the photo posted
    console.log(image);
    if (image) {
      reader.readAsDataURL(image);
      reader.onload = function() {
        callback(reader.result);
      };
      // close the modal box on submitted
      $("#myModal").modal("hide");
      $("#submitError").hide();

      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    } else {
      $("#submitError").show();
    }
  }

  function fillOutPost(imgSrc, message, databaseId) {
    preparePostHtml(imgSrc, message, databaseId);

    // attach the form handler for comments
    // TODO use the databaseId as the selector for these
    // to attach to the unique comment box object
    var commentList = new CommentList("[comment-list=\"list\"]"); // TODO change selector
    var commentFormHandler = new FormHandler("[comment-form=\"form\"]"); // TODO change selector
    commentFormHandler.addSubmitHandler(function(data) {
      commentList.addRow.call(commentList, data)
    });
  }

  function preparePostHtml(imgSrc, message, databaseId) {
    // TODO give this comment box div a unique ID corresponding to the database key for the post object

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

  App.PostCreator = PostCreator;
  window.App = App;
})(window);
