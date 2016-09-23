
/**
 * base rest controller
 */
export default class extends think.controller.rest {
    /**
     * allow list for user
     * @type {Array}
     */
   // allowList = ['api/user/put', 'api/user/post', 'api/user/delete'];
    /**
     * [constructor description]
     * @param  {[type]} http [description]
     * @return {[type]}      [description]
     */
    constructor(http){
        super(http);
        this._method = 'method';
    }
    /**
     * before
     * @return {} []
     */
    async __before(){
        console.log("base_before");
    }
}
