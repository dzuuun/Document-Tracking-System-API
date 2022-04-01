const { addDocument, getDocInfoById, getAllDoc, updateDoc, deleteDoc, getDocByUserId, getDocTrailById, updateDocStatus, searchDocByUserId, searchAllDoc, getAllDocByOffice } = require('./doc.service');

module.exports = {
    addDocument: (req, res) => {
        const body = req.body;
        addDocument(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Document already exists."
                });
            }
            return res.json({
                success: 1,
                message: "Document added successfully.",
                data: results
            })
        });
    },

    getAllDoc: (req, res) => {
        getAllDoc((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Documents retrieved successfully.",
                data: results
            });
        });
    },

    getDocInfoById: (req, res) => {
        const id = req.params.id;
        getDocInfoById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },

    updateDoc: (req, res) => {
        const body = req.body;
        updateDoc(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (results.changedRows == 0) {
                return res.json({
                    success: 0,
                    message: "Contents are still the same."
                });
            }
            return res.json({
                success: 1,
                message: "Document updated successfully."
            });
        });
    },

    deleteDoc: (req, res) => {
        const data = req.body;
        deleteDoc(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.affectedRows == 0) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document deleted successfully."
            });
        });
    },

    getDocByUserId: (req, res) => {
        const id = req.params.id;
        getDocByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },

    getDocTrailById: (req, res) => {
        const id = req.params.id;
        getDocTrailById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },

    updateDocStatus: (req, res) => {
        const body = req.body;
        updateDocStatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (results.changedRows == 0) {
                return res.json({
                    success: 0,
                    message: "Contents are still the same."
                });
            }
            return res.json({
                success: 1,
                message: "Document's status updated successfully."
            });
        });
    },

    searchDocByUserId: (req, res) => {
        const body = req.body;
        searchDocByUserId(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },

    searchAllDoc: (req, res) => {
        const body = req.body;
        searchAllDoc(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },

    getAllDocByOffice: (req, res) => {
        const body = req.body;
        getAllDocByOffice(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                });
            }
            return res.json({
                success: 1,
                message: "Document retrieved successfully.",
                data: results
            });
        });
    },
};