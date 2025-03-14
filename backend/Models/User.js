const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v); // Basic email regex
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    
    password: {
        type: String,
        required: false, // Optional, because OAuth users won't have passwords
    },
    googleId: {
        type: String,
        unique: true, // Ensure unique Google ID
        sparse: true, // Allows Google ID to be optional (non-OAuth users won't have this)
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true, // Same for GitHub
    },
    linkedinId: {
        type: String,
        unique: true,
        sparse: true, // Same for LinkedIn
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Role can only be 'user' or 'admin'
        default: 'user',  // Default role is 'user'
    }
});

// Create the model based on the schema
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
