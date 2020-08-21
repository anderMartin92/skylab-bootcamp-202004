const {retrieveSummaryMembers} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { summaryId } } = req
        

        retrieveSummaryMembers(summaryId)
            .then(summaries => res.send(summaries))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}