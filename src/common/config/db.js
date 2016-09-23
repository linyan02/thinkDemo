'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '192.168.0.107',
      port: '3306',
      database: 'trunck_product_newframe',
      user: 'credit',
      password: 'credit',
      prefix: '',
      encoding: 'utf8',
      connectionLimit: 50
    },
    mongo: {

    }
  }
};