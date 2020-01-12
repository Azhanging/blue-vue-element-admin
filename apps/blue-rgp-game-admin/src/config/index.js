import publicConfig from '$config';
import utils from 'blue-utils';

const config = utils.extend(publicConfig, {
  view: {
    hasDemo: false
  },
  path: {
    login: `/login`
  },
  user: {
    url: `/getUserInfo`
  },
  axios: {
    timeout: 1000000
  }
});

export default config;
