module.exports = signOut

var internals = module.exports.internals = {}
internals.request = require('../utils/request')
internals.clearSession = require('../utils/clear-session')

function signOut (state) {
  return internals.request({
    method: 'DELETE',
    url: state.url + '/session',
    headers: {
      authorization: 'Bearer ' + state.session.id
    }
  })

  .then(function () {
    var username = state.session.account.username

    internals.clearSession({
      cacheKey: state.cacheKey
    })
    delete state.session

    return { username: username }
  })
}