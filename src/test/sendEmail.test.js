
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import userEmail from '../testData/userDetail';

const { correctUserEmail, wrongUserEmail, notAnEmail } = userEmail;

chai.use(chaiHttp);
chai.should();

describe('Send Mail Endpoints', () => {
  describe('POST /forgot_password', () => {
    it('should send email', (done) => {
      chai.request(app)
        .post('/api/v1/users/forgot_password')
        .send(correctUserEmail)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('Success, an email has been sent to you');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('email');
          res.body.data.email.should.be.a('string');
          done();
        });
    });
    it('should validate email', (done) => {
      chai.request(app).post('/api/v1/users/forgot_password').send(notAnEmail).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should check if email exist', (done) => {
      chai.request(app).post('/api/v1/users/forgot_password').send(wrongUserEmail).end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql('error');
        res.body.error.should.be.a('string');
        done();
      });
    });
  });
});
