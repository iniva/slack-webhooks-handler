import { IncomingWebhook } from '@slack/webhook';

export default class Dispatcher {
    constructor(options = {}) {
        if (!options.url) {
            throw new Error('Slack Webhook URL is required');
        }

        if (!options.botName) {
            throw new Error('bot name is required');
        }

        this.webhook = new IncomingWebhook(options.url);
        this.username = options.botName;
        this.text = '';
        this.channel = '';
        this.payload = null;
        this.attachments = [];
    }

    setMessage(text = '') {
        this.text = text;
    }

    setChannel(channel = '') {
        this.channel = channel;
    }

    hasAttachments() {
        return !(this.attachments.length === 0);
    }

    withAttachments(attachments) {
        this.attachments = attachments;
    }

    preparePayload() {
        const payload = {
            username: this.username,
            text: this.text,
            attachments: this.attachments
        };

        if(this.channel !== '') {
            payload.channel = this.channel;
        }

        this.payload = payload;
    }

    async send() {
        if (!this.hasAttachments() && this.text === '') {
            throw new Error('Cannont send message. Either set a text or attachments.');
        }

        this.preparePayload();

        return this.webhook.send(this.payload);
    }
}
