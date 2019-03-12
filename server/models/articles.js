const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
{ 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article