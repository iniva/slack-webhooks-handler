/* global describe it expect */

import * as library from './';
import Webhook from './webhook';
import factory from './factory';

describe('Slack Webhooks Handler Library', () => {
    it('should export the Webhook class and the Factory function', () => {
        expect(library.Webhook).toEqual(Webhook);
        expect(library.factory).toEqual(factory);
    });
});
