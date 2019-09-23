export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'birthday', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'preferredlanguage', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'currency', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'residentialaddress', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      values: [
        'Developer',
        'QA',
        'Maintenance',
      ],
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'linemanager', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    queryInterface.removeColumn('Users', 'gender');
    queryInterface.removeColumn('Users', 'birthday');
    queryInterface.removeColumn('Users', 'preferredlanguage');
    queryInterface.removeColumn('Users', 'currency');
    queryInterface.removeColumn('Users', 'residentialaddress');
    queryInterface.removeColumn('Users', 'role');
    queryInterface.removeColumn('Users', 'department');
    queryInterface.removeColumn('Users', 'linemanager');
  }
};
