var mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    meta_data:{}
});

const File = mongoose.model("File", fileSchema);

module.exports = File;