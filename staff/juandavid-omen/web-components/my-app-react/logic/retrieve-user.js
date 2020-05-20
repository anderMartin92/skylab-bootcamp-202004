function retrieveUser(token, callback) {
    String.validate(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { "Authorization": `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
            
            if (status == 200) {
                const user = JSON.parse(body)
                
                callback(undefined, { name: user.name, surname: user.surname, email: user.username })
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))            
            }
        }
    );
};