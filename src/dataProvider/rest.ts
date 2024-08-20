import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;
const httpClient = fetchUtils.fetchJson;

const getDataKey = (resource: string) => {
  if (resource === 'food') return 'food_response';
  if (resource === 'wellness/card') return 'wellness_cards';
  if (resource === 'contacts') return 'contacts';
  if (resource === 'lifestyle-recommendation') return 'lifestyle_recommendations';
  if (resource === 'reagent_lot') return 'reagent_lot';
  if (resource === 'program') return 'program';
  if (resource === 'score/summary') return 'data';
  if (resource === 'group') return 'group';
  if (resource === 'kudos') return 'kudos';
  if (resource === 'benefits_admins') return 'benefits_administrators';
  if (resource === 'industry') return 'industry';
  if (resource === 'contacts_partners') return 'contacts';
  return `${resource}s`;
};

const fetchJson = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }
  const token = localStorage.getItem('access_token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const handleGetOneObj = (resource: string, json: any) => {
  if (resource === 'supplement') {
    json.goals = json.goals.map((goal: any) => goal.id);
  }
  if (resource === 'contacts') {
    json.goals = json.goals.map((goal: any) => goal.id);
  }
  if (resource === 'contacts_partners') {
    json.goals = json.goals.map((goal: any) => goal.id);
  }
  if (resource === 'wellness/card') {
    json.id = json.uuid;
  }
  if (resource === 'tip') {
    json.id = json.tip_id;
  }
  return json;
};

const updateUrl = (resource: string, params: any) => {
  if (resource === 'contacts') return `${apiUrl}/contact/${params.id}`;
  if (resource === 'contacts_partners') return `${apiUrl}/contact/${params.id}`;
  return `${apiUrl}/${resource}/${params.id}`;
};

const filterFoodList = (url: string, filter: any) => fetchJson(`${url}/filters`, {
  method: 'POST',
  body: JSON.stringify({
    ...filter,
  }),
}).then(({ json }) => ({
  data: json.food_response,
  total: json.food_response.length,
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const searchContacts = (url: string, filter: any) => fetchJson(`${url}/search?email=${filter.email}`, {
  method: 'GET',
}).then(({ json }) => ({
  data: json[getDataKey('contacts')],
  total: json.pagination?.total
    ? json.pagination?.total
    : json[getDataKey('contacts')].length,
}));

const getOneUrl = (resource: string, params: any) => {
  if (resource === 'contacts_partners') return `${apiUrl}/contact/${params.id}`;
  if (resource === 'contacts') return `${apiUrl}/contact/${params.id}`;
  if (resource === 'lesson') return `${apiUrl}/lesson/${params.id}?show_curriculums=True`;
  return `${apiUrl}/${resource}/${params.id}`;
};

const getListData = (data: any, resource: any): any => {
  if (!data) return [];
  if (resource === 'wellness/card') {
    data = data.map((item: any) => {
      item.id = item.uuid;
      return item;
    });
  }
  if (resource === 'tip') {
    data = data.map((item: any) => {
      item.id = item.tip_id;
      return item;
    });
  }
  if (resource === 'score/summary') {
    data = data.map((item: any) => {
      item.id = item.sample_id;
      return item;
    });
  }
  return data;
};

const vesselDataProvider = {
  getList: (resource: any, params: any) => {
    const { page, perPage } = params.pagination;
    const { filter } = params;
    const { sort } = params;

    let query: any = {
      page,
      per_page: perPage,
    };

    if (resource === 'product') {
      query = {};
    }

    if (
      [
        'product',
        'wellness/card',
        'contacts',
        'contacts_partners',
        'reagent',
        'score/summary',
      ].includes(resource)
      && filter
      && Object.keys(filter).length
    ) {
      Object.keys(filter).forEach((key: any) => {
        query[key] = filter[key];
      });
    }

    if (sort) {
      query = { ...sort, ...query };
    }
    let resourceFilter = '';
    if (resource === 'plan') {
      resourceFilter = '&program_plans=true';
    }

    if (resource === 'lesson') {
      let search = '';
      if (filter.search) {
        search = `&search=${filter.search}`;
      }
      resourceFilter = `&show_all=true&show_curriculums=true${search}`;
    }

    if (resource === 'benefits_admins') {
      let search = '';
      if (filter.search) {
        search = `&search=${filter.search}`;
      }
      resourceFilter = `${search}`;
    }

    if (resource === 'industry') {
      let search = '';
      if (filter.search) {
        search = `&search=${filter.search}`;
      }
      resourceFilter = `${search}`;
    }

    if (resource === 'employer') {
      let search = '';
      if (filter.search) {
        search = `&search=${filter.search}`;
      }
      resourceFilter = `${search}`;
    }
    console.log(filter);
    if (resource === 'question' || resource === 'tip') {
      let search = '';
      if (filter.search) {
        console.log(resource, filter.search);
        search = `&search=${filter.search}`;
      }
      if (filter.q) {
        search = `&search=${filter.q}`;
      }
      resourceFilter = `${search}`;
    }
    let url = `${apiUrl}/${resource}?${stringify(query)}${resourceFilter}`;
    if (url.indexOf('?') === url.length - 1) url = `${apiUrl}/${resource}`;
    // fixing api version for specific resources
    if (resource === 'score/summary') url = url.replace('/v2/', '/v3/');

    if (filter && Object.keys(filter).length && resource === 'food') {
      return filterFoodList(`${apiUrl}/${resource}`, filter);
    }

    return fetchJson(url).then(({ json }) => ({
      data: getListData(json[getDataKey(resource)], resource),
      total: json.pagination?.total
        ? json.pagination?.total
        : getListData(json[getDataKey(resource)], resource).length,
    }));
  },

  getOne: (resource: any, params: any) => {
    const url = getOneUrl(resource, params);
    return fetchJson(url).then(({ json }) => ({
      data: handleGetOneObj(resource, json),
    }));
  },

  getMany: (resource: any) => {
    const url = `${apiUrl}/${resource}`;

    return fetchJson(url).then(({ json }) => ({
      data: getListData(json[getDataKey(resource)], resource),
      total: json.pagination?.total
        ? json.pagination?.total
        : getListData(json[getDataKey(resource)], resource).length,
    }));
  },

  getManyReference: (resource: any) => {
    const url = `${apiUrl}/${resource}`;

    return httpClient(url).then(({ json }) => ({
      data: json,
      total: 0,
    }));
  },

  update: (resource: any, params: any) => {
    const data: any = {};
    if (resource === 'food') {
      Object.keys(params.data).forEach((key) => {
        data[key.toLowerCase()] = params.data[key];
      });
    }
    const url = updateUrl(resource, params);
    return fetchJson(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },

  updateMany: (resource: any, params: any) => httpClient(`${apiUrl}/${resource}`, {
    method: 'PUT',
    body: JSON.stringify(params.data),
  }).then(({ json }) => ({ data: json })),

  create: (resource: any, params: any) => fetchJson(`${apiUrl}/${resource}`, {
    method: 'POST',
    body: JSON.stringify(params.data),
  }).then(({ json }) => ({
    data: { ...params.data, id: json.id },
  })),

  delete: (resource: any, params: any) => fetchJson(`${apiUrl}/${resource}/${params.id}`, {
    method: 'DELETE',
  }).then(({ json }) => ({ data: json })),

  deleteMany: (resource: any, params: any) => httpClient(`${apiUrl}/${resource}`, {
    method: 'DELETE',
    body: JSON.stringify(params.data),
  }).then(({ json }) => ({ data: json })),
};

export default vesselDataProvider;
