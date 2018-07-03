/**
 * Created by wangwei on 2017-2-14.
 */
/**
 * 总金额
 */
function loadConOverDueTotal(contextPath){
    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/TotalOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas) {
                $("#con-overdue-total").append(formatCurrency(datas));
            } else {
                $("#con-overdue-total").append('￥0.00');
            }
        }
    });

}
/**
 * 本周
 */
function loadConOverDueWeek(contextPath){
    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/CurrentWeekOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas) {
                $("#con-overdue-week").append(formatCurrency(datas));
            } else {
                $("#con-overdue-week").append('￥0.00');
            }
        }
    });

}

/**
 * 昨天
 */
function loadConOverDueYestoday(contextPath){
    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/YesterdayOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {


            if (datas) {
                $("#con-overdue-yestoday").append(formatCurrency(datas));
            } else {
                $("#con-overdue-yestoday").append('￥0.00');
            }
        }
    });

}

/**
 * 昨天
 */
function loadConOverDueToday(contextPath){
    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/TodayOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if(datas){
                $("#con-overdue-today").append(formatCurrency(datas));
            }else{
                $("#con-overdue-today").append('￥0.00');
            }

        }
    });

}

/**
 * 图表填充
 */

function conOverdueChartInit(contextPath){

    $.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/LastWeekOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if(datas[0]){
                var amountStr=datas[0].overdueAmount6+','
                    +datas[0].overdueAmount5+','
                    +datas[0].overdueAmount4+','
                    +datas[0].overdueAmount3
                    +','+datas[0].overdueAmount2
                    +','+datas[0].overdueAmount1
                    +','+datas[0].overdueAmount1;
                //('#contract-overdue-span').text(amountStr);
                $('#contract-overdue-span').text('1,12,1,23,22,1,1');
                InitiateSparkline2Charts.init();
            }


        }
    });

}

function initWeekContent(){
    var sysDateStr=$('#sysData').text();
    sysDateStr=sysDateStr.replace('年','-').replace('月','-').replace('日','');
    var year = sysDateStr.split('-')[0];
    var month = sysDateStr.split('-')[1];
    var date = sysDateStr.split('-')[2];
    var newDate =new Date(year,month,date);
    var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
    $('#day-1').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-2').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-3').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-4').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-5').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-6').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $('#day-7').text(dayNames[newDate.getDay()]);
}

function loadConOverDueData(contextPath){
    loadConOverDueTotal(contextPath);
    loadConOverDueWeek(contextPath);
    loadConOverDueYestoday(contextPath);
    loadConOverDueToday(contextPath);
    conOverdueChartInit(contextPath);
    initWeekContent();
}

