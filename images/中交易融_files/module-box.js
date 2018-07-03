    $(document).ready(function(){
		initModuleList();
	})
    /*-----------------------------------定义全局变量 新模块列表部分------------------------------*/
    var sortBy="module_serial_number";//展示数字排序为默认
    var sortWay = "asc";//默认升序
    var moduleListDs=[];//模块数据列表
    var firstLetterObj={};//以每个首字母为属性名 以模块代码为属性值 的对象
    var firstLetterList=[];//首字母数组
    /*-----------------------------------打开模块并关闭自身------------------------------------*/
    function openModuleBox(id, title, url, closeIcon, menu_name,module_description){
        $(".module-container").removeClass("module-show-or-not");
       // openTab(id, title, url, closeIcon, menu_name, 'Y','','',module_description);
        //使用保存单据历史方法打开
        var moduleCode = url.split("=")[1];
       // top.openTab('LON510A', '还款创建明细', url, false, '', null, randomFigure);
        top.openTab(id, title, 'module_entrance?code='+moduleCode, closeIcon, menu_name, 'Y','',true,module_description);
    }
    /*-----------------------------------数据处理部分----------------------------------------*/
    //获取所有数据的首字母(去重)
    function getFirstLetter(){
        firstLetterObj={};
        firstLetterList=[];
        for(var i=0;i<moduleListDs.length;i++){
            var firstLetter = convertToPy(moduleListDs[i].menu_name).substring(0,1);
            if(!firstLetterObj[firstLetter]){
                firstLetterObj[firstLetter] = moduleListDs[i].menu_code;
                firstLetterList.push(firstLetter);
            }else{
                //如果已有这个属性
                firstLetterObj[firstLetter] = firstLetterObj[firstLetter]+"-"+moduleListDs[i].menu_code;
            }
        }
    }
    //排序 根据不同的排序依据和排序方向
    function sortModuleList(){
        var len = moduleListDs.length;
        if(sortBy=="module_serial_number"){
            if(sortWay=="asc"){
                 //按数字升序
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (moduleListDs[j].moduleSerialNumber > moduleListDs[j+1].moduleSerialNumber) {        //相邻元素两两对比
                            var temp = moduleListDs[j+1];        //元素交换
                            moduleListDs[j+1] = moduleListDs[j];
                            moduleListDs[j] = temp;
                        }
                    }
                }
            }else if(sortWay=="desc"){
                 //按数字降序
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (moduleListDs[j].moduleSerialNumber < moduleListDs[j+1].moduleSerialNumber) {        //相邻元素两两对比
                            var temp = moduleListDs[j+1];        //元素交换
                            moduleListDs[j+1] = moduleListDs[j];
                            moduleListDs[j] = temp;
                        }
                    }
                }
            }
        }else if(sortBy=="menu_name"){
            if(sortWay=="asc"){
                 //按字母升序
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (convertToPy(moduleListDs[j].menu_name).substring(0,1) > convertToPy(moduleListDs[j+1].menu_name).substring(0,1)) {        //相邻元素两两对比
                            var temp = moduleListDs[j+1];        //元素交换
                            moduleListDs[j+1] = moduleListDs[j];
                            moduleListDs[j] = temp;
                        }
                    }
                }
            }else if(sortWay=="desc"){
                //按字母降序
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (convertToPy(moduleListDs[j].menu_name).substring(0,1) < convertToPy(moduleListDs[j+1].menu_name).substring(0,1)) {        //相邻元素两两对比
                            var temp = moduleListDs[j+1];        //元素交换
                            moduleListDs[j+1] = moduleListDs[j];
                            moduleListDs[j] = temp;
                        }
                    }
                }
            }
        }

    }
    //获取数据并进行排序和获取首字母
    function getModuleListDs(param){
        moduleListDs=[];
        var url = contextPath+'/SysRoleModule/menus?sortWay='+sortWay+'&sortBy='+sortBy;
        if(param!=null){
            url = contextPath+'/SysRoleModule/menus?sortWay='+sortWay+'&sortBy='+sortBy+'&menu_name='+param;
        }
        $.ajax({
            type: 'GET',
            url: encodeURI(url),
            async:false,
            contentType: "application/json; charset=utf-8",
            success: function (datas) {
                for(var i=0;i<datas.length;i++){
                    if(!datas[i].parent_menu && datas[i].url){
                        moduleListDs.push(datas[i]);
                    }
                }
            }
        });
        //排序
        sortModuleList();
        //获取首字母
        getFirstLetter();
    }
    /*----------------------------------点击展示or隐藏模块列表事件------------ ------*/
    function showModuleList(){
        $(".module-container").toggleClass("module-show-or-not");
        if($(".module-container").hasClass("module-show-or-not")){
            //隐藏所有其他
            $(".use-easy-home-container").css("display","none");
            $(".use-easy-common-container").css("display","none");
            //隐藏消息盒子
            $("#notice_ul")[0].style.display="none";
        }
    }
    /*----------------------------------排序方向点击事件-----------------*/
    $(".module-content-sortway-common").click(function(){
        var obj=$("#moduleCondition").val();
        if($(this).attr("id")=="sortway-desc"){
            $(this).addClass("module-content-sortway-selected");
            $("#sortway-asc").removeClass("module-content-sortway-selected");
            sortWay = "desc";
        }else{
            $(this).addClass("module-content-sortway-selected");
            $("#sortway-desc").removeClass("module-content-sortway-selected");
            sortWay = "asc";
        }
        //排序
        sortModuleList();
        //获取首字母
        getFirstLetter();
        refreshModuleListDigital();
        refreshModuleListLetter();
        initLetterBtn();

    })
    /*----------------------------------排序依据点击事件-----------------*/
    $(".module-content-sortname-common").click(function(){
        var obj=$("#moduleCondition").val();
        if($(this).attr("id")=="sortname-digital"){
            $(this).addClass("module-content-sortname-selected");
            $("#sortname-letter").removeClass("module-content-sortname-selected");
            //切换tab显示
            $("#module-content-tab-digital").css("display","block");
            $("#module-content-tab-letter").css("display","none");
            //修改全局变量
            sortBy="module_serial_number";
            //排序
            sortModuleList();
            //重新绘制数字排序tab
            refreshModuleListDigital(obj);
        }else{
            $(this).addClass("module-content-sortname-selected");
            $("#sortname-digital").removeClass("module-content-sortname-selected");
            //切换tab显示
            $("#module-content-tab-digital").css("display","none");
            $("#module-content-tab-letter").css("display","block");
            //修改全局变量
            sortBy="menu_name";
            //排序
            sortModuleList();
            //获取首字母
            getFirstLetter();
            //重新绘制字母排序tab
            refreshModuleListLetter(obj);
        }
    })
    /*-----------------------------------模块列表初始化事件-------------------------*/
    function initModuleList(){
        //获取数据
        getModuleListDs(null);
        //初始化两部分内容
        refreshModuleListDigital();
        refreshModuleListLetter();
    }
    /*----------------------------------模块列表渲染事件----------------------------*/
    function refreshModuleListDigital(){
        var html = [];
        for(var i=0;i<moduleListDs.length;i++){
            var data = moduleListDs[i];
            if(!data.parent_menu && data.url){
                var menu_name_homepage = data.menu_name + '首页';
                var currentUrl=data.url;
                if(data.layoutCode){
                    currentUrl = currentUrl+'?code='+data.layoutCode;
                }
                html.push('<a class="module-btn-box" style="background-color:' + (data.background_color || 'yellow') + '" onclick="openModuleBox(\'' + data.menu_code + '\' ,\'' + menu_name_homepage + '\',\'' + currentUrl + '\',\'' + false + '\',\'' + data.menu_name + '\',\'' + data.module_description + '\')">');
                html.push('<div class="module-btn-icon"> <div style="background-size:25px 25px;height:40px;background-position:center;background-repeat:no-repeat;color:' + (data.background_color || 'yellow') + ';background-image: url(' + 'resources/images/MAIN/MODULE/' + data.icon + ')"></div>'+'<span style="display: inline-block;left: 80px;width:130px;position: relative;top: -30px;font-size: 16px;color: white;">'+data.menu_name+'</span>'+'</div>');
                html.push('<div class="module-btn-english" ><span>' + data.module_description + '</span></div>');
                html.push('</a>');
            }
        }
        //清空原数据
        $(".module-btn-box").remove();
        //添加节点
        $("#module-content-tab-digital").append(html.join(""));
    }

    function refreshModuleListLetter(){
        //letter-search-box 字母列表
        var letter_html=[];
        for(var index=0;index<firstLetterList.length;index++){
            letter_html.push('<p onclick="initLetterBtn(this)">'+firstLetterList[index]+'</p>');
        }
        $(".letter-search-box").empty();
        $(".letter-search-box").append(letter_html.join(""));
        //计算高度
        var divHeight = mul(firstLetterList.length,17);
        var divMargin = div(minus(350,divHeight),2);
        $(".letter-search-box").css("margin-top",divMargin);
        //letter-module-list-container 模块列表
        var list_html = [];
        for(var item in firstLetterObj){
            var moduleListArray = firstLetterObj[item].split("-");//模块代码数组
            //添加字母span
            list_html.push('<span style="padding-left:10px;color:#03b3b2;display: block;height:16px;width:240px;margin-left:auto;margin-right:auto;border-bottom: 1px solid #cccccc" id="letter-item-'+item+'">'+item+'</span>');
            //添加模块列表
            for(var p=0;p<moduleListArray.length;p++){
                //根据模块代码查询模块的相关数据
                for(var m=0;m<moduleListDs.length;m++){
                    if(moduleListArray[p]==moduleListDs[m].menu_code){
                        //找到这个code对应的模块数据
                        var data = moduleListDs[m];
                        var menu_name_homepage = data.menu_name + '首页';
                        var currentUrl=data.url;
                        if(data.layoutCode){
                            currentUrl = currentUrl+'?code='+data.layoutCode;
                        }
                        list_html.push('<a class="module-btn-box" style="background-color:' + (data.background_color || 'yellow') + '" onclick="openModuleBox(\'' + data.menu_code + '\' ,\'' + menu_name_homepage + '\',\'' + currentUrl + '\',\'' + false + '\',\'' + data.menu_name + '\',\'' + data.module_description + '\')">');
                        list_html.push('<div class="module-btn-icon"> <div style="background-size:25px 25px;height:40px;background-position:center;background-repeat:no-repeat;color:' + (data.background_color || 'yellow') + ';background-image: url(' + 'resources/images/MAIN/MODULE/' + data.icon + ')"></div>'+'<span style="display: inline-block;left: 80px;width:130px;position: relative;top: -30px;font-size: 16px;color: white;">'+data.menu_name+'</span>'+'</div>');
                        list_html.push('<div class="module-btn-english" ><span>' + data.module_description + '</span></div>');
                        list_html.push('</a>');
                    }
                    continue;
                }
            }

        }
        $(".letter-module-list-container").empty();
        $(".letter-module-list-container").append(list_html.join(""));
    }
    /*----------------------------------模块列表搜索事件----------------------------*/
    $("#moduleCondition").blur(function(){
        var obj=$("#moduleCondition").val();
        //重新获取数据
        getModuleListDs(obj);
        refreshModuleListDigital();
        refreshModuleListLetter();
    })
    /*-----------------------------------字母点击事件-------------------------------*/
    function initLetterBtn(e){
        var newHeight=0;
        var mainContainer = $("#module-content-tab-letter");//外部div
        if(e){
            var letter = $(e).html();//获取letter
            var scrollToContainer = mainContainer.find("#letter-item-"+letter);//要滚动到的位置
            var newHeight = scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop();
        }
        mainContainer.animate({
            scrollTop: newHeight
        }, 800);
    }
