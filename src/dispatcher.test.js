/* global jest describe it expect */

import { IncomingWebhook } from '@slack/webhook';

import Dispatcher from './dispatcher';

jest.mock('@slack/webhook');

describe('Slack Dispatcher', () => {
    it('should throw if Slack Webhook URL is not defined', () => {
        expect(() => {
            const dispatcher = new Dispatcher(); // eslint-disable-line no-unused-vars
        }).toThrowError(/Slack Webhook URL is required/);
    });

    it('should return a Dispatcher instance', () => {
        const dispatcher = new Dispatcher({ url: 'https://url.test' });
        const expectedProperties = ['webhook', 'username', 'text', 'attachments'];

        expect(dispatcher).toBeInstanceOf(Dispatcher);
        expect(dispatcher.webhook).toBeInstanceOf(IncomingWebhook);
        expect(Object.keys(dispatcher)).toEqual(expect.arrayContaining(expectedProperties));
    });

    it('should throw when required variables are not set', async() => {
        const dispatcher = new Dispatcher({ url: 'https://url.test' });

        try {
            await dispatcher.send();
        }
        catch (error) {
            expect(error.message).toMatch(/Cannont send message. Either set a text or attachments./);
        }
    });

    it('should set the attachments', async() => {
        const dispatcher = new Dispatcher({ url: 'https://url.test' });
        const attachments = [{
            field: 'value'
        }];

        dispatcher.withAttachments(attachments);

        expect(dispatcher.attachments).toEqual(expect.arrayContaining(attachments));
    });

    it('should call the IncomingWebhook send function', () => {
        const dispatcher = new Dispatcher({ url: 'https://url.test' });

        dispatcher.text = 'Test message';
        const response = dispatcher.send();

        expect(dispatcher.webhook.send).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(Promise);
    });
});
