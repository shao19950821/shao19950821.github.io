

/**
 * [组件]
 */
function HlsConponentBase() {

}
HlsConponentBase.prototype.settingParamMap = function () {
    var self = this, t = {};
    if (self.opt.items && self.opt.items.length > 0) {
        self.opt.items.forEach(function (o) {
            t[o.name] = {
                description: o.description,
                defaultMessage: o.defaultMessage,
                map: o.map
            };
        });
    }
    self.opt.paramMapObj = t;
};

HlsConponentBase.prototype.cancelEventBubble = function (event) {
    if (event) {
        event.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
};
/************************************************ 组件 END ****************************************/


/**
 * [组件-Grid列表]
 */
function HlsConponentGrid() {

}
hlsExtend(HlsConponentGrid, HlsConponentBase);

/**
 * [selectCheckedItem 返回选择的行数据]
 * 使用前提是对每一行上的 dom元素加上了rowdata属性
 * @return [{rowdata}]
 */
HlsConponentGrid.prototype.selectCheckedItem = function () {
    var checkedEle = $("input[name='notice-checkbox']:checked");
    var rowdatas = [];
    for (var i = 0; i < checkedEle.length; i++) {
        rowdatas.push($("#item-body-" + i)[0].rowdata);
    }
    return rowdatas;
}


/**
 * [filterData 根据pageSize对数据进行过滤]
 * @return undefined
 */
HlsConponentGrid.prototype.filterData = function () {
    if (this.opt && this.opt.hlsDataSource && this.opt.hlsDataSource.length > this.opt.pageSize) {
        this.opt.hlsDataSource.length = this.opt.pageSize;
    }
}

/**
 * [registerLocateEvent 注册行上的点击事件，事件处理函数是this.opts.locateEvent ]
 * @return undefined
 */
HlsConponentGrid.prototype.registerLocateEvent = function (element) {
    if (!this.opt.locateEvent) return;
    var opt = this.opt;
    $(element).click(function (event) {
        var event = event || window.event;
        event.preventDefault();
        window[opt.locateEvent](event, element[0].rowdata);
    });
}
/************************************************ 组件-Grid列表 END ****************************************/



/**
 * [组件-Chart图]
 */
function HlsConponentChart() {

}
hlsExtend(HlsConponentChart, HlsConponentBase);


/************************************************ 组件-Chart图 END ****************************************/





/**
 * [继承函数]
 */
function hlsExtend(Child, Parent) {
    var F = function () {
    };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}





























