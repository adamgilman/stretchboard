doneLoad = () ->
	console.log "DataLoader: callback returned to main"
	builder = new BuildSchedule(domsched, currentWeek, schedule, scores, rank)

currentWeek = 7
domsched = $ "#schedule"

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule

window.debug = domsched
