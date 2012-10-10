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

  templateHTML = '<tr>\n	<td align="center">{{rank}}</td>\n	{{#each games}}\n 		<td align="center" class="hometeam {{#if home_team.upset}}upset{{/if}} {{#if home_team.winner}}winner{{/if}}{{#if home_team.loser}}loser{{/if}}">\n 			{{#if home_team.winner}}<strong>{{/if}}\n	 			{{#if home_team.rank}}({{home_team.rank}}){{/if}} \n	 			{{home_team.name}} \n	 			{{#if home_team.score}}{{home_team.score}}{{/if}}\n	 		{{#if home_team.winner}}</strong>{{/if}}\n 		</td>\n		<td align="center" class="vs">vs.</td>\n		<td align="center" class="awayteam  {{#if away_team.upset}}upset{{/if}} {{#if away_team.winner}}winner{{/if}}{{#if away_team.loser}}loser{{/if}}">\n			{{#if away_team.winner}}<strong>{{/if}}\n				{{#if away_team.score}}{{away_team.score}}{{/if}}\n				{{away_team.name}} \n				{{#if away_team.rank}}({{away_team.rank}}){{/if}}\n			{{#if away_team.winner}}</strong>{{/if}}\n		</td>\n	{{/each}}\n</tr>';

  scores = new Scores();

  schedule = new Schedule();

  rank = new Rank();

  loader = new DataLoader(doneLoad, scores, schedule, rank);

  window.scores = scores;

  window.schedule = schedule;

  window.rank = rank;

}).call(this);
