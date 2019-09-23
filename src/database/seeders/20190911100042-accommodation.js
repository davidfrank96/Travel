
export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Accommodation',
    [
      {
        locationId: 1,
        accommodationName: 'Epic Estate',
        accommodationAddress: '235 Ikorodu Rd, Ilupeju, Lagos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 2,
        accommodationName: 'Peaston Estate',
        accommodationAddress: '12 Bay Str, Ogoja, Cross River',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
