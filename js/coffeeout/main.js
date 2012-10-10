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

  templateHTML = '<tr>\n	<td align="center">{{rank}}</td>\n	{{#each games}}\n 		<td align="center" class="hometeam">	\n 			{{#if home_team.rank}}({{home_team.rank}}){{/if}} {{home_team.name}} \n 		</td>\n		<td align="center" class="vs">vs.</td>\n		<td align="center" class="awayteam">\n			{{away_team.name}} {{#if away_team.rank}}({{away_team.rank}}){{/if}}\n		</td>\n	{{/each}}\n</tr>';

  scores = new Scores();

  schedule = new Schedule();

  rank = new Rank();

  loader = new DataLoader(doneLoad, scores, schedule, rank);

  window.scores = scores;

  window.schedule = schedule;

  window.rank = rank;

}).call(this);
