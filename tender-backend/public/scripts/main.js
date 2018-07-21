(function (window) {
  "use strict";

  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var PostCreator = App.PostCreator;
  var postCreator = new PostCreator();

  // var FRIENDS_LIST_SELECTOR = '[test="friendslist"]'; // TODO fix according to html
  // var FriendsList = App.FriendsList;
  // var friendsList = new FriendsList(FRIENDS_LIST_SELECTOR);
  //friendsList.addRow.call(friendsList, data);

  // var FOOD_LIST_SELECTOR = '[test="foodlist"]'; // TODO fix according to html
  // var FoodList = App.FoodList;
  // var foodList = new FoodList(FOOD_LIST_SELECTOR);
  //foodList.addRow.call(foodList, data);

  var createPostFormHandler = new FormHandler("[create-post-form=\"form\"]");
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

  $("#logout").click(function() {
    dpd.users.logout(function(res, err) {
      location.href = "welcome.html";
    });
  });

  // Initialize the posts
  postCreator.intializePosts();


})(window);
