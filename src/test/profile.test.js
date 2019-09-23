import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);
let token = null;
describe('Testing User Profile Page Setting ', () => {
  it('should login a user account on /login POST ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'stephenibaba@andela.com',
        password: 'Jennylove19'
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('User successfully logged in');
        done();
      });
  });

  describe('Testing User Profile Page Setting ', () => {
    it('should fetch a user profile', (done) => {
      chai.request(server)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to get the profile of an unauthorized user', (done) => {
      chai.request(server)
        .get('/api/v1/users/profile')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('Testing User Update Profile Page Setting ', () => {
    it('should not update when the request body is empty ', (done) => {
      chai.request(server)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          done();
        });
    });
    it('should update a user profile', (done) => {
      const profiles = {
        currency: 'naira',
        department: 'qa',
      };
      chai.request(server)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(profiles)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
});
