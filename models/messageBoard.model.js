const mongoose = require('mongoose');

const messageBoardSchema = mongoose.Schema({

    "boardName":            {type: String, required: true},
    "threads":   [{
        "threadName":       {type: String, required: true},
        "threadPassword": {type: String, required: true},
        "replies":          [{
            "responseComment":  {type: String, required: false},
            "responsePassword": {type: String, required: false}
        }]
    }]
});

module.exports = mongoose.model("messageBoard", messageBoardSchema);