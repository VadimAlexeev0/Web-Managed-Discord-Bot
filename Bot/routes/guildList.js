module.exports = {
    route: "/guild-list",
    type: "GET",
    version: 1,
	execute(req, res, client) {
        res.json(client.guilds.cache)
	},
};
