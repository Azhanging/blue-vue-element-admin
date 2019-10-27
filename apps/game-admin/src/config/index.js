import publicConfig from '$config';
import utils from 'blue-utils';

const config = utils.extend(publicConfig, {
  path: {
    login: `/login`
  },
  user: {
    url: `/auth/getUserInfo`
  },
  axios: {
    timeout: 1000000
  }
});

export default config;
