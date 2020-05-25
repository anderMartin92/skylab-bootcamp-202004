require('../utils/string')
const Email = require('../utils/email')
const fs = require('fs')
const uid = require('../utils/uid')
require('../utils/function')
const path = require('path')
require('../utils/json')
module.exports = (userId, query, callback) => {
    // TODO validate input fields
    
    // TODO check user exists, otherwise error

    // TODO retrieve stickies from this user and return them if exist, otherwise return []
    Function.validate(callback)

    fs.readdir(path.join(__dirname, '..','data','stickies'), (error, files) => {debugger
        if (error) return callback(error)
        debugger
        files = files.filter(file => path.extname(file) === '.json')

        const results = []

        if (!files.length) return callback(null, results)

        let i = 0;
       
        (function readFile() {
            fs.readFile(path.join(__dirname,'..','data','stickies', files[i]), 'utf8', (error, json) => {
                if (error) return callback(error)

                const existing = JSON.parse(json)
                let {note, user} = existing
                if(user===userId){
                if(note.includes(query))
                results.push(existing)

                }
                
                if (++i < files.length) return readFile()
                debugger
                callback(null, results)
            })
        })()
    })
}