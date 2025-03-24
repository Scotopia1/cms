const bcrypt = require('bcrypt');


class Utils {

    static async hashedPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = Utils;