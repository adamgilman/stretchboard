import requests, re
from BeautifulSoup import BeautifulSoup
from ordereddict import OrderedDict
import simplejson as json

def getTeamScoreRankFromSoup(soup):
	try:
		rank = soup.find("td", {'class' : re.compile(r'\bcompetitor-name\b') } ).find("span").text.strip("(").strip(")")
	except AttributeError:
		rank = None
	return {
		'team' 	: soup.find("td", {'class' : re.compile(r'\bcompetitor-name\b') } ).find("strong").text,
		'score' : soup.find("td", {'class' : re.compile(r'\bsnap\b') } ).text,
		'rank'	: rank
	}

def printMatchResult(matchDict):
	if matchDict['home']['rank'] is not None:
		home = "%(team)s(%(rank)s): %(score)s"
	else:
		home = "%(team)s: %(score)s"
	if matchDict['away']['rank'] is not None:
		away = "%(team)s(%(rank)s): %(score)s"
	else:
		away = "%(team)s: %(score)s"

	result = home % matchDict['home'] + " - " + away % matchDict['away']
	print result

weeks = OrderedDict()
weeks.clear()
weeks['1'] = "http://m.espn.go.com/ncf/scoreboard?date=20120828&groupId=80"
weeks['2'] = "http://m.espn.go.com/ncf/scoreboard?date=20120904&groupId=80"
weeks['3'] = "http://m.espn.go.com/ncf/scoreboard?date=20120911&groupId=80"
weeks['4'] = "http://m.espn.go.com/ncf/scoreboard?date=20120918&groupId=80"
weeks['5'] = "http://m.espn.go.com/ncf/scoreboard?date=20120925&groupId=80"
weeks['6'] = "http://m.espn.go.com/ncf/scoreboard?date=20121002&groupId=80"

for week_number, week_url in weeks.iteritems():
	r = requests.get(week_url)
	soup = BeautifulSoup(r.content)
	#get scoreboard
	scoreboard = soup.find(id="scoreboard")
	#get the list of days which games are on
	daysgames = scoreboard.findAll("div", {'class' : 'daysgames'})
	#flatten these daysgames into list of games
	games = []
	for day in daysgames:
		today_games = day.findAll(True, {'class' : re.compile(r'\bscore-container\b')})
		for game in today_games:
			games.append(game)

	#games are now flattened to game list, iterate through and grab scores
	game_scores = []
	for game in games:
		home = away = {'team ' : None, 'score' : None}
		home_soup = game.find(True, {'class' : re.compile(r'\bhome\b')} )
		away_soup = game.find(True, {'class' : re.compile(r'\baway\b')} )

		game_scores.append({
					'home' : getTeamScoreRankFromSoup(home_soup),
					'away' : getTeamScoreRankFromSoup(away_soup)
				})
		current_game = game_scores[-1]
		#printMatchResult(current_game)

	f = open("week_%s.json" % week_number, 'w')
	f.write(json.dumps(game_scores))
	f.close()

