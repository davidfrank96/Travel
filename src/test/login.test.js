import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('User login', () => {
  it('should login a user account on /login POST ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'stephenibaba@andela.com',
        password: 'Jennylove19'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('User successfully logged in');
        done();
      });
  });

  it('should return an invalid login when the password or email is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'stephenibaba@andela.com',
        password: 'Jennylove22'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid email or password');
        done();
      });
  });
});
