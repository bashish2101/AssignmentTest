const userModel = require('../models/userModel');
const db = require("./dbServices");

exports.getAllUsers = async (req) => {
    let skip = req.body.skip || 0
    let limit = req.body.limit || 10

    let search = {}
    if (req.body.search) {
        search = {
            $or: [
                { 'fname': { '$regex': req.body.search, '$options': 'i' } },
                { 'lname': { '$regex': req.body.search, '$options': 'i' } },
                { 'address': { '$regex': req.body.search, '$options': 'i' } },
                { 'email': { '$regex': req.body.search, '$options': 'i' } }
            ]
        }
    }

    let sort = {}
    if (req.body.sortType && req.body.sortColumn) { console.log("okkk")
        let type = req.body.sortType == "asc" ? 1 : -1
        sort = { [req.body.sortColumn]: type }
    }

    let users = await db.findWithPagination(userModel, search, skip, limit, sort);
    return users
}

exports.createUser = async (req) => {
    let users = await db.saveData(userModel, req.body);
    return users
}

exports.updateUser = async (req) => {
    let users = await db.findAndUpdate(userModel, { _id: req.params.id }, req.body, { new: true });
    return users
}

exports.getUserById = async (req) => {
    let user = await db.findOne(userModel, { _id: req.params.id });
    return user
}