(function() {
  var DataLoader, doneLoad, loader;

  DataLoader = (function() {

    DataLoader.prototype._callback = false;

    DataLoader.prototype._scoreFiles = false;

    DataLoader.prototype._scheduleFile = false;

    DataLoader.prototype._callbackCounter = 0;

    DataLoader.prototype._callbackTotal = false;

    DataLoader.prototype.allLoaded = function() {
      return console.log("DataLoader: All feeds loaded");
    };

    DataLoader.prototype.feedFinished = function() {
      this._callbackCounter = this._callbackCounter + 1;
      console.log(this._callbackCounter + " | " + this._callbackTotal);
      if (this._callbackCounter === this._callbackTotal) {
        return this.allLoaded();
      }
    };

    function DataLoader(callback) {
      var feed, _i, _len, _ref,
        _this = this;
      this.callback = callback;
      this._callback = this.callback;
      this._scoreFiles = ["output/scores/week_10.json", "output/scores/week_11.json", "output/scores/week_12.json", "output/scores/week_13.json", "output/scores/week_14.json", "output/scores/week_15.json", "output/scores/week_1.json", "output/scores/week_2.json", "output/scores/week_3.json", "output/scores/week_4.json", "output/scores/week_5.json", "output/scores/week_6.json", "output/scores/week_7.json", "output/scores/week_8.json", "output/scores/week_9.json"];
      this._scheduleFile = "output/schedule/schedule.json";
      this._callbackTotal = this._scoreFiles.length + 1;
      _ref = this._scoreFiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        feed = _ref[_i];
        $.getJSON(feed, {}, function(data) {
          console.log(data.week);
          _this.feedFinished();
        });
      }
      $.getJSON(this._scheduleFile, {}, function(data) {
        console.log("schedule");
        _this.feedFinished();
      });
    }

    return DataLoader;

  })();

  doneLoad = function() {
    return console.log("DataLoader: callback fired");
  };

  loader = new DataLoader(doneLoad);

}).call(this);
