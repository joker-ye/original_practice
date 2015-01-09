define(function (require, exports, module) {
    "use strict";
    var $ = require('$'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('../tpl/gettingStart.tpl');
    var V_gettingStart = Backbone.View.extend({
        el:$('<div class="container gettingStart"></div>'),
        tpl: _.template(tpl),
        initialize:function(){
          this.model.bind('change:name',this.render,this);
          this.model.bind('change:list',this.render,this);
        },
        render:function(){
            var m = this.model;
            this.$el.html(this.tpl({
                text:m.get('text'),
                param1: m.get('param1'),
                param2:m.get('param2'),
                list: m.get('list')
            }));
            return this;
        }
    })
    module.exports = V_gettingStart;
});