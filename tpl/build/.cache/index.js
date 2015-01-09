/*TMODJS:{"version":2,"md5":"200c2461fd7a8faf198ab166b6cce783"}*/
template('index',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$escape=$utils.$escape,title=$data.title,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$out='';include('./public/header');
$out+=' <div id="main"> <h3>';
$out+=$escape(title);
$out+='放假了世界风立刻送到家啦</h3> <ul> ';
$each(list,function($value,$index){
$out+=' <li> <a href="';
$out+=$escape($value.url);
$out+='">';
$out+=$escape($value.title);
$out+='</a> </li> ';
});
$out+=' </ul> </div> ';
include('./public/footer');
return new String($out);
});