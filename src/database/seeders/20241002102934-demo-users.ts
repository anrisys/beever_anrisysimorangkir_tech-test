import { QueryInterface } from 'sequelize';
import * as bcrypt from 'bcrypt';

export default {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword = await bcrypt.hash(
      'UserExample123#!',
      Number(process.env.SECRET_SALT_KEY),
    );

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'demo@example.com',
          password: hashedPassword,
        },
      ],
      {},
    );
  },

  down: async (queryInteface: QueryInterface) => {
    await queryInteface.bulkDelete('users', { email: 'demo@example.com' });
  },
};
