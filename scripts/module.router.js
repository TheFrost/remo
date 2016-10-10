(function(global) {
  'use strict';

  var Router = (function() {

    var
    /*Private*/
    _mapRoute = function () {
      Path.map("/#/home").to(function(){
        alert("Hello, World!");
      });
    },

    /*Public*/
    init = function () {
      _mapRoute();
    };

    return {
      init : init
    }

  }());

  global.Router = Router;

}(window));
