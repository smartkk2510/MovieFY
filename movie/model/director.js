const mongoose = require('mongoose');
const directorSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required: true,
            minlength: 2
        }
    }
)

module.exports = mongoose.model("Director",directorSchema)