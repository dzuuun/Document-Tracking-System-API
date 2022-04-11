const pool = require('../../db/db');

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            'SELECT username FROM users WHERE username=?',
            [data.username],
            (error, results, fields) => {
                console.log(results);
                if (results.length === 0) {
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
                            return callBack(null, results);
                        }
                    );
                } else {
                    return callBack(results);
                }
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
            'UPDATE users SET username=?, full_name=?, position=?, auth_level=? WHERE user_id = ?',
            [
                data.username,
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

    updateUserPassword: (data, callBack) => {
        pool.query(
            'UPDATE users SET password=? WHERE user_id = ?',
            [
                data.password,
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
                return callBack(null, results);
            }
        );
    },

    getUserByUserName: (username, callBack) => {
        pool.query(
            'SELECT * FROM users LEFT JOIN approving_body ON users.user_id = approving_body.user_id_fk WHERE username = ?',
                        [username],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    assignApprovingBody: (data, callBack) => {
        pool.query(
            'SELECT * FROM approving_body WHERE approving_level=? AND approving_office=? AND user_id_fk=?',
            [
                data.approving_level,
                data.approving_office,
                data.user_id_fk
            ],
            (error, results, fields) => {
                console.log(results);
                if (results.length === 0) {
                    pool.query(
                        'INSERT INTO approving_body(approving_level, approving_office, user_id_fk) VALUES(?,?,?)',
                        [
                            data.approving_level,
                            data.approving_office,
                            data.user_id_fk
                        ],
                        (error, results, fields) => {
                            return callBack(null, results);
                        }
                    );
                } else {
                    return callBack(results);
                }
            }
        );
    },

    getApprovingBody: callBack => {
        pool.query(
            'SELECT users.full_name, users.position, users.auth_level, approving_body.approving_level, approving_body.approving_office FROM users INNER JOIN approving_body ON approving_body.user_id_fk = users.user_id',
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};