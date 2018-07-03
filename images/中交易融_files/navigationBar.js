    var navigationBarTitleLength=0;
    var currentData;
    var treeTitleHtml='';
    function appendHtml(navigationBarTitle){
        currentData = navigationBarTitle;
        if(currentData[0] == 'normal'){
            pushData(navigationBarTitle);
        }else if(currentData[0] == 'tree'){
            pushTreeData();
        }
    }
    function pushTreeData(){
        var startBar = '';
        var endBar = '';
        startBar+='<div class="prj_contain_left">';
        startBar+='<div id="left-div">';
        startBar+='<div class="left-dev-start-circle"></div>';
        startBar+='<div class="left_div-line-1">';
        startBar+='<div class="left_div-line-1-contain">';
        startBar+='</div></div>';
        for(var i=1;i<currentData.length;i++){
            if(currentData[i-1]=="tree"){
                navigationBarTitleLength++;
                treeTitleHtml+='<div id="bp-left_div_circle_'+i+'" name="'+(currentData[i+1])+'" class="left-div-circle-1"></div>';
                treeTitleHtml+='<div class="left-div-text-1">';
                treeTitleHtml+='<div class="lef-div-margin-top">';
                treeTitleHtml+='<a class="left-dev-text-1-a left_dev_text_title" href="javascript:showOrHide(\'show-hide-'+i+'\');" name="'+currentData[i+1]+'">'+currentData[i]+'</a>';
                treeTitleHtml+='</div></div>';
                treeTitleHtml+='<div class="left_div-line-1">';
                treeTitleHtml+='<div class="left_div-line-1-contain" id="show-hide-'+i+'"><div>';
                if(!!currentData[i+1]){
                    if(currentData[i+1]=="tree"){
                        treeTitleHtml+='</div></div></div>';
                    }
                }
                i+=2;
            }else{
                treeTitleHtml+='<div class="lef-div-margin-top">';
                treeTitleHtml+='<a class="left-dev-text-1-a left-dev-text-info" href="javascript:leftDivGoTo(\''+(currentData[i])+'\');" name="'+currentData[i]+'">'+currentData[i-1]+'</a>';
                treeTitleHtml+='</div>';
                if(!!currentData[i+1] && i != currentData.length-1){
                    if(currentData[i+1]=="tree"){
                        treeTitleHtml+='</div></div></div>';
                    }
                }else if(i==currentData.length-1){
                    treeTitleHtml+='</div></div></div>';
                }
                i++;
            }
        }
        $(".navigationBarId").empty();
        if(currentData.length>0){
            endBar+='<div class="left-div-circle-end-1">';
            endBar+='<div class="end-bar">';
            endBar+='</div></div></div></div>';
            var str = startBar+treeTitleHtml+endBar;
            $(".navigationBarId")[0].innerHTML=str;
            // $('#bp-left_div_circle_1').css('background-color','#f6fc6a');
        }
    }
    function pushData(navigationBarTitle){
    var startCircle = '';
    var endCircle = '';
    var barInnerHtml="";
    startCircle+='<div id="bp-left-div-start-o" class="left-div">';
    startCircle+='<div id="left-div">';
    startCircle+='<div class="bp-left-dev-start-circle"></div>';
    endCircle+='<div class="bp-left_div-line-2"></div>';
    endCircle+='<div class="bp-left-div-circle-end-1">';
    endCircle+='<div class="bp-left-div-circle-end-t">';
    endCircle+='</div></div></div></div>';
    for (var i=2;i<navigationBarTitle.length;i++){
        navigationBarTitleLength++;
        barInnerHtml+='<div class="bp-left_div-line-1"></div>';
        barInnerHtml+='<div id="bp-left_div_circle_'+(i-1)+'" name="'+(navigationBarTitle[i])+'" class="bp-left-div-circle-1 barClass"></div>';
        barInnerHtml+='<div class="bp-left-div-text-1">';
        barInnerHtml+='<div class="bp-lef-div-margin-top">';
        barInnerHtml+='<a class="bp-eft-dev-text-1-a" href="javascript:leftDivGoTo(\''+(navigationBarTitle[i])+'\');">'+navigationBarTitle[i-1]+'</a>';
        barInnerHtml+='</div></div>';
        i++;
    }
    $(".navigationBarId").empty();
    if(navigationBarTitle.length>0){
        var str = startCircle+barInnerHtml+endCircle;
        $(".navigationBarId")[0].innerHTML=str;
        $('#bp-left_div_circle_1').css('background-color','#f6fc6a');
    }
}
    function showOrHide(thisNodeId){
        var currentStatus = $("#"+thisNodeId)[0].style.display;
        if(currentStatus == 'none'){
            $("#"+thisNodeId)[0].style.display = 'block';
        }else {
            $("#"+thisNodeId)[0].style.display = 'none';
        }
    }
   function getScrollHeight(start_index,end_index){
       var total_height=0;
       var divHight = $(".barClass");
       for(i=start_index;i<=end_index;i++){
           if(divHight.length>0){
               var currentName = divHight[i-1].getAttribute("name");
           }
           total_height=total_height+$('#'+currentName).height();
       }
       return total_height;
   }
   //滚动事件，左侧导航条联动
   $(window).scroll(function () {
       var targetTop = $(this).scrollTop()+50;
       for(var i=1;i<=navigationBarTitleLength;i++){
           if(i==1){
               if (targetTop && targetTop < getScrollHeight(1, 1)) {
                   leftDivColor(1);
                   break;
               }
           }else if (getScrollHeight(1, i-1) < targetTop && targetTop <= getScrollHeight(1, i)){
               leftDivColor(i);
               break;
           }else if(i==navigationBarTitleLength){
               if (getScrollHeight(1, i) < targetTop) {
                   leftDivColor(navigationBarTitleLength);
                   break;
               }
           }
       }
   })
   function leftDivColor(index) {
       var divHight = $(".barClass");
       if(divHight.length>0){
           for (i = 0; i < divHight.length; i++) {
               var currentId = divHight[i].id;
               $('#' + currentId).css('background-color', '#344861');
           }
           $('#' + divHight[index-1].id).css('background-color', '#f6fc6a');
       }
   }
   function leftDivGoTo(sectionId) {
       $('html,body').animate({
           scrollTop:$("#"+sectionId).offset().top
       }, 800);
   }
