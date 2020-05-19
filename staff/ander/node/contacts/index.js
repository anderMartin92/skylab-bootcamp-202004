// const App = require('./components/App')

// App()

const net = require('net')
const listContacts = require('./logic/list-contacts')

const server = net.createServer(socket => {
    console.log('I got in');
    socket.on('data', data => {
        // debugger
        listContacts((error, contacts) => {
            // console.log(contacts)
            if (error) throw error
            // debugger
            socket.write(`HTTP/1.1 200
content-type: text/html

<h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
`)
            // debugger
            socket.end()
        })
    })

    socket.on('error', console.log)
})

server.listen(8080)