(function() {
  var BuildSchedule;

  BuildSchedule = (function() {

    function BuildSchedule(loading, domsched, templateHTML, currentWeek, schedule, scores, rank) {
      var r, result, t, template, tmplData, _ref;
      console.log("BuildSchedule: constructor");
      loading.html("loaded");
      _ref = rank.ranks.AP;
      for (r in _ref) {
        t = _ref[r];
        tmplData = [];
        tmplData['rank'] = r;
        tmplData['home_team'] = t;
        tmplData['away_team'] = schedule.teamByWeek(t, currentWeek);
        template = Handlebars.compile(templateHTML);
        result = template(tmplData);
        domsched.find("tr:last").after(result);
      }
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
