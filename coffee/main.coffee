doneLoad = () ->
	console.log "DataLoader: callback returned to main"
	builder = new BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)

currentWeek = 7
domsched = $ "#schedTable"
loading = $ "#loading"
templateHTML = '''
<tr>
	<td align="center">{{rank}}</td>
	{{#each games}}
 		<td align="center" class="hometeam">	
 			{{#if home_team.rank}}({{home_team.rank}}){{/if}} {{home_team.name}} 
 		</td>
		<td align="center" class="vs">vs.</td>
		<td align="center" class="awayteam">
			{{away_team.name}} {{#if away_team.rank}}({{away_team.rank}}){{/if}}
		</td>
	{{/each}}
</tr>
'''

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule
window.rank = rank