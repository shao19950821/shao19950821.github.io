/**
 * Created by syj on 2017-2-20.
 */

function formatCurrency(num) {
    var sign="";
    if(isNaN(num))
    {
        num = 0;
    }
    if(num<0)
    {
        sign="-";
        num = num * -1;
    }
    var strNum=num+"";
    var arr1 = strNum.split(".");
    var hasPoint=false;//是否有小数部分
    var piontPart="";//小数部分
    var intPart=strNum;//整数部分
    if(arr1.length>=2)
    {
        hasPoint=true;
        piontPart= arr1[1];
        intPart=arr1[0];
    }

    var res='';//保存添加逗号的部分
    var intPartlength=intPart.length;//整数部分长度
    var maxcount=Math.ceil(intPartlength/3);//整数部分需要添加几个逗号
    for (var i = 1; i <=maxcount;i++)//每三位添加一个逗号
    {
        var startIndex=intPartlength-i*3;//开始位置
        if(startIndex<0)//开始位置小于0时修正为0
        {
            startIndex=0;
        }
        var endIndex=intPartlength-i*3+3;//结束位置
        var part=intPart.substring(startIndex,endIndex)+",";
        res=part+res;
    }
    res=res.substr(0,res.length-1);//去掉最后一个逗号


   if(piontPart.length == 1){
       piontPart = piontPart + '0';
   }else if(piontPart.length>2){
       piontPart = piontPart.substring(0,2);
   }


    if(hasPoint)
    {
        return sign+res+"."+piontPart;
    }
    else
    {
        return sign+res+ ".00";
    }



}


function formatCurrencyUnsigned(num){
        if(!num || isNaN(num)) return '0.00';
        num = parseFloat(num);
        return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}