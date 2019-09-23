import crypto from 'crypto';

/**
 * Generates a signin verification token
 * @return { string } returns the generated token
 */
const generateVerificationToken = () => {
  let currentTime = new Date();
  currentTime = currentTime.getTime();

  const cryptedToken = crypto.randomBytes(20).toString('hex');
  const token = `${cryptedToken}${currentTime}`;
  return token;
};

export default generateVerificationToken;
