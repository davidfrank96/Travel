import chai from 'chai';
import uuidv4 from 'uuid/v4';
import SocialMediaLogin from '../controllers/socialMediaLogin';

const { googleLogin, facebookLogin } = SocialMediaLogin;
const { expect } = chai;

describe('THE SOCIAL MEDIA CALLBACK CONTROLLER', () => {
  it('should return "Your GMAIL is not linked."', async () => {
    const request = {
      user: { notFound: true }
    };
    const response = {
      status: (statusCode) => ({
        json: ({ status, message }) => ({
          statusCode,
          status,
          message
        })
      })
    };
    const next = () => {};
    const res = await googleLogin(request, response, next);
    expect((res)).to.be.an('object');
    expect((res.status)).to.equal('error');
    expect((res.message)).to.equal('Your gmail is not linked. Visit your profile section to link your social media accounts. Thank you.');
  });

  it('should return "Your FACEBOOK is not linked."', async () => {
    const request = {
      user: { notFound: true }
    };
    const response = {
      status: (statusCode) => ({
        json: ({ status, message }) => ({
          statusCode,
          status,
          message
        })
      })
    };
    const next = () => {};
    const res = await facebookLogin(request, response, next);
    expect((res)).to.be.an('object');
    expect((res.status)).to.equal('error');
    expect((res.message)).to.equal('Your facebook is not linked. Visit your profile section to link your social media accounts. Thank you.');
  });
  it('should return FACEBOOK user details', async () => {
    const request = {
      user: {
        createdAt: new Date(), userId: uuidv4(), firstname: 'Chima', lastname: 'Ekeneme', email: 'sebastinechima@gmail.com'
      }
    };
    const response = {
      status: (statusCode) => ({
        json: ({ status, data }) => ({
          statusCode,
          status,
          data
        })
      })
    };
    const next = () => {};
    const res = await facebookLogin(request, response, next);
    expect((res)).to.be.an('object');
    expect((res.status)).to.equal('success');
    expect((res.data)).to.be.an('object');
    expect((res.data.userId)).to.be.a('string');
    expect((res.data.firstname)).to.be.a('string');
    expect((res.data.lastname)).to.be.a('string');
    expect((res.data.email)).to.be.a('string');
  });
  it('should return GMAIL user details', async () => {
    const request = {
      user: {
        createdAt: new Date(), userId: uuidv4(), firstname: 'Chima', lastname: 'Ekeneme', email: 'sebastinechima@gmail.com'
      }
    };
    const response = {
      status: (statusCode) => ({
        json: ({ status, data }) => ({
          statusCode,
          status,
          data
        })
      })
    };
    const next = () => {};
    const res = await googleLogin(request, response, next);
    expect((res)).to.be.an('object');
    expect((res.status)).to.equal('success');
    expect((res.data)).to.be.an('object');
    expect((res.data.userId)).to.be.a('string');
    expect((res.data.firstname)).to.be.a('string');
    expect((res.data.lastname)).to.be.a('string');
    expect((res.data.email)).to.be.a('string');
  });
});
