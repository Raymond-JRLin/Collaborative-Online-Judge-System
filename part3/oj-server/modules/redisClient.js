var redis = require('redis'); // read redis package
var client = redis.createClient(); // encapsulate redis client to use singleton

function set(key, value, callback) {
    client.set(key, value, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function get(key, callback) {
    client.get(key, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function expire(key, timeInSeconds) {
    client.expire(key, timeInSeconds);
}

function quit() {
    client.quit();
}

module.exports = {
    get: get,
    set: set,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
}
