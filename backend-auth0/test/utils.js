/**
  * @desc second test during TWEB 2018 test file
  *       this file allows console.log
  * @author Olivier Nicole
*/

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = require('chai');
const { port } = require('../config');

chai.use(chaiHttp);

// /!\ the API must be running
describe('my rest api test', () => {
  it('should show welcome message', (done) => {
    chai.request(`http://localhost:${port}`)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.deep.equal('The API is online');
        done();
      });
  });
});
