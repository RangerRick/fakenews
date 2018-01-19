const Twit = require('twit');
const config = require('./config');

const bot = new Twit(config.twitterKeys);

const fs = require('fs');
const rando = require('./rando');

console.info('Bot starting...')

const nouns = fs.readFileSync('./nounlist.txt', 'utf8').split(/[\r\n]+/).filter((entry) => {
	return entry.match(/\S+/);
});
const cities = require('../cities.json');
const templates = fs.readFileSync('./templates.txt', 'utf8').split(/[\r\n]+/).filter((entry) => {
	return entry.match(/\s+/);
});

let tweeted = require('../tweeted.json');

const capitalize = (word) => {
	return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
};

const generate = () => {
	const template = rando(templates);
	const noun = rando(nouns);
	const city = rando(cities);

	return template.replace('{city}', city).replace('{noun}', capitalize(noun));
};

const doTweet = () => {
	let tweet, count = 0;
	do {
		tweet = generate();
		count++;
	} while (tweeted.indexOf(tweet) >= 0 && count <= 1000);

	if (tweeted.indexOf(tweet) === -1) {
		console.info('Found unique name: ' + tweet);
		tweeted.push(tweet);
		bot.post('statuses/update', {
			status: tweet
		}, (err, data, response) => {
			if (err) {
				console.error(err);
			}
			//console.info(data);
			//console.info(response);
		});
	} else {
		console.error('Gave up trying to come up with a unique name. :(');
	}
};

const handleExit = (signal) => {
	fs.writeFileSync('./tweeted.json', JSON.stringify(tweeted, undefined, 2));
	process.exit();
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

doTweet();
setInterval(doTweet, config.twitterConfig.interval);

process.stdin.resume();
