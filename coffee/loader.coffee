class DataLoader
	_callback: false
	_scoreFiles: false
	_scheduleFile: false
	_callbackCounter: 0
	_callbackTotal: false

	allLoaded: ->
		console.log "DataLoader: All feeds loaded"

	feedFinished: () ->
		@_callbackCounter = @_callbackCounter + 1
		console.log @_callbackCounter + " | " + @_callbackTotal
		@allLoaded() if @_callbackCounter == @_callbackTotal

	constructor: (@callback) ->
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
		@_callbackTotal = @_scoreFiles.length + 1

		for feed in @_scoreFiles
			$.getJSON feed, {}, (data)=>
				console.log data.week
				@feedFinished()
				return

		$.getJSON @_scheduleFile, {}, (data)=>
			console.log "schedule"
			@feedFinished()
			return

doneLoad = () ->
	console.log "DataLoader: callback fired"

loader = new DataLoader doneLoad


