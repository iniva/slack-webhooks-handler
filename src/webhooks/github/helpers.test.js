/* global describe it expect */

import { getAuthorDetails, getEventFromHeaders } from './helpers';

describe('Webhooks: Github - Helpers', () => {
    it('should return the author details', () => {
        const extendedAuthor = {
            login: 'Codertocat',
            id: 21031067,
            node_id: 'MDQ6VXNlcjIxMDMxMDY3',
            avatar_url: 'https://avatars1.githubusercontent.com/u/21031067?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/Codertocat',
            html_url: 'https://github.com/Codertocat',
            followers_url: 'https://api.github.com/users/Codertocat/followers',
            following_url: 'https://api.github.com/users/Codertocat/following{/other_user}',
            gists_url: 'https://api.github.com/users/Codertocat/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/Codertocat/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/Codertocat/subscriptions',
            organizations_url: 'https://api.github.com/users/Codertocat/orgs',
            repos_url: 'https://api.github.com/users/Codertocat/repos',
            events_url: 'https://api.github.com/users/Codertocat/events{/privacy}',
            received_events_url: 'https://api.github.com/users/Codertocat/received_events',
            type: 'User',
            site_admin: false
        };
        const expected = {
            author_name: 'Codertocat',
            author_link: 'https://github.com/Codertocat',
            author_icon: 'https://avatars1.githubusercontent.com/u/21031067?v=4'
        };
        const author = getAuthorDetails(extendedAuthor);

        expect(typeof author).toEqual('object');
        expect(author).toMatchObject(expected);
    });

    it('should throw if Github Event is not found in headers', () => {
        const headersSent = {
            'a-header': 'a value',
            'another-header': 'another value'
        };

        expect(() => {
            const event = getEventFromHeaders(headersSent); // eslint-disable-line no-unused-vars 
        }).toThrow('Event is not present in headers');
    });

    it('should find Github Event in headers', () => {
        const headersSent = {
            'a-header': 'a value',
            'another-header': 'another value',
            'x-github-event': 'event_example'
        };
        const expected = 'event_example';
        const event = getEventFromHeaders(headersSent);

        expect(typeof event).toEqual('string');
        expect(event).toEqual(expected);
    });
});
