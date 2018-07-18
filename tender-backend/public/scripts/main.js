(function (window) {
  "use strict";
  var $ = window.jQuery;
  var App = window.App;

  var COMMENT_LIST_SELECTOR = '[test="commentlist"]';
  var CommentList = App.CommentList;
  var commentList = new CommentList(COMMENT_LIST_SELECTOR);


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

  //commentList.addRow.call(commentList, data);

})(window);
