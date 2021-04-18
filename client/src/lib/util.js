/*
 * Converts 'flat' json to URI-style params
 */
export const jsonToUriParams = json => {
  if (Object.keys(json).length > 0) {
    let params = '?';
    for (let key in json) {
      params += `${key}=${json[key]}&`;
    }
    // console.log('params:');
    // console.log(params);
    return params.slice(0, -1);
  } else {
    return '';
  }
};
