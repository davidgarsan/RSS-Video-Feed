/*global qs, toggleClass, preventDefault, $on, $parent, $delegate */

(function (window) {
  'use strict';

  /**
   * View that abstracts away the browser's DOM completely.
   * It has one simple entry point:
   *
   *   - render(command, parameterObject)
   *     Renders the given command with the options
   */
  function View(template) {
    this.template = template;
    this.data = null;

    this.ENTER_KEY = 13;
    this.SPACE_KEY = 32;
    this.UP_KEY = 38;
    this.DOWN_KEY = 40;
    this.selected = -1;

    this.$title = qs('.title');
    this.$description = qs('.description');
    this.$list = qs('.feeds .list-group');
    this.$up = qs('.feeds button.up');
    this.$down = qs('.feeds button.down');
    this.$player = qs('.player video');
    this.$caption = qs('.caption');
  }

  View.prototype.render = function (title, description, data, selected) {
    this.data = data;
    this.$title.innerHTML = title;
    this.$description.innerHTML = description;
    this.$list.innerHTML = this.template.show(data, selected);
    toggleClass(this.$list, 'ready');
    this._startPlayer(selected);
    this._bind();
  };

  View.prototype._startPlayer = function (selected) {
    this._select(selected);
    this.$player.src = this.data[selected].link;
    this.$caption.innerHTML = this.data[selected].description;
  };

  View.prototype._select = function (index) {
    if (this.selected != -1) {
      toggleClass(qs('.active', this.$list), 'active');
    }
    this.selected = index;
    toggleClass(this.$list.childNodes[index], 'active');
  };

  View.prototype._goUp = function () {
    if (this.selected > 0) {
      //console.log('up');
      this._select(this.selected - 1);
      this.$list.childNodes[this.selected].focus();
    }
  };

  View.prototype._goDown = function () {
    if (this.selected < this.data.length-1) {
      //console.log('down');
      this._select(this.selected + 1);
      this.$list.childNodes[this.selected].focus();
    }
  };

  View.prototype._bind = function () {
    var self = this;

    $on(this.$up, 'mousedown', function () {
      self._goUp();
    });

    $on(this.$down, 'mousedown', function () {
      self._goDown();
    });

    $delegate(this.$list, 'a, h4, p', 'mousedown', function () {
      var element = $parent(this, 'a');
      //console.log(element.id);
      self._startPlayer(parseInt(element.id, 10));
    });

    $on(document, 'keydown', function (event) {
      //console.log(event.keyCode);
      if (event.keyCode === self.ENTER_KEY) {
        self._startPlayer(self.selected);
        //console.log('play');
      }
      else if (event.keyCode === self.UP_KEY) {
        self._goUp();
        preventDefault();
      }
      else if (event.keyCode === self.DOWN_KEY) {
        self._goDown();
        preventDefault();
      }
      else if (event.keyCode === self.SPACE_KEY) {
        self.$player.paused ? self.$player.play() : self.$player.pause();
        preventDefault();
      }
    });

    window.onwheel = preventDefault;

  };

  // Export to window
  window.app = window.app || {};
  window.app.View = View;
}(window));