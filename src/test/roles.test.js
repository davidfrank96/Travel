import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);
const testUser3 = {
  email: 'chima.ekeneme@andela.com',
  password: 'Qwertyuiop1!'
};

let testToken = null;
describe('TESTING ROLES ASSIGNMENT ENDPOINT', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(testUser3)
      .end((err, res) => {
        if (err) return done(err);
        testToken = res.body.data.token;
        return done();
      });
  });
  it('should successfully change a user\'s role', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'sebastine.ekeneme@andela.com',
        newRole: 3
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(201);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'data');
        expect((res.body)).to.haveOwnProperty('status').that.equals('success');
        expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
        expect((res.body.data)).to.be.an('object');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.oldRole)).to.be.a('string');
        expect((res.body.data.newRole)).to.be.a('string');
        expect((res.body.data.createdAt)).to.be.a('string');
        done();
      });
  });
  it('should send an error 400 when a non-andelan email is provided', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'chima.ekeneme@ndela.com',
        newRole: 5
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.email)).to.be.an('array');
        expect((res.body.error.email[0])).to.be.an('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when an email field is empty', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: '',
        newRole: 5
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.email)).to.be.an('array');
        expect((res.body.error.email[0])).to.be.an('string');
        expect((res.body.error.email[1])).to.be.an('string');
        expect((res.body.error.email[2])).to.be.an('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when invalid email is provided', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'chima.ekenemendela.com',
        newRole: 5
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.email)).to.be.an('array');
        expect((res.body.error.email[0])).to.be.an('string');
        expect((res.body.error.email[1])).to.be.an('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when an wrong email is entered', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'chima.ekenemeeee@andela.com',
        newRole: 5
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.email)).to.be.an('array');
        expect((res.body.error.email[0])).to.be.an('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 if the role field is empty', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'chima.ekeneme@ndela.com'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.newRole)).to.be.an('array');
        expect((res.body.error.newRole[0])).to.be.a('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 for an out-of-range role input', (done) => {
    chai.request(server)
      .patch('/api/v1/users/role')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        email: 'chima.ekeneme@ndela.com',
        newRole: 20
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.newRole)).to.be.an('array');
        expect((res.body.error.newRole[0])).to.be.a('string');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
});
