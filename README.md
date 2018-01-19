# Twitter "Fake News" generator bot

This is a simple bot that generates the names of fake news agencies.

## Setup twitter

Set up an application on the Twitter account you want to retweet from via: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new)

As an example, I'll configure the old [@DroidScott](twitter.com/droidscott) twitter account I have so you can follow along.

Straight forward enough for the twitter application, make sure you add your phone number to your Twitter account before clicking the **Create your Twitter application** button.

![](/images/twitter-application-setup.png)

You should now be in the 'Application Management' section where you will need to take note of your keys. You should have your 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' already available. You'll need to scroll to the bottom of the page and click the **Create my access token** to get the 'Access Token' and 'Access Token Secret' take note of all four of them as you'll need them when setting up the bot.

## Node dependencies

Before configuring the bot we'll need to install the dependencies, cd into the project folder with `cd tw*` in the terminal this will move you to `:~/workspace/twitter-bot-bootstrap (master) $ ` from the terminal enter:

```shell
yarn
```

This will install all the dependencies listed in the `package.json` file.

**Make a `.env` file:** make a file named `.env` do it with the terminal with the following command:

```shell
touch .env
```

This should be at the root of your project directory.

Now you'll need to add your Twitter keys to the `.env` file. Just input the keys in their corresponding fields and save the file.

The file structure should look as follows:

```
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=

TWITTER_USERNAME=FakeExpress
RESULT_TYPE=mixed
TWITTER_LANG=en
TWITTER_POST_INTERVAL=480
```

Add your API keys to the `.env` file :key:

>NOTE none of the `.env` items have quotes `''` round them or spaces between the key and the value `KEY=value`

That should be it. Go to the terminal, enter `yarn start` and you should get a tweet.

## License

MIT License

Based on Scott Spence's [twitter bot](https://github.com/spences10/twitter-bot-bootstrap).

Copyright (c) 2018, Benjamin Reed. All rights reserved.
