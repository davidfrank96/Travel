import models from '../../models';

const { Locations } = models;

/**
 * Returns the id, name and address of a location
 * @param { array } destination - Arary of the destination IDs
 * @param { object } res - The response object
 * @returns { object } object containing id, name and address of a location
 */
const getDetailedLocation = async (destination) => {
  try {
    const location = await Locations.findOne({
      where: { id: destination }
    });
    const { dataValues } = location;
    const { id, locationName, locationAddress } = dataValues;
    const returnDestination = {
      locationId: id,
      locationName,
      locationAddress
    };

    return returnDestination;
  } catch (err) {
    return {};
  }
};

export default getDetailedLocation;
