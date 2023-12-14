const { GiveawaysManager: gw } = require('discord-giveaways');
const giveawayModel = require('../schemas/giveawaySchema');

class GiveawaysManager extends gw {
    async getAllGiveaways() {
        return await giveawayModel.find().lean().exec();
    }

    async saveGiveaway(messageId, giveawayData) {
        return await giveawayModel.create(giveawayData);
    }

    async editGiveaway(messageId, giveawayData) {
        return await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
    }

    async deleteGiveaway(messageId) {
        return await giveawayModel.deleteOne({ messageId }).exec();
    }
}

module.exports = (client) => {
    client.giveawayManager = new GiveawaysManager(client, {
        default: {
            botsCanWin: false,
            embedColor: client.config.color,
            embedColorEnd: client.config.color,
            reaction: '🎉',
        },
    });
    console.log('[INFO] Loaded giveaway handler')
}
