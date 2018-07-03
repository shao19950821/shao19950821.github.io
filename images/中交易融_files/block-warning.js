/**
 * Created by wangwei on 2017-2-14.
 */

function warningInit(contextPath) {
    $.ajax({
        type: 'GET',
        url: contextPath+'/hls/system/NoticeCountAndRadio/query',
        contentType: "application/json; charset=utf-8",
        data:'notice_type=EARLY_WARNING',
        success: function (datas) {
            if(datas.rows[0]) {

                $("#warning-count").append(datas.rows[0].noticeCount);
                var readRadios=0;
                // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
                if(datas.rows[0].readRadio!=""&&datas.rows[0].readRadio!=null){
                    readRadios=datas.rows[0].readRadio;
                    $("#warning-percent-span").append(readRadios+'%');
                }else{
                    $("#warning-percent-span").append('--');
                }

                $('#row-warning-left-circle-canvas').attr("data-percent",readRadios);
                InitiateEasyPieChart.init('row-warning-left-circle-canvas');
            }else{
                $("#warning-percent-span").append('--');
                $("#warning-count").append(0);
                // draw_circle('row-warning-left-circle-canvas', 0, '#FFE092');
                $('#row-warning-left-circle-canvas').attr("data-percent",0);
            }
        }
    });
}

