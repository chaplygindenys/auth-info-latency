import { StatusCodes } from 'http-status-codes';
import { request } from './lib';
import { infoRoutes } from './endpoints';
import { getTokenAndUserIdByEmail, getTokenAndUserIdByPhone } from './utils';

describe('Auth (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  beforeAll(async () => {
    const result = await getTokenAndUserIdByPhone(unauthorizedRequest);
    commonHeaders['Authorization'] = result.token;
  });

  afterAll(async () => {
    // delete Authorization header
    if (commonHeaders['Authorization']) {
      delete commonHeaders['Authorization'];
    }
  });

  describe('GET', () => {
    it('should correctly get user info', async () => {
      const infoResponse = await unauthorizedRequest
        .get(infoRoutes.getInfo)
        .set(commonHeaders);
      expect(infoResponse.status).toBe(StatusCodes.OK);
      expect(infoResponse.body).toBeInstanceOf(Object);
    });

    it('should correctly get latency', async () => {
      const latencyResponse = await unauthorizedRequest
        .get(infoRoutes.getLatency)
        .set(commonHeaders);

      const latency = latencyResponse.body;
      if (latency) {
        console.log(latency);
      }

      expect(latencyResponse.statusCode).toBe(StatusCodes.OK);
      expect(latencyResponse.body).toBeInstanceOf(Object);
    });
  });
});
describe('Auth (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  beforeAll(async () => {
    const result = await getTokenAndUserIdByEmail(unauthorizedRequest);
    commonHeaders['Authorization'] = result.token;
  });

  afterAll(async () => {
    // delete Authorization header
    if (commonHeaders['Authorization']) {
      delete commonHeaders['Authorization'];
    }
  });

  describe('GET', () => {
    it('should correctly get user info', async () => {
      const infoResponse = await unauthorizedRequest
        .get(infoRoutes.getInfo)
        .set(commonHeaders);
      expect(infoResponse.status).toBe(StatusCodes.OK);
      expect(infoResponse.body).toBeInstanceOf(Object);
    });

    it('should correctly get latency', async () => {
      const latencyResponse = await unauthorizedRequest
        .get(infoRoutes.getLatency)
        .set(commonHeaders);

      const { latency } = latencyResponse.body;

      expect(latencyResponse.statusCode).toBe(StatusCodes.OK);
    });
  });
});
