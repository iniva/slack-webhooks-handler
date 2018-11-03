/* global describe it expect */

import factory from './factory';

describe('Factory', () => {
    it('should throw when receiving an invalid webhook type', () => {
        expect(() => {
            const webhook = factory('random'); // eslint-disable-line no-unused-vars
        }).toThrowError(/Webhooks for \[random\] are not available/);
    });

    it('should return a webhook function', () => {
        const webhook = factory('github');

        expect(webhook).toBeInstanceOf(Function);
    });
});