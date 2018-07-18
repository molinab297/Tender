(function (window) {
  "use strict";
  var $ = window.jQuery;
  var App = window.App;

  var COMMENT_LIST_SELECTOR = '[test="commentlist"]'; // TODO fix according to html
  var CommentList = App.CommentList;
  var commentList = new CommentList(COMMENT_LIST_SELECTOR);
  //commentList.addRow.call(commentList, data);

  var FRIENDS_LIST_SELECTOR = '[test="friendslist"]'; // TODO fix according to html
  var FriendsList = App.FriendsList;
  var friendsList = new FriendsList(FRIENDS_LIST_SELECTOR);
  //friendsList.addRow.call(friendsList, data);

  var FOOD_LIST_SELECTOR = '[test="foodlist"]'; // TODO fix according to html
  var FoodList = App.FoodList;
  var foodList = new FoodList(FOOD_LIST_SELECTOR);
  //foodList.addRow.call(foodList, data);


  // Redirect user to welcome screen if they aren't already logged in.
  dpd.users.me(function(user) {
    if (user) {
      $("h1").text("Welcome, " + user.username + "!");
    } else {
      location.href = "welcome.html";
    }
  });

  $("#logout-btn").click(function() {
    dpd.users.logout(function(res, err) {
      location.href = "welcome.html";
    });
  });



})(window);
