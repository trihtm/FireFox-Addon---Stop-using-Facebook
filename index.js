var self = require('sdk/self');
var tabs = require("sdk/tabs");

var SimpleAddon = (function() {
  var Addon = {};

  Addon.start = function () {
    tabs.on('ready', function () {
      if (Addon.User.isAccessFacebook()) {
        if (User.shouldRemoveFacebook()) {
          Addon.removeFacebook();
        } else {
          console.log('It\'s time to checking your Facebook. Enjoy!');
        }
      }
    });
  };

  Addon.debug = function () {
    // Some debug here
  };

  Addon.removeFacebook = function () {
    console.log('I have removed Facebook content. Please focus your work.');

    var contentScriptString = 'document.body.innerHTML = "<h1>You cannot access Facebook from 9AM to 5PM</h1>";'

    tabs.activeTab.attach({
      contentScript: contentScriptString
    });
  };

  var User = {};

  User.shouldRemoveFacebook = function () {
    var date = new Date;

    var currentHour = date.getHours();

    var fromHour = 9;
    var endHour = 17;

    return currentHour >= fromHour && currentHour < endHour;
  };

  User.isAccessFacebook = function () {
    var activeUrl = tabs.activeTab.url;

    var regex = /facebook\.com/i;

    if (regex.test(activeUrl)) {
      console.log('You are accessing to Facebook.');

      return true;
    }

    console.log('You are not accessing to Facebook.');

    return false;
  };

  Addon.User = User;

  return Addon;
} () );

SimpleAddon.start();
SimpleAddon.debug();