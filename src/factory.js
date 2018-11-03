import github from './github';

const factory = type => {
    const webhooks = {
        github
    };

    if (!Object.keys(webhooks).includes(type)) {
        throw new Error(`Webhooks for [${type}] are not available`);
    }

    return webhooks[type];
}

export default factory;
