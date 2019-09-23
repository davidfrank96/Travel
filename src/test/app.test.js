import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('TESTING ENDPOINTS', () => {
  it('should return "Welcome to Barefoot Nomad Endpoints" Page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect((res.text)).to.be.a('string');
        done();
      });
  });
});
