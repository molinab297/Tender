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

    dpd.users.me(function(me, err) {
      if (!err){
        if (me.following == null ) {
          var followList = [me.username];
        }
        else {
          var followList = me.following;
          followList.push(me.username);
        }
        $.get("http://localhost:2403/pictures", function(result) {
          for (var i = 0; i < result.length; i++) {
            if (followList.includes(result[i].email)) {
              fillOutPost(result[i]);
            }
          }
        });
      } else{
        console.log(err);
      }
    });
  }
  
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
            fillOutPost(result);
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
  function fillOutPost(post) {
    preparePostHtml(post.file, post.message, post.id);

    // attach the form handler for comments
    var commentList = new CommentList( document.getElementById(post.id).getElementsByClassName('commentList') );
    var commentFormHandler = new FormHandler( document.getElementById(post.id).getElementsByClassName('form-inline') );
    commentFormHandler.addSubmitHandler(function(data) {
      const commentText = data.commentText;

      // get current date
      var d = new Date();
      var option1 = { year: 'numeric', month: 'long', day: 'numeric' };
      var option2 = { hour: 'numeric', minute: 'numeric'};
      var timeLog = d.toLocaleDateString("en-US", option1) + " at " + d.toLocaleTimeString("en-US",option2);

      // add profile pic to comment

      commentList.addRow.call(commentList, commentText, timeLog);
      submitComment(post.id, data.commentText, timeLog)
    });
    if (post.comments !== undefined) {
      commentList.initializeComments(commentList, post.comments);
    }
  }

  function submitComment(id,text, timeLog)
  {
    dpd.users.me(function(user) { //used to get user's name
      dpd.pictures.get(id, function(result, error) {
        console.log(result.comments);
      });

      dpd.pictures.post(id, {"comments": {$push: [ user.username, text, timeLog]}}, function(result) {
        console.log(result);
      });
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
            '<input class="form-control" name="commentText" type="text" placeholder="Your comments" />' +
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
