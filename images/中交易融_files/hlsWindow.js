/**
 * gaoyang window窗口右弹
 */

var topPagebreadcrumbs=false;

function handle_index_element(flag){
    if(flag=='HIDE'){
        top.$('#hls-topbar-container').css("display","none");
        if(top.$('#page-breadcrumbs').css("display")=='block'){
            top.$('#page-breadcrumbs').css("display","none");
            topPagebreadcrumbs=true;
        }
        $.each(parent.$('iframe'),function(index,item){
            if(item.contentWindow == self){
                item.height=item.height+88;
            }
        });
    }else{
        top.$('#hls-topbar-container').css("display","block");
        if(topPagebreadcrumbs){
            top.$('#page-breadcrumbs').css("display","block");
        }
    }
}

function hlsWindow(_sf, type, content,currentwidth,pos){

    if (content && content.indexOf('?') != -1) {
        var tempUrlArray = content.split("?");
        var tempUrl=null;
        var tempParameterArray = tempUrlArray[1].split("&");
        for(var m=0;m<tempParameterArray.length;m++){
            var mapArr = tempParameterArray[m].split("=");
            if(m==0){
                tempUrl = tempUrlArray[0]+"?"+mapArr[0]+"="+encodeURIComponent(mapArr[1]);
            }else{
                tempUrl = tempUrl+"&"+mapArr[0]+"="+encodeURIComponent(mapArr[1]);
            }
        }
        content = tempUrl;
    }
    if(pos == "center"){
        top.centerOpenWindow(_sf ,content);
    }else{
        top.topOpenWindow(_sf, type, content,currentwidth);
    }
}

/**
 * 谷歌打开窗口重写（适配预览）
 * url:文件路径 name:打开窗口方式
 * @param _sf
 * @param type
 * @param content
 * @param currentwidth
 * @private
 */

function reHlsWindow(url,name) {
    var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1,location=no,status=no";    //定义弹出窗口的参数
    if (window.screen) {
        var ah = screen.availHeight-70;
        var aw = screen.availWidth-30;
        fulls += ",height=" + ah;
        fulls += ",innerHeight=" + ah;
        fulls += ",width=" + aw;
        fulls += ",innerWidth=" + aw;
        fulls += ",resizable"
    } else {
        fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
    }
    if(!name){
        /*使用_self谷歌黑屏，ie没有关闭页面      使用_blank*/
        name = "_blank";//默认内部打开
    }
    window.open(url,name,fulls);
}


function _hlsWindow(_sf, type, content,currentwidth) {
    var left, width, height,windowheight = $(window).height(),windowwidth=$(window).width();
    // handle_index_element("HIDE");
    if (type.toUpperCase() == 'THIRD') {
        left = '67%';
        width = windowwidth/3;
    } else if (type.toUpperCase() == 'HALF') {
        left = '50%';
        width = windowwidth/2;
    } else {
        left = 0;
        width = windowwidth;
    }
    if(currentwidth){
        if(currentwidth.toString().indexOf("%") != -1){
            left = minus(100,currentwidth.toString().replace("%","")) + '%';
        }else{
            currentwidth = currentwidth.toString().replace("px","");
            left = ((1-currentwidth/windowwidth)*100) + '%';
        }
        width = currentwidth;
    }
    height=windowheight;
    _sf.setOptions({
        width:width,
        height:height,
        animation : false
    });
    _sf.pin();
    _sf.wrapper.css({
        left : '100%',
        top : 0
    }).addClass('k-window-slide');
    _sf.open();
    if(!_sf.options.hidden){
        _sf.wrapper.css({
            left : left,
            top : 0
        });
    }else{
        _sf.wrapper.css({
            left : '200%',
            top : 0
        });
    }
    if (content) {
        setTimeout(function() {
            _sf.refresh(content);
        }, 400)
    }
}

function hlsWindowClose(_sf,times) {
    // if(!times||times==1){
    //     handle_index_element("show");
    // }
    if (_sf._slide_close == true)
        return;
    _sf._closing = true;
    _sf.wrapper.css({
        left : '100%',
        top : 0
    });
    setTimeout(function() {
        _sf._slide_close = true;
        _sf._closing = false;
        _sf.wrapper.removeClass('k-window-slide');
        _sf.close();
    }, 300);
}

function hlsFunctionUrl(function_code){
    for(var i=0;i<top.gloab_menus.length;i++){
        var gloab_menu = top.gloab_menus[i];
        if(gloab_menu['menu_code']==function_code){
            return gloab_menu['url'];
        }
    }
}

function getWindowObj(url){
    var iframe =null;
    $.each(parent.$('iframe'),function(index,item){
        if(item.src.indexOf(url)!=-1){
            iframe = item;
            return false;
        }
    });
    return iframe;
}
function getWindowObjFromFun(function_code){
    var iframe =null;
    $.each(parent.$('iframe'),function(index,item){
        if(item.id==function_code||item.id=='iframe_'+function_code||item.id=='layout_'+function_code){
            iframe = item;
            return false;
        }
    });
    return iframe;
}

function closeFunctionWindow(function_code,noBack) {
    var tabStrip = top.$('#moduleTab').data("kendoTabStrip");
    var obj = top.$('#moduleTab_ts_active');
    var currentFunction = null;
    if (!function_code) {
        $.each(obj, function (index, item) {
            for (var i = 0; i < item.children.length; i++) {
                if (item.children[i].className == 'k-link') {
                    currentFunction = item.children[i].attributes["data-tabid"].value;
                    break;
                }
            }
            return false;
        });
    }else{
        currentFunction = function_code;
    }
    var tabidx = tabStrip.tabids.indexOf(currentFunction);
    top.removeOpenFunctionArray(currentFunction);
    top.$('#bread-function').remove();
    tabStrip.remove(tabidx);
    if(tabidx>0 && !noBack) {
        tabStrip.select(tabidx - 1);
    }
}