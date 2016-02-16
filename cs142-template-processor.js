'use strict';

function Cs142TemplateProcessor(template) {
	//this.template = template;

	this.fillIn = function(dictionary) {
		//var result = this.template;
		var result = template;
		for(var key in dictionary) {
			var regexString = "{{" + key + "}}";
			var regex = new RegExp(regexString, "g");
			result = result.replace(regex, dictionary[key]);
		}
		result = result.replace(/{{[\w\d\s]*}}/g, "");
		return result;
	};
}


