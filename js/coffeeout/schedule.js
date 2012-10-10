(function() {
  var BuildSchedule, Team, Week;

  Team = (function() {

    Team.prototype.rank = false;

    Team.prototype.name = false;

    Team.prototype.score = false;

    Team.prototype.winner = false;

    function Team(name, rank, score) {
      this.name = name;
      this.rank = rank;
      this.score = score;
    }

    Team.prototype.render = function() {
      return {
        name: this.name,
        rank: this.rank,
        score: this.score,
        winner: this.winner
      };
    };

    return Team;

  })();

  Week = (function() {

    Week.prototype.home_team = false;

    Week.prototype.away_team = false;

    function Week() {
      return;
    }

    Week.prototype.setTeams = function(home_team, away_team) {
      this.home_team = home_team;
      return this.away_team = away_team;
    };

    Week.prototype.render = function() {
      return {
        home_team: this.home_team.render(),
        away_team: this.away_team.render()
      };
    };

    return Week;

  })();

  BuildSchedule = (function() {

    BuildSchedule.prototype._buildWeek = function(rankTeam, week) {
      var away_team, game_temp, home_team;
      game_temp = scores.getGame(rankTeam, week);
      home_team = new Team(game_temp.home.team, game_temp.home.rank, game_temp.home.score);
      away_team = new Team(game_temp.away.team, game_temp.away.rank, game_temp.away.score);
      home_team.winner = away_team.winner = false;
      console.log(home_team.score + "|" + away_team.score);
      if (home_team.score > away_team.score) {
        home_team.winner = true;
      } else {
        away_team.winner = true;
      }
      return {
        home: home_team,
        away: away_team
      };
    };

    function BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank) {
      var r, result, retData, t, tempWeek, template, tmplData, week, weekNumber, _i, _ref, _ref1, _ref2;
      console.log("BuildSchedule: constructor");
      loading.html("loaded");
      _ref = rank.ranks.AP;
      for (r in _ref) {
        t = _ref[r];
        tmplData = new Array();
        for (weekNumber = _i = _ref1 = currentWeek - 2, _ref2 = currentWeek + 1; _ref1 <= _ref2 ? _i < _ref2 : _i > _ref2; weekNumber = _ref1 <= _ref2 ? ++_i : --_i) {
          week = this._buildWeek(t, weekNumber);
          tempWeek = new Week();
          tempWeek.setTeams(week.home, week.away);
          tmplData.push(tempWeek.render());
        }
        retData = [];
        retData['games'] = tmplData;
        retData['rank'] = r;
        template = Handlebars.compile(templateHTML);
        result = template(retData);
        domsched.find("tr:last").after(result);
      }
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
