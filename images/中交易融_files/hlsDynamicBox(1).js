/**
 * Created by gaoyang on 2017/5/19.
 */

Hls.setBoxImage = function (opts) {
    var id = opts.id, style = opts.style, winId = opts.winId, bpId = opts.bpId,
        bpCategory = opts.bpCategory, sourceGridId = opts.sourceGridId;
    var obj = $('#' + id);
    var html = [];
    html.push('<a onclick="Hls.bpBox(' + opts + ')">');
    html.push(top.topHlsBoxImage(style));
    html.push("</a>");
    obj.append(html.join(""));
}

Hls.getBoxImage = function (opts) {
    var contextPath = opts.contextPath, style = opts.style;
    if (!style) {
        style = 'cursor:pointer;display:inline-block;margin-right:5px;margin-left:5px;height:15px;width:15px;';
    }
    return '<img src="' + contextPath + '/resources/images/MAIN/box.png" style="' + style + '"></img>';
}

Hls.bpBox = function (opts) {
    var winId = opts.winId, bpId = opts.bpId, bpCategory = opts.bpCategory, sourceGridId = opts.sourceGridId;
    var url = Hls.getFunctionUrl("FND310B");
    var url = url + "?bpId=" + bpId + "&identifying=" + bpCategory;
    Hls.openBarWindow({
        id: winId,
        size: '910',
        title: '商业伙伴明细',
        content: url,
        close: function () {
            hlsWindowClose(this);
            if (sourceGridId) {
                $("#" + sourceGridId).data("kendoGrid").dataSource.page(1);
            }
        }
    });
};

Hls.conBox = function (opts) {
    var winId = opts.winId, contract_id = opts.contractId, sourceGridId = opts.sourceGridId;
    var url = Hls.getFunctionUrl("CON010B");
    var url = url + "?contract_id=" + contract_id;
    Hls.openBarWindow({
        id: winId,
        size: '910',
        title: '合同明细',
        content: url,
        close: function () {
            hlsWindowClose(this);
            if (sourceGridId) {
                $("#" + sourceGridId).data("kendoGrid").dataSource.page(1);
            }
        }
    });
}


//抽屉打开通用方法openBox 版本1.0
!function () {
    function getType(o) {
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    function openBoxParameterValidate(opts) {
        if (opts) {
            if (!opts.functionCode) {
                throw "openBox():参数对象中functionCode不能为null!";
            }
            if (!opts.winId || ($("#"+opts.winId).length < 1)) {
                throw "openBox():参数对象中domIdSelector不能为null,或没有定义指定的dom元素!";
            }
            if (opts.params && getType(opts.params) !== "Object") {
                throw "openBox():参数对象中params必须为基本Object类型";
            }
            if (opts.closeFunction && getType(opts.closeFunction) !== "Function") {
                throw "openBox():参数对象中closeFunction必须为Function类型";
            }
            if ((opts.width && getType(opts.width) !== "Number") && (opts.width[opts.width.length - 1] != '%') && (opts.width[opts.width.length - 1] != 'x')
               && (opts.width != 'HALF') && (opts.width != 'FULL') && (opts.width != 'THIRD')
            ) {
                throw "openBox():参数对象中width必须为数字,或者百分数";
            }
        } else {
            throw "openBox():参数对象不能为null!";
        }
    }

    function openBoxPop(opts) {
        var self = opts;
        var url = self.pUrlCondition ? self.url + '?' + self.pUrlCondition : self.url;
        Hls.openBarWindow({
            id: self.winId,
            size: self.width + '',
            title: self.menu_name,
            content: url,
            close: function (e) {
                //hlsWindowClose(this);
                if (self.closeFunction) {
                    self.closeFunction(e);
                }

            }
        });
    }

    function openBox(opts) {
        try {
            openBoxParameterValidate(opts);
        } catch (e) {
            throw e;
        }
        var pParams = opts.params,
            pUrlCondition = "",
            pCode = opts.functionCode,
            pDomId = opts.winId,
            pParamsType = getType(pParams);
        if (pParams && pParamsType === 'Object') {
            var tempArr = [];
            for (var nm in pParams) {
                if (pParams.hasOwnProperty(nm)) {
                    tempArr.push(encodeURIComponent(nm) + "=" + encodeURIComponent(pParams[nm]));
                }
            }
            pUrlCondition = tempArr.join('&');
        }
        var windowParaArr = top.gloab_menus.filter(function (x) {
            return x.menu_code == pCode;
        });
        if (windowParaArr[0]) {
            var tmpWindowParam = windowParaArr[0];
            tmpWindowParam.winId = pDomId;
            tmpWindowParam.windowObj = this;
            tmpWindowParam.pUrlCondition = pUrlCondition;
            tmpWindowParam.width = !!tmpWindowParam.width ? tmpWindowParam.width : tmpWindowParam.width = 910;
            if (opts.width) {
                //如果传了width就用传递的值
                tmpWindowParam.width = opts.width;
            }
            tmpWindowParam.closeFunction = opts.closeFunction;
            openBoxPop(tmpWindowParam);
        } else {
            // throw "openBox():没有找到该code对应的记录，请确认该功能已配置";
            kendo.ui.showErrorDialog({
                title: '错误',
                message: 'openBox():没有找到该code对应的记录，请确认该功能已配置!'
            });
        }
    }

    $.extend(Hls, {openBox: openBox});
}();


