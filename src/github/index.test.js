/* global describe it expect */

import github from './';

const fakeAuthor = {
    login: 'Codertocat',
    avatar_url: 'https://avatars1.githubusercontent.com/u/21031067?v=4',
    html_url: 'https://github.com/Codertocat'
};
const fakeRepository = {
    name: 'Hello-World',
    full_name: 'Codertocat/Hello-World',
    owner: {
        login: 'Codertocat',
        id: 21031067,
        node_id: 'MDQ6VXNlcjIxMDMxMDY3',
        avatar_url: 'https://avatars1.githubusercontent.com/u/21031067?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/Codertocat',
        html_url: 'https://github.com/Codertocat',
        type: 'User',
        site_admin: false
    },
    html_url: 'https://github.com/Codertocat/Hello-World'
};

describe('Github Webhook', () => {
    it('should throw when not passing headers', () => {
        expect(() => {
            const data = github(); // eslint-disable-line no-unused-vars
        }).toThrow('Event is not present in headers');
    });

    it('should throw when passing invalid headers', () => {
        expect(() => {
            const data = github({'random-header': 'random value'}); // eslint-disable-line no-unused-vars
        }).toThrow('Event is not present in headers');
    });

    it('should throw when passing headers with unavailable event', () => {
        expect(() => {
            const data = github({ 'x-github-event': 'invalid' }); // eslint-disable-line no-unused-vars
        }).toThrow('Event [invalid] is not available in Github webhooks');
    });

    it('should throw when not passing a payload', () => {
        expect(() => {
            const data = github({ 'x-github-event': 'issues' }); // eslint-disable-line no-unused-vars
        }).toThrow('Event [issues] has no payload');
    });

    it('should return a valid object for "release" event', () => {
        const headers = { 'x-github-event': 'release' };
        const payload = {
            release: {
                html_url: 'https://github.com/Codertocat/Hello-World/releases/tag/0.0.1',
                tag_name: '0.0.1',
                published_at: '2018-05-30T20:18:44Z',
                author: fakeAuthor
            },
            repository: fakeRepository
        };
        const data = github(headers, payload);

        expect(typeof data).toEqual('object');
        expect(Object.keys(data)).toEqual(['attachments']);
        expect(typeof data.attachments).toEqual('object');
    });

    it('should return a valid object for "issues" event', () => {
        const headers = { 'x-github-event': 'issues' };
        const payload = {
            action: 'edited',
            issue: {
                html_url: 'https://github.com/Codertocat/Hello-World/issues/2',
                number: 2,
                title: 'Spelling error in the README file',
                user: fakeAuthor,
                labels: [
                    {
                        name: 'bug'
                    }
                ],
                state: 'open',
                updated_at: '2018-05-30T20:18:44Z'
            },
            repository: fakeRepository
        };
        const data = github(headers, payload);

        expect(typeof data).toEqual('object');
        expect(Object.keys(data)).toEqual(['attachments']);
        expect(typeof data.attachments).toEqual('object');
    });
});
