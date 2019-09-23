import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);
const testUser3 = {
  email: 'stephenibaba@andela.com',
  password: 'Jennylove19',
};

let testToken = null;
describe('TESTING MULTI-CITY TRIPS REQUEST', () => {
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
  it('should post new multi city trip request to the database', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 1,
        reason: 'official',
        tripType: 'Multi-city',
        destination: [2, 3]
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(201);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'data');
        expect((res.body)).to.haveOwnProperty('status').that.equals('success, an email has been sent to you');
        expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
        expect((res.body.data)).to.be.an('object');
        expect((res.body.data.userId)).to.be.a('string');
        expect((res.body.data.destinationIDs)).to.be.an('array');
        expect((res.body.data.currentOfficeLocation)).to.be.an('array');
        expect((res.body.data.destinations)).to.be.an('array');
        expect((res.body.data.departureDate)).to.be.a('string');
        expect((res.body.data.returnDate)).to.be.a('string');
        expect((res.body.data.reason)).to.be.a('string');
        expect((res.body.data.tripType)).to.be.a('string');
        expect((res.body.data.requestStatus)).to.be.a('string');
        expect((res.body.data.requestStatus)).to.equals('pending');
        done();
      });
  });
  it('should send an error 400 when an invalid date format is entered', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-1010',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when an invalid destination is entered', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-1010',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Offic'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when current location is left empty', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: '',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when the trip reason is left empty', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: '',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.an('object');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 400 when the trip type is empty', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: '',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect((res.body.error)).to.be.an('object');
        expect((res.body.status)).to.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.an('object');
        done();
      });
  });
  it('should send an error 401 if the token is not a Bearer type token', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(401);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.a('string');
        expect((res.body.status)).to.equals(401);
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        done();
      });
  });
  it('should send an error 401 if the token is tampered with', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('Authorization', `Bearer ${testToken}sss`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(401);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.a('string');
        expect((res.body.status)).to.equals(401);
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        done();
      });
  });
  it('should send an error 401 if token is not set on the headers authorization property', (done) => {
    chai.request(server)
      .post('/api/v1/trips/request')
      .set('token', `Bearer ${testToken}`)
      .send({
        departureDate: '2019-10-10',
        returnDate: '2019-12-10',
        currentOfficeLocation: 'Lagos Office',
        reason: 'official',
        tripType: 'Multi-city',
        value1: 'Abuja Office',
        value2: 'Lagos Office 2'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(401);
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body.error)).to.be.a('string');
        expect((res.body.status)).to.equals(401);
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        done();
      });
  });
  it('should show trips created as a notification to manager in real time', (done) => {
    chai.request(server)
      .get('/api/v1/trips/get_trips/1')
      .set('token', `Bearer ${testToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.be.an('Object');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
