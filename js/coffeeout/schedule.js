(function() {
  var BuildSchedule;

  BuildSchedule = (function() {

    function BuildSchedule(loading, domsched, schedTMPL, currentWeek, schedule, scores, rank) {
      var r, t, tmplData, _ref;
      console.log("BuildSchedule: constructor");
      loading.html("loaded");
      _ref = rank.ranks.AP;
      for (r in _ref) {
        t = _ref[r];
        tmplData = [];
        tmplData['home_team'] = t;
        tmplData['away_team'] = schedule.teamByWeek(t, currentWeek);
        console.log(tmpl(schedTMPL, tmpl));
        domsched.append(tmpl(schedTMPL, tmpl));
      }
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
