(function (window) {
  "use strict";

  const FRIENDS_FORM_SELECTOR = "[follow-user-form=\"form\"]";
  const CREATE_POST_SELECTOR = "[create-post-form=\"form\"]";
  const FRIENDS_LIST_SELECTOR = "[data-friends-list=\"list\"]";
  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var PostCreator = App.PostCreator;
  var FriendsList = App.FriendsList;
  var Validation = App.Validation;

  var postCreator = new PostCreator();

  var friendsList = new FriendsList(FRIENDS_LIST_SELECTOR);
  var createPostFormHandler = new FormHandler(CREATE_POST_SELECTOR);
  var followUserFormHandler = new FormHandler(FRIENDS_FORM_SELECTOR);


  /*
   * Adds all of the business logic for the "Find a Friend" form.
   */
  followUserFormHandler.addInputHandler(Validation.isValidEmail);
  followUserFormHandler.addSubmitHandler(function (data) {
      const emailAddress = data["emailAddress"];
      // See if the email address maps to an already existing account
      dpd.users.get({username: emailAddress}).then(function(result){
          if (result.length !== 0){
              var newFriend = result[0];
              // Get the current user's credentials
              dpd.users.me(function(me, err) {
                  if (!err){
                      // Check to see if the current user is already following this user.
                      if ((typeof me.following === "undefined" || !me.following)
                          || !me.following.includes(emailAddress)){
                          // Update the current user's following list
                          dpd.users.put(me.id, {following: {$push: newFriend.username}}, function(result, err){
                              if (err){
                                  console.log(err);
                              } else {
                                  console.log("Successfully added user" + emailAddress);
                                  friendsList.createFriend(newFriend.displayName, newFriend.profilePicture);
                              }
                          });
                      } else{
                          const popup = $('#alert-modal');
                          popup.find('.alert-modal-title').text("Whoops! Sorry about that.");
                          popup.find('.alert-modal-body').text("You're already following \"" + emailAddress + "\"");
                          popup.modal('show');
                      }
                  } else{
                      console.log(err);
                  }
              });
          } else{
              const popup = $('#alert-modal');
              popup.find('.alert-modal-title').text("Whoops! Sorry about that.");
              popup.find('.alert-modal-body').text("We couldn't find an account with the email address \"" + emailAddress + "\"");
              popup.modal('show');
          }
      });
  });

  /*
   * Adds all of the business logic for the "Create New Post" button.
   */
  createPostFormHandler.addSubmitHandler(function (data) {
    postCreator.createPost(data);
  });

 /*
  * Setup scrollbar animations for the "Friends" button. Also load user's profile picture
  * at the top of the friends list.
  */
  $(document).ready(function() {
    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    });
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
      dpd.users.me(function(user){
          $("#welcome-msg").text("Welcome, " + user.displayName + "!");
          $("#welcome-user-pic").attr("src", user.profilePicture);
      });
  });

 /*
  * Setup logout functionality.
  */
  $("#logout").click(function() {
    dpd.users.logout(function(res, err) {
      location.href = "welcome.html";
    });
  });

  // Initialize friends
  dpd.users.me(function(me, err) {
    if (!err){
      for (var i = 0; i < me.following.length; i++) {
        dpd.users.get({username: me.following[i]}, function(result){
          friendsList.initializeFriends(result[0].displayName, result[0].profilePicture);
        });
      }
    } else{
      console.log(err);
    }
  });

  // Initialize the posts
  postCreator.intializePosts();

})(window);
