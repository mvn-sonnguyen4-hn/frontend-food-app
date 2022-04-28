import packageJson from '../../package.json';

export const ENV = {
  VERSION: packageJson.version || '',
  NODE_ENV: process.env.NODE_ENV,
  API_HOST: process.env.REACT_APP_API_HOST ?? '',
  URL_IMAGE_DEFAULT: process.env.URL_IMAGE_DEFAULT ?? ''
};
