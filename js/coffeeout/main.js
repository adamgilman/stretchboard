(function() {
  var currentWeek, domsched, doneLoad, loader, loading, rank, schedule, scores, templateHTML;

  doneLoad = function() {
    var builder;
    console.log("DataLoader: callback returned to main");
    return builder = new BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank);
  };

  currentWeek = 7;

  domsched = $("#schedTable");

  loading = $("#loading");

  templateHTML = '<div class="rowrank">#{{rank}} {{rankteam}}</div>\n{{#each games}}\n	<div class="gameblock">\n	    <span class="rank">{{away_team.rank}}</span>\n	    <span class="team">{{away_team.name}}</span>\n	    <span class="score">{{away_team.score}}</span>\n	    <br/>\n	    <span class="rank">{{home_team.rank}}</span>\n	    <span class="team">{{home_team.name}}</span>\n	    <span class="score">{{home_team.score}}</span>\n	</div>\n{{/each}}\n<p class=\'clear\'></p>';

  scores = new Scores();

  schedule = new Schedule();

  rank = new Rank();

  loader = new DataLoader(doneLoad, scores, schedule, rank);

  window.scores = scores;

  window.schedule = schedule;

  window.rank = rank;

}).call(this);
