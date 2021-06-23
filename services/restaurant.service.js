const Restaurant = require('../models/restaurant.model');

const create = async (object) => {
  const isExistingRestaurant = await Restaurant.findOne({
    name: object.name
  });
  if (isExistingRestaurant) {
    throw new Error('Restaurant name is already taken');
  }
  return await Restaurant.create(object);
};

const getById = async (id) => {
  return Restaurant.findById(id);
};

// const getByCompany = async (id: string): Promise<ISlot[]> => {
//   return await Slot.find({ company: id });
// };

// const getByCompanyAndDate = async (
//   id: string,
//   startDate: Date,
//   endDate: Date
// ): Promise<ISlot[]> => {
//   return await Slot.find({
//     company: id,
//     start: { $gte: startDate },
//     end: { $lte: endDate }
//   });
// };

// const post = async (slot: ISlot): Promise<ISlot> => {
//   return await Slot.create(slot);
// };

// const put = async (id: string, slot: ISlot): Promise<ISlot | null> => {
//   return await Slot.findByIdAndUpdate(id, slot, { new: true });
// };

// const remove = async (id: string): Promise<ISlot | null> => {
//   return await Slot.findByIdAndRemove(id);
// };

module.exports = { create, getById };
