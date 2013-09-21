define('template/helpers/dateFromNow', ['handlebars', 'moment'], function (Handlebars, moment) {
	// ouputs a relative date
	function dateFromNow(context) {
		return moment(context).fromNow();
	}
	Handlebars.registerHelper('dateFromNow', dateFromNow);
	return dateFromNow;
});
