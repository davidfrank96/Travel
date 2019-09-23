import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('TESTING LOGOUT', () => {
  it('should return "you have logged out successfully" Page', (done) => {
    chai.request(server)
      .post('/api/v1/auth/logout')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect((res.text)).to.be.a('string');
        done();
      });
  });
});
