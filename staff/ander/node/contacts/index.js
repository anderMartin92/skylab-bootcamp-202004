const readline = require('readline')
const fs = require('fs')

const prompt =readline.createInterface({

    input: process.stdin,
    output: process.stdout
})

const contact = {
    
}

prompt.question("What's your name?", name =>{
    contact.name = name

    prompt.question("What's your surname?", surname =>{
        contact.surname = surname

        prompt.question("What's your phone ?", phone =>{
            contact.phone = phone

            prompt.question("What's your email ?", email =>{
                contact.email = email

                prompt.question("What's your URL?", url =>{
                    contact.url = url

                    prompt.question("What's your instagram?", instagram=>{
                        contact.instagram = instagram

                        prompt.question("What's your facebook?", facebook =>{
                            contact.facebook = facebook

                            prompt.question("What's your twitter?", twitter =>{
                                contact.twitter = twitter

                                prompt.question("What's your fwitter?", fwitter =>{
                                    contact.fwitter = fwitter

                                    prompt.question("What's your tiktok?", tiktok =>{
                                        contact.tiktok = tiktok
                                        
                                        const jsonContact = JSON.stringify(contact)
                                        let cont=0
                                        function checkName(title) {
                                            let itExists = false;
                                            cont++
                                            fs.readdir('.', (error, files)=>{
                                                itExists = files.find(item =>{
                                                item === title
                                                })
                                                
                                                if(itExists){
                                                    title=`${contact.name}-${contact.surname}${cont}.json` 
                                                    checkName(title)
                                                } else{
                                                    console.log(title)
                                                    return title 
                    
                                                }
                                            }) 
                                        }

                                        const dir = checkName(`${contact.name}-${contact.surname}.json`)                              
                                        
                                        fs.writeFile(dir, jsonContact, error =>{
                                           if (error) throw error
                                           prompt.close()
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
