'use strict';

function TableTemplate() {
}

TableTemplate.fillIn = function(id, dictionary) {
	var table = document.getElementById(id);
	table.style.visibility = "visible";
	var matches = table.querySelectorAll("td, th");
	console.log(matches);
	for (var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var processor = new Cs142TemplateProcessor(match.innerHTML);
		match.innerHTML = processor.fillIn(dictionary);
	}
};