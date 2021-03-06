[![Build Status](https://travis-ci.org/iniva/slack-webhooks-handler.svg?branch=master)](https://travis-ci.org/iniva/slack-webhooks-handler)
[![Coverage Status](https://coveralls.io/repos/github/iniva/slack-webhooks-handler/badge.svg?branch=master)](https://coveralls.io/github/iniva/slack-webhooks-handler?branch=master)

# Slack Webhooks Handler <!-- omit in toc -->
Manage incoming webhooks to send messages to Slack

- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
  - [Available Dispatcher Methods](#available-dispatcher-methods)
- [Payload docs](#payload-docs)

## Installation
```
# npm
npm install slack-webhooks-handler

# yarn
yarn add slack-webhooks-handler
```

## Options
- **url**(*required*): Your Slack custom integration (*Incoming Webhook*) URL
- **botName**(*optional*): The name of the bot that will appear when sending messages. Do this if you want/need to override the one you set on your custom integration.

```javascript
// options object
{
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    botName: 'MyAPP-CI'
}
```

## Usage
> All you need to do is prepare a POST endpoint in your API that will be used when configuring the webhook in your preferred version control hosting (Github, Gitlab, Bitbucket, etc.)

At the moment you have the main dispatcher (**Dispatcher**) and a **factory** function.

You can rely on the *factory* function (currently only supports Github's *release* and *issues* events, more on the way...), or you can use the dispatcher alone to send a simple message (just text) or a custom one following the [attachments structure](https://api.slack.com/docs/message-attachments#attachment_structure)
```javascript
const { Dispatcher, factory } = require('slack-webhooks-handler')

const dispatcher = new Dispatcher(options);
const hook = factory('github');
const { attachments } = hook(payload);

dispatcher.withAttachments(attachments);

(async () => {
    try {
        await dispatcher.send();
    }
    catch (error) {
        console.log(error);
    }
})();
```

### Available Dispatcher Methods
* **setMessage**: Use it when you intend to send a simple message.
* **setChannel**: Even if you set your Slack Webhook to a specific channel, you can use this method to change the target channel for specific messages.
* **withAttachments**: Use it to set [attachments](https://api.slack.com/docs/message-attachments#attachment_structure) for messages.
* **preparePayload**: Use it to preview the payload you will send to Slack.

## Payload docs
For more info about event payloads take a look at:
- **Github**: [Event Types & Payloads](https://developer.github.com/v3/activity/events/types)
- **Bitbucket**: [Event payload](https://confluence.atlassian.com/bitbucketserver/event-payload-938025882.html)
- **Gitlab**: [Events](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#events)