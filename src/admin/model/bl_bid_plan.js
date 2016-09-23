

'use strict';
import Base  from './baseModel';

export default class extends Base {
    /**
     * 首页招标项目查询列表
     */
    indexList(productKey,limit){
        let  data= this.alias("plan")
                        .field( "plan.id as planId," +
                                "plan.bidName as planName," +
                                "ent.enterprisename as borrowerName," +
                                "plan.bidMoney as planMoney," +
                                "product.productName AS productName," +
                                "cb.bankname as bankname," +
                                "plan.expectUsedDays as planLimit," +
                                "plan.dayRate as dayRate," +
                                "IFNULL(sum(info.proportion),0) AS proportion"
                               )
                        .join(  "LEFT JOIN bl_project AS p ON (plan.projectId = p.id and plan.businessType=p.businessType)" +
                                "left join cs_enterprise as ent ON (ent.id=p.borrowerId)" +
                                "left join cs_bank  as cb ON (cb.bankid=p.bankId)" +
                                "left join bl_product as product ON ( product.id=p.productId)" +
                                "left join bl_investrecord as info on (info.markId=plan.id )"
                              )
                        .where("plan.isPublic=1  and product.productKey='"+productKey+"'")
                        .group("plan.id")
                        .order("plan.bidStartTime desc")
                        .limit(limit)
                        .select();
        return  data;
    }

    /**
     * 查出全部的公共的资金业务列表
     */
    publicIndexList(page,limit){
        let  data= this.alias("plan")
            .field( "plan.id as planId," +
                "plan.bidName as planName," +
                "ent.enterprisename as borrowerName," +
                "plan.bidMoney as planMoney," +
                "product.productKey as productKey," +
                "product.productName AS productName," +
                "cb.bankname as bankname," +
                "plan.expectUsedDays as planLimit," +
                "plan.dayRate as dayRate,"+
                "IFNULL(sum(info.proportion),0) AS proportion"
            )
            .join(  "LEFT JOIN bl_project AS p ON (plan.projectId = p.id and plan.businessType=p.businessType)" +
                "left join cs_enterprise as ent ON (ent.id=p.borrowerId)" +
                "left join cs_bank  as cb ON (cb.bankid=p.bankId)" +
                "left join bl_product as product ON ( product.id=p.productId)" +
                "left join bl_investrecord as info on (info.markId=plan.id and info.state in (1,4) )"
            )
            .page(page,limit)
            .where("plan.isPublic=1 ")
            .group("plan.id")
            .order("plan.bidStartTime desc")
            .select();
        return  data;
    }

    /**
     * 查询出推荐用户的资金业务列表
     * @returns {*}
     */
    personIndexList(loginName,page,limit){
        let  data= this.alias("plan")
            .field( "plan.id as planId," +
                "plan.bidName as planName," +
                "ent.enterprisename as borrowerName," +
                "plan.bidMoney as planMoney," +
                "product.productName AS productName," +
                "cb.bankname as bankname," +
                "plan.expectUsedDays as planLimit," +
                "plan.dayRate as dayRate," +
                "IFNULL(sum(info.proportion),0) AS proportion"
            )
            .join(  "LEFT JOIN bl_bid_supplier AS ps ON (plan.id = ps.bidId) " +
                "left join bl_supplier as bs on (ps.supplierId=bs.id)" +
                "LEFT JOIN bl_project AS p ON (plan.projectId = p.id and plan.businessType=p.businessType)" +
                "left join cs_enterprise as ent ON (ent.id=p.borrowerId)" +
                "left join cs_bank  as cb ON (cb.bankid=p.bankId)" +
                "left join bl_product as product ON ( product.id=p.productId)" +
                    //这个地方需要添加投标记录状态
                "left join bl_investrecord as info on (info.markId=plan.id and info.state in (1,4) )"
            )
            .where("plan.isPublic=1  and  bs.loginName='"+loginName+"'")
            .group("plan.id")
            .order("plan.bidStartTime desc")
            .limit(limit)
            .select();
        return  data;
    }

    /**
     * 查询具体一个资金业务的详细信息
     */
    planDetail(){
        let  data= this.alias("plan")
            .field( "plan.id as planId," +
                "plan.bidName as planName," +
                "ent.enterprisename as borrowerName," +
                "plan.bidMoney as planMoney," +
                "product.productName AS productName," +
                "cb.bankname as bankname," +
                "plan.expectUsedDays as planLimit," +
                "plan.dayRate as dayRate," +
                "IFNULL(sum(info.proportion),0) AS proportion"
            )
            .join(  "LEFT JOIN bl_bid_supplier AS ps ON (plan.id = ps.bidId) " +
                "left join bl_supplier as bs on (ps.supplierId=bs.id)" +
                "LEFT JOIN bl_project AS p ON (plan.projectId = p.id and plan.businessType=p.businessType)" +
                "left join cs_enterprise as ent ON (ent.id=p.borrowerId)" +
                "left join cs_bank  as cb ON (cb.bankid=p.bankId)" +
                "left join bl_product as product ON ( product.id=p.productId)" +
                //这个地方需要添加投标记录状态
                "left join bl_investrecord as info on (info.markId=plan.id and info.state in (1,4) )"
            )
            .where("plan.isPublic=1  and  bs.loginName='"+loginName+"'")
            .group("plan.id")
            .order("plan.bidStartTime desc")
            .limit(limit)
            .select();
        return  data;
    }
}
