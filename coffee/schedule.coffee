class BuildSchedule
	constructor:(domsched, currentWeek, schedule, scores)->
		console.log "BuildSchedule: constructor"
		console.log domsched
		domsched.html("loaded")

window.BuildSchedule = BuildSchedule