var _     = require('underscore');
var logos = require('instant-logos');
var path  = require('path');

module.exports = {
	find: function() {
		return Promise.resolve(this.logos);
	},
	setup: function() {
		this.logos = _.chain(logos)
			.map(function(logo) {
				if (!logo.svg || !logo.svg.path) {
					return logo;
				}
				return _.defaults({ svg: { url: '/' + path.join('svg', logo.source.shortname, logo.svg.path.filename) } }, logo);
			})
			.sortBy(function(logo) {
				return logo.name.charAt(0).toLowerCase();
			})
			.value();
	}
};
