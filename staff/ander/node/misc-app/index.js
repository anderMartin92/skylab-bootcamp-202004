const express = require('express')
const App = require('./components/App')
const Register = require('./components/Register')
const Login = require('./components/Login')
const AddContact = require('./components/AddContact')
const addContactLogic = require('./logic/add-contact')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const Home = require('./components/Home')
const retrieveUser = require('./logic/retrieve-user')
const ListContact = require('./components/ListContacts')
const listContactLogic = require('./logic/list-contacts')
const AddSticky = require('./components/AddSticky')
const addStickyLogic = require('./logic/add-sticky')
const ListStickies = require('./components/ListStickies')
const listStickiesLogic= require('./logic/list-stickies')
const SearchStickies = require('./components/SearchStickies')
const removeSticky = require('./logic/remove-sticky')

const app = express()

app.use(express.static('public'))

app.get('/register', (req, res) => res.send(App(Register()))) // TODO redirect to home if cookie userId exists

app.post('/register', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        const user = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { name, surname, email, password } = user

        registerUser(name, surname, email, password, (error, id) => {
            if (error) throw error // TODO error handling

            res.redirect('/login')
        })
    })
})

app.get('/login', (req, res) => {
    const cookie = req.header('cookie')

    if (cookie) {
        const [, userId] = cookie.split('=')

        if (userId) return res.redirect('/home')
    }

    res.send(App(Login()))
})

app.post('/login', (req, res) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        const credentials = keyValues.reduce((user, keyValue) => {
            const [key, value] = keyValue.split('=')

            user[key] = decodeURIComponent(value)

            return user
        }, {})

        const { email, password } = credentials

        authenticateUser(email, password, (error, userId) => {
            if (error) throw error // TODO error handling

            //res.setHeader('set-cookie', `userId=${userId}`)
            res.cookie('userId', userId)

            res.redirect('/home')
        })
    })
})

app.get('/home', (req, res) => {
    const cookie = req.header('cookie')

    if (!cookie) return res.redirect('/login')

    const [, userId] = cookie.split('=')

    if (!userId) return res.redirect('/login')

    retrieveUser(userId, (error, { name }) => {
        if (error) throw error // TODO error handling

        res.send(App(Home(name)))
    })
})

app.get('/home/addContact', (req, res) => {
    
    res.send(App(AddContact()))
})
    app.post('/home/addContact', (req, res) => {
        let body = ''
        const cookie = req.header('cookie')

        if (!cookie) return res.redirect('/login')

        const [, userId] = cookie.split('=')
        req.on('data', chunk => body += chunk)
    
        req.on('end', () => {
            
    
            const keyValues = body.split('&')
    
            const credentials = keyValues.reduce((user, keyValue) => {
                const [key, value] = keyValue.split('=')
    
                user[key] = decodeURIComponent(value)
    
                return user
            }, {})
    
            
    
            addContactLogic(userId, credentials, (error, id) => {
                if (error) throw error // TODO error handling
    
    
                res.redirect('/home')
            })
        })
    })
    app.get('/home/listContact', (req, res) => {
        const cookie = req.header('cookie')
    
        if (!cookie) return res.redirect('/login')
    
        const [, userId] = cookie.split('=')
    
        if (!userId) return res.redirect('/login')
       
            listContactLogic(userId, (error, contacts)=>{
                if(error)throw callback(error)
            res.send(App(ListContact(contacts)))
            })
        })
       
    app.get('/home/addSticky', (req,res)=>{

        res.send(App(AddSticky()))

    })

    app.post('/home/addSticky', (req,res)=>{debugger
        let body = ''
        const cookie = req.header('cookie')

        if (!cookie) return res.redirect('/login')

        const [, userId] = cookie.split('=')
        req.on('data', chunk => body += chunk)
    
        req.on('end', () => {
            
    
            const keyValues = body.split('&')
    
            const note = keyValues.reduce((user, keyValue) => {
                const [key, value] = keyValue.split('=')
    
                user[key] = decodeURIComponent(value)
    
                return user
            }, {})
    
            
          
            addStickyLogic(userId, note, (error, id) => {
                if (error) throw error // TODO error handling
    

                res.redirect('/home')
            })
        })
    })
        

    app.get('/home/searchSticky', (req,res)=>{

        res.send(App(SearchStickies()))

    })

    app.post('/home/searchSticky', (req,res)=>{debugger
        let body = ''
        const cookie = req.header('cookie')

        if (!cookie) return res.redirect('/login')

        const [, userId] = cookie.split('=')
        req.on('data', chunk => body += chunk)
    
        req.on('end', () => {
            
    
            const keyValues = body.split('&')
    
            const _query = keyValues.reduce((user, keyValue) => {
                const [key, value] = keyValue.split('=')
    
                user[key] = decodeURIComponent(value)
    
                return user
            }, {})
    
            const {query}=_query
            debugger
            listStickiesLogic(userId, query, (error, results) => {
                if (error) throw error // TODO error handling
    
                res.send(App(ListStickies(results)))
    
            })
        })
    })
    
    app.get('/list-stickies/:id', (req, res) => {
        const {id} = req.params
        let body = ''
            const cookie = req.header('cookie')
    
            if (!cookie) return res.redirect('/login')
    
            const [, userId] = cookie.split('=')
    
        req.on('data', chunk => body += chunk)
    
        req.on('end', () => {
           
                if (userId) {
                    removeSticky(userId, id, (error, feedback)=> {
                        if (error) throw error
                        if (feedback) return res.redirect('/home/searchSticky')
                        else throw new Error('something went wrong')
                        
                    })
                }
           
        })
    })  
    
app.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

app.listen(8081, () => console.log('server running'))