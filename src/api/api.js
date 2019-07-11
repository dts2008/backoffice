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

            if (typeof result &&
                typeof result.data &&
                typeof result.data.token &&
                result.data.token.length >= 32) {
                store.dispatch('LOGIN');
                return true;
            }
            
            //console.log(result);
            //console.log(result.data);
            //console.log(result.data.token);
            //console.log(result.data.explanation);

            
            //this.$store.dispatch('LOGIN');
            
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}



const api = new API();

export default api