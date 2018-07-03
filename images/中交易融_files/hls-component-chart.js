/**
 * [组件-图-HlsBarChart]
 */
function HlsBarChart() {
}

hlsExtend(HlsBarChart, HlsConponentChart);

HlsBarChart.prototype._init = function (opt) {
    if (!this.initFlag) {
        this.opt = {
            gridType: "HlsBarChart",
            id: "",
            hlsDataSource: [],
            contextPath: "",
            chartBtnType: ""
        };
        $.extend(true, this.opt, opt || {});
    } else {
        $("#BAR_" + this.opt.id).empty();
    }

    this.settingEvent();
    this.settingParamMap();
    this.renderUI();
    this.registerClickEvetn();
    this.initFlag = true;
}
HlsBarChart.prototype.settingEvent = function () {
    var eventStr = this.opt.chartBtnType, eventsArr = [], events = {};
    if (eventStr) {
        eventsArr = eventStr.split(',');
        eventsArr.forEach(function (o) {
            var tmpArr = o.split(":");
            events[tmpArr[0]] = window[tmpArr[1]];
        });
    }
    ;
    this.events = events;
}

HlsBarChart.prototype.renderUI = function () {
    opt = this.opt;
    if (opt.showType == 'bar') {
        Morris.Bar({
            element: 'BAR_' + opt.id,
            data: window[opt.hlsDataSource.split(',')[0]].dataSource,
            xkey: [opt.paramMapObj.xkey.map],
            ykeys: opt.paramMapObj.ykeys.map.split(','),
            labels: opt.paramMapObj.labels.map.split(','),
            hideHover: 'auto',
            barColors: opt.paramMapObj.barColors.map.split(','),
            barSizeRatio: [opt.paramMapObj.barSizeRatio.map] || 0.5,
            xLabelMargin:10//控制底部横轴标注之间的距离
        });
    } else if (opt.showType == 'line') {
        Morris.Line({
            element: 'BAR_' + opt.id,
            data: window[opt.hlsDataSource.split(',')[0]].dataSource,
            xkey: [opt.paramMapObj.xkey.map],
            ykeys: opt.paramMapObj.ykeys.map.split(','),
            labels: opt.paramMapObj.labels.map.split(','),
            lineColors: opt.paramMapObj.barColors.map.split(','),
            parseTime: false
        });
    }


    if(opt.hlsDataSource.split(',').length >1){
        var html = '', a = 1, titleBarDataSource = window[opt.hlsDataSource.split(',')[1]].dataSource || [];
        var littleTitleBar = opt.paramMapObj.littleTitleBar, textArr = [], valueArr = [];
        if (littleTitleBar) {
            textArr = littleTitleBar.description.split(',');
            valueArr = littleTitleBar.map.split(',');
        }
        debugger;
        for (var i = 0; i < textArr.length; i++) {
            html += '<div class="hls-bar-chart-statistical-case-col" style="left:' +(140+ (a-1) * 60) + 'px;">';
            html += '<p class="hls-bar-chart-statistical-case-col-text">' + textArr[i] + '</p>';
            html += '<p class="hls-bar-chart-statistical-case-col-value">' + titleBarDataSource[0][valueArr[i]] + '</p>';
            html += '</div>';
            a++;
        }
        var divEle = $("<div></div>");
        divEle.html(html);
        $("#" + opt.id).append(divEle);
    }
}

HlsBarChart.prototype.registerClickEvetn = function () {
    var opt = this.opt, self = this;
    $("#EVENT_" + opt.id).bind("click", function (e) {
        var event = e || window.event;
        switch (event.target.name) {
            case "modify":
                if (self.events['modify']) {
                    self.events['modify']();
                }
                break;
            case "add":
                if (self.events['add']) {
                    self.events['add']();
                }
                break;
        }
        event.preventDefault();
    });
}

/*********************************** 组件-图-HlsBarChart END ****************************/


/**
 *[组件-图-HlsPieChart]
 */
function HlsPieChart() {

}

hlsExtend(HlsPieChart, HlsConponentChart);

HlsPieChart.prototype._init = function (opt) {
    this.opt = {};
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsPieChart.prototype.renderUI = function () {
    var data = this.opt.hlsDataSource;

    // 结果可能是数组,也可能是对象
    var item = Array.isArray(data) ? data[0] : data;
    if (item) {
        var percent = item[this.opt.paramMapObj.percent.map],
            count = item[this.opt.paramMapObj.count.map];

        $("#" + this.opt.id + "-task-count").append(count);
        if (percent != "" && percent != null) {
            $("#" + this.opt.id + "-task-percent-span").append(percent + '%');
        } else {
            $("#" + this.opt.id + "-task-percent-span").append('--');
        }
        $("#" + this.opt.id + "-row-task-left-circle-canvas").attr("data-percent", percent);


        // InitiateEasyPieChart 在header_custom.html引入
        InitiateEasyPieChart.init(this.opt.id + "-row-task-left-circle-canvas");

    } else {
        $("#" + this.opt.id + "-task-percent-span").append('--');
        $("#" + this.opt.id + "-task-count").append(0);
        $("#" + this.opt.id + "-row-task-left-circle-canvas").attr("data-percent", 0);
    }
}

/*********************************** 组件-图-HlsPieChart END ****************************/


/**
 * [组件-图-HlsRateSumChart]
 */
function HlsRateSumChart() {

}

hlsExtend(HlsRateSumChart, HlsConponentChart);



HlsRateSumChart.prototype._init = function (opt) {
    this.opt = {
        chartType: "rateSumChart",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsRateSumChart.prototype.renderUI = function () {
    var datas = this.opt.hlsDataSource, self = this;
    var total = datas[self.opt.paramMapObj['total'].map];
    total = Hls.formatCurrency(total);
    var part = datas[self.opt.paramMapObj['part'].map];
    part =  Hls.formatCurrency(part);
    var left = minus(datas[self.opt.paramMapObj['total'].map],datas[self.opt.paramMapObj['part'].map]);
    left =  Hls.formatCurrency(left);

    $("#throwTotalAmountId_"+ this.opt.id).html(total);
    $("#receivedThrow_"+ this.opt.id).html(part);
    $("#noThrow_"+ this.opt.id).html(left);

    var recyclePrincipalObj = document.getElementById("receivedThrowTotalAmountId_" + this.opt.id);
    var percent = div(datas[self.opt.paramMapObj['part'].map],datas[self.opt.paramMapObj['total'].map]);
    recyclePrincipalObj.innerHTML = Hls.numberToParcent(percent);
    recyclePrincipalObj.style.width = Hls.numberToParcent(percent);
}

/*********************************** 组件-图-HlsRateSumChart END ****************************/


/**
 * [组件-图-HlsAnalyseCountChart]
 */

function HlsAnalyseCountChart() {

}

hlsExtend(HlsAnalyseCountChart, HlsConponentChart);

HlsAnalyseCountChart.prototype._init = function (opt) {
    var contextPath = opt.contextPath;
    this.opt = {
        id: "",
        chartType: "ANALYSECOUNT",
        hlsDataSource: [],
        locateEvent: null
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}
HlsAnalyseCountChart.prototype.renderUI = function () {
    //this.filterData();
    console.log(this.opt);
    var datas = this.opt.hlsDataSource, contextPath = this.opt.contextPath, self = this;
    var colors = [];
    var pieDatas = [];
    var totalCount = 0;
    for (var i = 0; i < statusInfo.length; i++) {
        var isExsit = false;
        for (var j = 0; j < datas.length; j++) {
            for (var attr in datas[j]) {
                if (statusInfo[i].status == datas[j][attr]) {
                    totalCount += datas[j][statusInfo[i].valueParam];
                    var pie = {};
                    pie.label = statusInfo[i].statusValue;
                    pie.value = datas[j][statusInfo[i].valueParam];
                    pieDatas.push(pie);
                    isExsit = true;
                    break;
                }
            }
        }
        if (!isExsit) {
            var pie = {};
            pie.label = statusInfo[i].statusValue;
            pie.value = 0;
            pieDatas.push(pie);
        }
        colors.push(statusInfo[i].color);
    }
    var pointcolors = colors;
    console.log(pieDatas);
    initPie.call(this,'row-second-middle-top-body-foot1_' + this.opt.id, pieDatas, pointcolors)
    var total = document.getElementById("con-contract-total-count_" + this.opt.id);
    total.innerHTML = totalCount;
    var color1Width = parseInt(((datas[0][statusInfo[0].newAddParam]) / totalCount) * 681);
    $("#con-percent-color-1_" + this.opt.id + " span").html(datas[0][statusInfo[0].newAddParam]);
    $("#con-percent-color-1_" + this.opt.id).css("width", color1Width + "px");
    $("#con-percent-color-2_" + this.opt.id).css("width", (681 - color1Width ) + "px");
    var arr = this.opt.items || [];
    var length = arr.length;
    var html = "";
    for (var i = 0; i < length; i++) {
        html = html + '<div  style="float:left;margin-left:18px;color: #000;width: 72px;height: 25px">' + arr[i].defaultMessage + '</div>'
    }
    var topline = document.getElementById("foot2_" + this.opt.id);
    topline.innerHTML = html;
    html = "";
    for (var i = 0; i < statusInfo.length; i++) {
        var isExsit = false;
        for (var j = 0; j < datas.length; j++) {
            for (var attr in datas[j]) {
                if (statusInfo[i].status == datas[j][attr]) {
                    html = html + '<div class="row-second-middle-top-body-foot2-table global-font-size12">';
                    for (var k = 0; k < this.opt.items.length; k++) {
                        if (this.opt.items[k].name == "status") {
                            html = html + '<div class="row-second-middle-top-body-foot2-table-div-1" style="background-color: ' + pointcolors[i] + '"></div>';
                            html = html + '<div class="con-status-kind-name">' + statusInfo[i].statusValue + '</div>';
                        }
                        else if (this.opt.items[k].name == "percentCount") {
                            html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + parseInt(datas[j][this.opt.paramMapObj.percentCount.map]) + '%</div>';
                        }
                        else if (this.opt.items[k].name == "itemNum") {
                            html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + parseInt(datas[j][this.opt.paramMapObj.itemNum.map]) + '</div>';
                        } else {
                            html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + datas[j][this.opt.paramMapObj[this.opt.items[k].name].map] + '</div>';
                        }

                    }
                    html = html + '</div>';
                    $("#body2_" + this.opt.id).append(html);
                    html = "";
                    isExsit = true;
                    break;
                }
            }
        }

        if (!isExsit) {
            html = html + '<div class="row-second-middle-top-body-foot2-table global-font-size12">';
            for (var k = 0; k < this.opt.items.length; k++) {
                if (this.opt.items[k].name == "status") {
                    html = html + '<div class="row-second-middle-top-body-foot2-table-div-1" style="background-color: ' + pointcolors[i] + '"></div>';
                    html = html + '<div class="con-status-kind-name">' + statusInfo[i].statusValue + '</div>';
                }
                else if (this.opt.items[k].name == "percentCount") {
                    html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + 0 + '%</div>';
                }
                else if (this.opt.items[k].name == "itemNum") {
                    html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + 0 + '</div>';
                } else {
                    html = html + '<div class="con-status-kind-per" style="width: 70px;height: 25px;margin-left:11px">' + '--' + '</div>';
                }

            }
            html = html + '</div>';
            $("#body2_" + this.opt.id).append(html);
            html = "";
        }
    }


}

function initPie(element_v, datas, colors) {
    var self = this;
    var Donut = Morris.Donut({
        noDataContent: "暂无数据",
        element: element_v,
        data: datas,
        colors: colors,
        formatter: function (y) {
            return y;
        }
    });
    Donut.handlers = Donut.handlers || {};
    Donut.handlers.click = Donut.handlers.click || [];
    Donut.handlers.click.push(function (arg, arg1) {
        window[self.opt.clickFunc](arg, arg1);
    });

}

/*********************************** 组件-图-HlsAnalyseCountChart END ****************************/


/*
 *[组件-图-HlsCircularChart]
 */
function HlsCircularChart() {

}

hlsExtend(HlsCircularChart, HlsConponentChart);

HlsCircularChart.prototype._init = function (opt) {
    console.log(opt);
    this.opt = {
        gridType: "CIRCULAR",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    // this.settingEvent();
    this.settingParamMap();
    this.renderUI();
}
HlsCircularChart.prototype.renderUI = function () {
    var html = "";
    var option = this.opt;
    var value = "";
    var label = "";
    var valueArr = [];
    var labelArr = [];
    var colorArr = [];
    var approvalStatus = [];
    var hlsDatas = option.hlsDataSource[0] ? option.hlsDataSource[0] : option.hlsDataSource;
    if (option.status) {
        for (var i = 0; i < option.status.length; i++) {
            labelArr.push(option.status[i].statusValue);
            valueArr.push(hlsDatas[option.status[i].valueParam]);
            colorArr.push(option.status[i].color);
            if (i > (colorArr.length - 1)) {
                html += '<span style="' + this.opt.descStyle + '"><i style="color:' + colorArr[0] + '">■</i>' + option.status[i].statusValue + '</span>'
            } else {
                html += '<span style="' + this.opt.descStyle + '"><i style="color:' + option.status[i].color + '">■</i>' + option.status[i].statusValue + '</span>'
            }
        }
        for (var k = 0; k < labelArr.length; k++) {
            approvalStatus.push({
                label: labelArr[k],
                value: valueArr[k]
            })
        }
    }
    else {
        for (var i = 0; i < this.opt.items.length; i++) {
            var labelName = this.opt.items[i].name;
            if (i != (this.opt.items.length - 1)) {
                label += this.opt.paramMapObj[labelName].map + ',';
                value += hlsDatas[labelName] + ',';
            } else {
                label += this.opt.paramMapObj[labelName].map;
                value += hlsDatas[labelName];
            }
        }
        valueArr = value.split(",");
        labelArr = label.split(",");
        colorArr = this.opt.color.split(",")
        for (var k = 0; k < labelArr.length; k++) {
            approvalStatus.push({
                label: labelArr[k],
                value: valueArr[k]
            })
        }
        for (var i = 0; i < this.opt.items.length; i++) {
            var labelName = this.opt.items[i].name;
            if (i > (colorArr.length - 1)) {
                html += '<span style="' + this.opt.descStyle + '"><i style="color:' + colorArr[0] + '">■</i>' + this.opt.paramMapObj[labelName].map + '</span>'
            } else {
                html += '<span style="' + this.opt.descStyle + '"><i style="color:' + colorArr[i] + '">■</i>' + this.opt.paramMapObj[labelName].map + '</span>'
            }
        }
    }

    $("#show_" + this.opt.id).html(html);
    var element_v = this.opt.id + '_chart';
    var Donut = Morris.Donut({
        element: element_v,
        data: approvalStatus,
        colors: colorArr,
        formatter: function (y) {
            if (option.formatter) {
                return window[option.formatter](y);
            } else {
                return y;
            }

        }
    });
    Donut.handlers = Donut.handlers || {};
    Donut.handlers.click = Donut.handlers.click || [];
    Donut.handlers.click.push(function (arg, arg1) {
        window[option.clickFunc](arg, arg1.label);
    });
}
/*********************************** 组件-图-HlsCircularChart END ****************************/


/*
 *[组件-图-HlsSolidPieChart]
 */
function HlsSolidPieChart() {

}

hlsExtend(HlsSolidPieChart, HlsConponentChart);

HlsSolidPieChart.prototype._init = function (opt) {
    this.opt = {
        gridType: "SOLID",
        id: "",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    // this.settingEvent();
    this.settingParamMap();
    this.renderUI();
}
HlsSolidPieChart.prototype.renderUI = function () {
    console.log(this.opt);
    var html = "";
    var option = this.opt;
    var value = "";
    var label = "";
    var chartPie = null;
    for (var i = 0; i < this.opt.items.length; i++) {
        var labelName = this.opt.items[i].name;
        if (this.opt.hlsDataSource[0]) {
            if (i != (this.opt.items.length - 1)) {
                label += this.opt.paramMapObj[labelName].map + ',';
                value += this.opt.hlsDataSource[0][labelName] + ',';
            } else {
                label += this.opt.paramMapObj[labelName].map;
                value += this.opt.hlsDataSource[0][labelName];
            }
        } else {
            if (i != (this.opt.items.length - 1)) {
                label += this.opt.paramMapObj[labelName].map + ',';
                value += this.opt.hlsDataSource[labelName] + ',';
            } else {
                label += this.opt.paramMapObj[labelName].map;
                value += this.opt.hlsDataSource[labelName];
            }
        }
    }
    var valueArr = value.split(",");
    var labelArr = label.split(",");
    var colorArr = this.opt.color.split(",");
    var pieData = [];
    for (var k = 0; k < labelArr.length; k++) {
        if (k > (colorArr.length - 1)) {
            pieData.push({
                label: labelArr[k],
                value: valueArr[k],
                color: colorArr[0]
            });
        } else {
            pieData.push({
                label: labelArr[k],
                value: valueArr[k],
                color: colorArr[k]
            });
        }
    }
    for (var i = 0; i < this.opt.items.length; i++) {
        var labelName = this.opt.items[i].name;
        if (i > (colorArr.length - 1)) {
            html += '<span style="' + this.opt.descStyle + '" titleTip="' + labelName + '"><i style="color:' + colorArr[0] + '">■</i>' + this.opt.paramMapObj[labelName].map + '</span>'
        } else {
            html += '<span style="' + this.opt.descStyle + '" titleTip="' + labelName + '"><i style="color:' + colorArr[i] + '">■</i>' + this.opt.paramMapObj[labelName].map + '</span>'
        }
    }
    $("#show_solid" + this.opt.id).html(html);
    console.log(pieData);
    var ctx = document.getElementById(this.opt.id).getContext("2d");
    chartPie = new Chart(ctx).Pie(pieData, {segmentShowStroke: 'false', showTooltips: 2});
    if (option.clickFunc != '') {
        var eventType = option.triggerEvent;
        var node = chartPie.chart.canvas;
        if (node.addEventListener) {
            node.addEventListener(eventType, function (evt) {
                var segments = chartPie.getSegmentsAtEvent(evt);
                if (segments.length > 0) {
                    var segment = segments[0];
                    var lab = segment.label;
                    window[option.clickFunc](lab);
                }
            });
        } else if (node.attachEvent) {
            node.attachEvent("on" + eventType, function (evt) {
                var segments = chartPie.getSegmentsAtEvent(evt);
                if (segments.length > 0) {
                    var segment = segments[0];
                    var lab = segment.label;
                    window[option.clickFunc](lab);
                }
            });
        } else {
            node["on" + eventType] = function (evt) {
                var segments = chartPie.getSegmentsAtEvent(evt);
                if (segments.length > 0) {
                    var segment = segments[0];
                    var lab = segment.label;
                    window[option.clickFunc](lab);
                }
            }
        }
    }
}
/*********************************** 组件-图-HlsSolidPieChart END ****************************/


/*
 *[组件-图-HlsBrokenChart]
 */
function HlsBrokenChart() {

}

hlsExtend(HlsBrokenChart, HlsConponentChart);

HlsBrokenChart.prototype._init = function (opt) {
    this.opt = {
        chartType: "BROKEN",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsBrokenChart.prototype.renderUI = function () {
    var self = this;
    self.$topCont = $("#" + this.opt.id + "-con-overdue-total");
    self.$bottomCont = $("#" + this.opt.id + "-outDiv");
    self.$graph = $("#" + this.opt.id + "-contract-overdue-span");
    self._initTopCont();
    self._initBottomBar();
    self._initMainGraphCont();
    self._initClickLink();
    var tdate = new Date();
    var tyearss = tdate.getFullYear();
    var tmonthss = tdate.getMonth() + 1;
    var tday = tdate.getDate();
    console.log(tyearss + "年" + tmonthss + "月" + tday + "日");
    $("#" + self.opt.id + "sysData").html(tyearss + "年" + tmonthss + "月" + tday + "日");
}
HlsBrokenChart.prototype._initTopCont = function () {
    var self = this;
    var datas = this.opt.hlsDataSource;
    if (datas && datas[0]) {
        var sumAcount = 0;
        for (var i = 0; i < datas.length; i++) {
            sumAcount = plus(sumAcount, datas[i][self.opt.paramMapObj.sumParam.map]);
        }
        self.$topCont.html(Hls.formatCurrency(sumAcount.toFixed(2)));
    } else {
        self.$topCont.html('￥0.00');
    }
}
HlsBrokenChart.prototype._initBottomBar = function () {
    var self = this;
    var days = parseInt(self.opt.dayInterval);
    if (days <= 7) {
        var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var newDate = new Date();
        newDate.setDate(newDate.getDate() - 6);
        self.createBottomBarNode(7, "week");
        var spanGather = self.$bottomCont.find("span");
        $.each(spanGather, function (index) {
            if (index == spanGather.length - 1) {
                $(this).text(dayNames[newDate.getDay()] + "(ToDay)");
            } else {
                $(this).text(dayNames[newDate.getDay()]);
            }
            newDate.setDate(newDate.getDate() + 1);
        })
    }
    else {
        var sysDateStr = self.getCurrentTime();
        self.createBottomBarNode(7, "oneMonth");
        $('#' + self.opt.id + '-day-7').text(sysDateStr);
        var previousDate = self.getTheDate(sysDateStr, -(parseInt(days / 7) + 1));
        for (var k = 6; 0 < k; k--) {
            $('#' + self.opt.id + '-day-' + k).text(previousDate);
            previousDate = self.getTheDate(previousDate, -(parseInt(days / 7) + 1));
        }
    }
}
HlsBrokenChart.prototype.getCurrentTime = function () {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
HlsBrokenChart.prototype.getTheDate = function (dd, dadd) {
    var a = null;
    if (typeof dd != 'object') {
        a = new Date(dd.replace(/-/g, "/"));
    } else {
        a = dd;
    }
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a);
    var m = a.getMonth() + 1;
    if (m.toString().length == 1) {
        m = '0' + m;
    }
    var d = a.getDate();
    if (d.toString().length == 1) {
        d = '0' + d;
    }
    return a.getFullYear() + "-" + m + "-" + d;
}
HlsBrokenChart.prototype.createBottomBarNode = function (sum, type) {
    var self = this;
    var class1 = "databox-cell cell-2 text-align-center no-padding padding-top-5";
    var class2 = "databox-header white";
    var parentDiv = self.$bottomCont[0];
    $(parentDiv).empty();
    for (var i = 0; i < sum; i++) {
        var cDiv = document.createElement("div");
        cDiv.setAttribute("class", class1);
        var cSpan = document.createElement("span");
        cSpan.setAttribute("class", class2);
        var cId = i + 1;
        cId = self.opt.id + "-day-" + cId;
        cSpan.setAttribute("id", cId);

        if (type == "week") {
            cDiv.style.width = "14.28%";
            cSpan.style.fontSize = "14px";
        }
        else if (type == "oneMonth" || type == "threeMonth") {
            cDiv.style.width = "14.28%";
            cSpan.style.fontSize = "12px";
        }
        cDiv.appendChild(cSpan);
        parentDiv.appendChild(cDiv);
    }
}
HlsBrokenChart.prototype._initMainGraphCont = function () {
    var self = this;
    var timeAcount = parseInt(self.opt.dayInterval);
    var datas = this.opt.hlsDataSource;
    var content = [];
    if (!datas) {
        content = new Array(timeAcount + 1);
        var cont = content.join(0 + ',');
        self.$graph.text(cont.substr(0, cont.length - 1));
    } else {
        var previousDate = self.getTheDate(self.getCurrentTime(), -timeAcount);
        self.timeArray = [];
        for (var i = 0; i <= timeAcount + 1; i++) {
            var temp = 0;
            for (var j = 0; j < datas.length; j++) {
                if (/\d{4}-\d{1,2}-\d{1,2}/g.exec(datas[j][self.opt.paramMapObj.getDate.map]) == previousDate) {
                    console.log(datas[j][self.opt.paramMapObj.sumParam.map]);
                    temp += datas[j][self.opt.paramMapObj.sumParam.map];
                }
                console.log('/');
            }
            self.timeArray.push(previousDate);
            content.push(temp);
            previousDate = self.getTheDate(previousDate, 1);
        }
        content = content.toString();
        self.$graph.text(content);
    }
    InitiateSparkline2Charts.init(self.opt.id + "-contract-overdue-span");
}
HlsBrokenChart.prototype._initClickLink = function () {
    var self = this;
    self.$graph.bind('click', function (ev) {
        window[self.opt.clickFunc](self.mousePosTime);
    });
    self.$graph.bind('sparklineRegionChange', function (ev) {
        var sparkline = ev.sparklines[0];
        var region = sparkline.getCurrentRegionFields();
        var value = region.y;
        var x = region.x;
        if (self.timeArray) {
            self.mousePosTime = self.timeArray[x];
        }
    });
}

/*********************************** 组件-图-HlsBrokenChart END ****************************/


/**
 *[组件-图-HlsLineChart]
 */
function HlsLineChart() {

}

hlsExtend(HlsLineChart, HlsConponentChart);

HlsLineChart.prototype._init = function (opt) {
    this.opt = {
        gridType: "HlsLineChart",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
    this.registerClickEvent();
}

HlsLineChart.prototype.registerClickEvent = function () {
    var opt = this.opt, self = this;
    var clickEvent = opt.clickFunc, events = {};
    events = window[clickEvent];
    this.events = events;
    document.querySelector("#" + opt.id).addEventListener("click", function (e) {
        var event = e || window.event;
        if (clickEvent) {
            self.events();
        }
        event.preventDefault();
    }, false);
}

HlsLineChart.prototype.renderUI = function () {
    var opt = this.opt , datas = opt.hlsDataSource || [];
    var map = opt.paramMapObj;
    var titleLeft = map.titleLeft,
        titleRight = map.titleRight;

    // ykeyArr 存的是每个单位的数
    // ykeyTotalArr 存的是每个单位的累加
    var ykeyArr = [], ykeyTotalArr = [], tmp = 0 , current = 0;

    var currentMonth = new Date().getMonth();
    datas.forEach(function (value,index) {
        var num = Hls.numberToDecimal2(value[map.ykey.map]);
        ykeyArr.push(num);

        tmp += num;
        ykeyTotalArr.push(tmp);

        if(index == currentMonth){
            current = num;
        }
    });

    if (titleLeft) {
        $("#" + this.opt.id + "-total-description").html(titleLeft.description || '');
        $("#" + this.opt.id + "-total-amount").html(Hls.formatCurrency(tmp));
    }
    if (titleRight) {
        $("#" + this.opt.id + "-every-description").html(titleRight.description || '');
        $("#" + this.opt.id + "-every-amount").html(Hls.formatCurrency(current));
    }

    $("#" + this.opt.id + "-span").attr("data-composite", ykeyArr.join(','));
    $("#" + this.opt.id + "-span").text(ykeyTotalArr.join(','));
    InitiateSparklineCharts.init("#" + this.opt.id + "-span");
}

/*********************************** 组件-图-HlsLineChart END ****************************/


/**
 *[HlsFoldLineChart]
 */
function HlsFoldLineChart() {

}

hlsExtend(HlsFoldLineChart, HlsConponentChart);

HlsFoldLineChart.prototype._init = function (opt) {
    this.opt = {
        id: "",
        hlsDataSource: [],
        color: ""
    };
    $.extend(true, this.opt, opt || {});
    $("#" + this.opt.chartId).empty()
    this.settingParamMap();
    this.renderUI();
}

HlsFoldLineChart.prototype.renderUI = function () {
    var self = this;
    var items = self.opt.items;
    var color = self.opt.color;
    var data = self.opt.hlsDataSource;
    for (var i = 0; i < data.length; i++) {
        data[i].xkeyValue = data[i][self.opt.paramMapObj.xkey.map] + self.opt.paramMapObj.unit.map;
    }
    if (data.length > 1) {
        var title = self.opt.showTitle;
        for (var i = 0; i < data.length; i++) {
            if (title != null && title != "") {
                $("#" + self.opt.titleId).html(title);
            }
        }
    }
    else {
        $("#" + self.opt.titleId).html(data[0][title]);
    }
    $("#account_first_title_color").css("background", color);
    var Donut1 = Morris.Area({
        element: self.opt.chartId,
        data: data,
        xkey: 'xkeyValue',
        ykeys: [self.opt.paramMapObj.ykeys.map],
        labels: [self.opt.paramMapObj.labels.map],
        pointSize: 2,
        hideHover: 'auto',
        lineColors: [color],
        parseTime: false
    });
    Donut1.handlers = Donut1.handlers || {};
    Donut1.handlers.click = Donut1.handlers.click || [];

    Donut1.handlers.click.push(function (arg, arg1) {
        window[self.opt.clickFunc](arg, arg1);
    });
}

/*********************************** 组件-图-HlsFoldLineChart END ****************************/


/**
 *[HlsInfoSquareFrame]
 */

function HlsInfoSquareFrame() {

}

hlsExtend(HlsInfoSquareFrame, HlsConponentChart);


HlsInfoSquareFrame.prototype.renderUI = function () {
    var opt = this.opt;
    var datas = this.opt.hlsDataSource[0] ? this.opt.hlsDataSource[0] : this.opt.hlsDataSource;
    var sum = Hls.formatCurrency(datas[opt.paramMapObj.amount.map] || 0),
        count = datas[opt.paramMapObj.count.map] || 0;
    var html = "";
    //判断map是否为空 当map为空的时候不拼接这部分
    var countFlag = 'Y';
    if (opt.paramMapObj.count.map == '' || opt.paramMapObj.count.map == null) {
        countFlag = 'N';
    }
    html = html + '<div style="background:white" class="infoSquareFrameNavBlockLeft">';
    html = html + '<img class="infoSquareFrameSecongImg" src="' + this.opt.titleImg.trim() + '" alt="png"/>';
    html = html + '<span  style="display:block;font-weight:bold;text-align:right;height:47px;line-height:35px;">' + sum + '</span>';
    html = html + '</div>';
    html = html + '<div style="background:' + this.opt.color + ';color:#fff;padding:10px;box-sizing: border-box" class="infoSquareFrameNavBlockRight">';
    if (countFlag == "Y") {
        html = html + '<p style="font-size: 13px">' + count + '笔</p>';
    }

    html = html + '<p style="font-size: 13px;line-height: 47px">' + opt.paramMapObj.title.defaultMessage || '--' + '</p>';
    html = html + '</div>';
    $('#' + this.opt.id).empty().append(html);
}
HlsInfoSquareFrame.prototype._init = function (opt) {
    this.opt = {
        chartType: "SQUAREFRAME",
        id: "",
        hlsDataSource: [],
        contextPath: ""
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

/*********************************** 组件-图-HlsInfoSquareFrame END ****************************/


/**
 * [HlsShiftChat]
 */
function HlsShiftChart() {

}

hlsExtend(HlsShiftChart, HlsConponentChart);

HlsShiftChart.prototype._init = function (opt) {
    this.opt = {
        gridType: "HlsShiftChart",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsShiftChart.prototype.renderUI = function () {
    opt = this.opt;
    var InitiateStackedChart = function () {
        return {
            init: function () {
                d1 = [];
                var datas = opt.hlsDataSource;
                var x = opt.paramMapObj.xkey.map;
                var y = opt.paramMapObj.ykeys.map;
                for (var i = 0; i < datas.length; i++) {
                    try {
                        var time = new Date(datas[i][x]);
                        d1.push([time.getDate(), datas[i][y]]);
                    } catch (e) {
                        d1.push(datas[i][x], datas[i][y]);
                    }
                }
                var data1 = [{
                    data: d1,
                    color: themeprimary
                }];

                var stack = 0,
                    steps = false;

                function plotWithOptions() {
                    $.plot($("#Line_" + opt.id), data1, {
                        series: {
                            stack: stack,
                            lines: {
                                lineWidth: 1,
                                show: true,
                                fill: true,
                                steps: steps
                            },
                            bars: {
                                show: false,
                                barWidth: 0.3
                            }
                        },
                        xaxis: {
                            color: gridbordercolor,
                            tickDecimals: 0
                        },
                        yaxis: {
                            color: gridbordercolor
                        },
                        grid: {
                            hoverable: true,
                            clickable: false,
                            borderWidth: 0,
                            aboveData: false
                        },
                        legend: {
                            noColumns: 3
                        },
                    });
                    $.plot($("#Bar_" + opt.id), data1, {
                        series: {
                            stack: stack,
                            lines: {
                                lineWidth: 1,
                                show: false,
                                fill: true,
                                steps: steps
                            },
                            bars: {
                                show: true,
                                barWidth: 0.4
                            }
                        },
                        xaxis: {
                            color: gridbordercolor,
                            tickDecimals: 0
                        },
                        yaxis: {
                            color: gridbordercolor
                        },
                        grid: {
                            hoverable: true,
                            clickable: false,
                            borderWidth: 0,
                            aboveData: false
                        },
                        legend: {
                            noColumns: 3
                        },
                    });
                }

                plotWithOptions();
            }
        };
    }();
    InitiateStackedChart.init();
}

/*********************************** 组件-图-HlsShiftChart END ****************************/


/**
 *[HlsPercentChart]
 */
function HlsPercentChart() {

}

hlsExtend(HlsPercentChart, HlsConponentChart);

HlsPercentChart.prototype._init = function (opt) {
    var contextPath = opt.contextPath;
    this.opt = {
        id: "",
        hlsDataSource: [],
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsPercentChart.prototype.renderUI = function () {
    debugger;
    var contextPath = this.opt.contextPath;
    var datas = this.opt.hlsDataSource;
    var items = this.opt.items;
    var percent = this.opt.percent;
    var id = this.opt.id;
    var appendHtml = '';
    if (datas[0]) {
        if (percent != undefined) {
            var radio = (datas[0][percent] * 100).toFixed(4);
            if (radio != null || radio != undefined) {
                $("#percent-span" + id).append(radio + '%');
            } else {
                $("#percent-span" + id).append('--');
            }
            $('#circle-canvas' + id).attr("data-percent", radio);
            $('#circle-canvas' + id).attr("data-trackcolor", this.opt.trackColor);
            InitiateEasyPieChart.init('circle-canvas' + id);
        }
    }
    if (items) {
        for (var i = 0; i < items.length; i++) {
            appendHtml += ' <div class="hls-precent-chart-img" style=" background-color:';
            appendHtml += items[i].iconColor;
            appendHtml += ' ;"></div> ';
            appendHtml += ' <div class="hls-precent-chart-title"> ';
            appendHtml += items[i].message;
            appendHtml += ' </div> ';
        }
        $("#" + this.opt.id).append(appendHtml);
    }
}
var InitiateEasyPieChart1 = function () {
    return {
        init: function (id) {
            var easypiecharts = $('#' + id);
            var barColor = getcolor(easypiecharts.data('barcolor')) || themeprimary,
                trackColor = getcolor(easypiecharts.data('trackcolor')) || false,
                scaleColor = getcolor(easypiecharts.data('scalecolor')) || false,
                lineCap = easypiecharts.data('linecap') || "round",
                lineWidth = easypiecharts.data('linewidth') || 3,
                size = easypiecharts.data('size') || 110,
                animate = false;

            easypiecharts.easyPieChart({
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: scaleColor,
                lineCap: lineCap,
                lineWidth: lineWidth,
                size: size,
                animate: animate
            });
        }
    };
}();

/*********************************** 组件-图-HlsPercentChart END ****************************/

/**
 *
 * [HlsMultiBarChart]
 */

function HlsMultiBarChart() {
}

HlsMultiBarChart.prototype._init = function (opt) {
    this.opt = {
        gridType: "HlsMultiBarChart",
        hlsDataSource: [],
        xAxis_categories: [],
        series_name: [],
        series_data: [],
        series_color: []
    };
    $.extend(true, this.opt, opt || {});
    this.renderUI();
}

HlsMultiBarChart.prototype.renderUI = function () {
    var opt = this.opt;
    $("#" + opt.id).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: window[opt.xAxis_categories],
            tickPixelInterval: 50
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            /*pointFormat: '<span style="color:{d.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',*/
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: this.opt.series_type
    });
}
/*********************************** 组件-图-HlsMultiBarChart END ****************************/
