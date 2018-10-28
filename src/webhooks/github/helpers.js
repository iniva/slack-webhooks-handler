export const getAuthorDetails = author => {
    const { login, html_url, avatar_url } = author;

    return {
        author_name: login,
        author_link: html_url,
        author_icon: avatar_url
    };
};

export const getEventFromHeaders = (headers = {}) => {
    if (!Object.keys(headers).includes('x-github-event')) {
        throw new Error('Event is not present in headers');
    }

    return headers['x-github-event'];
};
