const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        postID: {
            type: String, // reference to Post.postID
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
