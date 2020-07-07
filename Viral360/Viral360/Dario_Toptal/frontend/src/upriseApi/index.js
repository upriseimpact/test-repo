import _ from 'lodash';
import axios from 'axios';
import json2plain from 'json2plain';
import postal from 'postal';
import config from '../config';

const channel = postal.channel('ajax');

async function apiCallResolver(apiCall) {
  let apiResult = null;

  channel.publish('ajax.start', {});

  try
  {
    const response = await apiCall();

    if (response.config.method === 'post' || response.config.method === 'put') {
      channel.publish('ajax.save', 'Data have been saved');
    }

    if (response.config.method === 'delete') {
      channel.publish('ajax.delete', 'Data have been deleted');
    }

    apiResult = {
      success: true,
      data: response.data
    };
  }
  catch(e) {
    let data = undefined;
    if (e.response && e.response.data) {
      data = e.response.data;
    }

    apiResult = {
      success: false,
      data
    };

    if (e.response) {
      const responseStatus = e.response.status;
      let errorMessage = '';

      switch (responseStatus) {
        case 400:
          if (apiResult.data) {
            errorMessage = json2plain(apiResult.data);
          } else {
            errorMessage = 'Data validation error';
          }
          break;
        case 401:
        case 403:
          errorMessage = 'You are not authorized for this operation';
          break;
        default:
          errorMessage = 'Server internal error';
      }
      channel.publish('ajax.error', errorMessage);
    }
  }

  channel.publish('ajax.end', {});

  return apiResult;
}

function createApi(accessToken) {
  const apiClient = axios.create();

  if (accessToken) {
    const headers = _.cloneDeep(apiClient.defaults.headers);
    headers.common.Authorization = `Bearer ${accessToken}`;

    apiClient.defaults.headers = headers;
  }

  // const apiUrl = config.apiUrl;

  return {
    setAccessToken: (t) => {
      const headers = _.cloneDeep(apiClient.defaults.headers);
      headers.common.Authorization = t ? `Bearer ${t}` : '';

      apiClient.defaults.headers = headers;
    },
  }
}

export default createApi;