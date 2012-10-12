(function() {
  var currentWeek, domsched, doneLoad, loader, loading, rank, schedule, scores, templateHTML;

  doneLoad = function() {
    var builder, header, headertxt, _i, _len, _ref, _results;
    console.log("DataLoader: callback returned to main");
    builder = new BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank);
    headertxt = currentWeek - 3;
    _ref = $(".weekHeader");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      header = _ref[_i];
      $(header).html("Week " + headertxt);
      _results.push(headertxt = headertxt + 1);
    }
    return _results;
  };

  currentWeek = 7;

  domsched = $("#schedTable");

  loading = $("#loading");

  templateHTML = '<div class="rowrank">#{{rank}} {{rankteam}}</div>\n{{#each games}}\n	<div class="gameblock">\n		<span class="updown">\n			{{#if away_team.uprank}}<img src="img/up.gif">{{/if}}\n			{{#if away_team.downrank}}<img src="img/down.gif">{{/if}}\n		</span>\n	    <span class="rank">{{away_team.rank}}</span>\n	    <span class="team {{#if away_team.upset}}upset{{/if}} {{#if away_team.winner}}winner{{/if}}{{#if away_team.loser}}loser{{/if}}">{{away_team.name}}</span>\n	    <span class="score">{{#if away_team.winner}}<strong>{{/if}}{{away_team.score}}{{#if away_team.winner}}</strong>{{/if}}</span>\n	    <br/>\n	    <span class="updown">\n	    	{{#if home_team.uprank}}<img src="img/up.gif">{{/if}}\n			{{#if home_team.downrank}}<img src="img/down.gif">{{/if}}\n	    </span>\n	    <span class="rank">{{home_team.rank}}</span>\n	    <span class="team {{#if home_team.upset}}upset{{/if}} {{#if home_team.winner}}winner{{/if}}{{#if home_team.loser}}loser{{/if}}">{{home_team.name}}</span>\n	    <span class="score">{{#if home_team.winner}}<strong>{{/if}}{{home_team.score}}{{#if home_team.winner}}</strong>{{/if}}<span>\n	</div>\n{{/each}}\n<p class=\'clear\'><hr></p>';

  scores = new Scores();

  schedule = new Schedule();

  rank = new Rank();

  loader = new DataLoader(doneLoad, scores, schedule, rank);

  window.scores = scores;

  window.schedule = schedule;

  window.rank = rank;

  window.currentWeek = currentWeek;

}).call(this);
