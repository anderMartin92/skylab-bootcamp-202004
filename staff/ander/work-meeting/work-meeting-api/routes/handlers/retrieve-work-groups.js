const {retrieveWorkGroups} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }} = req

        retrieveWorkGroups(userId)
            .then(workGroups => res.status(200).send(workGroups))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}