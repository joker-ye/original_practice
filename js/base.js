/*!
 * base
 * description 处理跨平台底层API封装
 * author Lewis.ye
 * base Javascript Library  - v0.1 (2013-12-01 AM9:00)
 * Copyright 2012-2013 trueland
 */

/*!**********************************************************
 * type namespace
 * author Lewis.ye
 * description 命名空间规则
 *************************************************************/
var YL = {};

YL.namespace = function(str) {

    var arr = str.split("."),
        o = YL;

    for (i = (arr[0] == "YL") ? 1 : 0; i < arr.length; i++) {

        o[arr[i]] = o[arr[i]] || {};

        o = o[arr[i]];

    }

};
/*!**********************************************************
 * type Dom
 * author Lewis.ye
 * description 基类
 *************************************************************/
YL.namespace("Dom");

YL.Dom = OD = {

    /**!
     * author Lewis.ye
     * description getElementsByClassName
     **/

    get: function(node) {
        node = typeof node == "string" ? document.getElementById(node) : node;
        return node;
    },

    /**!
     * author Lewis.ye
     * description -- for addClass && removeClass
     **/

    setClass: function(ids, cName, kind) {

        if (!ids) {
            return;
        }

        var self = this;

        var set = function(obj, cName, kind) {
            if (!obj) {
                return;
            }
            var oldName = obj.className,
                arrName = oldName ? oldName.split(' ') : [];
            if (kind == "add") {
                if (!self.hasClass(oldName, cName)) {
                    arrName.push(cName);
                    obj.className = arrName.join(' ');
                }
            } else if (kind == "remove") {
                var newName = [];
                for (var i = 0, l = arrName.length; i < l; i++) {
                    if (cName != arrName[i] && ' ' != arrName[i]) {
                        newName.push(arrName[i]);
                    }
                }
                obj.className = newName.join(' ');
            }
        };

        if (typeof(ids) == "string") {
            var arrDom = ids.split(",");
            for (var i = 0, l = arrDom.length; i < l; i++) {
                if (arrDom[i]) {
                    set($id(arrDom[i]), cName, kind);
                }
            }
        } else if (ids instanceof Array) {
            for (var i = 0, l = ids.length; i < l; i++) {
                if (ids[i]) {
                    set(ids[i], cName, kind);
                }
            }
        } else {
            set(ids, cName, kind);
        }
    },

    /**!
     * author Lewis.ye
     * description addClass
     **/

    addClass: function(ids, cName) {
        this.setClass(ids, cName, "add");
    },

    /**!
     * author Lewis.ye
     * description removeClass
     **/

    delClass: function(ids, cName) {
        this.setClass(ids, cName, "remove");
    },

    /**!
     * author Lewis.ye
     * description 判断是否有对应的class
     * example hasClass(dom.className, "hide")
     * ok-----
     **/

    hasClass: function(old, cur) {
        console.log(typeof old);

        if (!old || !cur) return null;
        var arr = (typeof old == 'object' ? old.className : old).split(' ');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (cur == arr[i]) {
                // return cur;
                return true;
            }
        }
        return false;
    },


    /**!
     * author Lewis.ye
     * description getElementsByClassName
     * ok----
     **/

    getElementsByClassName: function(str, root, tag) {
        if (root) {
            root = typeof root == "string" ? document.getElementById(root) : root;
        } else {
            root = document.body;
        }
        tag = tag || "*";
        var els = root.getElementsByTagName(tag),
            arr = [];

        for (var i = 0, n = els.length; i < n; i++) {
            for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++) {
                if (k[j] == str) {
                    arr.push(els[i]);
                    break;
                }
            }
        }
        return arr;
    },


    /**!
     * author Lewis.ye
     * description 获取value
     **/

    getValue: function(id) {
        var obj = document.getElementById(id);
        if (obj !== null) {
            return obj.value;
        }
        return null;
    },

    /**!
     * author Lewis.ye
     * description 设置元素属性
     * attr
     * val
     * node
     * no
     **/

    attr: function(attr, val, node) {
        var results = [],
            node = node || document.body;
        walk(node, function(n) {
            if (window.__skipHidden && n.type == "hidden" && n.tagName == "INPUT") {
                return false;
            }
            var actual = n.nodeType === 1 && (attr === "class" ? n.className : (typeof n.getAttribute != "unknown" && n.getAttribute(attr)));
            if (typeof actual === 'string' && (actual === val || typeof val !== 'string')) {
                results.push(n);
            }
        });
        return results;

        function walk(n, func) {
            func(n);
            n = n.firstChild;
            while (n) {
                walk(n, func);
                n = n.nextSibling;
            }
        }
    },

    /**!
     * author Lewis.ye
     * description 设置透明度
     **/
    setOpacity: function(node, level) {
        node = typeof node == "string" ? document.getElementById(node) : node;
        if (document.all) {
            node.style.filter = 'alpha(opacity=' + level + ')';
        } else {
            node.style.opacity = level / 100;
        }
    },

    /**!
     * author Lewis.ye
     * description nextSibling 的跨平台封装
     * ok
     **/
    getNextNode: function(node) {
        node = typeof node == "string" ? document.getElementById(node) : node;
        var nextNode = node.nextSibling;
        if (!nextNode) {
            return null;
        }
        //非ie
        if (!document.all) {
            while (true) {
                //nodeType
                //1:dom节点或者元素节点(<p>)
                //2:属性节点(id="fdfd")
                //3:文本节点(fdjskfjdks)
                if (nextNode.nodeType == 1) {
                    break;
                } else {
                    if (nextNode.nextSibling) {
                        nextNode = nextNode.nextSibling;
                    } else {
                        break;
                    }
                }
            }

        }
        return nextNode;
    },

    /**!
     * author Lewis.ye
     * description nextSibling 的跨平台封装
     * 和上面一样
     **/
    getNextElement: function(node) {

        if (node.nodeType == 1) {
            return node;
        }

        if (node.nextSibling) {
            return this.getNextElment(node.nextSibling);
        }

    },

    /**!
     * author Lewis.ye
     * description 可移植性文档遍历函数
     * 如果n=0 则返回e本身,1返回父元素 2 祖父元素
     **/

    parent: function(e, n) {

        if (e == undefined) {
            n = 1;
        }
        while (n-- && e) {
            e = e.parentNode;
        }
        if (!e || e.nodeType !== 1) {
            return null;
        }
        return e;
    },

    /**!
     * author Lewis.ye
     * description 兄弟元素Element
     * n>0 返回正续第n个兄弟元素 -- 有问题
     * n<0 返回反续第n个兄弟元素
     * n=0 返回e本身
     **/

    sibling: function(e, n) {

        while (e && n != 0) {
            if (n > 0) {
                if (e.nextElementSibling) {
                    e = e.nextElementSibling;
                } else {
                    for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling) {}
                }
                n--;
            }
            //查找前面的兄弟元素
            else {
                if (e.previousElementSibling) {
                    e = e.previousElementSibling;
                } else {
                    /*空循环*/
                    for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling) {}
                }
                n++;
            }

        }
        return e;

    },

    /**!
     * author Lewis.ye
     * @param 0=>第一个子元素 -1=>最后一个子元素 -2=>倒数第二个，以此类推
     * @example console.log(OD.child($('wrap'),-1).id);
     **/

    child: function(e, n) {
        //元素存在子元素的话，继续
        if (e.children) {
            //转换负的为数组索引
            if (n < 0) {
                n += e.children.length;
            }
            //如果仍为负的，说明没有子元素
            if (n < 0) {
                return null;
            }
            //返回指定的子元素
            return e.children[n];
        }

        //如果e没有children数组，找到第一个子元素并且向前数，或者找到最后一个子元素回数
        if (n >= 0) {
            if (e.firstElementChild) {
                e = e.firstElementChild;
            } else {
                for (e = e.firstChild; e && e.nodeType !== 1; e = e.firstChild) {}
            }
            //返回第一个子元素的第N个兄弟元素
            return sibling(e, n);
        } else { //N为负的，从最后一个子元素回数
            if (e.lastElementChild) {
                e = e.lastElementChild;
            } else {
                for (e = e.lastChild; e && e.nodeType !== 1; e = e.lastChild) {}
            }
            //返回第一个子元素的第N个兄弟元素
            return sibling(e, n + 1);
        }
    },


    /**!
     * author Lewis.ye
     * description insertAfter JS 方法添加
     * @newElement 被插入的新元素
     * @targetElement 目标元素
     * @example OD.insertAfter($("textAfter"),$("wrap"));
     **/

    insertAfter: function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    },

    /**!
     * author Lewis.ye
     * description 获取多个ID，返回一个对象
     * {id01:"id01",id02:"id02"}
     **/

    getIdElements: function() {

        var elements = {},
            self = this;
        for (var i = 0; i < arguments.length; i++) {
            var id = arguments[i];
            var elt = self.get(id);
            if (elt == null) {
                throw new Error("No element with id:" + id);
            }
            elements[id] = elt;
        }
        return elements;
    },

    /**!
     * author Lewis.ye
     * description 获取textContent 或者 innerText
     * element value
     **/

    textContent: function(element, value) {

        var content = element.textContent;
        if (value == undefined) {
            if (content != undefined) {
                return content;
            } else {
                return element.innerText;
            }
        } else {
            if (content != undefined) {
                element.textContent = value;
            } else {
                element.innerText = value;
            }
        }
    },

    /**!
     * author Lewis.ye
     * description 将child 元素插入 parent中，使其成为第N个子节点
     * @example OD.insertAt($("wrap"),$("textAfter"),0);
     **/

    insertAt: function(parent, child, n) {

        if (n < 0 || n > parent.childNodes.length) {
            throw new Error("invalid index");
        } else if (n == parent.childNodes.length) {
            parent.appendChild(child);
        } else {
            parent.insertBefore(child, parent.childNodes[n]);
        }
    }


}

//id获取函数形式

function $(node) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    return node;
}

//tag获取函数形式

function $tag(node) {
    node = typeof node == "string" ? document.getElementsByTagName(node) : node;
    return node;
}


/*!***************************************************
 * type event
 * author Lewis.ye
 * description 基类
 ******************************************************/

YL.namespace("Event");

YL.Event = OE = {

    /**!
     * author Lewis.ye
     * description window.onload 拓展
     * @func  函数名
     * @example addLoadEvent(go1);addLoadEvent(go2);
     **/

    addLoadEvent: function(func) {

        var oldonload = window.onload;
        if (typeof window.onload != "function") {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            }
        }

    },

    /**!
     * author Lewis.ye
     * description 事件绑定方法
     * params node =>绑定事件的ID
     * params eventType =>事件类型
     * params handlder =>回调
     * scope 允许显示的更改this指向
     **/
    on: function(node, eventType, handler, scope) {
        node = typeof node == "string" ? document.getElementById(node) : node;
        scope = scope || node;
        //ie
        if (document.all) {
            node.attachEvent("on" + eventType, function() {
                handlder.apply(scope, arguments);
            });
        } else {
            node.addEventListener(eventType, handler, false);
        }
    },

    /**!
     * author Lewis.ye
     * description 事件绑定方法
     * params obj=>绑定的id  要document.getElementById("id")
     * params type=>事件类型
     * params handle=>事件句柄
     * example=>OE.addEvent($("id"),"click",function(){...});
     **/

    addEvent: function(obj, type, handle) {
        var self = this;

        if (!obj || !type || !handle) {
            return;
        }
        if (obj instanceof Array) {
            for (var i = 0, l = obj.length; i < l; i++) {
                self.addEvent(obj[i], type, handle);
            }
            return;
        }
        if (type instanceof Array) {
            for (var i = 0, l = type.length; i < l; i++) {
                self.addEvent(obj, type[i], handle);
            }
            return;
        }
        window.__allHandlers = window.__allHandlers || {};
        window.__Hcounter = window.__Hcounter || 1;

        function setHandler(obj, type, handler, wrapper) {
            obj.__hids = obj.__hids || [];
            var hid = 'h' + window.__Hcounter++;
            obj.__hids.push(hid);
            window.__allHandlers[hid] = {
                type: type,
                handler: handler,
                wrapper: wrapper
            }
        }

        function createDelegate(handle, context) {
            return function() {
                return handle.apply(context, arguments);
            };
        }
        if (window.addEventListener) {
            var wrapper = createDelegate(handle, obj);
            setHandler(obj, type, handle, wrapper)
            obj.addEventListener(type, wrapper, false);
        } else if (window.attachEvent) {
            var wrapper = createDelegate(handle, obj);
            setHandler(obj, type, handle, wrapper)
            obj.attachEvent("on" + type, wrapper);
        } else {
            obj["on" + type] = handle;
        }

    },


    /**!
     * author Lewis.ye
     * description 事件绑定方法
     **/
    getEventTarget: function(e) {
        e = window.event || e;
        return e.srcElement || e.target;
    },

    /**!
     * author Lewis.ye
     * description 阻止事件冒泡
     **/
    stopPropagation: function(e) {
        e = window.event || e;
        if (document.all) {
            e.cancelBubble = true;
        } else {
            e.stopPropagation();
        }
    },

    /**!
     * author Lewis.ye
     * description 阻止事件冒泡和默认
     **/

    stopEvent: function(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
    }

}



/*!***************************************************
 * type Lang
 * author Lewis.ye
 * description Lang
 ******************************************************/

YL.namespace("Lang");

YL.Lang = OL = {

    /**!
     * author Lewis.ye
     * description 事件绑定方法
     * param subClass===继承者
     * param superClass===被继承者
     ***/

    extend: function(subClass, superClass) {
        var F = function() {};
        F.prototype = subClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },


    /*********!
     * author Lewis.ye
     * description 清除收尾空格
     **********/
    trim: function(ostr) {
        return ostr.replace(/^\s+|\s+$/g, "");
    },

    /*********!
     * author Lewis.ye
     * description public is
     **********/

    isNumber: function(s) {
        return !isNaN(s);
    },

    isString: function(s) {
        return typeof s === "string";
    },

    isFunction: function(s) {
        return typeof s === "function";
    },

    isNull: function(s) {
        return typeof s === null;
    },

    isUndefined: function() {
        return typeof s === "undefined";
    },

    isEmpty: function(s) {
        return /^\s*$/.text(s);
    },

    // isArray:function(s){
    //     return s instanceof Array;
    // },

    isArray: function(source) {
        return '[object Array]' == Object.prototype.toString.call(source);
    },

    inArray: function(t, arr) {
        if (arr.indexOf) {
            return arr.indexOf(t);
        }
        for (var i = arr.length; i--;) {
            if (arr[i] === t) {
                return i * 1;
            }
        };
        return -1;
    }

}