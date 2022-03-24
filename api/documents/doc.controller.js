const { addDocument, getDocById, getDoc, updateDoc,deleteDoc } = require('./doc.service');

module.exports = {
    addDocument: (req, res) => {
        const body = req.body;
        addDocument(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error."
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Document added successfully.",
                data: results
            })
        });
    },

    getDoc: (req, res) => {
        getDoc((err, results) => {
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

    getDocById: (req, res) => {
        const id = req.params.id;
        getDocById(id, (err, results) => {
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
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update document."
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
            if (!results) {
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
    }
};