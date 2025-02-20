import { List } from '../models/index.js';

export const seedList = async () => {
  await List.bulkCreate([
    {
      name: 'Water', assignedUserId: 1
    },
    {
      name: 'Milk', assignedUserId: 1
    }
  ]);
};