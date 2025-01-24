const Tag = require("../models/tagSchema")

const tagController = {
    getAllTags: (async (req, res) => {

        const tags = await Tag.find();

        if(tags.length > 0) {
        res.status(200).send({msg: "Tags succesfully recieved"})
        } else {
            res.status(404).send({msg: "No tags exist"})
        }

    }),
    createTag: (async (req, res) => {

        const {name} = req.body;

        const tag = new Tag({name});
        const result = await tag.save();

        if(result._id) {
            res.status(201).send({msg: "Tag succesfully recieved"})
        }

    }),
    getTag: ((req, res) => {

    }),
    updateTag: ((req, res) => {

    }),
    deleteTag: ((req, res) => {

    }),

}

module.exports = tagController;