(function (window) {
  "use strict";

  const FOLLOW_USER_SELECTOR = "[follow-user-form=\"form\"]";
  const CREATE_POST_SELECTOR = "[create-post-form=\"form\"]";
  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var PostCreator = App.PostCreator;
  var Validation = App.Validation;
  var postCreator = new PostCreator();

  // var FRIENDS_LIST_SELECTOR = '[test="friendslist"]'; // TODO fix according to html
  // var FriendsList = App.FriendsList;
  // var friendsList = new FriendsList(FRIENDS_LIST_SELECTOR);
  //friendsList.addRow.call(friendsList, data);

  // var FOOD_LIST_SELECTOR = '[test="foodlist"]'; // TODO fix according to html
  // var FoodList = App.FoodList;
  // var foodList = new FoodList(FOOD_LIST_SELECTOR);
  //foodList.addRow.call(foodList, data);

  var followUserFormHandler = new FormHandler(FOLLOW_USER_SELECTOR);
  followUserFormHandler.addInputHandler(Validation.isValidEmail);
  followUserFormHandler.addSubmitHandler(function (data) {
    const emailAddress = data["emailAddress"];
     // See if the email address maps to an already existing account
     dpd.users.get({username: emailAddress}).then(function(user){
         if (user.length !== 0){
             // Get the current user's credentials
             dpd.users.me(function(result, err) {
                 if (!err){
                     // Update the current user's following list
                     dpd.users.put(result.id, {following: {$push: newFriend[0].username}}, function(result, err){
                         if (err){
                             console.log(err);
                         } else {
                             // Refresh the users feed with new pictures from the person they just started following.
                             postCreator.intializePosts();
                         }
                     });
                 } else{
                     console.log(err);
                 }
             });
         } else{
             console.log("Could not find user!");
             var popup = $('#alert-modal');
             popup.find('.alert-modal-title').text("Whoops! Sorry about that.");
             popup.find('.alert-modal-body').text("We couldn't find an account with the email address \"" + emailAddress + "\"");
             popup.modal('show');
         }
     });
  });

  var createPostFormHandler = new FormHandler(CREATE_POST_SELECTOR);
  createPostFormHandler.addSubmitHandler(function (data) {
    postCreator.createPost(data);
  });

  // Setup scrollbar animations
  $(document).ready(function() {
    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    });
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  });

  // Setup logout functionality
  $("#logout").click(function() {
    dpd.users.logout(function(res, err) {
      location.href = "welcome.html";
    });
  });

  // Initialize the posts
  postCreator.intializePosts();


})(window);
