const { createUser, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserName, assignApprovingBody, updateUserPassword } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Username already exists. Try again a different username."
                });
            }
            return res.json({
                success: 1,
                message: "User added successfully.",
                data: results
            })
        });
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
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
                message: "User information retrieved successfully.",
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
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
                message: "Users information retrieved successfully.",
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        updateUser(body, (err, results) => {
            console.log(results);
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
                message: "User information updated successfully."
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
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
                message: "User deleted successfully."
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserName(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid username or password."
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "my-32-character-ultra-secure-and-ultra-long-secret", {
                    expiresIn: "4h"
                });
                res.cookie('username', body.username);
                return res.json({
                    success: 1,
                    message: "User logged in successfully.",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid username or password."
                });
            }
        });
    },

    assignApprovingBody: (req, res) => {
        const body = req.body;
        assignApprovingBody(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "User as an Approving Body already exists."
                });
            }
            return res.json({
                success: 1,
                message: "Assigned user as an Approving Body successfully.",
                data: results
            })
        });
    },

    updateUserPassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUserPassword(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                return false;
            }
            if (results.changedRows == 0) {
                return res.json({
                    success: 0,
                    message: "Password is still the same."
                });
            }
            return res.json({
                success: 1,
                message: "User password updated successfully."
            });
        });
    },
};  