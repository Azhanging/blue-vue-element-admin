const Mock = require(`mockjs`);

const mockApi = [{
  url: '/mock/login/in',
  type: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {
        token: 'token-value'
      }
    });
  }
}, {
  url: `/mock/get_user_info`,
  type: 'get',
  response(req, res) {
    res.send({
      code: 200,
      data: {
        roles: [`admin`],
        name: 'Blue',
        avatar: `https://avatars0.githubusercontent.com/u/16292333?s=460&v=4`,
        introduction: `blue`
      }
    });
  }
}, {
  url: `/mock/login/out`,
  type: 'get',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}, {
  url: `/mock/transaction_list`,
  type: 'get',
  response(req, res) {
    res.send({
      code: 200,
      data: Mock.mock({
        total: 20,
        'items|20': [{
          order_no: '@guid()',
          timestamp: +Mock.Random.date('T'),
          username: '@name()',
          price: '@float(1000, 15000, 0, 2)',
          'status|1': ['success', 'pending']
        }]
      })
    });
  }
}, {
  url: `/mock/tab_list`,
  type: 'get',
  response(req, res) {

    const List = [];
    const count = 100;

    const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
    const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
      }))
    }

    const {
      importance,
      type,
      title,
      page = 1,
      limit = 20,
      sort
    } = req.query;

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false;
      if (type && item.type !== type) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      return true;
    });

    if (sort === '-id') {
      mockList = mockList.reverse();
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

    res.send({
      code: 200,
      data: {
        total: mockList.length,
        items: pageList
      }
    });
  }
}, {
  url: `/mock/article/pv`,
  type: 'get',
  response(req, res) {
    res.send({
      code: 200,
      data: {
        pvData: [{
          key: 'PC',
          pv: 1024
        }, {
          key: 'mobile',
          pv: 1024
        }, {
          key: 'ios',
          pv: 1024
        }, {
          key: 'android',
          pv: 1024
        }]
      }
    });
  }
}, {
  url: [`/mock/article/create`, `/mock/article/update`],
  type: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}, {
  url: ``,
  type: 'post',
  response(req, res) {
    const { name } = req.query;

    const NameList = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      NameList.push(Mock.mock({
        name: '@first'
      }));
    }
    NameList.push({ name: 'mock-Pan' });

    const mockNameList = NameList.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
    });
    res.send({
      code: 200,
      data: { items: mockNameList }
    });
  }
}, {
  url: `/mock/article/info`,
  type: 'post',
  response(req, res) {
    const { id } = req.query;
    for (const article of List) {
      if (article.id === +id) {
        res.send({
          code: 200,
          data: article
        });
      }
    }
  }
}, {
  url: `/mock/transaction/list`,
  type: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: Mock.mock({
        total: 20,
        'items|20': [{
          order_no: '@guid()',
          timestamp: +Mock.Random.date('T'),
          username: '@name()',
          price: '@float(1000, 15000, 0, 2)',
          'status|1': ['success', 'pending']
        }]
      })
    });
  }
}];

module.exports = mockApi;
