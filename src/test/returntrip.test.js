import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);
const testUser3 = {
    email: 'frank@andela.com',
    password: 'Jennylove19@',
};

let testToken = null;
describe('TESTING RETURN-TrIP REQUEST', () => {
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
    it('should post new returntrip trip request to the database', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 2,
                accommodation: 2
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
                expect((res.body.data.destinationID)).to.be.a('array');
                expect((res.body.data.currentOfficeLocation)).to.be.a('array');
                expect((res.body.data.destination)).to.be.a('array');
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
                returnDate: '2019-1010',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 2,
                accommodation: 2
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

    it('should send an error 400 when a Destination matches Current Office Location', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                departureDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 1,
                accommodation: 2
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
                tripType: 'Return-Trip',
                destination: 2,
                accommodation: 2
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
    it('should send an error 400 when current location is not a number', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 'June',
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 2,
                accommodation: 2
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
    it('should send an error 400 when a Destination matches Current Office Location', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                departureDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 1,
                accommodation: 2
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
    it('should send an error 400 when a destination is invalid', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 'Mice',
                accommodation: 2
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
    it('should send an error 400 when a destination is empty', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: '',
                accommodation: 2
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
                tripType: 'Return-Trip',
                destination: 1,
                accommodation: 2
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
                currentOfficeLocation: 1,
                reason: '',
                tripType: 'Return-Trip',
                destination: 1,
                accommodation: 2
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
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: '',
                destination: 1,
                accommodation: 2
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
    it('should send an error 400 when accommodation is empty', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-trip',
                destination: 1,
                accommodation: ''
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
    it('should send an error 400 when accommodation is not a number', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Return-Trip',
                destination: 1,
                accommodation: 'Mice'
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
});



