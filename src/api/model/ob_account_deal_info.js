
'use strict';
import Base  from './baseModel';

export default class extends Base {

    /**
     * check password
     * @param  {[type]} userInfo [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    accountList(id,limit,page){
        let data;
        let field="info.id AS id,"+
            "info.investPersonId AS investPersonId,"+
            "info.investPersonName AS investPersonName,"+
            "info.recordNumber AS recordNumber,"+
            "info.payMoney AS payMoney,"+
            "info.incomMoney AS incomMoney,"+
            "info.dealRecordStatus AS dealRecordStatus,"+
            "IFNULL("+
            "DATE_FORMAT(info.transferDate,'%Y-%m-%d') AS transferDate"+
            "DATE_FORMAT(info.createDate,'%Y-%m-%d') AS createDate"+
            ") AS dealDate,"+
            "s.typeName AS transferTypeName";

         data =this.alias("info")
                      .field(field)
                      .join({
                            table: "ob_systemaccount_setting",
                            join: "left",
                            as: "s",
                            on: ["transferType", "typeKey"]
                        })
                     .page(page,limit)
                      .where({
                          investPersonId:id
                      }).order("info.transferDate DESC,info.createDate DESC")
                      .countSelect();
        return data;
    }

}
