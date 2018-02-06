const fs = require('fs');

const rando = require('./rando');

const nouns = fs.readFileSync('./nounlist.txt', 'utf8').split(/[\r\n]+/).filter((entry) => {
	return entry.match(/\S+/);
});
const cities = require('../cities.json');
const templates = fs.readFileSync('./templates.txt', 'utf8').split(/[\r\n]+/).filter((entry) => {
	return entry.match(/\s+/);
});

const capitalize = (word) => {
	return word.replace(/(^|[\s\-\.])([a-z])/g, (m, m1, m2) => {
		return m1 + m2.toUpperCase();
	});
//	return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
};

const generate = () => {
	const template = rando(templates);
	const noun = rando(nouns);
	const city = rando(cities);

	return capitalize(template.replace('{city}', city).replace('{noun}', noun));
};

module.exports = generate;
