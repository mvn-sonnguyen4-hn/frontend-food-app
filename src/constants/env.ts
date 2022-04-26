import packageJson from '../../package.json';

export const ENV = {
  VERSION: packageJson.version || '',
  NODE_ENV: process.env.NODE_ENV,
  API_HOST: process.env.REACT_APP_API_HOST ?? ''
};

export const URL_IMAGE_DEFAULT='https://res.cloudinary.com/monstarlab777/image/upload/v1650964802/user_no_avatar_hxbiyv.png'