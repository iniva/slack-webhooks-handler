import { getEventFromHeaders } from './helpers';
import * as events from './events';

const github = (headers, payload) => {
    const event = getEventFromHeaders(headers);

    if (!Object.keys(events).includes(event)) {
        throw new Error(`Event [${event}] is not available in Github webhooks`);
    }

    if (!payload) {
        throw new Error(`Event [${event}] has no payload`);
    }

    return events[event](payload);
};

export default github;
