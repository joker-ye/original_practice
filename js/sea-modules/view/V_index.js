define(function (require, exports, module) {
    "use strict";
    var $ = require('$'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('../tpl/index.tpl');
        require('select2');
        require.async('select2-css');
    var V_index = Backbone.View.extend({
        el:$('<div class="container"></div>'),
        events:{
          'click #getData':'getData'
        },
        tpl: _.template(tpl),
        initialize:function(){
          this.model.bind('change:name',this.render,this);
          this.model.bind('change:options',this.render,this);
        },
        render:function(){
            this.$el.html(this.tpl({name:this.model.get('name'),options:this.model.get('options')}));
            this.select2 = this.$('#select');
            this.select2.select2();
            return this;
        },
        getData:function(){
            var data = this.select2.select2('val');
            console.log(data)
        }
    })
    module.exports = V_index;
});




