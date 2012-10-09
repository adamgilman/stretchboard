(function() {
  var BuildSchedule;

  BuildSchedule = (function() {

    function BuildSchedule(domsched, currentWeek, schedule, scores) {
      console.log("BuildSchedule: constructor");
      console.log(domsched);
      domsched.html("loaded");
    }

    return BuildSchedule;

  })();

  window.BuildSchedule = BuildSchedule;

}).call(this);
