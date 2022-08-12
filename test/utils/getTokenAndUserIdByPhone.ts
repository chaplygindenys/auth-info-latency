import { authRoutes } from '../endpoints';

const createPhoneUserDto = {
  id: '+380677777777',
  password: 'TEST_PASSWORD',
};

const getTokenAndUserIdByPhone = async (request) => {
  // create user
  await request
    .post(authRoutes.signup)
    .set('Accept', 'application/json')
    .send(createPhoneUserDto);

  // get token
  const response2 = await request
    .post(authRoutes.signin)
    .set('Accept', 'application/json')
    .send(createPhoneUserDto);

  const token = `Bearer ${response2.body.token}`;

  return { token };
};

export default getTokenAndUserIdByPhone;
