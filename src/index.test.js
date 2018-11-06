/* global describe it expect */

import * as library from './';
import Dispatcher from './dispatcher';
import factory from './factory';

describe('Slack Webhooks Handler Library', () => {
    it('should export the Dispatcher class and the Factory function', () => {
        expect(library.Dispatcher).toEqual(Dispatcher);
        expect(library.factory).toEqual(factory);
    });
});
