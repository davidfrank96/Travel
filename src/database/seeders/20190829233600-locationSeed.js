
module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Locations',
    [
      {
        locationName: 'Lagos Office',
        locationAddress: '1233454 Ikorodu road, Lagos, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationName: 'Abuja Office',
        locationAddress: '1233454 Central Business District, Abuja, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationName: 'Lagos Office 2',
        locationAddress: '1233454 Tiamiyu Savage, Victoria Island, Lagos Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Locations', null, {})
};
