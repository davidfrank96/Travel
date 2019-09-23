
export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'roles',
    [
      {
        roleName: 'Requester',
        rolePermissions: ['makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'Manager',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'Travel Team Member',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'Travel Administrator',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Super Administrator',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'updateRole', 'makeRequest', 'updatePermissions'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}
  ),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {})
};
