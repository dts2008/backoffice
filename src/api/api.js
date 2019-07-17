import config from '@/config'
import store from '@/store'

class API {
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
            const result = await this.axios.get(this.apiHost + '/api2/auth?login=' + login + 'password=' + this.md5(password))

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

    async getpartners()
    {
        try {
            const result = await this.axios.get(this.apiHost + '/api2/getpartners?token=' + store.getters.GETTOKEN)

            if (result &&
                result.error_code &&
                result.error_code == 0 &&
                result.data) {
                    store.commit('SET_PARTNERS', result.data);
                return true;
            }
                        
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getusers()
    {
        try {
            const result = await this.axios.get(this.apiHost + '/api2/getusers?token=' + store.getters.GETTOKEN)

            if (result &&
                result.error_code &&
                result.error_code == 0 &&
                result.data) {
                    store.commit('SET_USERS', result.data);
                return true;
            }
                        
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}



const api = new API();

export default api