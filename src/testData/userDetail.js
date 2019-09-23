const correctUserEmail = {
  email: 'stephenibaba@andela.com',
};

const wrongUserEmail = {
  email: 'stephen.aba@andela.com',
};

const notAnEmail = {
  email: 'agentegwujiigmailcom',
};
const correctUserPassword = {
  newPassword: 'iamasonofgod1$',
  confirmPassword: 'iamasonofgod1$',
};
const misMatchedUserPassword = {
  newPassword: 'iamasonofgod2$',
  confirmPassword: 'iamasonofgod1$',
};
const lessUserPassword = {
  newPassword: 'iam',
  confirmPassword: 'iam',
};
const noAlphaNumericPassword = {
  newPassword: 'iamsonofMan',
  confirmPassword: 'iamsonofMan',
};
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJva2Fmb3JjaGlkaW1tYS5jQGdtYWlsLmNvbSIsImlhdCI6MTU2NjUwMTQzMiwiZXhwIjoxNTY2NTg3ODMyfQ.aJup-PH8791qlOaCNsH8WAZed7L7W4_bGOTQWsQ';
export default {
  notAnEmail,
  correctUserEmail,
  wrongUserEmail,
  correctUserPassword,
  misMatchedUserPassword,
  lessUserPassword,
  noAlphaNumericPassword,
  invalidToken
};
