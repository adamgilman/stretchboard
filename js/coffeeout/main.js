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

  templateHTML = '<tr>\n	<td align="center">{{rank}}</td>\n	<td align="center">{{home_team}}</td>\n	<td align="center">vs.</td>\n	<td align="center">{{away_team}}</td>\n\n	<td align="center">{{home_team}}</td>\n	<td align="center">vs.</td>\n	<td align="center">{{away_team}}</td>\n\n	<td align="center">{{home_team}}</td>\n	<td align="center">vs.</td>\n	<td align="center">{{away_team}}</td>\n</tr>';

  scores = new Scores();

  schedule = new Schedule();

  rank = new Rank();

  loader = new DataLoader(doneLoad, scores, schedule, rank);

  window.scores = scores;

  window.schedule = schedule;

  window.rank = rank;

}).call(this);
