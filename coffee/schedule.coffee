class Team
	rank: false
	name: false
	score: false
	winner: false
	constructor:(name, rank, score)->
		@name = name
		@rank = rank
		@score = score
	render:()->
		return {name: @name, rank: @rank, score: @score, winner: @winner}

class Week
	home_team: false
	away_team: false
	constructor:()->
		return

	setTeams:(home_team, away_team)->
		@home_team = home_team
		@away_team = away_team
	render:()->
		return {home_team : @home_team.render(), away_team : @away_team.render()}

class BuildSchedule
	_buildWeek:(rankTeam, week)->
		game_temp = scores.getGame(rankTeam, week)
		home_team = new Team(game_temp.home.team, game_temp.home.rank, game_temp.home.score)
		away_team = new Team(game_temp.away.team, game_temp.away.rank, game_temp.away.score)
		home_team.winner = away_team.winner = false
		if game_temp.home.score != false
			if home_team.score > away_team.score
				home_team.winner = true
			else
				away_team.winner = true



		return {
					home: home_team, 
					away: away_team
				}

	constructor:(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)->
		console.log "BuildSchedule: constructor"
		loading.html("loaded")
		for r, t of rank.ranks.AP #r=rank, t=rank
			tmplData = new Array()
			for weekNumber in [currentWeek-2...currentWeek+1]
				week = @_buildWeek(t, weekNumber)
				tempWeek = new Week()
				tempWeek.setTeams(week.home, week.away)
				tmplData.push(tempWeek.render())

			retData = []
			retData['games'] = tmplData
			retData['rank'] = r

			template = Handlebars.compile templateHTML
			result = template retData

			domsched.find("tr:last") 
				.after(result)

window.BuildSchedule = BuildSchedule