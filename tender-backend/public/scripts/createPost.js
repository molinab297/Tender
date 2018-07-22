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

    //var image = data.pic; // TODO cant grab from form? so we use selector
    var image = document.getElementById('foodPicture').files[0];
    var text = data.description;

    // Used if picture has been uploaded by user
    convertToBase64(image, function(convertedImage) {
      submitPost(convertedImage, text);
    });
  };


  // Get all of the pictures of the database and load them onto the home page.
  PostCreator.prototype.intializePosts = function() {
    console.log("Initializing posts");
    // TODO: filter by followers via backend
    $.get("http://localhost:2403/pictures", function(result) {
        result.forEach(function(post){
            fillOutPost(post.file, post.message, post.id);
            initializeComments(post.comments, post.id);
        });
    });
  };

  /*
   * Submits an image and its message to the database, and then updates the
   * front end accordingly.
   *
   * @param convertedImage The Base64 string representation of the image.
   * @param msg The image description.
   */
  function submitPost(convertedImage, msg) {
      console.log("Submitting post");
      // post to the backend
      dpd.users.me(function(user) { //used to get user's name
        $.post('http://localhost:2403/pictures', {
          'file': convertedImage,
          'message': msg,
          'email': user.username
        }, function(result) {
            // post to the front end
            fillOutPost(result.file, result.message, result.id);
            console.log(result);
        });
      });
  }

  /*
   * Converts an image to a Base64 string. This is required in order
   * to upload the image to the database.
   *
   * @param image The image to convert.
   * @param callback The callback function to apply to the converted image.
   */
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

  /*
   * Posts an image to the front end.
   *
   * @param imgSrc The Base64 string representation of the image.
   * @param message The image message.
   * @param databaseId The UUID of the image.
   */
  function fillOutPost(imgSrc, message, databaseId) {
    preparePostHtml(imgSrc, message, databaseId);

    // attach the form handler for comments
    var commentList = new CommentList( document.getElementById(databaseId).getElementsByClassName('commentList') );
    var commentFormHandler = new FormHandler( document.getElementById(databaseId).getElementsByClassName('form-inline') );
    commentFormHandler.addSubmitHandler(function(data) {
      commentList.addRow.call(commentList);
    });

  }

  function preparePostHtml(imgSrc, message, databaseId) {

    $("#content > div:nth-child(2)").after(
    '<div class="detailBox" id=' + databaseId + ' >' +
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
        '</ul>' +
        '<form comment-form="'+ databaseId +'" id="comment-form" class="form-inline" role="form">' +
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
