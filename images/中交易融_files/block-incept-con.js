/**
 * Created by wangwei on 2017-2-14.
 */


function divOpenContractInfo(url){
    var json = {
        actions: ["Close"],
        width: 910,
        title: '合同明细',
        visible: false,
        iframe: true,
        modal: true,
        content: url,
        close: function (e) {
            hlsWindowClose(this);
        }
    };
    top.topOpenWindow(json,'',null,950);
}

function conInceptListInit(contextPath)   {
    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/contract/indexContractInceptInfo/query?pageSize=6&page=1',
        contentType: "application/json; charset=utf-8",
        success: function (data1) {
        var datas = data1.rows;
            if (datas[0]) {
                var html='';
                var hour=0;
                var minute=0;
                var day =0;
                var week=0;
                var month=0;
                var year =0; 
                var latestIndex=6-datas.length;

                for(i=0;i<datas.length;i++){
                    var times =datas[i].latestHours + '分钟 前';

                    if(datas[i].latestHours>60 && datas[i].latestHours <1440){
                        hour = (datas[i].latestHours/60).toFixed(0);
                        minute= (datas[i].latestHours%60).toFixed(0);
                        times = hour + '小时' + minute + '分钟 前';
                    }else if (datas[i].latestHours>=1440 && datas[i].latestHours <10080){
                        day = (datas[i].latestHours/1440).toFixed(0);
                        hour = (datas[i].latestHours%1440/60).toFixed(0);
                        times = day + '天' + hour + '小时 前';
                    }else if(datas[i].latestHours>=10080 && datas[i].latestHours <43200){
                        week = (datas[i].latestHours/10080).toFixed(0);
                        day = (datas[i].latestHours%10080/1440).toFixed(0);
                        times = week + '周' + day + '天 前';
                    }else if(datas[i].latestHours>=43200 && datas[i].latestHours <1296000){
                        month = (datas[i].latestHours/43200).toFixed(0);
                        week = (datas[i].latestHours%43200/10080).toFixed(0);
                        times = month + '月' + week + '周 前';
                    }else if(datas[i].latestHours>=1296000){
                        year = (datas[i].latestHours/1296000).toFixed(0);
                        month = (datas[i].latestHours%1296000/43200).toFixed(0);
                        times = year + '年' + month + '月 前';
                    }

                    //最后一个列表 下面边框要圆角
                    if (i==5){
                        html=html+'<div style="height: 1px;background-color: #EEEEEE"/>';
                        html=html+'<div class="order-item latest-event-item" style="border-radius: 0px 0px 5px 5px;">';
                        html=html+'<div class="lei-content">'+datas[i].bp_name+'</div>';
                        html=html+'<div class="lei-foot">';
                        html=html+'<div class="lei-foot-time-img"><i class="fa fa-calendar"></i></div>';
                        //html=html+'<img class="lei-foot-time-img" src="'+contextPath +'/resources/images/MAIN/u144.png">';
                        html=html+'<div class="lei-foot-time">'+times+'</div>';
                        html=html+'<div class="lei-foot-amt">'+ formatCurrency(datas[i].leaseItemAmount)+'</div>';
                        //html=html+'<img class="lei-foot-link-img" src="'+ contextPath +'/resources/images/MAIN/u150.png">';
                        html=html+' </div>';
                        html=html+' <a style="cursor:pointer"  class="item-more" href="javascipt:divOpenContractInfo(\''+contextPath+'\'/cont/CON100/contract_query.html?contract_id='+datas[i].contract_id+'\');"><i></i> </a>';
                        html=html+'</div>';

                    }else{

                        html=html+'<div style="height: 1px;background-color: #EEEEEE"/>';
                        html=html+'<div class="order-item latest-event-item">';
                        html=html+'<div class="lei-content">'+datas[i].bp_name+'</div>';
                        html=html+'<div class="lei-foot">';
                        html=html+'<div class="lei-foot-time-img"><i class="fa fa-calendar"></i></div>';
                        //html=html+'<img class="lei-foot-time-img" src="'+contextPath +'/resources/images/MAIN/u144.png">';
                        html=html+'<div class="lei-foot-time">'+times+'</div>';
                        html=html+'<div class="lei-foot-amt">'+ formatCurrency(datas[i].leaseItemAmount)+'</div>';
                        //html=html+'<img class="lei-foot-link-img" src="'+ contextPath +'/resources/images/MAIN/u150.png">';
                        html=html+' </div>';
                        html=html+' <a style="cursor:pointer"  class="item-more" href="javascript:divOpenContractInfo(\''+contextPath+'/cont/CON100/contract_query.html?contract_id='+datas[i].contract_id+'\');"><i></i> </a>';
                        html=html+'</div>';

                    }


                }

                $('#con-incept-info-right').append(html);
                var blockHtml="";
                for(i=0;i<latestIndex;i++){
                    //最后一个列表 下面边框要圆角
                    if(i==latestIndex-1){
                        blockHtml=blockHtml+'<div style="height: 1px;background-color: #EEEEEE"/>';
                        blockHtml=blockHtml+'<div class="order-item latest-event-item" style="border-radius: 0px 0px 5px 5px;">';
                        blockHtml=blockHtml+'<div class="lei-content"></div>';
                        blockHtml=blockHtml+'<div class="lei-foot">';
                        //blockHtml=blockHtml+'<img class="lei-foot-time-img" src="../../../../resources/images/MAIN/u144.png">';
                        blockHtml=blockHtml+'<div class="lei-foot-time"></div>';
                        blockHtml=blockHtml+'<div class="lei-foot-amt"></div>';
                        //blockHtml=blockHtml+'<img class="lei-foot-link-img" src="../../../../resources/images/MAIN/u150.png">';
                        blockHtml=blockHtml+' </div>';
                        blockHtml=blockHtml+' <a class="item-more"><i></i> </a>';
                        blockHtml=blockHtml+'</div>';
                    }else{
                        blockHtml=blockHtml+'<div style="height: 1px;background-color: #EEEEEE"/>';
                        blockHtml=blockHtml+'<div class="order-item latest-event-item">';
                        blockHtml=blockHtml+'<div class="lei-content"></div>';
                        blockHtml=blockHtml+'<div class="lei-foot">';
                        //blockHtml=blockHtml+'<img class="lei-foot-time-img" src="../../../../resources/images/MAIN/u144.png">';
                        blockHtml=blockHtml+'<div class="lei-foot-time"></div>';
                        blockHtml=blockHtml+'<div class="lei-foot-amt"></div>';
                        //blockHtml=blockHtml+'<img class="lei-foot-link-img" src="../../../../resources/images/MAIN/u150.png">';
                        blockHtml=blockHtml+' </div>';
                        blockHtml=blockHtml+' <a class="item-more" ><i></i> </a>';
                        blockHtml=blockHtml+'</div>';
                    }
                }
                $('#con-incept-info-right').append(blockHtml);
            // <div class="latest-event">
            //         最近成交
            //         </div>
            //         <div class="latest-event-item">
            //         <div class="lei-content">上海汉得信息技术股份有限公司</div>
            //         <div class="lei-foot">
            //         <img class="lei-foot-time-img" src="${base.contextPath}/resources/images/MAIN/u144.png">
            //         <div class="lei-foot-time">47分钟 以前</div>
            //     <div class="lei-foot-amt">￥800,000</div>
            //     <img class="lei-foot-link-img" src="${base.contextPath}/resources/images/MAIN/u150.png">
            //         </div>
            //         </div>
            } else {

            }
        }
    });
}



