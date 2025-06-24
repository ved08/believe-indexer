module.exports = {
    apps: [
        {
            name: "believe-indexer",
            script: "src/index.js",
            watch: false,
        },
        {
            name: "believe-api-2",
            script: "src/server.js",
            watch: false,
        }
    ]
};
