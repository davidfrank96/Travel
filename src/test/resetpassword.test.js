
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import userDetails from '../testData/userDetail';

const {
  correctUserPassword, misMatchedUserPassword, lessUserPassword,
  invalidToken, correctUserEmail, noAlphaNumericPassword
} = userDetails;

let correctUserToken;
chai.use(chaiHttp);
chai.should();
describe('Reset Password Endpoints', () => {
  before('Get request tokens', async () => {
    try {
      const url = '/api/v1/users/forgot_password';
      const responseOne = await chai.request(app).post(url).send(correctUserEmail);
      correctUserToken = responseOne.body.data.token;
    } catch (error) {
      return error;
    }
  });
  describe('PUT /forgot_password:token', () => {
    it('should validate token', (done) => {
      chai.request(app)
        .put(`/api/v1/users/forgot_password/${invalidToken}`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Access denied.Unauthorized request.');
          done();
        });
    });
    it('should validate user password with correct token', (done) => {
      chai.request(app)
        .put(`/api/v1/users/forgot_password/${correctUserToken}`)
        .send(misMatchedUserPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Passwords Do Not Match');
          done();
        });
    });
    it('should validate user password with correct token for special characters', (done) => {
      chai.request(app)
        .put(`/api/v1/users/forgot_password/${correctUserToken}`)
        .send(noAlphaNumericPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Password must be contain at least one number, one special character and one alphabet');
          done();
        });
    });
    it('should validate user password for length with correct token', (done) => {
      chai.request(app)
        .put(`/api/v1/users/forgot_password/${correctUserToken}`)
        .send(lessUserPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Password must be between 8 to 20 characters long.');
          done();
        });
    });
    it('Should reset user password', (done) => {
      chai.request(app)
        .put(`/api/v1/users/forgot_password/${correctUserToken}`)
        .send(correctUserPassword)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('Password Successfully Updated');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('userId');
          res.body.data.userId.should.be.a('number');
          res.body.data.should.have.property('userEmail');
          res.body.data.userEmail.should.be.a('string');
          done();
        });
    });
  });
});
