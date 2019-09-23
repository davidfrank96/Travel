import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import user from './__MOCK__/user';
import server from '../index';
import models from '../models';
import constants from '../utils/constants/constants';

chai.use(chaiHttp);
const url = '/api/v1/auth/signup';
let createdUserId = null;

describe('JWT Return and Authentication', () => {
  after(async () => {
    const { Users } = models;
    await Users.destroy({
      where: {
        userId: createdUserId
      }
    });
  });
  it('should return a jwt when a user successfully signs up', done => {
    const cloneUser = { ...user };
    cloneUser.email = 'joeyking@andela.com';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(201);

          const { body } = res;

          expect(body).to.have.property('status');
          expect(body).to.have.property('data');
          expect(body).to.have.property('message');

          const { status, message, data } = body;
          expect(status).to.deep.equal(201);
          expect(message).to.equal(constants.signupSuccess);
          expect(data).to.be.an('object');
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');
          expect(data).to.have.property('firstname');
          expect(data).to.have.property('lastname');
          expect(data).to.have.property('email');
          expect(data).to.have.property('phone');
          expect(data).to.have.property('active');
          expect(data).to.have.property('createdAt');

          const { firstname } = data;
          const { lastname } = data;
          const { email, phone, active } = data;

          createdUserId = data.userId;
          expect(firstname).to.equal(user.firstname);
          expect(lastname).to.equal(user.lastname);
          expect(email).to.equal('joeyking@andela.com');
          expect(phone).to.equal(user.phone);
          expect(active).to.equal(false);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
