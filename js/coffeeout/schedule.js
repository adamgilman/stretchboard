(function() {
  var BuildSchedule, Game, Team;

  Team = (function() {

    Team.prototype.rank = false;

    Team.prototype.name = false;

    Team.prototype.score = false;

    Team.prototype.winner = false;

    Team.prototype.loser = false;

    Team.prototype.upset = false;

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
        name: this.name,
        rank: this.rank,
        score: this.score,
        winner: this.winner,
        loser: this.loser,
        upset: this.upset
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
        if (this.home_team.winner) {
          return this.upset = (this.away_team.rank > this.home_team.rank) || (this.home_team.rank !== false && (this.away_team.rank = false));
        } else {
          return this.upset = (this.home_team.rank > this.away_team.rank) || (this.away_team.rank !== false && (this.home_team.rank = false));
        }
      }
    };

    function Game(home_team, away_team, week) {
      this.week = week;
      this.home_team = home_team;
      this.away_team = away_team;
      this.home_team.winner = false;
      this.away_team.winner = false;
      this.home_team.loser = false;
      this.away_team.loser = false;
      this.played = !schedule.checkByeOrOver(this.home_team.name, this.week);
      if (this.home_team.score !== false) {
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
      }
      this.upset = this._isUpset();
      if (this.upset) {
        this.loser.upset = true;
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
        for (weekNumber = _i = _ref1 = currentWeek - 2, _ref2 = currentWeek + 1; _ref1 <= _ref2 ? _i < _ref2 : _i > _ref2; weekNumber = _ref1 <= _ref2 ? ++_i : --_i) {
          week = this._buildWeek(t, weekNumber);
          tempGame = new Game(week.home, week.away, weekNumber);
          tmplData.push(tempGame.render());
        }
        retData = [];
        retData['games'] = tmplData;
        retData['rank'] = r;
        template = Handlebars.compile(templateHTML);
        result = template(retData);
        domsched.find("tr:last").after(result);
      }
      loading.html("loaded");
      loading.hide();
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
