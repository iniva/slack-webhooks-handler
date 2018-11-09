# HapiJS
You can create a sort of _**Slack Service**_ that exposes the webhook handler. You don't need to do it exactly like this. This is just for reference.

## Service
```javascript
// service.js
import { Dispatcher, factory } from 'slack-webhooks-handler';

export default class SlackService {
    constructor(options) {
        this.dispatcher = new Dispatcher(options);
    }

    async send() {
        return await this.dispatcher.send();
    }

    eventFrom(type, ...params) {
        const webhook = factory(type);
        const { attachments } = webhook(...params);

        this.dispatcher.withAttachments(attachments);

        return this;
    }
}
```

## Plugin
```javascript
// slackPlugin.js
import SlackService from './service';

const name = 'slack-service';

export default {
    name,
    register: async(server, { mask, ...options }) => {
        const service = new SlackService(options);

        server.decorate('server', 'slackService', service);
    }
};
```

## Register Plugin
```javascript
import slackPlugin from '/path/to/slackPlugin';

await server.register([
    // more plugins...
    {
        plugin: slackPlugin,
        options
    }
]);
```

## Use in a handler
```javascript
import Boom from 'boom';

server.route({
    method: 'POST',
    path: `/webhooks/{type}`,
    options: {
        description: 'Webhooks Trigger',
        handler: async(request) {
            try {
                const { headers, params, payload } = request;
                const { slackService } = request.server;

                return await slackService
                    .eventFrom(params.type, headers, payload)
                    .send();
            }
            catch (error) {
                return Boom.badRequest(error);
            }
        }
    }
});
```