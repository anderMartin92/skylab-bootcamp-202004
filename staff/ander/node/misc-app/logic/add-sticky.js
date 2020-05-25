    const fs = require('fs')
    const path = require('path')
    require('../utils/string')
    const Email = require('../utils/email')
    const uid = require('../utils/uid')
    require('../utils/json')
    
module.exports = (userId, note, callback) => {
        if (typeof note !== 'object') throw new TypeError(`${contact} is not an object`)
    
    
        const id = uid()
    
        const file = `${id}.json`
        note.user=userId
        note.id= id

    
        fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(note), error => {
            if (error) return callback(error)
    
            callback(null, id)
        })
    }
    