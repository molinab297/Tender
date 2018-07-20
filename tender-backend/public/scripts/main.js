(function (window) {
  "use strict";

  var COMMENT_FORM_SELECTOR = "[comment-form=\"form\"]";
  var COMMENT_LIST_SELECTOR = "[comment-list=\"list\"]";

  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var CommentList = App.CommentList;

  var commentList = new CommentList(COMMENT_LIST_SELECTOR);
  var commentFormHandler = new FormHandler(COMMENT_FORM_SELECTOR);

  commentFormHandler.addSubmitHandler(function(data) {
    commentList.addRow.call(commentList, data)
  });

  // var FRIENDS_LIST_SELECTOR = '[test="friendslist"]'; // TODO fix according to html
  // var FriendsList = App.FriendsList;
  // var friendsList = new FriendsList(FRIENDS_LIST_SELECTOR);
  //friendsList.addRow.call(friendsList, data);

  // var FOOD_LIST_SELECTOR = '[test="foodlist"]'; // TODO fix according to html
  // var FoodList = App.FoodList;
  // var foodList = new FoodList(FOOD_LIST_SELECTOR);
  //foodList.addRow.call(foodList, data);

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



})(window);
