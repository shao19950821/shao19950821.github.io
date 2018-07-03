/**
 * gaoyang hlstoolbar
 */

function hlstoolbarbtn(id,btn_on_id,btn_off_id){
	if($("#"+btn_on_id).hasClass("hlstoolbar-btn-show")){
		$("#"+btn_on_id).removeClass("hlstoolbar-btn-show");
		$("#"+id).addClass("hlstoolbar-in");
		$("#"+btn_off_id).addClass("hlstoolbar-btn-show");
	}else{
		$("#"+btn_off_id).removeClass("hlstoolbar-btn-show");
		$("#"+id).removeClass("hlstoolbar-in");
		$("#"+btn_on_id).addClass("hlstoolbar-btn-show");
	}
}
