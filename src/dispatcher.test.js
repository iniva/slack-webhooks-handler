/* global jest describe it expect */

import { IncomingWebhook } from '@slack/webhook';

import Dispatcher from './dispatcher';

jest.mock('@slack/webhook');

const mockConfig = { url: 'https://url.test', botName: 'test bot' };

describe('Slack Dispatcher', () => {
    it('should throw if Slack Webhook URL is not defined', () => {
        expect(() => {
            const dispatcher = new Dispatcher(); // eslint-disable-line no-unused-vars
        }).toThrowError(/Slack Webhook URL is required/);
    });

    it('should throw if not name is not defined', () => {
        expect(() => {
            const dispatcher = new Dispatcher({ url: 'https://url.test' }); // eslint-disable-line no-unused-vars
        }).toThrowError(/bot name is required/);
    });

    it('should return a Dispatcher instance', () => {
        const dispatcher = new Dispatcher(mockConfig);
        const expectedProperties = ['webhook', 'username', 'text', 'attachments'];

        expect(dispatcher).toBeInstanceOf(Dispatcher);
        expect(dispatcher.webhook).toBeInstanceOf(IncomingWebhook);
        expect(Object.keys(dispatcher)).toEqual(expect.arrayContaining(expectedProperties));
    });

    it('should throw when required variables are not set', async() => {
        const dispatcher = new Dispatcher(mockConfig);

        try {
            await dispatcher.send();
        }
        catch (error) {
            expect(error.message).toMatch(/Cannont send message. Either set a text or attachments./);
        }
    });

    it('should set the text to an empty string if called with undefined param', () => {
        const dispatcher = new Dispatcher(mockConfig);
        dispatcher.setMessage();

        expect(dispatcher.text).toEqual('');
    });

    it('should set the text', () => {
        const dispatcher = new Dispatcher(mockConfig);
        const message = 'test message';

        dispatcher.setMessage(message);

        expect(dispatcher.text).toEqual(message);
    });

    it('should set the channel to an empty string if called with undefined param', () => {
        const dispatcher = new Dispatcher(mockConfig);
        dispatcher.setChannel();

        expect(dispatcher.channel).toEqual('');
    });

    it('should set the channel', () => {
        const dispatcher = new Dispatcher(mockConfig);
        const channel = '#test-message';

        dispatcher.setMessage('test message');
        dispatcher.setChannel(channel);

        const message = {
            username: dispatcher.username,
            text: dispatcher.text,
            attachments: dispatcher.attachments,
            channel: dispatcher.channel
        };

        expect(dispatcher.channel).toEqual(channel);

        dispatcher.send();

        expect(dispatcher.webhook.send).toHaveBeenCalledWith(message);
    });

    it('should not set the channel in the message', () => {
        const dispatcher = new Dispatcher(mockConfig);

        dispatcher.setMessage('test');

        const message = {
            username: dispatcher.username,
            text: dispatcher.text,
            attachments: dispatcher.attachments
        };

        dispatcher.send();

        expect(dispatcher.webhook.send).toHaveBeenCalledWith(message);
    });

    it('should set the attachments', () => {
        const dispatcher = new Dispatcher(mockConfig);
        const attachments = [{
            field: 'value'
        }];

        dispatcher.withAttachments(attachments);

        expect(dispatcher.attachments).toEqual(expect.arrayContaining(attachments));
    });

    it('should call the IncomingWebhook send function', () => {
        const dispatcher = new Dispatcher(mockConfig);

        dispatcher.text = 'Test message';

        const response = dispatcher.send();

        expect(dispatcher.webhook.send).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(Promise);
    });
});
