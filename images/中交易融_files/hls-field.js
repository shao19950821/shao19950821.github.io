/**
 * gaoyang hls field js
 */

function setRequired(id,flag) {
    var field = $('#' + id);
    var requiredImageObj = $('#' + id+"-prompt-required");
    if(flag){
        field.attr("required",true);
        requiredImageObj.addClass("hlsRequiredPromptImage");
    }else{
        field.removeAttr("required");
        requiredImageObj.removeClass("hlsRequiredPromptImage");
    }
}

function setReadonly(id,flag) {
    var field = $('#' + id);
    var editor=field.data().handler.ns.replace(".","");
    if(flag){
        field.data(editor).enable(false);
    }else{
        field.data(editor).enable(true);
    }
}