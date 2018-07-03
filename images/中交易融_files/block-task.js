/**
 * Created by wangwei on 2017-2-14.
 */


function taskInit(contextPath) {
    $.ajax({
        type: 'GET',
        url: contextPath+'/hls/system/NoticeCountAndRadio/query',
        contentType: "application/json; charset=utf-8",
        data:{
            notice_type:'TODO',
            read_flag:'N'
        },
        success: function (datas) {
            if(datas.rows[0]) {
                $("#task-count").append(datas.rows[0].noticeCount);
                var readRadios=0;
                // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
                if(datas.rows[0].readRadio!=""&&datas.rows[0].readRadio!=null){
                    readRadios=datas.rows[0].readRadio;

                    $("#task-percent-span").append(readRadios+'%');
                }else{
                    $("#task-percent-span").append('--');
                }
                $('#row-task-left-circle-canvas').attr("data-percent",readRadios);


                InitiateEasyPieChart.init('row-task-left-circle-canvas');
            }else{
                $("#task-percent-span").append('--');
                $("#task-count").append(0);
                // draw_circle('row-task-left-circle-canvas', 0, '#FFE092');
                $('#row-task-left-circle-canvas').attr("data-percent",0);
            }
        }
    });
    initMainSize();
}


