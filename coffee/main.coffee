doneLoad = () ->
	console.log "DataLoader: callback returned to main"
	builder = new BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)

currentWeek = 7
domsched = $ "#schedTable"
loading = $ "#loading"
templateHTML = '''
<tr>
	<td align="center">{{rank}}</td>
	<td align="center">{{home_team}}</td>
	<td align="center">vs.</td>
	<td align="center">{{away_team}}</td>

	<td align="center">{{home_team}}</td>
	<td align="center">vs.</td>
	<td align="center">{{away_team}}</td>

	<td align="center">{{home_team}}</td>
	<td align="center">vs.</td>
	<td align="center">{{away_team}}</td>
</tr>
'''

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule
window.rank = rank