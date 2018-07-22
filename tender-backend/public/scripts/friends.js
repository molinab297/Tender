(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FriendsList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FriendsList.prototype.createFriend = function(name, profilePicture) {
    console.log("Adding Following");
    addRow(name, profilePicture);
  };

  function addRow(friend, profilePicture) {
    // Create a new instance of a row, using the coffee order info
    var rowElement = Row(friend, profilePicture);

    // Add the new row instance's $element property to the checklist
    // TODO we cant just do this.$element.appendChild here for some reason??
    document.getElementById("friendList").appendChild(rowElement);
  }

  function Row(friendName, profilePicture) {

    var li = document.createElement("LI");
    li.className="friendList";

    var para = document.createElement("P");
    para.className="friendList friendName";

    var img = document.createElement("IMG");
    img.className="friendList friendImg";
    img.src=profilePicture; // TODO we need to add user image here

    var name = document.createTextNode(friendName);
    para.appendChild(name);

    li.appendChild(img);
    li.appendChild(para);
    console.log(li);

    return li;
  }

  FriendsList.prototype.initializeFriends = function(friendsList) {

    //view every array pair
    friendsList.forEach(function(friend) {
      addRow(friend.displayName, friend.profilePicture);
    });
  }

  App.FriendsList = FriendsList;
  window.App = App;
})(window);
