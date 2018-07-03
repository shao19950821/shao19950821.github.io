/**
 * Created by wangwei on 2017-2-14.
 */

function goToTask(url,contextPath,noticeId,readFlag){
    if(parent.openDetailWin){
        parent.openDetailWin(url,noticeId,"Y","noticeBox","openNoticeBox");
    }
};

function mainGoToNotice1(url,title){
    var myTaskOpen = $("#left-div-my-task-open").kendoWindow(
        {
            actions: ["Close"],
            width: 910,
            title: title,
            visible: false,
            iframe: true,
            modal: true,
            content: url,
            close: function (e) {
                hlsWindowClose(this);
            }
        }).data("kendoWindow");
    hlsWindow(myTaskOpen, 'FULL');
}

function taskListInit(contextPath){
    $.ajax({
        type: 'GET',
        url: contextPath+'/hls/system/noticeMessage/query?pageSize=4&page=1',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas[0]) {
                var html='';
                var hour=0;
                var day =0;
                var week=0;
                var month=0;
                var year =0;
                for(var i=0;i<datas.length;i++){
                    var times =datas[i].arrivalTime + '小时 以前';
                    if(datas[i].arrivalTime>24 && datas[i].arrivalTime <168){
                        day = (datas[i].arrivalTime/24).toFixed(0);
                        hour= (datas[i].arrivalTime%24).toFixed(0);
                        times = day + '天' + hour + '小时以前';
                    }else if (datas[i].arrivalTime>=168 && datas[i].arrivalTime <720){
                        week = (datas[i].arrivalTime/168).toFixed(0);
                        day = (datas[i].arrivalTime%168/24).toFixed(0);
                        times = week + '周' + day + '天 以前';
                    }else if(datas[i].arrivalTime>=720 && datas[i].arrivalTime <8760){
                        month = (datas[i].arrivalTime/720).toFixed(0);
                        week = (datas[i].arrivalTime%720/168).toFixed(0);
                        times = month + '月' + week + '周 以前';
                    }else if (datas[i].arrivalTime>=8760) {
                        year = (datas[i].arrivalTime/8760).toFixed(0);
                        month = (datas[i].arrivalTime%8760/720).toFixed(0);
                        times = year + '年' + month + '月 以前';
                    }

                    html=html+'<div class="row-second-body-item">';
                    html=html+'<div class="row-second-body-item-title">';
                    html=html+'<div class="row-second-body-item-title-common row-second-body-item-title1"><label> <input style="width: 20px;margin-top: -2px;" type="checkbox"> <span class="text"></span> </label></div>';
                    html=html+'<div class="row-second-body-item-title-common row-second-body-item-title2 row-second-body-item-title-progress">';
                    html=html+'TODO';
                    html=html+'</div>';
                    html=html+'<div class="row-second-body-item-title-common row-second-body-item-title3" style="color: #666666;">'+times+'</div>';
                    html=html+'</div>';
                    // html=html+'<div style="cursor:pointer" class="row-second-body-item-body"><a style=" text-decoration:none; out-line: none; color:#444444;" href="javascript:mainGoToNotice1(\''+contextPath+'/main.html?noticeType=TASK\',\'我的消息\');">'+datas[i].notice_message+'</a></div>';


                    html=html+'<div style="cursor:pointer" class="row-second-body-item-body"><a style=" text-decoration:none; out-line: none; color:#444444;" href="javascript:goToTask(\'' + datas[i].notice_url + '\',\'' + contextPath + '\',\''+datas[i].notice_id+'\',\''+datas[i].read_flag+'\');">'+datas[i].notice_message+'</a></div>';

                    html=html+'<div class="row-second-body-item-foot">';
                    html=html+'<div class="row-second-body-item-foot-common row-second-body-item-foot-left">'+datas[i].userName+'</div>';
                    html=html+'<div class="row-second-body-item-foot-common row-second-body-item-foot-right" style="color: #666666;font-weight:100;font-size:10px; ">发送给 您</div>';
                    html=html+'</div>';
                    if(i<3){
                        html=html+'<div style="margin-left:3px;height:1px; background-color:#e4e4e4;width:264px ;"></div>';
                    }

                    html=html+'</div>';

                }
                $('#task-list-id').append(html);
            // <div class="row-second-body-item">
            //         <div class="row-second-body-item-title">
            //         <div class="row-second-body-item-title-common row-second-body-item-title1"></div>
            //         <div class="row-second-body-item-title-common row-second-body-item-title2 row-second-body-item-title-progress">
            //         IN PROGRESS
            //     </div>
            //     <div class="row-second-body-item-title-common row-second-body-item-title3">1小时以前</div>
            //     </div>
            //     <div class="row-second-body-item-body">项目申请PRJ20170215023 需要您进行信用审批！</div>
            //     <div class="row-second-body-item-foot">
            //         <div class="row-second-body-item-foot-common row-second-body-item-foot-left">陈东</div>
            //         <div class="row-second-body-item-foot-common row-second-body-item-foot-right">发送给 您</div>
            //     </div>
            //     </div>
            } else {

            }
        }
    });
}



