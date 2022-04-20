var bcrypt = require('bcrypt');
var redis = require('redis');
var db = redis.createClient();
db.on('error', err => console.log('Redis Client Error', err));
db.connect();

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save(cb) {
        if (this.id) {
            this.update(cb);
            return;
        }
        db.incr('user:ids')
            .then(id => {
                console.log(id, 'id');
                this.id = id;
                this.hashPassword(err => {
                    if (err) return cb(err);
                    this.update(cb);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    update(cb) {
        const id = this.id;
        db.set(`user:id:${this.name}`, id)
            .then(() => {
                db.HSET(`user:${id}`, this)
                    .then(res => {
                        cb(null);
                    })
                    .catch(err => {
                        cb(err);
                    });
            })
            .catch(err => {
                cb(err);
            });
    }

    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err);
                this.pass = hash;
                cb();
            });
        });
    }
    static getByName(name, cb) {
        User.getId(name)
            .then(id => {
                User.get(id, cb);
            })
            .catch(err => {
                cb(err);
            });
    }

    static get(id, cb) {
        db.hGetAll(`user:${id}`)
            .then(res => {
                cb(null, new User(res));
            })
            .catch(err => {
                cb(err);
            });
    }

    static getId(name) {
        return db.get(`user:id:${name}`);
    }

    static authenticate(name, pass, cb) {
        User.getByName(name, (err, user) => {
            if (err) return cb(err);
            if (!user.id) return cb();
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return cb(err);
                if (hash == user.pass) {
                    return cb(null, user);
                }
                cb();
            });
        });
    }

    toJJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = User;
