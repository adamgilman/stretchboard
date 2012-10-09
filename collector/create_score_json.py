import requests, re
from BeautifulSoup import BeautifulSoup
import simplejson as json
from ordereddict import OrderedDict
from schedule import weeks
from tools import getGamesSoupArray

output_file = "../output/scores/week_%s.json" #production
#output_file = "./debug/debug_week_%s.json" #dev

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



if __name__ == '__main__':
	for week_number, week_url in weeks.iteritems():
		r = requests.get(week_url)
		soup = BeautifulSoup(r.content)
		
		games = getGamesSoupArray(soup)

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

		ret_json = {'week' : week_number, 'data' : game_scores}

		f = open(output_file % week_number, 'w')
		f.write(json.dumps(ret_json))
		f.close()

