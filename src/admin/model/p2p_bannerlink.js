'use strict';
import Base  from './baseModel';

export default class extends Base {
   //查询banner的列表
    list(){
       let data=this.alias("p")
                 .field("p.`name` as bannername,p.urlLink as urlLink ,p.url as url")
                 .where("p.isShow=0 and p.webKey=1")
                 .select();

        return  data;
    }
}
