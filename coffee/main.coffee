doneLoad = () ->
	console.log "DataLoader: callback returned to main"
	builder = new BuildSchedule(loading, domsched, schedTMPL,currentWeek, schedule, scores, rank)

currentWeek = 7
domsched = $ "#schedule"
loading = $ "#loading"
schedTMPL = $("#tmpl_schedule_row").html()

scores = new Scores()
schedule = new Schedule()
rank = new Rank()
loader = new DataLoader doneLoad, scores, schedule, rank

window.scores = scores
window.schedule = schedule
window.rank = rank