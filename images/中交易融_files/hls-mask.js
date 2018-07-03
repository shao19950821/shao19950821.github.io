/**
 * Created by gaoyang on 17/6/14.
 */
var currentMaskObj = null;
function hlsMask(options){
    var obj;
    if(options.id){
        obj = $('#'+options.id);
    }else{
        obj=$("body");
    }
    currentMaskObj = obj.mLoading(options.message||'正在执行。。。');
}

function hlsUnmask(options){
    if(currentMaskObj){
        setTimeout(function(){
            if(options.message){
                currentMaskObj = currentMaskObj.dom.mLoading(options.message);
                setTimeout(function(){
                    currentMaskObj.destroy();
                },500);
            }else{
                currentMaskObj.destroy();
            }
        },1000);
    }
}

function hlsWindowUnmask(){
    parent.$(".k-overlay").css('z-index',parseFloat(parent.$(".k-overlay").css("z-index"))-2);
    top.$(".k-overlay").css('display','none');
}