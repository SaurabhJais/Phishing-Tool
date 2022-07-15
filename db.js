let MongoClient = require("mongodb").MongoClient
let url = "mongodb+srv://saurabhjaiswal:Yq4dtl6tOuonDuzU@cluster0.nsssh.mongodb.net/test?authMechanism=DEFAULT"




var _db;

module.exports = {

    connectToServer: async function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            _db = client.db('phishing');

            _db.listCollections().toArray().then((result) => {
                let collections = [];
                result.map((k) => {
                    collections.push(k.name)
                })

                // Create collection named "users" if not present
                if (collections.indexOf("users") == -1) {
                    _db.createCollection("users").then((res) => {
                        console.log("Collection created successfully")
                    }).catch((err) => {
                        throw err;
                    })
                }

            })

            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};