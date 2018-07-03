/**
 * Created by gaoyang on 2017/5/19.
 */


function setHlsBoxImage(id,style,winId, bpId, bpCategory,sourceGridId){
    var obj = $('#'+id);
    var html=[];
    html.push('<a onclick="hlsBpbox(\''+winId+'\',\''+bpId+'\',\''+bpCategory+'\',\''+sourceGridId+'\')">');
    html.push(top.topHlsBoxImage(style));
    html.push("</a>");
    obj.append(html.join(""));
}

function getHlsBoxImage(contextPath,style){
    if(!style){
        style = 'cursor:pointer;display:inline-block;margin-right:5px;margin-left:5px;height:15px;width:15px;';
    }
    return '<img src="'+contextPath+'/resources/images/MAIN/box.png" style="'+style+'"></img>';
}

function hlsBpbox(winId, bpId, bpCategory,sourceGridId) {
    var url = hlsFunctionUrl("FND310B");
    var url = url + "?bpId=" + bpId + "&identifying=" + bpCategory;
    var editWin = $("#" + winId).kendoWindow({
        actions: ["Minimize", "Maximize", "Close"],
        title: '商业伙伴明细',
        iframe: true,
        visible: false,
        modal: true,
        close: function () {
            hlsWindowClose(this);
            if(sourceGridId) {
                $("#"+sourceGridId).data("kendoGrid").dataSource.page(1);
            }
        }
    }).data("kendoWindow");
    top.hlsWindow(editWin, "HALF", url, '910');
}

function hlsConbox(winId, contract_id,sourceGridId) {
    var url = hlsFunctionUrl("CON010B");
    var url = url + "?contract_id=" + contract_id;
    var editWin = $("#" + winId).kendoWindow({
        actions: ["Minimize", "Maximize", "Close"],
        title: '合同明细',
        iframe: true,
        visible: false,
        modal: true,
        close: function () {
            hlsWindowClose(this);
            if(sourceGridId) {
                $("#"+sourceGridId).data("kendoGrid").dataSource.page(1);
            }
        }
    }).data("kendoWindow");
    top.hlsWindow(editWin, "HALF", url, '910');
}