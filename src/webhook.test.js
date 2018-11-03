/* global jest describe it expect */

import { IncomingWebhook } from '@slack/client';

import Webhook from './webhook';

jest.mock('@slack/client');

describe('Slack Webhook', () => {
    it('should throw if Slack Webhook URL is not defined', () => {
        expect(() => {
            const webhook = new Webhook(); // eslint-disable-line no-unused-vars
        }).toThrowError(/Slack Webhook URL is required/);
    });

    it('should return a Webhook instance', () => {
        const webhook = new Webhook({ url: 'https://url.test' });
        const expectedProperties = ['webhook', 'username', 'text', 'attachments'];

        expect(webhook).toBeInstanceOf(Webhook);
        expect(webhook.webhook).toBeInstanceOf(IncomingWebhook);
        expect(Object.keys(webhook)).toEqual(expect.arrayContaining(expectedProperties));
    });

    it('should throw when required variables are not set', async() => {
        const webhook = new Webhook({ url: 'https://url.test' });

        try {
            await webhook.send();
        }
        catch (error) {
            expect(error.message).toMatch(/Cannont send message. Either set a text or attachments./);
        }
    });

    it('should set the attachments', async() => {
        const webhook = new Webhook({ url: 'https://url.test' });
        const attachments = [{
            field: 'value'
        }];

        webhook.withAttachments(attachments);

        expect(webhook.attachments).toEqual(expect.arrayContaining(attachments));
    });

    it('should call the IncomingWebhook send function', () => {
        const webhook = new Webhook({ url: 'https://url.test' });

        webhook.text = 'Test message';
        const response = webhook.send();

        expect(webhook.webhook.send).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(Promise);
    });
});
