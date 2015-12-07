/*jshint laxbreak:true */
(function (window) {
  'use strict';

  /**
   * Sets up defaults for all the Template methods such as a default template
   *
   * @constructor
   */
  function Template() {
    this.defaultTemplate
      = '<a id="{{index}}" href="#" class="list-group-item">'
      +   '<h4 class="list-group-item-heading">{{title}}</h4>'
      +   '<p class="list-group-item-text">{{category}}</p>'
      + '</a>';
  }

  /**
   * Creates an <a> HTML string and returns it for placement in your app.
   *
   * @param {object} data The object containing keys you want to find in the
   *                      template to replace.
   * @returns {string} HTML String of an <a> element
   *
   * @example
   * view.show({
   *  title: "Some title",
   *  pubDate: "Some date",
   *  description: "some description",
   *  category: "Some category",
   *  link: "Some link"
   * });
   */
  Template.prototype.show = function (data) {
    var i, l;
    var view = '';

    for (i = 0, l = data.length; i < l; i++) {
      var template = this.defaultTemplate;

      template = template.replace('{{index}}', i);
      template = template.replace('{{title}}', data[i].title);
      template = template.replace('{{category}}', data[i].category);

      view = view + template;
    }

    return view;
  };

  // Export to window
  window.app = window.app || {};
  window.app.Template = Template;
})(window);