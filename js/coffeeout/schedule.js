(function() {
  var BuildSchedule, Game, Team;

  Team = (function() {

    Team.prototype.rank = false;

    Team.prototype.name = false;

    Team.prototype.score = false;

    Team.prototype.winner = false;

    Team.prototype.loser = false;

    Team.prototype.upset = false;

    Team.prototype.uprank = false;

    Team.prototype.downrank = false;

    function Team(name, rank, score) {
      this.name = name;
      this.rank = rank;
      this.score = score;
    }

    Team.prototype.setUpset = function() {
      return this.upset = true;
    };

    Team.prototype.render = function() {
      return {
        name: this.name.replace(";", ""),
        rank: this.rank,
        score: this.score,
        winner: this.winner,
        loser: this.loser,
        upset: this.upset,
        uprank: this.uprank,
        downrank: this.downrank
      };
    };

    return Team;

  })();

  Game = (function() {

    Game.prototype.week = false;

    Game.prototype.home_team = false;

    Game.prototype.away_team = false;

    Game.prototype.upset = false;

    Game.prototype.winner = false;

    Game.prototype.loser = false;

    Game.prototype.played = false;

    Game.prototype._isUpset = function() {
      if (this.played) {
        if ((this.winner.rank === null) && !(this.loser.rank === null)) {
          return true;
        }
        if (!(this.loser.rank === null)) {
          if (this.winner.rank > this.loser.rank) {
            return true;
          }
        }
      }
      return false;
    };

    Game.prototype._isPlayed = function() {
      if (!this.home_team.score) {
        return false;
      }
      return !schedule.checkByeOrOver(this.home_team.name, this.week);
    };

    function Game(home_team, away_team, week) {
      this.week = week;
      this.home_team = home_team;
      this.away_team = away_team;
      this.home_team.winner = false;
      this.away_team.winner = false;
      this.home_team.loser = false;
      this.away_team.loser = false;
      this.played = this._isPlayed();
      this.home_team.uprank = scores.isRankUp(this.home_team.name, this.week);
      this.home_team.downrank = scores.isRankDown(this.home_team.name, this.week);
      this.away_team.uprank = scores.isRankUp(this.away_team.name, this.week);
      this.away_team.downrank = scores.isRankDown(this.away_team.name, this.week);
      if (this.played) {
        if (this.home_team.score > this.away_team.score) {
          this.home_team.winner = true;
          this.away_team.loser = true;
          this.winner = this.home_team;
          this.loser = this.away_team;
        } else {
          this.away_team.winner = true;
          this.home_team.loser = true;
          this.winner = this.away_team;
          this.loser = this.home_team;
        }
        this.upset = this._isUpset();
        if (this.upset) {
          this.loser.upset = true;
        }
      }
      return;
    }

    Game.prototype.render = function() {
      return {
        home_team: this.home_team.render(),
        away_team: this.away_team.render(),
        upset: this.upset
      };
    };

    return Game;

  })();

  BuildSchedule = (function() {

    BuildSchedule.prototype._buildWeek = function(rankTeam, week) {
      var away_team, game_temp, home_team;
      game_temp = scores.getGame(rankTeam, week);
      home_team = new Team(game_temp.home.team, game_temp.home.rank, game_temp.home.score);
      away_team = new Team(game_temp.away.team, game_temp.away.rank, game_temp.away.score);
      return {
        home: home_team,
        away: away_team
      };
    };

    function BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank) {
      var r, result, retData, t, tempGame, template, tmplData, week, weekNumber, _i, _ref, _ref1, _ref2;
      console.log("BuildSchedule: constructor");
      _ref = rank.ranks.AP;
      for (r in _ref) {
        t = _ref[r];
        tmplData = new Array();
        for (weekNumber = _i = _ref1 = currentWeek - 3, _ref2 = currentWeek + 2; _ref1 <= _ref2 ? _i < _ref2 : _i > _ref2; weekNumber = _ref1 <= _ref2 ? ++_i : --_i) {
          week = this._buildWeek(t, weekNumber);
          tempGame = new Game(week.home, week.away, weekNumber);
          tmplData.push(tempGame.render());
        }
        retData = [];
        retData['games'] = tmplData;
        retData['rank'] = r;
        retData['rankteam'] = t;
        template = Handlebars.compile(templateHTML);
        result = template(retData);
        domsched.append(result);
      }
      loading.html("loaded");
      loading.hide();
      return;
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
