const net = require('net')
const sockets=[]
const server = net.createServer(socket=>{
    sockets.push(socket)
    socket.on("data",data=>{
        sockets.forEach(currentSocket=>{
            if(socket!==currentSocket){
                currentSocket.write(data.toString())
            }else{
                currentSocket.write(" ");
            }
        })
        console.log(data.toString())
    })
    socket.on("error",(error)=>{
        console.error(error.message)
    })
    socket.on("end",()=>{
        sockets.splice(sockets.indexOf(socket),1)
    })
})
server.listen(8080)