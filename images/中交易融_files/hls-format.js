(function($){
    if(Hls) {
        $.extend(Hls, {
            /**
             * formatDate 日期格式化函数1
             * @param  String data [带有时分秒的日期字符串 、 日期对象]
             * @return String      [年-月-日]
             */
            formatDate: function (d) {
                return (d instanceof Date) ? kendo.toString(d,'yyyy-MM-dd') :((/\d{4}-\d{1,2}-\d{1,2}/g).exec(d) || '');
            },

            /**
             * dateAdd 日期运算函数
             * @param  String interval [日期操作类型 y-年 q-季 m-月 w-周 d-天 h-小时 s-分钟]
             * @param  Number number   [操作数]
             * @param  Date date       [日期对象]
             */
            dateAdd: function (interval, number, date) {
                switch (interval) {
                    case "y": {
                        date.setFullYear(date.getFullYear() + number);
                        return date;
                        break;
                    }
                    case "q": {
                        date.setMonth(date.getMonth() + number * 3);
                        return date;
                        break;
                    }
                    case "m": {
                        date.setMonth(date.getMonth() + number);
                        return date;
                        break;
                    }
                    case "w": {
                        date.setDate(date.getDate() + number * 7);
                        return date;
                        break;
                    }
                    case "d": {
                        date.setDate(date.getDate() + number);
                        return date;
                        break;
                    }
                    case "h": {
                        date.setHours(date.getHours() + number);
                        return date;
                        break;
                    }
                    case "m": {
                        date.setMinutes(date.getMinutes() + number);
                        return date;
                        break;
                    }
                    case "s": {
                        date.setSeconds(date.getSeconds() + number);
                        return date;
                        break;
                    }
                    default: {
                        date.setDate(d.getDate() + number);
                        return date;
                        break;
                    }
                }
            },

            /**
             * formatCurrencySigned 金额格式化(带¥符号)
             */
            formatCurrencySigned: function (num) {
                var sign = "";
                if (isNaN(num)) {
                    num = 0;
                }
                if (num < 0) {
                    sign = "-";
                    num = num * -1;
                }
                var strNum = num + "";
                var arr1 = strNum.split(".");
                var hasPoint = false;//是否有小数部分
                var piontPart = "";//小数部分
                var intPart = strNum;//整数部分
                if (arr1.length >= 2) {
                    hasPoint = true;
                    piontPart = arr1[1];
                    intPart = arr1[0];
                }
                var res = '';//保存添加逗号的部分
                var intPartlength = intPart.length;//整数部分长度
                var maxcount = Math.ceil(intPartlength / 3);//整数部分需要添加几个逗号
                for (var i = 1; i <= maxcount; i++)//每三位添加一个逗号
                {
                    var startIndex = intPartlength - i * 3;//开始位置
                    if (startIndex < 0)//开始位置小于0时修正为0
                    {
                        startIndex = 0;
                    }
                    var endIndex = intPartlength - i * 3 + 3;//结束位置
                    var part = intPart.substring(startIndex, endIndex) + ",";
                    res = part + res;
                }
                res = res.substr(0, res.length - 1);//去掉最后一个逗号
                if (piontPart.length == 1) {
                    piontPart = piontPart + '0';
                } else if (piontPart.length > 2) {
                    piontPart = piontPart.substring(0, 2);
                }
                if (hasPoint) {
                    return sign + res + "." + piontPart;
                }
                else {
                    return sign + res + ".00";
                }
            },

            /**
             * formatCurrency 金额格式化函数(不带币种符号)
             */
            formatCurrency: function (num) {
                if (!num || isNaN(num)) return '0.00';
                num = parseFloat(num);
                return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            },

            /**
             * [金额转为大写形式]
             */
            formatNumberToChinese: function (Num) {
                for (i = Num.length - 1; i >= 0; i--) {
                    Num = Num.replace(",", "")//替换Num中的“,”
                    Num = Num.replace(" ", "")//替换Num中的空格
                }
                if (isNaN(Num)) { //验证输入的字符是否为数字
                    //alert("请检查小写金额是否正确");
                    return;
                }
                //字符处理完毕后开始转换，采用前后两部分分别转换
                part = String(Num).split(".");
                newchar = "";
                //小数点前进行转化
                for (i = part[0].length - 1; i >= 0; i--) {
                    if (part[0].length > 10) {
                        //alert("位数过大，无法计算");
                        return "";
                    }//若数量超过拾亿单位，提示
                    tmpnewchar = ""
                    perchar = part[0].charAt(i);
                    switch (perchar) {
                        case "0":
                            tmpnewchar = "零" + tmpnewchar;
                            break;
                        case "1":
                            tmpnewchar = "一" + tmpnewchar;
                            break;
                        case "2":
                            tmpnewchar = "二" + tmpnewchar;
                            break;
                        case "3":
                            tmpnewchar = "三" + tmpnewchar;
                            break;
                        case "4":
                            tmpnewchar = "四" + tmpnewchar;
                            break;
                        case "5":
                            tmpnewchar = "五" + tmpnewchar;
                            break;
                        case "6":
                            tmpnewchar = "六" + tmpnewchar;
                            break;
                        case "7":
                            tmpnewchar = "七" + tmpnewchar;
                            break;
                        case "8":
                            tmpnewchar = "八" + tmpnewchar;
                            break;
                        case "9":
                            tmpnewchar = "九" + tmpnewchar;
                            break;
                    }
                    switch (part[0].length - i - 1) {
                        case 0:
                            tmpnewchar = tmpnewchar;
                            break;
                        case 1:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                            break;
                        case 2:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                            break;
                        case 3:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                            break;
                        case 4:
                            tmpnewchar = tmpnewchar + "万";
                            break;
                        case 5:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                            break;
                        case 6:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                            break;
                        case 7:
                            if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                            break;
                        case 8:
                            tmpnewchar = tmpnewchar + "亿";
                            break;
                        case 9:
                            tmpnewchar = tmpnewchar + "十";
                            break;
                    }
                    newchar = tmpnewchar + newchar;
                }
                //替换所有无用汉字，直到没有此类无用的数字为止
                while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
                    newchar = newchar.replace("零亿", "亿");
                    newchar = newchar.replace("亿万", "亿");
                    newchar = newchar.replace("零万", "万");
                    newchar = newchar.replace("零零", "零");
                }
                //替换以“一十”开头的，为“十”
                if (newchar.indexOf("一十") == 0) {
                    newchar = newchar.substr(1);
                }
                //替换以“零”结尾的，为“”
                if (newchar.lastIndexOf("零") == newchar.length - 1) {
                    newchar = newchar.substr(0, newchar.length - 1);
                }
                return newchar;
            },

            /**
             *  保留两位小数
             */
            numberToDecimal2:function (num){
                return parseFloat((num || 0 ).toFixed(2));
            },


            /**
             *  转为带两位小数的百分数
             */
            numberToParcent:function(num) {
                // var result = str.substr(0, str.indexOf('.') + 3) + '%';
                return  ((num || 0 ).toFixed(4)) * 100 + "%";;
            }
        });
    }
})(jQuery);



