(function($){
    $.fn.extend({
        hlsRadio:function(opt) {
            if($.isEmptyObject(opt) || $.isEmptyObject(opt.items)) throw new ReferenceError('hlsRadio未定义选择项');
            var $ele = $(this) , items = opt.items , html = '', id = (this[0].id || 'radio'), model = opt.bindModel && window[opt.bindModel] || window['viewModel'];
            // if(!model.isChecked) model.isChecked = false;
            //id暂时未固定
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
                        model.set($ele.data("bind").match(/value:.*\b/g)[0].split(':')[1],null);
                    }else{
                        model.set($ele.data("bind").match(/value:.*\b/g)[0].split(':')[1],$input.data('value'));
                    }

                }
            });
        }
    });

    // 溢出提示效果
    $(document).on('mouseover mouseout mousemove', '.hls-text-len-hidden', function (event) {
        var $elem = $(this), $pop = Pops.get('pop');
        if (event.type === 'mouseover') {
            if ($elem.width() < $elem[0].scrollWidth) {
                $pop.show().css({
                    left: (event.pageX + 10) + 'px',
                    top: (event.pageY + 10) + 'px'
                }).html($(this).html());
            }
        }
        if (event.type === 'mouseout') {
            $pop.hide();
        }
        if (event.type === 'mousemove') {
            if ($pop.is(":visible")) {
                $pop.css({
                    left: (event.pageX + 10) + 'px',
                    top: (event.pageY + 10) + 'px'
                })
            }
        }

        event.preventDefault();
    });



    // 组件所需的弹出层
    window.Pops = {
        _source: {
            'pop': '<div class="hls-text-len-hidden-pop-window"></div>',
        },
        _elem: {},
        _create: function (name,context) {
            var created = this._elem[name] = $(this._source[name]).appendTo(context || 'body');
            return created;
        },
        _delete:function(name){
            delete this._elem[name];
        },
        _hasElem:function(name,context){
            return !!context ? (this._elem[name] && $.contains($(context)[0],this._elem[name][0])): !!(this._elem[name]);
        },
        get: function (name,context) { // 接收两个参数, 参数1：名字  参数2：插入到哪个dom元素中（默认当前文档的body）
            return this._hasElem(name,context) ? this._elem[name] : this._create(name,context);
        }
    };
})(jQuery);
