export const jwtConfig = {
  secretKey: process.env.JWT_SECRET || 'default_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
