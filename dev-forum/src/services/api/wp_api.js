import settings from './settings';
import ApiUtils from './apiUtils';

const WPApi = (params, callback) => {
  const { method, args } = params;

  // Methods
  const methods = {
    /*
    * args: postType, e.g.(post, project)
    * returns posts data as a promise
    */
    getPosts: (postType) => {
      console.log('fetching postType: '+postType);
      const dataURL = settings.baseUrl+'wp-json/wp/v2/'+postType;
      return fetch(dataURL)
        .then(ApiUtils.checkStatus)
        .then(res => res.json())
        .catch(e => console.log(e));
    },

    /*
    * args: postType, e.g.(post, project), id
    * returns post data as a promise
    */
    getPost: (postType, id) => {
      console.log('fetching postType: '+postType+' id: '+id);
      const dataURL = settings.baseUrl+'wp-json/wp/v2/'+postType+'/'+id;
      return fetch(dataURL)
        .then(ApiUtils.checkStatus)
        .then(res => res.json())
        .catch(e => console.log(e));
    }
  }

  return (typeof methods[method] === 'function') ?
    methods[method](...args).then(res => callback(res)) :
    console.log(method+' is not a method of WPApi.');
}

export default WPApi;
