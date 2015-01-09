/*TMODJS:{"version":2,"md5":"3aca435a8b1297d63d2c9e0b632bab9e"}*/
template('public/footer',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,time=$data.time,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div id="footer"> ';
if(time){
$out+=' <p class=\'time\'>';
$out+=$escape(time);
$out+='</p> ';
}
$out+=' <img src="img/footer.png" width="1200"> ';
include('../copyright');
$out+=' </div>';
return new String($out);
});