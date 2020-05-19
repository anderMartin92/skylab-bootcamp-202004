// TODO list all contacts in an array
const path= require ('path')
const fs = require('fs')
function contactList(callback) {
    fs.readdir(path.join(__dirname,'..','data'), (error,totalDir)=>{ //array de archivos en files
        if (error) return callback(error);
        (function extracData(files= totalDir,count=0, contactList=[]) {
            fs.readFile(
                path.join(__dirname,'..','data', files[count]),(error,data)=>{
                    if (error) return callback(error);
                    const contact= JSON.parse(data)
                    contactList.push(contact)
                    count++
                    if (count<files.length) extracData(files,count,contactList)
                    else {
                        let result=`name    surname    phone    email    birth    country`
                        contactList.forEach(({name,surname,email,phone,birth,country}) =>{
                            result += `/n ${name}    ${surname}    ${phone}    ${email}    ${birth}    ${country}`

                        });
                        console.log(result)
                        callback(undefined,result);
                    }

                }
            );
        })()

    });
}
module.exports = contactList