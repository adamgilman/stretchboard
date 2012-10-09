(function() {
  var DataLoader, Rank, Schedule, Scores, WeekScores;

  Rank = (function() {
    var ranks;

    ranks = false;

    function Rank() {
      return;
    }

    Rank.prototype.loadRank = function(JSONdata) {
      this.ranks = JSONdata;
    };

    return Rank;

  })();

  Scores = (function() {
    var _scores;

    _scores = false;

    function Scores() {
      this._scores = new Array();
    }

    Scores.prototype.newWeek = function(week, JSONdata) {
      this._scores[week] = new WeekScores(JSONdata);
    };

    Scores.prototype.getWeek = function(week) {
      return this._scores[week];
    };

    return Scores;

  })();

  WeekScores = (function() {

    WeekScores.prototype._data = false;

    function WeekScores(JSONdata) {
      this._data = JSONdata;
      return;
    }

    return WeekScores;

  })();

  Schedule = (function() {
    var _data;

    _data = false;

    function Schedule() {
      return;
    }

    Schedule.prototype.teamByWeek = function(team, week) {
      var _ref;
      if (!(this._data[team] != null)) {
        throw new Error("Schedule: Team [" + team + "] does not exist");
      } else {
        if (!(this._data[team][week] != null) && !(this._data[team][week + 1] != null)) {
          throw new Error("Schedule: Season is over");
        } else {
          return (_ref = this._data[team][week]) != null ? _ref : "bye";
        }
      }
    };

    Schedule.prototype.loadSchedule = function(schedule) {
      this._data = schedule;
    };

    return Schedule;

  })();

  DataLoader = (function() {

    DataLoader.prototype._callback = false;

    DataLoader.prototype._scoreFiles = false;

    DataLoader.prototype._scheduleFile = false;

    DataLoader.prototype._rankFile = false;

    DataLoader.prototype._callbackCounter = 0;

    DataLoader.prototype._callbackTotal = false;

    DataLoader.prototype.allLoaded = function() {
      return this._callback();
    };

    DataLoader.prototype.feedFinished = function() {
      this._callbackCounter = this._callbackCounter + 1;
      if (this._callbackCounter === this._callbackTotal) {
        return this.allLoaded();
      }
    };

    function DataLoader(callback, scores, schedule, rank) {
      var feed, _i, _len, _ref,
        _this = this;
      this.callback = callback;
      this._callback = this.callback;
      this._scoreFiles = ["output/scores/week_10.json", "output/scores/week_11.json", "output/scores/week_12.json", "output/scores/week_13.json", "output/scores/week_14.json", "output/scores/week_15.json", "output/scores/week_1.json", "output/scores/week_2.json", "output/scores/week_3.json", "output/scores/week_4.json", "output/scores/week_5.json", "output/scores/week_6.json", "output/scores/week_7.json", "output/scores/week_8.json", "output/scores/week_9.json"];
      this._scheduleFile = "output/schedule/schedule.json";
      this._rankFile = "output/rank/current.json";
      this._callbackTotal = this._scoreFiles.length + 1 + 1;
      _ref = this._scoreFiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        feed = _ref[_i];
        $.getJSON(feed, {}, function(data) {
          scores.newWeek(data.week, data.data);
          _this.feedFinished();
        });
      }
      $.getJSON(this._scheduleFile, {}, function(data) {
        schedule.loadSchedule(data);
        _this.feedFinished();
      });
      $.getJSON(this._rankFile, {}, function(data) {
        rank.loadRank(data);
        _this.feedFinished();
      });
    }

    return DataLoader;

  })();

  window.Scores = Scores;

  window.DataLoader = DataLoader;

  window.Schedule = Schedule;

  window.Rank = Rank;

}).call(this);
