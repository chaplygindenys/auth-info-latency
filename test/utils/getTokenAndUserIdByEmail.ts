import { authRoutes } from '../endpoints';

const createEmailUserDto = {
  id: 'email@email.com',
  password: 'TEST_PASSWORD',
};
const getTokenAndUserIdByEmail = async (request) => {
  // create user
  await request
    .post(authRoutes.signup)
    .set('Accept', 'application/json')
    .send(createEmailUserDto);

  // get token
  const response2 = await request
    .post(authRoutes.signin)
    .set('Accept', 'application/json')
    .send(createEmailUserDto);

  const token = `Bearer ${response2.body.token}`;

  return { token };
};

export default getTokenAndUserIdByEmail;
