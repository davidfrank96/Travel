import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);
const testUser3 = {
  email: 'sebastine.ekeneme@andela.com',
  password: 'Qwertyuiop$'
};

let testToken = null;
describe('TESTING PERMISSIONS ASSIGNMENT ENDPOINT', () => {
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
  it('should add permission to a role', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        addPermission: 'canAuthorize',
        role: 4
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
        expect((res.body.data.role)).to.be.a('number');
        expect((res.body.data.permissions)).to.be.an('array');
        expect((res.body.data.permissions[0])).to.be.a('string');
        expect((res.body.data.permissions[1])).to.be.a('string');
        expect((res.body.data.permissions[2])).to.be.a('string');
        expect((res.body.data.permissions[3])).to.be.a('string');
        done();
      });
  });
  it('should get error 400 if an attempt is made again to add an already existing permission', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        addPermission: 'canAuthorize',
        role: 4
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'message');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('message').that.is.a('string');
        done();
      });
  });
  it('should remove permission from a role', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        removePermission: 'canAuthorize',
        role: 4
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
        expect((res.body.data.role)).to.be.a('number');
        expect((res.body.data.permissions)).to.be.an('array');
        expect((res.body.data.permissions[0])).to.be.a('string');
        expect((res.body.data.permissions[1])).to.be.a('string');
        expect((res.body.data.permissions[2])).to.be.a('string');
        done();
      });
  });
  it('should get error 400 if an attempt is made again to remove a permission that has already been taken dowm', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        removePermission: 'canAuthorize',
        role: 4
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'message');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('message').that.is.a('string');
        done();
      });
  });
  it('should add permission to a role', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        addPermission: 'canAuthorize',
        role: 4
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
        expect((res.body.data.role)).to.be.a('number');
        expect((res.body.data.permissions)).to.be.an('array');
        expect((res.body.data.permissions[0])).to.be.a('string');
        expect((res.body.data.permissions[1])).to.be.a('string');
        expect((res.body.data.permissions[2])).to.be.a('string');
        expect((res.body.data.permissions[3])).to.be.a('string');
        done();
      });
  });
  it('should send an error 400 when an out-of-range role is inputted', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        addPermission: 'canAuthorize',
        role: 25
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.role)).to.be.an('array');
        expect((res.body.error.role[0])).to.be.an('string');
        done();
      });
  });
  it('should send an error 400 when no permission value is given', (done) => {
    chai.request(server)
      .patch('/api/v1/users/set_permission')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        role: 4
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.error.permission)).to.be.an('array');
        expect((res.body.error.permission[0])).to.be.an('string');
        done();
      });
  });
});
