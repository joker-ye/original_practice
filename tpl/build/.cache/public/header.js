/*TMODJS:{"version":7,"md5":"0dff47357ea7f98bbd8fdd29010f127b"}*/
template('public/header',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div id="header"> <!-- ';
include('./logo');
$out+=' -->  <img src="img/header.png" width="1200"> </div>  ';
return new String($out);
});