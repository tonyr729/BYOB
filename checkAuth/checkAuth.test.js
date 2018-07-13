const checkAuth = require('./checkAuth')
const chai = require('chai');
const should = chai.should();

describe('checkAuth', () => {
  it('should call next if the environment is test', () => {
    let process = {
      env: {
        NODE_ENV: 'test'
      }
    }
    checkAuth();
    
  })

  it('should call next if the the request.body has a token that is authenticated', () => {

  })

  it('should send a response with a status of 401 if the token is not authorized', () => {

  })

  it('should send a response with a status of 403 if the token is not present', () => {

  })
})