import publicConfig from '$config';
import utils from 'blue-utils';

const config = utils.extend(publicConfig, {
  path: {
    login: `/login`
  },
  user: {
    url: `/mock/get_user_info`
  },
  axios: {
    timeout: 1000000
  }
});

export default config;
