require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('../context')

module.exports = function (workGroupId,summaryId) {
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(summaryId)
    const {token} = context.storage
    String.validate.notVoid(token)


    return call('GET', `${this.API_URL}/summary/${workGroupId}/${summaryId}`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                if(!body) return undefined
                else return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)