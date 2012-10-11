class Team
	rank: false
	name: false
	score: false
	winner: false
	loser: false
	upset: false
	uprank: false
	downrank: false
	constructor:(name, rank, score)->
		@name = name
		@rank = rank
		@score = score
	setUpset:()->
		@upset = true
	render:()->
		return {
					name: @name.replace(";",""), 
					rank: @rank, 
					score: @score, 
					winner: @winner, 
					loser: @loser, 
					upset: @upset,
					uprank: @uprank,
					downrank: @downrank,
				}

class Game
	week: false
	home_team: false
	away_team: false
	upset: false
	winner: false
	loser: false
	played: false

	_isUpset:() ->
		if @played
			if (@winner.rank == null) and not (@loser.rank == null)
				return true
			
			if !(@loser.rank == null)
				if (@winner.rank > @loser.rank)
					return true
		return false #finality.. always false unless above true

	_isPlayed:() ->
		if !@home_team.score
			return false
		return !schedule.checkByeOrOver(@home_team.name, @week)

	constructor:(home_team, away_team, week)->
		@week = week
		@home_team = home_team
		@away_team = away_team
		@home_team.winner = false
		@away_team.winner = false
		@home_team.loser = false
		@away_team.loser = false
		@played = @_isPlayed()


		@home_team.uprank = scores.isRankUp(@home_team.name, @week)
		@home_team.downrank = scores.isRankDown(@home_team.name, @week)

		@away_team.uprank = scores.isRankUp(@away_team.name, @week)
		@away_team.downrank = scores.isRankDown(@away_team.name, @week)

		if @played #if false then it's a bye week or hasn't happened
			if @home_team.score > @away_team.score
				@home_team.winner = true
				@away_team.loser = true
				@winner = @home_team
				@loser = @away_team
			else
				@away_team.winner = true
				@home_team.loser = true
				@winner = @away_team
				@loser = @home_team
			@upset = @_isUpset()
			if @upset
				@loser.upset = true

		return 

	render:()->
		return {
					home_team : @home_team.render(), 
					away_team : @away_team.render(),
					upset: @upset,
				}

class BuildSchedule
	_buildWeek:(rankTeam, week)->
		game_temp = scores.getGame(rankTeam, week)
		home_team = new Team(game_temp.home.team, game_temp.home.rank, game_temp.home.score)
		away_team = new Team(game_temp.away.team, game_temp.away.rank, game_temp.away.score)
		return {home: home_team, away: away_team}

	constructor:(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)->
		console.log "BuildSchedule: constructor"
		for r, t of rank.ranks.AP #r=rank, t=rank
			tmplData = new Array()
			for weekNumber in [currentWeek-3...currentWeek+2]
				week = @_buildWeek(t, weekNumber)
				tempGame = new Game(week.home, week.away, weekNumber)
				tmplData.push(tempGame.render())

			retData = []
			retData['games'] = tmplData
			retData['rank'] = r
			retData['rankteam'] = t

			template = Handlebars.compile templateHTML
			result = template retData
			domsched.append(result)
		loading.html("loaded")
		loading.hide()
		return

window.BuildSchedule = BuildSchedule