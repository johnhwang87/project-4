// formatting dates through a AngularJS filter
// uses the moment package that was installed earlier to convert the date into formatted text

angular
  .module('Project4')
  .filter('calendar', calendar);

function calendar () {
  return function (time) {
    if (!time) return;
// shows what the dates look like on stamps
      return moment(time).calendar(null, {
        lastDay : '[Yesterday]',
        sameDay : 'LT',
        lastWeek : 'dddd',
        sameElse : 'DD/MM/YY'
      });
  };
}
