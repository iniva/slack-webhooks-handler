import { getAuthorDetails } from './helpers';

const release = payload => {
    const { release: { html_url, tag_name, author, published_at }, repository } = payload;
    const authorDetails = getAuthorDetails(author);
    const repoName = repository.name;

    return {
        attachments: [
            {
                fallback: `Release ${tag_name} published for ${repoName}`,
                pretext: `New Release Published for *${repoName}*`,
                color: '#36a64f',
                ...authorDetails,
                title: `Release ${tag_name}`,
                title_link: html_url,
                ts: Date.parse(published_at) / 1000 // eslint-disable-line no-magic-numbers
            }
        ]
    };
};

const issues = payload => {
    const { action, issue, repository } = payload;
    const { html_url, number, title, user, labels, state, updated_at } = issue;
    const authorDetails = getAuthorDetails(user);
    const repoName = repository.name;

    const labelField = {
        title: 'labels',
        value: labels.map(label => label.name).join(', '),
        'short': true
    };
    const stateField = {
        title: 'state',
        value: state,
        'short': true
    };
    const fields = [labelField, stateField];

    return {
        attachments: [
            {
                fallback: `Issue #${number}: ${title}`,
                pretext: `Issue ${action} in *${repoName}*`,
                color: '#36a64f',
                ...authorDetails,
                title: `Issue #${number}: ${title}`,
                title_link: html_url,
                fields,
                ts: Date.parse(updated_at) / 1000 // eslint-disable-line no-magic-numbers
            }
        ]
    };
};

const events = {
    release,
    issues
};
const EVENTS_AVAILABLE = Object.keys(events);

const buildData = (event, payload) => {
    return events[event](payload);
};

export {
    EVENTS_AVAILABLE,
    buildData
};
