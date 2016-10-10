(function(global) {
  'use strict';

  var Service = (function(global) {

    var
    /*Private*/
    _method = {
      posts: 'http://suhkhadev.uphero.com/remo/wp-json/wp/v2/posts?order=desc&categories=1&status=publish&per_page=8',
      crew: 'http://suhkhadev.uphero.com/remo/wp-json/wp/v2/posts?categories=5',
      dayImg: 'http://suhkhadev.uphero.com/remo/wp-json/wp/v2/posts?categories=6'
    },
    // _method = {
    //   posts: '/scripts/json/posts.json',
    //   crew: '/scripts/json/team.json',
    //   dayImg: '/scripts/json/imagen-del-dia.json'
    // },
    _fetch = function () {
      var _getCases = $.getJSON(_method.posts),
          _getCrew = $.getJSON(_method.crew),
          _getDayImg = $.getJSON(_method.dayImg),
          _self = Service;

      $.when(_getCases, _getCrew, _getDayImg).done(function (_casesData, _crewData, _dayImgData) {
        $('.splash').fadeOut(300);

        _self.cases = _casesData[0].map(function (item, index) {
          return {
            logo: item.acf.logo.url,
            media: item.acf.media.map(function (item, index) {
              return {
                url: item.guid
              }
            }),
            problem: item.acf.problem,
            slug: item.slug,
            solution: item.acf.solution,
            video: item.acf.video.map(function (item, index) {
              return {
                url_video: item.url_video
              }
            })
          };
        });

        _self.crew = {
          team: _crewData[0][0].acf.team.map(function (item, index) {
            return {
              name: item.name,
              url: item.url
            }
          })
        }

        _self.dayImg = _dayImgData[0].map(function (item, index) {
          return {
            name: item.acf.image_of_the_day.name,
            url: item.acf.image_of_the_day.url
          }
        });

        /*Init App*/
        App.init();
      });
    },

    /*Public*/
    init = function () {
      _fetch();
    };

    return {
      init: init
    };

  }());

  global.Service = Service;

  Service.init();

}(window));
