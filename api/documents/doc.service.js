const pool = require('../../db/db');

module.exports = {
    addDocument: (data, callBack) => {
        pool.query(
            'SELECT pr_no FROM documents WHERE pr_no=?',
            [data.pr_no],
            (error, results, fields) => {
                if (results.length === 0) {
                    pool.query(
                        'INSERT INTO documents(user_id_fk, for_data, from_data, purpose, account_code, project_no, project_title, pr_no, date_posted, rl_no, office_approval) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
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
                            data.office_approval
                        ],
                        (error, results, fields) => {
                            pool.query(
                                'SELECT approving_body_id from approving_body WHERE NOT approving_level="Recommending Approval"',
                                [],
                                (error, result, fields) => {
                                    console.log(result);
                                    pool.query(
                                        'SELECT approving_body_id from approving_body WHERE approving_level="Recommending Approval" AND approving_office = ?',
                                        [data.office_approval],
                                        (error, res, fields) => {
                                            var values = [
                                                [results.insertId, result[0].approving_body_id],
                                                [results.insertId, res[0].approving_body_id],
                                                [results.insertId, result[1].approving_body_id],
                                                [results.insertId, result[2].approving_body_id]
                                            ];
                                            console.log(data.office_approval + " " + results.insertId);
                                            pool.query(
                                                'INSERT INTO trail(document_id_fk, approving_body_id_fk) VALUES ?',
                                                [values],
                                                function (err) {
                                                    if (err) throw err;
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                            return callBack(null, results);
                        }
                    );
                } else {
                    return callBack(results);
                }
            }
        );
    },

    getAllDoc: callBack => {
        pool.query(
            'SELECT documents.document_id, users.user_id, documents.pr_no, documents.project_title, DATE_FORMAT(documents.date_posted, "%M %d, %Y") AS date_posted, users.full_name, documents.from_data, documents.status FROM documents INNER JOIN users ON documents.user_id_fk = users.user_id',
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDocInfoById: (Id, callBack) => {
        pool.query(
            'SELECT user_id_fk, for_data, from_data, purpose, account_code, project_no, project_title, pr_no, DATE_FORMAT(date_posted, "%M %d, %Y") AS date_posted, rl_no, status, remarks, office_approval FROM documents WHERE documents.document_id = ?',
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
            'UPDATE documents SET user_id_fk=?, for_data=?, from_data=?, purpose=?, account_code=?, project_no=?, project_title=?, pr_no=?, date_posted=?, rl_no=?, office_approval=? WHERE document_id =?',
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
                data.office_approval,
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

    deleteDoc: (data, callBack) => {
        pool.query(
            'DELETE FROM documents WHERE document_id=?',
            [data.document_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDocByUserId: (id, callBack) => {
        pool.query(
            'SELECT document_id, user_id_fk, pr_no, project_title, DATE_FORMAT(date_posted, "%M %d, %Y") AS date_posted, office_approval, status FROM documents WHERE documents.user_id_fk=?',
            [id],
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDocTrailById: (Id, callBack) => {
        pool.query(
            'SELECT trail_log.trail_log_id,  DATE_FORMAT(trail_log.date, "%M %d, %Y %h:%i:%s %p") AS date, users.full_name, users.position, approving_body.approving_level, trail_log.action_taken, approving_body.approving_body_id, users.user_id, documents.document_id, trail.trail_id FROM trail_log INNER JOIN trail ON trail_log.trail_id_fk = trail.trail_id INNER JOIN documents ON trail.document_id_fk = documents.document_id INNER JOIN approving_body ON trail.approving_body_id_fk = approving_body.approving_body_id INNER JOIN users ON users.user_id = approving_body.user_id_fk WHERE trail.document_id_fk = ? ORDER BY trail_log.date DESC;',
            [Id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateDocStatus: (data, callBack) => {
        pool.query(
            'UPDATE documents SET status=?, remarks=? WHERE document_id =?',
            [
                data.status,
                data.remarks,
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

    searchDocByUserId: (data, callBack) => {
        pool.query(
            'SELECT document_id, user_id_fk, pr_no, project_title, DATE_FORMAT(date_posted, "%M %d, %Y") AS date_posted, from_data, status FROM documents WHERE pr_no LIKE "' + data.pr_no + '%" AND user_id_fk=?',
            [
                data.user_id_fk
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchAllDoc: (data, callBack) => {
        pool.query(
            'SELECT documents.document_id, users.user_id, documents.pr_no, documents.project_title, DATE_FORMAT(documents.date_posted, "%M %d, %Y") AS date_posted, users.full_name, documents.from_data, documents.status FROM documents INNER JOIN users ON documents.user_id_fk = users.user_id WHERE pr_no LIKE "' + data.pr_no + '%"',
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // not sure pa grrr
    getAllDocByOffice: (data, callBack) => {
        pool.query(
            'SELECT  documents.document_id, users.user_id, documents.pr_no, documents.project_title, DATE_FORMAT(documents.date_posted, "%M %d, %Y") AS date_posted,users.full_name, documents.from_data, documents.status FROM documents INNER JOIN trail ON trail.document_id_fk = documents.document_id INNER JOIN approving_body on trail.approving_body_id_fk = approving_body.approving_body_id INNER JOIN users ON users.user_id = documents.user_id_fk WHERE approving_body.approving_body_id = ?',
            [
                data.approving_body_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // wurag not needed
    updateActionTaken: (data, callBack) => {
        pool.query(
            'UPDATE trail_log SET action_taken=? WHERE trail_log_id=?',
            [
                data.action_taken,
                data.trail_log_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    addTrailLog: (data, callBack) => {
        pool.query(
            'INSERT INTO trail_log(trail_id_fk, action_taken) VALUES (?,?)',
            [
                data.trail_id,
                data.action_taken
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                if (data.action_taken === "Disapproved") {
                    pool.query(
                        'UPDATE documents SET status=?, remarks=? WHERE document_id =?',
                        [
                            "Rejected",
                            data.remarks,
                            data.document_id
                        ], (error, results, fields) => {
                            if (error) {
                                callBack(error);
                            }
                        }
                    );
                }
                if (data.action_taken === "Approved") {
                    pool.query(
                        'UPDATE documents SET status=? WHERE document_id =?',
                        [
                            "Complete",
                            data.document_id
                        ], (error, results, fields) => {
                            if (error) {
                                callBack(error);
                            }
                        }
                    );
                }

                if (data.action_taken === "Received" || data.action_taken === "Forwarded") {
                    pool.query(
                        'UPDATE documents SET status=? WHERE document_id =?',
                        [
                            "Routing for approval",
                            data.document_id
                        ], (error, results, fields) => {
                            if (error) {
                                callBack(error);
                            }
                        }
                    );
                }
                return callBack(null, results);
            }
        );
    }
};