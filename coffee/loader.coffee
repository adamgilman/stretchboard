class Rank
	ranks = false
	constructor: ->
		return

	loadRank:(JSONdata)->
		@ranks = JSONdata
		return

class Scores
	_scores = false
	constructor: ->
		@_scores = new Array()

	newWeek: (week, JSONdata)->
		@_scores[week] = new WeekScores JSONdata
		return

	getWeek: (week)->
		return @_scores[week]

class WeekScores
	_data: false
	constructor: (JSONdata) ->
		@_data = JSONdata
		return

class Schedule
	_data = false
	constructor: ->
		return

	teamByWeek: (team, week)->
		if not @_data[team]?
			throw new Error("Schedule: Team does not exist")
		else
			if (not @_data[team][week]? and not @_data[team][week+1]?)
				throw new Error("Schedule: Season is over")	
			else
				return @_data[team][week] ? "bye"

	loadSchedule: (schedule)->
		@_data = schedule
		return

class DataLoader
	_callback: false
	_scoreFiles: false
	_scheduleFile: false
	_callbackCounter: 0
	_callbackTotal: false

	allLoaded: ->
		@_callback()

	feedFinished: () ->
		@_callbackCounter = @_callbackCounter + 1
		@allLoaded() if @_callbackCounter == @_callbackTotal

	constructor: (@callback, scores, schedule, rank) ->
		@_callback = @callback
		@_scoreFiles = [
						"output/scores/week_10.json",                                                                                                        
						"output/scores/week_11.json",                                                                                                        
						"output/scores/week_12.json",                                                                                                        
						"output/scores/week_13.json",                                                                                                        
						"output/scores/week_14.json",                                                                                                        
						"output/scores/week_15.json",                                                                                                        
						"output/scores/week_1.json",                                                                                                        
						"output/scores/week_2.json",                                                                                                        
						"output/scores/week_3.json",                                                                                                        
						"output/scores/week_4.json",                                                                                                        
						"output/scores/week_5.json",
						"output/scores/week_6.json",
						"output/scores/week_7.json",
						"output/scores/week_8.json",
						"output/scores/week_9.json"
		]
		@_scheduleFile = "output/schedule/schedule.json"
		@_rankFile = "output/rank/current.json"

		@_callbackTotal = @_scoreFiles.length + 1 + 1
		#1 for schedule, 1 for rank

		for feed in @_scoreFiles
			$.getJSON feed, {}, (data)=>
				scores.newWeek data.week, data.data
				@feedFinished()
				return

		$.getJSON @_scheduleFile, {}, (data)=>
			schedule.loadSchedule data
			@feedFinished()
			return

		$.getJSON @_rankFile, {}, (data)=>
			rank.loadRank data
			@feedFinished()
			return


window.Scores = Scores
window.DataLoader = DataLoader
window.Schedule = Schedule
window.Rank = Rank

