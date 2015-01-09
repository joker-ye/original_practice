define(function (require, exports, module) {
    "use strict";
    var $ = require('$'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('../tpl/userlist.tpl'),
        V_user = require('./V_user');
    var V =Backbone.View.extend({
        el:$('<div class="container"></div>'),
        tpl: _.template(tpl),
        initialize:function(list){
            var self = this;
            this.collection = list;
            this.collection.bind('add',this.addOne,this);
            this.$el.html(this.tpl());
            self.render();
            this.collection.fetch({
                success:function(){

                }
            });
        },
        render:function(){
            $('#content').html(this.el);
        },
        addOne:function(user){
            var view = new V_user({
                model:user
            })
            var $tbody = this.$('tbody'),
                html1 = $tbody.html(),
                el = view.render().el,
                html2 = el.outerHTML;
            $tbody.append(el);
        }
    })
    module.exports = V;
});