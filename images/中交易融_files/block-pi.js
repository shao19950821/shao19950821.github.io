/**
 * Created by gaoyang on 2017-2-14.
 */

//------------------------------Real-Time Chart-------------------------------------------//
var realTimedata = [],
    totalPoints = 300,
    plot;

function getRandomData() {
    if (realTimedata.length > 0)
        realTimedata = realTimedata.slice(1);

    // Do a random walk

    while (realTimedata.length < totalPoints) {

        var prev = realTimedata.length > 0 ? realTimedata[realTimedata.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 100) {
            y = 100;
        }
        realTimedata.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < realTimedata.length; ++i) {
        res.push([i, realTimedata[i]]);
    }

    return res;
}

var getSeriesObj = function (res, lastIndex) {
    var currentRes = [], j = 0;
    // for (var i = lastIndex + 1; i <= lastIndex + 10; i++) {
    //     currentRes[j] = res[i];
    //     j++;
    // }
    return [
        {
            data: getRandomData(),
            lines: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0
                        }, {
                            opacity: 1
                        }
                    ]
                },
                steps: false
            },
            shadowSize: 0
        }
    ];
};


function isLeapYear(year) {
    var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
    var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
    var cond3 = year % 400 == 0;  //条件3：年份是400的倍数
    //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
    //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
    //所以得出判断闰年的表达式：
    var cond = cond1 && cond2 || cond3;
    if (cond) {

        return true;
    } else {
        return false;
    }
}
function changeDateStr(dates) {
    var day = dates.getDate()
    var month = dates.getMonth() + 1
    var year = dates.getFullYear();
    return year + '-' + month + '-' + day;
}

function getConContractDueAmount(id, contextPath) {

    $.ajax({
        type: 'GET',
        url: contextPath + '/csh/contract/due/amount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas[0]) {
                //获取Y轴最大值
                var maxDueAmount = 0;
                for (j = 0; j < datas.length; j++) {
                    if (datas[j].sumDueAmount > maxDueAmount) {
                        maxDueAmount = datas[j].sumDueAmount;
                    }
                }
                var date0 = datas[0].due_date.replace('-', '/');
                firstDate = new Date(date0);
                var years = firstDate.getFullYear();
                var newDate = new Date(years, 1, 1);
                //判断闰年
                if (isLeapYear(years)) {
                    yearDay = 365;

                } else {
                    yearDay = 366;
                }
                for (i = 0; i < yearDay; i++) {
                    newDate.setDate(newDate.getDate() + 1);
                    var dueAmount = 0;
                    for (j = 0; j < datas.length; j++) {
                        var dates = datas[j].due_date.replace('-', '/');
                        toDay = new Date(dates);
                        if (changeDateStr(newDate) == changeDateStr(toDay)) {
                            dueAmount = datas[j].sumDueAmount;
                        }
                    }
                    //realTimedata.push(dueAmount);
                }
                var res = [];
                for (var i = 0; i < realTimedata.length; ++i) {
                    res.push([i, realTimedata[i]]);
                }

                draw_block_pi(id, res, yearDay, maxDueAmount);
                $('#' + id).bind('plotclick', function (event, ranges) {
                   /* var myTaskOpen = $("#left-div-my-task-open").kendoWindow(
                        {
                            actions: ["Close"],
                            width: 910,
                            title: '合同清单',
                            visible: false,
                            iframe: true,
                            modal: true,
                            content:contextPath+ '/conManagementIndex.html',
                            close: function (e) {
                                hlsWindowClose(this);
                            }
                        }).data("kendoWindow");
                    hlsWindow(myTaskOpen, 'FULL');*/
                    var url  = contextPath + "/cont/CON000H/conManagementIndex.html";
                    top.openTab('CON000H','合同导航首页',url,null,null,'Y');
                });
            }
        }
    });

}


    function draw_block_pi(id, res, maxX, maxY) {
        plot = $.plot("#" + id, getSeriesObj(res, 0), {
            yaxis: {
                color: '#f3f3f3',
                min: 0,
                max: 100,
                tickFormatter: function (val, axis) {
                    return "";
                }
            },
            xaxis: {
                color: '#f3f3f3',
                min: 0,
                max: 100,
                tickFormatter: function (val, axis) {
                    return "";
                }
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderWidth: 0,
                aboveData: false
            },
            colors: [themeprimary],
        });
        draw_dynamic_pi(res, 10);
    }

    function draw_dynamic_pi(res, lastIndex) {
        plot.setData(getSeriesObj(res, (lastIndex || 0) + 20));
        plot.draw();
        setTimeout(draw_dynamic_pi, 500);
    }
