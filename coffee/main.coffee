doneLoad = () ->
	console.log "DataLoader: callback returned to main"
	builder = new BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)

currentWeek = 7
domsched = $ "#schedTable"
loading = $ "#loading"
templateHTML = '''
<div class="rowrank">#{{rank}} {{rankteam}}</div>
{{#each games}}
	<div class="gameblock">
	    <span class="rank">{{away_team.rank}}</span>
	    <span class="team">{{away_team.name}}</span>
	    <span class="score">{{away_team.score}}</span>
	    <br/>
	    <span class="rank">{{home_team.rank}}</span>
	    <span class="team">{{home_team.name}}</span>
	    <span class="score">{{home_team.score}}</span>
	</div>
{{/each}}
<p class='clear'></p>
'''

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule
window.rank = rank