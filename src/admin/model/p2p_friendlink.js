'use strict';

export default class extends think.model.base {
    /**
     * 获取友情链接的url
     * @param limit
     * @returns {*}
     */
    friendlinkListById(limit){
        let data =this.model("p2p_friendlink").alias("p").field("p.id AS id, p.createDate AS createDate, " +
          "p.modifyDate AS modifyDate,p.`name` AS `name`,p.orderList AS orderList," +
          "p.url AS url,c.webPath AS webPath")
         .join({
             table:"cs_file",
             as:"c",
             on:["c.mark","CONCAT('p2p_friendLink.', p.id)"]
         }).select();
        return data;
    }


}