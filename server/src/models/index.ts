import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { ListFactory } from './list.js';

    const User = UserFactory(sequelize);
    const List = ListFactory(sequelize);

    User.hasMany(List, { foreignKey: 'assignedUserId'});
    List.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { User, List };
