define(function(require, exports, module) {

    
    var Person = function(name){

        this.name = name;

    }

    Person.prototype = {

        constructor:Person,


        //渲染DOM
        render:function(){

            alert("render");

        },


        //绑定事件
        bindEvents:function(){

            alert("bindEvents");

        }

    }

    //导出定义类
    module.exports = Person;


});
