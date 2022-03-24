const pool = require('../../db/db');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO users(username, password, full_name, position, auth_level) VALUES (?,?,?,?,?)',
            [
                data.username,
                data.password,
                data.full_name,
                data.position,
                data.auth_level
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            'SELECT user_id, username, full_name, position, auth_level FROM users',
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserId: (Id, callBack) => {
        pool.query(
            'SELECT user_id, username, full_name, position, auth_level FROM users WHERE user_id = ?',
            [Id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            'UPDATE users SET username=?, password=?, full_name=?, position=?, auth_level=? WHERE user_id = ?',
            [
                data.username,
                data.password,
                data.full_name,
                data.position,
                data.auth_level,
                data.user_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            'DELETE FROM users WHERE user_id=?',
            [data.user_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserByUserName: (username, callBack) => {
        pool.query(
            'SELECT * FROM users where username = ?',
            [username],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

};