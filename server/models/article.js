const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema ({
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image: {
        type: String,
        default: 'https://iweek.org.za/wp-content/uploads/2015/09/no-profile-photo1.jpg'
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article