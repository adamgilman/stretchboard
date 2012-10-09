class BuildSchedule
	constructor:(loading, domsched, schedTMPL,currentWeek, schedule, scores, rank)->
		console.log "BuildSchedule: constructor"
		loading.html("loaded")
		for r, t of rank.ranks.AP #r=rank, t=rank
			#console.log r + "|" + t
			tmplData = []
			tmplData['home_team'] = t
			tmplData['away_team'] = schedule.teamByWeek(t, currentWeek)
			#home_rank = r
			domsched.append(tmpl schedTMPL, tmpl)

window.BuildSchedule = BuildSchedule