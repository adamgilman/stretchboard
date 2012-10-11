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
	    <span class="team {{#if away_team.upset}}upset{{/if}} {{#if away_team.winner}}winner{{/if}}{{#if away_team.loser}}loser{{/if}}">{{away_team.name}}</span>
	    <span class="score">{{away_team.score}}</span>
	    <br/>
	    <span class="rank">{{home_team.rank}}</span>
	    <span class="team {{#if home_team.upset}}upset{{/if}} {{#if home_team.winner}}winner{{/if}}{{#if home_team.loser}}loser{{/if}}">{{home_team.name}}</span>
	    <span class="score">{{home_team.score}}</span>
	</div>
{{/each}}
<p class='clear'><hr></p>
'''

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule
window.rank = rank