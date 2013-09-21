define('template/helpers/dateFormat', ['handlebars', 'moment'], function (Handlebars, moment) {
	// usage example: {{dateFormat creation_date format='MMMM YYYY'}}
	// 'format' is optional and defaults to 'MMM DD, YYYY hh:mm A'
	function dateFormat(context, block) {
		var f = block.hash.format || 'MMM DD, YYYY hh:mm A';
		return moment(context).format(f);
	}
	Handlebars.registerHelper('dateFormat', dateFormat);
	return dateFormat;
});
