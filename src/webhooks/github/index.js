import { getEventFromHeaders } from './helpers';
import { EVENTS_AVAILABLE, buildData } from './events';

const github = (headers, payload) => {
    const event = getEventFromHeaders(headers);

    if (!EVENTS_AVAILABLE.includes(event)) {
        throw new Error(`Event [${event}] is not available in Github webhooks`);
    }

    if (!payload) {
        throw new Error(`Event [${event}] has no payload`);
    }

    return buildData(event, payload);
};

export default github;
