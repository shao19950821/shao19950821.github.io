


/**
 *
 * [组件-列表-HlsBusinessTable]
 */
function HlsBusinessTable(){

}
hlsExtend(HlsBusinessTable,HlsConponentGrid);

HlsBusinessTable.prototype._init = function (opt) {
    var contextPath = opt.contextPath;
    this.opt = {
        gridType: "businessTable",
        pageSize: 6,
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}
HlsBusinessTable.prototype.renderUI = function () {
    this.filterData();
    var datas = this.opt.hlsDataSource, contextPath = this.opt.contextPath, self = this;
    for (var i = 0; i < datas.length; i++) {
        var date = new Date(datas[i][self.opt.paramMapObj['date'].map]);
        var currentDate = new Date();
        var days = parseInt((currentDate-date)/(3600*24*1000));
        var weeks = parseInt(days/7);
        var modDays = days%7;
        var times = weeks+'周'+modDays+'天'+' 前';
        var html = "";
        html = html + '<div style="height: 1px;background-color: #EEEEEE"></div>';
        if (i < 5) {
            html = html + '<div class="order-item latest-event-item">';
        }
        else {
            html = html + '<div class="order-item latest-event-item" style="border-radius: 5px">';
        }
        html = html + '<div class="lei-content" id="item-body-'+i+'">'+datas[i][self.opt.paramMapObj['company'].map]+'</div>';
        html = html + '<div class="lei-foot">';
        html = html + '<div class="lei-foot-time-img"><i class="fa fa-calendar"></i></div>';
        html = html + '<div class="lei-foot-time">'+times+'</div>';
        html = html + '<div class="lei-foot-amt">'+Hls.formatCurrency(datas[i][self.opt.paramMapObj['amount'].map])+'</div>';
        html = html + '</div>';
        html = html + '<a style="cursor:pointer" id ="item-more-' + i + '" class="item-more" href="javascript:'+this.opt.clickFunc+'('+i+');"><i></i> </a>';
        html = html + '</div>';
        $("#" + this.opt.id).append(html);
        $("#item-body-" + i)[0].rowdata = datas[i];
        this.registerLocateEvent($("#item-body-" + i));
    }
}
/*******************************组件-列表-HlsBusinessTable *********************************/


/**
 * [组件-列表-HlsNoticeTable]
 */
function HlsNoticeTable() {

}
hlsExtend(HlsNoticeTable, HlsConponentGrid);
HlsNoticeTable.prototype._init = function (opt) {
    var contextPath = opt.contextPath;
    this.opt = {
        gridType: "noticeTable",
        titleImg: contextPath + "/resources/images/MAIN/hls-todo-search.png",
        titleIcon: "fa fa-tasks",
        pageSize: 4,
        hlsDataSource: [],
        locateEvent: null
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}
HlsNoticeTable.prototype.renderUI = function () {
    this.filterData();
    var datas = this.opt.hlsDataSource, contextPath = this.opt.contextPath, self = this;
    for (var i = 0; i < datas.length; i++) {
        var q = document.getElementById(this.opt.queryId);
        q.setAttribute("src", this.opt.titleImg);
        var times = datas[i][self.opt.paramMapObj['time'].map] + '小时 以前';
        var html = "";
        html = html + '<div class="row-second-body-item" >';
        html = html + '<div class="row-second-body-item-title">';
        html = html + '<div class="row-second-body-item-title-common row-second-body-item-title1"><label> <input name="notice-checkbox" id="notice-checkbox' + i + '" style="width: 20px;margin-top: -2px;" type="checkbox"/> <span class="text"></span> </label></div>';
        html = html + '<div class="row-second-body-item-title-common row-second-body-item-title2 row-second-body-item-title-progress">';
        html = html + 'ACTIVE';
        html = html + '</div>';
        html = html + '<div class="row-second-body-item-title-common row-second-body-item-title3" style="color: #666666;">' + times + '</div>';
        html = html + '</div>';
        html = html + '<div style="cursor:pointer" id ="item-body-' + i + '" class="row-second-body-item-body"><a style=" text-decoration:none; out-line: none; color:#444444;" href="javascript:mainGoToNotice1(\'' + contextPath + '/main.html?noticeType=TASK\',\'我的消息\');">' + datas[i][self.opt.paramMapObj['message'].map] + '</a></div>';
        html = html + '<div class="row-second-body-item-foot">';
        html = html + '<div class="row-second-body-item-foot-common row-second-body-item-foot-left">' + datas[i][self.opt.paramMapObj['userName'].map] + '</div>';
        html = html + '<div class="row-second-body-item-foot-common row-second-body-item-foot-right" style="color: #666666;font-weight:100;font-size:10px; ">' + (datas[i][self.opt.paramMapObj['prompt'].map] || self.opt.paramMapObj['prompt'].defaultMessage) + '</div>';
        html = html + '</div>';
        if (i < 3) {
            html = html + '<div style="margin-left:3px;height:1px; background-color:#e4e4e4;width:264px ;"></div>';
        }
        html = html + '</div>';
        $("#" + this.opt.id).append(html);
        $("#item-body-" + i)[0].rowdata = datas[i];
        this.registerLocateEvent($("#item-body-" + i));
    }
}
/*******************************组件-列表-HlsNoticeTable *********************************/




/**
 * [组件-列表-HlsRecordTable]
 */
function HlsRecordTable() {

}
hlsExtend(HlsRecordTable, HlsConponentGrid);

HlsRecordTable.prototype._init = function (opt) {
    var contextPath = opt.contextPath;
    this.opt = {
        gridType: "recordTable",
        titleImg: contextPath + "/resources/images/CONT/notice.png",
        hlsDataSource: [],
        locateEvent: null
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}
HlsRecordTable.prototype.renderUI = function () {
    // this.filterData();
    var datas = this.opt.hlsDataSource, contextPath = this.opt.contextPath, self = this;
    var noticeObj = document.getElementById(this.opt.id);
    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "hls-record-table-title hls-record-table-border-bottom-blue");
    if( this.opt.titleStyle){
        imgDiv.style = this.opt.titleStyle;
    }
    imgDiv.innerHTML = '<img class="left-img" src="' + this.opt.titleImg + '"/>' + this.opt.title + ''
    noticeObj.appendChild(imgDiv);
    if (datas && datas.length > 0) {
        if (!noticeObj)return false;
        for (var i = 0; i < datas.length; i++) {
            var outDiv = document.createElement("div");
            // var h = document.createElement("strong");
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class", "hls-record-table-notice-font");
            outDiv.setAttribute("class", "hls-record-table-notice_row border-bottom-1 postion-relative section-row-height");
            outDiv.setAttribute("style", "height:75px")
            if (!isNaN(+datas[i][self.opt.paramMapObj['time'].map])) {
                if (+datas[i][self.opt.paramMapObj['time'].map] <= -1) {
                    datas[i][self.opt.paramMapObj['time'].map] = "刚刚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                } else {
                    datas[i][self.opt.paramMapObj['time'].map] = datas[i][self.opt.paramMapObj['time'].map] + "分钟以前";
                }
            }
            datas[i][self.opt.paramMapObj['time'].map] = datas[i][self.opt.paramMapObj['time'].map] || '';
            var projectName = "<div style='font-size: 14px; color: #9c9c9c'>"+datas[i][self.opt.paramMapObj['name'].map]+"</div>";
            if (datas[i][self.opt.paramMapObj['time'].map].indexOf('-') != -1) {
                innerDiv.innerHTML = projectName +
                    '<img style="height:15px;width:15px;" src="' + contextPath + '/resources/images/CONT/clock2.png" />&nbsp;&nbsp;&nbsp;' + datas[i][self.opt.paramMapObj['time'].map] + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="notice-message">' + (datas[i][self.opt.paramMapObj['notice_message'].map] || self.opt.paramMapObj.notice_message.defaultMessage) + '</span>';
            } else {

                innerDiv.innerHTML = projectName +
                    '<img style="height:15px;width:15px;" src="' + contextPath + '/resources/images/CONT/clock1.png" />&nbsp;&nbsp;&nbsp;' + datas[i][self.opt.paramMapObj['time'].map] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="notice-message">' + (datas[i][self.opt.paramMapObj['notice_message'].map] ||  self.opt.paramMapObj.notice_message.defaultMessage) + '</span>';
            }
            // outDiv.appendChild(h);
            outDiv.appendChild(innerDiv);
            noticeObj.appendChild(outDiv);
            this.registerLocateEvent($("#remove-" + i));
        }
    }

}
/*******************************组件-列表-HlsNoticeTable *********************************/




/**
 * [组件-列表-HlsInfoList]
 */
function HlsInfoList(){

}
hlsExtend(HlsInfoList, HlsConponentGrid);
HlsInfoList.prototype._init = function (opt) {
    this.opt = {
        gridType: "InfoList",
        hlsDataSource: []
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}
HlsInfoList.prototype.renderUI = function () {
    // this.filterData();
    var datas = this.opt.hlsDataSource;
    var arr = this.opt.columns || [];
    var length = arr.length;
    var html="";
    for (var i = 0; i <length; i++) {
        html=html+'<div class="border-bottom content-row link-row"><span class="left-span global-font-size13">';
        html=html+arr[i].title+'</span>';
        if(arr[i].template && (typeof  arr[i].template == 'function')){
            html=html+'<span id='+'"'+arr[i].field+'"'+'class="right-span global-font-size13">'+arr[i].template(datas[0])+'</span></div>';
        }else{
            html=html+'<span id='+'"'+arr[i].field+'"'+'class="right-span global-font-size13">'+datas[0][arr[i].field]+'</span></div>';
        }


    }
    $("#"+this.opt.id).append(html).children().last().removeClass("border-bottom");
}
/*******************************组件-列表-HlsInfoList *********************************/





/**
 * [组件-列表-hlsRollTable]
 */
function HlsRollTable(){
    paging.call(this);
}
hlsExtend(HlsRollTable, paging);


$.extend(HlsRollTable.prototype,{

    /**
     * _init 组件初始化
     * @param  {} opt 参数
     */
    _init:function(opt)
    {
        this.opt = {};
        $.extend(true, this.opt, opt || {});
        this._initDom();
        this._setting();
        this._render();
    },


    /**
     * _intDom 获得要操作的节点
     */
    _initDom:function(){
        var self = this;
        self.opt.$gridDoc = $(self.opt.gridSelector);
        self.opt.$pageControlPrevBtn = $(self.opt.pageControlSelector).find("img.page-img-prev");
        self.opt.$pageControlNextBtn = $(self.opt.pageControlSelector).find("img.page-img-next");
        self.opt.$pageControlMessage = $(self.opt.pageControlSelector).find("span.page-message");
        self.opt.$pageControlCount= $(self.opt.pageControlSelector).find("span.page-count");
        // this.pageIndexFlag = new Array();
        // for(var i = 0; i < this.opt.pageSize; i++)
        // {
        //     this.pageIndexFlag[i] = false;

        // }
    },


    /**
     * _setting 设置参数
     */
    _setting:function (){
        this.pageIndexFlag = new Array();

        for(var i=0; i<this.pageSize; i++){
            this.pageIndexFlag[i] = false;
        }

        var self = this;
        var colomns = this.opt.columns || [],
            feilds = [],
            feildsName = [];
        self.events = [];

        for(var j = 0 ,i = 0; i < colomns.length; i++)
        {
            if(colomns[i].template){
                self.events[j] = {};
                /*this.events[i].editor = arr[i].editor || function(){};*/
                self.events[j].template = colomns[i].template || function(){};
                self.events[j].index = i;
                j++;
            }
            feilds.push(colomns[i].field || "");
            feildsName.push(colomns[i].title || "");
        }
        self.setFeilds(feilds);
        self.setFeildsName(feildsName);
        self.setDataSourse(self.opt.hlsDataSource || []);
        self.setParentDiv(self.opt.$gridDoc.get(0));
        self.setPageSize(self.dataSource._pageSize || self.dataSource._total);
        self.setPage(self.dataSource._page);
    },

    /**
     * _render 渲染组件
     */
    _render:function(){

        //主体内容部分,顶部工具条由Ftl控制
//                if(!this.opt.hidFeildsName) {
//                    this.init();
//                }else{
//
//                }
        this.init( (this.feildsName &&  this.feildsName.length > 0) ? undefined : 1 );
        this._formatCont();


        //底部控制栏
        if(this.opt.$pageControlMessage.length > 0 ){
            this._gridControlRender();
        }
        this.pageIndexFlag = new Array();

        for(var i=0; i<this.pageSize; i++){
            this.pageIndexFlag[i] = false;
        }
    },

    /**
     *  _formatCont 内容样式格式化
     */
    _formatCont:function(){
        var self = this;
        var events = self.events;
        var columns = self.opt.columns;
        //style标签
        var $headerTd = self.opt.$gridDoc.find("table tr:first-child td");
        for(var j=0 ; j<columns.length ;j++){
            if(columns[j].headerAttributes){
                $headerTd.eq(j).attr("style",columns[j].headerAttributes.style || "");
                if(columns[j].width){
                    $headerTd.eq(j).css({
                        "width":columns[j].width,
                        "white-space":"nowrap",
                        "text-overflow":"ellipsis",
                        "overflow":"hidden"
                    });
                }

            }
            if(columns[j].attributes){
                for(var k=0 ; k<self.span.length; k++){
                    $(self.span[k][j]).attr("style",columns[j].attributes.style || "");
                    $(self.span[k][j]).addClass('hls-text-len-hidden');
                    if(columns[j].width){
                        $(self.span[k][j]).css({
                            "width":columns[j].width,
                        });
                    }
                }
            }
        }

        //template函数
        for(var i=0; i<events.length; i++){
            self.modifyEvent(events[i].index,"template",function(rowdata,rowIndex){
                var html = self.events[i].template(rowdata,rowIndex);
                self.modifyField(self.events[i].index , html ,"template",rowIndex);
            });
        }
    },

    /**
     *  _gridControlRender 底部控制栏渲染
     */
    _gridControlRender:function () {
        var self = this , opt = this.opt;
        var prev =  self.opt.$pageControlPrevBtn[0],  next = self.opt.$pageControlNextBtn[0];

        self.setMaxSize(Math.ceil(self.dataSource._total / self.pageSize));

        if(+self.getCurrentPageNum() === 1){
            prev.src = opt.prevImgUnenablePath;
        }else{
            prev.src = opt.prevImgEnablePath;
        }
        if(self.getMaxSize() > self.getCurrentPageNum()){
            next.src = opt.nextImgEnablePath;
        }else{
            next.src = opt.nextImgUnenablePath;
        }
        self.setPageControllerBar();

        prev.onclick = function () {
            //如果当前页大于1
            if(self.getCurrentPageNum() > 1) {

                if(self.datas.length > self.getPageSize()){
                    self.lastPage();
                }else{
                    // 重构内容
                    self.setPage(self.getCurrentPageNum() - 1);
                    self.reRenaderCont();
                }

                if(1 == self.getCurrentPageNum()){
                    prev.src = opt.prevImgUnenablePath;
                }
                next.src = opt.nextImgEnablePath;
                self.setPageControllerBar();

            }
        }
        next.onclick = function () {
            if(self.getMaxSize() > self.getCurrentPageNum()){

                if(self.datas.length > self.getPageSize()){
                    self.nextPage();
                }else{
                    // 重构内容
                    self.setPage(self.getCurrentPageNum() + 1);
                    try{
                        self.reRenaderCont();
                    } catch (e){
                        debugger;
                    }
                }
                if(self.getMaxSize() == self.getCurrentPageNum()){
                    next.src = opt.nextImgUnenablePath;
                }
                prev.src = opt.prevImgEnablePath;
                self.setPageControllerBar();
            }
        }
    },
    setPageControllerBar:function(){
        //默认
        var self = this,
            $pageMessage = self.opt.$pageControlMessage,
            $pageCount = self.opt.$pageControlCount;
        if(!isNaN(self.getMaxSize())){
            $pageCount.html(self.getCurrentPageNum() + "/" + self.getMaxSize());
        }else{
            $pageCount.html(self.getCurrentPageNum() + "/" + 1);
        }
        $pageMessage.html("显示条目 " +  self.getCurrentRecordStartIndex()  + "-" + self.getCurrentRecordEndIndex() +" 共"+self.dataSource._total);

    },
    reRenaderCont:function () {
        var self = this;
        //1.清空原节点
        var $table = self.opt.$gridDoc.find("table");

        if(self.feildsName && self.feildsName.length > 0){
            $table.children(":not(:eq(0))").remove();
        } else{
            $table.children().remove();
        }

        //2.构建新节点并且格式化样式
        var newPageData = [],paraData = self.dataSource.paraData;

        $.extend(paraData,{page:self.getCurrentPageNum(),pageSize:self.getPageSize()});
        // 这一段代码只存在不是根据page来分页的grid
        //=====================================
        if(!isNaN(paraData.start)){
            paraData.start = paraData.page - 1;
        }
        //=====================================
        self.dataSource.read(paraData,newPageData);
        self.datas = newPageData;

        var n = [];
        self.span = [];
        for (var r = 0; r < self.pageSize && r < self.datas.length; r++) {
            n[r] = document.createElement("tr"), self.td[r] = new Array, self.span[r] = new Array;
            for (var o = 0; o < self.feildsName.length; o++)self.td[r][o] = document.createElement("td"), self.span[r][o] = document.createElement("div"), self.span[r][o].index = r, void 0 == self.datas[r][self.feilds[o]] && "edit" == self.feilds[o] ? self.span[r][o].innerHTML = "编辑" : self.span[r][o].innerHTML = self.datas[r][self.feilds[o]], self.td[r][o].appendChild(self.span[r][o]), n[r].appendChild(self.td[r][o]);
            $table.append(n[r]);
        }

        // 重新格式化
        self._formatCont();

    },
    getCurrentRecordEndIndex:function(){
        return this.getCurrentRecordStartIndex() + Number(this.datas.length >= (+this.getPageSize()) ? this.getPageSize() : this.datas.length) - 1;
    },
    getCurrentRecordStartIndex:function(){
        return (this.getCurrentPageNum() - 1)*this.getPageSize() + 1;
    },
    getMaxSize:function(){
        return this.maxSize;
    },
    setMaxSize:function(maxSize){
        this.maxSize = Number(maxSize);
    },
    setPage:function(page){
        this.page = Number(page);
    },
    lastPage: function () {
        return this.page >= 2 ? (this.page = this.page - 1, this.change(),this.clearAddTr(), this.getPageInfo(), void 0) : !1
    },
    nextPage: function () {
        return this.page <= this.maxSize - 1 ? (this.page = parseInt(this.page) + 1,this.clearAddTr(), this.change(), this.getPageInfo(), void 0) : !1
    },
    getPageInfo: function () {
        for (var t = (this.page -1) * this.pageSize, e = 0; e < this.pageSize; t++, e++)for (var i = 0; i < this.feilds.length; i++) {
            this.td[e][i].style.visibility = "visible";
            for (var s = this.td[e][i].childNodes, n = s.length - 1; n >= 0; n--)this.td[e][i].removeChild(s[n]);
            t < this.datas.length ? this.td[e][i].appendChild(this.span[t][i]) : this.td[e][i].style.visibility = "hidden "
        }
    },
    //增加节点
    addTr:function(index,trNode){
        index = index % this.pageSize;
        var indexOf = index;
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        for(var i = 0; i < index; i++)
        {
            if(this.pageIndexFlag[i] == true)
                indexOf = indexOf + 1;
        }
        if(this.pageIndexFlag[index] == false)
        {
            tableEle.insertBefore(trNode,tableEle.childNodes[indexOf+2]);
            this.pageIndexFlag[index] = true;
            return true;
        }
        else
        {
            return false;
        }
    },
    //删除节点
    deleteTr:function(index){
        index = index % this.pageSize;
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        var indexOf = index;
        for(var i = 0; i < index; i++)
        {
            if(this.pageIndexFlag[i] == true)
                indexOf = indexOf + 1;
        }
        if(this.pageIndexFlag[index] == true)
        {
            tableEle.removeChild(tableEle.childNodes[indexOf+2]);
            this.pageIndexFlag[index] = false;
            return true;
        }
        else
        {
            return false;
        }
    },
    //清除所有新增节点
    clearAddTr:function(){
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        for(var i = 0 ;i < this.pageIndexFlag.length;i++)
        {
            if(this.pageIndexFlag[i] == true)
            {
                tableEle.removeChild(tableEle.childNodes[i+2]);
                this._formatCont();
            }
        }
        for(var i = 0; i < this.pageSize; i++)
        {
            this.pageIndexFlag[i] = false;
        }
    }
});

/*******************************组件-列表-HlsRollTable *********************************/




/**
 *  [HlsScrollTable]
 */
function HlsScrollTable(){

}
hlsExtend(HlsScrollTable,HlsConponentGrid);

HlsScrollTable.prototype._init = function (opt){
    var contextPath = opt.contextPath;
    this.opt = {
        id: "",
        hlsDataSource: [],
    };
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsScrollTable.prototype.renderUI = function () {
    var contextPath = this.opt.contextPath;
    var self = this;
    var datas = this.opt.hlsDataSource;
    var items = this.opt.items;
    var id = this.opt.id;
    var id = document.getElementById(id);

    if (!id || !datas || datas.length < 1){
        //删除所有子节点
        var $id = $(id);
        var len = $id.children().length;
        for (var j = 1; j < len; j++) {
            $id.children().last().remove();
        }
        return false;
    }

    //删除所有子节点
    var $id = $(id);
    var len = $id.children().length;
    for (var j = 1; j < len; j++) {
        $id.children().last().remove();
    }

    for (var i = 0; i < datas.length; i++) {
        var outDiv = document.createElement("div");
        var h = document.createElement("div");
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "hls-Scroll-Table-font");
        outDiv.setAttribute("class", "hls-Scroll-Table-row");
        h.innerHTML =  datas[i][self.opt.paramMapObj.message.map];
        if(typeof(datas[i][ self.opt.paramMapObj.amount.map]) == "number"  ){
            innerDiv.innerHTML =
                "<span class='hls-Scroll-Table-notice'>" + Hls.formatDate( datas[i][self.opt.paramMapObj.date.map]) + "</span>" + formatCurrency(datas[i][ self.opt.paramMapObj.amount.map]);
        }else{
            innerDiv.innerHTML =
                "<span class='hls-Scroll-Table-notice'>" + Hls.formatDate( datas[i][self.opt.paramMapObj.date.map]) + "</span>" + datas[i][ self.opt.paramMapObj.amount.map];
        }

        outDiv.appendChild(h);
        outDiv.appendChild(innerDiv);
        id.appendChild(outDiv);
    }
}/*******************************组件-列表-HlsScrollTable *********************************/
