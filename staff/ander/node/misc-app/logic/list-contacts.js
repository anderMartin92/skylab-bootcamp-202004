require('../utils/string')
const Email = require('../utils/email')
const fs = require('fs')
const uid = require('../utils/uid')
require('../utils/function')
const path = require('path')
require('../utils/json')
const { find } = require('../data/contacts')
module.exports = (userId, callback) => {
    const contacts = []
    // TODO validate input fields
    // TODO check user exists, otherwise error

    /* fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {debugger
                    const contact = JSON.parse(json)

                    contact.id = file.substring(0, file.indexOf('.json'))
                    if(contact.user === userId)
                        contacts.push(contact)

                    if (contacts.length === files.length) callback(null, contacts)
                }
            })
        })
    }) */
    user=userId
    find({ user }, (error, _user) => {
        if (error) return callback(error)
                                
        if (!user) return callback(new Error(`you dont have contacts!`))
        
        

        callback(null, _user)
    })
}