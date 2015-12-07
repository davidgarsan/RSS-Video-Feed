/*global app, $on */
(function () {
  'use strict';

  var proxy = 'https://corsfeeder.herokuapp.com';
  var feed = 'http://rss.cnn.com/services/podcasting/ac360/rss.xml';
  var url = proxy + '?feed=' + feed + '&callback=parse';
  var defaultSelected = 0;

  /**
   * Sets up new video feed.
   *
   * @param {string} name URL of the feed.
   */
  function VideoFeed(url) {
    this.url = url;
    this.template = new app.Template();
    this.view = new app.View(this.template);
  }

  VideoFeed.prototype.load = function() {
    $.ajax({
      type: 'GET',
      url: 'https://corsfeeder.herokuapp.com?feed=' + feed + '&callback=parse',
      dataType: 'xml',
      success: processData
    });
  };

  var feedApp = new VideoFeed(url);

  function processData(xml) {
    var slice = Function.call.bind(Array.prototype.slice);
    var channelNode = xml.getElementsByTagName('channel')[0];
    var title = channelNode.getElementsByTagName('title')[0].textContent;
    var description = channelNode.getElementsByTagName('description')[0].textContent;

    var items = slice(xml.getElementsByTagName('item')).reduce(function(items, node) {

      items.push(['title', 'link', 'description', 'pubDate', 'category'].reduce(function(item, tag) {
        item[tag] = node.getElementsByTagName(tag)[0].textContent;
        return item;
      }, {}));

      return items;
    }, []);

    //console.log(items);
    feedApp.view.render(title, description, items, defaultSelected);
  }

  $on(window, 'load', feedApp.load);
})();
