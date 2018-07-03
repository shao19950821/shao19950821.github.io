function hlsDataSource(){
    this.dataSource;
    this.fetchFlag = false;
}
hlsDataSource.prototype = {
    /**
     * [参数设置]
     * @param  {} hlsDataSource标签上的属性
     * @return undefined
     */
    setting: function(obj){
        this.propsSetting(obj);
        this.transportSetting(obj || {});
        this.getParam();
        this.readSettings(this.transport.read);
        this.autoFetch = obj.autoFetch === 'false'? false : true;
    },
    propsSetting:function (obj){
        this.options = obj || {};
        this._pageSize = obj.pageSize;
        this._page = obj.page || 1;
        this._total = 0;
    },
    transportSetting: function(obj){
        this.transport = obj.transport || {};
    },
    getParam:function(obj){
        if(obj) {
            if(obj.pageFlag){
                obj.page = this._page;
                obj.pageSize = this._pageSize;
                obj.pageFlag = false;
            }
            this.setParaData(obj);
        }
        else{
            if(this.transport.parameterMap) {
                this.parameterMapSetting(this.transport.parameterMap);
            }else{
                this.setParaData();
            }
        }

    },
    parameterMapSetting: function(fun){
        this.parameterMap = fun || function(){return {};};
        this.setParaData(this.parameterMap(this.options) || {});
    },
    setParaData: function(obj){

        // 只要hlsDataSouce标签上设置了 pageSize 那么每次的请求都加上分页条件
        // 分页的条件取值：如果没有传，就直接拿标签上的，否则取参数里的
        if(!obj) obj = {};
        if(this._pageSize && !obj.page){

            $.extend(obj,{
                page:this._page,
                pageSize:this._pageSize
            })
        }
        this.paraData = obj;
    },
    requestEnd: function (func) {
        this.requestEndFunc = func || function () {};
    },
    //参数设置
    readSettings: function(obj){
        this.url == undefined ?  this.url = obj.url || "" : null;
        this.type == undefined ?  this.type = obj.type || "GET" || "" : null;
        this.paraData == undefined ? this.paraData = obj.paraData || {} : null;
        this.contentType == undefined ? this.contentType = obj.contentType || "application/json;charset=utf-8" : null;
        this.async == undefined ? this.async = obj.async || false : null;
    },
    //请求方法
    read: function(obj,newPageData){
        this.getParam(obj);
        var _this = this;
        var requestConfig = {
            type : this.type,
            url : this.url,
            async: this.async,
            contentType : this.contentType,
            success : function(datas) {
                _this._total = datas.total || 0;
                if(newPageData){
                    // Array.prototype.splice.apply(newPageData,datas.rows.unshift(0,0));
                    (datas.rows || datas.data).forEach(function(value){
                        newPageData.push(value);
                    });
                }
                else{
                    _this.dataSource = datas.rows || datas.data || datas || "";
                    _this.betweenEvent(_this.dataSource);
                    if(_this.requestEndFunc){
                        _this.requestEndFunc(_this.dataSource);
                    }
                }
            },
            error: function(message){
                throw 'request error';
            }
        };
        if(_this.type.toUpperCase() === 'POST'){
            if(_this.paraData.pageSize){
                requestConfig.url =  _this.url  + "?pageSize="  + _this.paraData.pageSize +"&page="+_this.paraData.page;
            }
            requestConfig.data = JSON.stringify(_this.paraData);
        }else {
            if (this.paraData && !$.isEmptyObject(this.paraData)) {
                if (_this.url.indexOf('?') != -1) {
                    requestConfig.url = _this.url + '&' + convertToURLString(this.paraData);
                } else {
                    requestConfig.url = _this.url + '?' + convertToURLString(this.paraData);
                }
            }
        }
        $.ajax(requestConfig);
    },
    //请求成功后调用外部的回调函数
    fetch: function(callback){
        this.successEnd = callback;
        if(this.autoFetch){
            this.fetchFlag = true;
            this.betweenEvent();
        }
    },
    //回调响应监听函数
    betweenEvent: function(datas){
        if(this.fetchFlag == true && this.dataSource != undefined)
        {
            this.successEnd(this.dataSource);
        }
    }
}

function convertToURLString(pParams){
    var pUrlCondition = "";
    if (pParams){
        if(typeof pParams === 'string'){
            pParams = JSON.parse(pParams);
        }
        var tempArr = [];
        for (var nm in pParams) {
            if (pParams.hasOwnProperty(nm) && pParams[nm]) {
                tempArr.push(encodeURIComponent(nm) + "=" + encodeURIComponent(pParams[nm]));
            }
        }
        pUrlCondition = tempArr.join('&');
    }
    return pUrlCondition;
}

