interface User {
  id: string; // string
  password: string;
  id_type: 'phone' | 'email';
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

interface UserIdInfo {
  id: string; // string
  id_type: string;
}

interface Latency {
  latency: string; // string
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  id: string;
}

interface JwtPayloadWithRt {
  id: string;
  refreshToken: string;
}
