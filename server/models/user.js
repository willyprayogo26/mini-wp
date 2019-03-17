const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let userSchema = new Schema ({
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate: [
            {
                validator: function(v) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
                },
                message: 'Invalid Email'
            },
            {
                validator: function(v) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: v
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false
                        }
                    })
                    .catch(err => {
                        return err.message
                    })
                },
                message: 'Email has been used'
            }
        ]
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(v)
            },
            message: 'Password must contain at least one letter, one number, and minimum six characters'
        }
    },
    listArticle: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})

userSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hash(this.password)
        this.email = this.email.toLowerCase()
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User