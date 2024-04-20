const Group = require('../models/group');

const getGroupList = async (req, res) => {
    let page = 0;
    let per_page = 100;
    let findQuery = {};
    console.log(req.query);
    if (req.query.per_page > 0) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    try {
        const groups = await Group.find(findQuery, null, { skip: page * per_page, limit: per_page });
        res.status(200).json(groups);
    } catch (err) {
        console.log(err);
    }
}

const createGroup = async (req, res) => {
    const newGroup = new Group(req.body);
    try {
        const group = await Group.create(newGroup);
        res.status(200).json(group);
    } catch (err) {
        console.log(err);
    }
}

const updateGroup = async (req, res) => {
    const updateGroup = req.body;
    try {
        const group = await Group.findByIdAndUpdate(updateGroup._id, updateGroup, { new: true });
        res.status(200).json(group);
    } catch (err) {
        console.log(err);
    }
}

const deleteGroup = async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await Group.findByIdAndDelete(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.log(err);
    }
}

const getGroupById = async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await Group.findById(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getGroupList,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById
}