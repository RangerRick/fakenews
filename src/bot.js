const fs = require('fs');

const Twit = require('twit');
const config = require('./config');

const bot = new Twit(config.twitterKeys);

const generate = require('./generate');

console.info('Bot starting...')

let tweeted = require('../tweeted.json');

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
			status: tweet + ' #FakeNews'
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
