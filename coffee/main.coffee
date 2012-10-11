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
		<span class="updown">
			{{#if away_team.uprank}}<img src="img/up.gif">{{/if}}
			{{#if away_team.downrank}}<img src="img/down.gif">{{/if}}
		</span>
	    <span class="rank">{{away_team.rank}}</span>
	    <span class="team {{#if away_team.upset}}upset{{/if}} {{#if away_team.winner}}winner{{/if}}{{#if away_team.loser}}loser{{/if}}">{{away_team.name}}</span>
	    <span class="score">{{#if away_team.winner}}<strong>{{/if}}{{away_team.score}}{{#if away_team.winner}}</strong>{{/if}}</span>
	    <br/>
	    <span class="updown">
	    	{{#if home_team.uprank}}<img src="img/up.gif">{{/if}}
			{{#if home_team.downrank}}<img src="img/down.gif">{{/if}}
	    </span>
	    <span class="rank">{{home_team.rank}}</span>
	    <span class="team {{#if home_team.upset}}upset{{/if}} {{#if home_team.winner}}winner{{/if}}{{#if home_team.loser}}loser{{/if}}">{{home_team.name}}</span>
	    <span class="score">{{#if home_team.winner}}<strong>{{/if}}{{home_team.score}}{{#if home_team.winner}}</strong>{{/if}}<span>
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