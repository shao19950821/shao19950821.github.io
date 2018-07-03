/**
 * Created by wangwei on 2017-2-14.
 */

function noticeInit(contextPath) {
    $.ajax({
        type: 'GET',
        url: contextPath + '/hls/system/NoticeCountAndRadio/query',
        contentType: "application/json; charset=utf-8",
        data:{
            read_flag:'N'
        },
        success: function (datas) {
            if(datas.rows[0]) {
                $("#notice-count").append(datas.rows[0].noticeCount);
                var readRadios=0;
                // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
                if(datas.rows[0].readRadio!=""&&datas.rows[0].readRadio!=null){
                    readRadios=datas.rows[0].readRadio;
                    $("#notice-percent-span").append(readRadios+'%');
                }else{
                    $("#notice-percent-span").append('--');
                }

                    $('#row-notice-left-circle-canvas').attr("data-percent",readRadios);



                InitiateEasyPieChart.init('row-notice-left-circle-canvas');
            }else{
                $("#notice-percent-span").append('--');
                $("#notice-count").append(0);
                // draw_circle('row-notice-left-circle-canvas', 0, '#FFE092');
                $('#row-notice-left-circle-canvas').attr("data-percent",0);
            }
        }
    });
}


