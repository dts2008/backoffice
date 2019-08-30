import config from '@/config'
import store from '@/store'

class API {
    static logoutCode = 12

    constructor() {
        this.config = config;

        //this.apiHost = config.get('api.host');
        this.apiHost = config.api.host;

        this.md5 = require('md5');
        this.axios = require('axios');
    }

    async authorization(login, password)
    {
        try {
            const result = await this.axios.get(this.apiHost + '/api2/auth?login=' + login + '&password=' + this.md5(password))

            if (result &&
                result.data &&
                result.data.token &&
                result.data.token.length >= 32) {
                store.dispatch('LOGIN', result.data.token);
                return true;
            }
                        
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

     async get(type, current_page, page_size, sort_by, descending, filters, dependence)
    {
        try {
                const result = await this.axios.get(this.apiHost + '/api2/get?type=' + type + '&token=' + store.getters.TOKEN + 
                    '&page_size=' + page_size + '&current_page=' + current_page + '&sort_by=' + sort_by + '&descending=' + descending + 
                    "&dependence=" + dependence + 
                    "&filter=" + JSON.stringify(filters))

                if (result &&
                    result.data &&
                    result.data.status === 'OK' &&
                    result.data.data &&
                    result.data.data.items
                    ) {
                        store.commit('SET_' + type.toUpperCase(), result.data.data);
                    return true;
                }

                this.ErrorResponce(result);
                        
                return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async delete(type, item)
    {
        try {
                const result = await this.axios.post(this.apiHost + '/api2/delete?type=' + type + '&token=' + store.getters.TOKEN, 
                {'id': item.id}, { headers: {'Content-Type': 'text/plain'} })
            
                if (result && result.data.status === 'OK') {
                    return true;
                }

                this.ErrorResponce(result);
                        
                return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async update(type, item)
    {
        try {
                const result = await this.axios.post(this.apiHost + '/api2/update?type=' + type + '&token=' + store.getters.TOKEN, 
                    item, { headers: {'Content-Type': 'text/plain'} })
                
                    if (result && result.data.status === 'OK') {
                    return true;
                }

                this.ErrorResponce(result);
                        
                return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async upload(file, type, item)
    {
        let formData = new FormData();
        formData.append('file', file);

        try {
            const result = await this.axios.post(`${this.apiHost}/api2/upload?type=${type}&token=${store.getters.TOKEN}&item=${JSON.stringify(item)}`,
                formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              )
              return true;
        } catch (e) {
            return false;
        }
    }

    download(type, id, fileName)
    {
        this.axios({
            url: this.apiHost + '/api2/download?type=' + type + '&token=' + store.getters.TOKEN + '&id=' + id,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', fileName); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }

    async ping(type, item)
    {
        try {
                const result = await this.axios.get(this.apiHost + '/api2/ping?token=' + store.getters.TOKEN)

                if (result && result.data.status === 'OK') {
                    return true;
                }

                this.ErrorResponce(result);
                        
                return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    ErrorResponce(result)
    {
        if (result && result.data && result.data.error_id)
        {
            if (API.logoutCode == result.data.error_id){
                store.dispatch('LOGOUT');
            }
            else {
                store.dispatch('SETERROR', { error_description: result.data.error_description, error_id: result.data.error_id} );
            }
        }
        else {    
            store.dispatch('SETERROR', { error_description: 'Internal issue', error_id: 100} );
        }
    }
}



const api = new API();

export default api