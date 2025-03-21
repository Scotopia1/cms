const bcrypt = require('bcrypt');


class Utils {

    static async hashedPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = Utils;