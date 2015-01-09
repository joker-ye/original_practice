/*!
 * common
 * author Lewis.ye
 * common Javascript Library  - v0.1 (2013-12-01 AM9:00)
 * Copyright 2012-2013 trueland
 */


/*!**********************************************************
 * type Dom
 * author Lewis.ye
 * description 基类
 *************************************************************/
YL.namespace("Utils");
YL.Utils = OU = {

    /**!
     * author Lewis.ye
     * description tab选项卡
     * root,currentClass,trigger,handler,autoplay,playTime
    **/

    Tab:function(config){

        this._root = config.root;

            this._currentClass = config.currentClass || "active";

            this._handlder = config.handler;

            this._tabMenus = YL.Dom.getElementsByClassName(config.tabMenuClassname?config.tabMenuClassname:"J_tab_menu",this._root);

            this._tabContents = YL.Dom.getElementsByClassName(config.tabConClassname?config.tabConClassname:"J_tab_content",this._root);

            this.currentIndex = 0;

            var This = this,

                trigger = config.trigger || "click",

                playTime = config.playTime || 3000,

                autoplay = config.autoplay;

            //is autoplay
            if(autoplay){

                setInterval(function(){This._autoHandler()},playTime);

            }

            //tab 切换
            for(var i=0;i<this._tabMenus.length;i++){

                this._tabMenus[i]._index = i;

                YL.Event.on(this._tabMenus[i],trigger,function(){

                    This.showItem(this._index);

                    this.currentIndex = this._index;

                });
                
            }
    },

    /**!
     * author Lewis.ye
     * description placeholder
     * 移动删除
     * date 2014-03-29
    **/

    prepareForm:function(){
        var self = this;
        for(var i=0;i<document.forms.length;i++){
            var thisform = document.forms[i];
            self.resetFields(thisform);
        }
    },


    /**!
     * author Lewis.ye
     * description placeholder
     * 移动删除
     * attention this指向问题
    **/

    resetFields:function(whichform){
        //如果支持placeholder则直接返回
        //if(Modernizr.input.placeholder) return;
        for(var i=0;i<whichform.elements.length;i++){
            var element = whichform.elements[i];
            if(element.type=="submit") continue;

            var check = element.placeholder || element.getAttribute("placeholder");
            if(!check) continue;

            element.onfocus = function(){
                var text = this.placeholder || element.getAttribute("placeholder");
                if(this.value==text){
                    this.className="";
                    this.value="";
                }
            }

             element.onblur = function(){
                if(this.value==""){
                    this.className="placeholder";
                    this.value=this.placeholder || element.getAttribute("placeholder");
                }
            }

            element.onblur();
        }

    },


    /**!
     * author Lewis.ye
     * description 添加token
    **/

    addToken:function(url, type, skey){

        var token = $getToken(skey);
         if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
              return url;
         }
         if (url.indexOf("#") != -1) {
              var f1 = url.match(/\?.+\#/);
              if (f1) {
                   var t = f1[0].split("#"),
                        newPara = [t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
                   return url.replace(f1[0], newPara);
              } else {
                   var t = url.split("#");
                   return [t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
              }
         }
         return token == "" ? (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type) : (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type);
    },

    /**!
     * author Lewis.ye
     * description 获取token
    **/

    getToken:function(skey) {
        var self = this;
         var skey = skey ? skey : self.getCookie("skey");
         return skey ? self.time33(skey) : "";
    },

    /**!
     * author Lewis.ye
     * description 返回顶部
    **/

    backToTop:function(opt) {
     var option = {
          id: "backToTop",
          className: "backToTop",
          container: "foot",
          scroll: true,
          duration: 500,
          fps: 50,
          cssUrl: "",
          background: "url('http://static.gtimg.com/img/backtop.png') no-repeat scroll transparent",
          height: "67px",
          width: "19px",
          left: "960px",
          bottom: "10%"
     },self = this;
     self.extend(option, opt);
     option.periodical = Math.round(1000 / option.fps);
     option.step = Math.round(option.duration / option.fps);

     function createButton() {
          var b = $(option.id);
          if (!b) {
               b = document.createElement("div");
               b.id = option.id;
               b.className = option.className;
               b.style.display = "inline-block";
               b.style.position = $isBrowser('ie6') ? "absolute" : "fixed";
               b.style.textIndent = "-999em";
               b.style.cursor = "pointer";
               b.style.left = "2000px";
               b.style.background = option.background;
               b.style.height = option.height;
               b.style.width = option.width;
               b.style.bottom = option.bottom;
               $ready(function() {
                    var elm = $(option.container),
                         ctX = elm ? $getX(elm) : 0;
                    b.style.left = ctX + parseInt(option.left) + "px";
                    window.onresize = function() {
                         var ctX = elm ? $getX(elm) : 0;
                         b.style.left = ctX + parseInt(option.left) + "px";
                    }
               });
               document.body.appendChild(b);
          } else {
               if (option.height) {
                    b.style.height = option.height;
               }
               if (option.width) {
                    b.style.width = option.width;
               }
               if (option.bottom) {
                    b.style.bottom = option.bottom;
               }
          }
          if (option.cssUrl) {
               self.loadCss(option.cssUrl);
          }
          b.onclick = backToTopHandle(option.scroll, option.step, option.periodical);
     }

     function backToTopHandle(scroll, step, periodical) {
          if (scroll) {
               var timer = 0;
               var pageHeight;
               return function scrollPage() {
                    if (timer === 0) {
                         pageHeight = $getPageScrollHeight();
                    }
                    if (timer < step) {
                         timer += 1;
                         scrollStep(timer, pageHeight, -pageHeight, step);
                         setTimeout(scrollPage, periodical);
                    } else {
                         timer = 0;
                    }
               }
          } else {
               return function() {
                    window.scrollTo(0, 0);
               }
          }
     }

     function scrollStep(timer, begin, target, step) {
          window.scrollTo(0, Math.ceil(-target * (timer /= step) * (timer - 2) + begin));
     }
     createButton();
    },

    /**!
     * author Lewis.ye
     * description 合并两对象
     * example YL.Utils.extend(options,opt);
    **/

    extend:function(){

        var target = arguments[0] || {}, i = 1,
          length = arguments.length,
          options;
         if (typeof target != "object" && typeof target != "function")
              target = {};
         for (; i < length; i++)
              if ((options = arguments[i]) != null)
                   for (var name in options) {
                        var copy = options[name];
                        if (target === copy)
                             continue;
                        if (copy !== undefined)
                             target[name] = copy;
                   }
         return target;
    },

    /**!
     * author Lewis.ye
     * description 判断当前浏览器
     * example $isBrowser('ie6')
    **/

    isBrowser:function(str) {
         str = str.toLowerCase();
         var b = navigator.userAgent.toLowerCase();
         var arrB = [];
         arrB['firefox'] = b.indexOf("firefox") != -1;
         arrB['opera'] = b.indexOf("opera") != -1;
         arrB['safari'] = b.indexOf("safari") != -1;
         arrB['chrome'] = b.indexOf("chrome") != -1;
         arrB['gecko'] = !arrB['opera'] && !arrB['safari'] && b.indexOf("gecko") > -1;
         arrB['ie'] = !arrB['opera'] && b.indexOf("msie") != -1;
         arrB['ie6'] = !arrB['opera'] && b.indexOf("msie 6") != -1;
         arrB['ie7'] = !arrB['opera'] && b.indexOf("msie 7") != -1;
         arrB['ie8'] = !arrB['opera'] && b.indexOf("msie 8") != -1;
         arrB['ie9'] = !arrB['opera'] && b.indexOf("msie 9") != -1;
         arrB['ie10'] = !arrB['opera'] && b.indexOf("msie 10") != -1;
         return arrB[str];
    },

     /**!
     * author Lewis.ye
     * description 加载css
    **/

    loadCss:function(path, callback) {
         if (!path) {
              return;
         }
         var l;
         if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
              l = document.createElement('link');
              l.setAttribute('type', 'text/css');
              l.setAttribute('rel', 'stylesheet');
              l.setAttribute('href', path);
              l.setAttribute("id", "loadCss" + Math.random());
              document.getElementsByTagName("head")[0].appendChild(l);
              window["_loadCss"] ? (window["_loadCss"] += "|" + path) : (window["_loadCss"] = "|" + path);
         }
         l && (typeof callback == "function") && (l.onload = callback);
         return true;
    },

     /**!
     * author Lewis.ye
     * description 加载js文件
    **/

    loadScript:function(obj) {
        var self = this;

         if (!self.loadScript.counter) {
              self.loadScript.counter = 1;
         }
         var isObj = typeof(obj) == "object",
              url = isObj ? obj.url : arguments[0],
              id = isObj ? obj.id : arguments[1],
              obj = isObj ? obj : arguments[2],
              _head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
              _script = document.createElement("script"),
              D = new Date(),
              _time = D.getTime(),
              _isCleared = false,
              _timer = null,
              o = obj || {}, data = o.data || '',
              charset = o.charset || "gb2312",
              isToken = o.isToken,
              skey = o.skey,
              timeout = o.timeout,
              isAutoReport = o.isAutoReport || false,
              reportOptions = o.reportOptions || {}, reportType = o.reportType || 'current',
              reportRetCodeName = o.reportRetCodeName,
              reportSuccessCode = typeof(o.reportSuccessCode) == "undefined" ? 200 : o.reportSuccessCode,
              reportErrorCode = typeof(o.reportErrorCode) == "undefined" ? 500 : o.reportErrorCode,
              reportTimeoutCode = typeof(o.reportTimeoutCode) == "undefined" ? 600 : o.reportTimeoutCode,
              onload = o.onload,
              onsucc = o.onsucc,
              callbackName = o.callbackName || '',
              callback = o.callback,
              errorback = o.errorback,
              _jsonpLoadState = 'uninitialized';
         var complete = function(errCode) {
              if (!_script || _isCleared) {
                   return;
              }
              _isCleared = true;
              if (_timer) {
                   clearTimeout(_timer);
                   _timer = null;
              }
              _script.onload = _script.onreadystatechange = _script.onerror = null;
              if (_head && _script.parentNode) {
                   _head.removeChild(_script);
              }
              _script = null;
              if (callbackName) {
                   if (callbackName.indexOf('.') == -1) {
                        window[callbackName] = null;
                        try {
                             delete window[callbackName];
                        } catch (e) {}
                   } else {
                        var arrJ = callbackName.split("."),
                             p = {};
                        for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                             var n = arrJ[j];
                             if (j == 0) {
                                  p = window[n];
                             } else {
                                  if (j == jLen - 1) {
                                       try {
                                            delete p[n];
                                       } catch (e) {}
                                  } else {
                                       p = p[n];
                                  }
                             }
                        }
                   }
              }
              if (_jsonpLoadState != "loaded" && typeof errorback == "function") {
                   errorback(errCode);
              }
              if (isAutoReport && reportType != 'cross') {
                   _retCoder.report(_jsonpLoadState == "loaded", errCode);
              }
         };
         var jsontostr = function(d) {
              var a = [];
              for (var k in d) {
                   a.push(k + '=' + d[k]);
              }
              return a.join('&');
         };
         if (isAutoReport && reportOptions) {
              if (reportType == 'cross') {
                   $returnCode(reportOptions).reg();
              } else {
                   reportOptions.url = reportOptions.url || url.substr(0, url.indexOf('?') == -1 ? url.length : url.indexOf('?'));
                   var _retCoder = $returnCode(reportOptions);
              }
         }
         if (data) {
              url += (url.indexOf("?") != -1 ? "&" : "?") + (typeof data == 'string' ? data : jsontostr(data));
         }
         if (callbackName && typeof callback == "function") {
              var oldName = callbackName;
              if (callbackName.indexOf('.') == -1) {
                   callbackName = window[callbackName] ? callbackName + self.loadScript.counter++ : callbackName;
                   window[callbackName] = function(jsonData) {
                        _jsonpLoadState = 'loaded';
                        if (isAutoReport && reportRetCodeName) {
                             reportSuccessCode = jsonData[reportRetCodeName];
                        }
                        callback.apply(null, arguments);
                        onsucc && (onsucc());
                   };
              } else {
                   var arrJ = callbackName.split("."),
                        p = {}, arrF = [];
                   for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                        var n = arrJ[j];
                        if (j == 0) {
                             p = window[n];
                        } else {
                             if (j == jLen - 1) {
                                  p[n] ? (n = n + $loadScript.counter++) : '';
                                  p[n] = function(jsonData) {
                                       _jsonpLoadState = 'loaded';
                                       if (isAutoReport && reportRetCodeName) {
                                            reportSuccessCode = jsonData[reportRetCodeName];
                                       }
                                       callback.apply(null, arguments);
                                       onsucc && (onsucc());
                                  };
                             } else {
                                  p = p[n];
                             }
                        }
                        arrF.push(n);
                   }
                   callbackName = arrF.join('.');
              }
              url = url.replace('=' + oldName, '=' + callbackName);
         }
         _jsonpLoadState = 'loading';
         id = id ? (id + _time) : _time;
         url = (isToken !== false ? $addToken(url, "ls", skey) : url);
         _script.charset = charset;
         _script.id = id;
         _script.onload = _script.onreadystatechange = function() {
              var uA = navigator.userAgent.toLowerCase();
              if (!(!(uA.indexOf("opera") != -1) && uA.indexOf("msie") != -1) || /loaded|complete/i.test(this.readyState)) {
                   if (typeof onload == "function") {
                        onload();
                   }
                   complete(_jsonpLoadState == "loaded" ? reportSuccessCode : reportErrorCode);
              }
         };
         _script.onerror = function() {
              complete(reportErrorCode);
         };
         if (timeout) {
              _timer = setTimeout(function() {
                   complete(reportTimeoutCode);
              }, parseInt(timeout, 10));
         }
         setTimeout(function() {
              _script.src = url;
              try {
                   _head.insertBefore(_script, _head.lastChild);
              } catch (e) {}
         }, 0);
    },

    /**!
     * author Lewis.ye
     * description 加载url
    **/

    loadUrl:function(o) {
         o.element = o.element || 'script';
         var el = document.createElement(o.element);
         el.charset = o.charset || 'utf-8';
         o.onBeforeSend && o.onBeforeSend(el);
         el.onload = el.onreadystatechange = function() {
              if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
                   o.onLoad && o.onLoad();
                   clear();
              }
         };
         el.onerror = function() {
              clear();
         };
         el.src = o.url;
         document.getElementsByTagName('head')[0].appendChild(el);

         function clear() {
              if (!el) {
                   return;
              }
              el.onload = el.onreadystatechange = el.onerror = null;
              el.parentNode && (el.parentNode.removeChild(el));
              el = null;
         }
    },

    /**!
     * author Lewis.ye
     * description 设置 cookies
    **/

    setCookie:function(name, value, expires, path, domain, secure) {
         var exp = new Date(),
              expires = arguments[2] || null,
              path = arguments[3] || "/",
              domain = arguments[4] || null,
              secure = arguments[5] || false;
         expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
         document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    },

    /**!
     * author Lewis.ye
     * description 获取 cookies
    **/

    getCookie:function(name) {

     var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),

          val = document.cookie.match(reg);

        return val ? (val[2] ? unescape(val[2]) : "") : null;
    },

     /**!
     * author Lewis.ye
     * description delete cookies
    **/

    removeCookie:function(name){

        this.setCookie(name,1,-1);

    },

    /**!
     * author Lewis.ye
     * description jq:$.parseJSON  js:eval()
     * $strToJson($getCookie("rgStat"), "?", "&");
    **/

    strToJson:function(str, filter, mark) {
         var arr = str.replace(filter, "").split(mark);
         var json = {};
         for (var i = 0, l = arr.length; i < l; i++) {
              var temp = arr[i].split("=");
              json[temp[0]] = temp[1];
         }
         return json;
    },

    /**!
     * author Lewis.ye
     * description trim函数
     * finish
    **/

    strTrim:function(str, code) {
         var argus = code || "\\s";
         var temp = new RegExp("(^" + argus + "*)|(" + argus + "*$)", "g");
         return str.replace(temp, "");
    },

    /**!
     * author Lewis.ye
     * description setTimeout clearTimeout
    **/

    throttle:function(method, context, delay) {
         clearTimeout(method.tId);
         method.tId = setTimeout(function() {
              method.call(context);
         }, delay);
    },

    /**!
     * author Lewis.ye
     * description drag
     * ok
    **/

    initDragDom:function(idName) {
         var doc = document,
             oDiv = $(idName),
             startX = 0,
             startY = 0,
             startLeft = 0,
             startTop = 0;
         oDiv.onmousedown = startDrag;

         function startDrag(e) {
              var e = e || window.event;
              startX = e.clientX;
              startY = e.clientY;
              startLeft = oDiv.offsetLeft;
              startTop = oDiv.offsetTop;
              if (oDiv.setCapture) {
                   oDiv.onmousemove = doDrag;
                   oDiv.onmouseup = stopDrag;
                   oDiv.setCapture();
              } else {
                   doc.addEventListener("mousemove", doDrag, true);
                   doc.addEventListener("mouseup", stopDrag, true);
                   return false;
              }
         }

         function doDrag(e) {
              var e = e || window.event;
              var l = e.clientX - startX + startLeft;
              var t = e.clientY - startY + startTop;
              if (l < 0) {
                   l = 0;
              } else if (l > doc.documentElement.clientWidth - oDiv.offsetWidth) {
                   l = doc.documentElement.clientWidth - oDiv.offsetWidth;
              }
              if (t < 0) {
                   t = 0
              } else if (t > doc.documentElement.clientHeight - oDiv.offsetHeight) {
                   t = doc.documentElement.clientHeight - oDiv.offsetHeight;
              }
              oDiv.style.left = l + "px";
              oDiv.style.top = t + "px";
         }

         function stopDrag() {
              if (oDiv.releaseCapture) {
                   // oDiv.onmousemove = doDrag;
                   // oDiv.onmouseup = stopDrag;
                   oDiv.releaseCapture();
              } else {
                   doc.removeEventListener("mousemove", doDrag, true);
                   doc.removeEventListener("mouseup", stopDrag, true);
              }
              oDiv.onmousemove = null;
              oDiv.onmouseup = null;
         }
         window.onresize = function() {
              if (oDiv.offsetLeft > doc.documentElement.clientWidth - oDiv.offsetWidth) {
                   oDiv.style.left = doc.documentElement.clientWidth - oDiv.offsetWidth + "px";
              }
              if (oDiv.offsetTop > doc.documentElement.clientHeight - oDiv.offsetHeight) {
                   oDiv.style.top = doc.documentElement.clientHeight - oDiv.offsetHeight + "px";
              }
         }
    },

    /**!
     * author Lewis.ye
     * description strReplace
     * example OU.strReplace($("replace").getAttribute("data-option"),"yao","bu")
     * finish
    **/

    strReplace:function(str, re, rt) {
         if (rt != undefined) {
              replace(re, rt);
         } else {
              for (var key in re) {
                   replace("{#" + key + "#}", re[key]);
              };
         };

         function replace(a, b) {
              var arr = str.split(a);
              str = arr.join(b);
         };
         return str;
    },
    //false  chrome 下取到字段长度为8  IE 78 为 9
    //和trim一起使用，是可以的
    //finish
    getInnerText:function(node) {
         if ("innerText" in node) {
              return node.innerText;
         };
         var str = "";
         var nodeList = node.childNodes;
         for (var i = 0, j = nodeList.length; i < j; i++) {
              if (nodeList[i].nodeType == 1) {
                   str += this.getInnerText(nodeList[i]);
              } else if (nodeList[i].nodeType == 3) {
                   str += nodeList[i].nodeValue;
              }
         }
         return str;
    },
    //获取当前滚动条偏移量-h，无滚动条则返回0
    //finish
    getPageScrollHeight:function() {
         var bodyCath = document.body;
         var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
         var ua = navigator.userAgent.toLowerCase();
         return (window.MessageEvent && ua.indexOf('firefox') == -1 && ua.indexOf('opera') == -1 && ua.indexOf('msie') == -1) ? bodyCath.scrollTop : doeCath.scrollTop;
    },
    //获取当前滚动条偏移量-w，无滚动条则返回0
    getPageScrollWidth:function() {
         var bodyCath = document.body;
         var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
         return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollLeft : doeCath.scrollLeft;
    },

    getQuery:function(name, url) {
         var u = arguments[1] || window.location.search,
              reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
              r = u.substr(u.indexOf("\?") + 1).match(reg);
         return r != null ? r[2] : "";
    },

    getTarget:function(e, parent, tag) {
         var e = window.event || e,
              tar = e.srcElement || e.target;
         if (parent && tag && tar.nodeName.toLowerCase() != tag) {
              while (tar = tar.parentNode) {
                   if (tar == parent || tar == document.body || tar == document) {
                        return null;
                   } else if (tar.nodeName.toLowerCase() == tag) {
                        break;
                   }
              }
         };
         return tar;
    },

    time33: function(str) {
         for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
              hash += (hash << 5) + str.charAt(i).charCodeAt();
         };
         return hash & 0x7fffffff;
    },

    //返回当前窗口高度
    getWindowHeight:function() {
         var bodyCath = document.body;
         return (document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientHeight;
    },

    getX:function(e) {
         var t = e.offsetLeft || 0;
         while (e = e.offsetParent) t += e.offsetLeft;
         return t;
    },

    getY:function(e) {
         var t = e.offsetTop || 0;
         while (e = e.offsetParent) {
              t += e.offsetTop;
         }
         return t;
    },

    getYP:function(e) {
        var self = this,
            t = self.getY(e),
            e = e.parentNode;
         while (0 === t && document.body != e) {
              t = self.getY(e);
              e = e.parentNode;
         }
         return t;
    },
     /**!
     * author Lewis.ye
     * description scroll x y 以一个对象的的方式返回滚动条偏移量
     * param:w 指定窗口，如果没有参数，则使用当前窗口
     * finish 横向无滚动条，则返回undefined  否则返回具体数值
    **/

    getScrollOffsets:function(w){
        //w 指定窗口，如果没有参数，则使用当前窗口
        w = w || window;

        //除了IE 8 以及早起版本，其他浏览器都可以使用
        if(w.pageXOffset!=null){
            return {x:w.pageXOffset,y:w.pageYOffset};
        }
        //对标准模式下的IE 或任何浏览器
        var d = w.document;
        if(document.compatMode =="CSS1Compat"){
            return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};
        }
        //对怪异模式下的IE
        return {x:d.body.scrollLeft,y:d.body.scrollTop};
    },

    /**!
     * author Lewis.ye
     * description 获取视窗大小 ,返回对象
     * param:w 指定窗口，如果没有参数，则使用当前窗口
     * user  elment.getViewportSize().x
     * chrome 1280 IE 1259
     * finish
    **/

    getViewportSize:function(w){
        //w 指定窗口，如果没有参数，则使用当前窗口
        w = w || window;

        //除了IE 8 以及早起版本，其他浏览器都可以使用
        if(w.innerWidth!=null){
            return {w:w.innerWidth,h:w.innerHeight};
        }
        //对标准模式下的IE 或任何浏览器
        var d = w.document;
        if(document.compatMode =="CSS1Compat"){
            return {w:d.documentElement.clientWidth,h:d.documentElement.clientHeight};
        }

        //对怪异模式下的IE
        return {w:d.body.clientWidth,h:d.body.clientHeight};
    },

    /**!
     * author Lewis.ye
     * description 滚动
    **/

    scroll:function(opt) {
       var that = arguments.callee,self = this;
       if (that.isBind === undefined) {
            that.isBind = false;
            that.heightList = [];
            that.funcList = [];
            that.optList = [];
            that.visibleH = document.documentElement.clientHeight || document.body.clientHeight;
       }
       if (opt.clean == true) {
            that.heightList = [];
            that.funcList = [];
            that.optList = [];
       }
       var _win = window,
            _doc = document;
       if (opt.parent) {
            _win = opt.parent.window;
            _doc = opt.parent.document;
            that.visibleH = _doc.documentElement.clientHeight || _doc.body.clientHeight;
       }
       var height = opt.height != undefined ? opt.height : self.getY($(opt.id));
       if (that.visibleH < height) {
            that.heightList.push(height * 1);
            that.funcList.push(opt.func);
            that.optList.push(opt);
       } else {
            opt.func(opt);
       }; if (that.isBind) {
            that.isBind = true;
       } else {
            OD.addEvent(_win, 'scroll', onScroll);
            OD.addEvent(_win, 'resize', onScroll);
       };

       function onScroll() {
            $throttle(doScroll, null, 100);
       }

       function doScroll() {
            var len = that.heightList.length;
            if (len === 0) {
                 OD.delEvent(_win, 'scroll', onScroll);
                 OD.delEvent(_win, 'resize', onScroll);
                 return null;
            };
            var dv = _doc.defaultView,
                 y = (dv) ? dv.pageYOffset : 0,
                 h = that.visibleH,
                 arrHeight = [],
                 arrFunc = [],
                 arrOpt = [];
            var doList = [];
            try {
                 h += Math.max(_doc.body.scrollTop, _doc.documentElement.scrollTop, y);
            } catch (e) {}
            for (var i = 0; i < len; i++) {
                 if (h > that.heightList[i]) {
                      doList.push(that.optList[i]);
                 } else {
                      arrHeight.push(that.heightList[i]);
                      arrFunc.push(that.funcList[i]);
                      arrOpt.push(that.optList[i]);
                 }
            };
            that.heightList = arrHeight;
            that.funcList = arrFunc;
            that.optList = arrOpt;
            if (doList.length > 0) {
                 execTask(doList);
            }
       }

       function execTask(taskList) {
            for (var i = 0, j = taskList.length; i < j; i++) {
                 taskList[i].func(taskList[i]);
            }
       }
    },

    /**!
     * author Lewis.ye
     * description 元素移动方法
     * 2014-04-15
     * ok
    **/

    moveElement:function(elementID,final_x,final_y,interval){
      var self = this;
      if(!document.getElementById) return false;
      if(!document.getElementById(elementID)) return false;
      var elem= typeof elementID=="string"?document.getElementById(elementID):elementID;
      if(elem.movement){
        clearTimeout(elem.movement);
      }
      if(!elem.style.left){
        elem.style.left="0px";
      }
      if(!elem.style.top){
        elem.style.top="0px";
      }

      var xpos = parseInt(elem.style.left),
          ypos = parseInt(elem.style.top),
          dist = 0;

      if(xpos==final_x&&ypos==final_y){
        return true;
      }

      if(xpos<final_x){
        dist = Math.ceil((final_x-xpos)/10);
        xpos+=dist;
      }

       if(xpos>final_x){
        dist = Math.ceil((xpos-final_x)/10);
        xpos-=dist;
      }

      if(ypos<final_y){
        dist = Math.ceil((final_y-ypos)/10);
        ypos+=dist;
      }

       if(ypos>final_y){
        dist = Math.ceil((ypos-final_y)/10);
        ypos-=dist;
      }

      elem.style.left=xpos+"px";
      elem.style.top=ypos+"px";
      var repeat = "OU.moveElement('"+elementID+"','"+final_x+"','"+final_y+"','"+interval+"')";
      elem.movement = setTimeout(repeat,interval);
    },

    /**
     * js截取字符串，中英文都能用
     * @param str：需要截取的字符串
     * @param len: 需要截取的长度
     * example OU.cutstr($("replace").getAttribute("data-option"),4)
     * finish
     */
    cutstr: function(str,len){
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for(var i = 0; i < str_len; i++)
        {
            a = str.charAt(i);
            str_length++;
            if(escape(a).length > 4)
            {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if(str_length>=len)
            {
                //str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if(str_length < len){
            return  str;
        }
    },

    /**
     * tab 隔行变色
     * @param obj:可有可无的对象，用来添加控制行classname
     * finish
     */

    stripeTables:function(obj){
        obj = obj || {};
        if(!document.getElementsByTagName) return false;
        var tables = document.getElementsByTagName("table");
        for(var i=0,len=tables.length;i<len;i++){
          var odd = false;
          var rows = tables[i].getElementsByTagName("tr");
          for(var j=0;j<rows.length;j++){
            if(odd==true){
              OD.addClass(rows[j],obj.c_name?obj.c_name:"odd");
               odd = false;
            }else{
              odd = true;
            }
          }
        }
     },

     /**
     * form表单验证
     *
     */
     validateForm:function(whichform){
        for(i=0;i<whichform.elments.length;i++){
          var element = whichform.elments[i].length;
            if(element.required = "required"){

              if(!isFilled(element)){
                alert("please fill in the "+element.name+"");
                return false;
              }

              if(element.type= "email"){
                if(!isEmail(element)){
                  alert("请输入正确的email地址");
                  return false;
                }
              }

            }
        }
      return true;
     }




};

/*!**************************!
 * type prototype
 * author Lewis.ye
 * description Tab类的原型
 * 曾在清除时间问题
 *****************************/
YL.Utils.Tab.prototype = {
//show items
showItem:function(n){
    for(var i=0;i<this._tabContents.length;i++){
        this._tabContents[i].style.display = "none";
    }

    this._tabContents[n].style.display = "block";

    if(this._currentClass){
        var currentMenu = YL.Dom.getElementsByClassName(this._currentClass,this._root)[0];
        if(currentMenu){
            YL.Dom.delClass(currentMenu,this._currentClass);
        }
        YL.Dom.addClass(this._tabContents[n],this._currentClass);
    }

    if(this._handler){
        this._handler(n);
    }
},
// autoplay
_autoHandler:function(){

    this.currentIndex++;
    if(this.currentIndex>=this._tabMenus.length){
        this.currentIndex=0;
    }
    this.showItem(this.currentIndex);

}
}


/*!**************************!
 * function
 *****************************/

function isFilled(field){
  if(field.value.replace(" ","").length==0){
    return false;
  }
  var placeholder = field.placeholder || field.getAttribute("placeholder");
  return (field.value!=placeholder);
}
//判断当前email格式是否正确
function isEmail(field){
    return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}



// jq
// ;(function($) {
//      $.fn.hoverDelay = function(options) {
//           var defaults = {
//                hoverDuring: 200,
//                outDuring: 200,
//                hoverEvent: function() {
//                     $.noop();
//                },
//                outEvent: function() {
//                     $.noop();
//                }
//           };
//           var sets = $.extend(defaults, options || {});
//           var hoverTimer, outTimer;
//           return $(this).each(function() {
//                $(this).hover(function() {
//                     clearTimeout(outTimer);
//                     hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
//                }, function() {
//                     clearTimeout(hoverTimer);
//                     outTimer = setTimeout(sets.outEvent, sets.outDuring);
//                });
//           });
//      }
// })(jQuery);