import os
import simplejson as json
from ordereddict import OrderedDict

score_directory = "../output/scores/"
output_file = "../output/schedule/schedule.json" #production

weeks = [None] #stupid placeholder to fencepost off 1 instead of 0
#anyone have a better way? as week 1 = 1 instead of 0
#can't just read straight from directory as it orders 1,10,11,12,etc,2,3,4

team_schedule = {}

#read in all json files from schedule creator
dirlist = os.listdir(score_directory)
for fname in dirlist:
	f = open(score_directory + fname, 'r')
	data = json.loads( f.read() )
	week_number = int(fname.split("_")[1].split(".")[0])
	weeks.insert(week_number, data)
	

#teams with less than 13 rows are DII teams which play a DI team and 
#don't have any more games listed on source materials
for week_number, week in enumerate(weeks):
	if week is not None: #hack for fencepost above
		for game in week:
			if not team_schedule.has_key(game['home']['team']):
				team_schedule[game['home']['team']] = OrderedDict()
			team_schedule[game['home']['team']][week_number] = game['away']['team']

			if not team_schedule.has_key(game['away']['team']):
				team_schedule[game['away']['team']] = OrderedDict()

			team_schedule[game['away']['team']][week_number] = game['home']['team']

f = open(output_file, 'w') 
f.write(json.dumps(team_schedule))
f.close()