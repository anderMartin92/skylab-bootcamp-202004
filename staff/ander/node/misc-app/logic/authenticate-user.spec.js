const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
const login = require('./authenticate-user')

describe.only('authenticateUser', () => {
    let _name, _surname, _email, _password, _id

    beforeEach((done) => {
        _name = `name-${random()}`
        _surname = `surname-${random()}`
        _email = `e-${random()}@mail.com`
        _password = `password-${random()}`
        _id = uid()

        const user = {} 
        user.name = _name
        user.password = _password
        user.email = _email
        user.surname=_surname
        user.id = _id

        fs.writeFile(path.join(__dirname,'..','data','users',`${_id}.json`),JSON.stringify(user,null,4),(error)=>{
            if(error) return done(error)
            done() 
        })
        
    })

    it('should succeed on valid data', done => { debugger
        login(_email, _password ,(error, user, isAuthenticated) => { // WARN do not use uid directly... create a user first in before each
            const {name, id} = user
            expect(error).to.be.null
            expect(isAuthenticated).to.equal(true)
            
            expect(id).to.be.a('string')
            expect(name).to.be.a('string')
            expect(name).to.equal(_name)
            expect(id).to.equal(_id)
            done()
            })
        })
   

    // TODO clean data (on after)
})