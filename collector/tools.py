import re
from BeautifulSoup import BeautifulSoup

def getGamesSoupArray(weekSoup):
	#get scoreboard
	scoreboard = weekSoup.find(id="scoreboard")
	#get the list of days which games are on
	daysgames = scoreboard.findAll("div", {'class' : 'daysgames'})
	#flatten these daysgames into list of games
	games = []
	for day in daysgames:
		today_games = day.findAll(True, {'class' : re.compile(r'\bscore-container\b')})
		for game in today_games:
			games.append(game)
	return games