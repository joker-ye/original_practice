define(function (require, exports, module) {
    "use strict";
    // debugger;
    var $ = require('$'),
        _ = require('underscore'),
        Backbone = require('backbone');
        
require('./go');


    var $navLis = $('#nav li');
    $navLis.click(function(){
        $navLis.removeClass('active');
        $(this).addClass('active')
    });

    console.log($navLis.length);

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
//            ':module?:params': 'loadModule',//必须要有问号//([^/]+)(?:\?)?([^/]+)    ([^/]+)(?:\?([^/]+))?
            '*error': 'errRouter'
        },
        errRouter: function (action) {
            console.error('error router:' + action);
        },
        home: function () {
            this.loadModule('index')
        },
        loadModule:function(md,params){
//            debugger;
            var con = {};
            if(params) {
                params.replace(/(\w+)=(\w+)/g, function(a, b, c) {
                    b && (con[b] = c);
                });
            } else {
                con = params;
            }
            //加载module目录下对应的模块
            require.async(['./app', md].join('/'), function(cb) {
                if(cb) {
                    cb(con);
                } else {
                    console.error('模塊加載失敗');
                }
            })
        }
    });

    var ar = new AppRouter();
    ar.route(/^([^/]+?)(\?([^/]+))?$/,function(a,b,c){//可以没有问号
        this.loadModule(a,c);
    })
    Backbone.history.start();
    module.exports = null;
})