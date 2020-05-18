const addContact = require('./logic/add-contact')
const listContacts = require('./logic/list-contacts')

addContact('name', 'surname', 'phone', 'email', 'age', 'birthdate', 'country')
// listContacts()

/* 
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
                              */