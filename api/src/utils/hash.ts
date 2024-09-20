import crypto from 'crypto';

export const md5Hash = (password: string): string => {
  return crypto.createHash('md5').update(password).digest('hex');
};
