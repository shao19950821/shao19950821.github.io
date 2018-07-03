/**
 * gaoyang hls Component js
 */

function hlscomponent_min(id, id_i) {
    var hlsComponentObj = $('#' + id);
    var hlsheader_i = $('#' + id_i);
    hlsComponentObj.slideToggle("fast");
    hlsheader_i.toggleClass('fa fa-minus');
    hlsheader_i.toggleClass('fa fa-plus');
}

function hlscomponent_validate(id) {
    var obj = $("#" + id);
    var validatable = obj.kendoValidator({
        valid: function (e) {
            var input = e.input;
            var parent = input.parent();
            var parent_firstChild = parent[0].firstChild;
            if (e.valid) {
                if (input.hasClass("hls-inputfield-required")) {
                    input.removeClass("hls-inputfield-required");
                }
                if (parent && parent.hasClass("hls-inputfield-required")) {
                    parent.removeClass("hls-inputfield-required");
                }
                if (parent_firstChild && parent_firstChild.style) {
                    parent_firstChild.style.borderColor = "#ccc";
                }
            } else {
                input.addClass("hls-inputfield-required");
                if (parent) {
                    parent.addClass("hls-inputfield-required");
                }
                if (parent_firstChild && parent_firstChild.style) {
                    parent_firstChild.style.borderColor = "red";
                }
            }
        }
    });
}

function hlscomponent_gridadd(id) {
    $("#" + id).data('kendoGrid').addRow();
}

function hlscomponent_griddelete(id) {
    $("#" + id).data('kendoGrid').removeRow();
}

function hlscomponent_treeadd(id) {
    $("#" + id).data('kendoTreeList').addRow();
}

function hlscomponent_gridcustom1(id) {
}
function hlscomponent_gridcustom2(id) {
}
function hlscomponent_gridcustom3(id) {
}
function hlscomponent_gridcustom4(id) {
}
function hlscomponent_gridexcel(contextPath, id, view_model, viewModelData, controller_name, fileName, temp_div_id, dataSourceId, _csrf_token) {
    if (!view_model || !controller_name) {
        alert("excel数据源配置不完整！");
        return;
    }
    var exportConfig = {};
    var columns = [];
    var index = 0;
    var currengrid = $('#' + id).data("kendoGrid");
    for (var i = 0; i < currengrid.columns.length; i++) {
        var column = currengrid.columns[i];
        if (column.field != null) {
            var columnInfo = {};
            columnInfo["name"] = column.field;
            columnInfo["title"] = column.title;
            columnInfo["width"] = column.width;
            var align = $('tbody').find('tr')[0].getElementsByTagName('td')[i].style.textAlign;
            if (align != null || align != '') {
                columnInfo["align"] = align;
            }
            if (window[dataSourceId].options.schema.model.fields[column.field] != null) {
                columnInfo["type"] = window[dataSourceId].options.schema.model.fields[column.field].type;
            }
            columns[index] = columnInfo;
            index++;
        }
    }
    exportConfig["columnsInfo"] = columns;
    if (window[view_model][viewModelData]) {
        exportConfig["param"] = Hap.prepareQueryParameter(window[view_model][viewModelData].toJSON());
    } else {
        exportConfig["param"] = null;
    }
    exportConfig["fileName"] = fileName || 'temp';
    var $inputImg = $('<input>').attr({name: "config", value: kendo.stringify(exportConfig)});
    var $inputToken = $('<input>').attr({name: "_csrf", value: _csrf_token, type: "hidden"});
    //   var $inputSubmitBtn=$('<input>').attr({type:"submit",value:"submit"});
    var $form = $("<form>");
    $form.attr({
        target: '_self',
        method: 'post',
        action: contextPath + controller_name
    }).append($inputImg);
    $form.append($inputToken);
    //   $form.append($inputSubmitBtn);
    $form.id = 'smbForm';
    $('#' + temp_div_id).empty().append($form);//添加到隐藏div中
    $($form).submit();
    $('#' + temp_div_id).empty();
}

function hlscomponent_gridpdf(id) {
    alert('pdf');
}

function hlscomponent_gridquery(id, search_id) {
    if ($('#' + search_id).css('display') == 'none') {
        $('#' + search_id).show(500);
        $('.hlsgridbox-btn-detail').hide(500);
    } else {
        $('#' + search_id).hide(500);
        $('.hlsgridbox-btn-detail').show(500);
    }
}

function hlscomponent_gridsave(id) {
    $('#' + id).data('kendoGrid').saveChanges();
}

function hlscomponent_treesave(id) {
    $('#' + id).data('kendoTreeList').saveRow();
}

function hlscomponent_gridupload(id) {
}


/*calculate*/
(function () {
    var POW = Math.pow;
    // 乘法
    mul = function (a, b) {
        var m = 0, s1 = String(a), s2 = String(b), l1 = s1.indexOf('.'), l2 = s2
            .indexOf('.'), e1 = s1.indexOf('e'), e2 = s2.indexOf('e');
        if (e1 != -1) {
            m -= Number(s1.substr(e1 + 1));
            s1 = s1.substr(0, e1);
        }
        if (e2 != -1) {
            m -= Number(s2.substr(e2 + 1));
            s2 = s2.substr(0, e2);
        }
        if (l1 != -1)
            m += s1.length - l1 - 1;
        if (l2 != -1)
            m += s2.length - l2 - 1;
        return Number(s1.replace('.', '')) * Number(s2.replace('.', ''))
            / POW(10, m);
    }

    // 除法
    div = function (a, b) {
        var re = String(a / b), i = re.indexOf('.');
        if (i != -1) {
            re = Number(re).toFixed(16 - i - 1)
        }
        return Number(re);
    }

    // 加法
    plus = function (a, b) {
        var m1 = 0, m2 = 0, m3, s1 = String(a), s2 = String(b), l1 = s1
            .indexOf('.'), l2 = s2.indexOf('.'), e1 = s1.indexOf('e'), e2 = s2
            .indexOf('e');
        if (e1 != -1) {
            m1 -= Number(s1.substr(e1 + 1));
            s1 = s1.substr(0, e1);
        }
        if (e2 != -1) {
            m2 -= Number(s2.substr(e2 + 1));
            s2 = s2.substr(0, e2);
        }
        if (l1 != -1)
            m1 += s1.length - l1 - 1;
        if (l2 != -1)
            m2 += s2.length - l2 - 1;
        if (m2 > m1) {
            m3 = m2;
            m1 = m2 - m1;
            m2 = 0;
        } else if (m1 > m2) {
            m3 = m1;
            m2 = m1 - m2;
            m1 = 0;
        } else {
            m3 = m1;
            m1 = m2 = 0;
        }
        return (Number(s1.replace('.', '')) * POW(10, m1) + Number(s2.replace(
                '.', ''))
            * POW(10, m2))
            / POW(10, m3);
    }

    // 减法
    minus = function (a, b) {
        return plus(a, -b);
    }

    pow = function (a, b) {
        var re = String(POW(a, b)), i = re.indexOf('.');
        if (i != -1) {
            re = Number(re).toFixed(16 - i - 1)
        }
        return Number(re);
    }

    if (navigator.userAgent.indexOf("MSIE") == -1) {
        var _toFixed = Number.prototype.toFixed;
        Number.prototype.toFixed = function (deci) {
            var sf = this,
                s = sf + '',
                fix = new Array(deci).join('0') + 1;
            if (s.indexOf('e') != -1) {
                var arr = s.split('e');
                if (arr[1] < 0) {
                    if (arr[0].indexOf('.') == -1) {
                        arr[1] -= -arr[0].length;
                        arr[0] = '.' + arr[0];
                    }
                    return _toFixed.call(Number(arr[0] + fix + 'e' + arr[1]), deci);
                } else {
                    return _toFixed.call(sf, deci);
                }
            } else if (s.indexOf('.') == -1) {
                return _toFixed.call(sf, deci);
            } else {
                return _toFixed.call(Number(s + fix), deci);
            }
        }
    }
})();

/**
 * @summary Hel
 * @description 抽象通用函数
 * @version 1.0
 * @author yang.gao01@hand-china.com
 * @copyright Copyright Hand China Co.,Ltd.
 */
(function ($) {
    if (!window.Hls) {
        Hls = {
            version: '1.0',
            defaultPrompt: {}
        };
        /**
         * 打开功能性窗口
         * 函数描述
         * @param opts.menuCode 菜单代码，opts.title窗口描述，opts.url窗口地址，
         * opts.menuName菜单名称，opts.moduleFlag模块标志，opts.documentKey打开同一个功能时，识别不同单据的唯一标识，
         * opts.reflashFlag刷新标志，opts.moduleName模块名称，
         * @returns
         */
        Hls.openMenuWindow = function (opts) {
            if (opts.menuCode) {
                top.openTab(opts.menuCode, opts.title, opts.url, false, opts.menuName, opts.moduleFlag, opts.documentKey, opts.reflashFlag, opts.moduleName, false);
            }
        };
        /**
         * 关闭功能性窗口
         * 函数描述
         * @param opts.menuCode 菜单代码，
         * @returns
         */
        Hls.closeMenuWindow = function (opts) {
            var tabStrip = top.$('#moduleTab').data("kendoTabStrip");
            var obj = top.$('#moduleTab_ts_active');
            var currentFunction = null;
            if (!opts.menuCode) {
                $.each(obj, function (index, item) {
                    for (var i = 0; i < item.children.length; i++) {
                        if (item.children[i].className == 'k-link') {
                            currentFunction = item.children[i].attributes["data-tabid"].value;
                            break;
                        }
                    }
                    return false;
                });
            } else {
                currentFunction = opts.menuCode;
            }
            var tabidx = tabStrip.tabids.indexOf(currentFunction);
            if (tabidx != -1) {
                top.removeOpenFunctionArray(currentFunction);
                top.$('#bread-function').remove();
                tabStrip.remove(tabidx);
                tabStrip.select(tabidx - 1);
            }
        };
        Hls.openBarWindow = function (opts) {
            if (!opts.actions) {
                opts.actions = ["Maximize", "Minimize", "Close"];
            }
            if (!opts.iframe) {
                opts.iframe = true;
            }
            if (!opts.visible) {
                opts.visible = false;
            }
            if (!opts.modal) {
                opts.modal = true;
            }
            var currentContent = opts.content || opts.url || opts.winOptions.options.content.url.toString();
            opts.content = null;
            var currentWin = $("#" + opts.id).kendoWindow(opts).data("kendoWindow");
            if (opts.position == "center") {
                top.centerOpenWindow(currentWin, currentContent);
            } else {
                var currentSize = null;
                if (opts.size == "THIRD" || opts.size == "HALF" || opts.size == "FULL") {
                    currentSize = null;
                } else {
                    currentSize = opts.size;
                }
                top.topOpenWindow(currentWin, opts.size, currentContent, currentSize);
            }
        };
        Hls.setRequired = function (id, flag) {
            var field = $('#' + id);
            var requiredImageObj = $('#' + id + "-prompt-required");
            if (flag) {
                field.attr("required", true);
                requiredImageObj.addClass("hlsRequiredPromptImage");
            } else {
                field.removeAttr("required");
                requiredImageObj.removeClass("hlsRequiredPromptImage");
            }
        };
        Hls.setReadonly = function (id, flag) {
            var field = $('#' + id);
            var editor = field.data().handler.ns.replace(".", "");
            if (flag) {
                field.data(editor).enable(false);
            } else {
                field.data(editor).enable(true);
            }
        };
        Hls.exportPageExcel = function (opts) {
            var token = $('meta[name=_csrf]').attr('content');
            var contextPath = opts.contextPath || "",
                controller_name = opts.controller,
                fileName = opts.fileName,
                hlsPageId = opts.hlsPageId,
                param = opts.param || {},
                _csrf_token = token;
            if (!controller_name) {
                alert("excel数据源配置不完整！");
                return;
            }
            var exportConfig = {};
            exportConfig["columnsInfo"] = opts.pageConfig;
            exportConfig["param"] = param;
            exportConfig["fileName"] = fileName || 'temp';
            var $inputImg = $('<input>').attr({name: "config", value: kendo.stringify(exportConfig)});
            var $inputToken = $('<input>').attr({name: "_csrf", value: _csrf_token, type: "hidden"});
            //   var $inputSubmitBtn=$('<input>').attr({type:"submit",value:"submit"});
            var $form = $("<form>");
            $form.attr({
                target: '_self',
                method: 'post',
                action: contextPath + controller_name
            }).append($inputImg);
            $form.append($inputToken);
            //   $form.append($inputSubmitBtn);
            $form.id = 'smbForm';
            var parentdiv = $('<div></div>');        //创建一个父div
            parentdiv.appendTo('body');
            parentdiv.empty().append($form);//添加到隐藏div中
            $($form).submit();
            parentdiv.empty();
        };

        Hls.exportExcel = function (opts) {
            var contextPath = opts.contextPath,
                id = opts.id,
                view_model = opts.viewModel,
                viewModelData = opts.viewModelData,
                controller_name = opts.controller,
                fileName = opts.fileName,
                temp_div_id = opts.tempDivId,
                dataSourceId = opts.dataSourceId,
                _csrf_token = opts._csrf_token || token;
            if (!view_model || !controller_name) {
                alert("excel数据源配置不完整！");
                return;
            }
            var exportConfig = {};
            var columns = [];
            var index = 0;
            var currengrid = $('#' + id).data("kendoGrid");
            for (var i = 0; i < currengrid.columns.length; i++) {
                var column = currengrid.columns[i];
                if (column.field != null) {
                    var columnInfo = {};
                    columnInfo["name"] = column.field;
                    columnInfo["title"] = column.title;
                    columnInfo["width"] = column.width;
                    var align = $('tbody').find('tr')[0].getElementsByTagName('td')[i].style.textAlign;
                    if (align != null || align != '') {
                        columnInfo["align"] = align;
                    }
                    if (window[dataSourceId].options.schema.model.fields[column.field] != null) {
                        columnInfo["type"] = window[dataSourceId].options.schema.model.fields[column.field].type;
                    }
                    columns[index] = columnInfo;
                    index++;
                }
            }
            exportConfig["columnsInfo"] = columns;
            if (window[view_model][viewModelData]) {
                exportConfig["param"] = Hap.prepareQueryParameter(window[view_model][viewModelData].toJSON());
            } else {
                exportConfig["param"] = null;
            }
            exportConfig["fileName"] = fileName || 'temp';
            var $inputImg = $('<input>').attr({name: "config", value: kendo.stringify(exportConfig)});
            var $inputToken = $('<input>').attr({name: "_csrf", value: _csrf_token, type: "hidden"});
            //   var $inputSubmitBtn=$('<input>').attr({type:"submit",value:"submit"});
            var $form = $("<form>");
            $form.attr({
                target: '_self',
                method: 'post',
                action: contextPath + controller_name
            }).append($inputImg);
            $form.append($inputToken);
            //   $form.append($inputSubmitBtn);
            $form.id = 'smbForm';
            $('#' + temp_div_id).empty().append($form);//添加到隐藏div中
            $($form).submit();
            $('#' + temp_div_id).empty();
        };
        Hls.currentMaskObj = null;
        Hls.mask = function (opts) {
            var obj;
            if (opts && opts.id) {
                obj = $('#' + opts.id);
            } else {
                obj = $("body");
            }
            Hls.currentMaskObj = obj.mLoading(opts && opts.message || '正在执行。。。');
        };
        Hls.unmask = function (options) {
            if (Hls.currentMaskObj) {
                setTimeout(function () {
                    if (options && options.message) {
                        Hls.currentMaskObj = Hls.currentMaskObj.dom.mLoading(options.message);
                        setTimeout(function () {
                            Hls.currentMaskObj.destroy();
                        }, 500);
                    } else {
                        Hls.currentMaskObj.destroy();
                    }
                }, 1000);
            }
        };
        Hls.barWindowUnmask = function () {
            parent.$(".k-overlay").css('z-index', parseFloat(parent.$(".k-overlay").css("z-index")) - 2);
            top.$(".k-overlay").css('display', 'none');
        };
        Hls.getFunctionUrl = function (function_code) {
            for (var i = 0; i < top.gloab_menus.length; i++) {
                var gloab_menu = top.gloab_menus[i];
                if (gloab_menu['menu_code'] == function_code) {
                    return gloab_menu['url'];
                }
            }
        };
        Hls.getWindowObj = function (url) {
            var iframe = null;
            $.each(parent.$('iframe'), function (index, item) {
                if (item.src.indexOf(url) != -1) {
                    iframe = item;
                    return false;
                }
            });
            return iframe;
        };
        Hls.getWindowObjFromFun = function (function_code) {
            var iframe = null;
            $.each(parent.$('iframe'), function (index, item) {
                if (item.id == function_code || item.id == 'iframe_' + function_code) {
                    iframe = item;
                    return false;
                }
            });
            return iframe;
        };
        Hls.submitForm = function (opts) {
            Hap.submitForm(opts);
        };

        Hls.prepareQueryParameter = function (obj, options) {
            obj = obj || {};
            if (options) {
                obj.page = options.page;
                obj.pageSize = options.pageSize;
                if (options.sort && options.sort.length > 0) {
                    obj.sortname = options.sort[0].field;
                    obj.sortorder = options.sort[0].dir;
                }
            }
            for (var k in obj) {
                if (obj[k] === '' || obj[k] === null || obj[k] === undefined)
                    delete obj[k]
                if (obj[k] instanceof Date) {
                    obj[k] = obj[k].toJSON()
                }
            }
            return obj;
        };


        /**
         * 加载数据到viewModel
         * @param opt
         */
        Hls.loadViewModel = function(opt){
            if(typeof opt != 'object') throw new TypeError();
            if(opt.url && opt.model){
                $.ajax({
                    url: opt.url,
                    async:opt.async || false,
                    success: function (args) {
                        var a0 = args.rows[0] || {};
                        for (var k in a0) {
                            if(a0.hasOwnProperty(k)) {
                                opt.model.set(k, a0[k]);
                            }
                        }
                    }
                }).done(function(e){
                   if(opt.done) {
                        opt.done(e);
                   }
                });
            }
        }

        /**
         *  关闭抽屉
         * @param hlsWindowId  抽屜容器元素的Id
         *
         */
        Hls.closeBoxWindow = function(hlsWindowId){
            if(!hlsWindowId || typeof hlsWindowId != "string")
                throw new TypeError("Hls.closeBoxWindow():参数类型错误");
            top.$("#" + hlsWindowId).data("kendoWindow").close();
        }


        /**
         *  根据功能号获得对应的iframe WINDOW
         *  在系统中的iframe如果用top.openTab打开id是:  iframe_功能号(_第7个参数)
         *  如果是frame.src指定的,那就是写什么是什么
         * @param funCode
         */
        Hls.getIframeWindowByFunCode = function(funCode){
            if(!funCode || typeof funCode != 'string')
                throw new TypeError('Hls.getIframeWindowByFunCode():接收一个字符串参数');
            // document.frames 只有 IE Opera 支持。
            // window.frames。 Firefox Chorome Safari支持
            var iframe = window.frames ? (window.frames['iframe_' + funCode] || window.frames[funCode]) : (document.frames('iframe_' + funCode) || document.frames(funCode));
            return iframe.contentWindow;
        }

        /**
         *  根据功能号获得对应的iframe WINDOW
         * @param funCode
         */
        Hls.getIframeWindowByUrl = function (url) {
            if(!url || typeof url != 'string')
                throw new TypeError('Hls.getIframeWindowByUrl():接收一个字符串参数');
            var iframe = null;
            $.each(parent.$('iframe'), function (index, item) {
                if (item.src.indexOf(url) != -1) {
                    iframe = item;
                    return false;
                }
            });
            return iframe.contentWindow;
        };


        /**
         *  校验input必输字段是否有值
         * @return  boolean
         */
        Hls.requireInputValidate = function(){
            var flag = true;
            $.each($("input[required]"),function (index,item){
                if(!item.value){
                    flag =  false;
                    return;
                }
            });
            return  flag;
        }

        /**
         * 页面只读
         */
        Hls.setPageReadonly = function (viewModel){
            var  view = viewModel || window.viewModel;
            if(typeof view !== 'object'){
                throw new TypeError();
            }
            Object.keys(view).forEach(function (o){
                if(typeof view[o] === 'boolean'){
                    view.set(o,false);
                }
            });
            // 去掉底部菜单
            $(".hlstoolbar ").remove();
            $(".hlsframe").removeAttr("style");
            //将grid设置不可编辑,去掉grid按钮
            $("div[data-role='grid']").each(function(index,value){
                $("#" + value.id ).data("kendoGrid").lockedTable = true;
            });
            $(".panel-heading-btn").remove();

            //将 lov 设置不可编辑
            $("input[data-role='lov']").each(function(index,value){
                $("#" + value.id ).data("kendoLov").enable(false);
            });
        };

        /**
         *  jquery 通用提交 , 该方法自带锁屏
         */
        Hls.submit = function (opt){
            Hls.mask(opt.mask);
            $.ajax({
                async:opt.async || false,
                contentType:opt.contentType || "application/json",
                type:opt.type || "post",
                dataType:opt.dataType || "json",
                data:kendo.stringify(opt.data || {}),
                url:opt.url || '#',
                success:function(result){
                    Hls.unmask();
                    if(opt.success){
                        opt.success(result);
                    }
                },
                error:function (result) {
                    Hls.unmask();
                    if(opt.error){
                        opt.error(result);
                    }
                },
                complete:function(xhr,ts){
                    Hls.unmask();
                    if(opt.complete){
                        opt.complete(xhr,ts);
                    }
                }
            });
        }

        /**
         * 错误提示
         */
        Hls.showErrorMessage = function (message) {
            kendo.ui.showErrorDialog({
                title: "错误",
                message: (message || "未定义错误信息!")
            });
        };


        /**
         * 提示框
         * @param message 提示信息
         * @param func    回调函数
         */
        Hls.showInfoDialog = function (message,func) {
            kendo.ui.showInfoDialog({
                title: "提示",
                message: (message || "未定义提示信息!")
            }).done(function (e){
                if(func) func(e);
            });
        };

        /**
         * 确认提示框
         * @param message 提示信息
         * @param comfirmFunc 确认后回调函数
         * @param cancelFunc  取消后毁掉函数
         */
        Hls.showConfirmDialog = function (message, comfirmFunc, cancelFunc) {
            kendo.ui.showConfirmDialog({
                title: '提示',
                message: (message || "未定义提示信息!")
            }).done(function (event) {
                if (event.button === 'OK') {
                    if(comfirmFunc) comfirmFunc();
                } else {
                    if(cancelFunc) cancelFunc();
                }
            });
        };


        /**
         * 将{}参数拼接到url上
         */
        Hls.paramsToURL = function(url,para){
            if(typeof url != 'string' || typeof para != 'object'){
                throw new TypeError();
            }
            // return url + '?' + $.param(para);
            var arr = [];
            for (var n in para) {
                if (para.hasOwnProperty(n) && para[n]) {
                    arr.push(encodeURIComponent(n) + "=" + encodeURIComponent(para[n]));
                }
            }
            url = url + '?' +  arr.join('&');
            return url;
        }

        /**
         * 遍历参数1对象上的属性，复制到参数2
         * @param source 源对象
         * @param target  目标对象
         */
        Hls.copyProperty = function (source,target){
            if(typeof source != 'object' || typeof target != 'object'){
                throw new TypeError();
            }
            var isKendoObj = target.uid ? true : false;
            for(var v in source){
                if((source[v] || source[v]== 0) && source.hasOwnProperty(v) &&  typeof source[v]!== 'object' &&  typeof source[v]!== 'function'){
                    //如果是kendo对象就得用set赋值
                    if(isKendoObj){
                        target.set(v,source[v]);
                    }else{
                        target[v] = source[v];
                    }
                }
            }
        }

        Hls.prepareQueryParameter = function (obj, options) {
            obj = obj || {};
            if (options) {
                obj.page = options.page;
                obj.pageSize = options.pageSize;
                if (options.sort && options.sort.length > 0) {
                    obj.sortname = options.sort[0].field;
                    obj.sortorder = options.sort[0].dir;
                }
            }
            for (var k in obj) {
                if (obj[k] === '' || obj[k] === null || obj[k] === undefined)
                    delete obj[k]
                if (obj[k] instanceof Date) {
                    obj[k] = obj[k].toJSON()
                }
            }
            return obj;
        };

        Hls.InitLayoutIframe= function (iframe) {
            if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.offsetHeight || iframeWin.document.body.offsetHeight;
                    iframe.width = iframeWin.document.documentElement.offsetWidth || iframeWin.document.body.offsetWidth;
                }
            }
        };

        Hls.initLayout = function (id) {
            var generatorComponent = ['dropdownlist', 'checkbox', 'radio', 'numerictextbox', 'datepicker', 'datetimepicker', 'timepicker', 'maskedtextbox', 'lov', 'combobox', 'tledit'];
            $.each(generatorComponent, function (i, roleName) {
                $(id).find('[data-role="' + roleName + '"]').each(function () {
                    var datas = $(this).data(), isInit = true;
                    for (var data in datas) {
                        if (data.toLowerCase() == "kendo" + roleName && typeof datas[data] == "object") {
                            isInit = false;
                            break;
                        }
                    }
                    if (isInit) {
                        kendo.init($(this));
                    }
                });
            });
            $.each($(".canvas-init-firstChild"), function (index, item) {
                var detail = $(item);
                detail.addClass("canvas-init-firstChild-real");
            });
            $.each($(".canvas-init"), function (index, item) {
                var detail = $(item);
                detail.addClass("canvas-init-real");
            });
            $.each($(".customTabs"), function (index, item) {
                var detail = $(item);
                detail.removeClass("customTabs");
                detail.addClass("hls-dashboard-tabs");
            });
            $.each($(".customTabContent"), function (index, item) {
                var detail = $(item);
                detail.removeClass("customTabContent");
                detail.addClass("hls-dashboard-tab-content");
            });
            $.each($(".customTabUl"), function (index, item) {
                var detail = $(item);
                detail.removeClass("customTabUl");
                detail.addClass("hls-dashboard-tab-ul");
            });
            $.each($(".customTabPane"), function (index, item) {
                var detail = $(item);
                detail.width("auto");
                detail.css("margin", "0");
            });
            $.each($('div[data-dashboard]'), function (index, item) {
                var detail = $(item);
                if (detail.attr("data-dashboard")) {
                    iframeCount++;
                }
            });
            if($('.tab-group-big').length){
                $('.tab-group-big').removeClass("tab-group-big");
            }
            if($('.canvas-init-big').length){
                $('.canvas-init-big').removeClass("canvas-init-big");
            }
            $.each($('div[data-dashboard]'), function (index, item) {
                var detail = $(item);
                var url =top.contextPath+"/"+detail.attr("data-dashboard");
                var functionCode = detail.attr("data-functionCode");
                if (detail.hasClass("hls-dashboard-margin-left")) {
                    detail.removeClass("hls-dashboard-margin-left");
                    detail.addClass("hls-block-margin-left");
                }
                if (detail.hasClass("hls-dashboard-margin-top")) {
                    detail.removeClass("hls-dashboard-margin-top");
                    detail.addClass("hls-block-margin-top");
                }
                detail.removeClass("hls-dashboard-margin-top");
                detail.css("background-image", "none");
                detail.css("padding", "0");
                var classList = detail[0].classList;
                for (var i = 0; i < classList.length; i++) {
                    var className = classList[i];
                    if (className.indexOf("hls-dashboard-width") != -1) {
                        detail.removeClass(className);
                        i--;
                        detail.addClass("hls-block-x" + className.substring(className.length - 1));
                    }
                    if (className.indexOf("hls-dashboard-height") != -1) {
                        detail.removeClass(className);
                        i--;
                        detail.addClass("hls-block-y" + className.substring(className.length - 1));
                    }
                }
                if (detail.attr("data-dashboard")) {
                    detail.append("<iframe id='layout_"+functionCode+"' frameborder='0' marginheight='0' marginwidth='0' style='height: inherit;width: inherit;display: none' class='data-dashboard-iframe' src='"+url+"' data-bashboard-src='" + url + "' scrolling='no'></iframe>");
                    window["layout_iframe_"+functionCode]=document.getElementById("layout_"+functionCode);
                    if (window["layout_iframe_"+functionCode].attachEvent) {
                        window["layout_iframe_"+functionCode].attachEvent("onload", function(e) {
                            loadIframeCount++;
                            $(e.target).css("display","block");
                            $('body').css("overflow","auto");
                            if(top.clickHiddenEasy && typeof(top.clickHiddenEasy) == "function"){
                                $(e.target)[0].contentWindow.document.body.addEventListener('click',top.clickHiddenEasy,false);
                            }
                            // if(loadIframeCount==iframeCount){
                            //     $('.form-overdelay').css("display","none");
                            //     $('body').css("overflow","auto");
                            // }
                        });
                    } else {
                        window["layout_iframe_"+functionCode].onload = function(e) {
                            loadIframeCount++;
                            $(e.target).css("display","block");
                            $('body').css("overflow","auto");
                            if(top.clickHiddenEasy && typeof(top.clickHiddenEasy) == "function"){
                                $(e.target)[0].contentWindow.document.body.addEventListener('click',top.clickHiddenEasy,false);
                            }
                            // if(loadIframeCount==iframeCount){
                            //     $('.form-overdelay').css("display","none");
                            //     $('body').css("overflow","auto");
                            // }
                        };
                    }
                }
            });
            // var timer = setInterval(function () {
            //     var iframe = $("iframe[data-bashboard-src]").eq(iframeIndex);
            //     iframe.attr("src",iframe.attr("data-bashboard-src"));
            //     iframeIndex++;
            //     if (iframeIndex >= iframeCount) {
            //         clearInterval(timer);
            //         return;
            //     }
            // }, 200);

        }

        Hls.getLayoutIframe = function(functionCode){
            return Hls.getWindowObjFromFun("layout_"+functionCode);
        }

        //得到主页的某个对象，第一个参数为主页功能代码，第二个为布局功能代码
        Hls.getHomeLayoutIframe = function(homeCode,layoutCode){
            var iframe =null;
            var homeIframe = getWindowObjFromFun(homeCode);
            if(homeIframe){
                homeIframe = homeIframe.contentWindow;
            }
            var childs = homeIframe.$("iframe");

            $.each(childs,function(index,item){
                if(item.id==layoutCode||item.id=='iframe_'+layoutCode||item.id=='layout_'+layoutCode){
                    iframe = item;
                    return false;
                }
            });
            return iframe;
        }


        /*校验viewModel并给出提示,失败返回false,第一个参数为viewModel.model,第二个传入的为需校验的组件id,以数组形式传入*/
        Hls.validateViewModel = function(model,arr){
            if(arr  instanceof Array){
                for(var i = 0; i < arr.length; i++){
                    if(model[arr[i]] == undefined || model[arr[i]] == ""){
                        Hls.showInfoDialog($("#"+arr[i]+"-prompt").text()+"为必输项!");
                        return false;
                    }
                }
            }else{
                console.log("请传入数组对象");
                return false;
            }
            return true;
        }
    }
})(jQuery);

(function($){
    $.fn.extend({
        hlsRadio:function(opt) {


            if($.isEmptyObject(opt) || $.isEmptyObject(opt.items)) throw new ReferenceError('hlsRadio未定义选择项');
            var $ele = $(this) , items = opt.items , html = '', id = (this[0].id || 'radio'), model = opt.bindModel && window[opt.bindModel] || window['viewModel'];

            var exec = /value:(\S*),?/;
            //多选
            // if(!model.isChecked) model.isChecked = false;
            var itId = id + 'item-id'
            items.forEach(function (item,index) {
                html +=  '<div class="hls-radio-item">';
                html +=  '<input type="checkbox"  id="'+ (itId + index) +'" data-value="'+ (item.value || '') +'"   class="def-checkbox"/>'
                html +=  '<label for="'+ (itId + index) +'" style="float:left;"></label>';
                html +=  '<span class="row-text">'+ (item.label || '') +'</span>';
                html +=  '</div>';
            });


            $ele.html(html);
            $("#"+id).click(function (event) {
                var node = event.target, $input = $(node).prev();
                if(node.nodeType === 1 && node.nodeName.toLowerCase() === 'label'){

                    $('#'+ id +" input.def-checkbox").not($input).removeAttr("checked");

                    if($input.is(':checked')){
                        model.set($ele.data("bind").match(exec)[1].split(',')[0],null);
                    }else{
                        model.set($ele.data("bind").match(exec)[1].split(',')[0],$input.data('value'));
                    }

                }
            });


        }
    });
})(jQuery);