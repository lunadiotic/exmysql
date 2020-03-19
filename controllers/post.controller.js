const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return ;
    }

    // Create a Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Post in the database
    Post.create(post)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            })
        });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%`}} : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: {id: id}
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Tutorial was updated successfully."
            })
        } else {
            res.send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Posts
exports.findAllPublished = (req, res) => {

};