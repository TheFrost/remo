(function(global) {
  'use strict';

  var Service = (function(global) {

    var
    /*Private*/
    _method = {
      posts: 'http://iloveremo.com/wp-json/wp/v2/posts?order=desc&categories=1&status=publish&per_page=8',
      crew: 'http://iloveremo.com/wp-json/wp/v2/posts?categories=5',
      dayImg: 'http://iloveremo.com/wp-json/wp/v2/posts?categories=6'
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

        setTimeout(function () {
          $('.o-splash__inner').removeClass('js-show');
          setTimeout(function () {
            $('.o-splash').fadeOut(300);
          }, 1500);
        }, 5000);

        _self.cases = _casesData[0].map(function (item, index) {
          return {
            logo: item.acf.logo.url,
            problem: item.acf.problem,
            slug: item.slug,
            solution: item.acf.solution,
            media: !item.acf.media ? false : item.acf.media.map(function (item, index) {
              return {
                url_media: item.guid
              }
            }),
            video: !item.acf.video ? false : item.acf.video.map(function (item, index) {
              return {
                url_video: item.url_video
              }
            }),
            audio: !item.acf.audio ? false : item.acf.audio.map(function (item, index) {
              return {
                url_audio: item.guid,
                mime_type: item.post_mime_type
              }
            })
          };
        });

        _self.dayImg = _dayImgData[0].map(function (item, index) {
          return {
            name: item.acf.image_of_the_day.name,
            url: item.acf.image_of_the_day.url
          }
        });

        /*Init App*/
        App.start();
      });
    },

    /*Public*/
    init = function () {
      _fetch();
      setTimeout(function () {
        $('.o-splash__inner').addClass('js-show');
      }, 1000);
    };

    return {
      init: init
    };

  }());

  global.Service = Service;

}(window));
