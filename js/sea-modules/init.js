define(function(require, exports, module) {

    //require 是全局函数
    var $ = jQuery = require('jquery');

    // var go = require('./go');

    //把jquery暴露给全局

    window.$ = $;

    //把data中的插件共享给jquery，使得jquery对象，可以调用插件
    // var data = require('./jq-plugin')($);



    // //私有属性
    // var data = "data";



    //公有属性
    exports.data = "public-data";

    exports.showInfo = function(){

        console.log("showInfo");

    }



    //module  -- 当前模块唯一标识  

    console.log(module);

    console.log(module.id);   //

    console.log(exports);

    console.log(require(module.id)===exports);   //true

    console.log(module.dependencies);



     //module  -- 为module添加公用方法

     var Module = module.constructor;

     Module.prototype.filename = function(){

        console.log("module_constructor");

     }


     exports.filename = module.filename();


     //go中为简写的define
     // console.log(go);



     //异步加载一个模块

     require.async('./go',function(b){

        console.log(b);

     });



     //条件加载事例
     if(true){

        require('./go');

     }else{

        require('./go');

     }





    // //私有方法
    // var showLen = function(){
    //     alert("showlength");
    // }
    // // 公有方法,并且立即调用
    // // exports.add = function(){
    // //     showLen();
    // // }();

    // //按需要加载,也就实现了JavaScript代码的按需加载。
    // $("#go").click(function(){
    //     require.async('hello',function(m){
    //         m.go();
    //     });
    // });

    //公共方法
    // return {
    //     add:function(){
    //         showLen();
    //     },
    //     remove:function(){
    //         alert("remove");
    //     }
    // }



});



// jQuery 插件都依赖 jQuery 模块，为了加载 jQuery 插件，首先得将 jQuery 模块暴露出来：
// seajs.config({
//   alias: {
//     'jquery': 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'
//   },
//   preload: ["jquery"]
// })

// // 将 jQuery 暴露到全局
// seajs.modify('jquery', function(require, exports) {
//   window.jQuery = window.$ = exports
// })