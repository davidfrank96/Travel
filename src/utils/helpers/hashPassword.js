import bcrypt from 'bcryptjs';

/**
 * Hashes password with bcrypt
 * @param { string } password - The request object
 * @return { string } returns the hashed password
 */
const hashPassword = (password) => {
  // Hash and encrypt password
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default hashPassword;
