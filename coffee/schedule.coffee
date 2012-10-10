class BuildSchedule
	constructor:(loading, domsched, templateHTML, currentWeek, schedule, scores, rank)->
		console.log "BuildSchedule: constructor"
		loading.html("loaded")
		for r, t of rank.ranks.AP #r=rank, t=rank
			tmplData = []
			tmplData['rank']	  = r
			tmplData['home_team'] = t
			tmplData['away_team'] = schedule.teamByWeek(t, currentWeek)
			
			template = Handlebars.compile templateHTML
			result = template tmplData

			domsched.find("tr:last") 
				.after(result)

window.BuildSchedule = BuildSchedule