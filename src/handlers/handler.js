module.exports = (client) => {
    console.log('[INFO] Loading handlers')

    const handlers = [
        './configHandler',
        './commandHandler',
        './eventHandler',
        './giveawayHandler'
    ];
    handlers.forEach(handler => require(handler)(client));
};