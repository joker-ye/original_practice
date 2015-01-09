define(function (require, exports, module) {
    "use strict";
    var $ = require('$'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('../tpl/user.tpl');
    var count = 1;
    var V =Backbone.View.extend({
        tagName:'tr',
//        el:$('<tr id="tr'+ (count++) +'"></tr>'),
        events:{
          'mouseover':'over'
        },
        className:'list-item' + (count++),
        tpl: _.template(tpl),
        initialize:function(){
            //this.collection.bind('add',this.addOne,this);
        },
        over:function(e){
            var $el = $(e.currentTarget);
            $el.css('background','#00aeef');
            console.log('00aeef')
        },
        render:function(){
            var m = this.model;
            this.$el.html(this.tpl({
                firstname: m.get('firstname'),
                lastname: m.get('lastname'),
                username: m.get('username')
            }))
            return this;
        }
    })
    module.exports = V;
});