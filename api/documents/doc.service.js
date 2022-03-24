const pool = require('../../db/db');


module.exports = {
    addDocument: (data, callBack) => {
        pool.query(
            'INSERT INTO documents(user_id_fk, for_data, from_data, purpose, account_code, project_no, project_title, pr_no, date_posted, rl_no) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [
                data.user_id_fk,
                data.for_data,
                data.from_data,
                data.purpose,
                data.account_code,
                data.project_no,
                data.project_title,
                data.pr_no,
                data.date_posted,
                data.rl_no
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        );
    },

    getDoc: callBack => {
        pool.query(
            'SELECT * FROM documents',
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDocById: (Id, callBack) => {
        pool.query(
            'SELECT * FROM documents WHERE document_id = ?',
            [Id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    updateDoc: (data, callBack) => {
        pool.query(
            'UPDATE documents SET user_id_fk=?, for_data=?, from_data=?, purpose=?, account_code=?, project_no=?, project_title=?, pr_no=?, date_posted=?, rl_no=?, user_id_fk=? WHERE document_id =?',
            [
                data.user_id_fk,
                data.for_data,
                data.from_data,
                data.purpose,
                data.account_code,
                data.project_no,
                data.project_title,
                data.pr_no,
                data.date_posted,
                data.rl_no,
                data.document_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // buggy
    deleteDoc: (data, callBack) => {
        pool.query(
            'DELETE FROM documents WHERE document_id=?',
            [data.document_id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};