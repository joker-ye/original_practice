window['YX.search.time'] && window['YX.search.time'].push(new Date());
//ok
function $addClass(ids, cName) {
     $setClass(ids, cName, "add");
};
//ok
function $addEvent(obj, type, handle) {
     if (!obj || !type || !handle) {
          return;
     }
     if (obj instanceof Array) {
          for (var i = 0, l = obj.length; i < l; i++) {
               $addEvent(obj[i], type, handle);
          }
          return;
     }
     if (type instanceof Array) {
          for (var i = 0, l = type.length; i < l; i++) {
               $addEvent(obj, type[i], handle);
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
};
//ok
function $addToken(url, type, skey) {
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
};

function $addUniq(arr, obj) {
     if (!arr) {
          arr = [obj];
          return arr;
     }
     for (var i = arr.length; i--;) {
          if (arr[i] === obj) {
               return arr;
          }
     }
     arr.push(obj);
     return arr;
};

function $arrayUniq(arr) {
     var returnArr = [];
     for (var i = 0, len = arr.length; i < len; i++) {
          (("," + returnArr + ",").indexOf("," + arr[i] + ",") < 0) ? returnArr.push(arr[i]) : '';
     };
     return returnArr;
};

function $attr(attr, val, node) {
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
};

function $autoLoadImages(option) {
     var opt = {
          scrollOffsetH: 100,
          initSrcName: 'init_src'
     };
     if (option) {
          for (var key in option) {
               opt[key] = option[key];
          }
     }
     if (window['_PP_core_autoLoadImages_data']) {
          if (window['_PP_core_autoLoadImages_data'].nosrcLength == 0) {
               clearInterval(window._PP_core_autoLoadImages_data.ptr);
               window._PP_core_autoLoadImages_data.ptr = setInterval(function() {
                    doScroll();
               }, 100);
          }
          window['_PP_core_autoLoadImages_data'].allNum = 0;
          return;
     }
     window['_PP_core_autoLoadImages_data'] = {
          allNum: 0,
          nosrcImages: [],
          nosrcLength: 0,
          ciguid: 0,
          ptr: null
     };
     clearInterval(window._PP_core_autoLoadImages_data.ptr);
     window._PP_core_autoLoadImages_data.ptr = setInterval(function() {
          doScroll()
     }, 100);

     function doScroll() {
          var data = window['_PP_core_autoLoadImages_data'],
               allImage = document.images;
          if (allImage.length > data.allNum) {
               data.nosrcImages = [];
               for (var i = 0, j = allImage.length; i < j; i++) {
                    var src = allImage[i].getAttribute(opt.initSrcName);
                    if (src && !allImage[i].getAttribute("iguid")) {
                         data.nosrcImages.push([allImage[i], src, $getY(allImage[i])]);
                    }
               }
               data.nosrcLength = data.nosrcImages.length;
               data.allNum = allImage.length;
          }
          if (data.nosrcLength == 0) {
               if (data.ptr != null) {
                    clearInterval(data.ptr);
                    data.ptr = null;
                    data.allNum = 0;
                    data.nosrcImages = [];
               }
               return;
          };
          var bodyCache = document.body,
               domCache = (document.compatMode == 'BackCompat') ? bodyCache : document.documentElement,
               offsetH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
               visibleH = offsetH + domCache.clientHeight;
          for (var i = 0, j = data.nosrcImages.length; i < j; i++) {
               if (!data.nosrcImages[i]) {
                    continue;
               }
               if ((visibleH + opt.scrollOffsetH) > data.nosrcImages[i][2]) {
                    var _item = data.nosrcImages[i];
                    _item[0].setAttribute("src", _item[1]);
                    _item[0].setAttribute("iguid", data.ciguid++);
                    delete data.nosrcImages[i];
                    data.nosrcLength--;
               }
          }
     }
};
//ok
function $backToTop(opt) {
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
     };
     $extend(option, opt);
     option.periodical = Math.round(1000 / option.fps);
     option.step = Math.round(option.duration / option.fps);

     function createButton() {
          var b = $id(option.id);
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
                    var elm = $id(option.container),
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
               $loadCss(option.cssUrl);
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
};

function $child(node, val, fn, filter) {
     var results = [],
          filter = filter || $empty();
     if (!node) return results;
     walk(node.firstChild, function(n) {
          if (!n) {
               return;
          }
          var actual = n.nodeType === 1 && n.nodeName.toLowerCase();
          if (typeof actual === 'string' && (actual === val || typeof val !== 'string') && filter(n)) {
               results.push(n);
               fn && fn(n, results.length - 1);
          }
     });
     return results;

     function walk(n, func) {
          func(n);
          while (n && (n = n.nextSibling)) {
               func(n, func);
          }
     }
};

function $delClass(ids, cName) {
     $setClass(ids, cName, "remove");
};

function $delCookie(name, path, domain, secure) {
     var value = $getCookie(name);
     if (value != null) {
          var exp = new Date();
          exp.setMinutes(exp.getMinutes() - 1000);
          path = path || "/";
          document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
     }
};

function $delEvent(obj, type, handle) {
     if (!obj || !type || !handle) {
          return;
     }
     if (obj instanceof Array) {
          for (var i = 0, l = obj.length; i < l; i++) {
               $delEvent(obj[i], type, handle);
          }
          return;
     }
     if (type instanceof Array) {
          for (var i = 0, l = type.length; i < l; i++) {
               $delEvent(obj, type[i], handle);
          }
          return;
     }

     function find(obj, type, handler) {
          var hids = obj.__hids;
          if (!hids || !window.__allHandlers) {
               return null;
          }
          for (var i = hids.length - 1; i >= 0; i--) {
               var hid = hids[i];
               var h = window.__allHandlers[hid];
               if (h && h.type == type && h.handler == handler) {
                    var wrapper = h.wrapper;
                    window.__allHandlers[hid] = null;
                    delete window.__allHandlers[hid];
                    hids.splice(i, 1);
                    obj.__hids = hids;
                    return wrapper;
               }
          }
          return null;
     }
     if (window.removeEventListener) {
          obj.removeEventListener(type, find(obj, type, handle) || handle, false);
     } else if (window.detachEvent) {
          obj.detachEvent("on" + type, find(obj, type, handle) || handle);
     }
};

function $empty() {
     return function() {
          return true;
     }
};

function $extend() {
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
};

function $fireEvent(dom, type, eType) {
     var dom = $id(dom),
          type = type || "click",
          eType = eType || "MouseEvents";
     if (dom == document && document.createEvent && !dom.dispatchEvent) {
          dom = document.documentElement;
     }
     var e;
     if (document.createEvent) {
          e = document.createEvent(eType);
          e.initEvent(type, true, true);
          dom.dispatchEvent(e);
     } else {
          e = document.createEventObject();
          e.eventType = "on" + type;
          dom.fireEvent(e.eventType, event);
     }
};
//ok
function $getCookie(name) {
     var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
          val = document.cookie.match(reg);
     return val ? (val[2] ? unescape(val[2]) : "") : null;
};

function $getElementsByClass(classN, root) {
     if (typeof classN != "string") {
          return null;
     }
     if (!root || root.nodeType != "1") {
          root = document.body;
     }
     var _all = root.getElementsByTagName("*");
     var _arr = [];
     for (var i = 0, len = _all.length; i < len; i++) {
          for (var j = 0, k = _all[i].className.split(" "), l = k.length; j < l; j++) {
               if (k[j] == classN) {
                    _arr.push(_all[i]);
               }
          }
     }
     return _arr;
};

function $getInnerText(node) {
     if ("innerText" in node) {
          return node.innerText;
     };
     var str = "";
     var nodeList = node.childNodes;
     for (var i = 0, j = nodeList.length; i < j; i++) {
          if (nodeList[i].nodeType == 1) {
               str += $getInnerText(nodeList[i]);
          } else if (nodeList[i].nodeType == 3) {
               str += nodeList[i].nodeValue;
          }
     }
     return str;
};

function $getPageScrollHeight() {
     var bodyCath = document.body;
     var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
     var ua = navigator.userAgent.toLowerCase();
     return (window.MessageEvent && ua.indexOf('firefox') == -1 && ua.indexOf('opera') == -1 && ua.indexOf('msie') == -1) ? bodyCath.scrollTop : doeCath.scrollTop;
};

function $getPageScrollWidth() {
     var bodyCath = document.body;
     var doeCath = document.compatMode == 'BackCompat' ? bodyCath : document.documentElement;
     return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? bodyCath.scrollLeft : doeCath.scrollLeft;
};

function $getQuery(name, url) {
     var u = arguments[1] || window.location.search,
          reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
          r = u.substr(u.indexOf("\?") + 1).match(reg);
     return r != null ? r[2] : "";
};

function $getTarget(e, parent, tag) {
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
};

function $getToken(skey) {
     var skey = skey ? skey : $getCookie("skey");
     return skey ? $time33(skey) : "";
};

function $getWindowHeight() {
     var bodyCath = document.body;
     return (document.compatMode == 'BackCompat' ? bodyCath : document.documentElement).clientHeight;
};

function $getX(e) {
     var t = e.offsetLeft || 0;
     while (e = e.offsetParent) t += e.offsetLeft;
     return t;
};

function $getY(e) {
     var t = e.offsetTop || 0;
     while (e = e.offsetParent) {
          t += e.offsetTop;
     }
     return t;
};

function $getYP(e) {
     var t = $getY(e),
          e = e.parentNode;
     while (0 === t && document.body != e) {
          t = $getY(e);
          e = e.parentNode;
     }
     return t;
};
//ok
function $hasClass(old, cur) {
     if (!old || !cur) return null;
     var arr = (typeof old == 'object' ? old.className : old).split(' ');
     for (var i = 0, len = arr.length; i < len; i++) {
          if (cur == arr[i]) {
               return cur;
          }
     };
     return null;
};

function $hoverDelay(dom, opt) {
     if (!dom) {
          return;
     }
     var options = {
          hoverDuring: 200,
          outDuring: 200,
          hoverEvent: function() {
               $empty();
          },
          outEvent: function() {
               $empty();
          }
     };
     var sets = $extend(options, opt || {});
     var hoverTimer, outTimer, that = this;
     $addEvent(dom, "mouseover", function(e) {
          clearTimeout(outTimer);
          hoverTimer = setTimeout(function() {
               sets.hoverEvent.apply(that)
          }, sets.hoverDuring);
     });
     $addEvent(dom, "mouseout", function(e) {
          clearTimeout(hoverTimer);
          outTimer = setTimeout(function() {
               sets.outEvent.apply(that)
          }, sets.outDuring);
     });
};
//ok
function $id(id) {
     return typeof(id) == "string" ? document.getElementById(id) : id;
};
//ok
function $inArray(t, arr) {
     if (arr.indexOf) {
          return arr.indexOf(t);
     }
     for (var i = arr.length; i--;) {
          if (arr[i] === t) {
               return i * 1;
          }
     };
     return -1;
};
//ok
function $isArray(source) {
     return '[object Array]' == Object.prototype.toString.call(source);
};
//ok
function $isBrowser(str) {
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
};
//ok
function $loadCss(path, callback) {
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
};
//ok
function $loadScript(obj) {
     if (!$loadScript.counter) {
          $loadScript.counter = 1;
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
               callbackName = window[callbackName] ? callbackName + $loadScript.counter++ : callbackName;
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
};
//ok
function $loadUrl(o) {
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
};
//ok
function $namespace(name) {
     for (var arr = name.split(','), r = 0, len = arr.length; r < len; r++) {
          for (var i = 0, k, name = arr[r].split('.'), parent = {}; k = name[i]; i++) {
               i === 0 ? eval('(typeof ' + k + ')==="undefined"?(' + k + '={}):"";parent=' + k) : (parent = parent[k] = parent[k] || {});
          }
     }
};
(function() {
     var isReady = false,
          readyList = [],
          timer;
     $ready = function(fn) {
          if (isReady)
               fn.call(document);
          else
               readyList.push(function() {
                    return fn.call(this);
               });
          return this;
     }
     var onDOMReady = function() {
          for (var i = 0, len = readyList.length; i < len; i++) {
               readyList[i].apply(document);
          }
          readyList = null;
     }
     var bindReady = function(evt) {
          if (isReady) return;
          isReady = true;
          onDOMReady.call(window);
          if (document.removeEventListener) {
               document.removeEventListener("DOMContentLoaded", bindReady, false);
          } else if (document.attachEvent) {
               document.detachEvent("onreadystatechange", bindReady);
               if (window == window.top) {
                    clearInterval(timer);
                    timer = null;
               }
          }
     };
     if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", bindReady, false);
     } else if (document.attachEvent) {
          document.attachEvent("onreadystatechange", function() {
               if ((/loaded|complete/).test(document.readyState)) {
                    bindReady();
               }
          });
          if (window == window.top) {
               timer = setInterval(function() {
                    try {
                         isReady || document.documentElement.doScroll('left');
                    } catch (e) {
                         return;
                    }
                    bindReady();
               }, 5);
          }
     }
})();

function $report(url) {
     $loadUrl({
          'url': url + ((url.indexOf('?') == -1) ? '?' : '&') + Math.random(),
          'element': 'img'
     });
};

function $returnCode(opt) {
     var option = {
          url: "",
          action: "",
          sTime: "",
          eTime: "",
          retCode: "",
          errCode: "",
          frequence: 1,
          refer: "",
          uin: "",
          domain: "paipai.com",
          from: 1,
          report: report,
          isReport: false,
          timeout: 3000,
          timeoutCode: 444,
          formatUrl: true,
          reg: reg
     };
     try {
          option['refer'] = location.href;
     } catch (e) {}
     for (var i in opt) {
          option[i] = opt[i];
     }
     if (option.url) {
          option.sTime = new Date();
     }
     if (option.timeout) {
          setTimeout(function() {
               if (!option.isReport) {
                    option.report(false, option.timeoutCode);
               }
          }, option.timeout);
     }

     function reg() {
          this.sTime = new Date();
          if (!this.action) {
               return;
          }
          var rcookie = $getCookie("retcode"),
               cookie2 = [];
          rcookie = rcookie ? rcookie.split("|") : [];
          for (var i = 0; i < rcookie.length; i++) {
               if (rcookie[i].split(",")[0] != this.action) {
                    cookie2.push(rcookie[i]);
               }
          }
          cookie2.push(this.action + "," + this.sTime.getTime());
          $setCookie("retcode", cookie2.join("|"), 60, "/", this.domain);
     }

     function report(ret, errid) {
          if (this.isReport == true) {
               return;
          }
          this.isReport = true;
          this.eTime = new Date();
          this.retCode = ret ? 1 : 2;
          this.errCode = isNaN(parseInt(errid)) ? "0" : parseInt(errid);
          if (this.action) {
               this.url = "http://retcode.paipai.com/" + this.action;
               var rcookie = $getCookie("retcode"),
                    ret = "",
                    ncookie = [];
               rcookie = rcookie ? rcookie.split("|") : [];
               for (var i = 0; i < rcookie.length; i++) {
                    if (rcookie[i].split(",")[0] == this.action) {
                         ret = rcookie[i].split(",");
                    } else {
                         ncookie.push(rcookie[i]);
                    }
               }
               $setCookie("retcode", ncookie.join("|"), 60, "/", this.domain);
               if (!ret) {
                    return;
               }
               this.sTime = new Date(parseInt(ret[1]));
          }
          if (!this.url) {
               return;
          }
          var domain = this.url.replace(/^.*\/\//, '').replace(/\/.*/, ''),
               timer = this.eTime - this.sTime,
               cgi = encodeURIComponent(this.formatUrl ? this.url.match(/^[\w|/|.|:|-]*/)[0] : this.url);
          this.reportUrl = "http://c.isdspeed.qq.com/code.cgi?domain=" + domain + "&cgi=" + cgi + "&type=" + this.retCode + "&code=" + this.errCode + "&time=" + timer + "&rate=" + this.frequence + (this.uin ? ("&uin=" + this.uin) : "");
          if (this.reportUrl && Math.random() < (1 / this.frequence) && this.url) {
               $report(this.reportUrl);
          }
     }
     return option;
};

function $scroll(opt) {
     var that = arguments.callee;
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
     var height = opt.height != undefined ? opt.height : $getY($id(opt.id));
     if (that.visibleH < height) {
          that.heightList.push(height * 1);
          that.funcList.push(opt.func);
          that.optList.push(opt);
     } else {
          opt.func(opt);
     }; if (that.isBind) {
          that.isBind = true;
     } else {
          $addEvent(_win, 'scroll', onScroll);
          $addEvent(_win, 'resize', onScroll);
     };

     function onScroll() {
          $throttle(doScroll, null, 100);
     }

     function doScroll() {
          var len = that.heightList.length;
          if (len === 0) {
               $delEvent(_win, 'scroll', onScroll);
               $delEvent(_win, 'resize', onScroll);
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
};

function $serial(funcArr, allDone) {
     var tmp = funcArr[0].callback;
     if (funcArr.length > 1) {
          funcArr[0].callback = function(data) {
               tmp.apply(null, arguments);
               funcArr.splice(0, 1);
               $serial(funcArr, allDone);
          }
          $loadScript(funcArr[0])
     } else {
          funcArr[0].callback = function(data) {
               tmp.apply(null, arguments);
               allDone();
          }
          $loadScript(funcArr[0]);
     }
};

//OK
function $setClass(ids, cName, kind) {
     if (!ids) {
          return;
     }
     var set = function(obj, cName, kind) {
          if (!obj) {
               return;
          }
          var oldName = obj.className,
               arrName = oldName ? oldName.split(' ') : [];
          if (kind == "add") {
               if (!$hasClass(oldName, cName)) {
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
};
//ok
function $setCookie(name, value, expires, path, domain, secure) {
     var exp = new Date(),
          expires = arguments[2] || null,
          path = arguments[3] || "/",
          domain = arguments[4] || null,
          secure = arguments[5] || false;
     expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
     document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
};
//ok
function $stopEvent(e) {
     if (e && e.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
     } else {
          window.event.returnValue = false;
          window.event.cancelBubble = true;
     }
};
(function() {
     $storage = {
          instance: null,
          init: function(E, D) {
               var B = ["localStorage", "globalStorage", "userData"];
               var A = {};
               A.userData = {
                    db: null,
                    isSupport: !! window.ActiveXObject,
                    get: function(G, F) {
                         this.db.load(E);
                         var H = this.db.getAttribute(G);
                         return H
                    },
                    set: function(F, G) {
                         try {
                              this.db.load(E);
                              this.db.setAttribute(F, G);
                              this.db.save(E);
                              return true
                         } catch (H) {
                              return false
                         }
                    },
                    init: function() {
                         var F = (document.documentElement || document.body);
                         F.addBehavior("#default#userdata");
                         F.load(E);
                         this.db = F
                    }
               };
               A.globalStorage = {
                    db: null,
                    isSupport: !! window.globalStorage,
                    get: function(G) {
                         var F = (F = this.db.getItem(G)) && F.value ? F.value : F;
                         return F
                    },
                    set: function(F, G) {
                         try {
                              this.db.setItem(F, G);
                              return true
                         } catch (H) {
                              return false
                         }
                    },
                    init: function() {
                         this.db = window.globalStorage[D]
                    }
               };
               A.localStorage = {
                    db: null,
                    isSupport: !! window.localStorage,
                    get: A.globalStorage.get,
                    set: A.globalStorage.set,
                    init: function(F) {
                         if (this.db = window.localStorage) {} else {
                              typeof F == "function" ? F(false) : ""
                         }
                    }
               };
               (function() {
                    for (var G = 0, F = B.length; G < F; G++) {
                         if (A[B[G]].isSupport) {
                              ($storage.instance = A[B[G]]).init();
                              return
                         }
                    }
               })();
          }
     };
})();
//ok
function $strToJson(str, filter, mark) {
     var arr = str.replace(filter, "").split(mark);
     var json = {};
     for (var i = 0, l = arr.length; i < l; i++) {
          var temp = arr[i].split("=");
          json[temp[0]] = temp[1];
     }
     return json;
};
//ok
function $strTrim(str, code) {
     var argus = code || "\\s";
     var temp = new RegExp("(^" + argus + "*)|(" + argus + "*$)", "g");
     return str.replace(temp, "");
};
//ok
function $throttle(method, context, delay) {
     clearTimeout(method.tId);
     method.tId = setTimeout(function() {
          method.call(context);
     }, delay);
};
//ok
function $time33(str) {
     for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
          hash += (hash << 5) + str.charAt(i).charCodeAt();
     };
     return hash & 0x7fffffff;
};

function $toggleClass(dom, value) {
     var type = typeof value,
          has = true,
          oclass = "";
     if ($isArray(value)) {
          dom.className = dom.className === value[0] ? value[1] : value[0];
          return dom;
     } else {
          if (type === "string") {
               var className, i = 0,
                    classNames = value.split(" ");
               while ((className = classNames[i++])) {
                    has = $hasClass(dom.className, className);
                    has ? $delClass(dom, className) : $addClass(dom, className);
               }
               return dom;
          } else if (type === "undefined") {
               if (dom.className) {
                    dom.className = "";
               }
               return dom;
          }
     }
};

function $xss(str, type) {
     if (!str) {
          return str === 0 ? "0" : "";
     }
     switch (type) {
          case "none":
               return str + "";
               break;
          case "html":
               return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                    return "&#" + r.charCodeAt(0) + ";"
               }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
               break;
          case "htmlEp":
               return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r) {
                    return "&#" + r.charCodeAt(0) + ";"
               });
               break;
          case "url":
               return escape(str).replace(/\+/g, "%2B");
               break;
          case "miniUrl":
               return str.replace(/%/g, "%25");
               break;
          case "script":
               return str.replace(/[\\"']/g, function(r) {
                    return "\\" + r;
               }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
               break;
          case "reg":
               return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a) {
                    return "\\" + a;
               });
               break;
          default:
               return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                    return "&#" + r.charCodeAt(0) + ";"
               }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
               break;
     }
};

function $yxPage(opt) {
     var option = {
          keyId: Math.random(),
          pageCount: 0,
          currentPage: 0,
          itemCount: 0,
          more: false,
          domList: [],
          type: "full",
          action: "url",
          url: "http://www.paipai.com/?pid={#pageId#}",
          func: function(pageId, opt) {
               return true;
          },
          onInit: function(pageId, opt) {
               return true;
          }
     };
     for (var i in opt) {
          option[i] = opt[i];
     }
     var standStyle = ['', '{#goTo#}<a href="#nolink" class="mod_page_lk" pageTag="go" pageId="{#pageId#}">{#pageId#}</a>{#goTo/#} {#current#}<span class="mod_page_on">{#pageId#}</span>{#current/#}{#hide#}<span class="mod_page_etc">...</span>{#hide/#}{#next#}<a href="#nolink" class="mod_page_lk" pageTag="go" pageId="{#pageId#}">下一页</a>{#next/#}{#_next#}<span class="mod_page_disable">下一页</span>{#_next/#}{#previou#}<a href="#nolink" pageTag="go" pageId="{#pageId#}" class="mod_page_lk">上一页</a>{#previou/#}{#_previou#}<span class="mod_page_disable">上一页</span>{#_previou/#}{#first#}{#first/#}{#_first#}{#_first/#}{#last#}{#last/#}{#_last#}{#_last/#}{#more#}<span class="mod_page_etc">...</span>{#more/#}{#_more#}{#_more/#}'];
     var templateList = {
          full: [standStyle[0], standStyle[1], '{#previousPage#}{#pageList#}{#morePage#}{#nextPage#}<span class="mod_page_turn"> 共' + parseInt(option.pageCount) + '页，到第<input type="text" name="inputItem" pageTag="input" value="{#currentPageId#}"  maxlength="{#maxlength#}" {#debugtag#} />页</span><button pageTag="jumper" value="go" class="mod_page_go">确定</button>'],
          simple: [standStyle[0], standStyle[1], '{#previousPage#}{#pageList#}{#morePage#}{#nextPage#}'],
          shortSimple: [standStyle[0], standStyle[1], '{#previousPage#}{#shortPageList#}{#morePage#}{#nextPage#}'],
          miniSimple: [standStyle[0], standStyle[1], '{#previousPage#}{#miniPageList#}{#nextPage#}'],
          noLastTmpl: [standStyle[0], standStyle[1], '{#previousPage#}{#noLastTmpl#}{#nextPage#}']
     };
     var template = templateList[option.type][0] + templateList[option.type][1] + templateList[option.type][2];
     var pageCount = parseInt(option.pageCount);
     var currentPage = parseInt(option.currentPage);
     var itemCount = parseInt(option.itemCount);
     currentPage = (currentPage > pageCount) ? pageCount : currentPage;
     var pt = {
          next: "",
          _next: "",
          previou: "",
          _previou: "",
          first: "",
          _first: "",
          last: "",
          _last: "",
          more: "",
          _more: "",
          goTo: "",
          current: "",
          hide: ""
     };
     for (var i in pt) {
          var r = (new RegExp("{#" + i + "#}(.*){#" + i + "/#}", "ig")).exec(template);
          pt[i] = (r) ? RegExp.$1 : "";
     }
     pt.nextPageHtml = (currentPage < pageCount) ? (pt.next.replace(/{#pageId#}/g, (currentPage + 1))) : (pt._next);
     pt.previousPageHtml = (currentPage > 1) ? (pt.previou.replace(/{#pageId#}/g, (currentPage - 1))) : (pt._previou);
     pt.firstPageHtml = (currentPage > 1) ? (pt.first.replace(/{#pageId#}/g, 1)) : (pt._first);
     pt.lastPageHtml = (currentPage < pageCount) ? (pt.last.replace(/{#pageId#}/g, pageCount)) : (pt._last);
     pt.morePageHtml = (option.more) ? (pt.more.replace(/{#pageId#}/g, (pageCount + 1))) : (pt._more);
     pt.pagelistHtml = "";
     pt.shortPageListHtml = "";
     pt.noLastTmplHtml = "";
     pt.miniPageListHtml = "<span>" + currentPage + "/" + pageCount + "</span>";
     if (pageCount <= 10) {
          for (var i = 1; i <= pageCount; i++) {
               pt.pagelistHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
     } else {
          var prePage = currentPage - 3;
          var frePage = currentPage + 3;
          prePage = (prePage <= 3) ? 1 : prePage;
          frePage = (frePage > pageCount - 3) ? pageCount : frePage;
          if (currentPage <= 6) {
               frePage = 8
          }
          pt.pagelistHtml += (currentPage > 6) ? (pt.goTo.replace(/{#pageId#}/g, 1) + pt.hide) : "";
          for (i = prePage; i <= frePage; i++) {
               pt.pagelistHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
          pt.pagelistHtml += (currentPage <= pageCount - 6) ? (pt.hide + pt.goTo.replace(/{#pageId#}/g, pageCount)) : "";
     }
     if (pageCount <= 8) {
          for (var i = 1; i <= pageCount; i++) {
               pt.shortPageListHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
     } else {
          var prePage = currentPage - 2;
          var frePage = currentPage + 2;
          prePage = (prePage <= 2) ? 1 : prePage;
          frePage = (frePage > pageCount - 2) ? pageCount : frePage;
          if (currentPage <= 4) {
               frePage = 6;
          }
          pt.shortPageListHtml += (currentPage > 4) ? (pt.goTo.replace(/{#pageId#}/g, 1) + pt.hide) : "";
          for (i = prePage; i <= frePage; i++) {
               pt.shortPageListHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
          pt.shortPageListHtml += (currentPage <= pageCount - 4) ? (pt.hide + pt.goTo.replace(/{#pageId#}/g, pageCount)) : "";
     }
     if (pageCount <= 6) {
          for (var i = 1; i <= pageCount; i++) {
               pt.noLastTmplHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
     } else {
          var prePage = currentPage - 2;
          var frePage = currentPage + 1;
          prePage = (prePage <= 3) ? 1 : prePage;
          frePage = (frePage > pageCount - 1) ? pageCount : frePage;
          pt.noLastTmplHtml += (currentPage > 5) ? (pt.goTo.replace(/{#pageId#}/g, 1) + pt.goTo.replace(/{#pageId#}/g, 2) + pt.hide) : "";
          for (i = prePage; i <= frePage; i++) {
               pt.noLastTmplHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
          pt.noLastTmplHtml += (currentPage <= pageCount - 2) ? pt.hide : "";
     }
     if (option.more) {
          pt.pagelistHtml = "";
          for (var i = 1; i <= pageCount; i++) {
               pt.pagelistHtml += (i == currentPage) ? (pt.current.replace(/{#pageId#}/g, i)) : (pt.goTo.replace(/{#pageId#}/g, i));
          }
          pt.shortPageListHtml = pt.pagelistHtml;
     }
     template = templateList[option.type][2].replace(/{#currentPageId#}/g, currentPage).replace(/{#pageCountNum#}/g, pageCount).replace(/{#itemCountNum#}/g, itemCount).replace(/{#firstPage#}/g, pt.firstPageHtml).replace(/{#previousPage#}/g, pt.previousPageHtml).replace(/{#nextPage#}/g, pt.nextPageHtml).replace(/{#lastPage#}/g, pt.lastPageHtml).replace(/{#pageList#}/g, pt.pagelistHtml).replace(/{#shortPageList#}/g, pt.shortPageListHtml).replace(/{#morePage#}/g, pt.morePageHtml).replace(/{#miniPageList#}/g, pt.miniPageListHtml).replace(/{#noLastTmpl#}/g, pt.noLastTmplHtml).replace(/{#maxlength#}/g, pageCount.toString().length);
     var frameList = [];
     var inputList = [];
     var buttomList = [];
     var linkList = [];
     frameList = frameList.concat(getItemFromArray(option.domList));

     function getItemFromArray(arr) {
          var array = [];
          for (var k = 0; k < arr.length; k++) {
               if (arr[k].length > 0) {
                    array = array.concat(getItemFromArray(arr[k]));
               } else {
                    array.push(arr[k]);
               }
          }
          return array;
     }
     var k = frameList.length;
     for (var i = 0; i < frameList.length; i++) {
          try {
               frameList[i].innerHTML = template.replace(/{#debugtag#}/g, i);
               var temp = frameList[i].getElementsByTagName("input");
               for (var j = 0; j < temp.length; j++) {
                    if (temp[j].getAttribute("pageTag") == "input") {
                         inputList.push(temp[j]);
                    }
               }
               var temp = frameList[i].getElementsByTagName("button");
               for (var j = 0; j < temp.length; j++) {
                    if (temp[j].getAttribute("pageTag") == "jumper") {
                         buttomList.push(temp[j]);
                    }
               }
               var temp = frameList[i].getElementsByTagName("a");
               for (var j = 0; j < temp.length; j++) {
                    if (temp[j].getAttribute("pageTag") == "go") {
                         linkList.push(temp[j]);
                    }
               }
          } catch (e) {}
     }
     for (var i = 0; i < inputList.length; i++) {
          inputList[i].onblur = function() {
               this.value = this.value.replace(/[^0-9]/g, '');
               if (this.value > pageCount || this.value < 1) {
                    this.value = "";
               }
               for (var j = 0; j < inputList.length; j++) {
                    inputList[j].value = this.value;
               }
          };
          inputList[i].onfocus = function() {
               this.select();
          };
          inputList[i].onkeydown = function(e) {
               var e = window.event || e;
               if (e.keyCode != 13) {
                    return true;
               } else {
                    this.onblur();
                    buttomList[0].onclick();
                    return false;
               }
          };
     }
     for (var i = 0; i < buttomList.length; i++) {
          buttomList[i].onclick = function() {
               var input = (this.parentElement || this.parentNode).getElementsByTagName("input")[0];
               var goPage = parseInt(input.value, 10);
               input.onblur();
               if (goPage < 1 || !goPage) {
                    input.focus();
                    return;
               } else {
                    goTo(goPage, option);
               }
          };
     }
     for (var i = 0; i < linkList.length; i++) {
          if (option.action == "url") {
               linkList[i].href = option.url.replace("{#pageId#}", linkList[i].getAttribute("pageId"));
          } else {
               linkList[i].onclick = function() {
                    goTo(this.getAttribute("pageId"), option);
               };
          }
     }
     goTo = function(pageId, opt) {
          if (opt.action == "url") {
               location.href = opt.url.replace("{#pageId#}", pageId);
          }
          if (opt.action == "func") {
               return opt.func(pageId, opt);
          }
          return false;
     };
     option.onInit();
};
$namespace("YX.Search");



YX.Search.global = {
     rootDomain: "yixun.com",
     sw: 1,
     modCommIdArr: [],
     pageId: "",
     asyncObjArr: [],
     p: "search.51buy.com"
};
YX.Search.params = {
     "domain": "searchex.yixun.com",
     "as": 0,
     "ytag": $getQuery("YTAG"),
     "charset": "utf-8",
     "c3id": "",
     "beginPrice": "",
     "endPrice": "",
     "orderStyle": "",
     "showType": "0",
     "pageSize": "32",
     "today": "",
     "pageNum": "1",
     "rowNum": "5",
     "attrInfo": "",
     "sce": "",
     "maxTagsNum": "3"
};
YX.Search.cookie = {
     "areaCode": "1",
     "regionId": ""
};
YX.Search.init = function() {
     $("#j_mod_city").addClass("hide");
     YX.Search.getParams();
     YX.Search.exMod();
     YX.Search.getCookies();
     YX.Search.uiMod();
     YX.Search.nullMod();
     YX.Search.sideMod();
};
YX.Search.exMod = function() {
     YX.Search.hotComm();
};
YX.Search.uiMod = function() {
     YX.Search.cate();
     YX.Search.attrMulti();
     YX.Search.getScreen();
     YX.Search.keyword();
     YX.Search.crumb();
     YX.Search.chong();
     YX.Search.price();
     YX.Search.today();
     YX.Search.address();
     YX.Search.prowords();
     YX.Search.pageBar();
     YX.Search.backToTop();
     YX.Search.product();
     YX.Search.cart();
     YX.Search.goodsCompare();
};
YX.Search.nullMod = function() {
     YX.Search.qqShop();
     YX.Search.searchError();
};
YX.Search.sideMod = function() {
     YX.Search.tuan();
     YX.Search.hotSell();
     YX.Search.viewed();
};
YX.Search.report = function() {
     YX.Search.KWreport();
};
YX.Search.getParams = function() {
     var global = YX.Search.global;
     var params = YX.Search.params;
     var yxForm = $id("yixun_form");
     if (yxForm) {
          var urlParam = {
               "keyword": yxForm.elements["keyWord"].value ? yxForm.elements["keyWord"].value : "",
               "c3id": yxForm.elements["curClassid"].value ? yxForm.elements["curClassid"].value : "",
               "sClassid1": yxForm.elements["sClassid1"].value ? yxForm.elements["sClassid1"].value : "",
               "sClassid2": yxForm.elements["sClassid2"].value ? yxForm.elements["sClassid2"].value : "",
               "sClassid3": yxForm.elements["sClassid3"].value ? yxForm.elements["sClassid3"].value : "",
               "sClassid4": yxForm.elements["sClassid4"].value ? yxForm.elements["sClassid4"].value : "",
               "beginPrice": yxForm.elements["beginPrice"].value ? yxForm.elements["beginPrice"].value : "",
               "endPrice": yxForm.elements["endPrice"].value ? yxForm.elements["endPrice"].value : "",
               "orderStyle": yxForm.elements["orderStyle"].value ? yxForm.elements["orderStyle"].value : "0",
               "showType": yxForm.elements["showType"].value ? yxForm.elements["showType"].value : "0",
               "pageSize": yxForm.elements["pageSize"].value ? yxForm.elements["pageSize"].value : "",
               "today": yxForm.elements["todayDeliverTag"].value ? yxForm.elements["todayDeliverTag"].value : "",
               "sf": (yxForm.elements["sf"] && yxForm.elements["sf"].value) ? yxForm.elements["sf"].value : "",
               "pf": (yxForm.elements["pf"] && yxForm.elements["pf"].value) ? yxForm.elements["pf"].value : "",
               "pageNum": yxForm.elements["curPageNo"].value ? yxForm.elements["curPageNo"].value : "",
               "attrInfo": yxForm.elements["attrInfo"].value ? yxForm.elements["attrInfo"].value : "",
               "totalNum": yxForm.elements["totalNum"].value ? yxForm.elements["totalNum"].value : "",
               "fuzzyWord": (yxForm.elements["errorRecovery"]) ? yxForm.elements["errorRecovery"].value : "",
               "clientIp": yxForm.elements["clientIp"] ? yxForm.elements["clientIp"].value : "",
               "spvid": yxForm.elements["spvid"] ? yxForm.elements["spvid"].value : "",
               "landingPage": yxForm.elements["landingPage"] ? yxForm.elements["landingPage"].value : "",
               "lp": yxForm.elements["landingPageId"] ? yxForm.elements["landingPageId"].value : "",
               "hotSaleBeginPrice": yxForm.elements["hotSaleBeginPrice"] ? yxForm.elements["hotSaleBeginPrice"].value : "",
               "hotSaleEndPrice": yxForm.elements["hotSaleEndPrice"] ? yxForm.elements["hotSaleEndPrice"].value : "",
               "originalKeyword": yxForm.elements["originalKeyword"] ? yxForm.elements["originalKeyword"].value : "",
               "hotClassID": yxForm.elements["hotClassID"] ? yxForm.elements["hotClassID"].value : "",
               "hotNavID": yxForm.elements["hotNavID"] ? yxForm.elements["hotNavID"].value : "",
               "as": (yxForm.elements["as"] && yxForm.elements["as"].value) ? yxForm.elements["as"].value : "",
               "sce": (yxForm.elements["sce"] && yxForm.elements["sce"].value) ? yxForm.elements["sce"].value : ""
          };
          $extend(params, urlParam);
     }
     document.domain = global.rootDomain;
     if (params.keyword) {
          global.pageId = "3.210";
          window.yPageId = "210";
          window.yPageLevel = "3";
     } else {
          if (params.c3id) {
               global.pageId = "3." + params.c3id + "2";
               window.yPageId = params.c3id + "2";
               window.yPageLevel = "3";
          }
     }
};
YX.Search.getCookies = function() {
     var cookie = YX.Search.cookie;
     if ($getCookie("wsid") && $getCookie("wsid").match(/\d/)) {
          cookie.areaCode = $getCookie("wsid");
     }
     if ($getCookie("prid")) {
          cookie.regionId = $getCookie("prid").split("_")[0];
     }
};
YX.Search.getScreen = function() {
     var sw = window.screen.width;
     var params = YX.Search.params;
     if (sw < 1280) {
          document.body.className = "ic_mini";
          YX.Search.global.sw = 0;
     }
     var pageWidth = $("#container").children("div").outerWidth();
     if (pageWidth <= 1190) {
          params.rowNum = "4";
     }
     if (pageWidth <= 990) {
          params.maxTagsNum = "1";
     }
};
YX.Search.keyword = function() {
     var params = YX.Search.params;
     var keyword = params.originalKeyword ? params.originalKeyword : params.keyword;
     var dom = $id("q_show");
     var dom2 = $id("q_show2");
     var domForm2 = $id("searchform");
     if (dom) {
          if (keyword) {
               if (dom.value != keyword) {
                    dom.value = keyword;
               }
          }
     }
     if (dom2) {
          if ($id("areacode2")) {
               $id("areacode2").value = YX.Search.cookie.areaCode;
          }
          if (dom2.value == "") {
               dom2.value = keyword;
          }
     }
     $addEvent(domForm2, "submit", function(e) {
          if (dom2.value == "") {
               $stopEvent(e);
               return false;
          } else {
               if ($('#q_show2').parents("form").find('input[name="YTAG"]').length === 0) {
                    var ytag = $attr("type", "submit", domForm2)[0].getAttribute("ytag");
                    var YTAG = (window.yPageLevel || 0) + '.' + (window.yPageId || 0) + ytag;
                    $('#q_show2').parents("form").append($('<input type="hidden" name="YTAG" value="' + YTAG + '" />'));
               }
               YXSearchlogStat.clickLog({
                    rg: "2113",
                    needCookie: "1",
                    refWord: dom2.value
               });
          }
     });
};
YX.Search.crumb = function() {
     var dom = $("#crumbBox");
     var modId = "2017";
     var initTipWord = "在当前条件下搜索";
     if (dom.length == 0) {
          return;
     }
     var params = YX.Search.params;
     var showKeyword = params.originalKeyword ? params.originalKeyword : params.keyword;
     if ($("#crumbKey").val() == "") {
          $("#crumbKey").val(initTipWord);
     }
     $("#crumbKey").click(function(e) {
          var curKey = $("#crumbKey").val();
          if (curKey == initTipWord) {
               params.keyword = curKey;
               $("#crumbKey").val("");
          }
     });
     $("body").click(function(e) {
          if (e.target != $id("crumbKey") && e.target != $id("crumbSearchKey") && e.target != $id("crumbClearKey")) {
               if (showKeyword == "") {
                    $("#crumbKey").val(initTipWord);
               } else {
                    $("#crumbKey").val(showKeyword);
               }
          }
     });
     $("#crumbKey").keypress(function(e) {
          if (e.keyCode == "13") {
               var curKey = $("#crumbKey").val();
               if ((curKey && curKey != initTipWord) || (curKey == "" && (params.sClassid1 || params.sClassid2 || params.sClassid3 || params.sClassid4))) {
                    params.keyword = curKey;
                    params.pageNum = "1";
                    YX.Search.query();
                    YXSearchlogStat.clickLog({
                         rg: modId + "_1002_1001",
                         needCookie: "1",
                         refWord: curKey
                    });
               }
          }
     });
     $("#crumbSearchKey").click(function() {
          var curKey = $("#crumbKey").val();
          if ((curKey && curKey != initTipWord) || (curKey == "" && (params.sClassid1 || params.sClassid2 || params.sClassid3 || params.sClassid4))) {
               params.keyword = curKey;
               params.pageNum = "1";
               YX.Search.query();
               YXSearchlogStat.clickLog({
                    rg: modId + "_1002_1001",
                    needCookie: "1",
                    refWord: curKey
               });
          }
     });
     $("#crumbSearchKey").mouseover(function() {
          if ($(this).parent(".crumb_search_on").length == 0) {
               $(this).parents(".crumb_search").addClass("crumb_search_1");
          } else {
               $(this).parents(".crumb_search").addClass("crumb_search_on_1");
          }
     });
     $("#crumbSearchKey").mouseout(function() {
          $(this).parents(".crumb_search").removeClass("crumb_search_1");
          $(this).parents(".crumb_search").removeClass("crumb_search_on_1");
     });
     $("#crumbClearKey").mouseover(function() {
          $(this).parents(".crumb_search").addClass("crumb_search_on_hover");
     });
     $("#crumbClearKey").mouseout(function() {
          $(this).parents(".crumb_search").removeClass("crumb_search_on_hover");
     });
     $("#crumbClearKey").click(function() {
          var curKey = $("#crumbKey").val();
          if ((curKey && curKey != initTipWord) || (curKey == "" && params.keyword != "")) {
               $("#crumbKey").val("");
               params.keyword = "";
               params.pageNum = "1";
               if (params.sClassid1 || params.sClassid2 || params.sClassid3 || params.sClassid4 || params.attrInfo) {
                    YX.Search.query();
                    YXSearchlogStat.clickLog({
                         rg: modId + "_1002_1002",
                         needCookie: "1",
                         refWord: curKey
                    });
               }
          }
     });
     $("#crumbClearAttr").mouseover(function() {
          dom.find("a.crumb_selected").addClass("crumb_selected_hover");
          $("#attrList").find(".filter_dd_on").addClass("filter_dd_on_delete");
     });
     $("#crumbClearAttr").mouseout(function() {
          dom.find("a.crumb_selected").removeClass("crumb_selected_hover");
          $("#attrList").find(".filter_dd_on").removeClass("filter_dd_on_delete");
     });
     dom.find(".crumb_selected").mouseover(function() {
          var curAttrkey = $(this).attr("attrkey");
          $("#attrList").find("[attrkey=" + curAttrkey + "]").find(".filter_dd_on").addClass("filter_dd_on_delete");
     });
     dom.find(".crumb_selected").mouseout(function() {
          var curAttrkey = $(this).attr("attrkey");
          $("#attrList").find("[attrkey=" + curAttrkey + "]").find(".filter_dd_on").removeClass("filter_dd_on_delete");
     });

     function checkCrumbWidth() {
          var dom = $("#crumbBox");
          if (dom.find(".crumb_selected").length == 0) {
               return;
          }
          var crumbInner = dom.find(".crumb_inner");
          var childrenArr = crumbInner.children();
          var maxWidth = dom.find(".grid_c1").outerWidth() - 250;
          var totalWidth = 0;
          for (var i = 0, len = childrenArr.length; i < len; i++) {
               var curChildWidth = childrenArr.eq(i).outerWidth();
               totalWidth += curChildWidth;
          }
          var diffWidth = parseInt(maxWidth - totalWidth);
          if (totalWidth > maxWidth) {
               dom.addClass("crumb_slide");
               crumbInner.css("left", diffWidth + "px");
               dom.find("#crumbShiftRight").addClass("hide");
               dom.find("#crumbShiftLeft").removeClass("hide");
          } else {
               dom.removeClass("crumb_slide");
               crumbInner.css("left", "0");
               dom.find("#crumbShiftRight").addClass("hide");
               dom.find("#crumbShiftLeft").addClass("hide");
          }
          dom.find("#crumbShiftLeft").unbind("click").click(function() {
               var tmpLeft = crumbInner.position().left;
               if (tmpLeft < 0) {
                    crumbInner.animate({
                         "left": "0"
                    });
                    $(this).addClass("hide");
                    dom.find("#crumbShiftRight").removeClass("hide");
               }
          });
          dom.find("#crumbShiftRight").unbind("click").click(function() {
               var tmpLeft = crumbInner.position().left;
               if (tmpLeft == 0) {
                    crumbInner.animate({
                         "left": diffWidth + "px"
                    });
                    $(this).addClass("hide");
                    dom.find("#crumbShiftLeft").removeClass("hide");
               }
          });
     }
     checkCrumbWidth();
     $(window).resize(checkCrumbWidth);
};
YX.Search.chong = function() {
     var dom = $id("chongFrame");
     if (!dom) {
          return;
     }
     $(dom).find(".chong_tab_item").mouseover(function() {
          $(this).addClass("chong_tab_on");
          var curIndex = $(this).attr("chongindex");
          $(dom).find(".chong_tab_item").each(function() {
               var curIndexIn = $(this).attr("chongindex");
               if (curIndexIn != curIndex) {
                    $(this).removeClass("chong_tab_on");
               }
          });
          $(dom).find("#chong_" + curIndex + "_frame").removeClass("hide");
          $(dom).find(".chong_item").each(function() {
               var curId = $(this).attr("id");
               if (curId != "chong_" + curIndex + "_frame") {
                    $(dom).find("#" + curId).addClass("hide");
               }
          });
     });
};
YX.Search.price = function() {
     var params = YX.Search.params;
     var beginInput = $id("sBeginPrice"),
          endInput = $id("sEndPrice"),
          clearBtn = $id("sClearPrice"),
          confirmBtn = $id("sConfirmPrice");
     var priceHover = $id("sPriceHover"),
          priceFloat = $id("sPriceFloat"),
          priceMore = $id("sPriceMore"),
          priceRange = $id("sPriceRange");
     var isFocus = false;
     if (!beginInput) {
          return;
     }

     function priceFocus(e) {
          var e = $getTarget(e);
          if (e == beginInput) {
               if (beginInput.value == "最低价") {
                    beginInput.value = "";
               }
          } else if (e == endInput) {
               if (endInput.value == "最高价") {
                    endInput.value = "";
               }
          }
          isFocus = true;
     }

     function showPriceFloat() {
          if (priceFloat) {
               priceFloat.className = "sort_price sort_price_2";
          }
     }

     function priceBlind() {
          if (params.beginPrice != "" || params.endPrice != "") {
               if (priceFloat) {
                    priceFloat.className = "sort_price sort_price_3";
               }
          } else {
               if (priceFloat) {
                    $delClass(priceFloat, 'sort_price_2');
                    if (priceRange) {
                         if ($strTrim(priceRange.innerHTML) == "") {
                              priceMore.style.display = "none";
                         }
                    } else {
                         $addClass(priceFloat, 'sort_price_4');
                    }
               }
          }
          isFocus = false;
     }

     function pricePress(e) {
          if (e.keyCode == 13) {
               $fireEvent("sConfirmPrice");
          }
     }

     function regNumber(e) {
          var o = $getTarget(e);
          o.value = o.value.replace(/[^\d]/g, '');
          if (o.value.length > 6) {
               o.value = o.value.substring(0, 6);
          }
     }
     if (beginInput) {
          beginInput.value = params.beginPrice ? params.beginPrice : "最低价";
          $addEvent(beginInput, "click", function(e) {
               priceFocus(e);
               $stopEvent(e);
               showPriceFloat();
          });
          $addEvent(beginInput, "keypress", function(e) {
               pricePress(e)
          });
          $addEvent(beginInput, "keyup", function(e) {
               if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 8) {
                    regNumber(e);
               }
          });
     }
     if (endInput) {
          endInput.value = params.endPrice ? params.endPrice : "最高价";
          $addEvent(endInput, "click", function(e) {
               priceFocus(e);
               $stopEvent(e);
               showPriceFloat();
          });
          $addEvent(endInput, "keypress", function(e) {
               pricePress(e)
          });
          $addEvent(endInput, "keyup", function(e) {
               if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 8) {
                    regNumber(e);
               }
          });
     }
     if (priceMore) {
          if (priceRange) {
               if ($strTrim(priceRange.innerHTML) == "") {
                    priceMore.style.display = "none";
               } else {
                    $hoverDelay(priceHover, {
                         hoverEvent: showPriceFloat
                    });
               }
          } else {
               priceMore.style.display = "none";
          }
     }
     if (clearBtn) {
          if (params.beginPrice != "" || params.endPrice != "") {
               if (priceFloat) {
                    priceFloat.className = "sort_price sort_price_3";
               }
          }
          $addEvent(clearBtn, "click", function(e) {
               params.beginPrice = "";
               params.endPrice = "";
               params.pageNum = "";
               logStat.chkLog("1{|}1025{|}1{|}" + location.href);
               YX.Search.query("list");
               $stopEvent(e);
          });
     }
     if (confirmBtn) {
          $addEvent(confirmBtn, "click", function(e) {
               if (beginInput.value == "最低价") {
                    beginInput.value = "";
               }
               if (endInput.value == "最高价") {
                    endInput.value = "";
               }
               var bp = parseInt(beginInput.value || 0, 10),
                    ep = parseInt(endInput.value || 0, 10);
               if (bp > ep && ep > 0) {
                    bp = ep
                    ep = beginInput.value;
               }
               beginInput.value = bp <= 0 ? "" : bp;
               endInput.value = ep <= 0 ? "" : ep;
               params.beginPrice = beginInput.value;
               params.endPrice = endInput.value;
               params.pageNum = "";
               logStat.chkLog("1{|}1025{|}2{|}" + location.href);
               YX.Search.query("list");
               $stopEvent(e);
          });
     }
     $("#sPriceFloat").mouseleave(function() {
          if (isFocus == false) {
               priceBlind();
          }
     });
     $addEvent(document.body, "click", function(e) {
          var e = $getTarget(e);
          if (e != beginInput && e != endInput && e != clearBtn) {
               priceBlind();
               beginInput.value = params.beginPrice ? params.beginPrice : "最低价";
               beginInput.blur();
               endInput.value = params.endPrice ? params.endPrice : "最高价";
               endInput.blur();
          }
     });
};
YX.Search.today = function() {
     var params = YX.Search.params;
     var dom1 = $id("showTodayChk");
     var dom2 = $id("stockFilterChk");
     var dom3 = $id("zyFilterChk");
     $("#filterTypes .sort_type_extra").toggle(function() {
          $(this).parents(".sort_type").addClass("sort_type_on");
          $(this).find(".sort_type_extra_lk span").text("收起");
     }, function() {
          $(this).parents(".sort_type").removeClass("sort_type_on");
          $(this).find(".sort_type_extra_lk span").text("更多");
     });
     if (dom1) {
          if (params.today == 1) {
               dom1.className = "sort_type_radio sort_type_radio_on";
          }
          dom1.onclick = function() {
               if (!$hasClass(dom1.className, "sort_type_radio_on")) {
                    dom1.className = "sort_type_radio sort_type_radio_on";
                    params.today = 1;
                    params.pageNum = "";
               } else {
                    dom1.className = "sort_type_radio";
                    params.today = 0;
                    params.pageNum = "";
               }
               YX.Search.query("list");
          };
     }
     if (dom2) {
          if (params.sf == 1) {
               dom2.className = "sort_type_radio sort_type_radio_on";
          }
          dom2.onclick = function() {
               if (!$hasClass(dom2.className, "sort_type_radio_on")) {
                    dom2.className = "sort_type_radio sort_type_radio_on";
                    params.sf = 1;
                    params.pageNum = "";
               } else {
                    dom2.className = "sort_type_radio";
                    params.sf = 0;
                    params.pageNum = "";
               }
               YX.Search.query("list");
          };
     }
     if (dom3) {
          if (params.pf == 1) {
               dom3.className = "sort_type_radio sort_type_radio_on";
          }
          dom3.onclick = function() {
               if (!$hasClass(dom3.className, "sort_type_radio_on")) {
                    dom3.className = "sort_type_radio sort_type_radio_on";
                    params.pf = 1;
                    params.pageNum = "";
               } else {
                    dom3.className = "sort_type_radio";
                    params.pf = "";
                    params.pageNum = "";
               }
               YX.Search.query("list");
          };
     }
};
YX.Search.cate = function() {
     var dom = $id("cateList");
     var params = YX.Search.params;
     var modId = params.keyword ? "2114" : "2014";
     if (dom) {
          $addEvent(dom, "click", function(e) {
               var e = $getTarget(e);
               var curCate;
               if (e.tagName == "A" && e.getAttribute("href") && e.parentNode.getAttribute("rg") != "" && e.getAttribute("href").indexOf("#") != 0 && !e.getAttribute("href").match("javascript")) {
                    clickLinkReport(e);
                    return;
               }
               if (e.tagName == "SPAN" && e.parentNode.tagName == "A" && e.parentNode.getAttribute("rg") != "") {
                    clickLinkReport(e.parentNode);
                    return;
               }
               switch (e.tagName) {
                    case "DIV":
                         if ($hasClass(e.className, "cate_tit") && !$hasClass(e.parentNode.className, "searchlist_item_blank")) {
                              curCate = e.parentNode;
                         } else if ($hasClass(e.className, "cate_ft")) {
                              curCate = e;
                              moreCateToggle(curCate);
                              return;
                         } else {
                              return;
                         }
                         break;
                    case "SPAN":
                         if ($strTrim(e.className) == "cate_tit_ico" && e.innerHTML === "" && !$hasClass(e.parentNode.parentNode.className, "searchlist_item_blank")) {
                              curCate = e.parentNode.parentNode;
                         } else if (e.className == "cate_ft_ico") {
                              curCate = e.parentNode.parentNode;
                              moreCateToggle(curCate);
                              return;
                         }
                         break;
                    case "A":
                         if ($strTrim(e.className) == "cate_ft_a") {
                              curCate = e.parentNode;
                              moreCateToggle(curCate);
                              return;
                         }
                         break;
               }
               if (curCate && $hasClass(curCate.className, "cate_item")) {
                    clickOpenReport(curCate);
                    var isOpen = curCate.getAttribute("initopen") ? curCate.getAttribute("initopen") : "0";
                    if (isOpen == "1") {
                         $toggleClass(curCate, ["cate_item cate_item_on", "cate_item cate_item_select"]);
                    } else {
                         $toggleClass(curCate, ["cate_item cate_item_open", "cate_item"]);
                    }
               }
          });

          function moreCateToggle(curCate) {
               var tmpA = curCate ? curCate.getElementsByTagName("a")[0] : "";
               if (!tmpA) {
                    return;
               }
               if ($strTrim(curCate.className) == "cate_ft") {
                    var divArr = $getElementsByClass("cate_item", dom);
                    if (divArr.length > 10) {
                         for (var i = 10, len = divArr.length; i < len; i++) {
                              $delClass(divArr[i], "hide");
                         }
                    }
                    curCate.className = "cate_ft cate_ft_all";
                    tmpA.innerHTML = '收起<span class="cate_ft_ico">&nbsp;</span>';
                    if (!tmpA.getAttribute("hasClick")) {
                         YXSearchlogStat.clickLog({
                              rg: "2114_1002",
                              ctype: "nav1expo_all"
                         });
                         tmpA.setAttribute("hasClick", "1");
                    }
               } else if ($strTrim(curCate.className) == "cate_ft cate_ft_all") {
                    var divArr = $getElementsByClass("cate_item", dom);
                    if (divArr.length > 10) {
                         for (var i = 10, len = divArr.length; i < len; i++) {
                              $addClass(divArr[i], "hide");
                         }
                    }
                    curCate.className = "cate_ft";
                    tmpA.innerHTML = '显示全部分类<span class="cate_ft_ico">&nbsp;</span>';
               }
          }
          var nav1Id = $(dom).find("[initopen='1']").attr("navkey") ? $(dom).find("[initopen='1']").attr("navkey") : "";
          var cType;
          if (params.keyword) {
               cType = "nav1expo_10,nav2expo_all";
          } else {
               cType = "nav1expo_all,nav2expo_all";
          }
          var asyncObj = {
               regionID1: modId,
               navExpose: nav1Id,
               ctype: cType
          }
          YX.Search.global.asyncObjArr.push(asyncObj);

          function clickOpenReport(curCate) {
               if (curCate && curCate.getAttribute("rg")) {
                    if (!curCate.getAttribute("hasClick")) {
                         var rg = curCate.getAttribute("rg");
                         var rgArr = rg.split("_");
                         if (rgArr[2] == "1002") {
                              var navID = curCate.getAttribute("navkey") ? curCate.getAttribute("navkey") : "";
                              var navH = $attr("rg", rgArr[0] + "_" + rgArr[1] + "_" + "1001", dom)[0];
                              var navName = navH.getAttribute("title");
                              if (rgArr[0] == "2114") {
                                   var isHidden = (rgArr[1] <= 10) ? 0 : 1;
                              } else {
                                   var isHidden = "";
                              }
                              var hitNum = curCate.getAttribute("navnum") ? curCate.getAttribute("navnum") : "";
                              var defNavRowNum = rgArr[0] == "2014" ? 2 : 1;
                              var navStr = navID + "_" + navName + "_" + isHidden + "_" + hitNum + "_" + defNavRowNum;
                              var navValueDiv = $attr("class", "cate_cnt", curCate)[0];
                              var navValueArr = navValueDiv.getElementsByTagName("a");
                              var tmpArr = [];
                              for (var i = 0, len = navValueArr.length; i < len; i++) {
                                   var curA = navValueArr[i];
                                   var subNum = curA.getAttribute("navnum") ? curA.getAttribute("navnum") : "";
                                   tmpArr.push(curA.getAttribute("navvalue") + "_" + curA.getAttribute("title") + "__" + subNum);
                              }
                              YXSearchlogStat.clickLog({
                                   rg: rg,
                                   navClick: navStr + "," + tmpArr.join(","),
                                   ctype: "nav2expo_all"
                              });
                              curCate.setAttribute("hasClick", "1");
                         }
                    }
               }
          }

          function clickLinkReport(e) {
               if (e) {
                    if (e.getAttribute("rg")) {
                         var rg = e.getAttribute("rg");
                         var rgArr = rg.split("_");
                         if (rgArr[2] == "1001") {
                              var navID = e.parentNode.parentNode.getAttribute("navkey");
                              var navName = e.getAttribute("title");
                              if (rgArr[0] == "2114") {
                                   var isHidden = (rgArr[1] <= 10) ? 0 : 1;
                              } else {
                                   var isHidden = "";
                              }
                              var hitNum = e.getAttribute("navnum") ? e.getAttribute("navnum") : "";
                              var defRowNavNum = rgArr[0] == "2014" ? 2 : 1;
                              YXSearchlogStat.clickLog({
                                   needCookie: "1",
                                   ytag: e.getAttribute("ytag"),
                                   rg: rg,
                                   navClick: navID + "_" + navName + "_" + isHidden + "_" + hitNum + "_",
                                   ctype: "nav1click"
                              });
                         } else {
                              var navA = $attr("rg", rgArr[0] + "_" + rgArr[1] + "_" + "1002", dom)[0];
                              var navID = $attr("rg", rgArr[0] + "_" + rgArr[1] + "_" + "1002", dom)[0].getAttribute("navkey");
                              var navName = $attr("rg", rgArr[0] + "_" + rgArr[1] + "_" + "1001", dom)[0].getAttribute("title");
                              if (rgArr[0] == "2114") {
                                   var isHidden = (rgArr[1] <= 10) ? 0 : 1;
                              } else {
                                   var isHidden = "";
                              }
                              var hitNum = navA.getAttribute("navnum") ? navA.getAttribute("navnum") : "";
                              var defNavRowNum = rgArr[0] == "2014" ? 2 : 1;
                              var subNavID = e.getAttribute("navvalue");
                              var subNavName = e.getAttribute("title");
                              var shitNum = e.getAttribute("navnum") ? e.getAttribute("navnum") : "";
                              YXSearchlogStat.clickLog({
                                   needCookie: "1",
                                   ytag: e.getAttribute("ytag"),
                                   rg: rg,
                                   navClick: navID + "_" + navName + "_" + isHidden + "_" + hitNum + "_" + defNavRowNum + "," + subNavID + "_" + subNavName + "__" + shitNum,
                                   ctype: "nav2click"
                              });
                         }
                    }
               }
          }
     }
};
YX.Search.attrMulti = function() {
     var modId = "2015";
     var dom = $id("attrList");
     if (!dom) {
          return;
     }
     var attrInfo = YX.Search.params.attrInfo;
     var height1 = 48;
     var height2 = 90;
     var heightBrand = 90;
     var heightPic = 78;

     function chkSelected(curLi) {
          var ddArr = curLi.getElementsByTagName("dd");
          var isSelect = false;
          for (var j = 0, len2 = ddArr.length; j < len2; j++) {
               if ($hasClass(ddArr[j].className, 'filter_dd_on')) {
                    isSelect = true;
                    break;
               }
          }
          return isSelect;
     }

     function markAllShowNum(curLi, ddArr) {
          if (!curLi.getAttribute("shownum")) {
               var attrNum = curLi.getAttribute("attrnum");
               curLi.setAttribute("shownum", attrNum);
          }
          for (var i = 0, len = ddArr.length; i < len; i++) {
               ddArr[i].setAttribute("isshow", "1");
          }
     }

     function initMoreBtn(curLi, brand) {
          var sigleClassName = "filter_item_single";
          var brandClassName = "filter_item_multiple";
          var minHeight = height1;
          var isSelected = chkSelected(curLi);
          var foldedClassName = sigleClassName;
          var rowNum = 1;
          if (brand && brand == "brand") {
               minHeight = heightBrand;
               rowNum = 3;
               if (!isSelected) {
                    foldedClassName = brandClassName;
               }
          } else if ($hasClass(curLi.className, "filter_item_pic")) {
               return;
          } else if ($hasClass(curLi.className, "filter_item_visual")) {
               return;
          } else {
               foldedClassName = sigleClassName;
          }
          var btnDivArr = $attr("class", "filter_act", curLi);
          var btnDiv = btnDivArr[0];
          var moreArr = $attr("class", "filter_showmore", btnDiv);
          var lessArr = $attr("class", "filter_showless", btnDiv);
          var ddArr = curLi.getElementsByTagName("dd");
          if (!isSelected) {
               if (btnDiv) {
                    var multiBtn = $attr("class", "filter_choosemore", btnDiv)[0];
                    if (curLi.offsetHeight >= minHeight) {
                         if (moreArr.length == 0) {
                              var moreBtn = document.createElement("a");
                              moreBtn.setAttribute("href", "javascript:;");
                              moreBtn.innerHTML = '<i></i><span>更多</span>';
                              moreBtn.className = "filter_showmore";
                              btnDiv.insertBefore(moreBtn, multiBtn);
                         }
                         var tmpShowNum = 1;
                         var tmpRowNum = 1;
                         for (var i = 1, len = ddArr.length; i < len; i++) {
                              if (ddArr[i].offsetTop - ddArr[i - 1].offsetTop > 0) {
                                   tmpRowNum = tmpRowNum + 1;
                              }
                              ddArr[0].setAttribute("isshow", "1");
                              if (tmpRowNum > rowNum) {
                                   ddArr[i].setAttribute("isshow", "0");
                              } else {
                                   ddArr[i].setAttribute("isshow", "1");
                                   tmpShowNum++;
                              }
                         }
                         curLi.setAttribute("shownum", tmpShowNum);
                    } else {
                         markAllShowNum(curLi, ddArr);
                    }
                    if (!$hasClass(curLi.className, "hide")) {
                         curLi.className += " " + foldedClassName;
                    }
               } else {
                    markAllShowNum(curLi, ddArr);
               }
          } else {
               if (btnDiv) {
                    var multiBtn = $attr("class", "filter_choosemore", btnDiv)[0];
                    if (curLi.offsetHeight >= minHeight) {
                         if (lessArr.length == 0) {
                              lessBtn = document.createElement("a");
                              lessBtn.setAttribute("href", "javascript:;");
                              lessBtn.innerHTML = '<i></i><span>收起</span>';
                              lessBtn.className = "filter_showless";
                              btnDiv.insertBefore(lessBtn, multiBtn);
                         }
                    }
                    if (curLi.getAttribute("attrtype") == "brand") {
                         if ($(curLi).find(".filter_atoz").length > 0) {
                              $(curLi).attr("initatoz", "1");
                              $(curLi).find(".filter_atoz").removeClass("hide");
                              curLi.className = "filter_item filter_item_brand filter_item_multiple filter_item_atoz";
                         } else {
                              curLi.className = "filter_item filter_item_brand filter_item_multiple";
                         }
                    } else {
                         curLi.className = fitLiClass(curLi, height1, height2);
                    }
               }
               if (brand == "brand") {
                    var tmpShowNum = 1;
                    var tmpRowNum = 1;
                    for (var i = 1, len = ddArr.length; i < len; i++) {
                         if (ddArr[i].offsetTop - ddArr[i - 1].offsetTop > 0) {
                              tmpRowNum = tmpRowNum + 1;
                         }
                         ddArr[0].setAttribute("isshow", "1");
                         if (tmpRowNum > rowNum) {
                              ddArr[i].setAttribute("isshow", "0");
                         } else {
                              ddArr[i].setAttribute("isshow", "1");
                              tmpShowNum++;
                         }
                    }
                    curLi.setAttribute("shownum", tmpShowNum);
                    if ($(curLi).find("dl").find("[isshow=0]").length > 0) {
                         var firstDdOn = $(curLi).find("dl").find(".filter_dd_on")[0];
                         var scrollTop = firstDdOn.offsetTop;
                         $(curLi).find("dl").scrollTop(scrollTop);
                         curLi.className = "filter_item filter_item_brand filter_item_showmore filter_item_atoz";
                    }
               } else {
                    markAllShowNum(curLi, ddArr);
               }
          }
     }

     function fitLiClass(curLi, h1, h2) {
          var defaultClass = "filter_item ";
          var brandClass = "filter_item_brand ";
          var class0 = "filter_item_single ";
          var class1 = "filter_item_multiple ";
          var class2 = "filter_item_showmore ";
          var resultClass = "";
          if ($hasClass(curLi.className, "filter_item_pic")) {
               return curLi.className;
          } else if ($(curLi).attr("attrtype") == "brand") {
               curLi.className = defaultClass + brandClass;
          } else {
               curLi.className = defaultClass;
          }
          var liHeight = curLi.offsetHeight;
          if (liHeight <= h1) {
               resultClass = defaultClass + class0;
          } else if (liHeight > h1 && liHeight <= h2) {
               resultClass = defaultClass + class1;
          } else if (liHeight > h2) {
               resultClass = defaultClass + class2;
          }
          if ($(curLi).attr("attrtype") == "brand") {
               resultClass += brandClass;
          }
          return resultClass;
     }

     function MultiEdit(curLi) {
          var ddArr = curLi.getElementsByTagName("dd");
          var dt = curLi.getElementsByTagName("dt")[0];
          var dtA = curLi.getElementsByTagName("a")[0];
          if (dt) {
               dt.style.display = "none";
          } else if (dtA) {
               dtA.style.display = "none";
          }
          var multiLiArr = $getElementsByClass("filter_item_choosemore");
          var multiMoreLiArr = $getElementsByClass("filter_attr_choosemore");
          var multiArr = multiLiArr.concat(multiMoreLiArr);
          for (var i = 0, len = multiArr.length; i < len; i++) {
               var curMultiLi = multiArr[i];
               reset(curMultiLi);
          }
          var selectedNum = 0;
          if ($hasClass(curLi.className, "filter_item")) {
               var curOnDArr = $getElementsByClass("filter_dd_on", curLi);
               if (curOnDArr.length > 0) {
                    selectedNum = curOnDArr.length;
                    for (var j = 0, len1 = curOnDArr.length; j < len1; j++) {
                         var tmpA = curOnDArr[j];
                         tmpA.setAttribute("href", "###");
                    }
               }
          } else if ($hasClass(curLi.className, "filter_attr_bd")) {
               var aArr = $getElementsByClass("filter_attr_item", curLi);
               if (aArr.length > 0) {
                    for (var k = 1, len2 = aArr.length; k < len2; k++) {
                         var curTmpA = aArr[k];
                         if ($getInnerText(curTmpA) != "不限" && $hasClass(curTmpA.className, "filter_attr_item_on")) {
                              curTmpA.setAttribute("href", "###");
                              selectedNum++;
                         }
                    }
               }
          }
          curLi.setAttribute("selectednum", selectedNum);
          toggleBtns(true, curLi);
     }

     function toggleBtns(isEdit, curLi) {
          var ddArr = curLi.getElementsByTagName("dd");
          var btnDiv = $attr("class", "filter_act", curLi)[0];
          if ($attr("class", "filter_attr_act", curLi)[0]) {
               btnDiv = $attr("class", "filter_attr_act", curLi)[0];
          }
          var btnArr = btnDiv.getElementsByTagName("a");
          if (isEdit === true) {
               var multiBtnArr = $attr("class", "filter_choosemore", curLi);
               if (multiBtnArr.length > 0) {
                    multiBtnArr[0].style.display = "none";
               }
               for (var i = 0, len0 = btnArr.length; i < len0; i++) {
                    if ($hasClass(btnArr[i].className, "filter_showmore") || $hasClass(btnArr[i].className, "filter_showless")) {
                         var moreBtn = btnArr[i];
                         moreBtn.className += " hide";
                    } else if ($hasClass(btnArr[i].className, "filter_sure")) {
                         var selectedNum = curLi.getAttribute("selectednum");
                         var sureBtn = btnArr[i];
                         if (parseInt(selectedNum) > 0) {
                              sureBtn.className = sureBtn.className.replace(/ hide/g, "");
                         } else {
                              sureBtn.className = "filter_sure_disabled";
                         }
                    } else if ($hasClass(btnArr[i].className, "filter_cancel")) {
                         var cancelBtn = btnArr[i];
                         cancelBtn.className = cancelBtn.className.replace(/ hide/g, "");
                    }
               }
          } else if (isEdit === false) {
               var multiBtnArr = $attr("class", "filter_choosemore", curLi);
               if (multiBtnArr.length > 0) {
                    multiBtnArr[0].style.display = "block";
               }
               for (var i = 0, len0 = btnArr.length; i < len0; i++) {
                    if ($hasClass(btnArr[i].className, "filter_showmore") || $hasClass(btnArr[i].className, "filter_showless")) {
                         var moreBtn = btnArr[i];
                         var selectedNum = curLi.getAttribute("selectednum");
                         moreBtn.className = moreBtn.className.replace(/ hide/g, "");
                         if (parseInt(selectedNum) > 0 && curLi.getAttribute("attrtype") == "brand") {
                              moreBtn.innerHTML = '<i></i><span>收起</span>';
                              moreBtn.className = "filter_showless";
                         } else {
                              moreBtn.innerHTML = '<i></i><span>更多</span>';
                              moreBtn.className = "filter_showmore";
                         }
                    } else if ($hasClass(btnArr[i].className, "filter_sure") || $hasClass(btnArr[i].className, "filter_sure_disabled")) {
                         var sureBtn = btnArr[i];
                         sureBtn.className = "filter_sure hide";
                    } else if ($hasClass(btnArr[i].className, "filter_cancel")) {
                         var cancelBtn = btnArr[i];
                         cancelBtn.className += " hide";
                    }
               }
          }
     }

     function submit(curLi) {
          var tmpCurLi = curLi;
          var titleName = "属性项名称";
          if ($hasClass(curLi.className, "filter_attr_bd")) {
               tmpCurLi = curLi.parentNode;
               titleName = $getInnerText(tmpCurLi.getElementsByTagName("a")[0]).replace(/x/, "");
          } else if ($hasClass(curLi.className, "filter_item")) {
               titleName = $getInnerText(tmpCurLi.getElementsByTagName("div")[0]).replace(/x/, "");
          }
          var navOrAttr = tmpCurLi.getAttribute("attrtype") == "nav" ? "0" : "1";
          var titleHidden = tmpCurLi.getAttribute("isshow") == "1" ? "0" : "1";
          var attrKey = tmpCurLi.getAttribute("attrkey");
          var attrTipType = tmpCurLi.getAttribute("tiptype") ? tmpCurLi.getAttribute("tiptype") : "0";
          var attrTipId = tmpCurLi.getAttribute("tipid") ? tmpCurLi.getAttribute("tipid") : "0";
          var selectedArr = [];
          var reportArr = [];
          var ddArr = curLi.getElementsByTagName("dd");
          if (ddArr.length == 0) {
               ddArr = curLi.getElementsByTagName("a");
          }
          reportArr.push(navOrAttr + "_" + titleHidden + "_" + attrKey + "_" + titleName + "_" + attrTipType + "_" + attrTipId);
          for (var i = 0, len = ddArr.length; i < len; i++) {
               if ($hasClass(ddArr[i].className, "filter_dd_on") || $hasClass(ddArr[i].className, "filter_attr_item_on")) {
                    $addUniq(selectedArr, ddArr[i].getAttribute("attrvalue"));
                    var valueHidden = ddArr[i].getAttribute("isshow") == "1" ? "0" : "1";
                    var valueId = ddArr[i].getAttribute("attrvalue");
                    var tmpA = ddArr[i].getElementsByTagName("a")[0] ? ddArr[i].getElementsByTagName("a")[0] : ddArr[i];
                    var valueName = $getInnerText(tmpA);
                    var valueOrder = tmpA.getAttribute("rg").split("_")[2];
                    reportArr.push(valueHidden + "_" + valueId + "_" + valueName + "_" + valueOrder);
               }
          }
          var clickObj = {
               rg: curLi.getAttribute("attrindex") + "__" + "1005",
               attrClick: reportArr.join(","),
               needCookie: "1",
               ctype: "valueclick"
          };
          YXSearchlogStat.clickLog(clickObj);
          var params = YX.Search.params;
          var initAttr = params.attrInfo;
          var initAttrObj = {};
          if (initAttr != "") {
               initAttr = initAttr.replace(/e/g, "=");
               initAttrObj = $strToJson(initAttr, "?", "a");
          }
          initAttrObj[attrKey] = selectedArr.join("o");
          for (var attrName in initAttrObj) {
               var curAttr = $attr("attrkey", attrName, dom);
               if (curAttr.length > 0) {
                    var pattr = curAttr[0].getAttribute("pattr");
                    if (pattr) {
                         var subAttr = pattr.split("_")[0];
                         var subVal = pattr.split("_")[1];
                         if (initAttrObj[subAttr]) {
                              if ($inArray(subVal, initAttrObj[subAttr].split("o")) < 0) {
                                   initAttrObj[attrName] = "";
                              }
                         } else {
                              initAttrObj[attrName] = "";
                         }
                    }
               }
          }
          var finalAttrArr = [];
          for (var name in initAttrObj) {
               var curVal = initAttrObj[name];
               if (curVal) {
                    finalAttrArr.push(name + "e" + curVal);
               }
          }
          if (finalAttrArr.length > 0) {
               params.attrInfo = finalAttrArr.join("a");
          } else {
               params.attrInfo = "";
          }
          params.pageNum = "";
          YX.Search.query();
     }

     function reset(curLi) {
          var attrKey = curLi.getAttribute("attrkey");
          var params = YX.Search.params;
          var initAttr = params.attrInfo;
          var ddArr = curLi.getElementsByTagName("dd");
          if ($hasClass(curLi.className, "filter_attr_bd")) {
               attrKey = curLi.parentNode.getAttribute("attrkey");
               ddArr = $getElementsByClass("filter_attr_item", curLi);
          }
          var dt = curLi.getElementsByTagName("dt")[0];
          var dtA = ddArr[0];
          if (dt) {
               dt.style.display = "block";
          } else if (dtA) {
               dtA.style.display = "block";
          }
          if (initAttr != "") {
               var reg = new RegExp("(" + attrKey + "e)[^\\&\\#a]*");
               var matchedAttr = initAttr.match(reg);
               if (matchedAttr && matchedAttr.length > 0) {
                    var initAttrArr = matchedAttr[0].split("e")[1].split("o");
               }
          }
          if ($hasClass(curLi.className, "filter_attr_bd")) {
               for (var i = 1, len = ddArr.length; i < len; i++) {
                    if (ddArr[i].getAttribute("temp") === "true") {
                         ddArr[i].setAttribute("temp", "");
                    }
                    if (initAttrArr && initAttrArr.length > 0) {
                         if ($inArray(ddArr[i].getAttribute("attrvalue"), initAttrArr) >= 0) {
                              ddArr[i].className = "filter_attr_item filter_attr_item_on";
                              ddArr[i].removeAttribute("href");
                         } else {
                              ddArr[i].className = "filter_attr_item";
                         }
                    } else {
                         ddArr[i].className = "filter_attr_item";
                    }
               }
          } else {
               for (var i = 0, len = ddArr.length; i < len; i++) {
                    if (ddArr[i].getAttribute("temp") === "true") {
                         ddArr[i].setAttribute("temp", "");
                    }
                    if (initAttrArr && initAttrArr.length > 0) {
                         if ($inArray(ddArr[i].getAttribute("attrvalue"), initAttrArr) >= 0) {
                              ddArr[i].className = "filter_dd filter_dd_on";
                              ddArr[i].getElementsByTagName("a")[0].removeAttribute("href");
                         } else {
                              ddArr[i].className = "filter_dd";
                         }
                    } else {
                         ddArr[i].className = "filter_dd";
                    }
               }
          }
          toggleBtns(false, curLi);
          if (curLi.getAttribute("attrtype") == "brand") {
               if ($(curLi).find(".filter_atoz").length > 0) {
                    var atozDom = $(curLi).find(".filter_atoz");
                    if ($(curLi).attr("initatoz") == "1") {
                         curLi.className = "filter_item filter_item_brand filter_item_multiple filter_item_atoz";
                         atozDom.removeClass("hide");
                         atozDom.children(".filter_atoz_item").removeClass("filter_atoz_current");
                         atozDom.children(".filter_atoz_item").eq(0).addClass("filter_atoz_current");
                    } else {
                         curLi.className = "filter_item filter_item_brand filter_item_multiple";
                         atozDom.addClass("hide");
                         atozDom.children(".filter_atoz_item").removeClass("filter_atoz_current");
                         atozDom.children(".filter_atoz_item").eq(0).addClass("filter_atoz_current");
                    }
               } else {
                    curLi.className = "filter_item filter_item_brand filter_item_multiple";
               }
          } else {
               if ($hasClass(curLi.className, "filter_item_pic")) {
                    curLi.className = "filter_item filter_item_pic";
               } else if ($hasClass(curLi.className, "filter_attr_bd")) {
                    curLi.className = "filter_attr_bd";
               } else {
                    curLi.className = "filter_item filter_item_single";
               }
          }
     }
     var filterItemArr = $getElementsByClass("filter_item", dom);
     var liArr = [];
     for (var i = 0, len = filterItemArr.length; i < len; i++) {
          var curFilterItem = filterItemArr[i];
          if (curFilterItem.getAttribute("attrtype") == "nav" || curFilterItem.getAttribute("attrtype") == "brand" || curFilterItem.getAttribute("attrtype") == "attr" || curFilterItem.getAttribute("attrtype") == "scene") {
               liArr.push(curFilterItem);
          }
     }
     var hasCheck = false;
     for (var i = 0, len = liArr.length; i < len; i++) {
          var curLi = liArr[i];
          curLi.setAttribute("attrindex", "2015" + "_" + (i + 1));
          if ($hasClass(curLi.className, "hide")) {
               curLi.setAttribute("isshow", "0");
          } else {
               curLi.setAttribute("isshow", "1");
          }
          if (!hasCheck) {
               if (curLi.getAttribute("attrtype") == "brand") {
                    initMoreBtn(curLi, "brand");
                    hasCheck = true;
               } else if (curLi.getAttribute("attrtype") == "attr") {
                    initMoreBtn(curLi);
               }
          } else if (curLi.getAttribute("attrtype") == "brand" || curLi.getAttribute("attrtype") == "attr") {
               initMoreBtn(curLi);
          }
     }
     var filterAttrItemArr = $getElementsByClass("filter_attr_bd", dom);
     for (var j = 0, len1 = filterAttrItemArr.length; j < len1; j++) {
          var tmpCurLi = filterAttrItemArr[j];
          tmpCurLi.setAttribute("attrindex", "2015" + "_" + (liArr.length + j + 1));
     }
     $addEvent(dom, "click", function(e) {
          var event = e;
          var e = $getTarget(e);
          var curLi;
          if (((e.tagName == "SPAN" || e.tagName == "I") && e.className == "") || (e.tagName == "A" && (e.className == "filter_showmore" || e.className == "filter_showless"))) {
               if ((e.tagName == "SPAN" || e.tagName == "I") && e.className == "") {
                    curLi = e.parentNode.parentNode.parentNode;
                    var curI = e.parentNode;
               } else if (e.tagName == "A" && (e.className == "filter_showmore" || e.className == "filter_showless")) {
                    curLi = e.parentNode.parentNode;
                    var curI = e;
               }
               if (curI) {
                    switch ($strTrim(curI.className)) {
                         case "filter_showmore":
                              curI.className = "filter_showless";
                              curI.getElementsByTagName("span")[0].innerHTML = "收起";
                              if (curLi.getAttribute("attrtype") == "brand") {
                                   if ($(curLi).find(".filter_atoz").length > 0) {
                                        $(curLi).find(".filter_atoz").removeClass("hide");
                                        curLi.className = "filter_item filter_item_multiple filter_item_atoz";
                                   } else {
                                        curLi.className = fitLiClass(curLi, height1, heightBrand);
                                   }
                              } else {
                                   curLi.className = fitLiClass(curLi, height1, height2);
                              }
                              if (!curI.getAttribute("hasClick")) {
                                   var rg = curLi.getAttribute("attrindex") + "_1002";
                                   var titleId = curLi.getAttribute("attrkey") ? curLi.getAttribute("attrkey") : "";
                                   var valueNum = curLi.getAttribute("attrnum") ? curLi.getAttribute("attrnum") : "";
                                   YXSearchlogStat.clickLog({
                                        rg: rg,
                                        attrClick: "1_" + titleId + "_" + valueNum,
                                        ctype: "attrexpo"
                                   });
                                   curI.setAttribute("hasClick", "1");
                              }
                              break;
                         case "filter_showless":
                              curI.className = "filter_showmore";
                              curI.getElementsByTagName("span")[0].innerHTML = "更多";
                              if (curLi.getAttribute("attrtype") == "brand") {
                                   curLi.className = "filter_item filter_item_brand filter_item_multiple";
                                   var atozDom = $(curLi).find(".filter_atoz");
                                   atozDom.addClass("hide");
                                   atozDom.children(".filter_atoz_item").removeClass("filter_atoz_current");
                                   atozDom.children(".filter_atoz_item").eq(0).addClass("filter_atoz_current");
                                   atozDom.next().find(".filter_dt").removeClass("hide");
                                   atozDom.next().find(".filter_dd").removeClass("hide");
                              } else {
                                   curLi.className = "filter_item filter_item_single";
                              }
                              break;
                         case "filter_choosemore":
                              MultiEdit(curLi);
                              if (curLi.getAttribute("attrtype") == "brand") {
                                   if ($(curLi).find(".filter_atoz").length > 0) {
                                        $(curLi).find(".filter_atoz").removeClass("hide");
                                        curLi.className = "filter_item filter_item_choosemore filter_item_atoz";
                                   } else {
                                        curLi.className = "filter_item filter_item_choosemore";
                                   }
                              } else {
                                   if ($hasClass(curLi.className, "filter_item_pic")) {
                                        curLi.className = "filter_item filter_item_pic filter_item_picmore";
                                   } else if ($hasClass(curLi.className, "filter_attr_bd")) {
                                        curLi.className = "filter_attr_bd filter_attr_choosemore";
                                   } else {
                                        curLi.className = "filter_item filter_item_choosemore";
                                   }
                              }
                              break;
                    }
               }
          }
          if ((e.tagName == "IMG" && e.className == "filter_pic_img") || (e.tagName == "SPAN" && e.className == "filter_pic_name")) {
               e = e.parentNode;
          }
          if (e.tagName == "SPAN" && e.className == "filter_x") {
               e = e.parentNode;
          }
          if (e.tagName == "A") {
               switch ($strTrim(e.className)) {
                    case "filter_choosemore":
                         curLi = e.parentNode.parentNode;
                         MultiEdit(curLi);
                         if ($hasClass(curLi.className, "filter_item_pic")) {
                              curLi.className = "filter_item filter_item_pic filter_item_picmore";
                         } else if ($hasClass(curLi.className, "filter_attr_bd")) {
                              curLi.className = "filter_attr_bd filter_attr_choosemore";
                         } else {
                              curLi.className = "filter_item filter_item_choosemore";
                         }
                         break;
                    case "filter_sure":
                         curLi = e.parentNode.parentNode;
                         submit(curLi);
                         $stopEvent(e);
                         break;
                    case "filter_cancel":
                         curLi = e.parentNode.parentNode;
                         reset(curLi);
                         break;
                    default:
                         if ($hasClass(e.className, "filter_lk")) {
                              curLi = e.parentNode.parentNode.parentNode.parentNode;
                         } else if ($hasClass(e.className, "filter_attr_item")) {
                              curLi = e.parentNode.parentNode;
                         } else if ($hasClass(e.parentNode.className, "filter_visual")) {
                              curLi = e.parentNode.parentNode.parentNode;
                         }
                         if (curLi && ($hasClass(curLi.className, "filter_item_choosemore") || $hasClass(curLi.className, "filter_attr_choosemore") || $hasClass(curLi.className, "filter_item_picmore")) && e.href != "javascript:;" && e.href != "#") {
                              if ($hasClass(e.parentNode.className, "filter_dd_on")) {
                                   e.parentNode.className = e.parentNode.className.replace(/ filter_dd_on/g, "");
                                   e.parentNode.setAttribute("temp", "false");
                                   if ($(curLi).find(".filter_dd_on").length == 0 && $(curLi).attr("selectednum") == "0") {
                                        $(curLi).find(".filter_sure").removeClass("filter_sure").addClass("filter_sure_disabled");
                                   }
                                   $stopEvent(event);
                              } else if ($hasClass(e.className, "filter_attr_item")) {
                                   if ($hasClass(e.className, "filter_attr_item_on")) {
                                        e.className = e.className.replace(/ filter_attr_item_on/g, "");
                                        e.setAttribute("temp", "false");
                                        if (($(curLi).find(".filter_attr_item_on").length == 0 || $(curLi).find(".filter_attr_item_on").length == 1 && $(curLi).find(".filter_attr_item_on").attr("attrvalue") == "") && $(curLi).attr("selectednum") == "0") {
                                             $(curLi).find(".filter_sure").removeClass("filter_sure").addClass("filter_sure_disabled");
                                        }
                                        $stopEvent(event);
                                   } else {
                                        e.className = "filter_attr_item filter_attr_item_on";
                                        e.setAttribute("temp", "true");
                                        if ($(curLi).find(".filter_sure_disabled").length > 0) {
                                             $(curLi).find(".filter_sure_disabled").removeClass("filter_sure_disabled").addClass("filter_sure");
                                        }
                                        $stopEvent(event);
                                   }
                              } else {
                                   e.parentNode.className = "filter_dd filter_dd_on";
                                   e.parentNode.setAttribute("temp", "true");
                                   if ($(curLi).find(".filter_sure_disabled").length > 0) {
                                        $(curLi).find(".filter_sure_disabled").removeClass("filter_sure_disabled").addClass("filter_sure");
                                   }
                                   $stopEvent(event);
                              }
                         } else {
                              if (e.getAttribute("rg")) {
                                   var tmpRegionID4 = "",
                                        navOrAttr, titleHidden, titleId, titleName, valueHidden, valueId, attrClickStr = "";
                                   if ($hasClass(e.className, "filter_lk")) {
                                        tmpRegionID4 = "1001";
                                        navOrAttr = curLi.getAttribute("attrtype") == "nav" ? "0" : "1";
                                        titleHidden = curLi.getAttribute("isshow") == "1" ? "0" : "1";
                                        titleId = curLi.getAttribute("attrkey");
                                        titleName = curLi.getElementsByTagName("div")[0].innerHTML.replace(/：/, "");
                                        valueHidden = e.parentNode.getAttribute("isshow") == "1" ? "0" : "1";
                                        valueId = e.parentNode.getAttribute("attrvalue");
                                        if (valueId) {
                                             var tmpIdArr = valueId.split("o");
                                             var tmpFinalArr = [];
                                             for (var j = 0, len1 = tmpIdArr.length; j < len1; j++) {
                                                  tmpFinalArr.push(valueHidden + "_" + tmpIdArr[j] + "_" + $getInnerText(e) + "_" + e.getAttribute("rg").split("_")[2]);
                                             }
                                             attrClickStr = navOrAttr + "_" +
                                                  titleHidden + "_" +
                                                  titleId + "_" +
                                                  titleName + "," +
                                                  tmpFinalArr.join(",");
                                        }
                                   } else if ($hasClass(e.className, "filter_attr_item")) {
                                        tmpRegionID4 = "";
                                        navOrAttr = "1";
                                        titleHidden = "1";
                                        titleId = curLi.parentNode.getAttribute("attrkey");
                                        titleName = $getInnerText(curLi.parentNode.getElementsByTagName("a")[0]);
                                        valueHidden = "1";
                                        valueId = e.getAttribute("attrvalue");
                                        attrClickStr = navOrAttr + "_" +
                                             titleHidden + "_" +
                                             titleId + "_" +
                                             titleName + "," +
                                             valueHidden + "_" +
                                             valueId + "_" +
                                             $getInnerText(e);
                                   } else if ($hasClass(e.parentNode.className, "filter_visual")) {
                                        tmpRegionID4 = "1007";
                                        navOrAttr = curLi.getAttribute("attrtype") == "nav" ? "0" : "1";
                                        titleHidden = curLi.getAttribute("isshow") == "1" ? "0" : "1";
                                        titleId = curLi.getAttribute("attrkey");
                                        titleName = curLi.getElementsByTagName("div")[0].innerHTML.replace(/：/, "");
                                        valueHidden = "0";
                                        valueId = e.getAttribute("attrvalue");
                                        if (valueId) {
                                             var tmpIdArr = valueId.split("_");
                                             var tmpFinalArr = [];
                                             for (var j = 0, len1 = tmpIdArr.length; j < len1; j++) {
                                                  tmpFinalArr.push(valueHidden + "_" + tmpIdArr[j] + "_场景化属性_" + e.getAttribute("rg").split("_")[2]);
                                             }
                                             attrClickStr = navOrAttr + "_" +
                                                  titleHidden + "_" +
                                                  titleId + "_" +
                                                  titleName + "," +
                                                  tmpFinalArr.join(",");
                                        }
                                   }
                                   var clickObj = {
                                        rg: e.getAttribute("rg"),
                                        regionID4: tmpRegionID4,
                                        attrClick: attrClickStr,
                                        ytag: e.getAttribute("ytag"),
                                        needCookie: "1",
                                        ctype: "valueclick"
                                   };
                                   YXSearchlogStat.clickLog(clickObj);
                              }
                         }
                         break;
               }
          }
     });
     var tmpAttrArr = [];
     for (var k = 0, len1 = liArr.length; k < len1; k++) {
          var curDiv = liArr[k];
          if (!curDiv.className.match("hide")) {
               var attrType = curDiv.getAttribute("attrtype") == "nav" ? 0 : 1;
               var attrKey = curDiv.getAttribute("attrkey");
               var valShowNum = curDiv.getAttribute("shownum") ? curDiv.getAttribute("shownum") : curDiv.getAttribute("attrnum");
               tmpAttrArr.push(attrType + "_" + attrKey + "_" + valShowNum);
          }
     }
     if (tmpAttrArr.length > 0) {
          YX.Search.global.asyncObjArr.push({
               regionID1: modId,
               attrExpose: tmpAttrArr.join(","),
               ctype: "attrexpo"
          });
     }
     var attrTipAArr = $attr("attrtip", "hastip", dom);
     for (var i = 0, len = attrTipAArr.length; i < len; i++) {
          var curTipA = attrTipAArr[i];
          (function() {
               var tmpTipA = curTipA;
               var tipId = tmpTipA.getAttribute("attrtipid");
               var left = tmpTipA.offsetLeft,
                    top = tmpTipA.offsetTop;
               if (tipId) {
                    var curFloatTip = $("#float" + tipId);
                    if (curFloatTip) {
                         var curLi = curFloatTip.parents(".filter_item");
                         curFloatTip.css("left", left + "px");
                         curFloatTip.css("top", (top + 25) + "px");
                         curFloatTip.mouseenter(function() {
                              var tmpTipId = tipId;
                              curLi.addClass("filter_item_hover");
                              curFloatTip.removeClass("hide");
                         });
                         curFloatTip.mouseleave(function() {
                              curLi.removeClass("filter_item_hover");
                              curFloatTip.addClass("hide");
                         });
                    }
               }
               $hoverDelay(tmpTipA, {
                    hoverEvent: function() {
                         var tipId = tmpTipA.getAttribute("attrtipid");
                         var curFloatTip = $("#float" + tipId);
                         $(".filter_tips_2").addClass("hide");
                         if (curFloatTip) {
                              var left = tmpTipA.offsetLeft,
                                   top = tmpTipA.offsetTop;
                              curFloatTip.css("left", left + "px");
                              curFloatTip.css("top", (top + 25) + "px");
                              curFloatTip.parents(".filter_item").addClass("filter_item_hover");
                              curFloatTip.removeClass("hide");
                         }
                         var curLi = tmpTipA.parentNode.parentNode.parentNode.parentNode;
                         if (tmpTipA.getAttribute("hasover") != "1" && tmpTipA.getAttribute("rg")) {
                              var navOrAttr = curLi.getAttribute("attrtype") == "nav" ? "0" : "1";
                              var titleHidden = curLi.getAttribute("isshow") == "1" ? "0" : "1";
                              var titleId = curLi.getAttribute("attrkey");
                              var titleName = $child(curLi, "div")[0].innerHTML.replace(/：/, "");
                              var valueHidden = tmpTipA.parentNode.getAttribute("isshow") == "1" ? "0" : "1";
                              var valueId = tmpTipA.parentNode.getAttribute("attrvalue");
                              var clickObj = {
                                   rg: tmpTipA.getAttribute("rg"),
                                   regionID4: "1006",
                                   attrClick: navOrAttr + "_" + titleHidden + "_" + titleId + "_" + titleName + "," + valueHidden + "_" + valueId + "_" + $getInnerText(tmpTipA),
                                   ytag: tmpTipA.getAttribute("ytag"),
                                   ctype: "valueclick"
                              };
                              YXSearchlogStat.clickLog(clickObj);
                              tmpTipA.setAttribute("hasover", "1");
                         }
                    }
               });
               $addEvent(tmpTipA, "mouseout", function(e) {
                    var tipId = tmpTipA.getAttribute("attrtipid");
                    var curFloatTip = $("#float" + tipId);
                    var pageScrollH = $getPageScrollHeight();
                    var mouseY = e.clientY + pageScrollH;
                    var tmpTipAY = $getY(tmpTipA);
                    var diff = mouseY > tmpTipAY ? (mouseY - tmpTipAY) : (tmpTipAY - mouseY);
                    if (diff < 18) {
                         if (curFloatTip) {
                              curFloatTip.parents(".filter_item").removeClass("filter_item_hover");
                              curFloatTip.addClass("hide");
                         }
                    }
               });
          })();
     }
     $("#attrList").find(".filter_attr").each(function() {
          var that = $(this);
          that.hoverDelay({
               hoverEvent: function(e) {
                    $("#attrList").addClass("filter_zindex");
                    $(".filter_tips_2").addClass("hide");
                    that.addClass("filter_attr_on");
                    var pageScrollW = $getPageScrollWidth();
                    var ddLeft = that.position().left + pageScrollW;
                    if (ddLeft + 750 > window.screen.width) {
                         that.addClass("filter_attr_on_right");
                    }
                    var curBdItem = that.children(".filter_attr_bd");
                    if (curBdItem.outerHeight() < 50) {
                         var attrItemArr = curBdItem.find(".filter_attr_item");
                         var multiBtnWidth = curBdItem.children(".filter_attr_act").outerWidth();
                         var tmpAttrWidth = 0;
                         for (var i = 0, len = attrItemArr.length; i < len; i++) {
                              tmpAttrWidth += $(attrItemArr[i]).outerWidth();
                         }
                         if ((tmpAttrWidth + multiBtnWidth) < 380) {
                              curBdItem.children(".filter_attr_list").css("width", tmpAttrWidth + multiBtnWidth + 58);
                         }
                    }
                    var keyA = that.children(".filter_attr_hd").eq(0);
                    if (that.attr("hasover") != "1" && keyA.attr("rg")) {
                         var navOrAttr = "1";
                         var titleId = that.attr("attrkey");
                         var valueNum = that.find(".filter_attr_item").length;
                         var clickObj = {
                              rg: keyA.attr("rg"),
                              attrClick: navOrAttr + "_" + titleId + "_" + valueNum,
                              ctype: "attrexpo"
                         };
                         YXSearchlogStat.clickLog(clickObj);
                         that.attr("hasover", "1");
                    }
               },
               outEvent: function() {
                    that.removeClass("filter_attr_on");
                    $("#attrList").removeClass("filter_zindex");
               }
          });
     });
     $("#attrList").find(".filter_lk").each(function() {
          var that = $(this);
          that.hoverDelay({
               hoverEvent: function() {
                    if (!$hasClass(that.parent(".filter_dd").attr("class"), "filter_dd_on") && !$hasClass(that.parents(".filter_item").attr("class"), "filter_item_choosemore")) {
                         var hoverAttrKey = that.parents(".filter_item").attr("attrkey");
                         $("#crumbBox").find("[attrkey=" + hoverAttrKey + "]").addClass("crumb_selected_hover");
                         that.parent().siblings(".filter_dd.filter_dd_on").addClass("filter_dd_on_delete");
                    }
               }
          });
     });
     $("#attrList").find(".filter_lk").mouseout(function() {
          if (!$hasClass($(this).parent(".filter_dd").attr("class"), "filter_dd_on") && !$hasClass($(this).parents(".filter_item").attr("class"), "filter_item_choosemore")) {
               var hoverAttrKey = $(this).parents(".filter_item").attr("attrkey");
               $("#crumbBox").find("[attrkey=" + hoverAttrKey + "]").removeClass("crumb_selected_hover");
               $(this).parent().siblings(".filter_dd.filter_dd_on").removeClass("filter_dd_on_delete");
          }
     });
     if ($("#attrList").find(".filter_area").length == 1) {
          $("#attrList").find(".filter_area_nav").addClass("filter_area_nav_nonebod");
     }
     if ($("#attrList .filter_atoz").length > 0) {
          var atozDom = $("#attrList .filter_atoz");
          atozDom.children(".filter_atoz_item").each(function() {
               var that = $(this);
               that.hoverDelay({
                    hoverDuring: 100,
                    hoverEvent: function() {
                         if ($hasClass(that.attr("class"), "filter_atoz_disabled")) {
                              return true;
                         }
                         atozDom.children(".filter_atoz_item").removeClass("filter_atoz_current");
                         that.addClass("filter_atoz_current");
                         var curText = that.text() ? that.text() : "";
                         var curArr = curText.split("");
                         if (curText == "全部") {
                              atozDom.next().find(".filter_dt").removeClass("hide");
                              atozDom.next().find(".filter_dd").removeClass("hide");
                              return true;
                         } else if (curText == "其他") {
                              atozDom.next().find(".filter_dt").addClass("hide");
                              atozDom.next().find(".filter_dd").addClass("hide");
                              atozDom.next().find("[bindex=other]").removeClass("hide");
                              return true;
                         }
                         atozDom.next().find(".filter_dt").addClass("hide");
                         atozDom.next().find(".filter_dd").each(function() {
                              var toArr = $(this).attr("bindex") ? $(this).attr("bindex").split("") : "";
                              var tmpArr = $arrayUniq(curArr.concat(toArr));
                              if (tmpArr.length < curArr.length + toArr.length) {
                                   $(this).removeClass("hide");
                              } else {
                                   $(this).addClass("hide");
                              }
                         });
                    }
               });
          });
     }
};
YX.Search.prowords = function() {
     var attrDom = $id("attrList");
     var tDom = $id("topProwords"),
          bDom = $id("bottomProwords");
     var modId = "2010";
     var global = YX.Search.global;
     var params = YX.Search.params;
     var keyword = params.keyword;
     var areaCode = YX.Search.cookie.areaCode;
     if (keyword != "") {
          $loadScript("http://ds.yixun.com/cgi-bin/yixunprowords?sname=yixunkeywords&callback=YXSearchProwordsCB&disnum=10&word=" + encodeURIComponent(keyword) + "&subwebsitecode=" + areaCode);
     }
     window["YXSearchProwordsCB"] = function(o) {
          var max = 10;
          var list = o.list;
          var tpl1 = '<a rg="2010_{#pos1#}" href="{#link#}" lg="1026" pos="{#pos1#}" ytag="420{#pos#}">{#words#}</a>';
          var tpl2 = '<a rg="2110_{#pos1#}" href="{#link#}" lg="1028" pos="{#pos1#}" ytag="430{#pos#}">{#words#}</a>';
          var wordList = [];
          if (list.length > 0) {
               if (list.length < max) {
                    max = list.length;
               }
               var tmpArr1 = [],
                    tmpArr2 = [];
               for (var i = 0; i < max; i++) {
                    var item = list[i];
                    var tmpObj = {
                         "pos": i < 100 ? (i > 9 ? i : ('0' + i)) : '',
                         "pos1": i + 1,
                         "link": "http://" + params.domain + "/html?key=" + encodeURIComponent(item["words"]) + "&as=3" + "&charset=" + params.charset + "&area=" + areaCode,
                         "words": item["words"]
                    };
                    tmpArr1.push(strReplace(tpl1, tmpObj));
                    tmpArr2.push(strReplace(tpl2, tmpObj));
                    wordList.push(item["words"]);
               }
               if (tmpArr1.length > 0) {
                    if (tDom) {
                         tDom.innerHTML = $xss("<span class='otherwords_hd'>或许您还想找：</span><span class='otherwords_bd'>" + tmpArr1.join("") + "</span>", "none");
                         tDom.className = tDom.className.replace(/( hide)/ig, "");
                         if (attrDom) {
                              $addClass(attrDom, "filter_nonebod");
                         }
                    }
                    if (bDom) {
                         bDom.innerHTML = $xss("<span class='otherwords_hd'>或许您还想找：</span><span class='otherwords_bd'>" + tmpArr2.join("") + "</span>", "none");
                         bDom.className = bDom.className.replace(/( hide)/ig, "");
                         if (attrDom) {
                              $addClass(attrDom, "filter_nonebod");
                         }
                         if ($("#attrList").find(".filter_area").length == 0) {
                              $("#topProwords").addClass("otherwords_nonebod");
                         }
                    }
                    YXSearchlogStat.asyncLog({
                         regionID1: modId,
                         recommWord: wordList.join("_"),
                         otherExpose: tmpArr1.length
                    });
               }
          }
     };
};
YX.Search.goodsCompare = function() {
     if ($(".goods_bcompare").length == 0) {
          return;
     }
     $storage.init("yxgc", document.domain);
     var domName = "goodsCompareWindow",
          storeName = "goods",
          LStorageObj = {};
     var minNum = 2,
          maxNum = 4;
     var LStorage = $storage.instance;
     if (!$id(domName)) {
          return;
     }
     window["GoodsCompare"] = {
          hasWarn: false,
          hasAppend: false,
          init: function() {
               var delGoodIdStr = $getCookie("delcmpids");
               var tmpStr = LStorage.get(storeName);
               if (tmpStr && delGoodIdStr) {
                    var initStrArr = tmpStr.split("{|}");
                    var finalStrArr = [];
                    var tmpDelIdArr = delGoodIdStr.split("_");
                    for (var i = 0, l = initStrArr.length; i < l; i++) {
                         var curStr = initStrArr[i];
                         if ($inArray(curStr.split("{:}")[0], tmpDelIdArr) >= 0) {
                              initStrArr[i] = "";
                         }
                         if (initStrArr[i]) {
                              finalStrArr.push(initStrArr[i]);
                         }
                    }
                    if (finalStrArr.length > 0) {
                         LStorage.set(storeName, finalStrArr.join("{|}"));
                    }
                    $delCookie("delcmpids", '/', "searchex.yixun.com");
               }
               if (!self.hasAppend) {
                    $id(domName).innerHTML = '<div class="compare_hd">\
           <h3 class="compare_tit" id="gcHeadMove" style="cursor:move">对比</h3>\
            <a href="javascript:;" id="gcClose" class="compare_close" rg="2019_1001_1001">×</a>\
          </div>\
          <div class="compare_bd">\
           <div class="compare_list" id="goodsCompareList">\
           </div>\
           <div class="compare_act" id="gcActPanel">\
            <a href="javascript:;" id="gcCompare" class="compare_sure" rg="2019_1001_1002">开始对比</a>\
            <a href="javascript:;" id="gcClear"class="compare_cancel" rg="2019_1001_1003">清空商品</a>\
           </div>\
           <div class="compare_act" id="gcNoGoods" style="display:none">无对比商品</div>\
          </div>\
           <div class="compare_tip" id="gcWarnTip" style="display:none">\
            <div class="mod_hint">\
             <div class="mod_hint_inner">\
              <p>对比栏已经满了！您可以删除不需要的商品后再进行添加哦</p>\
             </div>\
             <i class="mod_hint_arrow4"></i></div>\
          </div>';
                    if ($isBrowser("ie6")) {
                         $id(domName).style.position = "absolute";
                         setInterval(function() {
                              $id(domName).style.top = ($getWindowHeight() + $getPageScrollHeight() - 550) + "px";
                         }, 100);
                    }
                    hasAppend = true;
                    initDragDom(domName);
               }
               $id("gcClose").onclick = function() {
                    GoodsCompare.close();
               }
               $id("gcCompare").onclick = function() {
                    GoodsCompare.compare();
               }
               $id("gcClear").onclick = function() {
                    GoodsCompare._clear();
                    GoodsCompare._update();
               }
               if (LStorage.get(storeName)) {
                    GoodsCompare._update();
               }
          },
          add: function(o) {
               var tmpValue = LStorage.get(storeName);
               var id = o.id,
                    productPicUrl = o.productPicUrl,
                    name = o.name;
               var thisBtn = o.dom;
               if (LStorageObj[id]) {
                    thisBtn.className = "goods_bcompare";
                    GoodsCompare.remove(o);
                    return;
               }
               if (tmpValue) {
                    if (tmpValue.split("{|}").length >= maxNum) {
                         var gcWarnTip = $("#gcWarnTip");
                         gcWarnTip.find("p").text("对比栏已经满了！您可以删除不需要的商品后再进行添加哦!");
                         gcWarnTip.stop(true, true).css("style", "display:none").fadeIn(500).fadeOut(3000);
                         return;
                    }
               }
               var item = id + "{:}" + productPicUrl + "{:}" + name;
               LStorageObj[id] = id;
               thisBtn.className = "goods_bcompare goods_bcompare_on";
               $(thisBtn).find("span").text("取消对比");
               LStorage.set(storeName, tmpValue ? (tmpValue + "{|}" + item) : item);
               GoodsCompare._update();
          },
          remove: function(o) {
               var rePid = o.id;
               var tmpStr = LStorage.get(storeName),
                    reArr = [];
               if (tmpStr) {
                    var tmpArr = tmpStr.split("{|}");
                    for (var i = 0, l = tmpArr.length; i < l; i++) {
                         var curId = tmpArr[i].split("{:}")[0];
                         if (curId == rePid) {
                              if ($id("gc" + curId)) {
                                   $id("gc" + curId).className = "goods_bcompare";
                                   $($id("gc" + curId)).find("span").text("加入对比");
                              }
                              tmpArr[i] = "";
                         }
                         if (tmpArr[i]) {
                              reArr.push(tmpArr[i]);
                         }
                    }
                    LStorage.set(storeName, reArr.join("{|}"));
                    GoodsCompare._update();
               }
          },
          compare: function() {
               var idArr = [];
               $("#goodsCompareList").find(".compare_item").each(function() {
                    var curAddedId = $(this).attr("addedcommid");
                    if (curAddedId) {
                         idArr.push(curAddedId);
                    }
               });
               if (idArr.length <= 4 && idArr.length > 1) {
                    window.open("http://cmp.searchex.yixun.com/html?sysno=" + idArr.join("_"));
               } else {
                    var gcWarnTip = $("#gcWarnTip");
                    gcWarnTip.find("p").text("您至少需要选中两件商品才能开始对比。");
                    gcWarnTip.css("opacity", "0").clearQueue().show().animate({
                         opacity: '1'
                    }, "5000").delay(1000).animate({
                         opacity: '0'
                    }, "5000");
                    return;
               }
          },
          close: function() {
               $id(domName).style.display = "none";
               LStorageObj = {};
               GoodsCompare._clear();
          },
          _clear: function() {
               var tmpStr = LStorage.get(storeName);
               if (tmpStr) {
                    var strArr = tmpStr.split("{|}");
                    for (var i = 0, len = strArr.length; i < len; i++) {
                         var curId = strArr[i].split("{:}")[0];
                         if ($id("gc" + curId)) {
                              $id("gc" + curId).className = "goods_bcompare";
                              $($id("gc" + curId)).find("span").text("加入对比");
                         }
                    }
               }
               LStorage.set(storeName, '');
          },
          _update: function() {
               var tmpStr = LStorage.get(storeName);
               LStorageObj = {};
               if (tmpStr) {
                    var itemArr = tmpStr.split("{|}"),
                         html = "";
                    for (var i = 0, l = itemArr.length; i < l; i++) {
                         var curItemArr = itemArr[i].split("{:}");
                         var curId = curItemArr[0],
                              curproductPicUrl = curItemArr[1],
                              curName = curItemArr[2];
                         var curImg = getPicByUrl(curproductPicUrl, "60");
                         LStorageObj[curId] = curId;
                         html += '<a target="_blank" href="http://item.yixun.com/item-' + curId + '.html" class="compare_item" addedcommid="' + curId + '">\
       <img src="' + curImg + '" title="' + curName + '">\
       <i class="compare_x" pid="' + curId + '" class="act_del" onclick="GoodsCompare.remove({dom : this, id :' + curId + '});return false;">×</i>\
       </a>';
                         if ($id("gc" + curId)) {
                              if (!$hasClass($id("gc" + curId).className), "goods_bcompare_on") {
                                   $id("gc" + curId).className = "goods_bcompare goods_bcompare_on";
                                   $($id("gc" + curId)).find("span").text("取消对比");
                              }
                         }
                    }
                    if (itemArr.length < maxNum) {
                         for (var j = 0, len = maxNum - itemArr.length; j < len; j++) {
                              html += '<a href="javascript:;" class="compare_item" style="cursor:default;"><span class="compare_blank">尚未<br>添加</span></a>';
                         }
                    }
                    $id("goodsCompareList").innerHTML = html;
                    $id("gcActPanel").style.display = "block";
                    $id(domName).style.display = "block";
                    $id("gcNoGoods").style.display = "none";
               } else {
                    $id("goodsCompareList").innerHTML = "";
                    $id("gcActPanel").style.display = "none";
                    $id("gcNoGoods").style.display = "block";
               }
               $("#goodsCompareList .compare_item").mouseover(function() {
                    if ($(this).find(".compare_blank").length == 0) {
                         $(this).addClass("compare_on");
                    }
               });
               $("#goodsCompareList .compare_item").mouseout(function() {
                    $(this).removeClass("compare_on");
               });
          },
          closeWarn: function() {
               if ($id("gcWarnBox")) {
                    $id("gcWarnBox").className = $id("gcWarnBox").className + " hide";
               }
          }
     };
     window["GoodsCompare"].init();
};
YX.Search.address = function() {
     var dom = $id("select_area_act");
     if (!dom) {
          return;
     }
     var initPridMap = {
          "1": "2626_2621",
          "1001": "421_403",
          "2001": "3792_131",
          "3001": "1325_1323",
          "4001": "182_158",
          "5001": "5053_2212"
     };
     var params = YX.Search.params;
     var prid = $getCookie("prid");
     if (!prid) {
          var areacode = $getCookie("wsid") ? $getCookie("wsid") : "1";
          prid = initPridMap[areacode] ? initPridMap[areacode] : initPridMap["1"];
     }
     var t = prid.split("_");
     try {
          G.app.change_area.start_changeArea(t[0], function() {
               var curPrid = $getCookie("prid") ? $getCookie("prid") : "";
               YXSearchlogStat.clickLog({
                    rg: "2016_1006",
                    needCookie: "1",
                    otherClick: "_" + curPrid
               });
               location.reload();
          }, "", function() {
               var tmpText = $("#area_name").text();
               var patt1 = /^\S+\s{1}/;
               var cityNameStr = tmpText.replace(patt1, "");
               if (cityNameStr) {
                    var cityName = cityNameStr.replace(/\s/g, "");
                    $("#area_name").text(cityName);
                    $("#area_name").attr("title", cityName);
               }
          });
     } catch (e) {}
};
YX.Search.pageBar = function() {
     var dom = $id("pageBarBottom");
     var params = YX.Search.params;
     var curPage = params.pageNum,
          pageSize = params.pageSize,
          totalNum = params.totalNum;
     var maxPage = 200,
          totalPage = Math.ceil(totalNum / pageSize);
     if (Math.ceil(totalNum / pageSize) > 1) {
          dom.className = dom.className.replace(/( hide)/ig, "");
          var page = $yxPage({
               pageCount: (totalPage >= maxPage) ? maxPage : totalPage,
               currentPage: curPage,
               domList: [dom],
               action: "func",
               func: function(pageId, opt) {
                    params.pageNum = pageId;
                    YX.Search.query("list");
               }
          });
          var btnArr = $id("pageBarBottom").getElementsByTagName("a"),
               jumpBtn = $id("pageBarBottom").getElementsByTagName("button")[0];
          for (var i = 0, l = btnArr.length; i < l; i++) {
               var curA = btnArr[i];
               if (curA.getAttribute("pagetag") == "go") {
                    if ($getInnerText(curA) == "上一页") {
                         curA.setAttribute("rg", "2018_1001_1");
                    } else if ($getInnerText(curA) == "下一页") {
                         curA.setAttribute("rg", "2018_1001_2");
                    } else {
                         curA.setAttribute("rg", "2018_1002_" + curA.getAttribute("pageid"));
                    }
               }
          }
          if (jumpBtn) {
               jumpBtn.setAttribute("rg", "2018_1003");
          }
     }
};
YX.Search.backToTop = function() {
     var dom = $id("backToTop");
     if (!dom) {
          return;
     }
     $addEvent(window, "scroll", function() {
          var maxHeight
          setTimeout(function() {
               var scrolledH = parseInt($getPageScrollHeight());
               var wholeH = parseInt(document.body.scrollHeight);
               var percent = scrolledH / wholeH;
               if (percent > 0.1) {
                    dom.className = $id("backToTop").className.replace(/hide/g, "");
               } else {
                    if (!$hasClass(dom.className, "hide")) {
                         dom.className += " hide";
                    }
               }
          }, 400);
     });
     $backToTop({
          id: "backToTop",
          className: "backtop",
          scroll: true,
          duration: 50,
          fps: 50,
          height: "50px",
          width: "50px",
          bottom: "50px"
     });
};
YX.Search.cart = function(domId, classId, href) {
     var domId = domId ? domId : "itemList";
     var classId = classId ? classId : "goods_buy";
     var href = href ? href : "href";
     $("#" + domId + " ." + classId + "").click(function(e) {
          var tmpHref = $(this).attr(href);
          if (tmpHref) {
               Cart.add({
                    pid: $getQuery("pid", tmpHref),
                    pnum: $getQuery("pnum", tmpHref),
                    price_id: $getQuery("price_id", tmpHref),
                    recommend: false
               }, this);
               e.preventDefault();
          }
     });
}
YX.Search.gift = function() {
     var cookie = YX.Search.cookie;
     var params = YX.Search.params;
     var dom = $id("itemList"),
          giftArr = [],
          tEvent;
     if (dom) {
          function getGiftsByScroll(offsetH) {
               var bodyCache = document.body,
                    domCache = (document.compatMode == 'BackCompat') ? bodyCache : document.documentElement,
                    offsetH = (window.MessageEvent && !$isBrowser('firefox')) ? bodyCache.scrollTop : domCache.scrollTop;
               var giftArr = $attr("gtagtype", "zeng", $id("itemList"));
               var giftIdObj = {};
               for (var i = 0, l = giftArr.length; i < l; i++) {
                    var curGift = giftArr[i];
                    if (curGift.getAttribute("pid")) {
                         var _index = $getYP(curGift);
                         _index = _index > offsetH ? (_index - offsetH) : 0;
                         (giftIdObj[_index]) ? giftIdObj[_index].push(curGift) : giftIdObj[_index] = [curGift];
                    }
               }
               for (var i in giftIdObj) {
                    $scroll({
                         height: i,
                         data: giftIdObj[i],
                         func: pullGifts,
                         parent: parent
                    });
               }

               function pullGifts(opt) {
                    var giftUrl = "http://d.dashou.yixun.com/dashou/querydashoudata?whId=" + cookie.areaCode + "&regionId=" + cookie.regionId + "&sceneid=10001&type=8&callback=showGiftTest&ids="
                    var funcArr = [];
                    window["showGiftIconCB"] = function(o, curGiftIcon) {
                         var tplIn = '<p class="goods_more_item hide" gtiptype="zeng">\
         <span class="goods_more_img">\
          <img src="{#img50#}" height="40" width="40" alt="{#title#}" onerror="this.src=\'http://static.gtimg.com/icson/images/detail/v2/60.jpg\'">\
         </span>\
         <span class="goods_more_info">\
          <span class="goods_more_name" title="{#title#}">{#title#}</span>\
         </span>\
        </p>'
                         if (o.length > 0) {
                              var liArr = [];
                              var list = o;
                              for (var i = 0, len = list.length; i < len; i++) {
                                   var item = list[i];
                                   var tmpPicUrl = getPicByUrl(item["logoUrl"], "60");
                                   if (item["type"] == 0) {
                                        var tmpObj = {
                                             "img50": tmpPicUrl ? tmpPicUrl : getPicUrl(item["product_char_id"], "50"),
                                             "title": item["name"],
                                             "price": ""
                                        }
                                   }
                                   liArr.push(strReplace(tplIn, tmpObj));
                              }
                              if (liArr.length > 0) {
                                   var curDivArr = $getElementsByClass("goods_more_bd", curGiftIcon.parentNode.parentNode);
                                   var div;
                                   if (curDivArr.length == 0) {
                                        div = document.createElement("div");
                                        div.className = "goods_more_bd hide";
                                        curGiftIcon.parentNode.parentNode.appendChild(div);
                                   } else {
                                        div = curDivArr[0];
                                   }
                                   if (params.maxTagsNum > 1) {
                                        div.innerHTML += $xss(liArr.join(""), "none");
                                        curGiftIcon.className = curGiftIcon.className.replace(/ hide/g, "");
                                   } else if (params.maxTagsNum == 1 && $(curGiftIcon).prevAll(".goods_more_tag").length == 0) {
                                        div.innerHTML += $xss(liArr.join(""), "none");
                                        curGiftIcon.className = curGiftIcon.className.replace(/ hide/g, "");
                                   }
                              }
                         }
                    };
                    var dataArr = [];
                    for (var i = 0, len = opt.data.length; i < len; i++) {
                         var curGiftIcon = opt.data[i];
                         var curPid = curGiftIcon.getAttribute("pid");
                         var curPidObj = {
                              url: giftUrl + curPid,
                              callbackName: "showGiftTest",
                              callback: function(data) {
                                   dataArr.push(data);
                              }
                         };
                         funcArr.push(curPidObj);
                    }
                    window["showGiftTest"] = function(data) {};

                    function alldone() {
                         for (var i = 0, l = dataArr.length; i < l; i++) {
                              var curData = dataArr[i];
                              if (curData) {
                                   if (curData.ZengpinData) {
                                        if (curData.ZengpinData.MainArr.length > 0) {
                                             var curZengList = curData.ZengpinData.MainArr[0].Zenpin;
                                             if (curZengList.length > 0) {
                                                  showGiftIconCB(curZengList, opt.data[i]);
                                             }
                                        }
                                   }
                              }
                         }
                    }
                    $serial(funcArr, alldone);
               }
          }
          if (cookie.regionId) {
               getGiftsByScroll(1000);
          }
     }
};
YX.Search.product = function() {
     var dom = $id("itemList");
     var global = YX.Search.global;
     var params = YX.Search.params;
     if (dom) {
          YX.Search.gift();
          $(dom).find(".goods_li").mouseenter(function(e) {
               if ($(dom).find(".goods_li_hover").length > 0) {
                    $(dom).find(".goods_li_hover").removeClass("goods_li_hover");
                    $(dom).find(".goods_more_tag_hover").removeClass("goods_more_tag_hover");
               }
               var that = $(this);
               var targetDom = $(e.target);
               that.css("cursor", "pointer");
               that.addClass("goods_li_hover");
               if (that.find(".goods_buy_disabled_v2").length == 1 && that.find(".goods_more_bd").length == 0) {
                    that.find(".goods_buy_disabled_v2").css("cursor", "default");
                    var areaName = $("#area_name").text();
                    var tipTpl1 = '<p class="goods_buy_disabled_tips"><span class="goods_buy_disabled_tips_txt">很抱歉，此商品暂不支持配送至</span><b>' + areaName + '</b></p>';
                    var tipTpl2 = '<p class="goods_buy_disabled_tips"><b></b>很抱歉，此商品暂不支持配送至<b>' + areaName + '</b></p>';
                    if (params.showType === "0") {
                         that.find(".goods_buy_disabled_v2").parents(".goods_more").append("<div class='goods_more_bd'>" + tipTpl1 + "</div>");
                         that.find(".goods_more_bd").css("cursor", "default");
                    } else if (params.showType === "1") {
                         that.find(".goods_buy_disabled_v2").append(tipTpl2);
                         that.find(".goods_buy_disabled_tips").css("cursor", "default");
                    }
               } else if (that.find(".goods_buy_disabled_v2").length == 1 && that.find(".goods_more_bd").length == 1) {
                    that.find(".goods_more_bd").removeClass("hide");
               }
               if (that.find(".goods_more_tag").length > 0 && that.find(".goods_more_tag_hover").length == 0) {
                    var firstTag = that.find(".goods_more_tag").eq(0);
                    firstTag.addClass("goods_more_tag_hover");
                    var firstTagType = firstTag.attr("gtagtype");
                    that.find(".goods_more_bd").removeClass("hide");
                    that.find(".goods_more_bd").children("[gtiptype=" + firstTagType + "]").removeClass("hide");
                    that.find(".goods_more_bd").css("cursor", "default");
                    if (that.find(".goods_more_tag").length > 1) {
                         $(firstTag).unbind("mouseover").mouseover(function() {
                              $(this).addClass("goods_more_tag_hover");
                              $(this).siblings(".goods_more_tag_hover").removeClass("goods_more_tag_hover");
                              $(this).parents(".goods_more").find(".goods_more_bd").removeClass("hide");
                              $(this).parents(".goods_more").find(".goods_more_bd").children("[gtiptype=" + firstTagType + "]").removeClass("hide");
                              $(this).parents(".goods_more").find(".goods_more_bd").find(".goods_more_item").each(function() {
                                   if ($(this).attr("gtiptype") != firstTagType) {
                                        $(this).addClass("hide");
                                   }
                              });
                         });
                    }
               }
               if ($(this).find(".goods_more_tag").length > 1) {
                    $(this).find(".goods_more_tag").each(function(index) {
                         if (index > 0) {
                              var that = $(this);
                              that.unbind("mouseover").mouseover(function() {
                                   $(this).addClass("goods_more_tag_hover");
                                   $(this).siblings(".goods_more_tag_hover").removeClass("goods_more_tag_hover");
                                   var curTagType = $(this).attr("gtagtype");
                                   var goodsMoreDom = $(this).parents(".goods_more");
                                   goodsMoreDom.find(".goods_more_bd").children("[gtiptype=" + curTagType + "]").removeClass("hide");
                                   goodsMoreDom.find(".goods_more_bd").find(".goods_more_item").each(function() {
                                        if ($(this).attr("gtiptype") != curTagType) {
                                             $(this).addClass("hide");
                                        }
                                   });
                              });
                         }
                    });
               }
          });
          $(dom).find(".goods_li").mouseleave(function() {
               $(this).removeClass("goods_li_hover");
               $(this).find(".goods_more_tag").removeClass("goods_more_tag_hover");
               $(this).find(".goods_more_bd").addClass("hide");
               $(this).find(".goods_more_item").addClass("hide");
          });
          $(dom).find(".goods_li").click(function(e) {
               var classArr = ["link_pic", "mod_goods_tit", "goods_comments", "goods_buy", "goods_more_tag goods_more_tag_hover", "goods_more_bd", "goods_more_info", "goods_more_img", "goods_more_item", "goods_buy goods_more_tag_hover", "goods_buy_disabled_tips", "goods_buy_disabled_v2", "goods_bcompare goods_bcompare_on", "goods_bcompare"];
               var targetDom = $(e.target);
               var targetClass = targetDom.attr("class");
               var targetParentClass = targetDom.parent().attr("class");
               var targetGrandParentClass = targetDom.parent().parent().attr("class");
               if ($inArray(targetClass, classArr) < 0 && $inArray(targetParentClass, classArr) < 0 && $inArray(targetGrandParentClass, classArr) < 0) {
                    var curA = $(this).find(".mod_goods_img").children("a");
                    var curGoodUrl = curA.attr("href");
                    var ytag = global.pageId + curA.attr("ytag");
                    if (ytag) {
                         if ($getQuery("YTAG", curGoodUrl) == "") {
                              curGoodUrl = curGoodUrl + "?YTAG=" + ytag;
                         }
                    }
                    window.open(curGoodUrl);
                    var clickObj = {
                         rg: curA.attr("rg"),
                         commClick: $(this).attr("commid") + "_" + $(this).attr("clsid") + "_" + $(this).attr("commpoint") + "_" + $(this).attr("commplatform") + "_" + $(this).attr("stockstate")
                    };
                    YXSearchlogStat.clickLog(clickObj);
               }
          });
          $(dom).find(".goods_buy").each(function() {
               var that = $(this);
               if (that.find(".goods_buy_tips").length > 0) {
                    that.mouseover(function() {
                         $(this).addClass("goods_more_tag_hover");
                    });
                    that.mouseout(function() {
                         $(this).removeClass("goods_more_tag_hover");
                    });
               }
          });
          if ($(dom).find(".goods_qrcode_mark").length > 0) {
               var pvid = "0";
               var imgSize = params.showType == "0" ? "200" : "120";
               var initImgSrc = "http://qr.searchex.yixun.com/qr?y=2500000&s=" + imgSize;
               $(dom).find(".goods_qrcode_mark").each(function() {
                    var that = $(this);
                    that.hoverDelay({
                         hoverEvent: function() {
                              var curLi = that.parents(".goods_li");
                              var curSysNo = curLi.attr("commid") ? curLi.attr("commid") : "";
                              if (pvid === "0") {
                                   pvid = params.pvid ? params.pvid : "";
                              }
                              var codeImgSrc = initImgSrc + "&k=" + curSysNo + "&p=" + pvid;
                              var qrImgDom = that.next(".goods_qrcode_img");
                              var qrTipDom = that.nextAll(".goods_qrcode_tips");
                              if (imgSize == "120") {
                                   curLi.addClass("goods_li_qrcode");
                              }
                              if (qrImgDom.attr("src")) {
                                   qrImgDom.css("display", "inline");
                              } else {
                                   qrImgDom.attr("src", codeImgSrc);
                                   qrImgDom.css("display", "inline");
                              }
                              qrTipDom.css("display", "inline");
                              if (!that.attr("hasover")) {
                                   var tmpRg = that.parents(".mod_goods").find(".link_pic").attr("rg");
                                   if (tmpRg) {
                                        var curRg = "2002_" + tmpRg.split("_")[1] + "_" + "12";
                                        var commClick = curLi.attr("commid") + "_" + curLi.attr("clsid") + "_" + curLi.attr("commpoint") + "_" + curLi.attr("commplatform") + "_" + curLi.attr("stockstate");
                                        YXSearchlogStat.clickLog({
                                             rg: curRg,
                                             commClick: commClick
                                        });
                                   }
                                   that.attr("hasover", "1");
                              }
                         }
                    });
               });
               $(dom).find(".goods_qrcode_mark").mouseout(function() {
                    if (imgSize == "120") {
                         $(this).parents(".goods_li").removeClass("goods_li_qrcode");
                    }
                    $(this).next(".goods_qrcode_img").css("display", "none");
                    $(this).nextAll(".goods_qrcode_tips").css("display", "none");
               });
               $(dom).find(".goods_qrcode_img").mouseenter(function() {
                    if (imgSize == "120") {
                         $(this).parents(".goods_li").addClass("goods_li_qrcode");
                    }
                    $(this).css("display", "inline");
                    $(this).nextAll(".goods_qrcode_tips").css("display", "inline");
               }).click(function() {
                    $(this).css("display", "none");
               });
               $(dom).find(".goods_qrcode_img").each(function() {
                    var that = $(this);
                    var timer;
                    var hided = false;
                    that.mousemove(function() {
                         if (hided) {
                              hided = false;
                              return;
                         }
                         if (timer) {
                              clearTimeout(timer);
                              timer = 0;
                         }
                         that.css("cursor", "pointer");
                         timer = setTimeout(function() {
                              hided = true;
                              that.css("cursor", "none");
                         }, 1000);
                    });
               });
               $(dom).find(".goods_qrcode_img").mouseleave(function() {
                    if (imgSize == "120") {
                         $(this).parents(".goods_li").removeClass("goods_li_qrcode");
                    }
                    $(this).css("display", "none");
                    $(this).nextAll(".goods_qrcode_tips").css("display", "none");
               });
          }
          $(dom).find(".goods_qqbuy .goods_qqbuy_lk").mouseover(function() {
               $(this).next(".goods_qqbuy_tips").removeClass("hide");
          });
          $(dom).find(".goods_qqbuy .goods_qqbuy_lk").mouseout(function() {
               $(this).next(".goods_qqbuy_tips").addClass("hide");
          });
     }
}
YX.Search.hotComm = function() {
     var domName = "topCommendGoods";
     var dom = $id(domName);
     if (!dom) {
          return null;
     }
     var url = "http://s6.smart.yixun.com/w/tf/gettfxbypid?type=jsonp&callback=YXSearchHotCommCB1&tcdn=1";
     var aojsonUrl = "http://searchex.yixun.com/aojson?callback=YXSearchHotCommCB2&sysno=";
     var params = YX.Search.params;
     var global = YX.Search.global;
     var c3id = parseInt(params.c3id) + 1000000;
     var commNum = 10;
     var showNum = 3;
     var cList = [];
     var pd = 0,
          sd = 0,
          ext = 0;
     if (c3id && params.keyword == "" && parseInt(params.landingPage) != 1) {
          $loadScript({
               url: url + "&poolparam=" + c3id + ":" + commNum + ":0:2003:1019",
               charset: 'utf-8'
          });
     }
     window["YXSearchHotCommCB1"] = function(o) {
          if (!o) {
               return;
          }
          if (o.iRet != 0) {
               return;
          }
          if (!o.data) {
               return;
          }
          var list = o.data[c3id];
          if (!list) {
               return;
          }
          cList = list;
          var tmpSysNoArr = [];
          for (var i = 0, len = cList.length; i < len; i++) {
               var tmpSysNo = cList[i]["COMMODITYID"];
               if (tmpSysNo) {
                    tmpSysNoArr.push(tmpSysNo);
               }
          }
          if (tmpSysNoArr.length > 0) {
               $loadScript(aojsonUrl + tmpSysNoArr.join(":"));
          }
     };
     window["YXSearchHotCommCB2"] = function(o) {
          if (!o) {
               return null;
          }
          if (!o.list) {
               return null;
          }
          if (o.list.length <= 0) {
               return null;
          }
          var list = o.list;
          for (var i = 0, len = cList.length; i < len; i++) {
               var curSysNo = cList[i]["COMMODITYID"];
               for (var j = 0, len1 = list.length; j < len1; j++) {
                    var curItem = list[j];
                    if (curItem["sysNo"] == curSysNo) {
                         if (cList[i]["PROMOTEPRICE"] != (parseInt(curItem["price"]) / 100).toFixed(2)) {
                              pd = 1;
                         }
                         if ((cList[i]["INVENTORY"] == 0 && curItem["onlineQty"] > 0) || (cList[i]["INVENTORY"] > 0 && curItem["onlineQty"] <= 0)) {
                              sd = 1;
                         }
                         cList[i]["PRICE"] = curItem["price"];
                         cList[i]["INVENTORY"] = curItem["onlineQty"];
                         break;
                    }
               }
               if (j == len1) {
                    cList[i] = null;
                    ext = 1;
               }
          }
          if (pd >= 0 || sd >= 0 || ext >= 0) {
               var navid = params.c3id,
                    spvid = params.spvid;
               var appUrl = "http://app.searchex.yixun.com/js?type=hotcomm&pd=" + pd + "&sd=" + sd + "&ext=" + ext + "&navid=" + navid + "&spvid=" + spvid;
               $report(appUrl);
          }
          var tmpCList = cList;
          cList = [];
          for (var k = 0, len2 = tmpCList.length; k < len2; k++) {
               if (tmpCList[k]) {
                    cList.push(tmpCList[k]);
               }
          }
          var pageId = global.pageId,
               modYtagId = "310";
          var modId = "2003",
               commIdArr = [],
               priceArr = [];
          var areaCode = YX.Search.cookie.areaCode;
          var tpl = '<div class="hotsale_hd">\
      <h3 class="hotsale_tit">热卖商品推荐</h3>\
     </div>\
     <div class="hotsale_bd">\
      <div class="hotsale_goods">\
       <ul class="hotsale_goods_ul">\
        {#itemList#}\
       </ul>\
      </div>\
     </div>';
          var tplLi = '<li class="hotsale_goods_li" commid="{#sysNo#}" clsid="" stockstate="{#stockstate#}" commplatform="3">\
      <div class="mod_goods mod_goods_w120">\
       <div class="mod_goods_img">\
        <a rg="2003_{#pos1#}_1" ytag="{#ytag0#}0" class="img_wrap" href="{#link#}" target="_blank" title="{#title#}"><img src="{#img120#}"></a>\
       </div>\
       <div class="mod_goods_info">\
        <p class="mod_goods_tit"><a rg="2003_{#pos1#}_2" ytag="{#ytag0#}1"  href="{#link#}" target="_blank" title="{#title#}">{#title#}</a></p>\
        <p class="mod_goods_promo" title="{#word#}">{#word#}</p>\
        <p class="mod_goods_price">{#price#}</p>\
        <div class="hotsale_btn">{#stockBtn#}</div>\
       </div>\
      </div>\
     </li>';
          if (cList.length > 0) {
               var liArr = [],
                    tmpHtml;
               for (var i = 0, l = cList.length; i < l; i++) {
                    var item = cList[i];
                    var picUrl = getPicByUrl(item["IMG"], "120");
                    var tmpObj = {
                         "pos": i,
                         "pos1": i + 1,
                         "sysNo": item["COMMODITYID"],
                         "link": item["URL"],
                         "img120": picUrl ? picUrl : getPicUrl(item["GROUPID"], "120"),
                         "title": item["TITLE"],
                         "word": "",
                         "price": "<span class='mod_price'><i>￥</i><span>" + (parseInt(item["PRICE"]) / 100).toFixed(2) + "</span></span>"
                    };
                    tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                    tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                    if (parseInt(item["INVENTORY"]) > 0) {
                         tmpObj["stockstate"] = "1";
                         tmpObj["stockBtn"] = '<a rg="2003_' + tmpObj["pos1"] + '_5" class="hotsale_buy" target="_blank" ytag="' + tmpObj["ytag0"] + '3" href="http://buy.yixun.com/cart.html?pid=' + tmpObj["sysNo"] + '&pnum=1&price_id=1">加入购物车</a>';
                         if (item["EXTDATA"]) {
                              if (item["EXTDATA"].indexOf("{") < 0) {
                                   item["EXTDATA"] = "{" + item["EXTDATA"] + "}";
                              }
                         }
                         var commentObj = (new Function('return' + item["EXTDATA"]))();
                         if (commentObj) {
                              if (commentObj["comments"] > 0) {
                                   tmpObj["comment"] = '评论 ：<span class="icon_star"><b style="width:' + (parseInt(commentObj["star"]) / 5) * 100 + '%"></b></span>\
     (<a rg="2003_' + tmpObj["pos1"] + '_3" ytag="' + tmpObj["ytag0"] + '2" href="' + tmpObj["link"] + '#review_box" target="_blank">' + commentObj["comments"] + '条</a>)';
                              } else {
                                   tmpObj["comment"] = '暂无评论 (<a rg="2003_' + tmpObj["pos1"] + '_4" ytag="' + tmpObj["ytag0"] + '2" href="http://item.icson.com/review-toadddiscussion-' + tmpObj["sysNo"] + '.html" target="_blank">我来第一个评论</a>)';
                              }
                         }
                         if (item["PROMOTE"]) {
                              if (item["PROMOTE"].indexOf("{") == 0 && item["PROMOTE"].lastIndexOf("}") == (item["PROMOTE"].length - 1)) {
                                   var promoteObj = (new Function('return' + item["PROMOTE"]))();
                                   if (promoteObj) {
                                        tmpObj["word"] = promoteObj[areaCode] ? promoteObj[areaCode] : "";
                                   }
                              } else if (item["PROMOTE"].indexOf("{") < 0) {
                                   tmpObj["word"] = item["PROMOTE"];
                              }
                         }
                         commIdArr.push(tmpObj["sysNo"]);
                         priceArr.push(item["PRICE"]);
                         liArr.push(strReplace(tplLi, tmpObj));
                         if (liArr.length >= showNum) {
                              break;
                         }
                    }
               }
               if (liArr.length == showNum) {
                    tmpHtml = tpl.replace("{#itemList#}", liArr.join(""));
                    dom.innerHTML = $xss(tmpHtml, "none");
                    dom.className = dom.className.replace(/( hide)/ig, "");
                    YX.Search.cart(domName, "hotsale_buy");
                    YXSearchlogStat.asyncLog({
                         regionID1: modId,
                         commExpose: getCommClsId(dom, ".hotsale_goods_li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
                    });
               } else if (liArr.length > 0 && liArr.length < showNum) {
                    var searchJsonUrl = "http://" + params.domain + "/json?srcid=1385456564&callback=YXSearchHotCommCB3&pagesize=6&sort=1&desc=1&areacode=" + YX.Search.cookie.areaCode;
                    try {
                         if (priceArr.length > 0) {
                              var sum = 0;
                              for (var k = 0, len = priceArr.length; k < len; k++) {
                                   sum += parseInt(priceArr[k]);
                              }
                              var beginPrice = (sum / len) * 0.8;
                              var endPrice = (sum / len) * 1.2;
                              $loadScript(searchJsonUrl + "&path=" + params.c3id + "&price=" + beginPrice + "t" + endPrice);
                         } else {
                              $loadScript(searchJsonUrl + "&path=" + params.c3id);
                         }
                    } catch (e) {};
                    window["YXSearchHotCommCB3"] = function(o) {
                         if (!o) {
                              return;
                         }
                         if (!o.list) {
                              return;
                         }
                         if (o.list && o.list.length == 0) {
                              return;
                         }
                         var list = o["list"];
                         for (var i = 0, len = list.length; i < len; i++) {
                              var curItem = list[i];
                              var tmpPicUrl = getPicByUrl(curItem["picUrl"], "120");
                              if ($inArray(curItem["sysNo"], commIdArr) < 0) {
                                   var tmpObj = {
                                        "pos": liArr.length + i,
                                        "pos1": liArr.length + i + 1,
                                        "sysNo": curItem["sysNo"],
                                        "link": curItem["goodsUrl"],
                                        "img120": tmpPicUrl ? tmpPicUrl : getPicUrl(curItem["productID"], "120"),
                                        "title": curItem["productTitle"],
                                        "word": curItem["promotionDesc"] ? curItem["promotionDesc"] : "",
                                        "price": "<span class='mod_price'><i>￥</i><span>" + (parseInt(curItem["price"]) / 100).toFixed(2) + "</span></span>"
                                   };
                                   tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                                   tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                                   if (parseInt(curItem["onlineQty"]) > 0) {
                                        tmpObj["stockstate"] = "1";
                                        tmpObj["stockBtn"] = '<a rg="2003_' + tmpObj["pos1"] + '_5" class="hotsale_buy" target="_blank" ytag="' + tmpObj["ytag0"] + '3" href="http://buy.yixun.com/cart.html?pid=' + tmpObj["sysNo"] + '&pnum=1&price_id=1">加入购物车</a>';
                                        if (curItem["evaluationNum"] > 0) {
                                             tmpObj["comment"] = '评论 ：<span class="icon_star"><b style="width:' + (parseInt(curItem["gradeNum"])) * 2 + '%"></b></span>\
        (<a rg="2003_' + tmpObj["pos1"] + '_3" ytag="' + tmpObj["ytag0"] + '2" href="' + tmpObj["link"] + '#review_box" target="_blank">' + curItem["evaluationNum"] + '条</a>)';
                                        } else {
                                             tmpObj["comment"] = '暂无评论 (<a rg="2003_' + tmpObj["pos1"] + '_4" ytag="' + tmpObj["ytag0"] + '2" href="http://item.icson.com/review-toadddiscussion-' + tmpObj["sysNo"] + '.html" target="_blank">我来第一个评论</a>)';
                                        }
                                        liArr.push(strReplace(tplLi, tmpObj));
                                        if (liArr.length >= showNum) {
                                             break;
                                        }
                                   }
                              }
                         }
                         if (liArr.length == showNum) {
                              tmpHtml = tpl.replace("{#itemList#}", liArr.join(""));
                              dom.innerHTML = $xss(tmpHtml, "none");
                              dom.className = dom.className.replace(/( hide)/ig, "");
                              YX.Search.cart(domName, "hotsale_buy");
                              YXSearchlogStat.asyncLog({
                                   regionID1: modId,
                                   commExpose: getCommClsId(dom, ".hotsale_goods_li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
                              });
                         }
                    };
               }
          }
     }
};

function makeModCommIdStr(modId, commIdArr) {
     if (modId) {
          if (commIdArr.length > 0) {
               var tmpIdStr = commIdArr.join(",");
          }
          return modId + ";" + tmpIdStr;
     }
}
YX.Search.nullNav = function() {
     $.getScript("http://static.gtimg.com/js/version/2014/01/yx.search.navMap.20140107.js?t=20140107170443");
}
YX.Search.searchError = function(correrKey) {
     var params = YX.Search.params;
     var keyword = params.originalKeyword ? params.originalKeyword : params.keyword;
     var areacode = YX.Search.cookie.areaCode;
     var totalNum = params.totalNum;
     var dom = $id("resultTip");
     var correrKey = correrKey ? correrKey : "";
     var siteMap = {
          "1": "上海站",
          "1001": "深圳站",
          "2001": "北京站",
          "3001": "武汉站",
          "4001": "重庆站",
          "5001": "西安站"
     };
     if (!dom || totalNum > 0) {
          return;
     }
     var c3id = params.c3id;
     if (correrKey) {
          var tpl = '<div class="mod_hint_inner">\
      <p class="sblank_row">\
       <i class="ico_info_mini"></i><span class="sblank_txt">您是不是在找："<b>{#tmpTipWord#}</b>"</span>\
      </p>\
     </div>';
          var tmpTipWord = correrKey;
          dom.innerHTML = $xss(tpl.replace("{#tmpTipWord#}", tmpTipWord), "none");
          dom.className = "mod_hint sblank_mini";
     } else {
          if (keyword || c3id) {
               var tpl = '<div class="mod_hint_inner">\
      <p class="sblank_row">\
       <i class="ico_info_small"></i><span class="sblank_txt">{#tmpTipWord#}</span>\
      </p>\
     </div>';
               if (dom && totalNum <= 0) {
                    var tmpTipWord = "抱歉，在易迅网" + siteMap['' + areacode + ''] + "中没有找到相关的商品！";
                    if (keyword) {
                         tmpTipWord = "抱歉，在易迅网" + siteMap['' + areacode + ''] + "中没有找到与<b>" + $xss(keyword, 'html') + "</b>相关的商品！";
                    }
                    dom.innerHTML = $xss(tpl.replace("{#tmpTipWord#}", tmpTipWord), "none");
                    dom.className = dom.className.replace(/( hide)/ig, "");
               }
          }
     }
};
YX.Search.qqShop = function() {
     var dom = $id("qqShopGoods");
     var url = "http://sse1.paipai.com/comm_json?dtype=jsonp&callback=YXSearchQQShopCB&Property=256";
     var global = YX.Search.global;
     var params = YX.Search.params;
     if (dom) {
          if (YX.Search.params.totalNum < 8) {
               var pageSize = global.sw == 0 ? 8 : 10;
               var keyword = params.originalKeyword ? params.originalKeyword : params.keyword;
               if (keyword) {
                    try {
                         $loadScript({
                              url: url + "&PageSize=" + pageSize + "&KeyWord=" + encodeURIComponent(keyword) + "&charset=utf-8",
                              charset: 'utf-8'
                         });
                    } catch (e) {}
               }
          }
     }
     window["YXSearchQQShopCB"] = function(o) {
          if (o.data.totalNum < pageSize) {
               if (YX.Search.params.totalNum == 0) {
                    YX.Search.nullNav();
               }
               return;
          }
          var pageId = global.pageId,
               modYtagId = "380";
          var modId = "2008",
               commIdArr = [];
          var tpl = '<div class="qqbuy_hd">\
       <h3 class="qqbuy_tit">\
        我们为您在<span></span>找到相关的商品\
       </h3>\
       <span class="qqbuy_slogan">官方认证商家，7天包退</span>\
       <a ytag="38000" href="http://buy.qq.com/search.shtml?PTAG=20155.1.1&kw=' + encodeURIComponent(keyword) + '" class="qqbuy_more" target="_blank">更多QQ网购商品&gt;&gt;</a>\
      </div>\
      <div class="qqbuy_bd">\
       <div class="qqbuy_goods">\
        <ul>{#itemList#}</ul>\
       </div>\
      </div>';
          var tplLi = '<li commid="{#commId#}" clsid="" stockstate="" commpoint="" commplatform="2" index="{#pos#}">\
      <div class="mod_goods">\
       <div class="mod_goods_img">\
        <a rg="2008_{#pos1#}_1" ytag="{#ytag0#}1"target="_blank" href="{#link#}?ptag=20155.1.1"><img init_src="{#img160#}" alt="{#title#}"></a>\
       </div>\
       <div class="mod_goods_info">\
        <p class="mod_goods_tit"><a  rg="2008_{#pos1#}_2" ytag="{#ytag0#}2" target="_blank" href="{#link#}?WGTAG=1000.24.3.1" title="{#title#}">{#title#}</a></p>\
        <p class="mod_goods_price"><span class="mod_price"><i>￥</i><span>{#price#}</span></span></p>\
       </div>\
      </div>\
     </li>';
          if (dom) {
               var list = o.data.list;
               var liArr = [];
               for (var i = 0, l = list.length; i < l; i++) {
                    var item = list[i];
                    var tmpObj = {
                         pos: i,
                         pos1: i + 1,
                         commId: item["commId"],
                         link: item["link"],
                         img160: item["img160"],
                         price: item["price"],
                         title: item["title"]
                    };
                    tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                    tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                    commIdArr.push(tmpObj["commId"]);
                    liArr.push(strReplace(tplLi, tmpObj));
                    if (liArr.length >= pageSize) {
                         break;
                    }
               }
               dom.innerHTML = $xss(tpl.replace(/{#itemList#}/, liArr.join("")), "none");
               dom.className = dom.className.replace(/( hide)/ig, "");
               $autoLoadImages();
               YXSearchlogStat.asyncLog({
                    regionID1: modId,
                    commExpose: getCommClsId(dom, "li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
               });
          }
     };
};
YX.Search.tuan = function() {
     var domName = "tuanGoods";
     var dom = $id(domName);
     var global = YX.Search.global;
     var params = YX.Search.params;
     var url = "http://list.api.yixun.com/json.php?mod=tuan&act=page&callback=YXSearchTuanCB";
     if (dom) {
          if (params.keyword == "" && params.c3id) {
               $loadScript({
                    "url": url + "&metaid=" + params.c3id
               });
          }
     }
     window["YXSearchTuanCB"] = function(o) {
          if (o.errno != 0) {
               return;
          }
          if (!o.data) {
               return;
          }
          if (!o.data.current) {
               return;
          }
          var pageId = global.pageId,
               modYtagId = "320";
          var modId = "2004",
               commIdArr = [];
          var maxNum = 3;
          var tplC = '<div class="tuan_hd">\
      <h3 class="tuan_tit">本期团购</h3>\
      <div class="tuan_time" id="i_tuan_clock">\
      </div>\
     </div>\
     <div class="tuan_bd">\
      <div class="tuan_goods">\
       <ul>{#tuanList#}</ul>\
      </div>\
      <div class="tuan_more">\
       <a rg="2004_1001" target="_blank" href="http://tuan.yixun.com" class="tuan_more_lk" ytag="32002">更多团购商品&gt;&gt;</a>\
      </div>\
     </div>';
          var tplLiC = '<li class="tuan_goods_li" commid="{#sysNo#}" clsid="" stockstate="" commpoint="" commplatform="3">\
     <div class="mod_goods">\
      <div class="mod_goods_img">\
       <a rg="2004_{#pos1#}_1" ytag="{#ytag0#}0"  href="{#link#}"  target="_blank"><img src="{#img160#}" alt="{#title#}" title="{#title#}" onerror="this.src=\'http://static.gtimg.com/icson/images/detail/v2/160.jpg\'">{#mark#}</a>\
      </div>\
      <div class="mod_goods_info">\
       <p class="mod_goods_promo" title="{#word#}">{#word#}</p>\
       <p class="mod_goods_tit"><a rg="2004_{#pos1#}_2" ytag="{#ytag0#}1" href="{#link#}" target="_blank" title="{#title#}">{#title#}</a></p>\
       <p class="mod_goods_price">{#price#}</p>\
       <p class="tuan_goods_num">\
        <span class="tuan_goods_people"><b>{#saleCount#}</b>人已买</span>\
        <span class="mod_goods_stock"><em>库存</em>{#stockBar#}</span>\
       </p>\
       <div class="tuan_goods_btn">\
        {#btnType#}\
       </div>\
      </div>\
     </div>\
     </li>';
          if (dom) {
               if (o.errno == 0) {
                    var tuanType, list = [],
                         begin, end, now = parseInt(o.data.now) * 1000;
                    var data = o.data.current;
                    if (data) {
                         tuanType = "current";
                         list = data.list;
                         begin = parseInt(data.begin) * 1000;
                         end = parseInt(data.end) * 1000;
                    }
                    if (list.length > 0) {
                         var liArr = [],
                              tmpHtml = "";
                         maxNum = list.length > maxNum ? maxNum : list.length;
                         for (var i = 0, l = maxNum; i < l; i++) {
                              var item = list[i];
                              var tmpPicUrl = item["img"] ? getPicByUrl(item["img"], "120") : "";
                              var tmpIdArr = item["product_char_id"].split("-");
                              item['snap_price'] = item['snap_price'] / 100;
                              item['show_price'] = item['show_price'] / 100;
                              var tmpObj = {
                                   "pos": i,
                                   "pos1": i + 1,
                                   "pageId": pageId,
                                   "c3id": params.c3id,
                                   "link": item["url"],
                                   "img160": tmpPicUrl ? tmpPicUrl : getPicUrl(item["product_char_id"], "120"),
                                   "title": item["name"],
                                   "mark": "",
                                   "word": item["word"] ? item["word"] : "",
                                   "price": '<span class="mod_price"><i>￥</i><span>' + item['show_price'] + '</span></span><span class="tuan_goods_oprice"></span>',
                                   "stockBar": "",
                                   "saleCount": item["sale_count"],
                                   "btnType": "",
                                   "sysNo": item["product_id"],
                                   "want": ""
                              };
                              tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                              tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                              tmpObj['tagpre']++;
                              if (tuanType == "current") {
                                   var tmpZhe = parseInt((item['show_price'] * 100 / item['snap_price']), 10) / 10;
                                   if (tmpZhe < 10) {
                                        tmpZhe = tmpZhe.toString().replace(/^(\d)(\.?)/, '<span>$1</span>$2');
                                        tmpObj["mark"] = '<i class="mark_tuangou">' + tmpZhe + '折</i>';
                                        tmpObj["price"] = '<span class="mod_price"><i>￥</i><span>' + item['show_price'] + '</span></span><span class="tuan_goods_oprice"><i>￥</i><span>' + item['snap_price'] + '</span></span>';
                                   }
                                   if (now < begin) {
                                        tmpObj["stockBar"] = '<span class="stock_enough"><span class="stock_enough_inner" style="width:100%;"></span></span>';
                                        tmpObj["btnType"] = '<a target="_blank" rg="2004_' + tmpObj["pos1"] + '_10" ytag="' + tmpObj["ytag0"] + '0" href="http://buy.yixun.com/cart.html?pid=' + tmpObj["sysNo"] + '&pnum=1&price_id=1" onclick="return false" target="_blank" class="tuan_goods_buy">加入购物车</a>';
                                   } else if (now > end || !item['online_qty']) {
                                        tmpObj["stockBar"] = '<span class="stock_zero"><span class="stock_zero_inner" style="width:0;"></span></span>';
                                        tmpObj["btnType"] = '<a rg="2004_' + tmpObj["pos1"] + '_11" ytag="' + tmpObj["ytag0"] + '0" href="' + item["url"] + '" target="_blank" class="tuan_goods_buy_disabled">已抢完</a>';
                                   } else {
                                        tmpObj["stockBar"] = getStockHTML(item["old_qty"], item["online_qty"]);
                                        tmpObj["btnType"] = '<a target="_blank" rg="2004_' + tmpObj["pos1"] + '_10"  ytag="' + tmpObj["ytag0"] + '0" href="http://buy.yixun.com/cart.html?pid=' + tmpObj["sysNo"] + '&pnum=1&price_id=1" class="tuan_goods_buy">立即参团</a>';
                                   }
                                   liArr.push(strReplace(tplLiC, tmpObj));
                              }
                              commIdArr.push(tmpObj["sysNo"]);
                         }
                         if (liArr.length > 0) {
                              if (tuanType == "current") {
                                   tmpHtml = tplC.replace(/{#tuanList#}/g, liArr.join(""));
                                   tmpHtml = tmpHtml.replace(/{#status#}/g, now < begin ? '<span>下期预告</span>' : '<span>进行中</span>');
                                   dom.innerHTML = $xss(tmpHtml, "none");
                                   dom.className = dom.className.replace(/( hide)/ig, "");
                                   setClock({
                                        "now": now,
                                        "end": end,
                                        tpl: "<span>剩余：</span><b>{#hour#}</b><span>时</span><b>{#minute#}</b><span>分</span><b>{#second#}</b><span>秒</span>",
                                        "Dom": $id("i_tuan_clock")
                                   });
                              }
                              $autoLoadImages();
                              YX.Search.cart(domName, "tuan_goods_buy");
                              YXSearchlogStat.asyncLog({
                                   regionID1: modId,
                                   commExpose: getCommClsId(dom, ".tuan_goods_li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
                              });
                         }
                    }
               }
          }
     };
};
YX.Search.hotSell = function() {
     var dom = $id("hotSell");
     if (!dom) {
          return null;
     }
     var params = YX.Search.params;
     var global = YX.Search.global;
     var url = "http://" + params.domain + "/json?srcid=1385456493&callback=YXSearchHotSellCB&pagesize=5&sort=1&desc=1&sf=1&areacode=" + YX.Search.cookie.areaCode;
     if (parseInt(params.c3id)) {
          try {
               if (params.hotSaleBeginPrice || params.hotSaleEndPrice) {
                    var price = params.hotSaleBeginPrice + "t" + params.hotSaleEndPrice;
                    $loadScript(url + "&path=" + params.c3id + "&price=" + price);
               } else {
                    $loadScript(url + "&path=" + params.c3id);
               }
          } catch (e) {}
     }
     window["YXSearchHotSellCB"] = function(o) {
          var pageId = global.pageId,
               modYtagId = "330";
          var modId = "2005",
               commIdArr = [];
          var list = o["list"];
          var tplHS = '<div class="recommend_hd">\
      <h3 class="recommend_tit">本周热销榜</h3>\
     </div>\
     <div class="recommend_bd">\
      <div class="recommend_goods">\
       <ul>{#topList#}</ul>\
      </div>\
     </div>';
          var tplInner = '<li class="recommend_goods_li" commid="{#sysNo#}" clsid="" stockstate="" commplatform="3">\
       <div class="mod_goods mod_goods_w60">\
        <div class="mod_goods_img">\
         <a  rg="2005_{#pos1#}_1" class="img" ytag="{#ytag0#}0" href="{#link#}" target="_blank" title="{#title#}">\
                      <img width="60" height="60" init_src="{#img60#}"><span class="recommend_goods_rank">{#pos1#}</span></a>\
        </div>\
        <div class="mod_goods_info">\
         <p class="mod_goods_tit">\
          <a rg="2005_{#pos1#}_2" ytag="{#ytag0#}1" href="{#link#}" target="_blank" title="{#title#}">{#title#}</a>\
         </p>\
         <p class="mod_goods_price">{#price#}</p>\
        </div>\
       </div>\
      </li>';
          var num = 5;
          if (list) {
               if (list.length > 0) {
                    var liArr = [],
                         tmpHtml;
                    num = list.length < num ? list.length : num;
                    var _i = 0;
                    for (var i = 0, l = num; i < l; i++) {
                         var item = list[i];
                         if (item["onlineQty"] > 0) {
                              var tmpPiUrl = getPicByUrl(item["picUrl"], "60");
                              var tmpObj = {
                                   "pos": _i,
                                   "pos1": _i + 1,
                                   "sysNo": item["sysNo"],
                                   "link": "http://item.yixun.com/item-" + item["sysNo"] + ".html",
                                   "img60": tmpPiUrl ? tmpPiUrl : getPicUrl(item["productID"], "60"),
                                   "title": item["productTitle"],
                                   "price": '<span class="mod_price"><i>￥</i><span>' + (parseInt(item["price"]) / 100).toFixed(2) + '</span></span>'
                              };
                              tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                              tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                              commIdArr.push(tmpObj["sysNo"]);
                              liArr.push(strReplace(tplInner, tmpObj));
                              _i++;
                         }
                    }
                    if (liArr.length > 0) {
                         tmpHtml = tplHS.replace(/{#topList#}/, liArr.join(""));
                         dom.innerHTML = $xss(tmpHtml, "none");
                         dom.className = dom.className.replace(/( hide)/ig, "");
                         $autoLoadImages();
                         YXSearchlogStat.asyncLog({
                              regionID1: modId,
                              commExpose: getCommClsId(dom, "li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
                         });
                    }
               }
          }
     };
};
YX.Search.viewed = function() {
     var domOut = $id("viewedGoods");
     var dom = $id("viewedItemList");
     var global = YX.Search.global;
     var params = YX.Search.params;
     var url = "http://s6.smart.yixun.com/w/tf/gettfx?tfid=100004&type=jsonp&callback=viewedGoodsCB&tcdn=1";
     if (domOut && dom) {
          try {
               $loadScript(url);
          } catch (e) {}
     } else {
          dom.innerHTML = $xss("<div class='recommend_blank'>你还没有浏览过任何商品。</div>", "none");
          domOut.className = domOut.className.replace(/( hide)/ig, "");
     }
     window["viewedGoodsCB"] = function(o) {
          if (!o) {
               dom.innerHTML = $xss("<div class='recommend_blank'>你还没有浏览过任何商品。</div>", "none");
               domOut.className = domOut.className.replace(/( hide)/ig, "");
               return;
          }
          if (!o.data) {
               dom.innerHTML = $xss("<div class='recommend_blank'>你还没有浏览过任何商品。</div>", "none");
               domOut.className = domOut.className.replace(/( hide)/ig, "");
               return;
          }
          if (!o.data.POS_HISTORY) {
               dom.innerHTML = $xss("<div class='recommend_blank'>你还没有浏览过任何商品。</div>", "none");
               domOut.className = domOut.className.replace(/( hide)/ig, "");
               return;
          }
          var pageId = global.pageId,
               modYtagId = "340";
          var modId = "2006",
               commIdArr = [];
          var list = o.data.POS_HISTORY;
          var maxNum = list.length <= 5 ? list.length : 5;
          var tplHS = '<ul>{#viewedList#}</ul>';
          var tplInner = '<li class="recommend_goods_li" commid="{#sysNo#}" clsid="" stockstate="" commplatform="3">\
       <div class="mod_goods mod_goods_w60">\
        <div class="mod_goods_img">\
         <a  title="{#title#}" rg="2006_{#pos1#}_1" class="img" ytag="{#ytag0#}0" href="{#link#}" target="_blank">\
                      <img init_src="{#img60#}" onerror="this.src=\'http://static.gtimg.com/icson/images/detail/v2/60.jpg\'"></a>\
        </div>\
        <div class="mod_goods_info">\
         <p class="mod_goods_tit">\
          <a title="{#title#}" rg="2006_{#pos1#}_2" ytag="{#ytag0#}1" href="{#link#}" target="_blank">{#title#}</a>\
         </p>\
         <p class="mod_goods_price">{#price#}</p>\
        </div>\
       </div>\
      </li>';
          if (dom) {
               if (maxNum > 0) {
                    if (list.length > 0) {
                         var liArr = [],
                              tmpHtml;
                         for (var i = 0, l = maxNum; i < l; i++) {
                              var item = list[i];
                              var tmpPiUrl = getPicByUrl(item["IMG"], "60");
                              var tmpObj = {
                                   "pos": i,
                                   "pos1": i + 1,
                                   "sysNo": item["COMMODITYID"],
                                   "link": "http://item.yixun.com/item-" + item["COMMODITYID"] + ".html",
                                   "img60": tmpPiUrl ? tmpPiUrl : getPicUrl(item["PRODUCTCODE"], "60"),
                                   "title": item["TITLE"],
                                   "price": "<span><i>￥</i>" + item["PRICE"] + "</span>"
                              };
                              tmpObj["ytag0"] = modYtagId + tmpObj["pos"];
                              tmpObj["ytag"] = pageId + tmpObj["ytag0"];
                              commIdArr.push(tmpObj["sysNo"]);
                              liArr.push(strReplace(tplInner, tmpObj));
                         }
                         if (liArr.length > 0) {
                              tmpHtml = tplHS.replace(/{#viewedList#}/, liArr.join(""));
                              dom.innerHTML = $xss(tmpHtml, "none");
                              domOut.className = domOut.className.replace(/( hide)/ig, "");
                              $autoLoadImages();
                              YXSearchlogStat.asyncLog({
                                   regionID1: modId,
                                   commExpose: getCommClsId(dom, "li", ["commid", "clsid", "commpoint", "commplatform", "stockstate"])
                              });
                         }
                    }
               } else {
                    dom.innerHTML = $xss("<div class='recommend_blank'>你还没有浏览过任何商品。</div>", "none");
                    domOut.className = domOut.className.replace(/( hide)/ig, "");
               }
          }
     };
};
YX.Search.ECCPVreport = function() {
     var params = YX.Search.params;
     var global = YX.Search.global;
     var asyncObjArr = global.asyncObjArr;
     var pvObj = {
          p: "search.51buy.com",
          regionID1: "2002",
          srcid: YXSearchlogStat.getSrcId(),
          siteid: YX.Search.cookie.areaCode ? YX.Search.cookie.areaCode : "",
          spvid: params.spvid ? params.spvid : "",
          uid: $getCookie("uid") ? $getCookie("uid") : "",
          as: params.as ? params.as : "0",
          hitNum: params.totalNum ? params.totalNum : "",
          defCommNum: params.pageSize ? params.pageSize : "",
          defRowCommNum: params.rowNum ? params.rowNum : "",
          curPage: params.pageNum ? params.pageNum : "",
          commExpose: "",
          inputWord: params.originalKeyword ? params.originalKeyword : "",
          recommWord: params.originalKeyword ? params.keyword : "",
          hotClassID: params.hotClassID ? params.hotClassID : "",
          hotNavID: params.hotNavID ? params.hotNavID : "",
          extraMsg: ""
     };
     var prid = $getCookie("prid") ? $getCookie("prid") : "";
     if (prid !== "") {
          pvObj.extraMsg = prid.split("_")[0];
     }
     params.pvid = ECC.cloud.report.data.pvid ? ECC.cloud.report.data.pvid : "";
     if (params.totalNum > 0) {
          var mainCommIdArr = getCommClsId($id("itemList"), ".goods_li");
          if (mainCommIdArr.length > 0) {
               pvObj.commExpose = mainCommIdArr.join(",");
          }
     }
     try {
          YXSearchlogStat.initStat();
          YX.Search.report();
          ECC.cloud.report.pv(pvObj);
          if (asyncObjArr.length > 0) {
               for (var i = 0, len = asyncObjArr.length; i < len; i++) {
                    if (asyncObjArr[i]) {
                         YXSearchlogStat.asyncLog(asyncObjArr[i]);
                    }
               }
          }
          if (params.landingPage) {
               YX.Search.LandPageReport();
          }
          if ($id("searchBanner")) {
               YX.Search.BannerReport();
          }
     } catch (e) {}
};
YX.Search.LandPageReport = function() {
     var modId = "2020";
     var dom = $attr("class", "d_mod_mini", $id("container"))[0];
     var params = YX.Search.params;
     var landPageShowed = params.landingPage;
     var commId = "";
     if (landPageShowed == "1" && dom) {
          commId = params.lp;
          if (commId) {
               YXSearchlogStat.asyncLog({
                    regionID1: modId,
                    commExpose: commId + "___3_1"
               });
               $addEvent(dom, "click", function(e) {
                    var e = $getTarget(e);
                    if (e.tagName == "A" || e.parentNode.tagName == "A") {
                         YXSearchlogStat.clickLog({
                              regionID1: modId,
                              commClick: commId + "___3_1"
                         });
                    }
               });
          }
     }
};
YX.Search.BannerReport = function() {
     var modId = "2021";
     var dom = $id("searchBanner");
     if (dom) {
          YXSearchlogStat.asyncLog({
               regionID1: modId
          });
     }
};

function getCommClsId(dom, tagName, attrArr) {
     if (!dom) {
          return "";
     }
     if (!tagName) {
          return "";
     }
     var result = [];
     if (attrArr == undefined) {
          attrArr = ["commid", "clsid", "commpoint", "commplatform", "stockstate"];
     }
     if (dom) {
          if (tagName.indexOf(".") < 0) {
               var o = dom.getElementsByTagName(tagName);
          } else {
               var o = $getElementsByClass(tagName.replace(/./, ""), dom);
          }
          for (var i = 0, l = o.length; i < l; i++) {
               var curo = o[i];
               var tmpArr = [];
               if (attrArr.length > 0) {
                    for (var j = 0, len = attrArr.length; j < len; j++) {
                         var curAttr = attrArr[j];
                         tmpArr.push(curo.getAttribute(curAttr) ? curo.getAttribute(curAttr) : "");
                    }
                    result.push(tmpArr.join("_"));
               }
          }
     }
     return result;
}
YX.Search.KWreport = function() {
     var reportCgi = "http://stat.51buy.com/stat.fcg?type=1&uid=1&pageid=210&tag=&url=51buy&refer=51buy&guid=serach&whid=1970&resolution=&color=&pid=&referid=&";
     var params = YX.Search.params;
     var whid = YX.Search.cookie.areaCode,
          q = params.keyword,
          qres = params.totalNum;
     var ext = "ext=whid:" + whid + "|q:" + q + "|qres:" + qres;
     try {
          $report(reportCgi + ext);
     } catch (e) {}
};
YX.Search.query = function(hash) {
     var tmpParam = [];
     var params = YX.Search.params;
     var areaCode = YX.Search.cookie.areaCode;
     var tmpPathArr = [];
     if (params.sClassid1) {
          tmpPathArr.push(params.sClassid1);
     }
     if (params.sClassid2) {
          tmpPathArr.push(params.sClassid2);
     }
     if (params.sClassid3) {
          tmpPathArr.push(params.sClassid3);
     }
     if (params.sClassid4) {
          tmpPathArr.push(params.sClassid4);
     }
     if (tmpPathArr.length > 0) {
          tmpParam.push("path=" + tmpPathArr.join("t"));
     }
     if (params.attrInfo) {
          tmpParam.push("attr=" + params.attrInfo);
     }
     if (params.keyword) {
          tmpParam.push("key=" + encodeURIComponent(params.keyword));
     }
     if (areaCode) {
          tmpParam.push("area=" + areaCode);
     }
     if (params.beginPrice) {
          tmpParam.push("beginprice=" + parseInt(params.beginPrice) * 100);
     }
     if (params.endPrice) {
          tmpParam.push("endprice=" + parseInt(params.endPrice) * 100);
     }
     if (params.orderStyle) {
          tmpParam.push("sort=" + params.orderStyle);
     }
     if (params.showType) {
          tmpParam.push("show=" + params.showType);
     }
     if (params.pageNum) {
          tmpParam.push("page=" + params.pageNum);
     }
     if (params.pageSize) {
          tmpParam.push("size=" + params.pageSize);
     }
     if (params.pf) {
          tmpParam.push("pf=" + params.pf);
     }
     if (params.today) {
          tmpParam.push("send=" + params.today);
     }
     if (params.as) {
          tmpParam.push("as=" + params.as);
     }
     if (params.charset == "utf-8") {
          tmpParam.push("charset=" + params.charset);
     }
     if (params.ytag) {
          tmpParam.push("YTAG=" + params.ytag);
     }
     if (params.lp) {
          tmpParam.push("lp=" + params.lp);
     }
     if (params.sce === 0) {
          tmpParam.push("sce=" + params.sce);
     }
     if (params.sf == 1) {
          tmpParam.push("sf=" + params.sf);
     }
     if (tmpParam.length > 0) {
          if (hash) {
               location.href = "http://" + params.domain + "/html?" + tmpParam.join("&") + "#" + hash;
          } else {
               location.href = "http://" + params.domain + "/html?" + tmpParam.join("&");
          }
     }
     return false;
};
//ok
function initDragDom(idName) {
     var doc = document;
     var oDiv = document.getElementById(idName);
     var startX = 0;
     var startY = 0;
     var startLeft = 0;
     var startTop = 0;
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
               oDiv.onmousemove = doDrag;
               oDiv.onmouseup = stopDrag;
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
}

function getPicByPic(pic, size) {
     if (size == 0) {
          var _pic = (pic + '').replace(/(jpg|gif|png|bmp)\/\d+(\?\w+)?$/, '$1/' + size + '$2');
          return _pic.replace(/qqbuy/, '51buypic');
     } else {
          return (pic + '').replace(/(jpg|gif|png|bmp)\/\d+(\?\w+)?$/, '$1/' + size + '$2');
     }
}

function getPicByUrl(pic, size) {
     var existSize = [0, 30, 60, 80, 120, 160, 200, 300, 400, 600, 800];
     var icsonExistMap = {
          "50": "ss",
          "60": "pic60",
          "80": "small",
          "120": "middle",
          "160": "pic160",
          "200": "pic200",
          "300": "mm",
          "800": "mpic"
     }
     if (pic.indexOf("icson.com") > -1) {
          existSize = [50, 60, 80, 120, 160, 200, 300, 600, 800];
     }
     var flag = false;
     for (var i = 0; i < existSize.length; i++) {
          if (size == existSize[i]) {
               flag = true;
               break;
          }
     }
     if (flag) {
          var url = "";
          if (pic.indexOf("wgimg.com") > -1) {
               url = getPicByPic(pic, size == 800 ? 0 : size);
          } else if (pic.indexOf("paipaiimg.com") > -1) {
               url = pic.replace(/(\.)\d+x\d+(\.jpg|gif|png|bmp)?$/, "$1" + (size + "x" + size) + "$2");
          } else if (pic.indexOf("icson.com") > -1) {
               url = pic.replace(/\/product\/\w+\//, "/product/" + icsonExistMap["" + size] + "/");
          }
          return url;
     } else {
          return null;
     }
}

function getPicUrl(pid, size) {
     var map = {
          "800": "mpic",
          "300": "mm",
          "120": "middle",
          "80": "small",
          "50": "ss",
          "200": "pic200",
          "160": "pic160",
          "60": "pic60"
     };
     var realPid = pid.split("R")[0];
     var tmpArr = realPid.split("-");
     if (map[size]) {
          return "http://img" + (parseInt(tmpArr) % 2 ? "1" : "2") + ".icson.com/product/" + map[size] + "/" + tmpArr[0] + "/" + tmpArr[1] + "/" + realPid + ".jpg";
     } else {
          return false;
     }
}

function getQuerySearch(paramName, Url) {
     var pValue = "";
     var curUrl = Url ? Url : location.href;
     if (!paramName) {
          return pValue;
     }
     pValue = $getQuery(paramName, curUrl);
     if (pValue) {
          return pValue;
     }
     var pathAreaAsStr = "";
     var brandStr = "";
     var otherParamStr = "";
     var paramsMap = {
          path: "",
          area: "",
          as: "",
          brand: "",
          key: "",
          otherAttr: "",
          attr: "",
          beginprice: "",
          endprice: "",
          sort: "",
          show: "",
          page: "",
          size: "",
          send: "",
          sf: "",
          lp: "",
          sce: ""
     };
     var pArr1 = curUrl.split("searchex.yixun.com");
     if (pArr1.length >= 1) {
          if (pArr1[1]) {
               var pArr2 = pArr1[1].split("/");
               if (pArr2.length >= 2) {
                    pathAreaAsStr = pArr2[1];
                    var tmpArr1 = pathAreaAsStr.split("-");
                    paramsMap.path = tmpArr1[0];
                    paramsMap.area = tmpArr1[1];
                    paramsMap.as = tmpArr1[2];
                    if (pArr2.length >= 3) {
                         brandStr = pArr2[2];
                         paramsMap.brand = (brandStr != "all") ? brandStr : "";
                         if (pArr2.length >= 4) {
                              otherParamStr = pArr2[3];
                              if (otherParamStr) {
                                   var tmpArr2 = otherParamStr.split("-");
                                   paramsMap.key = tmpArr2[0];
                                   paramsMap.otherAttr = tmpArr2[1];
                                   paramsMap.beginprice = tmpArr2[2];
                                   paramsMap.endprice = tmpArr2[3];
                                   paramsMap.sort = tmpArr2[4];
                                   paramsMap.show = tmpArr2[5];
                                   paramsMap.page = tmpArr2[6];
                                   paramsMap.size = tmpArr2[7];
                                   paramsMap.send = tmpArr2[8];
                                   paramsMap.sf = tmpArr2[9];
                                   paramsMap.lp = tmpArr2[11];
                                   paramsMap.sce = tmpArr2[12];
                              }
                         }
                         if (paramsMap.brand && paramsMap.otherAttr) {
                              paramsMap.attr = paramsMap.brand + "a" + paramsMap.otherAttr;
                         } else {
                              paramsMap.attr = paramsMap.brand || paramsMap.otherAttr;
                         }
                    }
               }
          }
     }
     if (paramsMap[paramName]) {
          pValue = paramsMap[paramName];
     }
     return pValue;
}

function setClock(o) {
     var opt = {
          now: "",
          end: "",
          tpl: "",
          Dom: "",
          isMill: true
     };
     for (var name in o) {
          opt[name] = o[name];
     }
     if (!opt.now || !opt.end || !opt.Dom) {
          return;
     }
     var now = new Date(opt.now),
          offset = new Date().getTime() - opt.now,
          end = new Date(parseInt(opt.end, 10));

     function _timer() {
          var ret = {}, now = new Date().getTime() - offset,
               distance = parseInt(end - now, 10);
          if (distance <= 0) {
               clearInterval(qianggouTimer);
               return;
          }
          var _time_config = ['mill', 'second', 'minute', 'hour'];
          for (var i in _time_config) {
               var unit = (i == 0 ? 1000 : (i == 3 ? 24 : 60));
               ret[_time_config[i]] = distance % unit;
               distance = parseInt(distance / unit, 10)
          }
          _time_config[4] = 'day';
          ret[_time_config[4]] = distance;
          var str = '';
          _time_label_config = ['毫秒', '秒', '分', '时', '天'];
          for (var len = _time_label_config.length, i = len - 1; i > 0; i--) {
               var key = _time_config[i];
               if (i === (len - 1) && !ret[key]) continue;
               if (i !== (len - 1)) {
                    ret[key] = ret[key] < 10 ? ('0' + ret[key].toString()) : ret[key];
                    if (i === 1 && opt.isMill) {
                         ret[key] += '.' + (parseInt(ret['mill'] / 100, 10));
                    }
               }
               if (!opt.tpl) {
                    str += '<span>' + ret[key] + '</span>' +  _time_label_config[i];
               } else {
                    str = strReplace(opt.tpl, ret);
               }
          }
          opt.Dom.innerHTML = str;
     }
     qianggouTimer = setInterval(_timer, 50);
}

function getStockHTML(oldQty, onlineQty) {
     onlineQty = onlineQty > oldQty ? oldQty : onlineQty;
     stockHTML = '';
     stockResult = (onlineQty == 0 ? 0 : (parseInt((onlineQty * 100) / oldQty, 10)));
     if (stockResult === 0) {
          stockHTML = '<span><i class="mod_goods_stock_bg1" style="width:0"></i></span>';
     } else if (stockResult < 30) {
          stockResult = (stockResult >= 10 ? 10 : 1);
          stockHTML = '<span><i class="mod_goods_stock_bg1" style="width:' + stockResult + '%"></i></span>';
     } else {
          stockResult = (stockResult >= 80 ? (stockResult >= 90 ? stockResult : 80) : (stockResult >= 60 ? 60 : 30));
          stockHTML = '<span><i class="mod_goods_stock_bg2" style="width:' + stockResult + '%"></i></span>';
     }
     return stockHTML;
};

function strReplace(str, re, rt) {
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
};
YXSearchlogStat = {
     siteid: YX.Search.cookie.areaCode,
     clickParamMap: {
          "2002": {
               "domId": "itemList",
               "tagName": ".goods_li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2003": {
               "domId": "topCommendGoods",
               "tagName": ".hotsale_goods_li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2004": {
               "domId": "tuanGoods",
               "tagName": ".tuan_goods_li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2005": {
               "domId": "hotSell",
               "tagName": ".recommend_goods_li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2006": {
               "domId": "viewedGoods",
               "tagName": ".recommend_goods_li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2008": {
               "domId": "qqShopGoods",
               "tagName": "li",
               "commClick": ["commid", "clsid", "commpoint", "commplatform", "stockstate"]
          },
          "2010": {
               "refWord": "当前关键词",
               "hrefWord": "目标关键词"
          },
          "2110": {
               "refWord": "当前关键词",
               "hrefWord": "目标关键词"
          },
          "2113": {
               "refWord": "当前关键词"
          },
          "2015_1001": {
               "attrClick": "已选中属性项ID"
          },
          "2016_1001": {
               "otherClick": "_beginPrice_endPrice"
          },
          "2016_1002": {
               "otherClick": "btnType_beginPrice_endPrice"
          },
          "2016_1003": {
               "otherClick": "btnType__"
          },
          "2016_1004": {
               "otherClick": "btnType_curType_"
          },
          "2016_1005": {
               "otherClick": "用户点击排序方式_当前排序方式_备注"
          },
          "2017": {
               "navClick": "导航ID_导航名"
          },
          "2018": {
               "otherClick": "_toPage_"
          },
          "2118": {
               "otherClick": "_toPage_"
          },
          "2019": {
               "goodsCompareClick": "1"
          },
          "2021": {
               "bannerClick": "1"
          },
          "2022": {
               "topBannerClick": "1"
          },
          "2023": {
               "hrefWord": "目标关键词"
          }
     },
     getSrcId: function() {
          var map = {
               "1": "104",
               "1001": "110",
               "2001": "113",
               "3001": "142",
               "4001": "143",
               "5001": "144"
          };
          var areaCode = YX.Search.cookie.areaCode;
          if (map[areaCode]) {
               return map[areaCode];
          } else {
               return map["1"];
          }
     },
     getLog: function(e) {
          var srcEls = e.srcElement || e.target,
               tempNode;
          var global = YX.Search.global;
          var params = YX.Search.params;
          if (srcEls.getAttribute("rg")) {
               tempNode = srcEls;
          } else if (srcEls.parentNode && srcEls.parentNode.tagName == "A" && srcEls.parentNode.getAttribute("rg")) {
               tempNode = srcEls.parentNode;
          } else {
               return;
          }
          if (tempNode) {
               var clickObj = {};
               var curRgArr = tempNode.getAttribute("rg").split("_");
               var rgid1 = curRgArr[0];
               var rgid2 = curRgArr[1];
               var rgid3 = curRgArr.length >= 3 ? curRgArr[2] : "";
               clickObj["rg"] = tempNode.getAttribute("rg");
               if (YXSearchlogStat.clickParamMap[rgid1] || YXSearchlogStat.clickParamMap[rgid1 + "_" + rgid2]) {
                    if (YXSearchlogStat.clickParamMap[rgid1]) {
                         var curClick = YXSearchlogStat.clickParamMap[rgid1];
                    } else if (YXSearchlogStat.clickParamMap[rgid1 + "_" + rgid2]) {
                         var curClick = YXSearchlogStat.clickParamMap[rgid1 + "_" + rgid2];
                    }
                    if (tempNode.tagName == "A" || tempNode.tagName == "BUTTON") {
                         if (tempNode.getAttribute("href") && tempNode.getAttribute("href").indexOf("#") != 0 && !tempNode.getAttribute("href").match("javascript")) {
                              var tempUrl = tempNode.getAttribute("href");
                              if (!tempNode.getAttribute("target") || (tempNode.getAttribute("target") && !tempNode.getAttribute("target").match("blank"))) {
                                   if (tempUrl.indexOf("searchex.yixun.com") > -1) {
                                        curClick["needCookie"] = "1";
                                   } else {
                                        curClick["needCookie"] = "";
                                   }
                              }
                         }
                         if (tempNode.getAttribute("ytag")) {
                              clickObj["ytag"] = tempNode.getAttribute("ytag");
                         }
                         if (curClick["attrClick"]) {
                              clickObj["attrClick"] = tempNode.getAttribute("attrkey");
                         }
                         if (rgid1 == "2017" && curClick["navClick"]) {
                              var curPath = getQuerySearch("path", tempNode.getAttribute("href"));
                              var curNavId = "";
                              if (curPath) {
                                   var curNavIdArr = curPath.split("t");
                                   curNavId = curNavIdArr.pop();
                              }
                              var curNavName = $getInnerText(tempNode) ? $getInnerText(tempNode) : "";
                              clickObj["navClick"] = curNavId + "_" + curNavName;
                         }
                         if (rgid1 == "2016" && curClick["otherClick"]) {
                              if (rgid2 == "1001") {
                                   var curToUrl = tempNode.getAttribute("href");
                                   var beginPrice = getQuerySearch("beginprice", curToUrl) ? parseInt(getQuerySearch("beginprice", curToUrl)) / 100 : "";
                                   var endPrice = getQuerySearch("endprice", curToUrl) ? parseInt(getQuerySearch("endprice", curToUrl)) / 100 : "";
                                   clickObj["otherClick"] = "_" + beginPrice + "_" + endPrice;
                              } else if (rgid2 == "1002") {
                                   if (rgid3 == "1") {
                                        clickObj["otherClick"] = "2_" + params.beginPrice + "_" + params.endPrice;
                                   } else if (rgid3 == "2") {
                                        clickObj["otherClick"] = "1_" + $id("sBeginPrice").value + "_" + $id("sEndPrice").value;
                                   }
                              } else if (rgid2 == "1003") {
                                   if (rgid3 == "1001") {
                                        var btnType = params.today == "1" ? "1" : "0";
                                        clickObj["otherClick"] = btnType + "__";
                                   } else if (rgid3 == "1002") {
                                        var btnType = params.sf == "1" ? "1" : "0";
                                        clickObj["otherClick"] = btnType + "__";
                                   }
                              } else if (rgid2 == "1004") {
                                   if (rgid3 == "1") {
                                        clickObj["otherClick"] = "0" + "_1_";
                                   } else if (rgid3 == "2") {
                                        clickObj["otherClick"] = "1" + "_0_";
                                   }
                              } else if (rgid2 == "1005") {
                                   var tmpSortMap = {
                                        "0": "0",
                                        "1": "1",
                                        "2": "2",
                                        "3": "3",
                                        "4": "4"
                                   };
                                   var sortBtnType = tempNode.getAttribute("sortbtntype");
                                   var btnType = sortBtnType;
                                   var curBtnType = tmpSortMap[params.orderStyle];
                                   var btnTypeName = tempNode.getAttribute("title");
                                   if (curRgArr[2] == "4") {
                                        var sortType = getQuerySearch("sort", tempNode.getAttribute("href"));
                                        if (sortType == "2") {
                                             btnType = sortBtnType.split("_")[0];
                                             curBtnType = sortBtnType.split("_")[1];
                                        } else if (sortType == "3") {
                                             btnType = sortBtnType.split("_")[1];
                                             curBtnType = sortBtnType.split("_")[0];
                                        }
                                   }
                                   clickObj["otherClick"] = btnType + "_" + curBtnType + "_" + btnTypeName;
                              }
                         }
                         if (rgid1 == "2018" || rgid1 == "2118") {
                              var curToUrl = tempNode.getAttribute("href");
                              var toPage = getQuerySearchy("page", curToUrl) ? getQuerySearch("page", curToUrl) : "1";
                              if (rgid2 == "1002") {
                                   toPage = tempNode.getAttribute("pageid");
                              } else if (rgid2 == "1003") {
                                   toPage = $("#pageBarBottom").find("[name='inputItem']").val();
                              }
                              clickObj["otherClick"] = "_" + toPage + "_";
                         }
                    }
                    if (curClick["commClick"]) {
                         if (rgid2 < 1000) {
                              clickObj["commClick"] = getCommClsId($id(curClick.domId), curClick.tagName, curClick.commClick)[rgid2 - 1];
                         } else {
                              clickObj["commClick"] = "";
                         }
                    }
                    if (curClick["refWord"]) {
                         clickObj["refWord"] = params.keyword;
                    }
                    if (curClick["hrefWord"]) {
                         clickObj["hrefWord"] = tempNode.innerHTML;
                    }
                    if (curClick["needCookie"] == "1") {
                         clickObj["needCookie"] = "1";
                    }
                    YXSearchlogStat.clickLog(clickObj);
               }
          }
     },
     asyncLog: function(obj) {
          var global = YX.Search.global;
          var params = YX.Search.params;
          var asyncObj = {
               p: global.p,
               regionID1: "",
               srcid: YXSearchlogStat.getSrcId(),
               siteid: YX.Search.cookie.areaCode ? YX.Search.cookie.areaCode : "",
               spvid: params.spvid ? params.spvid : "",
               uid: $getCookie("uid") ? $getCookie("uid") : "",
               commExpose: ""
          };
          for (var name in obj) {
               if (name == "rg") {
                    var curRegionArr = obj[name].split("_");
                    for (var i = 0, len = curRegionArr.length; i < len; i++) {
                         clickObj["regionID" + (i + 1)] = curRegionArr[i];
                    }
               } else {
                    asyncObj[name] = obj[name];
               }
          }
          try {
               ECC.cloud.report.pv(asyncObj);
          } catch (e) {}
     },
     clickLog: function(obj) {
          var global = YX.Search.global;
          var params = YX.Search.params;
          var clickObj = {
               p: global.p,
               regionID1: "",
               regionID2: "",
               regionID3: "",
               regionID4: "",
               siteid: YX.Search.cookie.areaCode ? YX.Search.cookie.areaCode : "",
               srcid: YXSearchlogStat.getSrcId(),
               spvid: params.spvid ? params.spvid : "",
               uid: $getCookie("uid") ? $getCookie("uid") : "",
               YTAG: "",
               referurl: "",
               curPage: params.pageNum ? params.pageNum : "",
               ss: "",
               hitNum: params.totalNum ? params.totalNum : "0",
               defCommNum: params.pageSize ? params.pageSize : "",
               defRowCommNum: params.rowNum ? params.rowNum : "",
               extraMsg: ""
          };
          for (var name in obj) {
               if (name == "rg") {
                    if (obj[name]) {
                         var curRegionArr = obj[name].split("_");
                         for (var i = 0, len = curRegionArr.length; i < len; i++) {
                              clickObj["regionID" + (i + 1)] = curRegionArr[i];
                         }
                    }
               } else if (name == "ytag") {
                    clickObj["YTAG"] = global.pageId + obj[name];
               } else if (name == "needCookie" && obj["needCookie"] == "1") {
                    clickObj["referurl"] = encodeURIComponent(document.referrer);
               } else {
                    clickObj[name] = obj[name];
               }
          }
          var prid = $getCookie("prid") ? $getCookie("prid") : "";
          if (prid !== "") {
               clickObj.extraMsg = prid.split("_")[0];
          }
          if (obj["needCookie"] == "1") {
               var cookieArr = [];
               for (var n in clickObj) {
                    cookieArr.push(n + "=" + clickObj[n]);
               }
               $setCookie("rgStat", cookieArr.join("&"), 0, '/', global.rootDomain);
          } else {
               try {
                    ECC.cloud.report.trace(clickObj);
               } catch (e) {}
          }
     },
     initStat: function(o) {
          var global = YX.Search.global;
          if (o) {
               for (var name in o) {
                    this[name] = o[name]
               }
          }
          this.ua = navigator.userAgent.toLowerCase();
          if (this.ua.indexOf("opera") == -1 && this.ua.indexOf("msie") != -1) {
               this.isIE = true;
          }
          if (this.isIE) {
               document.attachEvent("onclick", YXSearchlogStat.getLog);
          } else {
               document.addEventListener("click", YXSearchlogStat.getLog, true);
          }
          if ($getCookie("rgStat")) {
               setTimeout(function() {
                    if ($getCookie("rgStat")) {
                         var tmpCookieObj = $strToJson($getCookie("rgStat"), "?", "&");
                         YXSearchlogStat.clickLog(tmpCookieObj);
                         $delCookie('rgStat', '/', global.rootDomain);
                    }
               }, 0);
          }
          YXSearchlogStat.getSrcId();
     }
};
logStat = {
     global: "",
     params: "",
     p: "search.51buy.com",
     srcId: 4,
     isIE: false,
     ua: "",
     getSrcId: function() {
          var map = {
               "1": "104",
               "1001": "110",
               "2001": "113",
               "3001": "142",
               "4001": "143",
               "5001": "144"
          };
          var areaCode = YX.Search.cookie.areaCode;
          if (map[areaCode]) {
               logStat["srcId"] = map[areaCode];
               return map[areaCode];
          } else {
               logStat["srcId"] = map[1];
               return map["1"];
          }
     },
     chkLog: function(str, totalNum) {
          var totalNum = totalNum ? totalNum : "";
          var chkUrl = "http://search.paipai.com/cgi-bin/clicklog",
               tempStr;
          var visitkey = $getCookie("visitkey"),
               uin = totalNum,
               refUrl = document.URL;
          tempStr = str.split("{|}");
          if (tempStr[2]) {
               if (tempStr[1] == 1026) {
                    refUrl = logStat.params.keyword;
               }
               chkUrl = chkUrl + "?srcid=" + logStat["srcId"] + "&uin=" + uin + "&ls=" + tempStr[1] + "&subls=" + tempStr[2] + "&visitKey=" + visitkey + "&ref=" + encodeURIComponent(refUrl) + "&herf=" + encodeURIComponent(tempStr[3]);
               if (tempStr[0] == "1") {
                    $setCookie("lgStat", chkUrl, 0, '/', logStat.global.rootDomain);
               } else {
                    $report(chkUrl);
               }
          }
     },
     initStat: function(o) {
          logStat.global = YX.Search.global;
          logStat.params = YX.Search.params;
          if (o) {
               for (var name in o) {
                    this[name] = o[name]
               }
          }
          if ($getCookie("lgStat")) {
               setTimeout(function() {
                    $report($getCookie("lgStat"));
                    $setCookie('lgStat', '', -1, '/', logStat.global.rootDomain);
               }, 0);
          }
          logStat.getSrcId();
     }
};
(function($) {
     $.fn.hoverDelay = function(options) {
          var defaults = {
               hoverDuring: 200,
               outDuring: 200,
               hoverEvent: function() {
                    $.noop();
               },
               outEvent: function() {
                    $.noop();
               }
          };
          var sets = $.extend(defaults, options || {});
          var hoverTimer, outTimer;
          return $(this).each(function() {
               $(this).hover(function() {
                    clearTimeout(outTimer);
                    hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
               }, function() {
                    clearTimeout(hoverTimer);
                    outTimer = setTimeout(sets.outEvent, sets.outDuring);
               });
          });
     }
})(jQuery);
window['YX.search'] = '21002:20140117:20140319144908';
window['YX.search.time'] && window['YX.search.time'].push(new Date()); /*  |xGv00|c4d91cf33a14f4bde51b450505e05cfb */
















(function(win) {

    var lockProduct = null; // 被锁定的商品
    var lockProductCount = -1;// 锁定次数
    var lockProductTimer = 0;// 锁定时间 单位ms
    var oLock = -1; // 定时器对象
    var locked = false;
    var count = 0;

    var CartBanner = {
        isLocked: function(_param){
            var lockFlag =  _param.pid || _param.pkgid || _param.ids;
            if(lockProduct != lockFlag){
                this.unlock();
                return false;
            }
            return count == lockProductCount;
        },
        dolock: function(lock){
            //记下被锁定的商品
            var lockFlag =  this.param.pid || this.param.pkgid || this.param.ids;
            if(lockProduct != lockFlag){
                this.unlock();
                lockProduct = lockFlag;
                lockProductCount = lock.count||1;
                lockProductTimer = lock.timer||1000;
                clearTimeout(oLock);
                var self = this;
                oLock = setTimeout(function(){
                    self.unlock();
                }, lockProductTimer);
                count++;
            }else if(count < lockProductCount){
                count++;
            }
        },
        unlock: function(){
            count = 0;
            lockProduct = null;
        },
        loading: function (_target, _param){
            var tempParam = _param;
            if(tempParam.ids){
                var ids = _param.ids.split(',')[0];
                var mainPrdt = ids.split('|');
                tempParam.pid = mainPrdt[0];
                tempParam.mid = mainPrdt.length > 3?mainPrdt[2]:0;
            }else if(tempParam.pkgpids){
                tempParam.pid = tempParam.pkgpids.split('@')[0];
                tempParam.mid = 0;
            }
            if($(_target).attr("data-loading") || this.isLocked(_param)){
                return false;
            }else{
                $(_target).attr("data-loading","true");
            }
            if(this.wrapper){
                this.close();
            }

            var t = $(_target).offset().top;
            var x = $(_target).offset().left;
            var y = t+$(_target).height()+8;
            var w = $(window).width();
            var h = $(window).height();

            if(x+470 > w && x > 470){
                x = x+$(_target).width()-180;//靠右
                this.resetX = x; //记下有重定位过
            }

            var stop = $(window).scrollTop();
            // 当前位置加上浮层高度会超出屏幕下方 并且需要点击位置在半屏以下时才把浮层放在上面
            if(t + 367 > stop+h && h/2 < t - stop){
                this.resetY = y = y-($(_target).height()+8)-8-50;
            }

            var loadingHtml = '<div class="mod_carttip mod_carttip4" style="position:absolute;top:'+y+'px;left:'+x+'px;z-index:29;display:none;">'
                              +'<div class="mod_carttip_inner"><div class="mod_carttip_bd clearfix">'
                              +'<div class="mod_carttip_ico mod_carttip_loading"><img src="http://static.gtimg.com/icson/img/common/loading.gif" alt="正在添加..."></div>'
                              +'<div class="mod_carttip_con"><p>努力添加中，请稍候</p></div></div></div>'
                              +'<i class="mod_carttip_arr '+(this.resetX?(this.resetY?"mod_carttip_arr3a":"mod_carttip_arr1a"):(this.resetY?"mod_carttip_arr3":"mod_carttip_arr1"))+'">&nbsp;</i><a ytag="71001" class="mod_carttip_close" style="display:none;" href="javascript:void(0)" title="关闭">&times;</a></div>';

            this.wrapper = $(loadingHtml).appendTo($("body"));
            this.param = _param?_param:{};
            this.target = _target;
            this.param.recommend = (_param.recommend === "false" || _param.recommend === false)?false:true;

            var lock = this.param.lock;
            if(lock){
                this.dolock(lock);
            }else{
                this.dolock({count:1,timer:1000}); //默认1s1次
            }

            if(this.param.recommend){
                this.getBIData();
            }

            var self = this;
            setTimeout(function(){
                $(self.wrapper).show();
            },100);

            var resizeFn = function(){
                if(self.wrapper){
                    self.close();
                }
            };
            $(window).bind("resize", resizeFn);

            var clickFn = function(event){
                var jCartTip = $(event.target).closest(".mod_carttip");
                //点击地方不在浮层上且浮层不在loading状态
                if(jCartTip.length == 0 && self.wrapper && !self.wrapper.hasClass("mod_carttip4")){
                    self.close();
                }

            };
            $(window).bind("click", clickFn);

            var closeFn = this.param.onClose || function(){};
            this.param.onClose = function(arg){
                $(window).unbind("click", clickFn).unbind("resize", resizeFn);
                clickFn = null;
                resizeFn = null;
                $(self.target).removeAttr("data-loading");
                closeFn(arg);
            }

            $(".mod_carttip_close", this.wrapper).unbind("click").bind("click", function(e){
                self.close();
                e.preventDefault();
            });
            if(this.param.onLoading)this.param.onLoading(this.wrapper.get(0));
            var onComplete = this.param.onComplete || function(){};
            this.param.onComplete = function(){
                $(self.target).removeAttr("data-loading");
                onComplete();
            };
            return true;
        },
        success: function(_msg, isPartSuc){

            if(!this.wrapper) return;

            var suc_html = '<div class="mod_carttip_ico"><i class="mod_carttip_ico_success"></i></div>'
                            +'<div class="mod_carttip_con">'
                            +'<h4>'+(isPartSuc?"部分商品":"")+'添加成功!</h4>'+(_msg?'<span style="font-size:12px;">'+_msg+'</span>':'')
                            +'<div class="mod_carttip_action">'
                            +'<a ytag="71002" href="http://buy.yixun.com/showcart.html" target="_blank" class="mod_carttip_btn mod_carttip_btn_bg2 mod_carttip_btn1" onclick="$(\'.mod_carttip_close\').click()"><span>去结算</span></a>'
                            +'<a ytag="71003" href="javascript:void(0)" onclick="$(\'.mod_carttip_close\').click()" class="mod_carttip_btn mod_carttip_btn_bg1 mod_carttip_btn2" style="margin-left: 5px;">继续购物</a>'
                            +'</div></div>';

            //添加成功后等待BI数据1s
            if(this.biHtml){
                this.wrapper.attr("class","mod_carttip mod_carttip2").find(".mod_carttip_bd").html(suc_html);
                this.wrapper.find(".mod_carttip_close").show();
                if(this.resetX){
                    this.wrapper.css("left",(this.resetX-(470-180))+"px");//.find(".mod_carttip_arr").css("left",(470-45)+"px");
                }
            }

            var self = this;
            var parseSuc = function(){
                if(!self.wrapper) return;
                if(self.biHtml){
                    self.wrapper.attr("class","mod_carttip mod_carttip1").find(".mod_carttip_bd").html(suc_html);
                    self.wrapper.find(".mod_carttip_inner").append(self.biHtml);
                    self.wrapper.find(".mod_carttip_close").show();
                    if(self.resetX){
                        self.wrapper.css("left",(self.resetX-(470-180))+"px");//.find(".mod_carttip_arr").css("left",(470-45)+"px");
                    }

                    if(self.resetY){
                        self.wrapper.css("top",self.resetY-self.wrapper.height()+50+"px");
                    }

                    self.biHtml = null;
                }else{
                    self.wrapper.attr("class","mod_carttip mod_carttip2").find(".mod_carttip_bd").html(suc_html);
                    self.wrapper.find(".mod_carttip_close").show();
                    if(self.resetX){
                        self.wrapper.css("left",(self.resetX-(300-180))+"px");//.find(".mod_carttip_arr").css("left",(300-45)+"px");
                    }
                    if(self.resetY){
                        self.wrapper.css("top",self.resetY-self.wrapper.height()+50+"px");
                    }
                }

                if(self.param.onComplete)self.param.onComplete(self.wrapper.get(0));
            }

            if(this.param.recommend && !this.biHtml){
                var timer = 0;
                self.biTimer = setInterval(function(){
                    if(timer > 200 || self.biHtml){
                        clearInterval(self.biTimer);
                        parseSuc();
                        self.biTimer = null;
                        timer = null;
                    }
                    timer += 20;
                }, 20);
            }else{
                parseSuc();
            }

            if(this.param.onSuccess)this.param.onSuccess(this.wrapper.get(0));
            try{
                if(G.header && G.header.cart)setTimeout(G.header.cart.getShoppingCart,0);
            }catch(e){}
        },
        error: function(_msg){
            if(!this.wrapper) return;
            var error_html = '<div class="mod_carttip_ico"><i class="mod_carttip_ico_error"></i></div>'
                                +'<div class="mod_carttip_con">'
                                +'<h4>添加失败!</h4><p>'+_msg+'</p>'
                                +'</div>';

            this.wrapper.attr("class","mod_carttip mod_carttip3").find(".mod_carttip_bd").html(error_html);
            this.wrapper.find(".mod_carttip_close").show();
            // 如果是靠右浮层重定位 上方的箭头需要居右
            if(this.resetX){
                this.wrapper.css("left",(this.resetX-(370-180))+"px");//.find(".mod_carttip_arr").css("left",(370-45)+"px");
            }
            if(this.resetY){
                this.wrapper.css("top",this.resetY-this.wrapper.height()+50+"px");
            }

            if(this.param.onError)this.param.onError(this.wrapper.get(0));
            if(this.param.onComplete)this.param.onComplete(this.wrapper.get(0));

            this.report(1);
        },
        close: function(){
            this.wrapper.remove();
            if(this.param.onClose)this.param.onClose();
            this.wrapper = null;
            this.resetX = null;
            this.resetY = null;
            this.param = null;
            this.target = null;
            if(this.biTimer){
                clearInterval(this.biTimer);
            }
            return false;
        },
        /**
         * js截取字符串，中英文都能用
         * @param str：需要截取的字符串
         * @param len: 需要截取的长度
         */
         //ok
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
        getBIData: function(){
            // 拉取BI数据
            /*0:4046-521667:398,3001
              4046的易迅区id，2626是上海 prid
              521667是商品id
              398是类目id
              3001是仓id   wsid 上海仓
             */
            var wsid = G.util.cookie.get("wsid"),
                prid = G.util.cookie.get("prid"),
                pid = this.param.pid,
                mid = this.param.mid;
                wsid = wsid == ""?"":wsid;
                prid = prid == ""?"2626":prid.substr(0, prid.indexOf("_"));

            var self = this,
                biReserved = "0:"+ prid+"-"+(pid?pid:0)+":"+(mid?mid:0);
            self.biHtml = null;
            //请求开始时间
            var bTime = (new Date()).getTime();
            $.ajax({
                url: "http://s7.smart.yixun.com/w/tf/gettfx?tfid=100005&type=jsonp&biReserved="+biReserved,
                dataType: "jsonp",
                cache: true,
                report:{
                    key: "iRet",
                    url: "http://s7.smart.yixun.com/w/tf/gettfx?tfid=100005",
                    formatUrl: false
                },
                success: function(_json){
                    var eTime = (new Date()).getTime();
                    if(_json && _json.iRet == 0){
                        var data = _json.data?_json.data.POS_BUY:[];
                        var length = data.length?data.length:0;
                        if(length > 0){ //至少4个 后台有保证
                            var shtml = ['<div class="mod_carttip_ext"><div class="mod_carttip_promo mod_carttip_promo1">买过该商品的用户还买了</div><div class="mod_carttip_recom"><ul class="mod_carttip_glist clearfix">'];
                            var temp = null;

                            for(var i = 0;i < length&&i<4;i++){
                                temp = data[i];
                                shtml.push('<li title="'+temp.TITLE+'"><div class="mod_carttip_gitem">');
                                shtml.push('<div class="mod_carttip_gpic"><a href="'+temp.URL+'" target="_blank" ytag="'+(71020+i)+'"><img src="'+temp.IMG+'" alt="'+temp.TITLE+'"/></a></div>');
                                var nameStr = temp.TITLE;
                                if($.browser.msie && $.browser.version == 6.0){
                                    nameStr = self.cutstr(nameStr, 32);
                                }
                                shtml.push('<div class="mod_carttip_gtit"><a href="'+temp.URL+'" target="_blank" ytag="'+(71050+i)+'" title="'+temp.TITLE+'">'+nameStr+'</a></div>');
                                shtml.push('<div class="mod_carttip_gprice mod_carttip_gprice2">易迅价<span>&yen;'+temp.PRICE+'</span></div>');
                                shtml.push('</div></li>');
                            }
                            shtml.push("</div></div></ul>");
                            //self.wrapper.attr("class","mod_carttip mod_carttip1").find(".mod_carttip_inner").append(shtml.join(""));
                            //if(self.resetX){
                            //    self.wrapper.css("left",(self.resetX-(470-180))+"px").find(".mod_carttip_arr").css("left",(470-45)+"px");
                            //}
                            self.biHtml = shtml.join("");
                            self.report(3);
                        }else{
                           self.report(2);
                        }
                    }else{
                        self.report(2);
                    }
                    Cart.reportCgi("3="+(eTime-bTime));
                },
                error: function(){
                    //setTimeout(function(){
                    //    self.close();
                    //}, 3000);
                    this.report(2);
                }
            });
        },
        report: function(_reportcode){
            if(!this.wrapper) return;
            var img = new Image();
            var uid = G.util.cookie.get("uin"); //当前强登录态的易迅用户UID
            var guid = G.util.cookie.get("y_guid");
            var wsid = G.util.cookie.get("wsid");
            var pid = this.param.pid;
            var ext = "pnum:"+ this.param.pnum+"|errcode:"+_reportcode+"|"+wsid;
            var area = G.util.cookie.get("areasInfo");
            var vk = G.util.cookie.get("visitkey");

            img.src = "http://stat.yixun.com/stat.fcg?type=1&uid="+uid+"&pageid="+window.yPageId+"&plevel=3&url="+encodeURIComponent(location.href)+"&guid="+guid+"&whid=1971&pid="+pid+"&ext="+ext+"&area="+area+"&vk="+vk;
        }
    };

    var Cart = {
        //NORMAL_CART_KEY : 'shoppingcart',
        TYPE_PDT : 0, //商品
        TYPE_PKG : 1, //套餐
        showTopWarning : function(str, level, isPartSuc) {
            var str = typeof str == "string" ? str : str.join("");
            if(level == 0){
                CartBanner.success(str, isPartSuc);
            }else{
                CartBanner.error(str+"(错误码:"+level+")");
            }

            if(level == 19743){ // 区分无库存的场景
                var bu = location.host.replace(".yixun.com","");
                switch(bu){
                    case "item":
                        level = 1974301;
                        break;
                    case "searchex":
                        level = 1974302;
                        break;
                    case "jiadian":
                        level = 1974303;
                        break;
                    case "sale":
                        level = 1974304;
                        break;
                    case "event":
                        level = 1974305;
                        break;
                }
            }

            var time = (new Date()).getTime() - this.startTime;
            (new Image).src = "http://c.isdspeed.qq.com/code.cgi?domain=cart.buy.yixun.com&cgi="+encodeURIComponent("http://cart.buy.yixun.com/addcart")+"&type="+(level==0?1:2)+"&code="+level+"&time="+time+"&rate=1";
        },

        //点击流计算
        getYTrack : function() {
            return G.util.cookie.get("y_track") || "";
        },

        /**
         * 添加单个商品到购物车
         * @param int pid 商品id
         * @param int pnum 商品数量
         * @param int mid 主商品id
         * @param int price_id 价格id
         * @param object clickBtn
         */
        addToCart : function(pid, pnum, mid, price_id, chid, repair, pkgpids, type) {
            var self = Cart, y_track = Cart.getYTrack();
            //添加订单来源
            type = type || self.TYPE_PDT;
            chid = ( typeof chid != 'undefined') ? chid.toString() : "0";
            self.addToCartMulti([{
                pid : pid,
                pnum : pnum,
                main_product_id : mid || 0,
                price_id : price_id || 0,
                y_track : y_track || '',
                type : type,
                chid : chid,
                repair : repair || 0,
                pkgpids : pkgpids || 0
            }]);
        },

        /**
         * 编码投递到后台的“商品信息”成字符串
         * format = 0 || NULL 为字符串，兼容老格式。
         * format = 1 为JSON字符串格式
         */
        _encodeMultiCartStr : function(productParam, format) {
            var self = Cart, tmp = [];
            $.each(productParam || [], function(k, v) {
                if(v && v.pid) {
                    tmp.push(v);
                }
            });
            tmp.sort(function(a, b) {
                return a.time == b.time ? 0 : (a.time > b.time ? -1 : 1);
            });

            var ids = [];
            $.each(tmp || [], function(k, v) {
                v.chid = ( typeof v.chid != 'undefined') ? v.chid.toString() : "0";
                if(v.pid) {
                    if(format) {
                        ids.push('"' + v.pid
                        + '":{"product_id":' + v.pid
                        + ',"buy_count":' + v.pnum
                        + ',"main_product_id":' + v.main_product_id
                        + ',"price_id":' + v.price_id
                        + ',"type":' + (v.type || self.TYPE_PDT)
                        + ',"OTag":"' + v.y_track
                        + '","chid":"' + (v.chid)
                        +'","yanbao":'+ (v.repair||0)
                        +'","pkgpids":'+ (v.pkgpids||0)
                        +'","time":'+ (v.time||0)
                        +'","promotion_rule_id":'+ (v.promotion_rule_id||0)
                        + '"}');
                    } else {
                        v.chid = ( typeof v.chid != 'undefined') ? v.chid.toString() : "0";
                        ids.push((v.pid - 0)
                        + '|' + ((v.pnum || 1) - 0)
                        + '|' + (v.main_product_id - 0)
                        + '|' + (v.price_id - 0)
                        + '|' + (v.y_track || '')
                        + '|' + (v.type || self.TYPE_PDT)
                        + '|' + (v.chid)
                        + '|'+(v.repair||0)// 延保id 暂未对接 默认先填个0
                        + '|' + (v.pkgpids? ((typeof v.pkgpids == 'string') ? v.pkgpids: v.pkgpids.join("@")):"0")// pkgpids
                        + (v.time ? '|' + v.time : '')
                        + '|'+(v.promotion_rule_id||0));
                    }
                }
            });
            return ids;
        },
        //添加到非登录态购物车 rou
        _addToCartMultiNotLogin : function(productParam) {
            var self = Cart;
            var newCallback = function(o) {
                switch(o.errno) {
                    case 0:
                        break;
                    case 19970://用户没有登录.  19970
                    case 19972://要求用户登录  19972
                        window.location.href = 'https://base.yixun.com/login.html?url='+encodeURIComponent(location.href);
                        break;
                    case 19973:
                        self._addToCartMultiLogin(productParam);
                        break;
                }
            }

            this.checkByServer("http://cart.buy.yixun.com/shoppingcart/addproductnotloginunp", productParam, newCallback);
        },

        /**
         * 添加到购物车, 具体操作函数
         * @param object productParam 参数
         * @param function callback 回调函数
         */
        _addToCartMultiLogin : function(productParam, callback) {
            var uid = G.logic.login.getLoginUid();
            if(!uid){return;}
            var self = this;
            var newCallback = function(o) {
                //if ((o.isClean == 1)) {
                    //Cart.getNormalShoppingCart().clear();
                //}
                switch(o.errno){
                    case 0:
                        //Cart.getNormalShoppingCart().clear();
                        break;
                    case 19970:
                    case 19972:// 未登录 重启离线购物车流程
                        return self._addToCartMultiNotLogin(productParam);
                }

            };

            this.checkByServer("http://cart.buy.yixun.com/shoppingcart/addproductunp", productParam, newCallback);

        },
        /**
         * @param {Object} _url
         * @param {Object} ids
         * @param {Object} callback
         */
        checkByServer: function(_url, productParam, callback){
            var self = this;
            //Cart.getNormalShoppingCart().getAll(function(cart, cache) {
                var ids = self._encodeMultiCartStr(productParam);
                //var offline = self._encodeMultiCartStr(cart);
                var data = {
                    p: ids.join(',')
                };
                /*
                if(offline.length > 0){
                    data.offline = offline.join(',');
                }*/

                var ajaxCallBack = function(o){
                    if(!o) return;

                    // 前面处理相同逻辑
                    var o_fail = o.fail;
                    var mainFail = null;
                    var mainFailStr = o.message;
                    var isPartSuc = false;
                    var o_data = o.data;
                    if(o_fail){ //主商品失败原因

                        // 为方便后面对fail的解析 这里对后台传过来的结构进行改造
                        var fail_length = o_fail.length;
                        var temp_fail = {};
                        for(var i = 0; i < fail_length; i++){
                            var currFail = o_fail[i];
                            for(var n in currFail){
                                temp_fail[n] = currFail[n];
                            }
                        }

                        /**
                         * 5)   全为特殊商品
                            a)  抱歉，这些商品不能批量添加，请分别购买。
                         */
                        if(!o_data && fail_length > 1){
                            var flag = false;
                            for(var n in temp_fail){
                                flag = (temp_fail[n].errorCode ==19721 ||temp_fail[n].errorCode ==19722);
                                if(!flag){
                                    break;
                                }
                            }
                            if(flag){
                                return self.showTopWarning("抱歉，这些商品不能批量添加，请分别购买。", o.errno);
                            }
                        }

                        for(var n in temp_fail){ // 如果主商品失败 将主商品失败信息提到结构上面
                            if(productParam.length>1&&temp_fail[n].errorCode == 19767){ // 有抢购商品
                                return self.showTopWarning(temp_fail[n].errorMessage, temp_fail[n].errorCode);
                            }
                            if(n == productParam[0].pid && productParam.length==1){ // 适用单品添加时才提示主商品信息
                                mainFailStr = temp_fail[n].errorMessage;
                                o.errno = temp_fail[n].errorCode;
                                break;
                            }
                        }

                        if(o_data){ // 这里处理部分商品添加成功的提示

                            for(var n in temp_fail){
                                var flag = true;
                                for(var v = 0; v < o_data.length; v++){
                                    if(n == [o_data[v].pid]){
                                        flag = false;
                                        break;
                                    }
                                }
                                if(flag){
                                    isPartSuc = true;
                                    break;
                                }
                            }

                        }

                    }
                    if(o_data){ // o.data说明成功了 检查下是否主商品在内
                        /*
                        for(var j = 0; j < o.data.length;j++){
                            if(productParam[0].pid == o.data[j].pid){
                                o.errno = 0; // fail里面且data里面有 视为成功
                                break;
                            }
                        }*/
                        o.errno = 0; // 只要有data 就显示成功 可以显示部分成功
                    }

                    switch(o.errno){
                        case 0:
                            self.showTopWarning(mainFailStr?mainFailStr:'', 0, isPartSuc);
                            break;
                        case 19721://合约机
                            window.location.href = 'http://buy.yixun.com/stepone-'+productParam[0].pid+'.html?chid='+productParam[0].chid;
                            break;
                        case 19722://节能补贴商品
                            window.location.href = 'http://buy.yixun.com/cart.html?pid='+productParam[0].pid+"&pnum="+productParam[0].pnum+"&chid="+productParam[0].chid;
                            break;
                        case 19970:
                        case 19972:
                            break;
                        case 19767:
                            window.location.href = 'http://qiang.yixun.com/item-'+productParam[0].pid+".html?chid="+productParam[0].chid;
                            break;
                        default:
                            self.showTopWarning(mainFailStr, o.errno);
                            break;
                    }

                    // 回调里面处理登录非登录的特殊处理
                    callback(o);
                };
                /*
                var wg_skey = G.util.cookie.get("wg_skey"); // 登录态验证token
                if(wg_skey){
                    var hash = 5381;
                    for(var i = 0, len = wg_skey.length; i < len; ++i){
                       hash += (hash << 5) + wg_skey.charAt(i).charCodeAt();
                    };
                    data.token = hash & 0x7fffffff;
                }*/
                // 请求开始时间
                var bTime = (new Date()).getTime();
                var point = null;
                if(_url.indexOf("addproductnotlogin")>-1){
                    point = "4";
                }else{
                    point = "5";
                }

                $.ajax({
                    url : _url,
                    dataType : 'jsonp',
                    data : data,
                    timeout: 6000,
                    cache:true,
                    report: "errno",
                    success: function(o){
                        var eTime = (new Date()).getTime();
                        ajaxCallBack(o);
                        self.reportCgi(point+"="+(eTime-bTime));
                    },
                    error: function(xhr, textStates, errorThrown){
                        var ec = 2000000;
                        switch(textStates){
                            case "timeout":
                                ec = 2010000;
                                break;
                            case "parsererror":
                                ec = 2020000;
                                break;
                            case "notmodified":
                                ec = 2030000;
                                break;
                            case "error":
                                ec = 2040000;
                                break;

                        }
                        if(xhr && xhr.status && !isNaN(xhr.status)){
                            ec += parseInt(xhr.status, 10);
                        }
                        self.showTopWarning("抱歉，系统繁忙，请重新添加。", ec);
                    }
                });

            //});
        },
        reportCgi: function(_str){
            var _img = new Image();
            setTimeout(function(){
                _img.src ="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=1470&flag2=31&flag3=7&"+_str;
            }, 500);
        },

        addToCartMulti : function(productParam) {
            var self = this;
            if(!productParam || productParam.length < 1)
                return;
            var uid = G.logic.login.getLoginUid();
            if(!uid) {//添加到未登录态购物车，前端存储部分
                self._addToCartMultiNotLogin(productParam);
            } else {//添加到登录态购物车
                self._addToCartMultiLogin(productParam);
            }
        },
        init: function(_param,obj) {

            var self = this;

            var paras = {hash:{},search: _param};

            if (paras.search.pid > 0) { //添加单个商品
                Cart.addToCart( //addToCart 内计算 y_track
                    paras.search.pid-0,
                    (paras.search.pnum || 1) - 0,
                    paras.search.mid || 0,
                    paras.search.price_id || 0,
                    paras.search.chid || 0,
                    paras.search.repair || 0
                );
            }
            else if (paras.search.ids) { //添加多个商品
                var ids = paras.search.ids.split(','),
                    y_track = Cart.getYTrack(); //添加订单来源
                $.each(ids, function(k, val) {
                    val = val.split('|');
                    if (val.length < 1) {
                        return; //参数错误
                    }

                    ids[k] = {
                        pid : val[0],
                        pnum    : val.length >= 2 ? val[1] : 1,
                        main_product_id : val.length >= 3 ? val[2] : 0,
                        price_id    : val.length >= 4 ? val[3] : 0,
                        y_track : y_track,
                        chid : paras.search.chid,
                        repair: val.length >= 5 ? val[4] : 0
                    };
                });
                Cart.addToCartMulti(ids);
            }
            else if (paras.search.pkgid > 0) { //添加单个套餐

                Cart.addToCart( //addToCart 内计算 y_track
                    parseInt(paras.search.pkgid), // 套餐id
                    parseInt(paras.search.pnum) || 1, // pnum
                    0,// mid
                    0, // price_id
                    paras.search.chid || 0,
                    paras.search.repair,
                    paras.search.pkgpids||"0",
                    self.TYPE_PKG
                );
            }else{
                this.showTopWarning("抱歉，该商品暂无法添加购物车。",2100001);
            }
        },

        add: function(_param, _dom){
            this.startTime = (new Date()).getTime();// 记录开始时间 统计整个过程消耗时间
            try{
                if(window.G && G.app && G.app.ping && G.app.ping.orderTrack){
                    G.app.ping.orderTrack(_dom);
                }
                var param = _param;
                if(typeof _param == "string"){
                    var temp_str = _param;
                    if(temp_str.indexOf("?") > -1){
                        temp_str = temp_str.substr(temp_str.indexOf("?")+1);
                    }
                    var temp_arr = temp_str.split("&");
                    var temp_param = {};
                    for(var i = 0; i < temp_arr.length;i++){
                        var temp = temp_arr[i].split("=");
                        temp_param[temp[0]] = temp[1];
                    }
                    param = temp_param;
                }

                // 是否有另外的添加流程正在继续
                var loadingParam = {};
                for(var n in param){
                    loadingParam[n] = param[n];
                }
                if(!CartBanner.loading(_dom, loadingParam)){
                    return;
                }
                if(document.domain != "yixun.com"){ // 本地存储无法使用  在第一次使用前检测有无设置
                    return this.showTopWarning("抱歉，系统繁忙，重新添加或刷新重试。",2100004);
                }

                this.init(param, _dom);

            }catch(e){
                this.showTopWarning("抱歉，该商品暂无法添加购物车。",2100011);
            }
        },
        close: function(){
            CartBanner.close();
        }
    }
    var obj = win||window;
    obj.Cart = Cart;
})(window);/*  |xGv00|28c7bf16e8cc5809ac2e4d097ed8a572 */




/*
* 由nodeapps/johnna/sync生成
* 生成日期20140331
*/
function regionYX(){
    this.init();
}

//原始json数据
regionYX.prototype.data={110000:{g:110000,gn:"北京市",y:131,s:1,d:110108,l:{3771:{g:3771,gn:"崇文区",y:3771,s:1,d:3804,l:{3804:{g:3804,gn:"全区",y:3804,s:1,d:0}}},3772:{g:3772,gn:"宣武区",y:3772,s:1,d:3796,l:{3796:{g:3796,gn:"全区",y:3796,s:1,d:0}}},110101:{g:110101,gn:"东城区",y:3785,s:1,d:3795,l:{3795:{g:3795,gn:"全区",y:3795,s:1,d:0}}},110102:{g:110102,gn:"西城区",y:3770,s:1,d:3803,l:{3803:{g:3803,gn:"全区",y:3803,s:1,d:0}}},110105:{g:110105,gn:"朝阳区",y:3784,s:1,d:3779,l:{3779:{g:3779,gn:"五环内",y:3779,s:1,d:0},3780:{g:3780,gn:"五环外,六环内",y:3780,s:1,d:0},4008:{g:4008,gn:"六环外",y:4008,s:0,d:0},5580:{g:5580,gn:"对外经济贸易大学校园自提（对外经济贸易大学惠园餐厅对面动感营业厅内18911056407）",y:5580,s:0,d:0},5581:{g:5581,gn:"北京化工大学校园自提（北京化工大学第二食堂斜对面动感营业厅内010-53666593）",y:5581,s:0,d:0}}},110106:{g:110106,gn:"丰台区",y:3786,s:1,d:3810,l:{3810:{g:3810,gn:"五环内",y:3810,s:1,d:0},3811:{g:3811,gn:"五环外,六环内",y:3811,s:1,d:0},3984:{g:3984,gn:"六环外",y:3984,s:0,d:0}}},110107:{g:110107,gn:"石景山区",y:3773,s:1,d:3801,l:{3801:{g:3801,gn:"五环内",y:3801,s:1,d:0},3982:{g:3982,gn:"六环外",y:3982,s:0,d:0},6491:{g:6491,gn:"五环外六环内八角地区",y:6491,s:0,d:0},6492:{g:6492,gn:"五环外六环内古城地区",y:6492,s:0,d:0},6493:{g:6493,gn:"五环外六环内高井地区",y:6493,s:0,d:0},6494:{g:6494,gn:"五环外六环内衙门口地区",y:6494,s:0,d:0},6495:{g:6495,gn:"五环外六环内杨庄地区",y:6495,s:0,d:0},6496:{g:6496,gn:"五环外六环内广宁村地区",y:6496,s:0,d:0},6497:{g:6497,gn:"五环外六环内模式口地区",y:6497,s:0,d:0},6498:{g:6498,gn:"五环外六环内五里坨地区",y:6498,s:0,d:0},6499:{g:6499,gn:"五环外六环内三家店地区",y:6499,s:0,d:0},6500:{g:6500,gn:"五环外六环内首钢地区",y:6500,s:0,d:0},6501:{g:6501,gn:"五环外六环内八大处地区",y:6501,s:0,d:0},6502:{g:6502,gn:"五环外六环内金顶街地区",y:6502,s:0,d:0},6515:{g:6515,gn:"五环外六环内晋元庄地区",y:6515,s:0,d:0},6519:{g:6519,gn:"五环外六环内北辛安地区",y:6519,s:0,d:0},6520:{g:6520,gn:"五环外六环内苹果园地区",y:6520,s:0,d:0},6521:{g:6521,gn:"五环外六环内西黄村地区",y:6521,s:0,d:0}}},110108:{g:110108,gn:"海淀区",y:3769,s:1,d:3792,l:{3781:{g:3781,gn:"五环外六环内（上地）",y:3781,s:1,d:0},3792:{g:3792,gn:"五环内",y:3792,s:1,d:0},3793:{g:3793,gn:"五环外六环内（西二旗）",y:3793,s:1,d:0},3794:{g:3794,gn:"五环外六环内（其它）",y:3794,s:1,d:0},3802:{g:3802,gn:"五环外六环内（西三旗）",y:3802,s:1,d:0},4002:{g:4002,gn:"六环外",y:4002,s:0,d:0},4082:{g:4082,gn:"五环外六环内（东北旺乡）",y:4082,s:1,d:0},5570:{g:5570,gn:"北京大学校园自提（北京大学燕园服务社6号010-53667517）",y:5570,s:0,d:0},5571:{g:5571,gn:"清华大学校园自提（清华大学三教正北教材中心内18911056409）",y:5571,s:0,d:0},5572:{g:5572,gn:"北京理工大学校园自提（学生综合服务楼一楼邮局旁010-52907690 ）",y:5572,s:0,d:0},5573:{g:5573,gn:"中国人民大学校园自提（中国人民大学汇贤商店内010-62515509）",y:5573,s:0,d:0},5574:{g:5574,gn:"北京科技大学校园自提（北京科技大学腐蚀楼西侧小麦公社 010-53630160）",y:5574,s:0,d:0},5575:{g:5575,gn:"北京邮电大学校园自提（北京邮电大学学八楼新食堂南小麦公社010-53667519）",y:5575,s:0,d:0},5576:{g:5576,gn:"北京师范大学校园自提（北京师范大学裙楼C座(西门邮局旁)010-53630483）",y:5576,s:0,d:0},5577:{g:5577,gn:"北京交通大学校园自提（北京交通大学芳华超市（逸夫店）西北侧小麦公社 010-52906613）",y:5577,s:0,d:0},5578:{g:5578,gn:"北京航空航天大学校园自提（北京航空航天大学超市发西南角010-53630484）",y:5578,s:0,d:0},5579:{g:5579,gn:"中国农业大学东校区校园自提（中国农业大学东校区清真食堂旁联通营业厅内010-53617905）",y:5579,s:0,d:0}}},110109:{g:110109,gn:"门头沟区",y:3788,s:1,d:3805,l:{3805:{g:3805,gn:"门头沟（其他）",y:3805,s:0,d:0},5104:{g:5104,gn:"门头沟城区",y:5104,s:1,d:0},5105:{g:5105,gn:"军庄镇",y:5105,s:1,d:0},5106:{g:5106,gn:"妙峰山镇",y:5106,s:1,d:0},5107:{g:5107,gn:"龙泉镇",y:5107,s:1,d:0},5108:{g:5108,gn:"永定镇",y:5108,s:1,d:0}}},110111:{g:110111,gn:"房山区",y:3789,s:1,d:3985,l:{3985:{g:3985,gn:"五环外,六环内",y:3985,s:1,d:0},4009:{g:4009,gn:"六环外",y:4009,s:0,d:0}}},110112:{g:110112,gn:"通州区",y:3790,s:1,d:4006,l:{4006:{g:4006,gn:"五环外,六环内",y:4006,s:1,d:0},4007:{g:4007,gn:"六环外",y:4007,s:0,d:0}}},110113:{g:110113,gn:"顺义区",y:3791,s:1,d:3983,l:{3983:{g:3983,gn:"六环外（其他）",y:3983,s:0,d:0},4005:{g:4005,gn:"五环外,六环内",y:4005,s:1,d:0},5116:{g:5116,gn:"顺义城区",y:5116,s:1,d:0},5117:{g:5117,gn:"临河工业区",y:5117,s:1,d:0}}},110114:{g:110114,gn:"昌平区",y:3776,s:1,d:4004,l:{4004:{g:4004,gn:"六环外（其他）",y:4004,s:0,d:0},5109:{g:5109,gn:"六环外（南郝庄）",y:5109,s:1,d:0},5110:{g:5110,gn:"六环外（昌平西关）",y:5110,s:1,d:0},5111:{g:5111,gn:"六环外（昌平东关）",y:5111,s:1,d:0},5112:{g:5112,gn:"六环外（松园）",y:5112,s:1,d:0},5113:{g:5113,gn:"六环外（南邵）",y:5113,s:1,d:0},5114:{g:5114,gn:"六环外（白浮）",y:5114,s:1,d:0},6089:{g:6089,gn:"五环外，六环内（回龙观、天通苑、立水桥地区）",y:6089,s:0,d:0},6090:{g:6090,gn:"五环外，六环内（沙河地、北七家、小汤山、阳坊地区）",y:6090,s:0,d:0}}},110115:{g:110115,gn:"大兴区",y:3787,s:1,d:3813,l:{3813:{g:3813,gn:"六环外",y:3813,s:0,d:0},3822:{g:3822,gn:"五环内",y:3822,s:1,d:0},3962:{g:3962,gn:"五环外,六环内",y:3962,s:1,d:0}}},110116:{g:110116,gn:"怀柔区",y:3774,s:0,d:3807,l:{3807:{g:3807,gn:"全区",y:3807,s:0,d:0}}},110117:{g:110117,gn:"平谷区",y:3777,s:0,d:3808,l:{3808:{g:3808,gn:"全区",y:3808,s:0,d:0}}},110228:{g:110228,gn:"密云区",y:3775,s:0,d:3799,l:{3799:{g:3799,gn:"全区",y:3799,s:0,d:0}}},110229:{g:110229,gn:"延庆县",y:3778,s:0,d:3809,l:{3809:{g:3809,gn:"全区",y:3809,s:0,d:0}}}}},120000:{g:120000,gn:"天津市",y:2858,s:1,d:120100,l:{120100:{g:120100,gn:"天津市",y:2859,s:1,d:120101,l:{2867:{g:2867,gn:"汉沽区",y:2867,s:1,d:0},2868:{g:2868,gn:"大港区",y:2868,s:1,d:0},5558:{g:5558,gn:"塘沽区（市区（不含胡家园，不含渤海石油、东沽））",y:5558,s:0,d:0},5559:{g:5559,gn:"塘沽区（其他区域）",y:5559,s:0,d:0},5560:{g:5560,gn:"经济技术开发区（不含西区）",y:5560,s:0,d:0},6535:{g:6535,gn:"天津大学校园自提（卫津路92号鹏翔学生公寓旁电信营业厅内18902156609）",y:6535,s:0,d:0},6536:{g:6536,gn:"南开大学校园自提（卫津路94号范孙楼西数码小院内18602290875）",y:6536,s:0,d:0},120101:{g:120101,gn:"和平区",y:2860,s:1,d:0},120102:{g:120102,gn:"河东区",y:2861,s:1,d:0},120103:{g:120103,gn:"河西区",y:2862,s:1,d:0},120104:{g:120104,gn:"南开区",y:2863,s:1,d:0},120105:{g:120105,gn:"河北区",y:2864,s:1,d:0},120106:{g:120106,gn:"红桥区",y:2865,s:1,d:0},120110:{g:120110,gn:"东丽区",y:2869,s:1,d:0},120111:{g:120111,gn:"西青区",y:2870,s:1,d:0},120112:{g:120112,gn:"津南区",y:2872,s:1,d:0},120113:{g:120113,gn:"北辰区",y:2871,s:1,d:0},120114:{g:120114,gn:"武清区",y:2874,s:1,d:0},120115:{g:120115,gn:"宝坻区",y:2876,s:1,d:0},120116:{g:120116,gn:"滨海新区",y:3600,s:1,d:0},120221:{g:120221,gn:"宁河县",y:2875,s:1,d:0},120223:{g:120223,gn:"静海县",y:2873,s:1,d:0},120225:{g:120225,gn:"蓟县",y:2877,s:1,d:0}}}}},130000:{g:130000,gn:"河北省",y:814,s:0,d:130100,l:{130100:{g:130100,gn:"石家庄市",y:815,s:0,d:130181,l:{6446:{g:6446,gn:"高新区",y:6446,s:0,d:0},6447:{g:6447,gn:"石家庄经济技术开发区",y:6447,s:0,d:0},130102:{g:130102,gn:"长安区",y:834,s:0,d:0},130103:{g:130103,gn:"桥东区",y:835,s:0,d:0},130104:{g:130104,gn:"桥西区",y:833,s:0,d:0},130105:{g:130105,gn:"新华区",y:836,s:0,d:0},130107:{g:130107,gn:"井陉矿区",y:838,s:0,d:0},130108:{g:130108,gn:"裕华区",y:837,s:0,d:0},130121:{g:130121,gn:"井陉县",y:822,s:0,d:0},130123:{g:130123,gn:"正定县",y:824,s:0,d:824,l:{824:{g:824,gn:"正定县（其他）",y:824,s:0,d:0},6445:{g:6445,gn:"正定县（南牛乡、南牛镇、正定镇、诸福屯镇）",y:6445,s:0,d:0}}},130124:{g:130124,gn:"栾城县",y:823,s:0,d:823,l:{823:{g:823,gn:"栾城县（其他）",y:823,s:0,d:0},6438:{g:6438,gn:"栾城县（窦妪镇、楼底镇、冶河镇）",y:6438,s:0,d:0}}},130125:{g:130125,gn:"行唐县",y:825,s:0,d:0},130126:{g:130126,gn:"灵寿县",y:826,s:0,d:826,l:{826:{g:826,gn:"灵寿县（其他）",y:826,s:0,d:0},6436:{g:6436,gn:"灵寿县（灵寿镇、三圣院乡、正南大街）",y:6436,s:0,d:0}}},130127:{g:130127,gn:"高邑县",y:827,s:0,d:0},130128:{g:130128,gn:"深泽县",y:830,s:0,d:830,l:{830:{g:830,gn:"深泽县（其他）",y:830,s:0,d:0},6439:{g:6439,gn:"深泽县（桥头乡）",y:6439,s:0,d:0}}},130129:{g:130129,gn:"赞皇县",y:829,s:0,d:0},130130:{g:130130,gn:"无极县",y:831,s:0,d:831,l:{831:{g:831,gn:"无极县（其他）",y:831,s:0,d:0},6440:{g:6440,gn:"无极县（城关镇、东候坊镇、郝庄乡、郝庄镇、无极镇、张段固镇）",y:6440,s:0,d:0}}},130131:{g:130131,gn:"平山县",y:821,s:0,d:0},130132:{g:130132,gn:"元氏县",y:832,s:0,d:832,l:{832:{g:832,gn:"元氏县（其他）",y:832,s:0,d:0},6443:{g:6443,gn:"元氏县（槐阳镇、马村乡）",y:6443,s:0,d:0}}},130133:{g:130133,gn:"赵县",y:828,s:0,d:828,l:{828:{g:828,gn:"赵县（其他）",y:828,s:0,d:0},6444:{g:6444,gn:"赵县（新寨店镇、赵州镇）",y:6444,s:0,d:0}}},130181:{g:130181,gn:"辛集市",y:816,s:0,d:816,l:{816:{g:816,gn:"辛集市（其他）",y:816,s:0,d:0},6441:{g:6441,gn:"辛集市（田庄乡、新垒头镇、辛集镇）",y:6441,s:0,d:0}}},130182:{g:130182,gn:"藁城市",y:817,s:0,d:817,l:{817:{g:817,gn:"藁城市（其他）",y:817,s:0,d:0},6434:{g:6434,gn:"藁城市（廉州镇、良村经济技术开发区）",y:6434,s:0,d:0}}},130183:{g:130183,gn:"晋州市",y:818,s:0,d:818,l:{818:{g:818,gn:"晋州市（其他）",y:818,s:0,d:0},6435:{g:6435,gn:"晋州市（桃园镇、小樵镇、营里镇、周家庄乡）",y:6435,s:0,d:0}}},130184:{g:130184,gn:"新乐市",y:819,s:0,d:819,l:{819:{g:819,gn:"新乐市（其他）",y:819,s:0,d:0},6442:{g:6442,gn:"新乐市（长寿街道、承安铺镇、化皮镇）",y:6442,s:0,d:0}}},130185:{g:130185,gn:"鹿泉市",y:820,s:0,d:820,l:{820:{g:820,gn:"鹿泉市（其他）",y:820,s:0,d:0},6437:{g:6437,gn:"鹿泉市（获鹿镇、鹿泉市经济技术开发区、上庄镇、寺家庄镇、铜冶镇）",y:6437,s:0,d:0}}}}},130200:{g:130200,gn:"唐山市",y:935,s:0,d:130281,l:{943:{g:943,gn:"唐海县",y:943,s:0,d:0},3606:{g:3606,gn:"高新技术开发区",y:3606,s:0,d:0},130202:{g:130202,gn:"路南区",y:947,s:0,d:0},130203:{g:130203,gn:"路北区",y:946,s:0,d:0},130204:{g:130204,gn:"古冶区",y:948,s:0,d:948,l:{948:{g:948,gn:"古冶区（大庄坨乡、范各庄乡、王辇庄乡、习家套乡）",y:948,s:0,d:0},6482:{g:6482,gn:"古冶区（其他）",y:6482,s:0,d:0}}},130205:{g:130205,gn:"开平区",y:950,s:0,d:950,l:{950:{g:950,gn:"开平区（其他）",y:950,s:0,d:0},6483:{g:6483,gn:"开平区（开平工业区、开平街道）",y:6483,s:0,d:0}}},130207:{g:130207,gn:"丰南区",y:937,s:0,d:937,l:{937:{g:937,gn:"丰南区（其他）",y:937,s:0,d:0},6478:{g:6478,gn:"丰南区（滨海镇、丰南经济开发区、丰南镇、黄各庄镇、南堡经济开发区）",y:6478,s:0,d:0},6479:{g:6479,gn:"丰南区（南堡开发区、胥各庄街道、胥各庄镇、银丰镇）",y:6479,s:0,d:0}}},130208:{g:130208,gn:"丰润区",y:941,s:0,d:941,l:{941:{g:941,gn:"丰润区（其他）",y:941,s:0,d:0},6480:{g:6480,gn:"丰润区（白官屯镇、常庄乡、丰润镇、浭阳街道、韩城镇）",y:6480,s:0,d:0},6481:{g:6481,gn:"丰润区（石各庄镇、太平路街道、新军屯镇、燕山路街道、银城铺乡）",y:6481,s:0,d:0}}},130223:{g:130223,gn:"滦县",y:945,s:0,d:945,l:{945:{g:945,gn:"滦县（其他）",y:945,s:0,d:0},6486:{g:6486,gn:"滦县（城区街道）",y:6486,s:0,d:0}}},130224:{g:130224,gn:"滦南县",y:940,s:0,d:940,l:{940:{g:940,gn:"滦南县（其他）",y:940,s:0,d:0},6485:{g:6485,gn:"滦南县（奔城街道）",y:6485,s:0,d:0}}},130225:{g:130225,gn:"乐亭县",y:944,s:0,d:944,l:{944:{g:944,gn:"乐亭县（其他）",y:944,s:0,d:0},6484:{g:6484,gn:"乐亭县（城区街道、京唐港）",y:6484,s:0,d:0}}},130227:{g:130227,gn:"迁西县",y:939,s:0,d:939,l:{939:{g:939,gn:"迁西县（其他）",y:939,s:0,d:0},6488:{g:6488,gn:"迁西县（栗乡街道、迁西县金山街栗乡街道、新集镇）",y:6488,s:0,d:0}}},130229:{g:130229,gn:"玉田县",y:942,s:0,d:942,l:{942:{g:942,gn:"玉田县（其他）",y:942,s:0,d:0},6489:{g:6489,gn:"玉田县（城区街道、虹桥镇、石臼窝镇、鸦鸿桥镇、玉田镇）",y:6489,s:0,d:0}}},130281:{g:130281,gn:"遵化市",y:936,s:0,d:936,l:{936:{g:936,gn:"遵化市（其他）",y:936,s:0,d:0},6490:{g:6490,gn:"遵化市（候家寨乡、路北街道、路南街道、遵化镇）",y:6490,s:0,d:0}}},130283:{g:130283,gn:"迁安市",y:938,s:0,d:938,l:{938:{g:938,gn:"迁安市（其他）",y:938,s:0,d:0},6487:{g:6487,gn:"迁安市（迁安镇）",y:6487,s:0,d:0}}}}},130300:{g:130300,gn:"秦皇岛市",y:951,s:0,d:130322,l:{130302:{g:130302,gn:"海港区",y:956,s:0,d:956,l:{956:{g:956,gn:"海港区（西港镇）",y:956,s:0,d:0},6450:{g:6450,gn:"海港区（其他）",y:6450,s:0,d:0}}},130303:{g:130303,gn:"山海关区",y:957,s:0,d:957,l:{957:{g:957,gn:"山海关区（孟姜镇、石河镇）",y:957,s:0,d:0},6451:{g:6451,gn:"山海关区（其他）",y:6451,s:0,d:0}}},130304:{g:130304,gn:"北戴河区",y:958,s:0,d:0},130321:{g:130321,gn:"青龙满族自治县",y:955,s:0,d:0},130322:{g:130322,gn:"昌黎县",y:952,s:0,d:952,l:{952:{g:952,gn:"昌黎县（昌黎镇、荒佃庄乡、荒佃庄镇）",y:952,s:0,d:0},6448:{g:6448,gn:"昌黎县（其他）",y:6448,s:0,d:0}}},130323:{g:130323,gn:"抚宁县",y:954,s:0,d:954,l:{954:{g:954,gn:"抚宁县（城关街道、坟坨管区、抚宁镇、骊城街道、留守营镇、南戴河、南戴河街道、田各庄管区）",y:954,s:0,d:0},6449:{g:6449,gn:"抚宁县（其他）",y:6449,s:0,d:0}}},130324:{g:130324,gn:"卢龙县",y:953,s:0,d:0}}},130400:{g:130400,gn:"邯郸市",y:839,s:0,d:130481,l:{130402:{g:130402,gn:"邯山区",y:857,s:0,d:0},130403:{g:130403,gn:"丛台区",y:855,s:0,d:0},130404:{g:130404,gn:"复兴区",y:856,s:0,d:0},130406:{g:130406,gn:"峰峰矿区",y:858,s:0,d:0},130421:{g:130421,gn:"邯郸县",y:841,s:0,d:0},130423:{g:130423,gn:"临漳县",y:853,s:0,d:0},130424:{g:130424,gn:"成安县",y:846,s:0,d:0},130425:{g:130425,gn:"大名县",y:847,s:0,d:0},130426:{g:130426,gn:"涉 县",y:848,s:0,d:0},130427:{g:130427,gn:"磁 县",y:854,s:0,d:0},130428:{g:130428,gn:"肥乡县",y:852,s:0,d:0},130429:{g:130429,gn:"永年县",y:842,s:0,d:0},130430:{g:130430,gn:"邱 县",y:850,s:0,d:0},130431:{g:130431,gn:"鸡泽县",y:849,s:0,d:0},130432:{g:130432,gn:"广平县",y:851,s:0,d:0},130433:{g:130433,gn:"馆陶县",y:844,s:0,d:0},130434:{g:130434,gn:"魏 县",y:845,s:0,d:0},130435:{g:130435,gn:"曲周县",y:843,s:0,d:0},130481:{g:130481,gn:"武安市",y:840,s:0,d:0}}},130500:{g:130500,gn:"邢台市",y:859,s:0,d:130581,l:{130502:{g:130502,gn:"桥东区",y:877,s:0,d:0},130503:{g:130503,gn:"桥西区",y:878,s:0,d:0},130521:{g:130521,gn:"邢台县",y:862,s:0,d:0},130522:{g:130522,gn:"临城县",y:869,s:0,d:0},130523:{g:130523,gn:"内邱县",y:872,s:0,d:0},130524:{g:130524,gn:"柏乡县",y:863,s:0,d:0},130525:{g:130525,gn:"隆尧县",y:868,s:0,d:0},130526:{g:130526,gn:"任县",y:864,s:0,d:0},130527:{g:130527,gn:"南和县",y:876,s:0,d:0},130528:{g:130528,gn:"宁晋县",y:866,s:0,d:0},130529:{g:130529,gn:"巨鹿县",y:874,s:0,d:0},130530:{g:130530,gn:"新河县",y:875,s:0,d:0},130531:{g:130531,gn:"广宗县",y:870,s:0,d:0},130532:{g:130532,gn:"平乡县",y:873,s:0,d:0},130533:{g:130533,gn:"威县",y:867,s:0,d:0},130534:{g:130534,gn:"清河县",y:865,s:0,d:0},130535:{g:130535,gn:"临西县",y:871,s:0,d:0},130581:{g:130581,gn:"南宫市",y:860,s:0,d:0},130582:{g:130582,gn:"沙河市",y:861,s:0,d:0}}},130600:{g:130600,gn:"保定市",y:879,s:0,d:130681,l:{130602:{g:130602,gn:"新市区",y:902,s:0,d:902,l:{902:{g:902,gn:"新市区（其他）",y:902,s:0,d:0},6464:{g:6464,gn:"新市区（先锋街道、新市场街道、东风街道、建南街道、韩村北路街道、保定国家高新区）",y:6464,s:0,d:0}}},130603:{g:130603,gn:"北市区",y:904,s:0,d:904,l:{904:{g:904,gn:"北市区（其他）",y:904,s:0,d:0},6454:{g:6454,gn:"北市区（韩庄乡、东金庄乡、百楼乡）",y:6454,s:0,d:0}}},130604:{g:130604,gn:"南市区",y:903,s:0,d:903,l:{903:{g:903,gn:"南市区（其他）",y:903,s:0,d:0},6461:{g:6461,gn:"南市区（红星街道、联盟街道、南关街道、永华街道、裕华街道）",y:6461,s:0,d:0}}},130621:{g:130621,gn:"满城县",y:884,s:0,d:884,l:{884:{g:884,gn:"满城县（其他）",y:884,s:0,d:0},6460:{g:6460,gn:"满城县（大册营镇、满城镇）",y:6460,s:0,d:0}}},130622:{g:130622,gn:"清苑县",y:885,s:0,d:885,l:{885:{g:885,gn:"清苑县（其他）",y:885,s:0,d:0},6462:{g:6462,gn:"清苑县（清苑镇、闫庄乡）",y:6462,s:0,d:0}}},130623:{g:130623,gn:"涞水县",y:886,s:0,d:0},130624:{g:130624,gn:"阜平县",y:887,s:0,d:0},130625:{g:130625,gn:"徐水县",y:888,s:0,d:888,l:{888:{g:888,gn:"徐水县（其他）",y:888,s:0,d:0},6465:{g:6465,gn:"徐水县（安肃镇）",y:6465,s:0,d:0}}},130626:{g:130626,gn:"定兴县",y:894,s:0,d:894,l:{894:{g:894,gn:"定兴县（其他）",y:894,s:0,d:0},6455:{g:6455,gn:"定兴县（定兴县城、定兴镇）",y:6455,s:0,d:0}}},130627:{g:130627,gn:"唐县",y:889,s:0,d:0},130628:{g:130628,gn:"高阳县",y:890,s:0,d:890,l:{890:{g:890,gn:"高阳县（其他）",y:890,s:0,d:0},6458:{g:6458,gn:"高阳县（高阳镇、晋庄乡、曲提乡、邢南乡）",y:6458,s:0,d:0}}},130629:{g:130629,gn:"容城县",y:891,s:0,d:891,l:{891:{g:891,gn:"容城县（其他）",y:891,s:0,d:0},6463:{g:6463,gn:"容城县（大河镇、晾马台乡、平王乡、容城镇、小里镇）",y:6463,s:0,d:0}}},130630:{g:130630,gn:"涞源县",y:892,s:0,d:0},130631:{g:130631,gn:"望都县",y:893,s:0,d:0},130632:{g:130632,gn:"安新县",y:895,s:0,d:895,l:{895:{g:895,gn:"安新县（其他）",y:895,s:0,d:0},6453:{g:6453,gn:"安新县（三台镇、安新镇）",y:6453,s:0,d:0}}},130633:{g:130633,gn:"易县",y:896,s:0,d:0},130634:{g:130634,gn:"曲阳县",y:897,s:0,d:0},130635:{g:130635,gn:"蠡县",y:898,s:0,d:898,l:{898:{g:898,gn:"蠡县（其他）",y:898,s:0,d:0},6459:{g:6459,gn:"蠡县（百尺镇、城关镇、大百尺镇、蠡吾镇、留史镇、辛兴镇）",y:6459,s:0,d:0}}},130636:{g:130636,gn:"顺平县",y:899,s:0,d:0},130637:{g:130637,gn:"博野县",y:900,s:0,d:0},130638:{g:130638,gn:"雄县",y:901,s:0,d:901,l:{901:{g:901,gn:"雄县（其他）",y:901,s:0,d:0},6467:{g:6467,gn:"雄县（大营镇、龙湾乡、龙湾镇、雄州镇、昝岗镇、朱各庄乡）",y:6467,s:0,d:0}}},130681:{g:130681,gn:"涿州市",y:880,s:0,d:880,l:{880:{g:880,gn:"涿州市（其他）",y:880,s:0,d:0},6466:{g:6466,gn:"涿州市（清凉寺街道、双塔街道、松林店镇、孙庄乡、桃园街道、涿州市开发区）",y:6466,s:0,d:0}}},130682:{g:130682,gn:"定州市",y:881,s:0,d:881,l:{881:{g:881,gn:"定州市（其他）",y:881,s:0,d:0},6456:{g:6456,gn:"定州市（北城区街道、南城区街道、西城区街道）",y:6456,s:0,d:0}}},130683:{g:130683,gn:"安国市",y:882,s:0,d:882,l:{882:{g:882,gn:"安国市（其他）",y:882,s:0,d:0},6452:{g:6452,gn:"安国市（祁州药市街道、祁州镇、药市街道）",y:6452,s:0,d:0}}},130684:{g:130684,gn:"高碑店市",y:883,s:0,d:883,l:{883:{g:883,gn:"高碑店市（其他）",y:883,s:0,d:0},6457:{g:6457,gn:"高碑店市（白沟镇、北城街道、和平街道、军城街道、兴华路街道）",y:6457,s:0,d:0}}}}},130700:{g:130700,gn:"张家口市",y:905,s:0,d:130721,l:{3534:{g:3534,gn:"高新区",y:3534,s:0,d:0},130702:{g:130702,gn:"桥东区",y:920,s:0,d:0},130703:{g:130703,gn:"桥西区",y:919,s:0,d:0},130705:{g:130705,gn:"宣化区",y:921,s:0,d:0},130706:{g:130706,gn:"下花园区",y:922,s:0,d:0},130721:{g:130721,gn:"宣化县",y:906,s:0,d:0},130722:{g:130722,gn:"张北县",y:908,s:0,d:0},130723:{g:130723,gn:"康保县",y:907,s:0,d:0},130724:{g:130724,gn:"沽源县",y:911,s:0,d:0},130725:{g:130725,gn:"尚义县",y:915,s:0,d:0},130726:{g:130726,gn:"蔚县",y:916,s:0,d:0},130727:{g:130727,gn:"阳原县",y:909,s:0,d:0},130728:{g:130728,gn:"怀安县",y:912,s:0,d:0},130729:{g:130729,gn:"万全县",y:918,s:0,d:0},130730:{g:130730,gn:"怀来县",y:913,s:0,d:0},130731:{g:130731,gn:"涿鹿县",y:917,s:0,d:0},130732:{g:130732,gn:"赤城县",y:910,s:0,d:0},130733:{g:130733,gn:"崇礼县",y:914,s:0,d:0}}},130800:{g:130800,gn:"承德市",y:923,s:0,d:130821,l:{130802:{g:130802,gn:"双桥区",y:932,s:0,d:0},130803:{g:130803,gn:"双滦区",y:933,s:0,d:0},130804:{g:130804,gn:"鹰手营子矿区",y:934,s:0,d:0},130821:{g:130821,gn:"承德县",y:924,s:0,d:0},130822:{g:130822,gn:"兴隆县",y:925,s:0,d:0},130823:{g:130823,gn:"平泉县",y:927,s:0,d:0},130824:{g:130824,gn:"滦平县",y:928,s:0,d:0},130825:{g:130825,gn:"隆化县",y:926,s:0,d:0},130826:{g:130826,gn:"丰宁满族自治县",y:929,s:0,d:0},130827:{g:130827,gn:"宽城满族自治县",y:931,s:0,d:0},130828:{g:130828,gn:"围场满族蒙古族自治县",y:930,s:0,d:0}}},130900:{g:130900,gn:"沧州市",y:959,s:0,d:130981,l:{3604:{g:3604,gn:"南大港管理区",y:3604,s:0,d:0},130902:{g:130902,gn:"新华区",y:975,s:0,d:0},130903:{g:130903,gn:"运河区",y:974,s:0,d:0},130921:{g:130921,gn:"沧县",y:964,s:0,d:0},130922:{g:130922,gn:"青县",y:965,s:0,d:0},130923:{g:130923,gn:"东光县",y:967,s:0,d:0},130924:{g:130924,gn:"海兴县",y:968,s:0,d:0},130925:{g:130925,gn:"盐山县",y:969,s:0,d:0},130926:{g:130926,gn:"肃宁县",y:970,s:0,d:0},130927:{g:130927,gn:"南皮县",y:971,s:0,d:0},130928:{g:130928,gn:"吴桥县",y:972,s:0,d:0},130929:{g:130929,gn:"献县",y:966,s:0,d:0},130930:{g:130930,gn:"孟村回族自治县",y:973,s:0,d:0},130981:{g:130981,gn:"泊头市",y:960,s:0,d:0},130982:{g:130982,gn:"任丘市",y:961,s:0,d:0},130983:{g:130983,gn:"黄骅市",y:962,s:0,d:0},130984:{g:130984,gn:"河间市",y:963,s:0,d:0}}},131000:{g:131000,gn:"廊坊市",y:976,s:0,d:131081,l:{131002:{g:131002,gn:"安次区",y:985,s:0,d:985,l:{985:{g:985,gn:"安次区（其他）",y:985,s:0,d:0},6468:{g:6468,gn:"安次区（北史家务乡、仇庄乡、光明西道街道、杨税务乡、银河南路街道、永华道街道）",y:6468,s:0,d:0}}},131003:{g:131003,gn:"广阳区",y:986,s:0,d:0},131022:{g:131022,gn:"固安县",y:979,s:0,d:979,l:{979:{g:979,gn:"固安县（城区街道、东湾乡、宫村镇、柳泉镇、马庄镇、彭村乡、渠沟乡）",y:979,s:0,d:0},6472:{g:6472,gn:"固安县（其他）",y:6472,s:0,d:0}}},131023:{g:131023,gn:"永清县",y:980,s:0,d:980,l:{980:{g:980,gn:"永清县（其他）",y:980,s:0,d:0},6477:{g:6477,gn:"永清县（北辛溜街道、大辛阁街道、街道、刘其营街道、养马庄街道、永清镇）",y:6477,s:0,d:0}}},131024:{g:131024,gn:"香河县",y:981,s:0,d:981,l:{981:{g:981,gn:"香河县（其他）",y:981,s:0,d:0},6476:{g:6476,gn:"香河县（淑阳镇）",y:6476,s:0,d:0}}},131025:{g:131025,gn:"大城县",y:982,s:0,d:982,l:{982:{g:982,gn:"大城县（其他）",y:982,s:0,d:0},6471:{g:6471,gn:"大城县（留各庄镇、平舒镇）",y:6471,s:0,d:0}}},131026:{g:131026,gn:"文安县",y:983,s:0,d:983,l:{983:{g:983,gn:"文安县(其他)",y:983,s:0,d:0},6474:{g:6474,gn:"文安县(大柳河镇、大围河回族满族乡、史各庄镇、苏桥镇)",y:6474,s:0,d:0},6475:{g:6475,gn:"文安县(文安镇、辛庄管区、新镇镇、兴隆宫镇、赵各庄镇)",y:6475,s:0,d:0}}},131028:{g:131028,gn:"大厂回族自治县",y:984,s:0,d:984,l:{984:{g:984,gn:"大厂回族自治县（其他）",y:984,s:0,d:0},6470:{g:6470,gn:"大厂回族自治县（祈各庄镇、夏垫镇）",y:6470,s:0,d:0}}},131081:{g:131081,gn:"霸州市",y:977,s:0,d:977,l:{977:{g:977,gn:"霸州市（王庄子乡、杨芬港镇）",y:977,s:0,d:0},6469:{g:6469,gn:"霸州市（其他）",y:6469,s:0,d:0}}},131082:{g:131082,gn:"三河市",y:978,s:0,d:978,l:{978:{g:978,gn:"三河市（其他）",y:978,s:0,d:0},6473:{g:6473,gn:"三河市（北城街道、南城街道、洵阳镇、燕郊经济技术开发区、燕郊镇）",y:6473,s:0,d:0}}}}},131100:{g:131100,gn:"衡水市",y:987,s:0,d:131181,l:{131102:{g:131102,gn:"桃城区",y:998,s:0,d:0},131121:{g:131121,gn:"枣强县",y:991,s:0,d:0},131122:{g:131122,gn:"武邑县",y:994,s:0,d:0},131123:{g:131123,gn:"武强县",y:996,s:0,d:0},131124:{g:131124,gn:"饶阳县",y:990,s:0,d:0},131125:{g:131125,gn:"安平县",y:993,s:0,d:0},131126:{g:131126,gn:"故城县",y:992,s:0,d:0},131127:{g:131127,gn:"景县",y:995,s:0,d:0},131128:{g:131128,gn:"阜城县",y:997,s:0,d:0},131181:{g:131181,gn:"冀州市",y:988,s:0,d:0},131182:{g:131182,gn:"深州市",y:989,s:0,d:0}}}}},140000:{g:140000,gn:"山西省",y:2490,s:0,d:140100,l:{140100:{g:140100,gn:"太原市",y:2491,s:0,d:140181,l:{140105:{g:140105,gn:"小店区",y:2497,s:0,d:2497,l:{2497:{g:2497,gn:"小店区（刘家堡乡、西温庄乡）",y:2497,s:0,d:0},6556:{g:6556,gn:"小店区（其他）",y:6556,s:0,d:0}}},140106:{g:140106,gn:"迎泽区",y:2498,s:0,d:0},140107:{g:140107,gn:"杏花岭区",y:2496,s:0,d:2496,l:{2496:{g:2496,gn:"杏花岭区（涧河街道、小返乡）",y:2496,s:0,d:0},6557:{g:6557,gn:"杏花岭区（其他）",y:6557,s:0,d:0}}},140108:{g:140108,gn:"尖草坪区",y:2499,s:0,d:2499,l:{2499:{g:2499,gn:"尖草坪区（其他）",y:2499,s:0,d:0},6553:{g:6553,gn:"尖草坪区（汇丰街道、尖草坪街道、阳曲镇、迎新街道、中涧河乡）",y:6553,s:0,d:0}}},140109:{g:140109,gn:"万柏林区",y:2500,s:0,d:2500,l:{2500:{g:2500,gn:"万柏林区（白家庄街道、东社街道、杜儿坪街道、化客头街道）",y:2500,s:0,d:0},6554:{g:6554,gn:"万柏林区（其他）",y:6554,s:0,d:0},6555:{g:6555,gn:"万柏林区（王封乡、小井峪乡、西铭街道）",y:6555,s:0,d:0}}},140110:{g:140110,gn:"晋源区",y:2501,s:0,d:0},140121:{g:140121,gn:"清徐县",y:2494,s:0,d:0},140122:{g:140122,gn:"阳曲县",y:2493,s:0,d:0},140123:{g:140123,gn:"娄烦县",y:2495,s:0,d:0},140181:{g:140181,gn:"古交市",y:2492,s:0,d:0}}},140200:{g:140200,gn:"大同市",y:2502,s:0,d:140227,l:{140202:{g:140202,gn:"城区",y:2510,s:0,d:0},140203:{g:140203,gn:"矿区",y:2511,s:0,d:0},140211:{g:140211,gn:"南郊区",y:2512,s:0,d:0},140212:{g:140212,gn:"新荣区",y:2513,s:0,d:0},140221:{g:140221,gn:"阳高县",y:2506,s:0,d:0},140222:{g:140222,gn:"天镇县",y:2504,s:0,d:0},140223:{g:140223,gn:"广灵县",y:2508,s:0,d:0},140224:{g:140224,gn:"灵丘县",y:2505,s:0,d:0},140225:{g:140225,gn:"浑源县",y:2509,s:0,d:0},140226:{g:140226,gn:"左云县",y:2507,s:0,d:0},140227:{g:140227,gn:"大同县",y:2503,s:0,d:0}}},140300:{g:140300,gn:"阳泉市",y:2514,s:0,d:140321,l:{140302:{g:140302,gn:"城区",y:2517,s:0,d:0},140303:{g:140303,gn:"矿区",y:2518,s:0,d:0},140311:{g:140311,gn:"郊区",y:2519,s:0,d:0},140321:{g:140321,gn:"平定县",y:2515,s:0,d:0},140322:{g:140322,gn:"盂县",y:2516,s:0,d:0}}},140400:{g:140400,gn:"长治市",y:2520,s:0,d:140481,l:{140402:{g:140402,gn:"城区",y:2532,s:0,d:0},140411:{g:140411,gn:"郊区",y:2533,s:0,d:0},140421:{g:140421,gn:"长治县",y:2522,s:0,d:0},140423:{g:140423,gn:"襄垣县",y:2525,s:0,d:0},140424:{g:140424,gn:"屯留县",y:2527,s:0,d:0},140425:{g:140425,gn:"平顺县",y:2524,s:0,d:0},140426:{g:140426,gn:"黎城县",y:2528,s:0,d:0},140427:{g:140427,gn:"壶关县",y:2531,s:0,d:0},140428:{g:140428,gn:"长子县",y:2523,s:0,d:0},140429:{g:140429,gn:"武乡县",y:2529,s:0,d:0},140430:{g:140430,gn:"沁县",y:2530,s:0,d:0},140431:{g:140431,gn:"沁源县",y:2526,s:0,d:0},140481:{g:140481,gn:"潞城市",y:2521,s:0,d:0}}},140500:{g:140500,gn:"晋城市",y:2534,s:0,d:140581,l:{140502:{g:140502,gn:"城区",y:2540,s:0,d:0},140521:{g:140521,gn:"沁水县",y:2539,s:0,d:0},140522:{g:140522,gn:"阳城县",y:2538,s:0,d:0},140524:{g:140524,gn:"陵川县",y:2537,s:0,d:0},140525:{g:140525,gn:"泽州县",y:2536,s:0,d:0},140581:{g:140581,gn:"高平市",y:2535,s:0,d:0}}},140600:{g:140600,gn:"朔州市",y:2541,s:0,d:140621,l:{140602:{g:140602,gn:"朔城区",y:2546,s:0,d:0},140603:{g:140603,gn:"平鲁区",y:2547,s:0,d:0},140621:{g:140621,gn:"山阴县",y:2542,s:0,d:0},140622:{g:140622,gn:"应县",y:2544,s:0,d:0},140623:{g:140623,gn:"右玉县",y:2543,s:0,d:0},140624:{g:140624,gn:"怀仁县",y:2545,s:0,d:0}}},140700:{g:140700,gn:"晋中市",y:2548,s:0,d:140781,l:{140702:{g:140702,gn:"榆次区",y:2559,s:0,d:0},140721:{g:140721,gn:"榆社县",y:2558,s:0,d:0},140722:{g:140722,gn:"左权县",y:2553,s:0,d:0},140723:{g:140723,gn:"和顺县",y:2556,s:0,d:0},140724:{g:140724,gn:"昔阳县",y:2550,s:0,d:0},140725:{g:140725,gn:"寿阳县",y:2554,s:0,d:0},140726:{g:140726,gn:"太谷县",y:2555,s:0,d:0},140727:{g:140727,gn:"祁县",y:2552,s:0,d:0},140728:{g:140728,gn:"平遥县",y:2557,s:0,d:0},140729:{g:140729,gn:"灵石县",y:2551,s:0,d:0},140781:{g:140781,gn:"介休市",y:2549,s:0,d:0}}},140800:{g:140800,gn:"运城市",y:2607,s:0,d:140802,l:{140802:{g:140802,gn:"盐湖区",y:2608,s:0,d:0},140821:{g:140821,gn:"临猗县",y:2620,s:0,d:0},140822:{g:140822,gn:"万荣县",y:2619,s:0,d:0},140823:{g:140823,gn:"闻喜县",y:2611,s:0,d:0},140824:{g:140824,gn:"稷山县",y:2616,s:0,d:0},140825:{g:140825,gn:"新绛县",y:2612,s:0,d:0},140826:{g:140826,gn:"绛县",y:2615,s:0,d:0},140827:{g:140827,gn:"垣曲县",y:2614,s:0,d:0},140828:{g:140828,gn:"夏县",y:2618,s:0,d:0},140829:{g:140829,gn:"平陆县",y:2613,s:0,d:0},140830:{g:140830,gn:"芮城县",y:2617,s:0,d:0},140881:{g:140881,gn:"永济市",y:2610,s:0,d:0},140882:{g:140882,gn:"河津市",y:2609,s:0,d:0}}},140900:{g:140900,gn:"忻州市",y:2560,s:0,d:140902,l:{140902:{g:140902,gn:"忻府区",y:2561,s:0,d:0},140921:{g:140921,gn:"定襄县",y:2573,s:0,d:0},140922:{g:140922,gn:"五台县",y:2566,s:0,d:0},140923:{g:140923,gn:"代县",y:2563,s:0,d:0},140924:{g:140924,gn:"繁峙县",y:2570,s:0,d:0},140925:{g:140925,gn:"宁武县",y:2568,s:0,d:0},140926:{g:140926,gn:"静乐县",y:2569,s:0,d:0},140927:{g:140927,gn:"神池县",y:2564,s:0,d:0},140928:{g:140928,gn:"五寨县",y:2565,s:0,d:0},140929:{g:140929,gn:"岢岚县",y:2574,s:0,d:0},140930:{g:140930,gn:"河曲县",y:2571,s:0,d:0},140931:{g:140931,gn:"保德县",y:2572,s:0,d:0},140932:{g:140932,gn:"偏关县",y:2567,s:0,d:0},140981:{g:140981,gn:"原平市",y:2562,s:0,d:0}}},141000:{g:141000,gn:"临汾市",y:2589,s:0,d:141081,l:{141002:{g:141002,gn:"尧都区",y:2606,s:0,d:0},141021:{g:141021,gn:"曲沃县",y:2603,s:0,d:0},141022:{g:141022,gn:"翼城县",y:2600,s:0,d:0},141023:{g:141023,gn:"襄汾县",y:2599,s:0,d:0},141024:{g:141024,gn:"洪洞县",y:2604,s:0,d:0},141025:{g:141025,gn:"古县",y:2597,s:0,d:0},141026:{g:141026,gn:"安泽县",y:2594,s:0,d:0},141027:{g:141027,gn:"浮山县",y:2596,s:0,d:0},141028:{g:141028,gn:"吉县",y:2593,s:0,d:0},141029:{g:141029,gn:"乡宁县",y:2602,s:0,d:0},141030:{g:141030,gn:"大宁县",y:2595,s:0,d:0},141031:{g:141031,gn:"隰县",y:2598,s:0,d:0},141032:{g:141032,gn:"永和县",y:2601,s:0,d:0},141033:{g:141033,gn:"蒲县",y:2605,s:0,d:0},141034:{g:141034,gn:"汾西县",y:2592,s:0,d:0},141081:{g:141081,gn:"侯马市",y:2590,s:0,d:0},141082:{g:141082,gn:"霍州市",y:2591,s:0,d:0}}},141100:{g:141100,gn:"吕梁地区",y:2575,s:0,d:141102,l:{141102:{g:141102,gn:"离石市",y:2576,s:0,d:0},141121:{g:141121,gn:"文水县",y:2579,s:0,d:0},141122:{g:141122,gn:"交城县",y:2587,s:0,d:0},141123:{g:141123,gn:"兴县",y:2581,s:0,d:0},141124:{g:141124,gn:"临县",y:2582,s:0,d:0},141125:{g:141125,gn:"柳林县",y:2584,s:0,d:0},141126:{g:141126,gn:"石楼县",y:2588,s:0,d:0},141127:{g:141127,gn:"岚县",y:2585,s:0,d:0},141128:{g:141128,gn:"方山县",y:2583,s:0,d:0},141129:{g:141129,gn:"中阳县",y:2580,s:0,d:0},141130:{g:141130,gn:"交口县",y:2586,s:0,d:0},141181:{g:141181,gn:"孝义市",y:2577,s:0,d:0},141182:{g:141182,gn:"汾阳市",y:2578,s:0,d:0}}}}},150000:{g:150000,gn:"内蒙古自治区",y:2016,s:0,d:150100,l:{150100:{g:150100,gn:"呼和浩特市",y:2017,s:0,d:150122,l:{150102:{g:150102,gn:"新城区",y:2025,s:0,d:2025,l:{2025:{g:2025,gn:"新城区（保和少镇、毫沁营镇、小井乡）",y:2025,s:0,d:0},6551:{g:6551,gn:"新城区（其他）",y:6551,s:0,d:0}}},150103:{g:150103,gn:"回民区",y:2023,s:0,d:2023,l:{2023:{g:2023,gn:"回民区（金山开发区）",y:2023,s:0,d:0},6548:{g:6548,gn:"回民区（其他）",y:6548,s:0,d:0}}},150104:{g:150104,gn:"玉泉区",y:2024,s:0,d:2024,l:{2024:{g:2024,gn:"玉泉区（其他）",y:2024,s:0,d:0},6552:{g:6552,gn:"玉泉区（金川开发区南区、桃花乡）",y:6552,s:0,d:0}}},150105:{g:150105,gn:"赛罕区",y:2026,s:0,d:2026,l:{2026:{g:2026,gn:"赛罕区（巴彦镇、黄河少镇、金河镇、巧报镇）",y:2026,s:0,d:0},6549:{g:6549,gn:"赛罕区（太平庄乡、西把棚乡、西把栅乡、榆林镇）",y:6549,s:0,d:0},6550:{g:6550,gn:"赛罕区（其他）",y:6550,s:0,d:0}}},150121:{g:150121,gn:"土默特左旗",y:2022,s:0,d:0},150122:{g:150122,gn:"托克托县",y:2018,s:0,d:0},150123:{g:150123,gn:"和林格尔县",y:2021,s:0,d:2021,l:{2021:{g:2021,gn:"和林格尔县（其他）",y:2021,s:0,d:0},6547:{g:6547,gn:"和林格尔县（盛乐工业园区、盛乐园区、盛乐镇）",y:6547,s:0,d:0}}},150124:{g:150124,gn:"清水河县",y:2019,s:0,d:0},150125:{g:150125,gn:"武川县",y:2020,s:0,d:0}}},150200:{g:150200,gn:"包头市",y:2027,s:0,d:150203,l:{3514:{g:3514,gn:"稀土开发区",y:3514,s:0,d:0},150202:{g:150202,gn:"东河区",y:2030,s:0,d:0},150203:{g:150203,gn:"昆都仑区",y:2028,s:0,d:0},150204:{g:150204,gn:"青山区",y:2029,s:0,d:0},150205:{g:150205,gn:"石拐区",y:2031,s:0,d:0},150206:{g:150206,gn:"白云矿区",y:2032,s:0,d:0},150207:{g:150207,gn:"九原区",y:2033,s:0,d:0},150221:{g:150221,gn:"土默特右旗",y:2035,s:0,d:0},150222:{g:150222,gn:"固阳县",y:2034,s:0,d:0},150223:{g:150223,gn:"达尔罕茂明安联合旗",y:2036,s:0,d:0}}},150300:{g:150300,gn:"乌海市",y:2037,s:0,d:150302,l:{150302:{g:150302,gn:"海勃湾区",y:2038,s:0,d:0},150303:{g:150303,gn:"海南区",y:2040,s:0,d:0},150304:{g:150304,gn:"乌达区",y:2039,s:0,d:0}}},150400:{g:150400,gn:"赤峰市",y:2041,s:0,d:150402,l:{150402:{g:150402,gn:"红山区",y:2042,s:0,d:0},150403:{g:150403,gn:"元宝山区",y:2043,s:0,d:0},150404:{g:150404,gn:"松山区",y:2044,s:0,d:0},150421:{g:150421,gn:"阿鲁科尔沁旗",y:2050,s:0,d:0},150422:{g:150422,gn:"巴林左旗",y:2048,s:0,d:0},150423:{g:150423,gn:"巴林右旗",y:2053,s:0,d:0},150424:{g:150424,gn:"林西县",y:2046,s:0,d:0},150425:{g:150425,gn:"克什克腾旗",y:2052,s:0,d:0},150426:{g:150426,gn:"翁牛特旗",y:2051,s:0,d:0},150428:{g:150428,gn:"喀喇沁旗",y:2047,s:0,d:0},150429:{g:150429,gn:"宁城县",y:2045,s:0,d:0},150430:{g:150430,gn:"敖汉旗",y:2049,s:0,d:0}}},150500:{g:150500,gn:"通辽市",y:2093,s:0,d:150502,l:{150502:{g:150502,gn:"科尔沁区",y:2094,s:0,d:0},150521:{g:150521,gn:"科尔沁左翼中旗",y:2097,s:0,d:0},150522:{g:150522,gn:"科尔沁左翼后旗",y:2098,s:0,d:0},150523:{g:150523,gn:"开鲁县",y:2096,s:0,d:0},150524:{g:150524,gn:"库伦旗",y:2099,s:0,d:0},150525:{g:150525,gn:"奈曼旗",y:2100,s:0,d:0},150526:{g:150526,gn:"扎鲁特旗",y:2101,s:0,d:0},150581:{g:150581,gn:"霍林郭勒市",y:2095,s:0,d:0}}},150600:{g:150600,gn:"鄂尔多斯市",y:2102,s:0,d:150602,l:{150602:{g:150602,gn:"东胜区",y:2103,s:0,d:0},150621:{g:150621,gn:"达拉特旗",y:2110,s:0,d:0},150622:{g:150622,gn:"准格尔旗",y:2104,s:0,d:0},150623:{g:150623,gn:"鄂托克前旗",y:2108,s:0,d:0},150624:{g:150624,gn:"鄂托克旗",y:2107,s:0,d:0},150625:{g:150625,gn:"杭锦旗",y:2109,s:0,d:0},150626:{g:150626,gn:"乌审旗",y:2105,s:0,d:0},150627:{g:150627,gn:"伊金霍洛旗",y:2106,s:0,d:0}}},150700:{g:150700,gn:"呼伦贝尔市",y:2079,s:0,d:150702,l:{150702:{g:150702,gn:"海拉尔市",y:2080,s:0,d:0},150721:{g:150721,gn:"阿荣旗",y:2087,s:0,d:0},150722:{g:150722,gn:"莫力达瓦达斡尔族自治旗",y:2091,s:0,d:0},150723:{g:150723,gn:"鄂伦春自治旗",y:2090,s:0,d:0},150724:{g:150724,gn:"鄂温克族自治旗",y:2092,s:0,d:0},150725:{g:150725,gn:"陈巴尔虎旗",y:2086,s:0,d:0},150726:{g:150726,gn:"新巴尔虎左旗",y:2088,s:0,d:0},150727:{g:150727,gn:"新巴尔虎右旗",y:2089,s:0,d:0},150781:{g:150781,gn:"满洲里市",y:2081,s:0,d:0},150782:{g:150782,gn:"牙克石市",y:2082,s:0,d:0},150783:{g:150783,gn:"扎兰屯市",y:2083,s:0,d:0},150784:{g:150784,gn:"额尔古纳市",y:2085,s:0,d:0},150785:{g:150785,gn:"根河市",y:2084,s:0,d:0}}},150800:{g:150800,gn:"巴彦淖尔盟",y:2111,s:0,d:150802,l:{150802:{g:150802,gn:"临河市",y:2112,s:0,d:0},150821:{g:150821,gn:"五原县",y:2113,s:0,d:0},150822:{g:150822,gn:"磴口县",y:2114,s:0,d:0},150823:{g:150823,gn:"乌拉特前旗",y:2117,s:0,d:0},150824:{g:150824,gn:"乌拉特中旗",y:2116,s:0,d:0},150825:{g:150825,gn:"乌拉特后旗",y:2118,s:0,d:0},150826:{g:150826,gn:"杭锦后旗",y:2115,s:0,d:0}}},150900:{g:150900,gn:"乌兰察布盟",y:2054,s:0,d:150902,l:{150902:{g:150902,gn:"集宁市",y:2055,s:0,d:0},150921:{g:150921,gn:"卓资县",y:2058,s:0,d:0},150922:{g:150922,gn:"化德县",y:2061,s:0,d:0},150923:{g:150923,gn:"商都县",y:2059,s:0,d:0},150924:{g:150924,gn:"兴和县",y:2057,s:0,d:0},150925:{g:150925,gn:"凉城县",y:2060,s:0,d:0},150926:{g:150926,gn:"察哈尔右翼前旗",y:2062,s:0,d:0},150927:{g:150927,gn:"察哈尔右翼中旗",y:2063,s:0,d:0},150928:{g:150928,gn:"察哈尔右翼后旗",y:2064,s:0,d:0},150929:{g:150929,gn:"四子王旗",y:2065,s:0,d:0},150981:{g:150981,gn:"丰镇市",y:2056,s:0,d:0}}},152200:{g:152200,gn:"兴安盟",y:2123,s:0,d:152201,l:{152201:{g:152201,gn:"乌兰浩特市",y:2124,s:0,d:0},152202:{g:152202,gn:"阿尔山市",y:2125,s:0,d:0},152221:{g:152221,gn:"科尔沁右翼前旗",y:2128,s:0,d:0},152222:{g:152222,gn:"科尔沁右翼中旗",y:2129,s:0,d:0},152223:{g:152223,gn:"扎贲特旗",y:2127,s:0,d:0},152224:{g:152224,gn:"突泉县",y:2126,s:0,d:0}}},152500:{g:152500,gn:"锡林郭勒盟",y:2066,s:0,d:152502,l:{152501:{g:152501,gn:"二连浩特市",y:2068,s:0,d:0},152502:{g:152502,gn:"锡林浩特市",y:2067,s:0,d:0},152522:{g:152522,gn:"阿巴嘎旗",y:2070,s:0,d:0},152523:{g:152523,gn:"苏尼特左旗",y:2073,s:0,d:0},152524:{g:152524,gn:"苏尼特右旗",y:2074,s:0,d:0},152525:{g:152525,gn:"东乌珠穆沁旗",y:2072,s:0,d:0},152526:{g:152526,gn:"西乌珠穆沁旗",y:2071,s:0,d:0},152527:{g:152527,gn:"太仆寺旗",y:2075,s:0,d:0},152528:{g:152528,gn:"镶黄旗",y:2078,s:0,d:0},152529:{g:152529,gn:"正镶白旗",y:2076,s:0,d:0},152530:{g:152530,gn:"正蓝旗",y:2077,s:0,d:0},152531:{g:152531,gn:"多伦县",y:2069,s:0,d:0}}},152900:{g:152900,gn:"阿拉善盟",y:2119,s:0,d:152921,l:{152921:{g:152921,gn:"阿拉善左旗",y:2120,s:0,d:0},152922:{g:152922,gn:"阿拉善右旗",y:2121,s:0,d:0},152923:{g:152923,gn:"额济纳旗",y:2122,s:0,d:0}}}}},210000:{g:210000,gn:"辽宁省",y:1900,s:0,d:210100,l:{210100:{g:210100,gn:"沈阳市",y:1901,s:0,d:5671,l:{5671:{g:5671,gn:"浑南新区（浑河站东街道、五三街道）",y:5671,s:0,d:0},5672:{g:5672,gn:"浑南新区（其他）",y:5672,s:0,d:0},6040:{g:6040,gn:"棋盘山开发区",y:6040,s:0,d:0},210102:{g:210102,gn:"和平区",y:1908,s:0,d:1908,l:{1908:{g:1908,gn:"和平区（二环外）",y:1908,s:0,d:0},5179:{g:5179,gn:"和平区（二环内）",y:5179,s:0,d:0}}},210103:{g:210103,gn:"沈河区",y:1906,s:0,d:1906,l:{1906:{g:1906,gn:"沈河区（二环外）",y:1906,s:0,d:0},5182:{g:5182,gn:"沈河区（二环内）",y:5182,s:0,d:0}}},210104:{g:210104,gn:"大东区",y:1914,s:0,d:1914,l:{1914:{g:1914,gn:"大东区（二环外）",y:1914,s:0,d:0},5181:{g:5181,gn:"大东区（二环内）",y:5181,s:0,d:0}}},210105:{g:210105,gn:"皇姑区",y:1907,s:0,d:1907,l:{1907:{g:1907,gn:"皇姑区（二环外）",y:1907,s:0,d:0},5178:{g:5178,gn:"皇姑区（二环内）",y:5178,s:0,d:0}}},210106:{g:210106,gn:"铁西区",y:1909,s:0,d:1909,l:{1909:{g:1909,gn:"铁西区（二环外）",y:1909,s:0,d:0},5180:{g:5180,gn:"铁西区（二环内）",y:5180,s:0,d:0}}},210111:{g:210111,gn:"苏家屯区",y:5677,s:0,d:5677,l:{5677:{g:5677,gn:"苏家屯区（其他）",y:5677,s:0,d:0},6033:{g:6033,gn:"苏家屯区（白清寨乡、陈相屯镇、大沟乡、十里河镇、佟沟乡）",y:6033,s:0,d:0},6037:{g:6037,gn:"苏家屯区（王纲堡乡、王纲乡、姚千户屯镇、姚千户镇、永乐乡）",y:6037,s:0,d:0}}},210112:{g:210112,gn:"东陵区",y:5666,s:0,d:5666,l:{5666:{g:5666,gn:"东陵区（其他）",y:5666,s:0,d:0},6038:{g:6038,gn:"东陵区（高坎镇、古城子镇、李相镇、满堂乡、王滨沟乡）",y:6038,s:0,d:0},6039:{g:6039,gn:"东陵区（王滨乡、祝家镇）",y:6039,s:0,d:0}}},210113:{g:210113,gn:"沈北新区",y:5674,s:0,d:5674,l:{5674:{g:5674,gn:"沈北新区（其他）",y:5674,s:0,d:0},6032:{g:6032,gn:"沈北新区（道义街道、道义镇、虎石台街道、虎石台镇）",y:6032,s:0,d:0},6036:{g:6036,gn:"沈北新区（辉山街道、蒲河镇、新城子街道）",y:6036,s:0,d:0}}},210114:{g:210114,gn:"于洪区",y:1912,s:0,d:0},210122:{g:210122,gn:"辽中县",y:6030,s:0,d:6030,l:{6030:{g:6030,gn:"辽中县（辽中镇）",y:6030,s:0,d:0},6031:{g:6031,gn:"辽中县（其他））",y:6031,s:0,d:0}}},210123:{g:210123,gn:"康平县",y:1905,s:0,d:0},210124:{g:210124,gn:"法库县",y:1903,s:0,d:0},210181:{g:210181,gn:"新民市",y:5682,s:0,d:5682,l:{5682:{g:5682,gn:"新民市（其他）",y:5682,s:0,d:0},6034:{g:6034,gn:"新民市（大喇嘛乡、东城街道、胡台镇、辽滨街道、西城街道、新城街道、新柳街道））",y:6034,s:0,d:0},6035:{g:6035,gn:"新民市（兴隆镇、兴隆堡镇）",y:6035,s:0,d:0}}}}},210200:{g:210200,gn:"大连市",y:1915,s:0,d:1926,l:{1926:{g:1926,gn:"开发区",y:1926,s:0,d:0},5688:{g:5688,gn:"高新园区",y:5688,s:0,d:0},210202:{g:210202,gn:"中山区",y:1921,s:0,d:0},210203:{g:210203,gn:"西岗区",y:1920,s:0,d:0},210204:{g:210204,gn:"沙河口区",y:1922,s:0,d:0},210211:{g:210211,gn:"甘井子区",y:6093,s:0,d:6093,l:{6093:{g:6093,gn:"甘井子区（小平岛）",y:6093,s:0,d:0},6094:{g:6094,gn:"甘井子区（其他）",y:6094,s:0,d:0}}},210212:{g:210212,gn:"旅顺口区",y:5588,s:0,d:5588,l:{5588:{g:5588,gn:"旅顺口区（其他）",y:5588,s:0,d:0},6099:{g:6099,gn:"旅顺口区（得胜街道、登峰街道、光荣街道、旅顺经济技术开发区）",y:6099,s:0,d:0},6100:{g:6100,gn:"旅顺口区（三涧堡街道、市场街道、水师营街道、铁山镇）",y:6100,s:0,d:0},6101:{g:6101,gn:"旅顺口区（龙王塘街道）",y:6101,s:0,d:0}}},210213:{g:210213,gn:"金州区",y:5585,s:0,d:5585,l:{5585:{g:5585,gn:"金州区（其他）",y:5585,s:0,d:0},6095:{g:6095,gn:"金州区（得胜镇、德胜镇、董家沟街道、光明街道、海青岛街道、金满街道）",y:6095,s:0,d:0},6096:{g:6096,gn:"金州区（金石滩街道、马桥子街道、三十里堡街道、石河街道、石河镇）",y:6096,s:0,d:0},6097:{g:6097,gn:"金州区（湾里街道、先进街道、拥政街道、友谊街道、站前街道、中长街道）",y:6097,s:0,d:0},6098:{g:6098,gn:"金州区（保税区物流园、大孤山街道）",y:6098,s:0,d:0}}},210224:{g:210224,gn:"长海县",y:6091,s:0,d:6091,l:{6091:{g:6091,gn:"长海县（大长山岛镇）",y:6091,s:0,d:0},6092:{g:6092,gn:"长海县（其他）",y:6092,s:0,d:0}}},210281:{g:210281,gn:"瓦房店市",y:5592,s:0,d:5592,l:{5592:{g:5592,gn:"瓦房店市（岭东街道、铁东街道）",y:5592,s:0,d:0},6105:{g:6105,gn:"瓦房店市（长兴岛工业区、长兴岛街道、长兴镇、得利寺镇、岗店办事处）",y:6105,s:0,d:0},6106:{g:6106,gn:"瓦房店市（岗店街道、共济办事处、共济街道、松树镇、文兰办事处）",y:6106,s:0,d:0},6107:{g:6107,gn:"瓦房店市（文兰街道、新华办事处、新华街道、祝华办事处、祝华街道）",y:6107,s:0,d:0},6108:{g:6108,gn:"瓦房店市（其他）",y:6108,s:0,d:0}}},210282:{g:210282,gn:"普兰店市",y:6102,s:0,d:6102,l:{6102:{g:6102,gn:"普兰店市（波兰街道、久寿街道、李店街道、南山街道、铁西街道）",y:6102,s:0,d:0},6103:{g:6103,gn:"普兰店市（皮口镇、三十里堡镇、台山街道、太平办事处、太平街道、铁西办事处）",y:6103,s:0,d:0},6104:{g:6104,gn:"普兰店市（其他）",y:6104,s:0,d:0}}},210283:{g:210283,gn:"庄河市",y:5594,s:0,d:5594,l:{5594:{g:5594,gn:"庄河市（其他）",y:5594,s:0,d:0},6109:{g:6109,gn:"庄河市（城关街道、大连花园口经济区、青堆镇、太平岭满族乡、新华街道、兴达街道）",y:6109,s:0,d:0},6110:{g:6110,gn:"庄河市（昌盛街道）",y:6110,s:0,d:0}}}}},210300:{g:210300,gn:"鞍山市",y:1927,s:0,d:6415,l:{6415:{g:6415,gn:"鞍山经济开发区",y:6415,s:0,d:0},210302:{g:210302,gn:"铁东区",y:5605,s:0,d:0},210303:{g:210303,gn:"铁西区",y:5607,s:0,d:0},210304:{g:210304,gn:"立山区",y:5600,s:0,d:5600,l:{5600:{g:5600,gn:"立山区（千山风景区）",y:5600,s:0,d:0},5602:{g:5602,gn:"立山区（其他）",y:5602,s:0,d:0}}},210311:{g:210311,gn:"千山区",y:5603,s:0,d:5603,l:{5603:{g:5603,gn:"千山区（千山镇、唐家房镇）",y:5603,s:0,d:0},5604:{g:5604,gn:"千山区（其他）",y:5604,s:0,d:0},6418:{g:6418,gn:"千山区（东鞍山镇）",y:6418,s:0,d:0}}},210321:{g:210321,gn:"台安县",y:1933,s:0,d:0},210323:{g:210323,gn:"岫岩满族自治县",y:1934,s:0,d:0},210381:{g:210381,gn:"海城市",y:1932,s:0,d:1932,l:{1932:{g:1932,gn:"海城市（孤山镇、岔沟镇、接文镇、析木镇、马风镇）",y:1932,s:0,d:0},6416:{g:6416,gn:"海城市（牌楼镇、英落镇、望台镇、温香镇、高坨镇）",y:6416,s:0,d:0},6417:{g:6417,gn:"海城市（其他）",y:6417,s:0,d:0}}}}},210400:{g:210400,gn:"抚顺市",y:1935,s:0,d:210421,l:{210402:{g:210402,gn:"新抚区",y:5631,s:0,d:5631,l:{5631:{g:5631,gn:"新抚区（站前街道、榆林街道、东公园街道、福民街道、南阳街道）",y:5631,s:0,d:0},5632:{g:5632,gn:"新抚区（千金街道、新抚街道、永安台街道）",y:5632,s:0,d:0},5633:{g:5633,gn:"新抚区（其他）",y:5633,s:0,d:0}}},210403:{g:210403,gn:"东洲区",y:5623,s:0,d:5623,l:{5623:{g:5623,gn:"东洲区（搭连街道、东洲街道、南花园街道、平山街道）",y:5623,s:0,d:0},5624:{g:5624,gn:"东洲区（其他）",y:5624,s:0,d:0}}},210404:{g:210404,gn:"望花区",y:5627,s:0,d:5627,l:{5627:{g:5627,gn:"望花区（演武街道、新民街道、五老屯街道、工农街道、古城子街道）",y:5627,s:0,d:0},5628:{g:5628,gn:"望花区（光明街道、和平街道、建设街道、李石街道、田屯街道）",y:5628,s:0,d:0},5629:{g:5629,gn:"望花区（朴屯街道）",y:5629,s:0,d:0},5630:{g:5630,gn:"望花区（其他）",y:5630,s:0,d:0}}},210411:{g:210411,gn:"顺城区",y:5625,s:0,d:5625,l:{5625:{g:5625,gn:"顺城区（河北乡、会元乡、前甸镇）",y:5625,s:0,d:0},5626:{g:5626,gn:"顺城区（其他）",y:5626,s:0,d:0}}},210421:{g:210421,gn:"抚顺县",y:1936,s:0,d:0},210422:{g:210422,gn:"新宾满族自治县",y:1938,s:0,d:0},210423:{g:210423,gn:"清原满族自治县",y:1937,s:0,d:0}}},210500:{g:210500,gn:"本溪市",y:1943,s:0,d:3532,l:{3532:{g:3532,gn:"经济开发区",y:3532,s:0,d:0},210502:{g:210502,gn:"平山区",y:5612,s:0,d:5612,l:{5612:{g:5612,gn:"平山区（桥头镇）",y:5612,s:0,d:0},5613:{g:5613,gn:"平山区（其他）",y:5613,s:0,d:0}}},210503:{g:210503,gn:"溪湖区",y:5614,s:0,d:5614,l:{5614:{g:5614,gn:"溪湖区（彩北街道、彩屯街道、河东街道、河西街道）",y:5614,s:0,d:0},5615:{g:5615,gn:"溪湖区（其他）",y:5615,s:0,d:0}}},210504:{g:210504,gn:"明山区",y:5609,s:0,d:5609,l:{5609:{g:5609,gn:"明山区（新明街道、北地街道、东兴街道、高峪街道、金山街道）",y:5609,s:0,d:0},5610:{g:5610,gn:"明山区（明山街道）",y:5610,s:0,d:0},5611:{g:5611,gn:"明山区（其他）",y:5611,s:0,d:0}}},210505:{g:210505,gn:"南芬区",y:1947,s:0,d:0},210521:{g:210521,gn:"本溪满族自治县",y:1948,s:0,d:0},210522:{g:210522,gn:"桓仁满族自治县",y:1949,s:0,d:0}}},210600:{g:210600,gn:"丹东市",y:1950,s:0,d:210681,l:{210602:{g:210602,gn:"元宝区",y:5595,s:0,d:5595,l:{5595:{g:5595,gn:"元宝区（蛤蟆塘镇、九道街道、兴东街道）",y:5595,s:0,d:0},5596:{g:5596,gn:"元宝区（其他）",y:5596,s:0,d:0}}},210603:{g:210603,gn:"振兴区",y:1954,s:0,d:0},210604:{g:210604,gn:"振安区",y:5597,s:0,d:5597,l:{5597:{g:5597,gn:"振安区（珍珠街道、花园街道、临江街道、帽盔山街道、头道桥街道）",y:5597,s:0,d:0},5598:{g:5598,gn:"振安区（纤维街道、永昌街道、站前街道）",y:5598,s:0,d:0},5599:{g:5599,gn:"振安区（其他）",y:5599,s:0,d:0}}},210624:{g:210624,gn:"宽甸满族自治县",y:1953,s:0,d:0},210681:{g:210681,gn:"东港市",y:1951,s:0,d:0},210682:{g:210682,gn:"凤城市",y:1952,s:0,d:0}}},210700:{g:210700,gn:"锦州市",y:1957,s:0,d:210781,l:{3509:{g:3509,gn:"经济技术开发区",y:3509,s:0,d:0},210702:{g:210702,gn:"古塔区",y:5649,s:0,d:5649,l:{5649:{g:5649,gn:"古塔区（其他）",y:5649,s:0,d:0},5650:{g:5650,gn:"古塔区（北街道、南街道）",y:5650,s:0,d:0}}},210703:{g:210703,gn:"凌河区",y:5651,s:0,d:5651,l:{5651:{g:5651,gn:"凌河区（百股镇、农工商街道、铁新镇、中屯乡）",y:5651,s:0,d:0},5652:{g:5652,gn:"凌河区（其他）",y:5652,s:0,d:0}}},210711:{g:210711,gn:"太和区",y:5653,s:0,d:5653,l:{5653:{g:5653,gn:"太和区（钟屯乡、营盘乡、兴隆镇、新民乡、王家街道）",y:5653,s:0,d:0},5654:{g:5654,gn:"太和区（天桥街道、凌西街道、太和街道）",y:5654,s:0,d:0},5655:{g:5655,gn:"太和区（其他）",y:5655,s:0,d:0}}},210726:{g:210726,gn:"黑山县",y:1960,s:0,d:0},210727:{g:210727,gn:"义县",y:1961,s:0,d:0},210781:{g:210781,gn:"凌海市",y:1958,s:0,d:0},210782:{g:210782,gn:"北镇市",y:1959,s:0,d:0}}},210800:{g:210800,gn:"营口市",y:1965,s:0,d:3533,l:{3533:{g:3533,gn:"高新区",y:3533,s:0,d:0},210802:{g:210802,gn:"站前区",y:5686,s:0,d:5686,l:{5686:{g:5686,gn:"站前区（新生农场）",y:5686,s:0,d:0},5687:{g:5687,gn:"站前区（其他）",y:5687,s:0,d:0}}},210803:{g:210803,gn:"西市区",y:1969,s:0,d:0},210804:{g:210804,gn:"鲅鱼圈区",y:6111,s:0,d:6111,l:{6111:{g:6111,gn:"鲅鱼圈区（海东街道、海星街道、红海街道、红旗镇）",y:6111,s:0,d:0},6112:{g:6112,gn:"鲅鱼圈区（芦屯镇、双台镇、仙人岛能源化工区、熊岳镇）",y:6112,s:0,d:0},6113:{g:6113,gn:"鲅鱼圈区（其他）",y:6113,s:0,d:0}}},210811:{g:210811,gn:"老边区",y:6120,s:0,d:6120,l:{6120:{g:6120,gn:"老边区（城东街道、二道镇、老边街道、柳树镇、路南镇）",y:6120,s:0,d:0},6121:{g:6121,gn:"老边区（其他）",y:6121,s:0,d:0}}},210881:{g:210881,gn:"盖州市",y:6117,s:0,d:6117,l:{6117:{g:6117,gn:"盖州市（东城街道、鼓楼街道、红旗镇、九垄地镇、芦屯镇）",y:6117,s:0,d:0},6118:{g:6118,gn:"盖州市（沙岗镇、太阳升街道、西城街道、熊岳镇）",y:6118,s:0,d:0},6119:{g:6119,gn:"盖州市（其他）",y:6119,s:0,d:0}}},210882:{g:210882,gn:"大石桥市",y:6114,s:0,d:6114,l:{6114:{g:6114,gn:"大石桥市（石桥街道、青花街道、金桥街道、钢都街道、南楼镇）",y:6114,s:0,d:0},6115:{g:6115,gn:"大石桥市（高坎镇、旗口镇、官屯镇、溥洛铺镇、永安镇）",y:6115,s:0,d:0},6116:{g:6116,gn:"大石桥市（其他）",y:6116,s:0,d:0}}}}},210900:{g:210900,gn:"阜新市",y:1972,s:0,d:3546,l:{3546:{g:3546,gn:"经济技术开发区",y:3546,s:0,d:0},210902:{g:210902,gn:"海州区",y:5634,s:0,d:5634,l:{5634:{g:5634,gn:"海州区（工人村街道、韩家店镇、新兴街道）",y:5634,s:0,d:0},5635:{g:5635,gn:"海州区（其他）",y:5635,s:0,d:0}}},210903:{g:210903,gn:"新邱区",y:5640,s:0,d:5640,l:{5640:{g:5640,gn:"新邱区（兴隆街道、中兴街道）",y:5640,s:0,d:0},5641:{g:5641,gn:"新邱区（其他）",y:5641,s:0,d:0}}},210904:{g:210904,gn:"太平区",y:5636,s:0,d:5636,l:{5636:{g:5636,gn:"太平区（高德街道、红树街道、煤海街道）",y:5636,s:0,d:0},5637:{g:5637,gn:"太平区（其他）",y:5637,s:0,d:0}}},210905:{g:210905,gn:"清河门区",y:1976,s:0,d:0},210911:{g:210911,gn:"细河区",y:5638,s:0,d:5638,l:{5638:{g:5638,gn:"细河区（北苑街道、东苑街道、西苑街道、中苑街道）",y:5638,s:0,d:0},5639:{g:5639,gn:"细河区（其他）",y:5639,s:0,d:0}}},210921:{g:210921,gn:"阜新蒙古族自治县",y:1979,s:0,d:0},210922:{g:210922,gn:"彰武县",y:1978,s:0,d:0}}},211000:{g:211000,gn:"辽阳市",y:1980,s:0,d:211081,l:{211002:{g:211002,gn:"白塔区",y:5656,s:0,d:5656,l:{5656:{g:5656,gn:"白塔区（胜利街道、星火街道、跃进街道、站前街道）",y:5656,s:0,d:0},5657:{g:5657,gn:"白塔区（其他）",y:5657,s:0,d:0}}},211003:{g:211003,gn:"文圣区",y:5660,s:0,d:5660,l:{5660:{g:5660,gn:"文圣区（东兴街道）",y:5660,s:0,d:0},5661:{g:5661,gn:"文圣区（其他）",y:5661,s:0,d:0}}},211004:{g:211004,gn:"宏伟区",y:1985,s:0,d:0},211005:{g:211005,gn:"弓长岭区",y:1987,s:0,d:0},211011:{g:211011,gn:"太子河区",y:5658,s:0,d:5658,l:{5658:{g:5658,gn:"太子河区（新华街道、望水台街道）",y:5658,s:0,d:0},5659:{g:5659,gn:"太子河区（其他）",y:5659,s:0,d:0}}},211021:{g:211021,gn:"辽阳县",y:1982,s:0,d:0},211081:{g:211081,gn:"灯塔市",y:1981,s:0,d:0}}},211100:{g:211100,gn:"盘锦市",y:2011,s:0,d:211122,l:{211102:{g:211102,gn:"双台子区",y:2014,s:0,d:0},211103:{g:211103,gn:"兴隆台区",y:2015,s:0,d:0},211121:{g:211121,gn:"大洼县",y:2013,s:0,d:0},211122:{g:211122,gn:"盘山县",y:2012,s:0,d:0}}},211200:{g:211200,gn:"铁岭市",y:1988,s:0,d:211281,l:{211202:{g:211202,gn:"银州区",y:1994,s:0,d:0},211204:{g:211204,gn:"清河区",y:1995,s:0,d:0},211221:{g:211221,gn:"铁岭县",y:1991,s:0,d:0},211223:{g:211223,gn:"西丰县",y:1993,s:0,d:0},211224:{g:211224,gn:"昌图县",y:1992,s:0,d:0},211281:{g:211281,gn:"调兵山市",y:1989,s:0,d:0},211282:{g:211282,gn:"开原市",y:1990,s:0,d:0}}},211300:{g:211300,gn:"朝阳市",y:1996,s:0,d:211382,l:{5622:{g:5622,gn:"东洲区（搭连街道、东洲街道、南花园街道、平山街道）",y:5622,s:0,d:0},211302:{g:211302,gn:"双塔区",y:5619,s:0,d:5619,l:{5619:{g:5619,gn:"双塔区（站南街道、燕北街道、前进街道、南塔街道、龙山街道）",y:5619,s:0,d:0},5620:{g:5620,gn:"双塔区（凌河街道、北塔街道、光明街道、红旗街道、凌凤街道）",y:5620,s:0,d:0}}},211303:{g:211303,gn:"龙城区",y:5617,s:0,d:5617,l:{5617:{g:5617,gn:"龙城区（新华街道、海龙街道、七道泉子镇、七道泉子镇、西大营子镇）",y:5617,s:0,d:0},5618:{g:5618,gn:"龙城区（其他）",y:5618,s:0,d:0}}},211321:{g:211321,gn:"朝阳县",y:1999,s:0,d:0},211322:{g:211322,gn:"建平县",y:2000,s:0,d:0},211324:{g:211324,gn:"喀喇沁左翼蒙古族自治县",y:2001,s:0,d:0},211381:{g:211381,gn:"北票市",y:1998,s:0,d:0},211382:{g:211382,gn:"凌源市",y:1997,s:0,d:0}}},211400:{g:211400,gn:"葫芦岛市",y:2004,s:0,d:211481,l:{211402:{g:211402,gn:"连山区",y:5642,s:0,d:5642,l:{5642:{g:5642,gn:"连山区（站前街道、水泥街道、渤海街道、化工街道、化机街道）",y:5642,s:0,d:0},5643:{g:5643,gn:"连山区（锦郊街道、连山街道、石油街道）",y:5643,s:0,d:0},5644:{g:5644,gn:"连山区（其他）",y:5644,s:0,d:0}}},211403:{g:211403,gn:"龙港区",y:5645,s:0,d:5645,l:{5645:{g:5645,gn:"龙港区（望海镇、双树乡、马杖房西街道、马杖房东街道、北港街道）",y:5645,s:0,d:0},5646:{g:5646,gn:"龙港区（北港镇）",y:5646,s:0,d:0},5647:{g:5647,gn:"龙港区（其他）",y:5647,s:0,d:0}}},211404:{g:211404,gn:"南票区",y:2009,s:0,d:0},211421:{g:211421,gn:"绥中县",y:2006,s:0,d:0},211422:{g:211422,gn:"建昌县",y:2007,s:0,d:0},211481:{g:211481,gn:"兴城市",y:2005,s:0,d:0}}}}},220000:{g:220000,gn:"吉林省",y:1830,s:0,d:220100,l:{220100:{g:220100,gn:"长春市",y:1831,s:0,d:220104,l:{3492:{g:3492,gn:"经济技术开发区",y:3492,s:0,d:0},3547:{g:3547,gn:"净月经济开发区（其他）",y:3547,s:0,d:0},3557:{g:3557,gn:"汽车产业开发区",y:3557,s:0,d:0},3558:{g:3558,gn:"高新技术产业开发区（其他）",y:3558,s:0,d:0},6573:{g:6573,gn:"长春市经济开发区（东方广场街道、临河街道）",y:6573,s:0,d:0},6577:{g:6577,gn:"高新技术产业开发区（超达大路、孵化基地、富锋镇、双德乡）",y:6577,s:0,d:0},6578:{g:6578,gn:"净月经济开发区（净月街道）",y:6578,s:0,d:0},6587:{g:6587,gn:"长春市经济开发区（其他）",y:6587,s:0,d:0},220102:{g:220102,gn:"南关区",y:1835,s:0,d:1835,l:{1835:{g:1835,gn:"南关区（富裕街道、乐山镇、临河街道、新湖镇）",y:1835,s:0,d:0},6583:{g:6583,gn:"南关区（其他）",y:6583,s:0,d:0},6590:{g:6590,gn:"南关区（新立城镇、幸福乡、永春镇、永兴街道、玉潭镇）",y:6590,s:0,d:0}}},220103:{g:220103,gn:"宽城区",y:1833,s:0,d:1833,l:{1833:{g:1833,gn:"宽城区（其他）",y:1833,s:0,d:0},6580:{g:6580,gn:"宽城区（东广街道、凯旋街道、兰家大街、南广街道）",y:6580,s:0,d:0},6581:{g:6581,gn:"宽城区（群英街道、小南街、新发街道、兴业街道、站前街道）",y:6581,s:0,d:0}}},220104:{g:220104,gn:"朝阳区",y:1832,s:0,d:1832,l:{1832:{g:1832,gn:"朝阳区（富锋街道、乐山镇、永春镇）",y:1832,s:0,d:0},6588:{g:6588,gn:"朝阳区（其他）",y:6588,s:0,d:0}}},220105:{g:220105,gn:"二道区",y:1834,s:0,d:1834,l:{1834:{g:1834,gn:"二道区（其他）",y:1834,s:0,d:0},6575:{g:6575,gn:"二道区（八里堡街道、长江物流园区、东方广场街道、东盛街道、东站街道）",y:6575,s:0,d:0},6576:{g:6576,gn:"二道区（吉林街道、荣光街道、物流经济开发区、远达八里堡街道）",y:6576,s:0,d:0}}},220106:{g:220106,gn:"绿园区",y:1836,s:0,d:1836,l:{1836:{g:1836,gn:"绿园区（长白公路、城西镇、皓月大路、合心工业园）",y:1836,s:0,d:0},6582:{g:6582,gn:"绿园区（其他）",y:6582,s:0,d:0},6589:{g:6589,gn:"绿园区（合心镇、绿园经济开发区、西新镇）",y:6589,s:0,d:0}}},220112:{g:220112,gn:"双阳区",y:1837,s:0,d:1837,l:{1837:{g:1837,gn:"双阳区（其他）",y:1837,s:0,d:0},6585:{g:6585,gn:"双阳区（平湖街、云山街）",y:6585,s:0,d:0}}},220122:{g:220122,gn:"农安县",y:1841,s:0,d:1841,l:{1841:{g:1841,gn:"农安县（其他）",y:1841,s:0,d:0},6584:{g:6584,gn:"农安县（农安镇）",y:6584,s:0,d:0}}},220181:{g:220181,gn:"九台市",y:1838,s:0,d:1838,l:{1838:{g:1838,gn:"九台市（其他）",y:1838,s:0,d:0},6579:{g:6579,gn:"九台市（九台街道）",y:6579,s:0,d:0}}},220182:{g:220182,gn:"榆树市",y:1839,s:0,d:1839,l:{1839:{g:1839,gn:"榆树市（其他）",y:1839,s:0,d:0},6586:{g:6586,gn:"榆树市（城郊街道、华昌街道、培英街道、正阳街道）",y:6586,s:0,d:0}}},220183:{g:220183,gn:"德惠市",y:1840,s:0,d:1840,l:{1840:{g:1840,gn:"德惠市（其他）",y:1840,s:0,d:0},6574:{g:6574,gn:"德惠市（建设街道）",y:6574,s:0,d:0}}}}},220200:{g:220200,gn:"吉林市",y:1842,s:0,d:220204,l:{220202:{g:220202,gn:"昌邑区",y:1844,s:0,d:0},220203:{g:220203,gn:"龙潭区",y:1845,s:0,d:0},220204:{g:220204,gn:"船营区",y:1843,s:0,d:0},220211:{g:220211,gn:"丰满区",y:1846,s:0,d:0},220221:{g:220221,gn:"永吉县",y:1851,s:0,d:0},220281:{g:220281,gn:"蛟河市",y:1849,s:0,d:0},220282:{g:220282,gn:"桦甸市",y:1848,s:0,d:0},220283:{g:220283,gn:"舒兰市",y:1847,s:0,d:0},220284:{g:220284,gn:"磐石市",y:1850,s:0,d:0}}},220300:{g:220300,gn:"四平市",y:1852,s:0,d:220302,l:{220302:{g:220302,gn:"铁西区",y:1853,s:0,d:0},220303:{g:220303,gn:"铁东区",y:1854,s:0,d:0},220322:{g:220322,gn:"梨树县",y:1857,s:0,d:0},220323:{g:220323,gn:"伊通满族自治县",y:1858,s:0,d:0},220381:{g:220381,gn:"公主岭市",y:1855,s:0,d:0},220382:{g:220382,gn:"双辽市",y:1856,s:0,d:0}}},220400:{g:220400,gn:"辽源市",y:1859,s:0,d:220402,l:{220402:{g:220402,gn:"龙山区",y:1860,s:0,d:0},220403:{g:220403,gn:"西安区",y:1861,s:0,d:0},220421:{g:220421,gn:"东丰县",y:1863,s:0,d:0},220422:{g:220422,gn:"东辽县",y:1862,s:0,d:0}}},220500:{g:220500,gn:"通化市",y:1864,s:0,d:220502,l:{220502:{g:220502,gn:"东昌区",y:1865,s:0,d:0},220503:{g:220503,gn:"二道江区",y:1866,s:0,d:0},220521:{g:220521,gn:"通化县",y:1869,s:0,d:0},220523:{g:220523,gn:"辉南县",y:1870,s:0,d:0},220524:{g:220524,gn:"柳河县",y:1871,s:0,d:0},220581:{g:220581,gn:"梅河口市",y:1867,s:0,d:0},220582:{g:220582,gn:"集安市",y:1868,s:0,d:0}}},220600:{g:220600,gn:"白山市",y:1887,s:0,d:220602,l:{3692:{g:3692,gn:"八道江区",y:3692,s:0,d:0},220602:{g:220602,gn:"浑江区",y:1888,s:0,d:0},220605:{g:220605,gn:"江源县",y:1892,s:0,d:0},220621:{g:220621,gn:"抚松县",y:1891,s:0,d:0},220622:{g:220622,gn:"靖宇县",y:1890,s:0,d:0},220623:{g:220623,gn:"长白朝鲜族自治县",y:1893,s:0,d:0},220681:{g:220681,gn:"临江市",y:1889,s:0,d:0}}},220700:{g:220700,gn:"松原市",y:1894,s:0,d:220702,l:{220702:{g:220702,gn:"宁江区",y:1895,s:0,d:0},220721:{g:220721,gn:"前郭尔罗斯蒙古族自治县",y:1899,s:0,d:0},220722:{g:220722,gn:"长岭县",y:1897,s:0,d:0},220723:{g:220723,gn:"乾安县",y:1896,s:0,d:0},220724:{g:220724,gn:"扶余县",y:1898,s:0,d:0}}},220800:{g:220800,gn:"白城市",y:1872,s:0,d:220802,l:{220802:{g:220802,gn:"洮北区",y:1873,s:0,d:0},220821:{g:220821,gn:"镇赉县",y:1876,s:0,d:0},220822:{g:220822,gn:"通榆县",y:1877,s:0,d:0},220881:{g:220881,gn:"洮南市",y:1874,s:0,d:0},220882:{g:220882,gn:"大安市",y:1875,s:0,d:0}}},222400:{g:222400,gn:"延边朝鲜族自治州",y:1878,s:0,d:222401,l:{222401:{g:222401,gn:"延吉市",y:1879,s:0,d:0},222402:{g:222402,gn:"图们市",y:1880,s:0,d:0},222403:{g:222403,gn:"敦化市",y:1881,s:0,d:0},222404:{g:222404,gn:"珲春市",y:1883,s:0,d:0},222405:{g:222405,gn:"龙井市",y:1882,s:0,d:0},222406:{g:222406,gn:"和龙市",y:1884,s:0,d:0},222424:{g:222424,gn:"汪清县",y:1886,s:0,d:0},222426:{g:222426,gn:"安图县",y:1885,s:0,d:0}}}}},230000:{g:230000,gn:"黑龙江省",y:999,s:0,d:230100,l:{230100:{g:230100,gn:"哈尔滨市",y:1000,s:0,d:230112,l:{1015:{g:1015,gn:"动力区",y:1015,s:0,d:0},230102:{g:230102,gn:"道里区",y:1013,s:0,d:1013,l:{1013:{g:1013,gn:"道里区（群力乡、太平镇、新发镇、新农镇、榆树镇）",y:1013,s:0,d:0},6562:{g:6562,gn:"道里区（其他）",y:6562,s:0,d:0}}},230103:{g:230103,gn:"南岗区",y:1014,s:0,d:1014,l:{1014:{g:1014,gn:"南岗区（红旗满族乡、小南沟镇）",y:1014,s:0,d:0},6566:{g:6566,gn:"南岗区（其他）",y:6566,s:0,d:0}}},230104:{g:230104,gn:"道外区",y:1019,s:0,d:1019,l:{1019:{g:1019,gn:"道外区（永源镇 、巨源镇 、民主乡、东风镇）",y:1019,s:0,d:0},6563:{g:6563,gn:"道外区（其他）",y:6563,s:0,d:0}}},230108:{g:230108,gn:"平房区",y:1016,s:0,d:1016,l:{1016:{g:1016,gn:"平房区（平房镇、平新镇）",y:1016,s:0,d:0},6567:{g:6567,gn:"平房区（其他）",y:6567,s:0,d:0}}},230109:{g:230109,gn:"松北区",y:3545,s:0,d:3545,l:{3545:{g:3545,gn:"松北区（其他）",y:3545,s:0,d:0},6570:{g:6570,gn:"松北区（松浦街道、松浦镇）",y:6570,s:0,d:0}}},230110:{g:230110,gn:"香坊区",y:1017,s:0,d:1017,l:{1017:{g:1017,gn:"香坊区（黎明街道、成高子镇、幸福镇、朝阳镇、向阳乡）",y:1017,s:0,d:0},6572:{g:6572,gn:"香坊区（其他）",y:6572,s:0,d:0}}},230111:{g:230111,gn:"呼兰区",y:1005,s:0,d:1005,l:{1005:{g:1005,gn:"呼兰区（其他）",y:1005,s:0,d:0},6565:{g:6565,gn:"呼兰区（建设路街道）",y:6565,s:0,d:0}}},230112:{g:230112,gn:"阿城区",y:1001,s:0,d:1001,l:{1001:{g:1001,gn:"阿城区（其他）",y:1001,s:0,d:0},6558:{g:6558,gn:"阿城区（新利街道、通城街道、阿什河街道、河东街道）",y:6558,s:0,d:0},6559:{g:6559,gn:"阿城区（金城街道、金都街道、舍利街道）",y:6559,s:0,d:0}}},230123:{g:230123,gn:"依兰县",y:1008,s:0,d:0},230124:{g:230124,gn:"方正县",y:1006,s:0,d:1006,l:{1006:{g:1006,gn:"方正县（其他）",y:1006,s:0,d:0},6564:{g:6564,gn:"方正县（方正镇、经济开发区）",y:6564,s:0,d:0}}},230125:{g:230125,gn:"宾县",y:1007,s:0,d:1007,l:{1007:{g:1007,gn:"宾县（其他）",y:1007,s:0,d:0},6561:{g:6561,gn:"宾县（宾西镇、宾州镇）",y:6561,s:0,d:0}}},230126:{g:230126,gn:"巴彦县",y:1009,s:0,d:1009,l:{1009:{g:1009,gn:"巴彦县（其他）",y:1009,s:0,d:0},6560:{g:6560,gn:"巴彦县（东直路街道、北直路街道）",y:6560,s:0,d:0}}},230127:{g:230127,gn:"木兰县",y:1011,s:0,d:0},230128:{g:230128,gn:"通河县",y:1010,s:0,d:0},230129:{g:230129,gn:"延寿县",y:1012,s:0,d:0},230182:{g:230182,gn:"双城市",y:1003,s:0,d:1003,l:{1003:{g:1003,gn:"双城市（其他）",y:1003,s:0,d:0},6569:{g:6569,gn:"双城市（双城市街道、双城镇）",y:6569,s:0,d:0}}},230183:{g:230183,gn:"尚志市",y:1002,s:0,d:1002,l:{1002:{g:1002,gn:"尚志市（其他）",y:1002,s:0,d:0},6568:{g:6568,gn:"尚志市（尚志镇）",y:6568,s:0,d:0}}},230184:{g:230184,gn:"五常市",y:1004,s:0,d:1004,l:{1004:{g:1004,gn:"五常市（其他）",y:1004,s:0,d:0},6571:{g:6571,gn:"五常市（五常镇）",y:6571,s:0,d:0}}}}},230200:{g:230200,gn:"齐齐哈尔市",y:1020,s:0,d:230281,l:{230202:{g:230202,gn:"龙沙区",y:1030,s:0,d:0},230203:{g:230203,gn:"建华区",y:1033,s:0,d:0},230204:{g:230204,gn:"铁锋区",y:1032,s:0,d:0},230205:{g:230205,gn:"昂昂溪区",y:1031,s:0,d:0},230206:{g:230206,gn:"富拉尔基区",y:1034,s:0,d:0},230207:{g:230207,gn:"碾子山区",y:1035,s:0,d:0},230208:{g:230208,gn:"梅里斯达斡尔族区",y:1036,s:0,d:0},230221:{g:230221,gn:"龙江县",y:1029,s:0,d:0},230223:{g:230223,gn:"依安县",y:1025,s:0,d:0},230224:{g:230224,gn:"泰来县",y:1027,s:0,d:0},230225:{g:230225,gn:"甘南县",y:1024,s:0,d:0},230227:{g:230227,gn:"富裕县",y:1022,s:0,d:0},230229:{g:230229,gn:"克山县",y:1026,s:0,d:0},230230:{g:230230,gn:"克东县",y:1028,s:0,d:0},230231:{g:230231,gn:"拜泉县",y:1023,s:0,d:0},230281:{g:230281,gn:"讷河市",y:1021,s:0,d:0}}},230300:{g:230300,gn:"鸡西市",y:1055,s:0,d:230382,l:{230302:{g:230302,gn:"鸡冠区",y:1059,s:0,d:0},230303:{g:230303,gn:"恒山区",y:1060,s:0,d:0},230304:{g:230304,gn:"滴道区",y:1062,s:0,d:0},230305:{g:230305,gn:"梨树区",y:1063,s:0,d:0},230306:{g:230306,gn:"城子河区",y:1061,s:0,d:0},230307:{g:230307,gn:"麻山区",y:1064,s:0,d:0},230321:{g:230321,gn:"鸡东县",y:1058,s:0,d:0},230381:{g:230381,gn:"虎林市",y:1057,s:0,d:0},230382:{g:230382,gn:"密山市",y:1056,s:0,d:0}}},230400:{g:230400,gn:"鹤岗市",y:1037,s:0,d:230421,l:{230402:{g:230402,gn:"向阳区",y:1044,s:0,d:0},230403:{g:230403,gn:"工农区",y:1041,s:0,d:0},230404:{g:230404,gn:"南山区",y:1042,s:0,d:0},230405:{g:230405,gn:"兴安区",y:1043,s:0,d:0},230406:{g:230406,gn:"东山区",y:1045,s:0,d:0},230407:{g:230407,gn:"兴山区",y:1040,s:0,d:0},230421:{g:230421,gn:"萝北县",y:1038,s:0,d:0},230422:{g:230422,gn:"绥滨县",y:1039,s:0,d:0}}},230500:{g:230500,gn:"双鸭山市",y:1046,s:0,d:230521,l:{230502:{g:230502,gn:"尖山区",y:1051,s:0,d:0},230503:{g:230503,gn:"岭东区",y:1052,s:0,d:0},230505:{g:230505,gn:"四方台区",y:1053,s:0,d:0},230506:{g:230506,gn:"宝山区",y:1054,s:0,d:0},230521:{g:230521,gn:"集贤县",y:1047,s:0,d:0},230522:{g:230522,gn:"友谊县",y:1049,s:0,d:0},230523:{g:230523,gn:"宝清县",y:1048,s:0,d:0},230524:{g:230524,gn:"饶河县",y:1050,s:0,d:0}}},230600:{g:230600,gn:"大庆市",y:1065,s:0,d:230623,l:{230602:{g:230602,gn:"萨尔图区",y:1070,s:0,d:0},230603:{g:230603,gn:"龙凤区",y:1072,s:0,d:0},230604:{g:230604,gn:"让胡路区",y:1073,s:0,d:0},230605:{g:230605,gn:"红岗区",y:1071,s:0,d:0},230606:{g:230606,gn:"大同区",y:1074,s:0,d:0},230621:{g:230621,gn:"肇州县",y:1067,s:0,d:0},230622:{g:230622,gn:"肇源县",y:1068,s:0,d:0},230623:{g:230623,gn:"林甸县",y:1066,s:0,d:0},230624:{g:230624,gn:"杜尔伯特蒙古族自治县",y:1069,s:0,d:0}}},230700:{g:230700,gn:"伊春市",y:1075,s:0,d:230781,l:{230702:{g:230702,gn:"伊春区",y:1078,s:0,d:0},230703:{g:230703,gn:"南岔区",y:1080,s:0,d:0},230704:{g:230704,gn:"友好区",y:1086,s:0,d:0},230705:{g:230705,gn:"西林区",y:1082,s:0,d:0},230706:{g:230706,gn:"翠峦区",y:1085,s:0,d:0},230707:{g:230707,gn:"新青区",y:1090,s:0,d:0},230708:{g:230708,gn:"美溪区",y:1083,s:0,d:0},230709:{g:230709,gn:"金山屯区",y:1081,s:0,d:0},230710:{g:230710,gn:"五营区",y:1088,s:0,d:0},230711:{g:230711,gn:"乌马河区",y:1084,s:0,d:0},230712:{g:230712,gn:"汤旺河区",y:1091,s:0,d:0},230713:{g:230713,gn:"带岭区",y:1079,s:0,d:0},230714:{g:230714,gn:"乌伊岭区",y:1092,s:0,d:0},230715:{g:230715,gn:"红星区",y:1089,s:0,d:0},230716:{g:230716,gn:"上甘岭区",y:1087,s:0,d:0},230722:{g:230722,gn:"嘉荫县",y:1077,s:0,d:0},230781:{g:230781,gn:"铁力市",y:1076,s:0,d:0}}},230800:{g:230800,gn:"佳木斯市",y:1104,s:0,d:230881,l:{230803:{g:230803,gn:"向阳区",y:1113,s:0,d:0},230804:{g:230804,gn:"前进区",y:1111,s:0,d:0},230805:{g:230805,gn:"东风区",y:1114,s:0,d:0},230811:{g:230811,gn:"郊区",y:1115,s:0,d:0},230822:{g:230822,gn:"桦南县",y:1109,s:0,d:0},230826:{g:230826,gn:"桦川县",y:1107,s:0,d:0},230828:{g:230828,gn:"汤原县",y:1110,s:0,d:0},230833:{g:230833,gn:"抚远县",y:1108,s:0,d:0},230881:{g:230881,gn:"同江市",y:1105,s:0,d:0},230882:{g:230882,gn:"富锦市",y:1106,s:0,d:0}}},230900:{g:230900,gn:"七台河市",y:1116,s:0,d:230921,l:{230902:{g:230902,gn:"新兴区",y:1119,s:0,d:0},230903:{g:230903,gn:"桃山区",y:1118,s:0,d:0},230904:{g:230904,gn:"茄子河区",y:1120,s:0,d:0},230921:{g:230921,gn:"勃利县",y:1117,s:0,d:0}}},231000:{g:231000,gn:"牡丹江市",y:1093,s:0,d:231084,l:{231002:{g:231002,gn:"东安区",y:1100,s:0,d:0},231003:{g:231003,gn:"阳明区",y:1101,s:0,d:0},231004:{g:231004,gn:"爱民区",y:1099,s:0,d:0},231005:{g:231005,gn:"西安区",y:1102,s:0,d:0},231024:{g:231024,gn:"东宁县",y:1098,s:0,d:0},231025:{g:231025,gn:"林口县",y:1097,s:0,d:0},231081:{g:231081,gn:"绥芬河市",y:1103,s:0,d:0},231083:{g:231083,gn:"海林市",y:1095,s:0,d:0},231084:{g:231084,gn:"宁安市",y:1094,s:0,d:0},231085:{g:231085,gn:"穆棱市",y:1096,s:0,d:0}}},231100:{g:231100,gn:"黑河市",y:1132,s:0,d:231181,l:{231102:{g:231102,gn:"爱辉区",y:1138,s:0,d:0},231121:{g:231121,gn:"嫩江县",y:1136,s:0,d:0},231123:{g:231123,gn:"逊克县",y:1135,s:0,d:0},231124:{g:231124,gn:"孙吴县",y:1137,s:0,d:0},231181:{g:231181,gn:"北安市",y:1133,s:0,d:0},231182:{g:231182,gn:"五大连池市",y:1134,s:0,d:0}}},231200:{g:231200,gn:"绥化市",y:1121,s:0,d:231281,l:{231202:{g:231202,gn:"北林区",y:1131,s:0,d:0},231221:{g:231221,gn:"望奎县",y:1130,s:0,d:0},231222:{g:231222,gn:"兰西县",y:1126,s:0,d:0},231223:{g:231223,gn:"青冈县",y:1128,s:0,d:0},231224:{g:231224,gn:"庆安县",y:1129,s:0,d:0},231225:{g:231225,gn:"明水县",y:1127,s:0,d:0},231226:{g:231226,gn:"绥棱县",y:1125,s:0,d:0},231281:{g:231281,gn:"安达市",y:1122,s:0,d:0},231282:{g:231282,gn:"肇东市",y:1123,s:0,d:0},231283:{g:231283,gn:"海伦市",y:1124,s:0,d:0}}},232700:{g:232700,gn:"大兴安岭",y:3548,s:0,d:232721,l:{3552:{g:3552,gn:"加格达奇区",y:3552,s:0,d:0},3553:{g:3553,gn:"松岭区",y:3553,s:0,d:0},3554:{g:3554,gn:"新林区",y:3554,s:0,d:0},3555:{g:3555,gn:"呼中区",y:3555,s:0,d:0},232721:{g:232721,gn:"呼玛县",y:3549,s:0,d:0},232722:{g:232722,gn:"塔河县",y:3550,s:0,d:0},232723:{g:232723,gn:"漠河县",y:3551,s:0,d:0}}}}},310000:{g:310000,gn:"上海市",y:2621,s:0,d:310100,l:{310100:{g:310100,gn:"上海市",y:2622,s:0,d:310104,l:{2630:{g:2630,gn:"卢湾区",y:2630,s:0,d:0},6541:{g:6541,gn:"上海财经-复旦大学校区自提（武东路80号复旦大学全家超市旁15000422409）",y:6541,s:0,d:0},310101:{g:310101,gn:"黄浦区",y:2628,s:0,d:0},310104:{g:310104,gn:"徐汇区",y:2626,s:0,d:0},310105:{g:310105,gn:"长宁区",y:2637,s:0,d:0},310106:{g:310106,gn:"静安区",y:2629,s:0,d:0},310107:{g:310107,gn:"普陀区",y:2638,s:0,d:2638,l:{2638:{g:2638,gn:"普陀区(外环以内)",y:2638,s:0,d:0},2644:{g:2644,gn:"普陀区(外环以外)",y:2644,s:0,d:0}}},310108:{g:310108,gn:"闸北区",y:2631,s:0,d:0},310109:{g:310109,gn:"虹口区",y:2625,s:0,d:0},310110:{g:310110,gn:"杨浦区",y:2627,s:0,d:0},310112:{g:310112,gn:"闵行区",y:2624,s:0,d:2624,l:{2624:{g:2624,gn:"闵行区(浦江镇、华漕区域除外)",y:2624,s:0,d:0},2645:{g:2645,gn:"闵行区(华漕区域)",y:2645,s:0,d:0},3513:{g:3513,gn:"闵行区(浦江镇)",y:3513,s:0,d:0}}},310113:{g:310113,gn:"宝山区",y:2647,s:0,d:2647,l:{2647:{g:2647,gn:"宝山区(外环以外)",y:2647,s:0,d:0},3333:{g:3333,gn:"宝山区(外环线以内，吴淞区域除外)",y:3333,s:0,d:0},3945:{g:3945,gn:"宝山区（吴淞区域）",y:3945,s:0,d:0},5867:{g:5867,gn:"宝山区（上海大学宝山校区校园自提（图书馆地下通道教育超市对面 13301622110））",y:5867,s:0,d:0}}},310114:{g:310114,gn:"嘉定区",y:2636,s:0,d:2636,l:{2636:{g:2636,gn:"嘉定区(外环以外)",y:2636,s:0,d:0},3329:{g:3329,gn:"嘉定区(外环以内)",y:3329,s:0,d:0}}},310115:{g:310115,gn:"浦东新区",y:2634,s:0,d:2634,l:{2634:{g:2634,gn:"浦东新区(原南汇地区不包括康桥镇)",y:2634,s:0,d:0},2646:{g:2646,gn:"浦东新区(外环线以外，不包括原南汇区、三林镇)",y:2646,s:0,d:0},3525:{g:3525,gn:"浦东新区(外环内)",y:3525,s:0,d:0},5184:{g:5184,gn:"浦东新区(外环线以外三林镇，不包括原南汇区)",y:5184,s:0,d:0},5185:{g:5185,gn:"浦东新区(原南汇地区康桥镇)",y:5185,s:0,d:0}}},310116:{g:310116,gn:"金山区",y:2633,s:0,d:0},310117:{g:310117,gn:"松江",y:2640,s:0,d:2640,l:{2640:{g:2640,gn:"松江（岳阳、永丰、方松、中山、泗泾、佘山、车墩、洞泾、九亭）",y:2640,s:0,d:0},5176:{g:5176,gn:"松江（新桥、石湖荡、小昆山）",y:5176,s:0,d:0},5183:{g:5183,gn:"松江（泖港、新浜、叶榭）",y:5183,s:0,d:0}}},310118:{g:310118,gn:"青浦",y:2635,s:0,d:2635,l:{2635:{g:2635,gn:"青浦（除朱家角、练塘、金泽）",y:2635,s:0,d:0},5177:{g:5177,gn:"青浦（朱家角、练塘、金泽）",y:5177,s:0,d:0}}},310120:{g:310120,gn:"奉贤区",y:2632,s:0,d:0},310230:{g:310230,gn:"崇明",y:2639,s:0,d:2639,l:{2639:{g:2639,gn:"崇明(除长兴岛、横沙岛之外)",y:2639,s:0,d:0},3497:{g:3497,gn:"崇明(长兴岛、横沙)",y:3497,s:0,d:0}}}}}}},320000:{g:320000,gn:"江苏省",y:1591,s:0,d:320100,l:{320100:{g:320100,gn:"南京市",y:1592,s:0,d:320103,l:{3622:{g:3622,gn:"雨花台区(板桥街道，梅山街道)",y:3622,s:0,d:0},320102:{g:320102,gn:"玄武区",y:1598,s:0,d:0},320103:{g:320103,gn:"白下区",y:1601,s:0,d:0},320104:{g:320104,gn:"秦淮区",y:1602,s:0,d:0},320105:{g:320105,gn:"建邺区",y:1603,s:0,d:0},320106:{g:320106,gn:"鼓楼区",y:1604,s:0,d:0},320107:{g:320107,gn:"下关区",y:1605,s:0,d:0},320111:{g:320111,gn:"浦口区",y:3685,s:0,d:3685,l:{3685:{g:3685,gn:"浦口区(江浦镇，盘城镇，顶山镇)",y:3685,s:0,d:0},3686:{g:3686,gn:"浦口区(泰山镇，高新区镇，沿江镇)",y:3686,s:0,d:0},3703:{g:3703,gn:"浦口区(汤泉镇，桥林镇，永宁镇)",y:3703,s:0,d:0},3704:{g:3704,gn:"浦口区(乌江镇，老山林场、星甸镇，石桥镇)",y:3704,s:0,d:0}}},320113:{g:320113,gn:"栖霞区",y:3682,s:0,d:3682,l:{3682:{g:3682,gn:"栖霞区(迈皋桥,燕子矶,尧化门,马群镇)",y:3682,s:0,d:0},3683:{g:3683,gn:"栖霞区(仙林大学城，新港开发区)",y:3683,s:0,d:0},3684:{g:3684,gn:"栖霞区(八卦洲，摄山镇，栖霞街道)",y:3684,s:0,d:0},3702:{g:3702,gn:"栖霞区(龙潭镇，靖安镇)",y:3702,s:0,d:0}}},320114:{g:320114,gn:"雨花台区",y:1600,s:0,d:1600,l:{1600:{g:1600,gn:"雨花台区(除板桥街道，梅山街道之外)",y:1600,s:0,d:0}}},320115:{g:320115,gn:"江宁区",y:1593,s:0,d:1593,l:{1593:{g:1593,gn:"江宁区(东山、开发区、科技园、大学城)",y:1593,s:0,d:0},3642:{g:3642,gn:"江宁区(除东山、开发区、科技园、大学城)",y:3642,s:0,d:0}}},320116:{g:320116,gn:"六合区",y:1595,s:0,d:1595,l:{1595:{g:1595,gn:"六合区(大厂)",y:1595,s:0,d:0},1607:{g:1607,gn:"六合区(除大厂)",y:1607,s:0,d:0}}},320124:{g:320124,gn:"溧水区",y:1596,s:0,d:0},320125:{g:320125,gn:"高淳区",y:1597,s:0,d:0}}},320200:{g:320200,gn:"无锡市",y:1682,s:0,d:320202,l:{1687:{g:1687,gn:"新区（南站街道，江溪街道）",y:1687,s:0,d:0},3625:{g:3625,gn:"新区（鸿山、硕放）",y:3625,s:0,d:0},4075:{g:4075,gn:"新区（梅村）",y:4075,s:0,d:0},320202:{g:320202,gn:"崇安区",y:1683,s:0,d:0},320203:{g:320203,gn:"南长区",y:1684,s:0,d:0},320204:{g:320204,gn:"北塘区",y:1685,s:0,d:0},320205:{g:320205,gn:"锡山区",y:1689,s:0,d:1689,l:{1689:{g:1689,gn:"锡山区（东北塘镇、东亭镇、云林镇）",y:1689,s:0,d:0},3623:{g:3623,gn:"锡山区（锡北镇、东港镇、羊尖镇、鹅湖镇、鸿山镇、安镇）",y:3623,s:0,d:0},4443:{g:4443,gn:"锡山区（八士镇,厚桥镇,查桥镇,港下镇,东湖塘镇,张泾镇）",y:4443,s:0,d:0}}},320206:{g:320206,gn:"惠山区",y:1686,s:0,d:1686,l:{1686:{g:1686,gn:"惠山区（堰桥镇、长安镇，西漳镇）",y:1686,s:0,d:0},3643:{g:3643,gn:"惠山区（前洲镇、玉祁镇、钱桥镇、洛社镇、阳山镇）",y:3643,s:0,d:0},4442:{g:4442,gn:"惠山区（藕塘镇,石塘湾镇,杨市镇,陆区镇）",y:4442,s:0,d:0}}},320211:{g:320211,gn:"滨湖区",y:1691,s:0,d:1691,l:{1691:{g:1691,gn:"滨湖区（蠡园街道、荣巷街道、河埒街道、蠡湖街道)",y:1691,s:0,d:0},3624:{g:3624,gn:"滨湖区（滨湖镇、南泉镇、胡埭镇、马山镇、大浮镇）",y:3624,s:0,d:0},3749:{g:3749,gn:"滨湖区（太湖镇、华庄镇、雪浪镇、新安镇）",y:3749,s:0,d:0},4094:{g:4094,gn:"滨湖区（梅园、渔港）",y:4094,s:0,d:0}}},320281:{g:320281,gn:"江阴市",y:5098,s:0,d:5098,l:{5098:{g:5098,gn:"江阴市（城东、澄江、南闸、云亭、夏港街道）",y:5098,s:0,d:0},5099:{g:5099,gn:"江阴市（周庄、华士、新桥镇）",y:5099,s:0,d:0},5100:{g:5100,gn:"江阴市（璜土、青阳、徐霞客、长泾镇）",y:5100,s:0,d:0},5101:{g:5101,gn:"江阴市（月城、顾山、利港、祝塘、山观镇、申港街道）",y:5101,s:0,d:0}}},320282:{g:320282,gn:"宜兴市",y:1690,s:0,d:0}}},320300:{g:320300,gn:"徐州市",y:1608,s:0,d:1611,l:{1611:{g:1611,gn:"九里区",y:1611,s:0,d:0},3491:{g:3491,gn:"铜山经济技术开发区",y:3491,s:0,d:0},3511:{g:3511,gn:"金山桥经济开发区",y:3511,s:0,d:0},320302:{g:320302,gn:"鼓楼区",y:1613,s:0,d:0},320303:{g:320303,gn:"云龙区",y:5855,s:0,d:5855,l:{5855:{g:5855,gn:"云龙区（潘塘街道）",y:5855,s:0,d:0},5856:{g:5856,gn:"云龙区（其他）",y:5856,s:0,d:0}}},320305:{g:320305,gn:"贾汪区",y:5849,s:0,d:5849,l:{5849:{g:5849,gn:"贾汪区（大吴镇）",y:5849,s:0,d:0},5850:{g:5850,gn:"贾汪区（其他）",y:5850,s:0,d:0}}},320311:{g:320311,gn:"泉山区",y:5851,s:0,d:5851,l:{5851:{g:5851,gn:"泉山区（三堡镇）",y:5851,s:0,d:0},5852:{g:5852,gn:"泉山区（其他）",y:5852,s:0,d:0}}},320312:{g:320312,gn:"铜山区",y:5853,s:0,d:5853,l:{5853:{g:5853,gn:"铜山区（利国镇）",y:5853,s:0,d:0},5854:{g:5854,gn:"铜山区（其他）",y:5854,s:0,d:0}}},320321:{g:320321,gn:"丰县",y:1617,s:0,d:0},320322:{g:320322,gn:"沛县",y:1618,s:0,d:0},320324:{g:320324,gn:"睢宁县",y:1619,s:0,d:0},320381:{g:320381,gn:"新沂市",y:1615,s:0,d:0},320382:{g:320382,gn:"邳州市",y:1614,s:0,d:0}}},320400:{g:320400,gn:"常州市",y:1674,s:0,d:320402,l:{320402:{g:320402,gn:"天宁区",y:1675,s:0,d:0},320404:{g:320404,gn:"钟楼区",y:1676,s:0,d:0},320405:{g:320405,gn:"戚墅堰区",y:1677,s:0,d:0},320411:{g:320411,gn:"新北区",y:3731,s:0,d:3731,l:{3731:{g:3731,gn:"新北区（罗溪镇，春江镇，孟河镇，西夏墅镇）",y:3731,s:0,d:0},3745:{g:3745,gn:"新北区（河海，龙虎塘，三井街道，薛家镇，新桥镇）",y:3745,s:0,d:0}}},320412:{g:320412,gn:"武进区",y:1679,s:0,d:0},320481:{g:320481,gn:"溧阳市",y:1681,s:0,d:0},320482:{g:320482,gn:"金坛市",y:1680,s:0,d:0}}},320500:{g:320500,gn:"苏州市",y:1692,s:0,d:320508,l:{1703:{g:1703,gn:"吴县市",y:1703,s:0,d:0},3449:{g:3449,gn:"高新区、虎丘区(东渚镇)",y:3449,s:0,d:0},3486:{g:3486,gn:"工业园区",y:3486,s:0,d:0},320505:{g:320505,gn:"高新区、虎丘区",y:1695,s:0,d:1695,l:{1695:{g:1695,gn:"高新区、虎丘区(除东渚镇)",y:1695,s:0,d:0}}},320506:{g:320506,gn:"吴中区",y:1696,s:0,d:1696,l:{1696:{g:1696,gn:"吴中区(甪直镇、通安镇)",y:1696,s:0,d:0},3477:{g:3477,gn:"吴中区（金庭，西山，东山，镇湖，光福镇）",y:3477,s:0,d:0},3696:{g:3696,gn:"吴中区（绕城高速以内）",y:3696,s:0,d:0}}},320507:{g:320507,gn:"相城区",y:1697,s:0,d:1697,l:{1697:{g:1697,gn:"相城区(黄桥镇、元和街道、 相成经济开发区、东桥、黄埭)",y:1697,s:0,d:0},3451:{g:3451,gn:"相城区(北桥、渭塘、太平、望亭镇、阳澄湖)",y:3451,s:0,d:0}}},320508:{g:320508,gn:"沧浪区",y:1693,s:0,d:1693,l:{1693:{g:1693,gn:"沧浪区",y:1693,s:0,d:0},1694:{g:1694,gn:"金阊区",y:1694,s:0,d:0},3485:{g:3485,gn:"平江区",y:3485,s:0,d:0}}},320509:{g:320509,gn:"吴江区",y:5552,s:0,d:5552,l:{5552:{g:5552,gn:"吴江区（松陵镇、同里镇、经济开发区）",y:5552,s:0,d:0},5553:{g:5553,gn:"吴江区（其他区域）",y:5553,s:0,d:0}}},320581:{g:320581,gn:"常熟市",y:5130,s:0,d:5130,l:{5130:{g:5130,gn:"常熟市(虞山、大义、古里、海虞、梅李镇)",y:5130,s:0,d:0},5132:{g:5132,gn:"常熟市(董浜、支塘、王庄、练塘、沙家浜、新港、辛庄镇)",y:5132,s:0,d:0}}},320582:{g:320582,gn:"张家港市",y:5083,s:0,d:5083,l:{5083:{g:5083,gn:"张家港市(除兆丰、凤凰、乐余、港口镇外)",y:5083,s:0,d:0},5084:{g:5084,gn:"张家港市(兆丰、凤凰、乐余、港口镇)",y:5084,s:0,d:0}}},320583:{g:320583,gn:"昆山市",y:3687,s:0,d:3687,l:{3687:{g:3687,gn:"昆山市(张浦镇阳光路以北、玉山镇、高新区)",y:3687,s:0,d:0},3688:{g:3688,gn:"昆山市(花桥镇、开发区、陆家镇)",y:3688,s:0,d:0},3689:{g:3689,gn:"昆山市(千灯镇、淀山湖镇、张浦镇阳光路以南)",y:3689,s:0,d:0},3705:{g:3705,gn:"昆山市(巴城镇、周市镇、周庄镇、锦溪镇)",y:3705,s:0,d:0}}},320585:{g:320585,gn:"太仓市",y:5071,s:0,d:5071,l:{5071:{g:5071,gn:"太仓市（城厢、双凤、陆渡、沙溪镇）",y:5071,s:0,d:0},5072:{g:5072,gn:"太仓市（浏河、璜泾、浮桥、鹿河镇）",y:5072,s:0,d:0}}}}},320600:{g:320600,gn:"南通市",y:1657,s:0,d:320602,l:{3468:{g:3468,gn:"经济技术开发区",y:3468,s:0,d:0},320602:{g:320602,gn:"崇川区",y:1658,s:0,d:0},320611:{g:320611,gn:"港闸区",y:1659,s:0,d:0},320612:{g:320612,gn:"通州市",y:1662,s:0,d:0},320621:{g:320621,gn:"海安县",y:1665,s:0,d:0},320623:{g:320623,gn:"如东县",y:1666,s:0,d:0},320681:{g:320681,gn:"启东市",y:1664,s:0,d:0},320682:{g:320682,gn:"如皋市",y:6186,s:0,d:6186,l:{6186:{g:6186,gn:"如皋市（如城镇，如城镇经济开发区，袁桥镇，柴湾镇）",y:6186,s:0,d:0},6512:{g:6512,gn:"如皋（白蒲镇、雪岸阵、东陈镇、丁堰镇、桃源镇、林梓镇）",y:6512,s:0,d:0},6513:{g:6513,gn:"如皋（搬今镇、高明镇、常青镇、磨头镇、下原镇、桃园镇）",y:6513,s:0,d:0},6514:{g:6514,gn:"如皋（江安镇、石庄镇、吴窑镇、郭园镇、九华镇、长江镇）",y:6514,s:0,d:0}}},320684:{g:320684,gn:"海门市",y:1663,s:0,d:0}}},320700:{g:320700,gn:"连云港市",y:1620,s:0,d:320705,l:{320703:{g:320703,gn:"连云区",y:1623,s:0,d:0},320705:{g:320705,gn:"新浦区",y:1621,s:0,d:0},320706:{g:320706,gn:"海州区",y:1622,s:0,d:0},320721:{g:320721,gn:"赣榆县",y:1625,s:0,d:0},320722:{g:320722,gn:"东海县",y:5857,s:0,d:5857,l:{5857:{g:5857,gn:"东海县（白塔镇、房山镇、石榴镇）",y:5857,s:0,d:0},5858:{g:5858,gn:"东海县（其他）",y:5858,s:0,d:0}}},320723:{g:320723,gn:"灌云县",y:5859,s:0,d:5859,l:{5859:{g:5859,gn:"灌云县（新坝镇）",y:5859,s:0,d:0},5860:{g:5860,gn:"灌云县（其他）",y:5860,s:0,d:0}}},320724:{g:320724,gn:"灌南县",y:1628,s:0,d:0}}},320800:{g:320800,gn:"淮安市",y:1629,s:0,d:5861,l:{5861:{g:5861,gn:"淮安区（马甸镇、钦工镇、施河镇、棉花庄镇）",y:5861,s:0,d:0},5862:{g:5862,gn:"淮安区（其他）",y:5862,s:0,d:0},5863:{g:5863,gn:"经济开发区",y:5863,s:0,d:0},320802:{g:320802,gn:"清河区",y:1630,s:0,d:1630,l:{1630:{g:1630,gn:"清河区（其它）",y:1630,s:0,d:0},6508:{g:6508,gn:"清河区（北京路街道、长西街道、淮海街道、长东街道)",y:6508,s:0,d:0},6509:{g:6509,gn:"清河区(西安路街道、水渡口街道、东湖街道、钵池乡 ）",y:6509,s:0,d:0}}},320804:{g:320804,gn:"淮阴区",y:1633,s:0,d:1633,l:{1633:{g:1633,gn:"淮阴区（其它）",y:1633,s:0,d:0},6507:{g:6507,gn:"淮阴区（王营镇）",y:6507,s:0,d:0}}},320811:{g:320811,gn:"清浦区",y:1631,s:0,d:1631,l:{1631:{g:1631,gn:"清浦区（其它）",y:1631,s:0,d:0},6510:{g:6510,gn:"清浦区（清江街道、浦楼街道、闸口街道、清安街道）",y:6510,s:0,d:0}}},320826:{g:320826,gn:"涟水县",y:1634,s:0,d:0},320829:{g:320829,gn:"洪泽县",y:1635,s:0,d:0},320830:{g:320830,gn:"盱眙县",y:1636,s:0,d:0},320831:{g:320831,gn:"金湖县",y:1637,s:0,d:0}}},320900:{g:320900,gn:"盐城市",y:1639,s:0,d:3461,l:{3461:{g:3461,gn:"经济开发区",y:3461,s:0,d:0},320902:{g:320902,gn:"亭湖区",y:3438,s:0,d:0},320903:{g:320903,gn:"盐都区",y:5846,s:0,d:5846,l:{5846:{g:5846,gn:"盐都区（大冈镇、大纵湖镇、葛武镇）",y:5846,s:0,d:0},5848:{g:5848,gn:"盐都区（其他）",y:5848,s:0,d:0}}},320921:{g:320921,gn:"响水县",y:5845,s:0,d:5845,l:{5845:{g:5845,gn:"响水县（陈家港镇）",y:5845,s:0,d:0},5847:{g:5847,gn:"响水县（其他）",y:5847,s:0,d:0}}},320922:{g:320922,gn:"滨海县",y:1642,s:0,d:0},320923:{g:320923,gn:"阜宁县",y:1643,s:0,d:0},320924:{g:320924,gn:"射阳县",y:1644,s:0,d:0},320925:{g:320925,gn:"建湖县",y:5843,s:0,d:5843,l:{5843:{g:5843,gn:"建湖县（上冈镇）",y:5843,s:0,d:0},5844:{g:5844,gn:"建湖县（其他）",y:5844,s:0,d:0}}},320981:{g:320981,gn:"东台市",y:5841,s:0,d:5841,l:{5841:{g:5841,gn:"东台市（三仓镇）",y:5841,s:0,d:0},5842:{g:5842,gn:"东台市（其他）",y:5842,s:0,d:0}}},320982:{g:320982,gn:"大丰市",y:5839,s:0,d:5839,l:{5839:{g:5839,gn:"大丰市（大丰港镇）",y:5839,s:0,d:0},5840:{g:5840,gn:"大丰市（其他）",y:5840,s:0,d:0}}}}},321000:{g:321000,gn:"扬州市",y:1649,s:0,d:321002,l:{321002:{g:321002,gn:"广陵区",y:1650,s:0,d:1650,l:{1650:{g:1650,gn:"广陵区（沪陕高速以北、沙湾路以西）",y:1650,s:0,d:0},3662:{g:3662,gn:"广陵区（沪陕高速以南、沙湾路以东）",y:3662,s:0,d:0}}},321003:{g:321003,gn:"邗江区",y:1656,s:0,d:1656,l:{1656:{g:1656,gn:"邗江区（扬州大学城）",y:1656,s:0,d:0},3601:{g:3601,gn:"邗江区（宁通高速以北、启扬高速以内）",y:3601,s:0,d:0},3663:{g:3663,gn:"邗江区（宁通高速以南、启扬高速以外）",y:3663,s:0,d:0}}},321012:{g:321012,gn:"江都市",y:1654,s:0,d:0},321023:{g:321023,gn:"宝应县",y:1655,s:0,d:0},321081:{g:321081,gn:"仪征市",y:1653,s:0,d:0},321084:{g:321084,gn:"高邮市",y:1652,s:0,d:0}}},321100:{g:321100,gn:"镇江市",y:1667,s:0,d:321102,l:{321102:{g:321102,gn:"京口区",y:5556,s:0,d:5556,l:{5556:{g:5556,gn:"京口区（其他区域）",y:5556,s:0,d:0},5557:{g:5557,gn:"京口区（正东路街道、健康路街道、大市口街道、四牌楼街道）",y:5557,s:0,d:0}}},321111:{g:321111,gn:"润州区",y:5554,s:0,d:5554,l:{5554:{g:5554,gn:"润州区（宝塔山街道、和平路街道、中华路街道、七里甸街道、京畿路街道）",y:5554,s:0,d:0},5555:{g:5555,gn:"润州区（其他区域）",y:5555,s:0,d:0}}},321112:{g:321112,gn:"丹徒区",y:4083,s:0,d:0},321181:{g:321181,gn:"丹阳市",y:4062,s:0,d:0},321182:{g:321182,gn:"扬中市",y:1670,s:0,d:0},321183:{g:321183,gn:"句容市",y:1671,s:0,d:0}}},321200:{g:321200,gn:"泰州市",y:1705,s:0,d:321202,l:{321202:{g:321202,gn:"海陵区",y:4363,s:0,d:0},321203:{g:321203,gn:"高港区",y:4362,s:0,d:0},321281:{g:321281,gn:"兴化市",y:1708,s:0,d:0},321282:{g:321282,gn:"靖江市",y:1709,s:0,d:0},321283:{g:321283,gn:"泰兴市",y:1710,s:0,d:0},321284:{g:321284,gn:"姜堰市",y:1711,s:0,d:0}}},321300:{g:321300,gn:"宿迁市",y:1712,s:0,d:321302,l:{321302:{g:321302,gn:"宿城区",y:5837,s:0,d:5837,l:{5837:{g:5837,gn:"宿城区（洋河镇）",y:5837,s:0,d:0},5838:{g:5838,gn:"宿城区（其他）",y:5838,s:0,d:0}}},321311:{g:321311,gn:"宿豫县",y:1714,s:0,d:0},321322:{g:321322,gn:"沭阳县",y:1715,s:0,d:0},321323:{g:321323,gn:"泗阳县",y:1716,s:0,d:0},321324:{g:321324,gn:"泗洪县",y:1717,s:0,d:0}}}}},330000:{g:330000,gn:"浙江省",y:3225,s:0,d:330100,l:{3463:{g:3463,gn:"嵊州市",y:3463,s:0,d:3613,l:{3613:{g:3613,gn:"嵊州市",y:3613,s:0,d:0}}},3466:{g:3466,gn:"平湖市",y:3466,s:0,d:3612,l:{3612:{g:3612,gn:"平湖市",y:3612,s:0,d:0}}},330100:{g:330100,gn:"杭州市",y:3226,s:0,d:330105,l:{330102:{g:330102,gn:"上城区",y:3229,s:0,d:3229,l:{3229:{g:3229,gn:"上城区(万松岭隧道以南、中河高架以西)",y:3229,s:0,d:0},4122:{g:4122,gn:"上城区(万松岭隧道以北、中河高架以东)",y:4122,s:0,d:0}}},330103:{g:330103,gn:"下城区",y:3230,s:0,d:3230,l:{3230:{g:3230,gn:"下城区(德胜路、德胜快速路以北)",y:3230,s:0,d:0},4104:{g:4104,gn:"下城区(德胜路、德胜快速路以南)",y:4104,s:0,d:0}}},330104:{g:330104,gn:"江干区",y:3231,s:0,d:0},330105:{g:330105,gn:"拱墅区",y:3227,s:0,d:3227,l:{3227:{g:3227,gn:"拱墅区(登云路,登云大桥以南)",y:3227,s:0,d:0},4102:{g:4102,gn:"拱墅区(登云路.登云大桥以北)",y:4102,s:0,d:0}}},330106:{g:330106,gn:"西湖区",y:3228,s:0,d:3228,l:{3228:{g:3228,gn:"西湖区（除转塘、双浦、袁浦、西湖风景区）",y:3228,s:0,d:0},3737:{g:3737,gn:"西湖区（转塘、双浦、袁浦、西湖风景区）",y:3737,s:0,d:0},4103:{g:4103,gn:"西湖区(古翠路.古翠路天目山路西溪路以东)",y:4103,s:0,d:0},4123:{g:4123,gn:"西湖区(古翠路.古翠路天目山路西溪路以西)",y:4123,s:0,d:0}}},330108:{g:330108,gn:"滨江区",y:3232,s:0,d:0},330109:{g:330109,gn:"萧山区",y:3233,s:0,d:3233,l:{3233:{g:3233,gn:"萧山区（义桥、衙前、坎山、瓜沥、党山、益农）",y:3233,s:0,d:0},3472:{g:3472,gn:"萧山区（靖江、南阳、义蓬、河庄、党湾、新湾）",y:3472,s:0,d:0},3738:{g:3738,gn:"萧山区（城厢、北干、蜀山、新塘、所前、宁围、新街）",y:3738,s:0,d:0},3739:{g:3739,gn:"萧山区（楼塔、河上、戴村、浦阳、进化、临浦、 闻堰）",y:3739,s:0,d:0}}},330110:{g:330110,gn:"余杭区",y:3234,s:0,d:3234,l:{3234:{g:3234,gn:"余杭区（五常、崇贤、老余杭、闲林、仓前）",y:3234,s:0,d:0},3734:{g:3734,gn:"余杭区（良渚、仁和、运河、中泰、塘栖）",y:3734,s:0,d:0},3735:{g:3735,gn:"余杭区（瓶窑、鸬鸟、黄湖、百丈、径山）",y:3735,s:0,d:0},3736:{g:3736,gn:"余杭区（临平、南苑、东湖、星桥、乔司）",y:3736,s:0,d:0}}},330122:{g:330122,gn:"桐庐县",y:3238,s:0,d:0},330127:{g:330127,gn:"淳安县",y:3239,s:0,d:0},330182:{g:330182,gn:"建德市",y:3235,s:0,d:0},330183:{g:330183,gn:"富阳市",y:3236,s:0,d:0},330185:{g:330185,gn:"临安市",y:3237,s:0,d:0}}},330200:{g:330200,gn:"宁波市",y:3240,s:0,d:330203,l:{3559:{g:3559,gn:"江东高新区（不包括梅墟、邱隘）",y:3559,s:0,d:0},330203:{g:330203,gn:"海曙区",y:3241,s:0,d:0},330204:{g:330204,gn:"江东区",y:3242,s:0,d:0},330205:{g:330205,gn:"江北区",y:5069,s:0,d:5069,l:{5069:{g:5069,gn:"江北区(除慈城镇外)",y:5069,s:0,d:0},5070:{g:5070,gn:"江北区(慈城镇)",y:5070,s:0,d:0}}},330206:{g:330206,gn:"北仑区",y:3245,s:0,d:0},330211:{g:330211,gn:"镇海区",y:3244,s:0,d:0},330212:{g:330212,gn:"鄞州区",y:3716,s:0,d:3716,l:{3716:{g:3716,gn:"鄞州区(中河、首南、钟公庙、下应、石碶)",y:3716,s:0,d:0},3717:{g:3717,gn:"鄞州区(梅墟、瞻岐、咸祥、塘溪、东吴)",y:3717,s:0,d:0},3718:{g:3718,gn:"鄞州区(古林、洞桥、鄞江、章水、五乡)",y:3718,s:0,d:0},3719:{g:3719,gn:"鄞州区(东钱湖、横街、古林、姜山、龙观)",y:3719,s:0,d:0},3730:{g:3730,gn:"鄞州区(邱隘、云龙、横溪、高桥、集士港)",y:3730,s:0,d:0}}},330225:{g:330225,gn:"象山县",y:3251,s:0,d:0},330226:{g:330226,gn:"宁海县",y:3250,s:0,d:0},330281:{g:330281,gn:"余姚市",y:3246,s:0,d:0},330282:{g:330282,gn:"慈溪市",y:5564,s:0,d:5564,l:{5564:{g:5564,gn:"慈溪市（白沙路街道、古塘街道、浒山街道、坎墩街道、宗汉街道）",y:5564,s:0,d:0},5566:{g:5566,gn:"慈溪市（其他区域）",y:5566,s:0,d:0}}},330283:{g:330283,gn:"奉化市",y:3248,s:0,d:0}}},330300:{g:330300,gn:"温州市",y:3252,s:0,d:330302,l:{330302:{g:330302,gn:"鹿城区",y:5120,s:0,d:5120,l:{5120:{g:5120,gn:"鹿城区（五马、松台、滨江、南门、双屿街道）",y:5120,s:0,d:0},5831:{g:5831,gn:"鹿城区（其他）",y:5831,s:0,d:0}}},330303:{g:330303,gn:"龙湾区",y:5122,s:0,d:5122,l:{5122:{g:5122,gn:"龙湾区（蒲州街道、状元街道）",y:5122,s:0,d:0},5830:{g:5830,gn:"龙湾区（其他）",y:5830,s:0,d:0}}},330304:{g:330304,gn:"瓯海区",y:5118,s:0,d:5118,l:{5118:{g:5118,gn:"瓯海区（景山、梧田、茶山、南白象、新桥、三垟街道）",y:5118,s:0,d:0},5832:{g:5832,gn:"瓯海区（其他）",y:5832,s:0,d:0}}},330322:{g:330322,gn:"洞头县",y:3259,s:0,d:0},330324:{g:330324,gn:"永嘉县",y:3258,s:0,d:0},330326:{g:330326,gn:"平阳县",y:3260,s:0,d:0},330327:{g:330327,gn:"苍南县",y:3261,s:0,d:0},330328:{g:330328,gn:"文成县",y:3262,s:0,d:0},330329:{g:330329,gn:"泰顺县",y:3263,s:0,d:0},330381:{g:330381,gn:"瑞安市",y:3256,s:0,d:0},330382:{g:330382,gn:"乐清市",y:3257,s:0,d:0}}},330400:{g:330400,gn:"嘉兴市",y:3264,s:0,d:330402,l:{330402:{g:330402,gn:"南湖区",y:5835,s:0,d:5835,l:{5835:{g:5835,gn:"南湖区（新嘉街道、解放街道、新兴街道、长水街道，七星镇、大桥镇、凤桥镇、余新镇、新丰镇）",y:5835,s:0,d:0},5836:{g:5836,gn:"南湖区（建设街道、东栅街道、城南街、南湖街道）",y:5836,s:0,d:0}}},330411:{g:330411,gn:"秀洲区",y:5833,s:0,d:5833,l:{5833:{g:5833,gn:"秀洲区（新城街道、高照街道、王店镇、洪合镇、新塍镇、王江泾镇、油车港镇）",y:5833,s:0,d:0},5834:{g:5834,gn:"秀洲区（嘉北街道、塘汇街道）",y:5834,s:0,d:0}}},330421:{g:330421,gn:"嘉善县",y:3270,s:0,d:0},330424:{g:330424,gn:"海盐县",y:3271,s:0,d:0},330481:{g:330481,gn:"海宁市",y:3267,s:0,d:0},330482:{g:330482,gn:"平湖市",y:3268,s:0,d:0},330483:{g:330483,gn:"桐乡市",y:3269,s:0,d:0}}},330500:{g:330500,gn:"湖州市",y:3322,s:0,d:330522,l:{3326:{g:3326,gn:"湖州市区",y:3326,s:0,d:0},330502:{g:330502,gn:"吴兴区",y:3527,s:0,d:0},330503:{g:330503,gn:"南浔区",y:3493,s:0,d:0},330521:{g:330521,gn:"德清县",y:3324,s:0,d:0},330522:{g:330522,gn:"长兴县",y:3323,s:0,d:0},330523:{g:330523,gn:"安吉县",y:3325,s:0,d:0}}},330600:{g:330600,gn:"绍兴市",y:3272,s:0,d:330602,l:{330602:{g:330602,gn:"越城区",y:5771,s:0,d:5771,l:{5771:{g:5771,gn:"越城区（塔山街道，府山街道，蕺山街道，北海街道，城南街道，稽山街道，迪荡街道）",y:5771,s:0,d:0},5772:{g:5772,gn:"越城区（其它）",y:5772,s:0,d:0}}},330621:{g:330621,gn:"绍兴县",y:5773,s:0,d:5773,l:{5773:{g:5773,gn:"绍兴县（柯桥街道，柯岩街道，华舍街道）",y:5773,s:0,d:0},5774:{g:5774,gn:"绍兴县（其它）",y:5774,s:0,d:0}}},330624:{g:330624,gn:"新昌县",y:3278,s:0,d:0},330681:{g:330681,gn:"诸暨市",y:3274,s:0,d:0},330682:{g:330682,gn:"上虞市",y:3275,s:0,d:0},330683:{g:330683,gn:"嵊州市",y:3276,s:0,d:0}}},330700:{g:330700,gn:"金华市",y:3279,s:0,d:330702,l:{330702:{g:330702,gn:"婺城区",y:6122,s:0,d:6122,l:{6122:{g:6122,gn:"婺城区（二环以内）",y:6122,s:0,d:0},6231:{g:6231,gn:"婺城区(二环以外）",y:6231,s:0,d:0}}},330703:{g:330703,gn:"金东区",y:6123,s:0,d:6123,l:{6123:{g:6123,gn:"金东区（二环以内）",y:6123,s:0,d:0},6124:{g:6124,gn:"金东区（二环以外）",y:6124,s:0,d:0}}},330723:{g:330723,gn:"武义县",y:3286,s:0,d:0},330726:{g:330726,gn:"浦江县",y:3287,s:0,d:0},330727:{g:330727,gn:"磐安县",y:3288,s:0,d:0},330781:{g:330781,gn:"兰溪市",y:3281,s:0,d:0},330782:{g:330782,gn:"义乌市",y:5567,s:0,d:5567,l:{5567:{g:5567,gn:"义乌市（平畴乡、前洪乡、后宅镇、东河乡、下骆宅镇）",y:5567,s:0,d:0},5568:{g:5568,gn:"义乌市（北苑街道、稠城街道、稠江街道、江东街道）",y:5568,s:0,d:0},5569:{g:5569,gn:"义乌市（其他区域）",y:5569,s:0,d:0}}},330783:{g:330783,gn:"东阳市",y:3283,s:0,d:0},330784:{g:330784,gn:"永康市",y:3284,s:0,d:0}}},330800:{g:330800,gn:"衢州市",y:3289,s:0,d:330802,l:{330802:{g:330802,gn:"柯城区",y:3290,s:0,d:0},330803:{g:330803,gn:"衢江区",y:3292,s:0,d:0},330822:{g:330822,gn:"常山县",y:3294,s:0,d:0},330824:{g:330824,gn:"开化县",y:3295,s:0,d:0},330825:{g:330825,gn:"龙游县",y:3293,s:0,d:0},330881:{g:330881,gn:"江山市",y:3291,s:0,d:0}}},330900:{g:330900,gn:"舟山市",y:3296,s:0,d:330902,l:{330902:{g:330902,gn:"定海区",y:3297,s:0,d:0},330903:{g:330903,gn:"普陀区",y:3298,s:0,d:0},330921:{g:330921,gn:"岱山县",y:3299,s:0,d:0},330922:{g:330922,gn:"嵊泗县",y:3300,s:0,d:0}}},331000:{g:331000,gn:"台州市",y:3301,s:0,d:331002,l:{331002:{g:331002,gn:"椒江区",y:5093,s:0,d:5093,l:{5093:{g:5093,gn:"椒江区（葭沚、白云、海门、三甲、洪家、下陈街道）",y:5093,s:0,d:0},5828:{g:5828,gn:"椒江区（其他）",y:5828,s:0,d:0}}},331003:{g:331003,gn:"黄岩区",y:3303,s:0,d:0},331004:{g:331004,gn:"路桥区",y:5095,s:0,d:5095,l:{5095:{g:5095,gn:"路桥区（桐屿、螺洋、路桥、路南、路北街道、蓬街镇、横街镇）",y:5095,s:0,d:0},5829:{g:5829,gn:"路桥区（其他）",y:5829,s:0,d:0}}},331021:{g:331021,gn:"玉环县",y:3307,s:0,d:0},331022:{g:331022,gn:"三门县",y:3310,s:0,d:0},331023:{g:331023,gn:"天台县",y:3308,s:0,d:0},331024:{g:331024,gn:"仙居县",y:3309,s:0,d:0},331081:{g:331081,gn:"温岭市",y:3306,s:0,d:0},331082:{g:331082,gn:"临海市",y:3305,s:0,d:0}}},331100:{g:331100,gn:"丽水市",y:3311,s:0,d:331102,l:{331102:{g:331102,gn:"莲都区",y:3321,s:0,d:0},331121:{g:331121,gn:"青田县",y:3316,s:0,d:0},331122:{g:331122,gn:"缙云县",y:3315,s:0,d:0},331123:{g:331123,gn:"遂昌县",y:3318,s:0,d:0},331124:{g:331124,gn:"松阳县",y:3319,s:0,d:0},331125:{g:331125,gn:"云和县",y:3317,s:0,d:0},331126:{g:331126,gn:"庆元县",y:3320,s:0,d:0},331127:{g:331127,gn:"景宁畲族自治县",y:3313,s:0,d:0},331181:{g:331181,gn:"龙泉市",y:3314,s:0,d:0}}}}},340000:{g:340000,gn:"安徽省",y:1,s:0,d:340100,l:{340100:{g:340100,gn:"合肥市",y:2,s:0,d:340102,l:{3339:{g:3339,gn:"董浦岛",y:3339,s:0,d:0},3340:{g:3340,gn:"高新区（创新大道以西，湖光路以北）",y:3340,s:0,d:0},4162:{g:4162,gn:"高新区（创新大道以东，湖光路以南）",y:4162,s:0,d:0},4163:{g:4163,gn:"滨湖新区（义兴镇 义城镇）",y:4163,s:0,d:0},4182:{g:4182,gn:"滨湖新区  （大圩乡）",y:4182,s:0,d:0},4487:{g:4487,gn:"经济开发区(云谷路以南)",y:4487,s:0,d:0},4509:{g:4509,gn:"经济开发区(云谷路以北)",y:4509,s:0,d:0},340102:{g:340102,gn:"瑶海区",y:3,s:0,d:3,l:{3:{g:3,gn:"瑶海区（二环以内）",y:3,s:0,d:0},5276:{g:5276,gn:"瑶海区（其他）",y:5276,s:0,d:0}}},340103:{g:340103,gn:"庐阳区",y:4,s:0,d:4,l:{4:{g:4,gn:"庐阳区（二环以内）",y:4,s:0,d:0},5267:{g:5267,gn:"庐阳区（三十岗乡）",y:5267,s:0,d:0},5268:{g:5268,gn:"庐阳区（其他）",y:5268,s:0,d:0}}},340104:{g:340104,gn:"蜀山区",y:5,s:0,d:5,l:{5:{g:5,gn:"蜀山区（二环以内）",y:5,s:0,d:0},5270:{g:5270,gn:"蜀山区（其他）",y:5270,s:0,d:0}}},340111:{g:340111,gn:"包河区",y:6,s:0,d:6,l:{6:{g:6,gn:"包河区（绕城高速内）",y:6,s:0,d:0},3742:{g:3742,gn:"包河区（其他）",y:3742,s:0,d:0},6592:{g:6592,gn:"包河区（大圩乡、大圩镇、义城镇）",y:6592,s:0,d:0}}},340121:{g:340121,gn:"长丰县",y:9,s:0,d:9,l:{9:{g:9,gn:"长丰县（其他）",y:9,s:0,d:0},6593:{g:6593,gn:"长丰县（岗集镇、三十头镇、水家湖镇）",y:6593,s:0,d:0}}},340122:{g:340122,gn:"肥东县",y:7,s:0,d:7,l:{7:{g:7,gn:"肥东县（其他）",y:7,s:0,d:0},6597:{g:6597,gn:"肥东县（店埠镇、撮镇镇）",y:6597,s:0,d:0}}},340123:{g:340123,gn:"肥西县",y:8,s:0,d:8,l:{8:{g:8,gn:"肥西县（长安工业园、井岗镇、南岗镇、上派镇）",y:8,s:0,d:0},6598:{g:6598,gn:"肥西县（桃花镇、小庙镇、紫蓬山管委、紫蓬镇）",y:6598,s:0,d:0},6599:{g:6599,gn:"肥西县（其他）",y:6599,s:0,d:0}}},340124:{g:340124,gn:"庐江县",y:6600,s:0,d:6600,l:{6600:{g:6600,gn:"庐江县（庐城镇、县城）",y:6600,s:0,d:0},6601:{g:6601,gn:"庐江县（其他）",y:6601,s:0,d:0}}},340181:{g:340181,gn:"巢湖市",y:88,s:0,d:6695,l:{6695:{g:6695,gn:"巢湖市（其他）",y:6695,s:0,d:0},6696:{g:6696,gn:"巢湖市（司集镇、苏湾镇、望城镇、银屏镇）",y:6696,s:0,d:0},6697:{g:6697,gn:"巢湖市（高林镇、栏杆镇、庙岗乡、散兵镇）",y:6697,s:0,d:0}}}}},340200:{g:340200,gn:"芜湖市",y:26,s:0,d:5278,l:{5278:{g:5278,gn:"经济技术开发区",y:5278,s:0,d:0},340202:{g:340202,gn:"镜湖区",y:5279,s:0,d:5279,l:{5279:{g:5279,gn:"镜湖区（卜家店）",y:5279,s:0,d:0},5280:{g:5280,gn:"镜湖区（其他）",y:5280,s:0,d:0}}},340203:{g:340203,gn:"弋江区",y:5283,s:0,d:5283,l:{5283:{g:5283,gn:"弋江区（火龙岗镇）",y:5283,s:0,d:0},5284:{g:5284,gn:"弋江区（其他）",y:5284,s:0,d:0}}},340207:{g:340207,gn:"鸠江区",y:5281,s:0,d:0},340208:{g:340208,gn:"三山区",y:5285,s:0,d:5285,l:{5285:{g:5285,gn:"三山区（峨桥镇）",y:5285,s:0,d:0},5286:{g:5286,gn:"三山区（其他）",y:5286,s:0,d:0}}},340221:{g:340221,gn:"芜湖县",y:31,s:0,d:31,l:{31:{g:31,gn:"芜湖县（红杨镇、花桥镇）",y:31,s:0,d:0},6678:{g:6678,gn:"芜湖县（其他）",y:6678,s:0,d:0}}},340222:{g:340222,gn:"繁昌县",y:33,s:0,d:33,l:{33:{g:33,gn:"繁昌县（荻港镇、峨山镇、平铺镇、新港镇）",y:33,s:0,d:0},6670:{g:6670,gn:"繁昌县（其他）",y:6670,s:0,d:0}}},340223:{g:340223,gn:"南陵县",y:32,s:0,d:32,l:{32:{g:32,gn:"南陵县（工山镇、何湾镇、家发镇）",y:32,s:0,d:0},6671:{g:6671,gn:"南陵县（许镇镇、弋江镇、三里镇）",y:6671,s:0,d:0},6672:{g:6672,gn:"南陵县（其他）",y:6672,s:0,d:0}}},340225:{g:340225,gn:"无为县",y:6673,s:0,d:6673,l:{6673:{g:6673,gn:"无为县（白茆镇、陡沟镇、福渡镇、高沟镇、赫店镇）",y:6673,s:0,d:0},6674:{g:6674,gn:"无为县（鹤毛乡、红庙镇、洪巷乡、开城镇、昆山乡）",y:6674,s:0,d:0},6675:{g:6675,gn:"无为县（泥汊镇、牛埠镇、泉塘镇、十里墩乡、石涧镇）",y:6675,s:0,d:0},6676:{g:6676,gn:"无为县（蜀山镇、襄安镇、严桥镇、姚沟镇、刘渡镇）",y:6676,s:0,d:0},6677:{g:6677,gn:"无为县（其他）",y:6677,s:0,d:0}}}}},340300:{g:340300,gn:"蚌埠市",y:39,s:0,d:5215,l:{5215:{g:5215,gn:"高新技术开发区",y:5215,s:0,d:0},5216:{g:5216,gn:"高新技术产业开发区",y:5216,s:0,d:0},6614:{g:6614,gn:"新城开发区",y:6614,s:0,d:0},340302:{g:340302,gn:"龙子湖区",y:5211,s:0,d:5211,l:{5211:{g:5211,gn:"龙子湖区（李楼乡）",y:5211,s:0,d:0},5212:{g:5212,gn:"龙子湖区（其他）",y:5212,s:0,d:0}}},340303:{g:340303,gn:"蚌山区",y:5213,s:0,d:0},340304:{g:340304,gn:"禹会区",y:5209,s:0,d:0},340311:{g:340311,gn:"淮上区",y:3571,s:0,d:3571,l:{3571:{g:3571,gn:"淮上区（吴小街镇、淮滨街道、大杨镇、淝河镇、张店乡）",y:3571,s:0,d:0},6612:{g:6612,gn:"淮上区（其他）",y:6612,s:0,d:0}}},340321:{g:340321,gn:"怀远县",y:44,s:0,d:44,l:{44:{g:44,gn:"怀远县（城关镇、荆芡乡、龙亢镇、五岔镇、徐圩乡）",y:44,s:0,d:0},6611:{g:6611,gn:"怀远县（其他）",y:6611,s:0,d:0}}},340322:{g:340322,gn:"五河县",y:46,s:0,d:46,l:{46:{g:46,gn:"五河县（城关镇）",y:46,s:0,d:0},6613:{g:6613,gn:"五河县（其他）",y:6613,s:0,d:0}}},340323:{g:340323,gn:"固镇县",y:45,s:0,d:45,l:{45:{g:45,gn:"固镇县（城关镇）",y:45,s:0,d:0},6610:{g:6610,gn:"固镇县（其他）",y:6610,s:0,d:0}}}}},340400:{g:340400,gn:"淮南市",y:13,s:0,d:6640,l:{6640:{g:6640,gn:"山南新区",y:6640,s:0,d:0},340402:{g:340402,gn:"大通区",y:5299,s:0,d:5299,l:{5299:{g:5299,gn:"大通区（孔店乡）",y:5299,s:0,d:0},5300:{g:5300,gn:"大通区（其他）",y:5300,s:0,d:0}}},340403:{g:340403,gn:"田家庵区",y:5297,s:0,d:5297,l:{5297:{g:5297,gn:"田家庵区（三和乡、史院乡）",y:5297,s:0,d:0},5298:{g:5298,gn:"田家庵区（其他）",y:5298,s:0,d:0}}},340404:{g:340404,gn:"谢家集区",y:5301,s:0,d:5301,l:{5301:{g:5301,gn:"谢家集区（蔡家岗街、立新街道、平山街道）",y:5301,s:0,d:0},5302:{g:5302,gn:"谢家集区（其他）",y:5302,s:0,d:0},6641:{g:6641,gn:"谢家集区（望峰岗镇、谢家集街、谢三村街）",y:6641,s:0,d:0}}},340405:{g:340405,gn:"八公山区",y:5303,s:0,d:5303,l:{5303:{g:5303,gn:"八公山区（土坝孜街道、新庄孜街道）",y:5303,s:0,d:0},5304:{g:5304,gn:"八公山区（其他）",y:5304,s:0,d:0}}},340406:{g:340406,gn:"潘集区",y:5305,s:0,d:5305,l:{5305:{g:5305,gn:"潘集区（田集街道）",y:5305,s:0,d:0},5306:{g:5306,gn:"潘集区（其他）",y:5306,s:0,d:0}}},340421:{g:340421,gn:"凤台县",y:20,s:0,d:20,l:{20:{g:20,gn:"凤台县（城关镇、凤台县经济开发区）",y:20,s:0,d:0},6639:{g:6639,gn:"凤台县（其他）",y:6639,s:0,d:0}}}}},340500:{g:340500,gn:"马鞍山市",y:47,s:0,d:5223,l:{5223:{g:5223,gn:"金家庄区",y:5223,s:0,d:0},340503:{g:340503,gn:"花山区",y:5220,s:0,d:5220,l:{5220:{g:5220,gn:"花山区（恒兴村、濮塘镇）",y:5220,s:0,d:0},5221:{g:5221,gn:"花山区（其他）",y:5221,s:0,d:0}}},340504:{g:340504,gn:"雨山区",y:5218,s:0,d:5218,l:{5218:{g:5218,gn:"雨山区（薛家洼）",y:5218,s:0,d:0},5219:{g:5219,gn:"雨山区（其他）",y:5219,s:0,d:0}}},340506:{g:340506,gn:"博望区",y:3364,s:0,d:0},340521:{g:340521,gn:"当涂县",y:52,s:0,d:52,l:{52:{g:52,gn:"当涂县（博望镇、丹阳镇、姑孰镇、太白镇）",y:52,s:0,d:0},6655:{g:6655,gn:"当涂县（围屏镇、新博镇、新市镇）",y:6655,s:0,d:0},6656:{g:6656,gn:"当涂县（其他）",y:6656,s:0,d:0}}},340522:{g:340522,gn:"含山县",y:6657,s:0,d:6657,l:{6657:{g:6657,gn:"含山县（环峰镇、运漕镇）",y:6657,s:0,d:0},6658:{g:6658,gn:"含山县（其他）",y:6658,s:0,d:0}}},340523:{g:340523,gn:"和县",y:6659,s:0,d:6659,l:{6659:{g:6659,gn:"和县（濮集镇、和县经济开发区、历阳镇、台湾农民工业园）",y:6659,s:0,d:0},6660:{g:6660,gn:"和县（乌江工业园、乌江精细化产业园、县城）",y:6660,s:0,d:0},6661:{g:6661,gn:"和县（其他）",y:6661,s:0,d:0}}}}},340600:{g:340600,gn:"淮北市",y:21,s:0,d:340602,l:{340602:{g:340602,gn:"杜集区",y:5313,s:0,d:5313,l:{5313:{g:5313,gn:"杜集区（龙湖开发区、东山街道、高岳街道）",y:5313,s:0,d:0},5314:{g:5314,gn:"杜集区（其他）",y:5314,s:0,d:0}}},340603:{g:340603,gn:"相山区",y:5312,s:0,d:0},340604:{g:340604,gn:"烈山区",y:5315,s:0,d:5315,l:{5315:{g:5315,gn:"烈山区（陶瓷工业园、新蔡工业园、杨庄街道）",y:5315,s:0,d:0},5316:{g:5316,gn:"烈山区（其他）",y:5316,s:0,d:0}}},340621:{g:340621,gn:"濉溪县",y:25,s:0,d:25,l:{25:{g:25,gn:"濉溪县（濉溪县开发区、濉溪镇）",y:25,s:0,d:0},6638:{g:6638,gn:"濉溪县（其他）",y:6638,s:0,d:0}}}}},340700:{g:340700,gn:"铜陵市",y:34,s:0,d:6669,l:{6669:{g:6669,gn:"新城区",y:6669,s:0,d:0},340702:{g:340702,gn:"铜官山区",y:5206,s:0,d:0},340703:{g:340703,gn:"狮子山区",y:5203,s:0,d:5203,l:{5203:{g:5203,gn:"狮子山区（矶山街道）",y:5203,s:0,d:0},5204:{g:5204,gn:"狮子山区（其他）",y:5204,s:0,d:0}}},340711:{g:340711,gn:"郊区",y:36,s:0,d:0},340721:{g:340721,gn:"铜陵县",y:37,s:0,d:37,l:{37:{g:37,gn:"铜陵县（东联乡、老洲乡、顺安镇、天门镇、西联乡、胥坝乡、钟鸣镇）",y:37,s:0,d:0},6668:{g:6668,gn:"铜陵县（其他）",y:6668,s:0,d:0}}}}},340800:{g:340800,gn:"安庆市",y:53,s:0,d:3366,l:{3366:{g:3366,gn:"经济技术开发区",y:3366,s:0,d:0},340802:{g:340802,gn:"迎江区",y:5228,s:0,d:5228,l:{5228:{g:5228,gn:"迎江区（长风镇、新洲镇）",y:5228,s:0,d:0},5229:{g:5229,gn:"迎江区（其他）",y:5229,s:0,d:0}}},340803:{g:340803,gn:"大观区",y:5230,s:0,d:5230,l:{5230:{g:5230,gn:"大观区（海口镇、罗冲镇、山口乡、皖河农场）",y:5230,s:0,d:0},5231:{g:5231,gn:"大观区（其他）",y:5231,s:0,d:0}}},340811:{g:340811,gn:"宜秀区",y:3568,s:0,d:3568,l:{3568:{g:3568,gn:"宜秀区（大龙山镇、大桥街道、菱北街道、五里工业园）",y:3568,s:0,d:0},6608:{g:6608,gn:"宜秀区（其他）",y:6608,s:0,d:0}}},340822:{g:340822,gn:"怀宁县",y:61,s:0,d:61,l:{61:{g:61,gn:"怀宁县（高河镇）",y:61,s:0,d:0},6603:{g:6603,gn:"怀宁县（其他）",y:6603,s:0,d:0}}},340823:{g:340823,gn:"枞阳县",y:59,s:0,d:59,l:{59:{g:59,gn:"枞阳县（其他）",y:59,s:0,d:0},6602:{g:6602,gn:"枞阳县（枞阳镇、汤沟镇）",y:6602,s:0,d:0}}},340824:{g:340824,gn:"潜山县",y:64,s:0,d:64,l:{64:{g:64,gn:"潜山县（梅城镇）",y:64,s:0,d:0},6604:{g:6604,gn:"潜山县（其他）",y:6604,s:0,d:0}}},340825:{g:340825,gn:"太湖县",y:60,s:0,d:60,l:{60:{g:60,gn:"太湖县（晋熙镇）",y:60,s:0,d:0},6606:{g:6606,gn:"太湖县（其他）",y:6606,s:0,d:0}}},340826:{g:340826,gn:"宿松县",y:58,s:0,d:58,l:{58:{g:58,gn:"宿松县（孚玉镇、县城）",y:58,s:0,d:0},6605:{g:6605,gn:"宿松县（其他）",y:6605,s:0,d:0}}},340827:{g:340827,gn:"望江县",y:63,s:0,d:63,l:{63:{g:63,gn:"望江县（华阳镇）",y:63,s:0,d:0},6607:{g:6607,gn:"望江县（其他）",y:6607,s:0,d:0}}},340828:{g:340828,gn:"岳西县",y:62,s:0,d:62,l:{62:{g:62,gn:"岳西县（其他）",y:62,s:0,d:0},6609:{g:6609,gn:"岳西县（天堂镇）",y:6609,s:0,d:0}}},340881:{g:340881,gn:"桐城市",y:5226,s:0,d:5226,l:{5226:{g:5226,gn:"桐城市（大关镇、范岗镇、龙眠街道、龙腾街道、文昌街道、新渡镇、双港镇）",y:5226,s:0,d:0},5227:{g:5227,gn:"桐城市（其他）",y:5227,s:0,d:0}}}}},341000:{g:341000,gn:"黄山市",y:65,s:0,d:341002,l:{341002:{g:341002,gn:"屯溪区",y:5234,s:0,d:5234,l:{5234:{g:5234,gn:"屯溪区（新潭镇、奕棋镇）",y:5234,s:0,d:0},5235:{g:5235,gn:"屯溪区（其他）",y:5235,s:0,d:0}}},341003:{g:341003,gn:"黄山区",y:5236,s:0,d:5236,l:{5236:{g:5236,gn:"黄山区（甘棠镇）",y:5236,s:0,d:0},5237:{g:5237,gn:"黄山区（其他）",y:5237,s:0,d:0}}},341004:{g:341004,gn:"徽州区",y:5238,s:0,d:5238,l:{5238:{g:5238,gn:"徽州区（徽州街道、西溪南镇、岩寺镇）",y:5238,s:0,d:0},5239:{g:5239,gn:"徽州区（其他）",y:5239,s:0,d:0}}},341021:{g:341021,gn:"歙县",y:70,s:0,d:70,l:{70:{g:70,gn:"歙县（徽城镇）",y:70,s:0,d:0},6643:{g:6643,gn:"歙县（其他）",y:6643,s:0,d:0}}},341022:{g:341022,gn:"休宁县",y:69,s:0,d:69,l:{69:{g:69,gn:"休宁县（海阳镇）",y:69,s:0,d:0},6644:{g:6644,gn:"休宁县（其他）",y:6644,s:0,d:0}}},341023:{g:341023,gn:"黟县",y:72,s:0,d:72,l:{72:{g:72,gn:"黟县（碧阳镇）",y:72,s:0,d:0},6645:{g:6645,gn:"黟县（其他）",y:6645,s:0,d:0}}},341024:{g:341024,gn:"祁门县",y:71,s:0,d:71,l:{71:{g:71,gn:"祁门县（祁山镇）",y:71,s:0,d:0},6642:{g:6642,gn:"祁门县（其他）",y:6642,s:0,d:0}}}}},341100:{g:341100,gn:"滁州市",y:79,s:0,d:341181,l:{341102:{g:341102,gn:"琅琊区",y:5244,s:0,d:0},341103:{g:341103,gn:"南谯区",y:5245,s:0,d:5245,l:{5245:{g:5245,gn:"南谯区（大王街道、担子乡、南谯街道、腰铺镇）",y:5245,s:0,d:0},5246:{g:5246,gn:"南谯区（其他）",y:5246,s:0,d:0}}},341122:{g:341122,gn:"来安县",y:83,s:0,d:83,l:{83:{g:83,gn:"来安县（新安镇）",y:83,s:0,d:0},6626:{g:6626,gn:"来安县（其他）",y:6626,s:0,d:0}}},341124:{g:341124,gn:"全椒县",y:82,s:0,d:82,l:{82:{g:82,gn:"全椒县（襄河镇）",y:82,s:0,d:0},6628:{g:6628,gn:"全椒县（其他）",y:6628,s:0,d:0}}},341125:{g:341125,gn:"定远县",y:84,s:0,d:84,l:{84:{g:84,gn:"定远县（定城镇）",y:84,s:0,d:0},6624:{g:6624,gn:"定远县（其他）",y:6624,s:0,d:0}}},341126:{g:341126,gn:"凤阳县",y:85,s:0,d:85,l:{85:{g:85,gn:"凤阳县（府城镇、临淮关镇、门台子镇）",y:85,s:0,d:0},6625:{g:6625,gn:"凤阳县（其他）",y:6625,s:0,d:0}}},341181:{g:341181,gn:"天长市",y:80,s:0,d:80,l:{80:{g:80,gn:"天长市（汊涧镇、城东新区、大圩区、关塘乡、金集镇）",y:80,s:0,d:0},6629:{g:6629,gn:"天长市（秦栏镇、仁和集镇、石梁镇、天长街道）",y:6629,s:0,d:0},6630:{g:6630,gn:"天长市（西城经济开发区、杨村镇、永丰镇、铜城镇）",y:6630,s:0,d:0},6631:{g:6631,gn:"天长市（其他）",y:6631,s:0,d:0}}},341182:{g:341182,gn:"明光市",y:81,s:0,d:81,l:{81:{g:81,gn:"明光市（明光街道）",y:81,s:0,d:0},6627:{g:6627,gn:"明光市（其他）",y:6627,s:0,d:0}}}}},341200:{g:341200,gn:"阜阳市",y:115,s:0,d:341282,l:{6633:{g:6633,gn:"阜阳经济技术开发区",y:6633,s:0,d:0},341202:{g:341202,gn:"颍州区",y:5287,s:0,d:5287,l:{5287:{g:5287,gn:"颍州区（鼓楼街道、九龙街道、清河街道、文峰街道、西湖景区街道、颖西街道、西湖镇）",y:5287,s:0,d:0},5288:{g:5288,gn:"颍州区（其他）",y:5288,s:0,d:0}}},341203:{g:341203,gn:"颍东区",y:5289,s:0,d:5289,l:{5289:{g:5289,gn:"颍东区（河东街道、向阳街道、新华街道）",y:5289,s:0,d:0},5290:{g:5290,gn:"颍东区（其他）",y:5290,s:0,d:0}}},341204:{g:341204,gn:"颍泉区",y:5291,s:0,d:5291,l:{5291:{g:5291,gn:"颍泉区（中市街道、周棚街道）",y:5291,s:0,d:0},5292:{g:5292,gn:"颍泉区（其他）",y:5292,s:0,d:0}}},341221:{g:341221,gn:"临泉县",y:121,s:0,d:121,l:{121:{g:121,gn:"临泉县（城关镇）",y:121,s:0,d:0},6635:{g:6635,gn:"临泉县（其他）",y:6635,s:0,d:0}}},341222:{g:341222,gn:"太和县",y:122,s:0,d:122,l:{122:{g:122,gn:"太和县（城关镇）",y:122,s:0,d:0},6636:{g:6636,gn:"太和县（其他）",y:6636,s:0,d:0}}},341225:{g:341225,gn:"阜南县",y:120,s:0,d:120,l:{120:{g:120,gn:"阜南县（鹿城镇）",y:120,s:0,d:0},6632:{g:6632,gn:"阜南县（其他）",y:6632,s:0,d:0}}},341226:{g:341226,gn:"颍上县",y:123,s:0,d:123,l:{123:{g:123,gn:"颍上县（慎城镇、三十铺镇）",y:123,s:0,d:0},6637:{g:6637,gn:"颍上县（其他）",y:6637,s:0,d:0}}},341282:{g:341282,gn:"界首市",y:116,s:0,d:116,l:{116:{g:116,gn:"界首市（东城街道、西城街道、颍南街道）",y:116,s:0,d:0},6634:{g:6634,gn:"界首市（其他）",y:6634,s:0,d:0}}}}},341300:{g:341300,gn:"宿州市",y:73,s:0,d:341322,l:{341302:{g:341302,gn:"埇桥区",y:5241,s:0,d:5241,l:{5241:{g:5241,gn:"埇桥区（其他）",y:5241,s:0,d:0},5242:{g:5242,gn:"埇桥区（埇桥街道、沱河街道、道东街道、东关街道、汴河街道）",y:5242,s:0,d:0},6662:{g:6662,gn:"埇桥区（三里湾街道、南关街道、西关街道、北关街道、金海街道）",y:6662,s:0,d:0},6663:{g:6663,gn:"埇桥区（城东办事处、北十里、东十里、符离集镇、朱仙庄镇）",y:6663,s:0,d:0}}},341321:{g:341321,gn:"砀山县",y:76,s:0,d:76,l:{76:{g:76,gn:"砀山县（砀城镇）",y:76,s:0,d:0},6664:{g:6664,gn:"砀山县（其他）",y:6664,s:0,d:0}}},341322:{g:341322,gn:"萧县",y:74,s:0,d:74,l:{74:{g:74,gn:"萧县（龙城镇）",y:74,s:0,d:0},6667:{g:6667,gn:"萧县（其他）",y:6667,s:0,d:0}}},341323:{g:341323,gn:"灵璧县",y:77,s:0,d:77,l:{77:{g:77,gn:"灵璧县（灵城镇）",y:77,s:0,d:0},6665:{g:6665,gn:"灵璧县（其他）",y:6665,s:0,d:0}}},341324:{g:341324,gn:"泗县",y:75,s:0,d:75,l:{75:{g:75,gn:"泗县（泗城镇）",y:75,s:0,d:0},6666:{g:6666,gn:"泗县（其他）",y:6666,s:0,d:0}}}}},341500:{g:341500,gn:"六安市",y:107,s:0,d:6652,l:{6652:{g:6652,gn:"叶集区（叶集镇）",y:6652,s:0,d:0},6653:{g:6653,gn:"叶集区（其他）",y:6653,s:0,d:0},341502:{g:341502,gn:"金安区",y:5261,s:0,d:5261,l:{5261:{g:5261,gn:"金安区（东市街道、清水河、三里桥街道、三十铺镇、望城街道、中市街道）",y:5261,s:0,d:0},5262:{g:5262,gn:"金安区（其他）",y:5262,s:0,d:0}}},341503:{g:341503,gn:"裕安区",y:5263,s:0,d:5263,l:{5263:{g:5263,gn:"裕安区（鼓楼街道、西市街道、小华山街道、新安镇）",y:5263,s:0,d:0},5264:{g:5264,gn:"裕安区（其他）",y:5264,s:0,d:0}}},341521:{g:341521,gn:"寿县",y:110,s:0,d:110,l:{110:{g:110,gn:"寿县（寿春镇）",y:110,s:0,d:0},6650:{g:6650,gn:"寿县（其他）",y:6650,s:0,d:0}}},341522:{g:341522,gn:"霍邱县",y:112,s:0,d:112,l:{112:{g:112,gn:"霍邱县（城关镇）",y:112,s:0,d:0},6648:{g:6648,gn:"霍邱县（其他）",y:6648,s:0,d:0}}},341523:{g:341523,gn:"舒城县",y:113,s:0,d:113,l:{113:{g:113,gn:"舒城县（城关镇、杭埠镇、千人桥镇）",y:113,s:0,d:0},6651:{g:6651,gn:"舒城县（其他）",y:6651,s:0,d:0}}},341524:{g:341524,gn:"金寨县",y:114,s:0,d:114,l:{114:{g:114,gn:"金寨县（江店镇、梅山镇）",y:114,s:0,d:0},6654:{g:6654,gn:"金寨县（其他）",y:6654,s:0,d:0}}},341525:{g:341525,gn:"霍山县",y:111,s:0,d:111,l:{111:{g:111,gn:"霍山县（衡山镇、佛子岭镇）",y:111,s:0,d:0},6649:{g:6649,gn:"霍山县（其他）",y:6649,s:0,d:0}}}}},341600:{g:341600,gn:"亳州市",y:124,s:0,d:341602,l:{341602:{g:341602,gn:"谯城区",y:5295,s:0,d:5295,l:{5295:{g:5295,gn:"谯城区（亳州工业园、亳州南部新区工业区、古井镇、花戏楼街道、十八里镇）",y:5295,s:0,d:0},5296:{g:5296,gn:"谯城区（其他）",y:5296,s:0,d:0},6617:{g:6617,gn:"谯城区（十九里镇、汤陵街道、魏岗镇、薛阁街道、张集镇）",y:6617,s:0,d:0}}},341621:{g:341621,gn:"涡阳县",y:127,s:0,d:127,l:{127:{g:127,gn:"涡阳县（城关镇）",y:127,s:0,d:0},6618:{g:6618,gn:"涡阳县（其他）",y:6618,s:0,d:0}}},341622:{g:341622,gn:"蒙城县",y:126,s:0,d:126,l:{126:{g:126,gn:"蒙城县（城关镇）",y:126,s:0,d:0},6616:{g:6616,gn:"蒙城县（其他）",y:6616,s:0,d:0}}},341623:{g:341623,gn:"利辛县",y:128,s:0,d:128,l:{128:{g:128,gn:"利辛县（城关镇）",y:128,s:0,d:0},6615:{g:6615,gn:"利辛县（其他）",y:6615,s:0,d:0}}}}},341700:{g:341700,gn:"池州市",y:102,s:0,d:6621,l:{6621:{g:6621,gn:"九华山",y:6621,s:0,d:0},341702:{g:341702,gn:"贵池区",y:5257,s:0,d:5257,l:{5257:{g:5257,gn:"贵池区（池阳街道、马衙街道、清风街道、清溪街道、秋浦街道、杏花村）",y:5257,s:0,d:0},5258:{g:5258,gn:"贵池区（其他）",y:5258,s:0,d:0}}},341721:{g:341721,gn:"东至县",y:106,s:0,d:106,l:{106:{g:106,gn:"东至县（尧渡镇）",y:106,s:0,d:0},6620:{g:6620,gn:"东至县（其他）",y:6620,s:0,d:0}}},341722:{g:341722,gn:"石台县",y:104,s:0,d:104,l:{104:{g:104,gn:"石台县（仁里镇）",y:104,s:0,d:0},6623:{g:6623,gn:"石台县（其他）",y:6623,s:0,d:0}}},341723:{g:341723,gn:"青阳县",y:105,s:0,d:105,l:{105:{g:105,gn:"青阳县（蓉城镇）",y:105,s:0,d:0},6622:{g:6622,gn:"青阳县（其他）",y:6622,s:0,d:0}}}}},341800:{g:341800,gn:"宣城市",y:94,s:0,d:341802,l:{341802:{g:341802,gn:"宣州区",y:5255,s:0,d:5255,l:{5255:{g:5255,gn:"宣州区（沈村镇、古泉镇、洪林镇、杨柳镇）",y:5255,s:0,d:0},5256:{g:5256,gn:"宣州区（其他）",y:5256,s:0,d:0},6692:{g:6692,gn:"宣州区（寒亭镇、文昌镇、孙埠镇、向阳镇）",y:6692,s:0,d:0},6693:{g:6693,gn:"宣州区（水东镇、新田镇、周王镇、溪口镇、朱桥乡）",y:6693,s:0,d:0},6694:{g:6694,gn:"宣州区（养贤乡、五星乡、金坝乡、黄渡乡）",y:6694,s:0,d:0}}},341821:{g:341821,gn:"郎溪县",y:98,s:0,d:98,l:{98:{g:98,gn:"郎溪县（毕桥镇、东夏镇、飞鲤镇、凌笪镇、梅渚镇、南丰镇）",y:98,s:0,d:0},6687:{g:6687,gn:"郎溪县（十字镇、涛城镇、新发镇、幸福、姚村）",y:6687,s:0,d:0},6688:{g:6688,gn:"郎溪县（其他）",y:6688,s:0,d:0}}},341822:{g:341822,gn:"广德县",y:97,s:0,d:97,l:{97:{g:97,gn:"广德县（柏垫镇、东亭乡、广德县开发区、卢村乡）",y:97,s:0,d:0},6679:{g:6679,gn:"广德县（誓节镇、四合乡、新杭镇、杨滩乡）",y:6679,s:0,d:0},6680:{g:6680,gn:"广德县（其他）",y:6680,s:0,d:0}}},341823:{g:341823,gn:"泾县",y:99,s:0,d:99,l:{99:{g:99,gn:"泾县（蔡村镇、昌桥乡、黄村镇、榔桥镇）",y:99,s:0,d:0},6683:{g:6683,gn:"泾县（茂林镇、琴溪镇、桃花潭镇、汀溪乡、云岭镇）",y:6683,s:0,d:0},6684:{g:6684,gn:"泾县（其他）",y:6684,s:0,d:0}}},341824:{g:341824,gn:"绩溪县",y:101,s:0,d:101,l:{101:{g:101,gn:"绩溪县（板桥头乡、长安镇、伏岭镇、家朋乡、瀛洲乡）",y:101,s:0,d:0},6681:{g:6681,gn:"绩溪县（金沙镇、荆州乡、临溪镇、上庄镇、扬溪镇）",y:6681,s:0,d:0},6682:{g:6682,gn:"绩溪县（其他）",y:6682,s:0,d:0}}},341825:{g:341825,gn:"旌德县",y:100,s:0,d:100,l:{100:{g:100,gn:"旌德县（白地镇、版书乡、蔡家桥镇、庙首镇、三溪镇）",y:100,s:0,d:0},6685:{g:6685,gn:"旌德县（孙村乡、兴隆乡、俞村乡、云乐乡）",y:6685,s:0,d:0},6686:{g:6686,gn:"旌德县（其他）",y:6686,s:0,d:0}}},341881:{g:341881,gn:"宁国市",y:96,s:0,d:96,l:{96:{g:96,gn:"宁国市（方塘乡、胡乐镇、甲路镇、梅林镇、南极乡）",y:96,s:0,d:0},6689:{g:6689,gn:"宁国市（宁墩镇、青龙乡、天湖镇、万家乡）",y:6689,s:0,d:0},6690:{g:6690,gn:"宁国市（霞西镇、仙霞镇、云梯畲族乡、竹峰乡）",y:6690,s:0,d:0},6691:{g:6691,gn:"宁国市（其他）",y:6691,s:0,d:0}}}}}}},350000:{g:350000,gn:"福建省",y:201,s:0,d:350100,l:{3446:{g:3446,gn:"长乐市",y:3446,s:0,d:3572,l:{3572:{g:3572,gn:"吴航镇",y:3572,s:0,d:0},3573:{g:3573,gn:"潭头镇",y:3573,s:0,d:0},3574:{g:3574,gn:"梅花镇",y:3574,s:0,d:0},3575:{g:3575,gn:"文岭镇",y:3575,s:0,d:0},3576:{g:3576,gn:"金峰镇",y:3576,s:0,d:0},3578:{g:3578,gn:"湖南镇",y:3578,s:0,d:0},3579:{g:3579,gn:"营前镇",y:3579,s:0,d:0},3580:{g:3580,gn:"首占镇",y:3580,s:0,d:0},3581:{g:3581,gn:"鹤上镇",y:3581,s:0,d:0},3582:{g:3582,gn:"漳港镇",y:3582,s:0,d:0},3584:{g:3584,gn:"古槐镇",y:3584,s:0,d:0},3585:{g:3585,gn:"文武砂镇",y:3585,s:0,d:0},3586:{g:3586,gn:"江田镇",y:3586,s:0,d:0},3587:{g:3587,gn:"松下镇",y:3587,s:0,d:0},3588:{g:3588,gn:"猴屿乡",y:3588,s:0,d:0},3589:{g:3589,gn:"罗联乡",y:3589,s:0,d:0}}},350100:{g:350100,gn:"福州市",y:202,s:1,d:350102,l:{350102:{g:350102,gn:"鼓楼区",y:5150,s:0,d:5150,l:{5150:{g:5150,gn:"鼓楼区（三环以内）",y:5150,s:0,d:0},5151:{g:5151,gn:"鼓楼区（三环以外）",y:5151,s:0,d:0}}},350103:{g:350103,gn:"台江区",y:5148,s:0,d:5148,l:{5148:{g:5148,gn:"台江区（三环以内）",y:5148,s:0,d:0},5149:{g:5149,gn:"台江区（三环以外）",y:5149,s:0,d:0}}},350104:{g:350104,gn:"仓山区",y:5146,s:0,d:5146,l:{5146:{g:5146,gn:"仓山区（三环以内）",y:5146,s:0,d:0},5147:{g:5147,gn:"仓山区（三环以外）",y:5147,s:0,d:0}}},350105:{g:350105,gn:"马尾区",y:4482,s:1,d:4482,l:{4482:{g:4482,gn:"马尾区(除亭江镇)",y:4482,s:1,d:0},4502:{g:4502,gn:"马尾区(亭江镇)",y:4502,s:0,d:0}}},350111:{g:350111,gn:"晋安区",y:5140,s:0,d:5140,l:{5140:{g:5140,gn:"晋安区（三环以内）",y:5140,s:0,d:0},5141:{g:5141,gn:"晋安区（三环以外）",y:5141,s:0,d:0}}},350121:{g:350121,gn:"闽侯县",y:6005,s:0,d:6005,l:{6005:{g:6005,gn:"闽侯县（大湖乡、廷坪乡、小箬乡、洋里乡）",y:6005,s:0,d:0},6006:{g:6006,gn:"闽侯县（其他）",y:6006,s:0,d:0}}},350122:{g:350122,gn:"连江县",y:5991,s:0,d:5991,l:{5991:{g:5991,gn:"连江县（蓼沿乡、小沧乡、晓澳镇）",y:5991,s:0,d:0},5992:{g:5992,gn:"连江县（其他）",y:5992,s:0,d:0}}},350123:{g:350123,gn:"罗源县",y:5993,s:0,d:5993,l:{5993:{g:5993,gn:"罗源县（飞竹镇、霍口畲族乡、鉴江镇、中房镇）",y:5993,s:0,d:0},5994:{g:5994,gn:"罗源县（其他）",y:5994,s:0,d:0}}},350124:{g:350124,gn:"闽清县",y:6007,s:0,d:6007,l:{6007:{g:6007,gn:"闽清县（桔林乡、上莲乡、省璜镇、下祝乡）",y:6007,s:0,d:0},6008:{g:6008,gn:"闽清县（其他）",y:6008,s:0,d:0}}},350125:{g:350125,gn:"永泰县",y:6011,s:0,d:6011,l:{6011:{g:6011,gn:"永泰县（城峰镇、赤锡乡、富泉乡、岭路乡）",y:6011,s:0,d:0},6012:{g:6012,gn:"永泰县（清凉镇、塘前乡、梧桐镇、樟城镇）",y:6012,s:0,d:0},6013:{g:6013,gn:"永泰县（其他）",y:6013,s:0,d:0}}},350128:{g:350128,gn:"平潭县",y:6009,s:0,d:6009,l:{6009:{g:6009,gn:"平潭县（大练乡、东庠乡、岚城乡、南海乡、屿头乡）",y:6009,s:0,d:0},6010:{g:6010,gn:"平潭县（其他）",y:6010,s:0,d:0}}},350181:{g:350181,gn:"福清市",y:5989,s:0,d:5989,l:{5989:{g:5989,gn:"福清市（龙江街道、龙山街道、石竹街道、玉屏街道）",y:5989,s:0,d:0},5990:{g:5990,gn:"福清市（其他）",y:5990,s:0,d:0}}},350182:{g:350182,gn:"长乐市",y:204,s:0,d:0}}},350200:{g:350200,gn:"厦门市",y:216,s:1,d:220,l:{220:{g:220,gn:"杏林区",y:220,s:0,d:0},350203:{g:350203,gn:"思明区",y:4484,s:1,d:4484,l:{4484:{g:4484,gn:"思明区(鼓浪屿除外)",y:4484,s:1,d:0},4485:{g:4485,gn:"思明区(鼓浪屿)",y:4485,s:0,d:0}}},350205:{g:350205,gn:"海沧区",y:3502,s:1,d:0},350206:{g:350206,gn:"湖里区",y:221,s:1,d:0},350211:{g:350211,gn:"集美区",y:222,s:1,d:0},350212:{g:350212,gn:"同安区",y:223,s:1,d:0},350213:{g:350213,gn:"翔安区",y:4486,s:1,d:4486,l:{4486:{g:4486,gn:"翔安区(大澄除外)",y:4486,s:1,d:0},4508:{g:4508,gn:"翔安区(大澄)",y:4508,s:0,d:0}}}}},350300:{g:350300,gn:"莆田市",y:237,s:0,d:6129,l:{6129:{g:6129,gn:"湄洲北岸开发区",y:6129,s:0,d:0},350302:{g:350302,gn:"城厢区",y:6125,s:0,d:6125,l:{6125:{g:6125,gn:"城厢区（常太镇）",y:6125,s:0,d:0},6126:{g:6126,gn:"城厢区（其他）",y:6126,s:0,d:0}}},350303:{g:350303,gn:"涵江区",y:6127,s:0,d:6127,l:{6127:{g:6127,gn:"涵江区（白沙镇、大洋乡、秋芦镇、萩芦镇、新县镇、庄边镇）",y:6127,s:0,d:0},6128:{g:6128,gn:"涵江区（其他）",y:6128,s:0,d:0}}},350304:{g:350304,gn:"荔城区",y:238,s:0,d:238,l:{238:{g:238,gn:"荔城区",y:238,s:0,d:0}}},350305:{g:350305,gn:"秀屿区",y:6133,s:0,d:6133,l:{6133:{g:6133,gn:"秀屿区（东埔镇、湄州镇、南日镇、山亭乡）",y:6133,s:0,d:0},6134:{g:6134,gn:"秀屿区（其他）",y:6134,s:0,d:0}}},350322:{g:350322,gn:"仙游县",y:6130,s:0,d:6130,l:{6130:{g:6130,gn:"仙游县（社硎乡、石苍乡、书峰乡、西苑乡、象溪乡）",y:6130,s:0,d:0},6131:{g:6131,gn:"仙游县（游洋镇、园庄镇、钟山镇）",y:6131,s:0,d:0},6132:{g:6132,gn:"仙游县（其他）",y:6132,s:0,d:0}}}}},350400:{g:350400,gn:"三明市",y:224,s:0,d:350481,l:{350402:{g:350402,gn:"梅列区",y:235,s:0,d:0},350403:{g:350403,gn:"三元区",y:236,s:0,d:0},350421:{g:350421,gn:"明溪县",y:226,s:0,d:0},350423:{g:350423,gn:"清流县",y:233,s:0,d:0},350424:{g:350424,gn:"宁化县",y:229,s:0,d:0},350425:{g:350425,gn:"大田县",y:228,s:0,d:0},350426:{g:350426,gn:"尤溪县",y:232,s:0,d:0},350427:{g:350427,gn:"沙县",y:231,s:0,d:0},350428:{g:350428,gn:"将乐县",y:227,s:0,d:0},350429:{g:350429,gn:"泰宁县",y:234,s:0,d:0},350430:{g:350430,gn:"建宁县",y:230,s:0,d:0},350481:{g:350481,gn:"永安市",y:225,s:0,d:0}}},350500:{g:350500,gn:"泉州市",y:243,s:1,d:350581,l:{350502:{g:350502,gn:"鲤城区",y:252,s:1,d:0},350503:{g:350503,gn:"丰泽区",y:4506,s:1,d:4506,l:{4506:{g:4506,gn:"丰泽区(金门县除外)",y:4506,s:1,d:0},4507:{g:4507,gn:"丰泽区(金门县)",y:4507,s:0,d:0}}},350504:{g:350504,gn:"洛江区",y:254,s:1,d:0},350505:{g:350505,gn:"泉港区",y:258,s:1,d:0},350521:{g:350521,gn:"惠安县",y:247,s:1,d:0},350524:{g:350524,gn:"安溪县",y:249,s:0,d:0},350525:{g:350525,gn:"永春县",y:248,s:0,d:0},350526:{g:350526,gn:"德化县",y:250,s:0,d:0},350527:{g:350527,gn:"金门县",y:251,s:0,d:0},350581:{g:350581,gn:"石狮市",y:244,s:1,d:244,l:{244:{g:244,gn:"石狮市(市区)",y:244,s:1,d:0},255:{g:255,gn:"石狮市(郊区城镇)",y:255,s:1,d:0}}},350582:{g:350582,gn:"晋江市",y:245,s:1,d:245,l:{245:{g:245,gn:"晋江市(市区)",y:245,s:1,d:0},257:{g:257,gn:"晋江市(郊区,城镇)",y:257,s:1,d:0}}},350583:{g:350583,gn:"南安市",y:246,s:1,d:0}}},350600:{g:350600,gn:"漳州市",y:259,s:1,d:350681,l:{350602:{g:350602,gn:"芗城区",y:269,s:1,d:0},350603:{g:350603,gn:"龙文区",y:270,s:1,d:0},350622:{g:350622,gn:"云霄县",y:268,s:0,d:0},350623:{g:350623,gn:"漳浦县",y:264,s:0,d:0},350624:{g:350624,gn:"诏安县",y:263,s:0,d:0},350625:{g:350625,gn:"长泰县",y:267,s:0,d:0},350626:{g:350626,gn:"东山县",y:266,s:0,d:0},350627:{g:350627,gn:"南靖县",y:262,s:0,d:0},350628:{g:350628,gn:"平和县",y:261,s:0,d:0},350629:{g:350629,gn:"华安县",y:265,s:0,d:0},350681:{g:350681,gn:"龙海市",y:260,s:0,d:0}}},350700:{g:350700,gn:"南平市",y:271,s:0,d:350783,l:{350702:{g:350702,gn:"延平区",y:281,s:0,d:281,l:{281:{g:281,gn:"延平区（洋后镇、巨口乡、赤门乡）",y:281,s:0,d:0},6262:{g:6262,gn:"延平区（其他）",y:6262,s:0,d:0}}},350721:{g:350721,gn:"顺昌县",y:278,s:0,d:278,l:{278:{g:278,gn:"顺昌县（大干镇、埔上镇、双溪街道、双溪镇、水南镇）",y:278,s:0,d:0},6259:{g:6259,gn:"顺昌县（其他）",y:6259,s:0,d:0}}},350722:{g:350722,gn:"浦城县",y:279,s:0,d:279,l:{279:{g:279,gn:"浦城县（富岭镇、莲塘镇、临江镇、南浦街道、南浦镇）",y:279,s:0,d:0},6257:{g:6257,gn:"浦城县（水南乡、万安乡、仙阳镇）",y:6257,s:0,d:0},6258:{g:6258,gn:"浦城县（其他）",y:6258,s:0,d:0}}},350723:{g:350723,gn:"光泽县",y:277,s:0,d:277,l:{277:{g:277,gn:"光泽县（崇仁乡、杭川镇）",y:277,s:0,d:0},6253:{g:6253,gn:"光泽县（其他）",y:6253,s:0,d:0}}},350724:{g:350724,gn:"松溪县",y:276,s:0,d:276,l:{276:{g:276,gn:"松溪县（花桥乡、溪东乡、祖墩乡）",y:276,s:0,d:0},6260:{g:6260,gn:"松溪县（其他）",y:6260,s:0,d:0}}},350725:{g:350725,gn:"政和县",y:280,s:0,d:280,l:{280:{g:280,gn:"政和县（澄源乡、岭腰乡、外屯乡、杨源乡、镇前镇）",y:280,s:0,d:0},6263:{g:6263,gn:"政和县（其他）",y:6263,s:0,d:0}}},350781:{g:350781,gn:"邵武市",y:273,s:0,d:273,l:{273:{g:273,gn:"邵武市（昭阳街道、通泰街道、水北街道、晒口街道、城郊镇）",y:273,s:0,d:0},6264:{g:6264,gn:"邵武市（水北镇、下沙镇、拿口镇、吴家塘镇）",y:6264,s:0,d:0},6265:{g:6265,gn:"邵武市（其他）",y:6265,s:0,d:0}}},350782:{g:350782,gn:"武夷山市",y:274,s:0,d:274,l:{274:{g:274,gn:"武夷山市（岚谷乡、吴屯乡、五夫镇、新丰街道）",y:274,s:0,d:0},6261:{g:6261,gn:"武夷山市（其他）",y:6261,s:0,d:0}}},350783:{g:350783,gn:"建瓯市",y:272,s:0,d:272,l:{272:{g:272,gn:"建瓯市（建安街道、通济街道、瓯宁街道、芝山街道、徐墩镇）",y:272,s:0,d:0},6254:{g:6254,gn:"建瓯市（东游镇、东峰镇、顺阳乡、水源乡、川石乡）",y:6254,s:0,d:0},6255:{g:6255,gn:"建瓯市（其他）",y:6255,s:0,d:0}}},350784:{g:350784,gn:"建阳市",y:275,s:0,d:275,l:{275:{g:275,gn:"建阳市（崇雒乡、回龙乡、小湖镇、徐市镇、漳墩镇）",y:275,s:0,d:0},6256:{g:6256,gn:"建阳市（其他）",y:6256,s:0,d:0}}}}},350800:{g:350800,gn:"龙岩市",y:292,s:1,d:350821,l:{350802:{g:350802,gn:"新罗区",y:298,s:1,d:298,l:{298:{g:298,gn:"新罗区（白沙镇、大池镇、抚市镇、江山乡、江山镇、适中镇）",y:298,s:1,d:0},6239:{g:6239,gn:"新罗区（苏坂镇、万安镇、下洋镇、小池镇、岩前镇、岩山乡）",y:6239,s:0,d:0},6240:{g:6240,gn:"新罗区（其他）",y:6240,s:0,d:0}}},350821:{g:350821,gn:"长汀县",y:293,s:0,d:293,l:{293:{g:293,gn:"长汀县（策武工业园、策武乡、长汀县城城区、大同镇、河田镇）",y:293,s:0,d:0},6235:{g:6235,gn:"长汀县（其他）",y:6235,s:0,d:0}}},350822:{g:350822,gn:"永定县",y:296,s:0,d:296,l:{296:{g:296,gn:"永定县（凤城镇、抚市镇、高陂镇、坎市镇、培丰镇、下洋镇）",y:296,s:0,d:0},6241:{g:6241,gn:"永定县（其他）",y:6241,s:0,d:0}}},350823:{g:350823,gn:"上杭县",y:295,s:0,d:295,l:{295:{g:295,gn:"上杭县（古田镇、蛟洋乡、临城镇、临江镇）",y:295,s:0,d:0},6237:{g:6237,gn:"上杭县（其他）",y:6237,s:0,d:0}}},350824:{g:350824,gn:"武平县",y:294,s:0,d:294,l:{294:{g:294,gn:"武平县（平川镇、青云山工业区、武平县工业区）",y:294,s:0,d:0},6238:{g:6238,gn:"武平县（其他）",y:6238,s:0,d:0}}},350825:{g:350825,gn:"连城县",y:297,s:0,d:297,l:{297:{g:297,gn:"连城县（莲峰镇、朋口镇、文亨乡、文亨镇）",y:297,s:0,d:0},6236:{g:6236,gn:"连城县（其他）",y:6236,s:0,d:0}}},350881:{g:350881,gn:"漳平市",y:3432,s:0,d:3432,l:{3432:{g:3432,gn:"漳平市（富山工业园区、桂林街道、菁城街道、西园乡、永福镇）",y:3432,s:0,d:0},6242:{g:6242,gn:"漳平市（其他）",y:6242,s:0,d:0}}}}},350900:{g:350900,gn:"宁德市",y:282,s:0,d:350981,l:{350902:{g:350902,gn:"蕉城区",y:291,s:0,d:291,l:{291:{g:291,gn:"蕉城区（八都镇、赤溪镇、洪口乡、虎贝乡、霍童镇）",y:291,s:0,d:0},6274:{g:6274,gn:"蕉城区（金涵畲族乡、九都镇、七都镇、三都镇）",y:6274,s:0,d:0},6275:{g:6275,gn:"蕉城区（其他）",y:6275,s:0,d:0}}},350921:{g:350921,gn:"霞浦县",y:286,s:0,d:286,l:{286:{g:286,gn:"霞浦县（柏洋乡、北壁乡、崇儒乡、海岛乡）",y:286,s:0,d:0},6280:{g:6280,gn:"霞浦县（水门乡、松港街道、下浒镇）",y:6280,s:0,d:0},6281:{g:6281,gn:"霞浦县（其他）",y:6281,s:0,d:0}}},350922:{g:350922,gn:"古田县",y:289,s:0,d:0},350923:{g:350923,gn:"屏南县",y:6276,s:0,d:6276,l:{6276:{g:6276,gn:"屏南县（长桥镇、黛溪镇、岭下乡、路下乡、寿山乡、熙岭乡）",y:6276,s:0,d:0},6277:{g:6277,gn:"屏南县（其他）",y:6277,s:0,d:0}}},350924:{g:350924,gn:"寿宁县",y:285,s:0,d:285,l:{285:{g:285,gn:"寿宁县（凤阳乡、坑底乡、平溪乡、芹洋乡）",y:285,s:0,d:0},6278:{g:6278,gn:"寿宁县（托溪乡、武曲镇、下党乡）",y:6278,s:0,d:0},6279:{g:6279,gn:"寿宁县（其他）",y:6279,s:0,d:0}}},350925:{g:350925,gn:"周宁县",y:290,s:0,d:290,l:{290:{g:290,gn:"周宁县（浦源镇、狮城镇）",y:290,s:0,d:0},6283:{g:6283,gn:"周宁县（其他）",y:6283,s:0,d:0}}},350926:{g:350926,gn:"柘荣县",y:287,s:0,d:287,l:{287:{g:287,gn:"柘荣县（楮坪乡、富溪镇、黄柏乡、英山乡、宅中乡）",y:287,s:0,d:0},6282:{g:6282,gn:"柘荣县（其他）",y:6282,s:0,d:0}}},350981:{g:350981,gn:"福安市",y:283,s:0,d:283,l:{283:{g:283,gn:"福安市（坂中畲族乡、范坑乡、上白石镇、社口镇、松罗乡）",y:283,s:0,d:0},6270:{g:6270,gn:"福安市（潭头镇、溪潭镇、溪尾镇、晓阳镇）",y:6270,s:0,d:0},6271:{g:6271,gn:"福安市（其他）",y:6271,s:0,d:0}}},350982:{g:350982,gn:"福鼎市",y:284,s:0,d:284,l:{284:{g:284,gn:"福鼎市（磻溪镇、点头镇、叠石乡、福鼎市龙安开发区、管阳镇）",y:284,s:0,d:0},6272:{g:6272,gn:"福鼎市（佳阳乡、山前街道、桐山街道、硖门畲族乡、嵛山镇）",y:6272,s:0,d:0},6273:{g:6273,gn:"福鼎市（其他）",y:6273,s:0,d:0}}}}}}},360000:{g:360000,gn:"江西省",y:1718,s:0,d:360100,l:{360100:{g:360100,gn:"南昌市",y:1719,s:0,d:360102,l:{3331:{g:3331,gn:"高新开发区",y:3331,s:0,d:0},3447:{g:3447,gn:"昌北区",y:3447,s:0,d:0},3538:{g:3538,gn:"红谷滩新区（其他）",y:3538,s:0,d:0},6522:{g:6522,gn:"红谷滩新区（红角洲、凤凰洲）",y:6522,s:0,d:0},6523:{g:6523,gn:"昌北经济开发区（白水湖工业园、志敏大道、双港大道、枫林大道）",y:6523,s:0,d:0},6524:{g:6524,gn:"昌北经济开发区（玉屏大道、庐山中大道、庐山北大道、广兰大道）",y:6524,s:0,d:0},6525:{g:6525,gn:"昌北经济开发区（其他）",y:6525,s:0,d:0},360102:{g:360102,gn:"东湖区",y:1720,s:0,d:0},360103:{g:360103,gn:"西湖区",y:1721,s:0,d:0},360104:{g:360104,gn:"青云谱区",y:1722,s:0,d:0},360105:{g:360105,gn:"湾里区",y:1723,s:0,d:0},360111:{g:360111,gn:"青山湖区",y:1724,s:0,d:0},360121:{g:360121,gn:"南昌县",y:1726,s:0,d:1726,l:{1726:{g:1726,gn:"南昌县（其他）",y:1726,s:0,d:0},6527:{g:6527,gn:"南昌县（莲塘镇、向塘镇）",y:6527,s:0,d:0}}},360122:{g:360122,gn:"新建县",y:1725,s:0,d:1725,l:{1725:{g:1725,gn:"新建县（其他）",y:1725,s:0,d:0},6526:{g:6526,gn:"新建县（长堎镇）",y:6526,s:0,d:0}}},360123:{g:360123,gn:"安义县",y:1728,s:0,d:1728,l:{1728:{g:1728,gn:"安义县（其他）",y:1728,s:0,d:0},6529:{g:6529,gn:"安义县（龙津镇、鼎湖镇）",y:6529,s:0,d:0}}},360124:{g:360124,gn:"进贤县",y:1727,s:0,d:1727,l:{1727:{g:1727,gn:"进贤县（其他）",y:1727,s:0,d:0},6528:{g:6528,gn:"进贤县（民和镇、 李渡镇、温圳镇、文港镇、长山晏乡）",y:6528,s:0,d:0}}}}},360200:{g:360200,gn:"景德镇市",y:1729,s:0,d:360203,l:{360202:{g:360202,gn:"昌江区",y:1731,s:0,d:1731,l:{1731:{g:1731,gn:"昌江区（新陶院（湘湖））",y:1731,s:0,d:0},6534:{g:6534,gn:"昌江区（其他）",y:6534,s:0,d:0}}},360203:{g:360203,gn:"珠山区",y:1730,s:0,d:0},360222:{g:360222,gn:"浮梁县",y:1733,s:0,d:0},360281:{g:360281,gn:"乐平市",y:1732,s:0,d:0}}},360300:{g:360300,gn:"萍乡市",y:1734,s:0,d:360313,l:{360302:{g:360302,gn:"安源区",y:1739,s:0,d:0},360313:{g:360313,gn:"湘东区",y:1735,s:0,d:0},360321:{g:360321,gn:"莲花县",y:1736,s:0,d:0},360322:{g:360322,gn:"上栗县",y:1737,s:0,d:0},360323:{g:360323,gn:"芦溪县",y:1738,s:0,d:0}}},360400:{g:360400,gn:"九江市",y:1743,s:0,d:360403,l:{360402:{g:360402,gn:"庐山区",y:1745,s:0,d:3488,l:{3488:{g:3488,gn:"庐山风景名胜区",y:3488,s:0,d:0}}},360403:{g:360403,gn:"浔阳区",y:1744,s:0,d:0},360421:{g:360421,gn:"九江县",y:1748,s:0,d:0},360423:{g:360423,gn:"武宁县",y:1750,s:0,d:0},360424:{g:360424,gn:"修水县",y:1753,s:0,d:0},360425:{g:360425,gn:"永修县",y:1752,s:0,d:0},360426:{g:360426,gn:"德安县",y:1747,s:0,d:0},360427:{g:360427,gn:"星子县",y:1749,s:0,d:0},360428:{g:360428,gn:"都昌县",y:1755,s:0,d:0},360429:{g:360429,gn:"湖口县",y:1754,s:0,d:0},360430:{g:360430,gn:"彭泽县",y:1751,s:0,d:0},360481:{g:360481,gn:"瑞昌市",y:1746,s:0,d:0},360482:{g:360482,gn:"共青城市",y:3782,s:0,d:0}}},360500:{g:360500,gn:"新余市",y:1740,s:0,d:360502,l:{360502:{g:360502,gn:"渝水区",y:1741,s:0,d:0},360521:{g:360521,gn:"分宜县",y:1742,s:0,d:0}}},360600:{g:360600,gn:"鹰潭市",y:1756,s:0,d:360681,l:{360602:{g:360602,gn:"月湖区",y:1759,s:0,d:0},360622:{g:360622,gn:"余江县",y:1758,s:0,d:0},360681:{g:360681,gn:"贵溪市",y:1757,s:0,d:0}}},360700:{g:360700,gn:"赣州市",y:1811,s:0,d:360702,l:{6533:{g:6533,gn:"黄金经济开发区",y:6533,s:0,d:0},360702:{g:360702,gn:"章贡区",y:1812,s:0,d:0},360721:{g:360721,gn:"赣县",y:1817,s:0,d:0},360722:{g:360722,gn:"信丰县",y:1826,s:0,d:0},360723:{g:360723,gn:"大余县",y:1828,s:0,d:0},360724:{g:360724,gn:"上犹县",y:1822,s:0,d:0},360725:{g:360725,gn:"崇义县",y:1825,s:0,d:0},360726:{g:360726,gn:"安远县",y:1816,s:0,d:0},360727:{g:360727,gn:"龙南县",y:1824,s:0,d:0},360728:{g:360728,gn:"定南县",y:1821,s:0,d:0},360729:{g:360729,gn:"全南县",y:1827,s:0,d:0},360730:{g:360730,gn:"宁都县",y:1818,s:0,d:0},360731:{g:360731,gn:"于都县",y:1823,s:0,d:0},360732:{g:360732,gn:"兴国县",y:1820,s:0,d:0},360733:{g:360733,gn:"会昌县",y:1829,s:0,d:0},360734:{g:360734,gn:"寻乌县",y:1819,s:0,d:0},360735:{g:360735,gn:"石城县",y:1815,s:0,d:0},360781:{g:360781,gn:"瑞金市",y:1813,s:0,d:0},360782:{g:360782,gn:"南康市",y:1814,s:0,d:0}}},360800:{g:360800,gn:"吉安市",y:1796,s:0,d:360802,l:{360802:{g:360802,gn:"吉州区",y:1797,s:0,d:0},360803:{g:360803,gn:"青原区",y:1810,s:0,d:0},360821:{g:360821,gn:"吉安县",y:1799,s:0,d:0},360822:{g:360822,gn:"吉水县",y:1807,s:0,d:0},360823:{g:360823,gn:"峡江县",y:1804,s:0,d:0},360824:{g:360824,gn:"新干县",y:1802,s:0,d:0},360825:{g:360825,gn:"永丰县",y:1800,s:0,d:0},360826:{g:360826,gn:"泰和县",y:1803,s:0,d:0},360827:{g:360827,gn:"遂川县",y:1805,s:0,d:0},360828:{g:360828,gn:"万安县",y:1809,s:0,d:0},360829:{g:360829,gn:"安福县",y:1806,s:0,d:0},360830:{g:360830,gn:"永新县",y:1801,s:0,d:0},360881:{g:360881,gn:"井冈山市",y:1798,s:0,d:0}}},360900:{g:360900,gn:"宜春市",y:1773,s:0,d:360902,l:{360902:{g:360902,gn:"袁州区",y:1774,s:0,d:0},360921:{g:360921,gn:"奉新县",y:1781,s:0,d:0},360922:{g:360922,gn:"万载县",y:1782,s:0,d:0},360923:{g:360923,gn:"上高县",y:1783,s:0,d:0},360924:{g:360924,gn:"宜丰县",y:1780,s:0,d:0},360925:{g:360925,gn:"靖安县",y:1779,s:0,d:0},360926:{g:360926,gn:"铜鼓县",y:1778,s:0,d:0},360981:{g:360981,gn:"丰城市",y:1775,s:0,d:0},360982:{g:360982,gn:"樟树市",y:1776,s:0,d:0},360983:{g:360983,gn:"高安市",y:1777,s:0,d:0}}},361000:{g:361000,gn:"抚州市",y:1784,s:0,d:361002,l:{6530:{g:6530,gn:"金巢开发区",y:6530,s:0,d:0},6531:{g:6531,gn:"抚北工业园区",y:6531,s:0,d:0},6532:{g:6532,gn:"文昌区",y:6532,s:0,d:0},361002:{g:361002,gn:"临川区",y:1785,s:0,d:0},361021:{g:361021,gn:"南城县",y:1789,s:0,d:0},361022:{g:361022,gn:"黎川县",y:1794,s:0,d:0},361023:{g:361023,gn:"南丰县",y:1786,s:0,d:0},361024:{g:361024,gn:"崇仁县",y:1795,s:0,d:0},361025:{g:361025,gn:"乐安县",y:1787,s:0,d:0},361026:{g:361026,gn:"宜黄县",y:1792,s:0,d:0},361027:{g:361027,gn:"金溪县",y:1788,s:0,d:0},361028:{g:361028,gn:"资溪县",y:1791,s:0,d:0},361029:{g:361029,gn:"东乡县",y:1790,s:0,d:0},361030:{g:361030,gn:"广昌县",y:1793,s:0,d:0}}},361100:{g:361100,gn:"上饶市",y:1760,s:0,d:361102,l:{361102:{g:361102,gn:"信州区",y:1761,s:0,d:0},361121:{g:361121,gn:"上饶县",y:1763,s:0,d:0},361122:{g:361122,gn:"广丰县",y:1764,s:0,d:0},361123:{g:361123,gn:"玉山县",y:1771,s:0,d:0},361124:{g:361124,gn:"铅山县",y:1767,s:0,d:0},361125:{g:361125,gn:"横峰县",y:1769,s:0,d:0},361126:{g:361126,gn:"弋阳县",y:1770,s:0,d:0},361127:{g:361127,gn:"余干县",y:1768,s:0,d:0},361128:{g:361128,gn:"鄱阳县",y:1765,s:0,d:0},361129:{g:361129,gn:"万年县",y:1772,s:0,d:0},361130:{g:361130,gn:"婺源县",y:1766,s:0,d:0},361181:{g:361181,gn:"德兴市",y:1762,s:0,d:0}}}}},370000:{g:370000,gn:"山东省",y:2329,s:0,d:370200,l:{370100:{g:370100,gn:"济南市",y:2330,s:1,d:5870,l:{5870:{g:5870,gn:"高新技术开发区（彩石镇）",y:5870,s:0,d:0},5871:{g:5871,gn:"高新技术开发区（其他）",y:5871,s:0,d:0},370102:{g:370102,gn:"历下区",y:2332,s:1,d:2332,l:{2332:{g:2332,gn:"历下区（二环以内）",y:2332,s:1,d:0},5125:{g:5125,gn:"历下区（二环以外）",y:5125,s:0,d:0}}},370103:{g:370103,gn:"市中区",y:5127,s:0,d:5127,l:{5127:{g:5127,gn:"市中区（二环以内）",y:5127,s:0,d:0},5876:{g:5876,gn:"市中区（兴隆街道）",y:5876,s:0,d:0},5877:{g:5877,gn:"市中区（其他）",y:5877,s:0,d:0}}},370104:{g:370104,gn:"槐荫区",y:2334,s:1,d:2334,l:{2334:{g:2334,gn:"槐荫区（二环以内）",y:2334,s:1,d:0},5123:{g:5123,gn:"槐荫区（二环以外）",y:5123,s:0,d:0}}},370105:{g:370105,gn:"天桥区",y:2333,s:1,d:2333,l:{2333:{g:2333,gn:"天桥区（二环以内）",y:2333,s:1,d:0},5878:{g:5878,gn:"天桥区（大桥镇、桑梓店镇）",y:5878,s:0,d:0},5879:{g:5879,gn:"天桥区（其他）",y:5879,s:0,d:0}}},370112:{g:370112,gn:"历城区",y:2335,s:1,d:2335,l:{2335:{g:2335,gn:"历城区（二环以内）",y:2335,s:1,d:0},5874:{g:5874,gn:"历城区（柳埠镇、唐王镇、西营镇、锦绣川乡、高尔乡）",y:5874,s:0,d:0},5875:{g:5875,gn:"历城区（其他）",y:5875,s:0,d:0}}},370113:{g:370113,gn:"长清区",y:5868,s:0,d:5868,l:{5868:{g:5868,gn:"长清区（崮云湖街道、平安镇、文昌街街道）",y:5868,s:0,d:0},5869:{g:5869,gn:"长清区（其他）",y:5869,s:0,d:0}}},370124:{g:370124,gn:"平阴县",y:2338,s:0,d:0},370125:{g:370125,gn:"济阳县",y:5872,s:0,d:5872,l:{5872:{g:5872,gn:"济阳县（崔寨镇、回河镇、济北街道、济阳街道、青宁镇）",y:5872,s:0,d:0},5873:{g:5873,gn:"济阳县（其他）",y:5873,s:0,d:0}}},370126:{g:370126,gn:"商河县",y:2340,s:0,d:0},370181:{g:370181,gn:"章丘市",y:5880,s:0,d:5880,l:{5880:{g:5880,gn:"章丘市（埠村街道、刁镇、官庄镇、龙山街道、明水街道）",y:5880,s:0,d:0},5881:{g:5881,gn:"章丘市（普集镇、圣井街道、双山街道、相公庄镇、绣惠镇、枣园街道）",y:5881,s:0,d:0},5882:{g:5882,gn:"章丘市（其他）",y:5882,s:0,d:0}}}}},370200:{g:370200,gn:"青岛市",y:2341,s:1,d:370202,l:{3530:{g:3530,gn:"经济开发区",y:3530,s:0,d:0},370202:{g:370202,gn:"市南区",y:2342,s:1,d:0},370203:{g:370203,gn:"市北区",y:2343,s:1,d:0},370205:{g:370205,gn:"四方区",y:2345,s:1,d:0},370211:{g:370211,gn:"黄岛区",y:5884,s:0,d:5884,l:{5884:{g:5884,gn:"黄岛区（黄岛街道、辛安街道、薛家岛街道、灵珠山街道、长江路街道）",y:5884,s:0,d:0},5885:{g:5885,gn:"黄岛区（红石崖街道、珠山街道、珠海街道、隐珠街道、灵山卫街道）",y:5885,s:0,d:0},5886:{g:5886,gn:"黄岛区（滨海街道、柳花泊街道）",y:5886,s:0,d:0},5887:{g:5887,gn:"黄岛区（其他）",y:5887,s:0,d:0}}},370212:{g:370212,gn:"崂山区",y:5142,s:0,d:5142,l:{5142:{g:5142,gn:"崂山区（海尔路以西，株洲路-松岭路-海大路-张村河-九水东路以北）",y:5142,s:0,d:0},5143:{g:5143,gn:"崂山区（海尔路以东，株洲路-松岭路-海大路-张村河-九水东路以南）",y:5143,s:0,d:0}}},370213:{g:370213,gn:"李沧区",y:5144,s:0,d:5144,l:{5144:{g:5144,gn:"李沧区（沧安路-兴华路-永平路-邢台路-文昌路-金水路以南）",y:5144,s:0,d:0},5145:{g:5145,gn:"李沧区（沧安路-兴华路-永平路-邢台路-文昌路-金水路以北）",y:5145,s:0,d:0}}},370214:{g:370214,gn:"城阳区",y:6880,s:0,d:6880,l:{6880:{g:6880,gn:"城阳区（城阳街道、流亭街道）",y:6880,s:0,d:0},6881:{g:6881,gn:"城阳区（其他）",y:6881,s:0,d:0}}},370281:{g:370281,gn:"胶州市",y:5894,s:0,d:5894,l:{5894:{g:5894,gn:"胶州市（里岔镇、洋河镇）",y:5894,s:0,d:0},5895:{g:5895,gn:"胶州市（其他）",y:5895,s:0,d:0}}},370282:{g:370282,gn:"即墨市",y:5888,s:0,d:5888,l:{5888:{g:5888,gn:"即墨市（岙山镇、大官庄镇、店集镇、丰城镇、金口镇）",y:5888,s:0,d:0},5889:{g:5889,gn:"即墨市（刘家庄镇、七级镇、田横镇、王村镇、温泉镇、移风店镇）",y:5889,s:0,d:0},5890:{g:5890,gn:"即墨市（其他）",y:5890,s:0,d:0}}},370283:{g:370283,gn:"平度市",y:5907,s:0,d:5907,l:{5907:{g:5907,gn:"平度市（长乐镇、城关街道、店子镇、灰埠镇、李园街道）",y:5907,s:0,d:0},5908:{g:5908,gn:"平度市（南村镇、平度外向型工业加工区、同和街道、香店街道、新河镇）",y:5908,s:0,d:0},5909:{g:5909,gn:"平度市（其他）",y:5909,s:0,d:0}}},370284:{g:370284,gn:"胶南市",y:5891,s:0,d:5891,l:{5891:{g:5891,gn:"胶南市(滨海街道、大珠山镇、灵山卫街道、铁山街道、黄山镇、王台镇)",y:5891,s:0,d:0},5892:{g:5892,gn:"胶南市(王台镇、隐珠街道、珠海街道、珠山街道)",y:5892,s:0,d:0},5893:{g:5893,gn:"胶南市(其他)",y:5893,s:0,d:0}}},370285:{g:370285,gn:"莱西市",y:5896,s:0,d:5896,l:{5896:{g:5896,gn:"莱西市(店埠镇、河头店镇、马连庄镇、南墅镇、日庄镇)",y:5896,s:0,d:0},5898:{g:5898,gn:"莱西市(孙受镇、武备镇、夏格庄镇、院上镇)",y:5898,s:0,d:0},5900:{g:5900,gn:"莱西市(其他)",y:5900,s:0,d:0}}}}},370300:{g:370300,gn:"淄博市",y:2354,s:1,d:370302,l:{370302:{g:370302,gn:"淄川区",y:6171,s:0,d:6171,l:{6171:{g:6171,gn:"淄川区（磁村镇、东坪镇、峨庄乡、黑旺镇、岭子镇）",y:6171,s:0,d:0},6172:{g:6172,gn:"淄川区（太河乡、西河镇、寨里镇、张庄乡、淄河镇）",y:6172,s:0,d:0},6173:{g:6173,gn:"淄川区（其他）",y:6173,s:0,d:0}}},370303:{g:370303,gn:"张店区",y:6169,s:0,d:6169,l:{6169:{g:6169,gn:"张店区（中埠镇）",y:6169,s:0,d:0},6170:{g:6170,gn:"张店区（其他）",y:6170,s:0,d:0}}},370304:{g:370304,gn:"博山区",y:6161,s:0,d:6161,l:{6161:{g:6161,gn:"博山区（源泉镇、北博山镇、博山镇、池上镇、南博山镇、石门乡）",y:6161,s:0,d:0},6162:{g:6162,gn:"博山区（其他）",y:6162,s:0,d:0}}},370305:{g:370305,gn:"临淄区",y:6165,s:0,d:6165,l:{6165:{g:6165,gn:"临淄区（边河镇、皇城镇、原北羊镇）",y:6165,s:0,d:0},6166:{g:6166,gn:"临淄区（其他）",y:6166,s:0,d:0}}},370306:{g:370306,gn:"周村区",y:2359,s:1,d:0},370321:{g:370321,gn:"桓台县",y:2360,s:1,d:0},370322:{g:370322,gn:"高青县",y:6163,s:0,d:6163,l:{6163:{g:6163,gn:"高青县（高城镇、芦湖街道、田镇街道）",y:6163,s:0,d:0},6164:{g:6164,gn:"高青县（其他）",y:6164,s:0,d:0}}},370323:{g:370323,gn:"沂源县",y:6167,s:0,d:6167,l:{6167:{g:6167,gn:"沂源县（沂源经济开发区）",y:6167,s:0,d:0},6168:{g:6168,gn:"沂源县（其他）",y:6168,s:0,d:0}}}}},370400:{g:370400,gn:"枣庄市",y:2363,s:1,d:370402,l:{6419:{g:6419,gn:"高新区",y:6419,s:0,d:0},370402:{g:370402,gn:"市中区",y:2364,s:1,d:2364,l:{2364:{g:2364,gn:"市中区（孟庄镇）",y:2364,s:1,d:0},6420:{g:6420,gn:"市中区（其他）",y:6420,s:0,d:0}}},370403:{g:370403,gn:"薛城区",y:2368,s:1,d:2368,l:{2368:{g:2368,gn:"薛城区（临城街道、临山街道）",y:2368,s:1,d:0},6423:{g:6423,gn:"薛城区（其他）",y:6423,s:0,d:0}}},370404:{g:370404,gn:"峄城区",y:2366,s:1,d:2366,l:{2366:{g:2366,gn:"峄城区（坛山街道、吴林街道）",y:2366,s:1,d:0},6424:{g:6424,gn:"峄城区（其他）",y:6424,s:0,d:0}}},370405:{g:370405,gn:"台儿庄区",y:2367,s:1,d:2367,l:{2367:{g:2367,gn:"台儿庄区（运河街道）",y:2367,s:1,d:0},6421:{g:6421,gn:"台儿庄区（其他）",y:6421,s:0,d:0}}},370406:{g:370406,gn:"山亭区",y:2365,s:1,d:0},370481:{g:370481,gn:"滕州市",y:2369,s:0,d:2369,l:{2369:{g:2369,gn:"滕州市（北辛街道、荆河街道、龙泉街道、南沙河镇、善南街道）",y:2369,s:0,d:0},6422:{g:6422,gn:"滕州市（其他）",y:6422,s:0,d:0}}}}},370500:{g:370500,gn:"东营市",y:2370,s:1,d:370502,l:{370502:{g:370502,gn:"东营区",y:2371,s:1,d:2371,l:{2371:{g:2371,gn:"东营区（其他）",y:2371,s:1,d:0},6406:{g:6406,gn:"东营区（六户镇、龙居镇、牛庄镇、史口镇）",y:6406,s:0,d:0}}},370503:{g:370503,gn:"河口区",y:2372,s:1,d:2372,l:{2372:{g:2372,gn:"河口区（其他）",y:2372,s:1,d:0},6408:{g:6408,gn:"河口区（河口经济技术开发区）",y:6408,s:0,d:0}}},370521:{g:370521,gn:"垦利县",y:2373,s:0,d:2373,l:{2373:{g:2373,gn:"垦利县（其他）",y:2373,s:0,d:0},6409:{g:6409,gn:"垦利县（郝家镇、垦利街道）",y:6409,s:0,d:0}}},370522:{g:370522,gn:"利津县",y:2375,s:0,d:0},370523:{g:370523,gn:"广饶县",y:2374,s:0,d:2374,l:{2374:{g:2374,gn:"广饶县（其他）",y:2374,s:0,d:0},6407:{g:6407,gn:"广饶县（陈官乡、大码头镇、丁庄镇、花官镇）",y:6407,s:0,d:0}}}}},370600:{g:370600,gn:"烟台市",y:2389,s:1,d:370602,l:{6351:{g:6351,gn:"经济技术开发区",y:6351,s:0,d:0},370602:{g:370602,gn:"芝罘区",y:2390,s:1,d:2390,l:{2390:{g:2390,gn:"芝罘区（崆峒岛）",y:2390,s:1,d:0},6363:{g:6363,gn:"芝罘区（其他）",y:6363,s:0,d:0}}},370611:{g:370611,gn:"福山区",y:2391,s:1,d:2391,l:{2391:{g:2391,gn:"福山区（臧家镇）",y:2391,s:1,d:0},6348:{g:6348,gn:"福山区（其他）",y:6348,s:0,d:0}}},370612:{g:370612,gn:"牟平区",y:2392,s:1,d:2392,l:{2392:{g:2392,gn:"牟平区（鱼鸟河街道、大窑街道、宁海街道、文化街道、武宁街道、牟平经济开发区、）",y:2392,s:1,d:0},6358:{g:6358,gn:"牟平区（其他）",y:6358,s:0,d:0}}},370613:{g:370613,gn:"莱山区",y:2393,s:1,d:2393,l:{2393:{g:2393,gn:"莱山区（黄海路街道、初家街道、滨海路街道、解甲庄镇、莱山镇、马山镇）",y:2393,s:1,d:0},6352:{g:6352,gn:"莱山区（其他）",y:6352,s:0,d:0}}},370634:{g:370634,gn:"长岛县",y:2401,s:0,d:2401,l:{2401:{g:2401,gn:"长岛县(南长山街道)",y:2401,s:0,d:0},6364:{g:6364,gn:"长岛县(其他)",y:6364,s:0,d:0}}},370681:{g:370681,gn:"龙口市",y:2394,s:0,d:2394,l:{2394:{g:2394,gn:"龙口市（城关镇、黄山馆镇、七甲镇、石良镇、下丁家镇）",y:2394,s:0,d:0},6357:{g:6357,gn:"龙口市（其他）",y:6357,s:0,d:0}}},370682:{g:370682,gn:"莱阳市",y:2395,s:0,d:2395,l:{2395:{g:2395,gn:"莱阳市（柏林庄镇、城厢街道、冯格庄街道、古柳街道、莱阳经济开发区）",y:2395,s:0,d:0},6353:{g:6353,gn:"莱阳市（龙旺庄街道、外向型工业园、照旺庄镇）",y:6353,s:0,d:0},6354:{g:6354,gn:"莱阳市（其他）",y:6354,s:0,d:0}}},370683:{g:370683,gn:"莱州市",y:2396,s:0,d:2396,l:{2396:{g:2396,gn:"莱州市（城港路街道、程郭镇、虎头崖镇、沙河镇、文昌路街道）",y:2396,s:0,d:0},6355:{g:6355,gn:"莱州市（文峰路街道、永安路街道、路旺镇、莱州镇、大原镇、南十里镇）",y:6355,s:0,d:0},6356:{g:6356,gn:"莱州市（其他）",y:6356,s:0,d:0}}},370684:{g:370684,gn:"蓬莱市",y:2398,s:0,d:2398,l:{2398:{g:2398,gn:"蓬莱市（北沟镇、登州街道、刘家沟镇、蓬莱阁街道、新港街道）",y:2398,s:0,d:0},6359:{g:6359,gn:"蓬莱市（紫荆山街道、经济开发区）",y:6359,s:0,d:0},6360:{g:6360,gn:"蓬莱市（其他）",y:6360,s:0,d:0}}},370685:{g:370685,gn:"招远市",y:2397,s:0,d:2397,l:{2397:{g:2397,gn:"招远市（经济技术开发区、罗峰街道、梦芝街道、泉山街道、温泉街道）",y:2397,s:0,d:0},6362:{g:6362,gn:"招远市（其他）",y:6362,s:0,d:0}}},370686:{g:370686,gn:"栖霞市",y:2399,s:0,d:2399,l:{2399:{g:2399,gn:"栖霞市（翠屏街道、松山街道、桃村镇、庄园街道）",y:2399,s:0,d:0},6361:{g:6361,gn:"栖霞市（其他）",y:6361,s:0,d:0}}},370687:{g:370687,gn:"海阳市",y:2400,s:0,d:2400,l:{2400:{g:2400,gn:"海阳市（碧城街道、东村街道、方圆街道、凤城街道、海阳城区）",y:2400,s:0,d:0},6349:{g:6349,gn:"海阳市（海阳工业园、海阳开发区、留格庄镇、辛安镇、）",y:6349,s:0,d:0},6350:{g:6350,gn:"海阳市（其他）",y:6350,s:0,d:0}}}}},370700:{g:370700,gn:"潍坊市",y:2376,s:1,d:370702,l:{6218:{g:6218,gn:"高新技术产业开发区",y:6218,s:0,d:0},6219:{g:6219,gn:"高新技术开发区",y:6219,s:0,d:0},6221:{g:6221,gn:"经济技术开发区",y:6221,s:0,d:0},370702:{g:370702,gn:"潍城区",y:2377,s:1,d:2377,l:{2377:{g:2377,gn:"潍城区（大柳树镇、浮烟山、符山镇、望留街道、望留镇）",y:2377,s:1,d:0},6226:{g:6226,gn:"潍城区（其他）",y:6226,s:0,d:0}}},370703:{g:370703,gn:"寒亭区",y:2378,s:1,d:2378,l:{2378:{g:2378,gn:"寒亭区（寒亭街道、开元街道、朱里镇）",y:2378,s:1,d:0},6220:{g:6220,gn:"寒亭区（其他）",y:6220,s:0,d:0}}},370704:{g:370704,gn:"坊子区",y:2379,s:1,d:2379,l:{2379:{g:2379,gn:"坊子区（坊城街道、清池街道办、坊子新区、眉村镇）",y:2379,s:1,d:0},6215:{g:6215,gn:"坊子区（其他）",y:6215,s:0,d:0}}},370705:{g:370705,gn:"奎文区",y:2380,s:1,d:2380,l:{2380:{g:2380,gn:"奎文区（南苑街道）",y:2380,s:1,d:0},6230:{g:6230,gn:"奎文区（其他）",y:6230,s:0,d:0}}},370724:{g:370724,gn:"临朐县",y:2388,s:0,d:2388,l:{2388:{g:2388,gn:"临朐县（九山镇、柳山镇、寺头镇、沂山镇）",y:2388,s:0,d:0},6222:{g:6222,gn:"临朐县（其他）",y:6222,s:0,d:0}}},370725:{g:370725,gn:"昌乐县",y:2387,s:0,d:2387,l:{2387:{g:2387,gn:"昌乐县（红河镇、尧沟镇、营丘镇）",y:2387,s:0,d:0},6212:{g:6212,gn:"昌乐县（其他）",y:6212,s:0,d:0}}},370781:{g:370781,gn:"青州市",y:2381,s:0,d:2381,l:{2381:{g:2381,gn:"青州市（坡子工业园、双宝工业园、闫刘工业园、益都镇、云门山街道）",y:2381,s:0,d:0},6223:{g:6223,gn:"青州市（其他）",y:6223,s:0,d:0}}},370782:{g:370782,gn:"诸城市",y:2382,s:0,d:2382,l:{2382:{g:2382,gn:"诸城市（昌城镇、箭口镇、经济技术开发区、九台镇、龙都街道）",y:2382,s:0,d:0},6227:{g:6227,gn:"诸城市（吕标镇、密州街道、舜王街道、相州镇、辛兴镇、朱解镇）",y:6227,s:0,d:0},6228:{g:6228,gn:"诸城市（其他）",y:6228,s:0,d:0}}},370783:{g:370783,gn:"寿光市",y:2383,s:0,d:2383,l:{2383:{g:2383,gn:"寿光市（稻田镇、古城街道、）",y:2383,s:0,d:0},6224:{g:6224,gn:"寿光市（上口镇、圣城街道、孙家集街道、台头镇、文家街道、大家洼街道、岔河乡）",y:6224,s:0,d:0},6225:{g:6225,gn:"寿光市（其他）",y:6225,s:0,d:0},6229:{g:6229,gn:"寿光市（文家街道、大家洼街道、岔河乡）",y:6229,s:0,d:0}}},370784:{g:370784,gn:"安丘市",y:2384,s:0,d:2384,l:{2384:{g:2384,gn:"安丘市（安丘城区、关王镇、经济技术开发区、景芝镇、刘家尧镇）",y:2384,s:0,d:0},6210:{g:6210,gn:"安丘市（新安街道、兴安街道、崖头工业园区）",y:6210,s:0,d:0},6211:{g:6211,gn:"安丘市（其他）",y:6211,s:0,d:0}}},370785:{g:370785,gn:"高密市",y:2385,s:0,d:2385,l:{2385:{g:2385,gn:"高密市（柏城镇、城关街道、姜庄镇、经济技术开发区、醴泉街道）",y:2385,s:0,d:0},6216:{g:6216,gn:"高密市（密水街道、仁和镇、夏庄镇、姚哥庄镇、张鲁镇）",y:6216,s:0,d:0},6217:{g:6217,gn:"高密市（其他）",y:6217,s:0,d:0}}},370786:{g:370786,gn:"昌邑市",y:2386,s:0,d:2386,l:{2386:{g:2386,gn:"昌邑市（都昌街道、奎聚街道、柳疃镇、围子镇、饮马镇）",y:2386,s:0,d:0},6213:{g:6213,gn:"昌邑市（仓街镇、宋庄镇、双台镇）",y:6213,s:0,d:0},6214:{g:6214,gn:"昌邑市（其他）",y:6214,s:0,d:0}}}}},370800:{g:370800,gn:"济宁市",y:2408,s:1,d:370802,l:{370802:{g:370802,gn:"市中区",y:2409,s:1,d:2409,l:{2409:{g:2409,gn:"市中区（阜桥街道、古槐街道、观音阁街道、济阳街道、南苑街道、越河街道）",y:2409,s:1,d:0},6722:{g:6722,gn:"市中区（其他）",y:6722,s:0,d:0}}},370811:{g:370811,gn:"任城区",y:2410,s:1,d:2410,l:{2410:{g:2410,gn:"任城区（高新技术产业开发区、洸河街道、金城街道、任城经济开发区、仙营街道）",y:2410,s:1,d:0},6721:{g:6721,gn:"任城区（其他）",y:6721,s:0,d:0}}},370826:{g:370826,gn:"微山县",y:2417,s:0,d:0},370827:{g:370827,gn:"鱼台县",y:2414,s:0,d:0},370828:{g:370828,gn:"金乡县",y:2415,s:0,d:0},370829:{g:370829,gn:"嘉祥县",y:2416,s:0,d:2416,l:{2416:{g:2416,gn:"嘉祥县（嘉祥镇、县城）",y:2416,s:0,d:0},6718:{g:6718,gn:"嘉祥县（其他）",y:6718,s:0,d:0}}},370830:{g:370830,gn:"汶上县",y:2418,s:0,d:2418,l:{2418:{g:2418,gn:"汶上县（汶上县城）",y:2418,s:0,d:0},6723:{g:6723,gn:"汶上县（其他）",y:6723,s:0,d:0}}},370831:{g:370831,gn:"泗水县",y:2419,s:0,d:0},370832:{g:370832,gn:"梁山县",y:2420,s:0,d:2420,l:{2420:{g:2420,gn:"梁山县（梁山县城）",y:2420,s:0,d:0},6719:{g:6719,gn:"梁山县（其他）",y:6719,s:0,d:0}}},370881:{g:370881,gn:"曲阜市",y:2411,s:0,d:2411,l:{2411:{g:2411,gn:"曲阜市（鲁城街道）",y:2411,s:0,d:0},6720:{g:6720,gn:"曲阜市（其他）",y:6720,s:0,d:0}}},370882:{g:370882,gn:"兖州市",y:2412,s:0,d:2412,l:{2412:{g:2412,gn:"兖州市（鼓楼街道、酒仙桥街道、龙桥街道）",y:2412,s:0,d:0},6724:{g:6724,gn:"兖州市（其他）",y:6724,s:0,d:0}}},370883:{g:370883,gn:"邹城市",y:2413,s:0,d:2413,l:{2413:{g:2413,gn:"邹城市（凫山街道、钢山街道、千泉街道）",y:2413,s:0,d:0},6725:{g:6725,gn:"邹城市（其他）",y:6725,s:0,d:0}}}}},370900:{g:370900,gn:"泰安市",y:2421,s:1,d:370902,l:{370902:{g:370902,gn:"泰山区",y:2422,s:1,d:2422,l:{2422:{g:2422,gn:"泰山区（大津口乡、邱家店镇）",y:2422,s:1,d:0},6740:{g:6740,gn:"泰山区（其他）",y:6740,s:0,d:0}}},370911:{g:370911,gn:"岱岳区",y:2423,s:0,d:2423,l:{2423:{g:2423,gn:"岱岳区（粥店、北集坡、满庄镇、山口镇、省庄镇、天平街道）",y:2423,s:0,d:0},6738:{g:6738,gn:"岱岳区（其他）",y:6738,s:0,d:0}}},370921:{g:370921,gn:"宁阳县",y:2426,s:0,d:0},370923:{g:370923,gn:"东平县",y:2427,s:0,d:0},370982:{g:370982,gn:"新泰市",y:2424,s:0,d:2424,l:{2424:{g:2424,gn:"新泰市（青云街道、新汶）",y:2424,s:0,d:0},6741:{g:6741,gn:"新泰市（其他）",y:6741,s:0,d:0}}},370983:{g:370983,gn:"肥城市",y:2425,s:0,d:2425,l:{2425:{g:2425,gn:"肥城市（老城街道、王瓜店街道、新城街道、仪阳乡）",y:2425,s:0,d:0},6739:{g:6739,gn:"肥城市（其他）",y:6739,s:0,d:0}}}}},371000:{g:371000,gn:"威海市",y:2403,s:0,d:6176,l:{6176:{g:6176,gn:"经济技术开发区（靖子村码头、桥头镇、远遥码头）",y:6176,s:0,d:0},6177:{g:6177,gn:"经济技术开发区（其他）",y:6177,s:0,d:0},371002:{g:371002,gn:"环翠区",y:6174,s:0,d:6174,l:{6174:{g:6174,gn:"环翠区（刘公岛、桥头镇）",y:6174,s:0,d:0},6175:{g:6175,gn:"环翠区（其他）",y:6175,s:0,d:0}}},371081:{g:371081,gn:"文登市",y:6183,s:0,d:6183,l:{6183:{g:6183,gn:"文登市（龙山路街道、天福路街道、环山路街道、文登营镇、米山镇）",y:6183,s:0,d:0},6184:{g:6184,gn:"文登市（苘山镇、文登经济开发区、北郊镇、南海新区工业园区、）",y:6184,s:0,d:0},6185:{g:6185,gn:"文登市（其他）",y:6185,s:0,d:0}}},371082:{g:371082,gn:"荣成市",y:6178,s:0,d:6178,l:{6178:{g:6178,gn:"荣成市（东山街道、港湾街道、虎山镇、俚岛镇、上庄镇）",y:6178,s:0,d:0},6179:{g:6179,gn:"荣成市（石岛镇、滕家镇、王连街道、崖头街道、崖头镇）",y:6179,s:0,d:0},6180:{g:6180,gn:"荣成市（其他）",y:6180,s:0,d:0}}},371083:{g:371083,gn:"乳山市",y:6181,s:0,d:6181,l:{6181:{g:6181,gn:"乳山市（白沙滩镇、城区街道、海阳所镇、乳山口镇、夏村镇）",y:6181,s:0,d:0},6182:{g:6182,gn:"乳山市（其他）",y:6182,s:0,d:0}}}}},371100:{g:371100,gn:"日照市",y:2428,s:1,d:371102,l:{3566:{g:3566,gn:"高科园",y:3566,s:0,d:0},371102:{g:371102,gn:"东港区",y:2429,s:1,d:2429,l:{2429:{g:2429,gn:"东港区（北京路街道、奎山街道、秦楼街道、日照街道、石臼街道）",y:2429,s:1,d:0},6763:{g:6763,gn:"东港区（其他）",y:6763,s:0,d:0}}},371103:{g:371103,gn:"岚山区",y:3335,s:1,d:3335,l:{3335:{g:3335,gn:"岚山区（安东卫街道）",y:3335,s:1,d:0},6765:{g:6765,gn:"岚山区（其他）",y:6765,s:0,d:0}}},371121:{g:371121,gn:"五莲县",y:2430,s:0,d:2430,l:{2430:{g:2430,gn:"五莲县（洪凝镇）",y:2430,s:0,d:0},6766:{g:6766,gn:"五莲县（其他）",y:6766,s:0,d:0}}},371122:{g:371122,gn:"莒县",y:2431,s:0,d:2431,l:{2431:{g:2431,gn:"莒县（县城）",y:2431,s:0,d:0},6764:{g:6764,gn:"莒县（其他）",y:6764,s:0,d:0}}}}},371200:{g:371200,gn:"莱芜市",y:2434,s:1,d:371202,l:{371202:{g:371202,gn:"莱城区",y:2435,s:1,d:2435,l:{2435:{g:2435,gn:"莱城区（其他）",y:2435,s:1,d:0},6727:{g:6727,gn:"莱城区（凤城街道、鹏泉街道、张家洼街道）",y:6727,s:0,d:0}}},371203:{g:371203,gn:"钢城区",y:2436,s:1,d:2436,l:{2436:{g:2436,gn:"钢城区（其他）",y:2436,s:1,d:0},6726:{g:6726,gn:"钢城区（艾山街道）",y:6726,s:0,d:0}}}}},371300:{g:371300,gn:"临沂市",y:2457,s:1,d:371302,l:{371302:{g:371302,gn:"兰山区",y:2458,s:1,d:2458,l:{2458:{g:2458,gn:"兰山区（方城镇、汪沟镇、新桥镇）",y:2458,s:1,d:0},6756:{g:6756,gn:"兰山区（其他）",y:6756,s:0,d:0}}},371311:{g:371311,gn:"罗庄区",y:2459,s:1,d:2459,l:{2459:{g:2459,gn:"罗庄区（褚墩镇、黄山镇、沂堂镇）",y:2459,s:1,d:0},6758:{g:6758,gn:"罗庄区（其他）",y:6758,s:0,d:0}}},371312:{g:371312,gn:"河东区",y:2460,s:1,d:2460,l:{2460:{g:2460,gn:"河东区（八湖镇、葛沟镇、刘店子乡、太平镇、汤头镇、郑旺镇）",y:2460,s:1,d:0},6754:{g:6754,gn:"河东区（其他）",y:6754,s:0,d:0}}},371321:{g:371321,gn:"沂南县",y:2461,s:0,d:2461,l:{2461:{g:2461,gn:"沂南县（大庄镇、界湖街道、铜井镇）",y:2461,s:0,d:0},6761:{g:6761,gn:"沂南县（其他）",y:6761,s:0,d:0}}},371322:{g:371322,gn:"郯城县",y:2462,s:0,d:0},371323:{g:371323,gn:"沂水县",y:2463,s:0,d:2463,l:{2463:{g:2463,gn:"沂水县（龙家圈镇、许家湖镇、沂城街道）",y:2463,s:0,d:0},6762:{g:6762,gn:"沂水县（其他）",y:6762,s:0,d:0}}},371324:{g:371324,gn:"苍山县",y:2464,s:0,d:0},371325:{g:371325,gn:"费县",y:2465,s:0,d:2465,l:{2465:{g:2465,gn:"费县（费城镇）",y:2465,s:0,d:0},6753:{g:6753,gn:"费县（其他）",y:6753,s:0,d:0}}},371326:{g:371326,gn:"平邑县",y:2466,s:0,d:2466,l:{2466:{g:2466,gn:"平邑县（其他）",y:2466,s:0,d:0},6760:{g:6760,gn:"平邑县（县城）",y:6760,s:0,d:0}}},371327:{g:371327,gn:"莒南县",y:2467,s:0,d:2467,l:{2467:{g:2467,gn:"莒南县（县城、莒南经济开发区）",y:2467,s:0,d:0},6755:{g:6755,gn:"莒南县（其他）",y:6755,s:0,d:0}}},371328:{g:371328,gn:"蒙阴县",y:2468,s:0,d:2468,l:{2468:{g:2468,gn:"蒙阴县（蒙阴街道）",y:2468,s:0,d:0},6759:{g:6759,gn:"蒙阴县（其他）",y:6759,s:0,d:0}}},371329:{g:371329,gn:"临沭县",y:2469,s:0,d:2469,l:{2469:{g:2469,gn:"临沭县（白旄镇、临沭街道、青云镇、郑山街道）",y:2469,s:0,d:0},6757:{g:6757,gn:"临沭县（其他）",y:6757,s:0,d:0}}}}},371400:{g:371400,gn:"德州市",y:2437,s:1,d:371402,l:{371402:{g:371402,gn:"德城区",y:2438,s:1,d:2438,l:{2438:{g:2438,gn:"德城区（黄河崖镇、赵虎镇）",y:2438,s:1,d:0},6728:{g:6728,gn:"德城区（其他）",y:6728,s:0,d:0}}},371421:{g:371421,gn:"陵县",y:2441,s:0,d:2441,l:{2441:{g:2441,gn:"陵县（安德街道、临齐街道、陵县经济开发区）",y:2441,s:0,d:0},6731:{g:6731,gn:"陵县（其他）",y:6731,s:0,d:0}}},371422:{g:371422,gn:"宁津县",y:2442,s:0,d:2442,l:{2442:{g:2442,gn:"宁津县（津城街道、宁城街道）",y:2442,s:0,d:0},6732:{g:6732,gn:"宁津县（其他）",y:6732,s:0,d:0}}},371423:{g:371423,gn:"庆云县",y:2445,s:0,d:0},371424:{g:371424,gn:"临邑县",y:2448,s:0,d:2448,l:{2448:{g:2448,gn:"临邑县（恒源街道、临邑镇、邢侗街道）",y:2448,s:0,d:0},6730:{g:6730,gn:"临邑县（其他）",y:6730,s:0,d:0}}},371425:{g:371425,gn:"齐河县",y:2443,s:0,d:2443,l:{2443:{g:2443,gn:"齐河县（晏城镇）",y:2443,s:0,d:0},6734:{g:6734,gn:"齐河县（其他）",y:6734,s:0,d:0}}},371426:{g:371426,gn:"平原县",y:2446,s:0,d:2446,l:{2446:{g:2446,gn:"平原县（龙门街道、桃园街道）",y:2446,s:0,d:0},6733:{g:6733,gn:"平原县（其他）",y:6733,s:0,d:0}}},371427:{g:371427,gn:"夏津县",y:2447,s:0,d:2447,l:{2447:{g:2447,gn:"夏津县（北城街道、宋楼镇、银城街道）",y:2447,s:0,d:0},6736:{g:6736,gn:"夏津县（其他）",y:6736,s:0,d:0}}},371428:{g:371428,gn:"武城县",y:2444,s:0,d:2444,l:{2444:{g:2444,gn:"武城县（新城镇）",y:2444,s:0,d:0},6735:{g:6735,gn:"武城县（其他）",y:6735,s:0,d:0}}},371481:{g:371481,gn:"乐陵市",y:2439,s:0,d:2439,l:{2439:{g:2439,gn:"乐陵市（市中街道、云红街道）",y:2439,s:0,d:0},6729:{g:6729,gn:"乐陵市（其他）",y:6729,s:0,d:0}}},371482:{g:371482,gn:"禹城市",y:2440,s:0,d:2440,l:{2440:{g:2440,gn:"禹城市（市中街道）",y:2440,s:0,d:0},6737:{g:6737,gn:"禹城市（其他）",y:6737,s:0,d:0}}}}},371500:{g:371500,gn:"聊城市",y:2481,s:1,d:371502,l:{3510:{g:3510,gn:"聊城经济技术开发区（北城街道、顾官屯镇）",y:3510,s:0,d:0},6747:{g:6747,gn:"聊城经济技术开发区（其他）",y:6747,s:0,d:0},371502:{g:371502,gn:"东昌府区",y:2482,s:1,d:2482,l:{2482:{g:2482,gn:"东昌府区（斗虎屯镇、侯营镇、梁水镇、沙镇镇、堂邑镇）",y:2482,s:1,d:0},6744:{g:6744,gn:"东昌府区（许营镇、于集镇、张炉集镇、朱老庄镇）",y:6744,s:0,d:0},6745:{g:6745,gn:"东昌府区（其他）",y:6745,s:0,d:0}}},371521:{g:371521,gn:"阳谷县",y:2485,s:0,d:2485,l:{2485:{g:2485,gn:"阳谷县（博济桥街道、侨润街道、狮子楼街道、石佛镇、闫楼镇）",y:2485,s:0,d:0},6749:{g:6749,gn:"阳谷县（其他）",y:6749,s:0,d:0}}},371522:{g:371522,gn:"莘县",y:2487,s:0,d:0},371523:{g:371523,gn:"茌平县",y:2486,s:0,d:2486,l:{2486:{g:2486,gn:"茌平县（博平镇、胡屯镇、温陈街道、信发街道、振兴街道）",y:2486,s:0,d:0},6742:{g:6742,gn:"茌平县（其他）",y:6742,s:0,d:0}}},371524:{g:371524,gn:"东阿县",y:2488,s:0,d:2488,l:{2488:{g:2488,gn:"东阿县（大桥镇、铜城街道、新城街道）",y:2488,s:0,d:0},6743:{g:6743,gn:"东阿县（其他）",y:6743,s:0,d:0}}},371525:{g:371525,gn:"冠县",y:2489,s:0,d:0},371526:{g:371526,gn:"高唐县",y:2484,s:0,d:2484,l:{2484:{g:2484,gn:"高唐县（汇鑫街道、人和街道、鱼邱湖街道）",y:2484,s:0,d:0},6746:{g:6746,gn:"高唐县（其他）",y:6746,s:0,d:0}}},371581:{g:371581,gn:"临清市",y:2483,s:0,d:2483,l:{2483:{g:2483,gn:"临清市（大辛庄街道、青年路街道、先锋路街道、新华路街道、烟店镇）",y:2483,s:0,d:0},6748:{g:6748,gn:"临清市（其他）",y:6748,s:0,d:0}}}}},371600:{g:371600,gn:"滨州市",y:2449,s:1,d:6389,l:{6389:{g:6389,gn:"滨州高新区",y:6389,s:0,d:0},6390:{g:6390,gn:"滨州经济开发区（里则街道）",y:6390,s:0,d:0},6391:{g:6391,gn:"滨州经济开发区（杜店街道、沙河街道）",y:6391,s:0,d:0},371602:{g:371602,gn:"滨城区",y:3508,s:1,d:3508,l:{3508:{g:3508,gn:"滨城区（其他）",y:3508,s:1,d:0},6388:{g:6388,gn:"滨城区（秦皇台乡、三河湖镇、尚集乡）",y:6388,s:0,d:0}}},371621:{g:371621,gn:"惠民县",y:2453,s:0,d:2453,l:{2453:{g:2453,gn:"惠民县（其他）",y:2453,s:0,d:0},6393:{g:6393,gn:"惠民县（李庄绳网基地）",y:6393,s:0,d:0}}},371622:{g:371622,gn:"阳信县",y:2455,s:0,d:2455,l:{2455:{g:2455,gn:"阳信县（其他）",y:2455,s:0,d:0},6395:{g:6395,gn:"阳信县（金阳街道、信城街道）",y:6395,s:0,d:0}}},371623:{g:371623,gn:"无棣县",y:2456,s:0,d:2456,l:{2456:{g:2456,gn:"无棣县（其他）",y:2456,s:0,d:0},6394:{g:6394,gn:"无棣县（棣丰街道、海丰街道）",y:6394,s:0,d:0}}},371624:{g:371624,gn:"沾化县",y:2452,s:0,d:2452,l:{2452:{g:2452,gn:"沾化县（其他）",y:2452,s:0,d:0},6396:{g:6396,gn:"沾化县（城北工业园、城东工业园、富国街道、富源街道）",y:6396,s:0,d:0}}},371625:{g:371625,gn:"博兴县",y:2454,s:0,d:2454,l:{2454:{g:2454,gn:"博兴县（其他）",y:2454,s:0,d:0},6392:{g:6392,gn:"博兴县（博昌街道、城东街道、店子镇、锦秋街道、兴福镇）",y:6392,s:0,d:0}}},371626:{g:371626,gn:"邹平县",y:2451,s:0,d:2451,l:{2451:{g:2451,gn:"邹平县（其他）",y:2451,s:0,d:0},6397:{g:6397,gn:"邹平县（西董镇、台子镇、焦桥镇、九户镇、码头镇、孙镇镇、）",y:6397,s:0,d:0}}}}},371700:{g:371700,gn:"菏泽市",y:2470,s:1,d:371702,l:{371702:{g:371702,gn:"牡丹区",y:2471,s:1,d:2471,l:{2471:{g:2471,gn:"牡丹区（北城街道、丹阳街道、佃户屯街道、东城街道、何楼街道）",y:2471,s:1,d:0},6751:{g:6751,gn:"牡丹区（牡丹街道、南城街道、万福街道、西城街道、岳程街道）",y:6751,s:0,d:0},6752:{g:6752,gn:"牡丹区（其他）",y:6752,s:0,d:0}}},371721:{g:371721,gn:"曹县",y:2475,s:0,d:2475,l:{2475:{g:2475,gn:"曹县（曹县县城）",y:2475,s:0,d:0},6750:{g:6750,gn:"曹县（其他）",y:6750,s:0,d:0}}},371722:{g:371722,gn:"单县",y:2473,s:0,d:0},371723:{g:371723,gn:"成武县",y:2479,s:0,d:0},371724:{g:371724,gn:"巨野县",y:2477,s:0,d:0},371725:{g:371725,gn:"郓城县",y:2474,s:0,d:0},371726:{g:371726,gn:"鄄城县",y:2472,s:0,d:0},371727:{g:371727,gn:"定陶县",y:2476,s:0,d:0},371728:{g:371728,gn:"东明县",y:2478,s:0,d:0}}}}},410000:{g:410000,gn:"河南省",y:1144,s:1,d:410100,l:{410100:{g:410100,gn:"郑州市",y:1145,s:1,d:3490,l:{3490:{g:3490,gn:"高新区",y:3490,s:1,d:0},5134:{g:5134,gn:"航空港区",y:5134,s:0,d:0},6857:{g:6857,gn:"经济开发区（其它）",y:6857,s:0,d:0},6858:{g:6858,gn:"经济开发区（明湖街道）",y:6858,s:0,d:0},6865:{g:6865,gn:"郑东新区（其它）",y:6865,s:0,d:0},6866:{g:6866,gn:"郑东新区（博学路街道、祭城路街道、龙子湖街道、如意湖街道、商都路街道）",y:6866,s:0,d:0},410102:{g:410102,gn:"中原区",y:1152,s:1,d:1152,l:{1152:{g:1152,gn:"中原区（其他）",y:1152,s:1,d:0},5050:{g:5050,gn:"中原区（三环以内）",y:5050,s:0,d:0},6061:{g:6061,gn:"中原区（常庄乡）",y:6061,s:0,d:0}}},410103:{g:410103,gn:"二七区",y:1153,s:1,d:1153,l:{1153:{g:1153,gn:"二七区（其他）",y:1153,s:1,d:0},5128:{g:5128,gn:"二七区（三环以内）",y:5128,s:0,d:0},6045:{g:6045,gn:"二七区（侯寨乡）",y:6045,s:0,d:0}}},410104:{g:410104,gn:"管城回族区",y:5129,s:0,d:5129,l:{5129:{g:5129,gn:"管城回族区（三环以内）",y:5129,s:0,d:0},6874:{g:6874,gn:"管城回族区（三环以外，四环以内）",y:6874,s:0,d:0},6875:{g:6875,gn:"管城回族区（四环以外）",y:6875,s:0,d:0}}},410105:{g:410105,gn:"金水区",y:5049,s:0,d:5049,l:{5049:{g:5049,gn:"金水区（三环以内）",y:5049,s:0,d:0},6051:{g:6051,gn:"金水区（姚桥乡）",y:6051,s:0,d:0},6876:{g:6876,gn:"金水区（三环以外，四环以内）",y:6876,s:0,d:0},6877:{g:6877,gn:"金水区（四环以外）",y:6877,s:0,d:0}}},410106:{g:410106,gn:"上街区",y:6859,s:0,d:6859,l:{6859:{g:6859,gn:"上街区（其它）",y:6859,s:0,d:0},6860:{g:6860,gn:"上街区（工业路街道、济源路街道、矿山街道、新安路街道、中心路街道）",y:6860,s:0,d:0}}},410108:{g:410108,gn:"惠济区",y:6050,s:0,d:6050,l:{6050:{g:6050,gn:"惠济区（花园口镇、古荥镇、毛庄镇）",y:6050,s:0,d:0},6855:{g:6855,gn:"惠济区（其它）",y:6855,s:0,d:0},6856:{g:6856,gn:"惠济区（大河路街道、老鸦陈街道、刘寨街道、新城街道、迎宾路街道、长兴路街道）",y:6856,s:0,d:0}}},410122:{g:410122,gn:"中牟县",y:6059,s:0,d:6059,l:{6059:{g:6059,gn:"中牟县（白沙镇、城关镇、九龙镇、新县城）",y:6059,s:0,d:0},6060:{g:6060,gn:"中牟县（其他）",y:6060,s:0,d:0}}},410181:{g:410181,gn:"巩义市",y:6047,s:0,d:6047,l:{6047:{g:6047,gn:"巩义市（杜甫路街道、回郭镇、孝义街道、新华路街道、永安路街道、枝田工业区、紫荆路街道）",y:6047,s:0,d:0},6853:{g:6853,gn:"巩义市（其它）",y:6853,s:0,d:0},6854:{g:6854,gn:"巩义市（北山口镇、大峪沟镇、米河镇、小关镇、竹林镇）",y:6854,s:0,d:0}}},410182:{g:410182,gn:"荥阳市",y:6861,s:0,d:6861,l:{6861:{g:6861,gn:"荥阳市（城关乡、城关镇、乔楼镇、王村镇）",y:6861,s:0,d:0},6862:{g:6862,gn:"荥阳市（豫龙镇）",y:6862,s:0,d:0},6863:{g:6863,gn:"荥阳市（其它）",y:6863,s:0,d:0},6864:{g:6864,gn:"荥阳市（京城街道、乔楼镇、索河街道）",y:6864,s:0,d:0}}},410183:{g:410183,gn:"新密市",y:6052,s:0,d:6052,l:{6052:{g:6052,gn:"新密市（城关镇、新华路街道）",y:6052,s:0,d:0},6878:{g:6878,gn:"新密市（市区）",y:6878,s:0,d:0},6879:{g:6879,gn:"新密市（岳村镇、尖山风景区）",y:6879,s:0,d:0}}},410184:{g:410184,gn:"新郑市",y:6054,s:0,d:6054,l:{6054:{g:6054,gn:"新郑市（城关乡、和庄镇、机场港区、龙湖镇）",y:6054,s:0,d:0},6055:{g:6055,gn:"新郑市（新村镇、新华路街道、薛店镇）",y:6055,s:0,d:0},6056:{g:6056,gn:"新郑市（其他）",y:6056,s:0,d:0}}},410185:{g:410185,gn:"登封市",y:6043,s:0,d:6043,l:{6043:{g:6043,gn:"登封市（嵩阳街道）",y:6043,s:0,d:0},6849:{g:6849,gn:"登封市（其它）",y:6849,s:0,d:0},6850:{g:6850,gn:"登封市（少林街道、中岳街道）",y:6850,s:0,d:0}}}}},410200:{g:410200,gn:"开封市",y:1174,s:1,d:410224,l:{410202:{g:410202,gn:"龙亭区",y:1181,s:1,d:1181,l:{1181:{g:1181,gn:"龙亭区（北郊乡、柳园口乡）",y:1181,s:1,d:0},6798:{g:6798,gn:"龙亭区（北道门街道、北书店街道、午朝门街道）",y:6798,s:0,d:0},6799:{g:6799,gn:"龙亭区（其它）",y:6799,s:0,d:0}}},410203:{g:410203,gn:"顺河回族区",y:1183,s:1,d:1183,l:{1183:{g:1183,gn:"顺河回族区（土柏岗乡）",y:1183,s:1,d:0},6802:{g:6802,gn:"顺河回族区（其它）",y:6802,s:0,d:0},6803:{g:6803,gn:"顺河回族区（宋门街道、清平街道、苹果园街道、工业街道、东郊乡、曹门街道）",y:6803,s:0,d:0}}},410204:{g:410204,gn:"鼓楼区",y:6793,s:0,d:6793,l:{6793:{g:6793,gn:"鼓楼区（其它）",y:6793,s:0,d:0},6794:{g:6794,gn:"鼓楼区（九村街道、卧龙街道、五一街道、西司门街道、仙人庄街道、相国寺街道、新华街道、州桥街道）",y:6794,s:0,d:0}}},410205:{g:410205,gn:"禹王台区",y:3562,s:1,d:3562,l:{3562:{g:3562,gn:"禹王台区（南郊乡、汪屯乡）",y:3562,s:1,d:0},6804:{g:6804,gn:"禹王台区（其它）",y:6804,s:0,d:0},6806:{g:6806,gn:"禹王台区（菜市街道、繁塔街道、三里堡街道、新门关街道）",y:6806,s:0,d:0}}},410211:{g:410211,gn:"金明区",y:6322,s:0,d:6322,l:{6322:{g:6322,gn:"金明区（城西街道、梁苑街道）",y:6322,s:0,d:0},6796:{g:6796,gn:"金明区（其它）",y:6796,s:0,d:0},6797:{g:6797,gn:"金明区（开发区、杏花营镇）",y:6797,s:0,d:0}}},410221:{g:410221,gn:"杞县",y:1179,s:0,d:1179,l:{1179:{g:1179,gn:"杞县（其他）",y:1179,s:0,d:0},6326:{g:6326,gn:"杞县（城关镇、科技产业园）",y:6326,s:0,d:0}}},410222:{g:410222,gn:"通许县",y:1178,s:0,d:1178,l:{1178:{g:1178,gn:"通许县（其他）",y:1178,s:0,d:0},6328:{g:6328,gn:"通许县（城关镇、东工业园、豫沪产业园）",y:6328,s:0,d:0}}},410223:{g:410223,gn:"尉氏县",y:1177,s:0,d:1177,l:{1177:{g:1177,gn:"尉氏县（其他）",y:1177,s:0,d:0},6329:{g:6329,gn:"尉氏县（城关镇）",y:6329,s:0,d:0}}},410224:{g:410224,gn:"开封县",y:1175,s:0,d:1175,l:{1175:{g:1175,gn:"开封县（其他）",y:1175,s:0,d:0},6323:{g:6323,gn:"开封县（城关镇）",y:6323,s:0,d:0}}},410225:{g:410225,gn:"兰考县",y:1176,s:0,d:1176,l:{1176:{g:1176,gn:"兰考县（其他）",y:1176,s:0,d:0},6324:{g:6324,gn:"兰考县（城关镇、兰考工业园）",y:6324,s:0,d:0}}}}},410300:{g:410300,gn:"洛阳市",y:1158,s:0,d:410381,l:{6306:{g:6306,gn:"高新技术开发区（徐家营）",y:6306,s:0,d:0},6307:{g:6307,gn:"高新技术开发区（其他）",y:6307,s:0,d:0},6308:{g:6308,gn:"经济技术开发区",y:6308,s:0,d:0},410302:{g:410302,gn:"老城区",y:5693,s:0,d:5693,l:{5693:{g:5693,gn:"老城区（东北隅街道，东南隅街道，西北隅街道）",y:5693,s:0,d:0},5694:{g:5694,gn:"老城区（西南隅街道，洛浦街道，南关街道，西关街道）",y:5694,s:0,d:0},5699:{g:5699,gn:"老城区（其他区域）",y:5699,s:0,d:0}}},410303:{g:410303,gn:"西工区",y:5690,s:0,d:5690,l:{5690:{g:5690,gn:"西工区（凯旋东路街道，汉屯路街道，金谷园街道，唐宫路街道）",y:5690,s:0,d:0},5691:{g:5691,gn:"西工区（王城路街道，西工路街道，洛北街道，道北路街道）",y:5691,s:0,d:0},5692:{g:5692,gn:"西工区（飞机场工业园区、洛北乡、邙山镇、营庄工业园）",y:5692,s:0,d:0},6813:{g:6813,gn:"西工区（其它）",y:6813,s:0,d:0},6814:{g:6814,gn:"西工区（红山街道、邙岭路街道）",y:6814,s:0,d:0}}},410304:{g:410304,gn:"瀍河回族区",y:1172,s:0,d:1172,l:{1172:{g:1172,gn:"瀍河回族区（白马寺镇）",y:1172,s:0,d:0},6807:{g:6807,gn:"瀍河回族区（其它）",y:6807,s:0,d:0},6808:{g:6808,gn:"瀍河回族区（北窑街道、瀍河乡、瀍西街道、东关街道、华林新村街道、塔湾街道、五股路街道、杨文街道）",y:6808,s:0,d:0}}},410305:{g:410305,gn:"涧西区",y:5696,s:0,d:5696,l:{5696:{g:5696,gn:"涧西区（长安路街道，长春路街道，创业路街道，湖北路街道）",y:5696,s:0,d:0},5698:{g:5698,gn:"涧西区（重庆路街道，周山路街道，珠江路街道，孙旗屯乡，工农乡）",y:5698,s:0,d:0},6809:{g:6809,gn:"涧西区（其它）",y:6809,s:0,d:0},6810:{g:6810,gn:"涧西区（南昌路街道、天津路街道、武汉路街道、徐家营街道、郑州路街道）",y:6810,s:0,d:0}}},410306:{g:410306,gn:"吉利区",y:1171,s:0,d:0},410311:{g:410311,gn:"洛龙区",y:1173,s:0,d:1173,l:{1173:{g:1173,gn:"洛龙区（龙门镇、洛龙大道南街道、龙门石窟风景区）",y:1173,s:0,d:0},6811:{g:6811,gn:"洛龙区（其它）",y:6811,s:0,d:0},6812:{g:6812,gn:"洛龙区（安乐路街道、安乐镇、古城街道、关林街道、开元路街道、太康东路街道、镇北路街道）",y:6812,s:0,d:0}}},410322:{g:410322,gn:"孟津县",y:1160,s:0,d:1160,l:{1160:{g:1160,gn:"孟津县（其他）",y:1160,s:0,d:0},6310:{g:6310,gn:"孟津县（城关镇）",y:6310,s:0,d:0}}},410323:{g:410323,gn:"新安县",y:1161,s:0,d:1161,l:{1161:{g:1161,gn:"新安县（其他）",y:1161,s:0,d:0},6312:{g:6312,gn:"新安县（城关镇）",y:6312,s:0,d:0}}},410324:{g:410324,gn:"栾川县",y:1164,s:0,d:0},410325:{g:410325,gn:"嵩县",y:1163,s:0,d:0},410326:{g:410326,gn:"汝阳县",y:1165,s:0,d:0},410327:{g:410327,gn:"宜阳县",y:1162,s:0,d:1162,l:{1162:{g:1162,gn:"宜阳县（其他）",y:1162,s:0,d:0},6315:{g:6315,gn:"宜阳县（城关镇）",y:6315,s:0,d:0}}},410328:{g:410328,gn:"洛宁县",y:1166,s:0,d:0},410329:{g:410329,gn:"伊川县",y:1167,s:0,d:1167,l:{1167:{g:1167,gn:"伊川县（其他）",y:1167,s:0,d:0},6314:{g:6314,gn:"伊川县（城关镇）",y:6314,s:0,d:0}}},410381:{g:410381,gn:"偃师市",y:1159,s:0,d:1159,l:{1159:{g:1159,gn:"偃师市（其他）",y:1159,s:0,d:0},6313:{g:6313,gn:"偃师市（邙岭乡、山化乡、首阳山镇、岳滩镇、翟镇、翟镇镇）",y:6313,s:0,d:0}}}}},410400:{g:410400,gn:"平顶山市",y:1185,s:0,d:410482,l:{410402:{g:410402,gn:"新华区",y:6829,s:0,d:6829,l:{6829:{g:6829,gn:"新华区（其它）",y:6829,s:0,d:0},6830:{g:6830,gn:"新华区（光明路街道、湖滨路街道、焦店镇、矿工路街道、青石山街道）",y:6830,s:0,d:0},6831:{g:6831,gn:"新华区（曙光街街道、西高皇街道、西市场街道、湛河北路街道、中兴路街道）",y:6831,s:0,d:0}}},410403:{g:410403,gn:"卫东区",y:6826,s:0,d:6826,l:{6826:{g:6826,gn:"卫东区（其它）",y:6826,s:0,d:0},6827:{g:6827,gn:"卫东区（北环路街道、东安路街道、东工人镇街道、东环路街道、光华路街道）",y:6827,s:0,d:0},6828:{g:6828,gn:"卫东区（鸿鹰街道、皇台街道、建设路街道、蒲城街道、五一路街道、优越路街道）",y:6828,s:0,d:0}}},410404:{g:410404,gn:"石龙区",y:1195,s:0,d:0},410411:{g:410411,gn:"湛河区",y:6832,s:0,d:6832,l:{6832:{g:6832,gn:"湛河区（其它）",y:6832,s:0,d:0},6833:{g:6833,gn:"湛河区（高阳路街道、九里山街道、马庄街道、南环路街道、轻工路街道、姚孟街道）",y:6833,s:0,d:0}}},410421:{g:410421,gn:"宝丰县",y:1189,s:0,d:0},410422:{g:410422,gn:"叶县",y:1188,s:0,d:0},410423:{g:410423,gn:"鲁山县",y:1190,s:0,d:0},410425:{g:410425,gn:"郏县",y:1191,s:0,d:0},410481:{g:410481,gn:"舞钢市",y:1187,s:0,d:0},410482:{g:410482,gn:"汝州市",y:1186,s:0,d:0}}},410500:{g:410500,gn:"安阳市",y:1226,s:1,d:410581,l:{6776:{g:6776,gn:"开发区（峨嵋大街街道、商颂大街街道、银杏大街街道）",y:6776,s:0,d:0},410502:{g:410502,gn:"文峰区",y:1233,s:1,d:1233,l:{1233:{g:1233,gn:"文峰区（高庄乡、宝莲寺镇）",y:1233,s:1,d:0},6779:{g:6779,gn:"文峰区（其它）",y:6779,s:0,d:0},6780:{g:6780,gn:"文峰区（北大街街道、东大街街道、东关街道、光华路街道、南关街道、甜水井街道）",y:6780,s:0,d:0},6781:{g:6781,gn:"文峰区（头二三街道、西大街街道、西关街道、永明路街道、中华路街道、紫薇大道街道）",y:6781,s:0,d:0}}},410503:{g:410503,gn:"北关区",y:1232,s:1,d:1232,l:{1232:{g:1232,gn:"北关区（韩陵乡）",y:1232,s:1,d:0},6773:{g:6773,gn:"北关区（灯塔路街道、豆腐营街道、红旗路街道、洹北街道、解放路街道）",y:6773,s:0,d:0},6774:{g:6774,gn:"北关区（民航路街道、曙光路街道、彰北街道、彰东街道）",y:6774,s:0,d:0},6775:{g:6775,gn:"北关区（其它）",y:6775,s:0,d:0}}},410505:{g:410505,gn:"殷都区",y:1234,s:1,d:1234,l:{1234:{g:1234,gn:"殷都区（西郊乡）",y:1234,s:1,d:0},6782:{g:6782,gn:"殷都区（其它）",y:6782,s:0,d:0},6783:{g:6783,gn:"殷都区（电厂路街道、梅园庄街道、清风街街道、纱厂路街道、铁西路街道、相台街道）",y:6783,s:0,d:0}}},410506:{g:410506,gn:"龙安区",y:1235,s:1,d:1235,l:{1235:{g:1235,gn:"龙安区（东风乡、龙泉镇、马头涧镇、马投涧乡）",y:1235,s:1,d:0},6777:{g:6777,gn:"龙安区（太行小区街道、文昌大道街道、文明大道街道、中州路街道）",y:6777,s:0,d:0},6778:{g:6778,gn:"龙安区（其它）",y:6778,s:0,d:0}}},410522:{g:410522,gn:"安阳县",y:1228,s:0,d:1228,l:{1228:{g:1228,gn:"安阳县（其他）",y:1228,s:0,d:0},6291:{g:6291,gn:"安阳县（柏庄镇、韩陵乡、水冶镇）",y:6291,s:0,d:0}}},410523:{g:410523,gn:"汤阴县",y:1229,s:0,d:1229,l:{1229:{g:1229,gn:"汤阴县（其他）",y:1229,s:0,d:0},6297:{g:6297,gn:"汤阴县（城关镇）",y:6297,s:0,d:0}}},410526:{g:410526,gn:"滑县",y:1230,s:0,d:1230,l:{1230:{g:1230,gn:"滑县（其他）",y:1230,s:0,d:0},6293:{g:6293,gn:"滑县（道口镇）",y:6293,s:0,d:0}}},410527:{g:410527,gn:"内黄县",y:1231,s:0,d:1231,l:{1231:{g:1231,gn:"内黄县（其他）",y:1231,s:0,d:0},6296:{g:6296,gn:"内黄县（城关镇）",y:6296,s:0,d:0}}},410581:{g:410581,gn:"林州市",y:1227,s:0,d:1227,l:{1227:{g:1227,gn:"林州市（其他）",y:1227,s:0,d:0},6294:{g:6294,gn:"林州市（桂园街道、开元街道、龙山街道、振林街道）",y:6294,s:0,d:0}}}}},410600:{g:410600,gn:"鹤壁市",y:1207,s:1,d:410622,l:{6300:{g:6300,gn:"金山工业开发区",y:6300,s:0,d:0},410602:{g:410602,gn:"鹤山区",y:1211,s:0,d:0},410603:{g:410603,gn:"山城区",y:1210,s:0,d:1210,l:{1210:{g:1210,gn:"山城区（石林镇）",y:1210,s:0,d:0},6304:{g:6304,gn:"山城区（其他）",y:6304,s:0,d:0}}},410611:{g:410611,gn:"淇滨区",y:1212,s:1,d:1212,l:{1212:{g:1212,gn:"淇滨区（上裕乡、钜桥镇、大河涧乡）",y:1212,s:1,d:0},6302:{g:6302,gn:"淇滨区（其他）",y:6302,s:0,d:0}}},410621:{g:410621,gn:"浚县",y:1209,s:0,d:1209,l:{1209:{g:1209,gn:"浚县（其他）",y:1209,s:0,d:0},6301:{g:6301,gn:"浚县（城关镇）",y:6301,s:0,d:0}}},410622:{g:410622,gn:"淇县",y:1208,s:0,d:1208,l:{1208:{g:1208,gn:"淇县（其他）",y:1208,s:0,d:0},6303:{g:6303,gn:"淇县（朝歌镇）",y:6303,s:0,d:0}}}}},410700:{g:410700,gn:"新乡市",y:1213,s:0,d:410781,l:{1222:{g:1222,gn:"郊区",y:1222,s:0,d:0},410702:{g:410702,gn:"红旗区",y:6843,s:0,d:6843,l:{6843:{g:6843,gn:"红旗区（其它）",y:6843,s:0,d:0},6844:{g:6844,gn:"红旗区（东街街道、渠东街道、西街街道、向阳小区街道）",y:6844,s:0,d:0}}},410703:{g:410703,gn:"卫滨区",y:6847,s:0,d:6847,l:{6847:{g:6847,gn:"卫滨区（其它）",y:6847,s:0,d:0},6848:{g:6848,gn:"卫滨区（健康路街道、解放路街道、南桥街道、胜利路街道、铁西街道、中同街街道、自由路街道）",y:6848,s:0,d:0}}},410704:{g:410704,gn:"凤泉区",y:6841,s:0,d:6841,l:{6841:{g:6841,gn:"凤泉区（其它）",y:6841,s:0,d:0},6842:{g:6842,gn:"凤泉区（宝东街道、宝西街道）",y:6842,s:0,d:0}}},410711:{g:410711,gn:"牧野区",y:6845,s:0,d:6845,l:{6845:{g:6845,gn:"牧野区（其它）",y:6845,s:0,d:0},6846:{g:6846,gn:"牧野区（北干道街道、东干道街道、和平路街道、花园街道、荣校路街道、卫北街道、新辉路街道）",y:6846,s:0,d:0}}},410721:{g:410721,gn:"新乡县",y:1216,s:0,d:0},410724:{g:410724,gn:"获嘉县",y:1217,s:0,d:0},410725:{g:410725,gn:"原阳县",y:1220,s:0,d:0},410726:{g:410726,gn:"延津县",y:1219,s:0,d:0},410727:{g:410727,gn:"封丘县",y:1218,s:0,d:0},410728:{g:410728,gn:"长垣县",y:1221,s:0,d:0},410781:{g:410781,gn:"卫辉市",y:1214,s:0,d:0},410782:{g:410782,gn:"辉县市",y:1215,s:0,d:0}}},410800:{g:410800,gn:"焦作市",y:1196,s:0,d:410883,l:{410802:{g:410802,gn:"解放区",y:6784,s:0,d:6784,l:{6784:{g:6784,gn:"解放区（其它）",y:6784,s:0,d:0},6785:{g:6785,gn:"解放区（焦北街道、焦南街道、焦西街道、民主街道、七百间街道、上白作街道、王褚街道、新华街道）",y:6785,s:0,d:0}}},410803:{g:410803,gn:"中站区",y:6339,s:0,d:6339,l:{6339:{g:6339,gn:"中站区（李封街道、许衡街道）",y:6339,s:0,d:0},6791:{g:6791,gn:"中站区（丹河街道、冯封街道、府城街道、龙洞街道、龙翔街道、王封街道、月山街道、朱村街道）",y:6791,s:0,d:0},6792:{g:6792,gn:"中站区（其它）",y:6792,s:0,d:0}}},410804:{g:410804,gn:"马村区",y:6786,s:0,d:6786,l:{6786:{g:6786,gn:"马村区（其它）",y:6786,s:0,d:0},6787:{g:6787,gn:"马村区（安阳城街道、北山街道、待王街道、冯营街道、九里山街道、演马街道、马村街道）",y:6787,s:0,d:0}}},410811:{g:410811,gn:"山阳区",y:6343,s:0,d:6343,l:{6343:{g:6343,gn:"山阳区（定和街道、东方红街道、光亚街道、焦东街道）",y:6343,s:0,d:0},6344:{g:6344,gn:"山阳区（太行街道、艺新街道、中星街道）",y:6344,s:0,d:0},6788:{g:6788,gn:"山阳区（其它）",y:6788,s:0,d:0},6789:{g:6789,gn:"山阳区（百间房街道、文苑街道、新城街道）",y:6789,s:0,d:0}}},410821:{g:410821,gn:"修武县",y:1199,s:0,d:1199,l:{1199:{g:1199,gn:"修武县（其他）",y:1199,s:0,d:0},6338:{g:6338,gn:"修武县（城关镇）",y:6338,s:0,d:0}}},410822:{g:410822,gn:"博爱县",y:1201,s:0,d:1201,l:{1201:{g:1201,gn:"博爱县（其他）",y:1201,s:0,d:0},6340:{g:6340,gn:"博爱县（清化镇）",y:6340,s:0,d:0}}},410823:{g:410823,gn:"武陟县",y:1202,s:0,d:1202,l:{1202:{g:1202,gn:"武陟县（其他）",y:1202,s:0,d:0},6346:{g:6346,gn:"武陟县（木城镇、武陟工业园区）",y:6346,s:0,d:0}}},410825:{g:410825,gn:"温县",y:1200,s:0,d:1200,l:{1200:{g:1200,gn:"温县（其他）",y:1200,s:0,d:0},6345:{g:6345,gn:"温县（温泉镇）",y:6345,s:0,d:0}}},410882:{g:410882,gn:"沁阳市",y:1198,s:0,d:1198,l:{1198:{g:1198,gn:"沁阳市（其他）",y:1198,s:0,d:0},6342:{g:6342,gn:"沁阳市（怀庆街道、沁园街道、太行街道、覃怀街道）",y:6342,s:0,d:0}}},410883:{g:410883,gn:"孟州市",y:1197,s:0,d:1197,l:{1197:{g:1197,gn:"孟州市（其他）",y:1197,s:0,d:0},6341:{g:6341,gn:"孟州市（大定街道、河雍街道、会昌街道）",y:6341,s:0,d:0}}}}},410900:{g:410900,gn:"濮阳市",y:1236,s:0,d:410928,l:{6834:{g:6834,gn:"市区（其它）",y:6834,s:0,d:0},6835:{g:6835,gn:"华龙区（大庆路街道、黄河路街道、建设路街道、人民路街道、任丘路街道、胜利路街道、长庆路街道、中原路街",y:6835,s:0,d:0},410922:{g:410922,gn:"清丰县",y:1238,s:0,d:0},410923:{g:410923,gn:"南乐县",y:1239,s:0,d:0},410926:{g:410926,gn:"范县",y:1240,s:0,d:0},410927:{g:410927,gn:"台前县",y:1241,s:0,d:0},410928:{g:410928,gn:"濮阳县",y:1237,s:0,d:0}}},411000:{g:411000,gn:"许昌市",y:1243,s:1,d:411081,l:{411002:{g:411002,gn:"魏都区",y:1249,s:1,d:0},411023:{g:411023,gn:"许昌县",y:1246,s:0,d:1246,l:{1246:{g:1246,gn:"许昌县（其他）",y:1246,s:0,d:0},6318:{g:6318,gn:"许昌县（邓庄乡、将官池镇、蒋李集镇、尚集镇）",y:6318,s:0,d:0}}},411024:{g:411024,gn:"鄢陵县",y:1247,s:0,d:1247,l:{1247:{g:1247,gn:"鄢陵县（其他）",y:1247,s:0,d:0},6319:{g:6319,gn:"鄢陵县（安陵镇）",y:6319,s:0,d:0}}},411025:{g:411025,gn:"襄城县",y:1248,s:0,d:1248,l:{1248:{g:1248,gn:"襄城县（其他）",y:1248,s:0,d:0},6317:{g:6317,gn:"襄城县（城关镇）",y:6317,s:0,d:0}}},411081:{g:411081,gn:"禹州市",y:1244,s:0,d:1244,l:{1244:{g:1244,gn:"禹州市（其他）",y:1244,s:0,d:0},6320:{g:6320,gn:"禹州市（颍川街道、夏都街道、韩城街道、钧台街道、神垕镇、鸠山镇）",y:6320,s:0,d:0},6321:{g:6321,gn:"禹州市（褚河镇、范坡乡、八里营乡、花园街道、连洛湾街道）",y:6321,s:0,d:0}}},411082:{g:411082,gn:"长葛市",y:1245,s:0,d:1245,l:{1245:{g:1245,gn:"长葛市（董村镇、古桥乡、官亭乡、南席镇、坡胡镇、石固镇、石象乡）",y:1245,s:0,d:0},6316:{g:6316,gn:"长葛市（其他）",y:6316,s:0,d:0}}}}},411100:{g:411100,gn:"漯河市",y:1250,s:0,d:411121,l:{411102:{g:411102,gn:"源汇区",y:6818,s:0,d:6818,l:{6818:{g:6818,gn:"源汇区（其它）",y:6818,s:0,d:0},6819:{g:6819,gn:"源汇区（干河陈街道、老街街道、马路街街道、顺河街街道）",y:6819,s:0,d:0}}},411103:{g:411103,gn:"郾城区",y:6815,s:0,d:6815,l:{6815:{g:6815,gn:"郾城区（其它）",y:6815,s:0,d:0},6816:{g:6816,gn:"郾城区（城关镇、黑龙潭乡、李集镇、孟庙镇、龙城镇、裴城镇、沙北街道、商桥镇、新店镇）",y:6816,s:0,d:0}}},411104:{g:411104,gn:"召陵区",y:6820,s:0,d:6820,l:{6820:{g:6820,gn:"召陵区（其它）",y:6820,s:0,d:0},6821:{g:6821,gn:"召陵区（后谢乡、天桥街街道、翟庄街道）",y:6821,s:0,d:0}}},411121:{g:411121,gn:"舞阳县",y:1251,s:0,d:0},411122:{g:411122,gn:"临颍县",y:1252,s:0,d:0}}},411200:{g:411200,gn:"三门峡市",y:1255,s:1,d:411281,l:{411202:{g:411202,gn:"湖滨区",y:1260,s:1,d:0},411221:{g:411221,gn:"渑池县",y:1258,s:0,d:0},411222:{g:411222,gn:"陕县",y:1259,s:0,d:0},411224:{g:411224,gn:"卢氏县",y:1261,s:0,d:0},411281:{g:411281,gn:"义马市",y:1256,s:0,d:0},411282:{g:411282,gn:"灵宝市",y:1257,s:0,d:0}}},411300:{g:411300,gn:"南阳市",y:1309,s:0,d:411381,l:{411302:{g:411302,gn:"宛城区",y:6822,s:0,d:6822,l:{6822:{g:6822,gn:"宛城区（其它）",y:6822,s:0,d:0},6823:{g:6823,gn:"宛城区（东关街道、汉冶街道、新华街道、枣林街道、仲景街道）",y:6823,s:0,d:0}}},411303:{g:411303,gn:"卧龙区",y:6824,s:0,d:6824,l:{6824:{g:6824,gn:"卧龙区（其它）",y:6824,s:0,d:0},6825:{g:6825,gn:"卧龙区（百里奚街道、车站街道、光武街道、靳岗街道、梅溪街道、七一街道、卧龙岗街道、武侯街道张衡街道）",y:6825,s:0,d:0}}},411321:{g:411321,gn:"南召县",y:1311,s:0,d:0},411322:{g:411322,gn:"方城县",y:1312,s:0,d:0},411323:{g:411323,gn:"西峡县",y:1320,s:0,d:0},411324:{g:411324,gn:"镇平县",y:1317,s:0,d:0},411325:{g:411325,gn:"内乡县",y:1318,s:0,d:0},411326:{g:411326,gn:"淅川县",y:1319,s:0,d:0},411327:{g:411327,gn:"社旗县",y:1313,s:0,d:0},411328:{g:411328,gn:"唐河县",y:1314,s:0,d:0},411329:{g:411329,gn:"新野县",y:1316,s:0,d:0},411330:{g:411330,gn:"桐柏县",y:1315,s:0,d:0},411381:{g:411381,gn:"邓州市",y:1310,s:0,d:0}}},411400:{g:411400,gn:"商丘市",y:1262,s:0,d:411402,l:{411402:{g:411402,gn:"梁园区",y:6836,s:0,d:6836,l:{6836:{g:6836,gn:"梁园区（其它）",y:6836,s:0,d:0},6837:{g:6837,gn:"梁园区（八八街道、白云街道、东风街道、建设街道、平安街道）",y:6837,s:0,d:0},6838:{g:6838,gn:"梁园区（平台街道、平原街道、前进街道、长征街道、中州街道）",y:6838,s:0,d:0}}},411403:{g:411403,gn:"睢阳区",y:6839,s:0,d:6839,l:{6839:{g:6839,gn:"睢阳区（其它）",y:6839,s:0,d:0},6840:{g:6840,gn:"睢阳区（东方街道、古城街道、文化街道、新城街道）",y:6840,s:0,d:0}}},411421:{g:411421,gn:"民权县",y:1267,s:0,d:0},411422:{g:411422,gn:"睢县",y:1270,s:0,d:0},411423:{g:411423,gn:"宁陵县",y:1268,s:0,d:0},411424:{g:411424,gn:"柘城县",y:1269,s:0,d:0},411425:{g:411425,gn:"虞城县",y:1266,s:0,d:0},411426:{g:411426,gn:"夏邑县",y:1271,s:0,d:0},411481:{g:411481,gn:"永城市",y:1264,s:0,d:0}}},411500:{g:411500,gn:"信阳市",y:1295,s:1,d:411521,l:{411502:{g:411502,gn:"浉河区",y:1304,s:1,d:0},411503:{g:411503,gn:"平桥区",y:1305,s:1,d:0},411521:{g:411521,gn:"罗山县",y:1296,s:0,d:0},411522:{g:411522,gn:"光山县",y:1302,s:0,d:0},411523:{g:411523,gn:"新县",y:1303,s:0,d:0},411524:{g:411524,gn:"商城县",y:1301,s:0,d:0},411525:{g:411525,gn:"固始县",y:1300,s:0,d:0},411526:{g:411526,gn:"潢川县",y:1297,s:0,d:0},411527:{g:411527,gn:"淮滨县",y:1299,s:0,d:0},411528:{g:411528,gn:"息县",y:1298,s:0,d:0}}},411600:{g:411600,gn:"周口市",y:1272,s:0,d:411681,l:{6869:{g:6869,gn:"经济开发区（淮河路街道、太昊路街道）",y:6869,s:0,d:0},411602:{g:411602,gn:"川汇区",y:6867,s:0,d:6867,l:{6867:{g:6867,gn:"川汇区（其它）",y:6867,s:0,d:0},6868:{g:6868,gn:"川汇区（陈州街道、城北街道、城南街道、荷花街道、金海路街道、七一路街道、人和街道、小桥街道）",y:6868,s:0,d:0}}},411621:{g:411621,gn:"扶沟县",y:1277,s:0,d:0},411622:{g:411622,gn:"西华县",y:1281,s:0,d:0},411623:{g:411623,gn:"商水县",y:1278,s:0,d:0},411624:{g:411624,gn:"沈丘县",y:1276,s:0,d:0},411625:{g:411625,gn:"郸城县",y:1274,s:0,d:0},411626:{g:411626,gn:"淮阳县",y:1275,s:0,d:0},411627:{g:411627,gn:"太康县",y:1279,s:0,d:0},411628:{g:411628,gn:"鹿邑县",y:1280,s:0,d:0},411681:{g:411681,gn:"项城市",y:1273,s:0,d:0}}},411700:{g:411700,gn:"驻马店市",y:1283,s:0,d:411702,l:{411702:{g:411702,gn:"驿城区",y:6870,s:0,d:6870,l:{6870:{g:6870,gn:"驿城区（其它）",y:6870,s:0,d:0},6871:{g:6871,gn:"驿城区（东风街道、老街街道、南海街道、人民街道、）",y:6871,s:0,d:0},6872:{g:6872,gn:"驿城区（顺河街道、西园街道、橡林街道、新华街道、雪松街道）",y:6872,s:0,d:0}}},411721:{g:411721,gn:"西平县",y:1288,s:0,d:0},411722:{g:411722,gn:"上蔡县",y:1290,s:0,d:0},411723:{g:411723,gn:"平舆县",y:1292,s:0,d:0},411724:{g:411724,gn:"正阳县",y:1294,s:0,d:0},411725:{g:411725,gn:"确山县",y:1285,s:0,d:0},411726:{g:411726,gn:"泌阳县",y:1286,s:0,d:0},411727:{g:411727,gn:"汝南县",y:1291,s:0,d:0},411728:{g:411728,gn:"遂平县",y:1287,s:0,d:0},411729:{g:411729,gn:"新蔡县",y:1293,s:0,d:0}}},419000:{g:419000,gn:"省直辖行政单位",y:1306,s:0,d:419001,l:{419001:{g:419001,gn:"济源市",y:6142,s:0,d:6142,l:{6142:{g:6142,gn:"济源市（北海街道、济水街道、沁园街道、天坛街道、玉泉街道、轵城镇）",y:6142,s:0,d:0},6143:{g:6143,gn:"济源市（其他）",y:6143,s:0,d:0}}}}}}},420000:{g:420000,gn:"湖北省",y:1323,s:1,d:420100,l:{420100:{g:420100,gn:"武汉市",y:1324,s:1,d:420102,l:{4030:{g:4030,gn:"江岸区（三环线以内，堤边路以南）",y:4030,s:1,d:0},6540:{g:6540,gn:"华中师范大学校区自提（沁园春食堂路口尽头18986299595）",y:6540,s:0,d:0},420102:{g:420102,gn:"江岸区",y:1325,s:1,d:1325,l:{1325:{g:1325,gn:"江岸区（堤边路、堪家矶大道以北三环线内）",y:1325,s:1,d:0}}},420103:{g:420103,gn:"江汉区",y:6894,s:0,d:6894,l:{6894:{g:6894,gn:"江汉区（常青街街道、台北街街道、西马街街道、上海街街道、万松街街道、北湖街街道）",y:6894,s:0,d:0},6895:{g:6895,gn:"江汉区（其它）",y:6895,s:0,d:0}}},420104:{g:420104,gn:"硚口区",y:6890,s:0,d:6890,l:{6890:{g:6890,gn:"硚口区（汉水桥街街道、宝丰街街道、六角亭街街道、崇仁街街道、汉正街街道）",y:6890,s:0,d:0},6891:{g:6891,gn:"硚口区（其它）",y:6891,s:0,d:0}}},420105:{g:420105,gn:"汉阳区",y:1329,s:1,d:1329,l:{1329:{g:1329,gn:"汉阳区（北至太北路、南至东荆河路、西至全力五路、东至三环线、太子湖区域除外））",y:1329,s:1,d:0},1342:{g:1342,gn:"汉阳区（三环线以内）",y:1342,s:1,d:0}}},420106:{g:420106,gn:"武昌区",y:5048,s:1,d:0},420107:{g:420107,gn:"青山区",y:1337,s:1,d:1337,l:{1337:{g:1337,gn:"青山区(三环线以内)",y:1337,s:1,d:0},1338:{g:1338,gn:"青山区(三环线以外)",y:1338,s:1,d:0}}},420111:{g:420111,gn:"洪山区",y:5045,s:1,d:5045,l:{5045:{g:5045,gn:"洪山区(三环线以内)",y:5045,s:1,d:0},5046:{g:5046,gn:"洪山区(三环线以外)",y:5046,s:1,d:0}}},420112:{g:420112,gn:"东西湖区",y:4027,s:1,d:4027,l:{4027:{g:4027,gn:"东西湖区（其它）",y:4027,s:1,d:0},4342:{g:4342,gn:"东西湖区(金银潭大道以南）",y:4342,s:1,d:0}}},420113:{g:420113,gn:"汉南区",y:4383,s:1,d:4383,l:{4383:{g:4383,gn:"汉南区（水洪乡，邓家口镇，邓南街道，东荆街道，湘口街道)",y:4383,s:1,d:0},4404:{g:4404,gn:"汉南区（东城垸农场、乌金农场、汉南农场、银莲湖农场，大咀乡)",y:4404,s:1,d:0},4405:{g:4405,gn:"汉南区(其他）",y:4405,s:1,d:0}}},420114:{g:420114,gn:"蔡甸区",y:4384,s:1,d:4384,l:{4384:{g:4384,gn:"蔡甸区（大集街道，沌口街道，军山街道，索河镇，消泗乡)",y:4384,s:1,d:0},4406:{g:4406,gn:"蔡甸区（永安街道，玉贤镇，奓山街道，张湾街道，侏儒街道）",y:4406,s:1,d:0},4407:{g:4407,gn:"蔡甸区 (其他）",y:4407,s:1,d:0}}},420115:{g:420115,gn:"江夏区",y:1334,s:1,d:1334,l:{1334:{g:1334,gn:"江夏区(除流芳镇城区、藏龙岛、大学园路外)",y:1334,s:1,d:0},5102:{g:5102,gn:"江夏区(流芳镇城区、藏龙岛、大学园路)",y:5102,s:1,d:0}}},420116:{g:420116,gn:"黄陂区",y:4387,s:0,d:4387,l:{4387:{g:4387,gn:"黄陂区",y:4387,s:0,d:0}}},420117:{g:420117,gn:"新洲区",y:4403,s:0,d:4403,l:{4403:{g:4403,gn:"新洲区",y:4403,s:0,d:0}}}}},420200:{g:420200,gn:"黄石市",y:1343,s:1,d:6886,l:{6886:{g:6886,gn:"经济技术开发区（团城山街道、花湖街道、金山街道）",y:6886,s:0,d:0},420202:{g:420202,gn:"黄石港区",y:4392,s:1,d:4392,l:{4392:{g:4392,gn:"黄石港区（江北管理区）",y:4392,s:1,d:0},6884:{g:6884,gn:"黄石港区（其它）",y:6884,s:0,d:0},6885:{g:6885,gn:"黄石港区（沈家营街道、黄石港街道、红旗桥街道、胜阳港街道）",y:6885,s:0,d:0}}},420203:{g:420203,gn:"西塞山区",y:4394,s:1,d:4394,l:{4394:{g:4394,gn:"西塞山区（其他）",y:4394,s:0,d:0},4411:{g:4411,gn:"西塞山区（临江街道、八泉街道、陈家湾街道、澄月街道、黄思湾街道）",y:4411,s:1,d:0}}},420204:{g:420204,gn:"下陆区",y:4396,s:0,d:4396,l:{4396:{g:4396,gn:"下陆区（其他）",y:4396,s:0,d:0},6197:{g:6197,gn:"下陆区（老下陆街道、新下陆街道、团城山街道）",y:6197,s:0,d:0}}},420205:{g:420205,gn:"铁山区",y:6887,s:0,d:6887,l:{6887:{g:6887,gn:"铁山区（鹿獐山街道、铁山街道）",y:6887,s:0,d:0},6888:{g:6888,gn:"铁山区（其它）",y:6888,s:0,d:0}}},420222:{g:420222,gn:"阳新县",y:6198,s:0,d:6198,l:{6198:{g:6198,gn:"阳新县（兴国镇）",y:6198,s:0,d:0},6199:{g:6199,gn:"阳新县（其他）",y:6199,s:0,d:0}}},420281:{g:420281,gn:"大冶市",y:1348,s:0,d:1348,l:{1348:{g:1348,gn:"大冶市（其他）",y:1348,s:0,d:0},6194:{g:6194,gn:"大冶市（东岳路街道、罗家桥街道）",y:6194,s:0,d:0}}}}},420300:{g:420300,gn:"十堰市",y:1361,s:0,d:420303,l:{420302:{g:420302,gn:"茅箭区",y:1363,s:0,d:0},420303:{g:420303,gn:"张湾区",y:1362,s:0,d:0},420321:{g:420321,gn:"郧县",y:1365,s:0,d:0},420322:{g:420322,gn:"郧西县",y:1366,s:0,d:0},420323:{g:420323,gn:"竹山县",y:1367,s:0,d:0},420324:{g:420324,gn:"竹溪县",y:1368,s:0,d:0},420325:{g:420325,gn:"房县",y:1369,s:0,d:0},420381:{g:420381,gn:"丹江口市",y:1364,s:0,d:0}}},420500:{g:420500,gn:"宜昌市",y:1370,s:1,d:420502,l:{420502:{g:420502,gn:"西陵区",y:5354,s:1,d:5354,l:{5354:{g:5354,gn:"西陵区",y:5354,s:1,d:0}}},420503:{g:420503,gn:"伍家岗区",y:4400,s:1,d:4400,l:{4400:{g:4400,gn:"伍家岗区（其他）",y:4400,s:0,d:0},5353:{g:5353,gn:"伍家岗区（伍家岗街道、伍家区办事处、伍家区街道、伍家乡）",y:5353,s:1,d:0},6205:{g:6205,gn:"伍家岗区（万寿桥街道、大公桥街道、宝塔河街道）",y:6205,s:0,d:0}}},420504:{g:420504,gn:"点军区",y:1373,s:0,d:1373,l:{1373:{g:1373,gn:"点军区（点军街道）",y:1373,s:0,d:0},6203:{g:6203,gn:"点军区（其他）",y:6203,s:0,d:0}}},420505:{g:420505,gn:"猇亭区",y:1374,s:0,d:1374,l:{1374:{g:1374,gn:"猇亭区（猇亭街道）",y:1374,s:0,d:0},6206:{g:6206,gn:"猇亭区（云池街道、古老背街道、虎牙街道）",y:6206,s:0,d:0},6207:{g:6207,gn:"猇亭区（其他）",y:6207,s:0,d:0}}},420506:{g:420506,gn:"夷陵区",y:4423,s:1,d:4423,l:{4423:{g:4423,gn:"夷陵区（其他）",y:4423,s:0,d:0},5356:{g:5356,gn:"夷陵区（龙泉镇、太平溪镇、土门镇、小溪塔街道、小溪塔镇）",y:5356,s:1,d:0}}},420525:{g:420525,gn:"远安县",y:1380,s:0,d:1380,l:{1380:{g:1380,gn:"远安县（鸣凤镇）",y:1380,s:0,d:0},6209:{g:6209,gn:"远安县（其他）",y:6209,s:0,d:0}}},420526:{g:420526,gn:"兴山县",y:1381,s:0,d:1381,l:{1381:{g:1381,gn:"兴山县（古夫镇）",y:1381,s:0,d:0},6208:{g:6208,gn:"兴山县（其他）",y:6208,s:0,d:0}}},420527:{g:420527,gn:"秭归县",y:5351,s:1,d:5351,l:{5351:{g:5351,gn:"秭归县（九里工业园区）",y:5351,s:1,d:0},5352:{g:5352,gn:"秭归县（其他）",y:5352,s:0,d:0}}},420528:{g:420528,gn:"长阳土家族自治县",y:1383,s:0,d:1383,l:{1383:{g:1383,gn:"长阳土家族自治县（其他）",y:1383,s:0,d:0},6202:{g:6202,gn:"长阳土家族自治县（龙舟坪镇）",y:6202,s:0,d:0}}},420529:{g:420529,gn:"五峰土家族自治县",y:1382,s:0,d:1382,l:{1382:{g:1382,gn:"五峰土家族自治县（渔洋关镇）",y:1382,s:0,d:0},6204:{g:6204,gn:"五峰土家族自治县（其他）",y:6204,s:0,d:0}}},420581:{g:420581,gn:"宜都市",y:5345,s:1,d:5345,l:{5345:{g:5345,gn:"宜都市（陆城街道、枝城街道、枝城镇）",y:5345,s:1,d:0},5346:{g:5346,gn:"宜都市（其他）",y:5346,s:0,d:0}}},420582:{g:420582,gn:"当阳市",y:5347,s:1,d:5347,l:{5347:{g:5347,gn:"当阳市（玉阳街道、坝陵街道、玉泉街道 ）",y:5347,s:1,d:0},5348:{g:5348,gn:"当阳市（其他 ）",y:5348,s:0,d:0}}},420583:{g:420583,gn:"枝江市",y:5349,s:1,d:5349,l:{5349:{g:5349,gn:"枝江市（董市镇、江口镇、马店镇、七星台镇、问安镇、仙女镇、姚港镇）",y:5349,s:1,d:0},5350:{g:5350,gn:"枝江市（其他）",y:5350,s:0,d:0}}}}},420600:{g:420600,gn:"襄樊市",y:1350,s:1,d:6200,l:{6200:{g:6200,gn:"襄州区（二汽汽业开发区、米庄镇、张湾镇）",y:6200,s:0,d:0},6201:{g:6201,gn:"襄州区（其他）",y:6201,s:0,d:0},420602:{g:420602,gn:"襄城区",y:5319,s:1,d:5319,l:{5319:{g:5319,gn:"襄城区（黄家湾风景区、欧庙镇、卧龙镇、尹集乡）",y:5319,s:1,d:0},5320:{g:5320,gn:"襄城区（其他）",y:5320,s:0,d:0}}},420606:{g:420606,gn:"樊城区",y:5321,s:1,d:5321,l:{5321:{g:5321,gn:"樊城区（牛首镇、太平店镇）",y:5321,s:1,d:0},5322:{g:5322,gn:"樊城区（柿铺街道）",y:5322,s:1,d:0},5324:{g:5324,gn:"樊城区（其他）",y:5324,s:0,d:0}}},420624:{g:420624,gn:"南漳县",y:5332,s:1,d:5332,l:{5332:{g:5332,gn:"南漳县（城关镇、涌泉工业园）",y:5332,s:1,d:0},5333:{g:5333,gn:"南漳县（其他）",y:5333,s:0,d:0}}},420625:{g:420625,gn:"谷城县",y:5334,s:1,d:5334,l:{5334:{g:5334,gn:"谷城县（城关镇）",y:5334,s:1,d:0},5335:{g:5335,gn:"谷城县（其他）",y:5335,s:0,d:0}}},420626:{g:420626,gn:"保康县",y:5336,s:1,d:5336,l:{5336:{g:5336,gn:"保康县（城关镇）",y:5336,s:1,d:0},5337:{g:5337,gn:"保康县（其他）",y:5337,s:0,d:0}}},420682:{g:420682,gn:"老河口",y:5342,s:1,d:5342,l:{5342:{g:5342,gn:"老河口（光化街道）",y:5342,s:1,d:0},5343:{g:5343,gn:"老河口（酂阳街道）",y:5343,s:1,d:0},5344:{g:5344,gn:"老河口（其他）",y:5344,s:0,d:0}}},420683:{g:420683,gn:"枣阳市",y:5326,s:1,d:5326,l:{5326:{g:5326,gn:"枣阳市（北城街道、南城街道、环城街道）",y:5326,s:1,d:0},5327:{g:5327,gn:"枣阳市（新市镇）",y:5327,s:1,d:0},5328:{g:5328,gn:"枣阳市（其他）",y:5328,s:0,d:0}}},420684:{g:420684,gn:"宜城市",y:5329,s:1,d:5329,l:{5329:{g:5329,gn:"宜城市（鄢城街道、宜城经济开发区）",y:5329,s:1,d:0},5330:{g:5330,gn:"宜城市（南营街道）",y:5330,s:1,d:0},5331:{g:5331,gn:"宜城市（其他）",y:5331,s:0,d:0}}}}},420700:{g:420700,gn:"鄂州市",y:1394,s:1,d:420702,l:{420702:{g:420702,gn:"梁子湖",y:5374,s:1,d:5374,l:{5374:{g:5374,gn:"梁子湖（太和镇、东沟镇、沼山镇、涂家垴镇、梁子镇（梁子生态管理区））",y:5374,s:1,d:0},5375:{g:5375,gn:"梁子湖（其他）",y:5375,s:0,d:0}}},420703:{g:420703,gn:"华容区",y:5372,s:1,d:5372,l:{5372:{g:5372,gn:"华容区（华容镇、庙岭镇、段店镇、葛店镇、临江乡、蒲团乡）",y:5372,s:1,d:0},5373:{g:5373,gn:"华容区（其他）",y:5373,s:0,d:0}}},420704:{g:420704,gn:"鄂城区",y:4409,s:1,d:4409,l:{4409:{g:4409,gn:"鄂城区（其他）",y:4409,s:0,d:0},5376:{g:5376,gn:"鄂城区（新庙镇、花湖镇、杨叶镇、碧石渡镇、汀祖镇）",y:5376,s:1,d:0},6882:{g:6882,gn:"鄂城区（古楼街道、凤凰街道、樊口街道、西山街道）",y:6882,s:0,d:0},6883:{g:6883,gn:"鄂城区（燕矶镇、泽林镇、长港镇、杜山镇、沙窝乡）",y:6883,s:0,d:0}}}}},420800:{g:420800,gn:"荆门市",y:1425,s:1,d:420802,l:{420802:{g:420802,gn:"东宝区",y:5436,s:1,d:5436,l:{5436:{g:5436,gn:"东宝区（龙泉街道、泉口街道）",y:5436,s:1,d:0},5437:{g:5437,gn:"东宝区（其他）",y:5437,s:0,d:0}}},420804:{g:420804,gn:"掇刀区",y:5444,s:1,d:5444,l:{5444:{g:5444,gn:"掇刀区（掇刀石街道、白庙街道 ）",y:5444,s:1,d:0},5445:{g:5445,gn:"掇刀区（其他）",y:5445,s:0,d:0}}},420821:{g:420821,gn:"京山县",y:5440,s:1,d:5440,l:{5440:{g:5440,gn:"京山县（新市镇）",y:5440,s:1,d:0},5441:{g:5441,gn:"京山县（其他）",y:5441,s:0,d:0}}},420822:{g:420822,gn:"沙洋县",y:5442,s:1,d:5442,l:{5442:{g:5442,gn:"沙洋县（沙洋镇）",y:5442,s:1,d:0},5443:{g:5443,gn:"沙洋县（其他）",y:5443,s:0,d:0}}},420881:{g:420881,gn:"钟祥市",y:5438,s:1,d:5438,l:{5438:{g:5438,gn:"钟祥市（郢中街道 ）",y:5438,s:1,d:0},5439:{g:5439,gn:"钟祥市（其他）",y:5439,s:0,d:0}}}}},420900:{g:420900,gn:"孝感市",y:1398,s:1,d:420902,l:{420902:{g:420902,gn:"孝南区",y:4420,s:1,d:4420,l:{4420:{g:4420,gn:"孝南区（其他）",y:4420,s:0,d:0},5403:{g:5403,gn:"孝南区（杨店镇、陡岗镇、肖港镇、毛陈镇、三汊镇、祝站镇）",y:5403,s:0,d:0},5404:{g:5404,gn:"孝南区（新铺镇、卧龙乡、朋兴乡、闵集乡、西河镇）",y:5404,s:1,d:0},6191:{g:6191,gn:"孝南区（车站街道、广场街道、毛陈镇、书院街道、新华街道）",y:6191,s:0,d:0}}},420921:{g:420921,gn:"孝昌县",y:5399,s:1,d:5399,l:{5399:{g:5399,gn:"孝昌县（卫店镇、王店镇、小河镇、周巷镇、丰山镇 ）",y:5399,s:1,d:0},5400:{g:5400,gn:"孝昌县（邹岗镇、白沙镇、花西乡、季店乡、小悟乡、陡山乡 ）",y:5400,s:1,d:0},5401:{g:5401,gn:"孝昌县（其他 ）",y:5401,s:0,d:0},6190:{g:6190,gn:"孝昌县（花园镇）",y:6190,s:0,d:0}}},420922:{g:420922,gn:"大悟县",y:5395,s:1,d:5395,l:{5395:{g:5395,gn:"大悟县（阳平镇、芳畈镇、新城镇、夏店镇、刘集镇 ）",y:5395,s:1,d:0},5396:{g:5396,gn:"大悟县（河口镇、四姑镇、吕王镇、黄站镇、宣化店镇、丰店镇）",y:5396,s:1,d:0},5397:{g:5397,gn:"大悟县（大新镇、三里城镇、东新乡、高店乡、彭店乡）",y:5397,s:1,d:0},5398:{g:5398,gn:"大悟县（其他）",y:5398,s:0,d:0},6188:{g:6188,gn:"大悟县（城关镇）",y:6188,s:0,d:0}}},420923:{g:420923,gn:"云梦县",y:5392,s:1,d:5392,l:{5392:{g:5392,gn:"云梦县（义堂镇、曾店镇、吴铺镇、伍洛镇、下辛店镇）",y:5392,s:1,d:0},5393:{g:5393,gn:"云梦县（道桥镇、隔蒲潭镇、胡金店镇、倒店乡、沙河乡、清明河乡）",y:5393,s:1,d:0},5394:{g:5394,gn:"云梦县（其他）",y:5394,s:0,d:0},6193:{g:6193,gn:"云梦县（城关镇）",y:6193,s:0,d:0}}},420981:{g:420981,gn:"应城市",y:5379,s:1,d:5379,l:{5379:{g:5379,gn:"应城市（城北街道、四里棚街道、东马坊街道）",y:5379,s:1,d:0},5380:{g:5380,gn:"应城市（长江埠街道、田店镇、杨河镇、三合镇、郎君镇）",y:5380,s:1,d:0},5381:{g:5381,gn:"应城市（黄滩镇、天鹅镇、义和镇、陈河镇、杨岭镇、汤池镇）",y:5381,s:1,d:0},5382:{g:5382,gn:"应城市（其他）",y:5382,s:0,d:0},6192:{g:6192,gn:"应城市（城中街道）",y:6192,s:0,d:0}}},420982:{g:420982,gn:"安陆市",y:5383,s:1,d:5383,l:{5383:{g:5383,gn:"安陆市（赵棚镇、李店镇、巡店镇 ）",y:5383,s:1,d:0},5384:{g:5384,gn:"安陆市（ 棠棣镇、王义贞镇、雷公镇、孛畈镇、烟店镇、洑水镇）",y:5384,s:1,d:0},5385:{g:5385,gn:"安陆市（陈店乡、辛榨乡、木梓乡、接官乡）",y:5385,s:1,d:0},5386:{g:5386,gn:"安陆市（其他）",y:5386,s:0,d:0},6187:{g:6187,gn:"安陆市（府城街道、南城街道）",y:6187,s:0,d:0}}},420984:{g:420984,gn:"汉川市",y:5387,s:1,d:5387,l:{5387:{g:5387,gn:"汉川市（分水镇、杨林沟镇）",y:5387,s:1,d:0},5388:{g:5388,gn:"汉川市（脉旺镇、田二河镇、沉湖镇、垌冢镇、新堰镇）",y:5388,s:1,d:0},5389:{g:5389,gn:"汉川市（庙头镇、刘家隔镇、麻河镇、回龙镇、马鞍乡 ）",y:5389,s:1,d:0},5390:{g:5390,gn:"汉川市（里潭乡、西江乡、南河乡、湾潭乡、韩集乡）",y:5390,s:1,d:0},5391:{g:5391,gn:"汉川市（其他）",y:5391,s:0,d:0},6189:{g:6189,gn:"汉川市（城隍镇、马口镇、仙女山街道、新河镇）",y:6189,s:0,d:0}}}}},421000:{g:421000,gn:"荆州市",y:1385,s:1,d:421002,l:{421002:{g:421002,gn:"沙市区",y:4416,s:1,d:4416,l:{4416:{g:4416,gn:"沙市区（其他）",y:4416,s:0,d:0},5371:{g:5371,gn:"沙市区（观音垱镇、岑河原种场、沙市农场）",y:5371,s:1,d:0}}},421003:{g:421003,gn:"荆州区",y:5357,s:1,d:5357,l:{5357:{g:5357,gn:"荆州区（城南街道、东城街道、海湖村、湖北省荆州城南经济开发区）",y:5357,s:1,d:0},5358:{g:5358,gn:"荆州区（其他）",y:5358,s:0,d:0},6234:{g:6234,gn:"荆州区（黄山村、澎湖村、西城街道、郢北村、郢城镇）",y:6234,s:0,d:0}}},421022:{g:421022,gn:"公安县",y:5367,s:1,d:5367,l:{5367:{g:5367,gn:"公安县（斗湖堤、斗湖堤镇）",y:5367,s:1,d:0},5368:{g:5368,gn:"公安县（其他）",y:5368,s:0,d:0}}},421023:{g:421023,gn:"监利县",y:5365,s:1,d:5365,l:{5365:{g:5365,gn:"监利县（容城镇）",y:5365,s:1,d:0},5366:{g:5366,gn:"监利县（其他）",y:5366,s:0,d:0}}},421024:{g:421024,gn:"江陵县",y:5369,s:1,d:5369,l:{5369:{g:5369,gn:"江陵县（城关镇）",y:5369,s:1,d:0},5370:{g:5370,gn:"江陵县（其他）",y:5370,s:0,d:0},6233:{g:6233,gn:"江陵县（郝穴镇）",y:6233,s:0,d:0}}},421081:{g:421081,gn:"石首市",y:5361,s:1,d:5361,l:{5361:{g:5361,gn:"石首市（绣林街道、笔架山街道）",y:5361,s:1,d:0},5362:{g:5362,gn:"石首市（其他）",y:5362,s:0,d:0}}},421083:{g:421083,gn:"洪湖市",y:5359,s:1,d:5359,l:{5359:{g:5359,gn:"洪湖市（新堤街道）",y:5359,s:1,d:0},5360:{g:5360,gn:"洪湖市（其他）",y:5360,s:0,d:0},6232:{g:6232,gn:"洪湖市（滨湖街道）",y:6232,s:0,d:0}}},421087:{g:421087,gn:"松滋市",y:5363,s:1,d:5363,l:{5363:{g:5363,gn:"松滋市（新江口镇）",y:5363,s:1,d:0},5364:{g:5364,gn:"松滋市（其他）",y:5364,s:0,d:0}}}}},421100:{g:421100,gn:"黄冈市",y:1407,s:1,d:421102,l:{421102:{g:421102,gn:"黄州区",y:4391,s:1,d:4391,l:{4391:{g:4391,gn:"黄州区（其他）",y:4391,s:0,d:0},5423:{g:5423,gn:"黄州区（赤壁街道、东湖街道、禹王街道、南湖街道 ）",y:5423,s:1,d:0}}},421121:{g:421121,gn:"团风县",y:5421,s:1,d:5421,l:{5421:{g:5421,gn:"团风县（城北工业园、城南工业园、团风镇）",y:5421,s:1,d:0},5422:{g:5422,gn:"团风县（其他）",y:5422,s:0,d:0}}},421122:{g:421122,gn:"红安县",y:5409,s:1,d:5409,l:{5409:{g:5409,gn:"红安县（城关镇）",y:5409,s:1,d:0},5410:{g:5410,gn:"红安县（其他）",y:5410,s:0,d:0}}},421123:{g:421123,gn:"罗田县",y:5411,s:1,d:5411,l:{5411:{g:5411,gn:"罗田县（凤山镇、罗田经济开发区）",y:5411,s:1,d:0},5412:{g:5412,gn:"罗田县（其他）",y:5412,s:0,d:0}}},421124:{g:421124,gn:"英山县",y:5419,s:1,d:5419,l:{5419:{g:5419,gn:"英山县（温泉镇）",y:5419,s:1,d:0},5420:{g:5420,gn:"英山县（其他）",y:5420,s:0,d:0}}},421125:{g:421125,gn:"浠水县",y:5413,s:1,d:5413,l:{5413:{g:5413,gn:"浠水县（清泉镇 ）",y:5413,s:1,d:0},5414:{g:5414,gn:"浠水县（其他 ）",y:5414,s:0,d:0}}},421126:{g:421126,gn:"蕲春县",y:5415,s:1,d:5415,l:{5415:{g:5415,gn:"蕲春县（漕河镇）",y:5415,s:1,d:0},5416:{g:5416,gn:"蕲春县（其他 ）",y:5416,s:0,d:0}}},421127:{g:421127,gn:"黄梅县",y:5417,s:1,d:5417,l:{5417:{g:5417,gn:"黄梅县（黄梅镇）",y:5417,s:1,d:0},5418:{g:5418,gn:"黄梅县（其他）",y:5418,s:0,d:0}}},421181:{g:421181,gn:"麻城市",y:5405,s:1,d:5405,l:{5405:{g:5405,gn:"麻城市（南湖街道、岐亭镇）",y:5405,s:1,d:0},5406:{g:5406,gn:"麻城市（其他）",y:5406,s:0,d:0},6698:{g:6698,gn:"麻城市（鼓楼街道、龙池桥街道、麻城市黄金桥开发区）",y:6698,s:0,d:0}}},421182:{g:421182,gn:"武穴市",y:5407,s:1,d:5407,l:{5407:{g:5407,gn:"武穴市（武穴街道、刊江街道）",y:5407,s:1,d:0},5408:{g:5408,gn:"武穴市（其他）",y:5408,s:0,d:0}}}}},421200:{g:421200,gn:"咸宁市",y:1418,s:1,d:421202,l:{421202:{g:421202,gn:"咸安区",y:5424,s:1,d:5424,l:{5424:{g:5424,gn:"咸安区（浮山街道、永安街道、温泉街道）",y:5424,s:1,d:0},5425:{g:5425,gn:"咸安区（其他）",y:5425,s:0,d:0}}},421221:{g:421221,gn:"嘉鱼县",y:5428,s:1,d:5428,l:{5428:{g:5428,gn:"嘉鱼县（鱼岳镇）",y:5428,s:1,d:0},5429:{g:5429,gn:"嘉鱼县（其他）",y:5429,s:0,d:0}}},421222:{g:421222,gn:"通城县",y:5434,s:1,d:5434,l:{5434:{g:5434,gn:"通城县（隽水镇）",y:5434,s:1,d:0},5435:{g:5435,gn:"通城县（其他）",y:5435,s:0,d:0}}},421223:{g:421223,gn:"崇阳县",y:5432,s:1,d:5432,l:{5432:{g:5432,gn:"崇阳县（天城镇）",y:5432,s:1,d:0},5433:{g:5433,gn:"崇阳县（其他）",y:5433,s:0,d:0}}},421224:{g:421224,gn:"通山县",y:5430,s:1,d:5430,l:{5430:{g:5430,gn:"通山县（通羊镇 ）",y:5430,s:1,d:0},5431:{g:5431,gn:"通山县（其他 ）",y:5431,s:0,d:0}}},421281:{g:421281,gn:"赤壁市",y:5426,s:1,d:5426,l:{5426:{g:5426,gn:"赤壁市（赤马港街道、陆水湖街道、蒲圻街道）",y:5426,s:1,d:0},5427:{g:5427,gn:"赤壁市（其他）",y:5427,s:0,d:0}}}}},421300:{g:421300,gn:"随州市",y:1431,s:0,d:421303,l:{421303:{g:421303,gn:"曾都区",y:5451,s:0,d:5451,l:{5451:{g:5451,gn:"曾都区（其他）",y:5451,s:0,d:0},6141:{g:6141,gn:"曾都区（府河镇、何店镇、洛阳镇、万店镇）",y:6141,s:0,d:0}}},421321:{g:421321,gn:"随县",y:6139,s:0,d:6139,l:{6139:{g:6139,gn:"随县（厉山镇）",y:6139,s:0,d:0},6140:{g:6140,gn:"随县（其他）",y:6140,s:0,d:0}}},421381:{g:421381,gn:"广水市",y:5455,s:0,d:5455,l:{5455:{g:5455,gn:"广水市（其他）",y:5455,s:0,d:0},6135:{g:6135,gn:"广水市（广水街道、十里街道、应山街道）",y:6135,s:0,d:0},6136:{g:6136,gn:"广水市（陈巷镇 长岭镇 马坪镇 余店镇 关庙镇 吴店镇）",y:6136,s:0,d:0},6137:{g:6137,gn:"广水市（郝店镇 蔡河镇 太平乡 城郊乡 骆店乡 李店乡）",y:6137,s:0,d:0},6138:{g:6138,gn:"广水市（ 武胜关镇 杨寨镇）",y:6138,s:0,d:0}}}}},422800:{g:422800,gn:"恩施土家族苗族自治州",y:1445,s:0,d:422801,l:{422801:{g:422801,gn:"恩施市",y:1446,s:0,d:0},422802:{g:422802,gn:"利川市",y:1447,s:0,d:0},422822:{g:422822,gn:"建始县",y:1448,s:0,d:0},422823:{g:422823,gn:"巴东县",y:1450,s:0,d:0},422825:{g:422825,gn:"宣恩县",y:1452,s:0,d:0},422826:{g:422826,gn:"咸丰县",y:1453,s:0,d:0},422827:{g:422827,gn:"来凤县",y:1449,s:0,d:0},422828:{g:422828,gn:"鹤峰县",y:1451,s:0,d:0}}},429000:{g:429000,gn:"省直辖行政单位",y:1434,s:1,d:429004,l:{429004:{g:429004,gn:"仙桃市",y:1436,s:1,d:0},429005:{g:429005,gn:"潜江市",y:1437,s:1,d:0},429006:{g:429006,gn:"天门市",y:1435,s:1,d:0},429021:{g:429021,gn:"神农架林区",y:1438,s:0,d:0}}}}},430000:{g:430000,gn:"湖南省",y:1454,s:0,d:430100,l:{430100:{g:430100,gn:"长沙市",y:1455,s:1,d:430102,l:{430102:{g:430102,gn:"芙蓉区",y:5162,s:0,d:5162,l:{5162:{g:5162,gn:"芙蓉区（文艺路、朝阳街、韭菜园、定王台、五里牌、马王堆、东屯渡、荷花园、火星、湘湖街道）",y:5162,s:0,d:0},5163:{g:5163,gn:"芙蓉区（东岸、东湖、马坡岭街道）",y:5163,s:0,d:0}}},430103:{g:430103,gn:"天心区",y:5166,s:0,d:5166,l:{5166:{g:5166,gn:"天心区（书院路、坡子街、学院街、城南路、金盆岭、裕南路）",y:5166,s:0,d:0},5174:{g:5174,gn:"天心区（ 新开铺街道、桂花坪街道、青园街道）",y:5174,s:0,d:0}}},430104:{g:430104,gn:"岳麓区",y:5152,s:1,d:5152,l:{5152:{g:5152,gn:"岳麓区（望月湖、桔子州、银盆岭、观沙岭街道）",y:5152,s:1,d:0},5153:{g:5153,gn:"岳麓区（咸嘉湖街道、望月坡街道、学士街道）",y:5153,s:1,d:0},5154:{g:5154,gn:"岳麓区（望岳街道、麓谷街道、东方红镇、西湖街道）",y:5154,s:1,d:0},5155:{g:5155,gn:"岳麓区（坪塘、含浦、雨敞坪、莲花、洋湖、梅溪湖、岳麓街道）",y:5155,s:1,d:0}}},430105:{g:430105,gn:"开福区",y:5167,s:0,d:5167,l:{5167:{g:5167,gn:"开福区（东风路、清水塘、望麓园、湘雅路、伍家岭、通泰街、四方坪、新河街道）",y:5167,s:0,d:0},6079:{g:6079,gn:"开福区（其他）",y:6079,s:0,d:0},6080:{g:6080,gn:"开福区（捞刀河镇、新港镇、青竹湖镇、洪山旅游区）",y:6080,s:0,d:0}}},430111:{g:430111,gn:"雨花区",y:5164,s:0,d:5164,l:{5164:{g:5164,gn:"雨花区（候家塘、左家塘、花亭、雨花亭、砂子塘、高桥街道）",y:5164,s:0,d:0},5175:{g:5175,gn:"雨花区（雨花亭街道、井湾子街道、 圭塘街道、洞井铺街道、汽车南站）",y:5175,s:0,d:0},6085:{g:6085,gn:"雨花区（其他）",y:6085,s:0,d:0}}},430112:{g:430112,gn:"望城区",y:6084,s:0,d:6084,l:{6084:{g:6084,gn:"望城区（白沙洲街道、大泽湖街道、高塘岭街道、高塘岭镇、喻家坡街道、月亮岛街道）",y:6084,s:0,d:0},6088:{g:6088,gn:"望城区（其他）",y:6088,s:0,d:0}}},430121:{g:430121,gn:"长沙县",y:5460,s:0,d:5460,l:{5460:{g:5460,gn:"长沙县（其他）",y:5460,s:0,d:0},6077:{g:6077,gn:"长沙县（安沙镇、白沙乡、长龙街道、江背镇）",y:6077,s:0,d:0},6431:{g:6431,gn:"长沙县（星沙街道、泉塘街道、湘龙街道）",y:6431,s:0,d:0},6432:{g:6432,gn:"长沙县（星沙镇，除星沙街道外）",y:6432,s:0,d:0},6433:{g:6433,gn:"长沙县（榔梨街道、榔梨镇、暮云镇）",y:6433,s:0,d:0}}},430124:{g:430124,gn:"宁乡县",y:5465,s:0,d:5465,l:{5465:{g:5465,gn:"宁乡县（其他）",y:5465,s:0,d:0},6082:{g:6082,gn:"宁乡县（白马桥乡、城郊乡、回龙铺镇、金洲新区）",y:6082,s:0,d:0},6083:{g:6083,gn:"宁乡县（历经铺乡、宁乡经济开发区、夏铎铺镇、玉潭镇）",y:6083,s:0,d:0}}},430181:{g:430181,gn:"浏阳市",y:6081,s:0,d:6081,l:{6081:{g:6081,gn:"浏阳市（北盛镇、洞阳镇、关口街道、荷花街道、淮川街道、集里街道、永安镇）",y:6081,s:0,d:0},6087:{g:6087,gn:"浏阳市（其他）",y:6087,s:0,d:0}}}}},430200:{g:430200,gn:"株洲市",y:1465,s:0,d:430281,l:{430202:{g:430202,gn:"荷塘区",y:5468,s:0,d:5468,l:{5468:{g:5468,gn:"荷塘区（仙庾镇、明照乡）",y:5468,s:0,d:0},5469:{g:5469,gn:"荷塘区（其他）",y:5469,s:0,d:0}}},430203:{g:430203,gn:"芦淞区",y:5470,s:0,d:5470,l:{5470:{g:5470,gn:"芦淞区（白关镇、五里墩乡、姚家坝乡）",y:5470,s:0,d:0},5471:{g:5471,gn:"芦淞区（其他）",y:5471,s:0,d:0}}},430204:{g:430204,gn:"石峰区",y:5472,s:0,d:5472,l:{5472:{g:5472,gn:"石峰区（云田乡、铜塘湾街道）",y:5472,s:0,d:0},5473:{g:5473,gn:"石峰区(其他)",y:5473,s:0,d:0}}},430211:{g:430211,gn:"天元区",y:5466,s:0,d:5466,l:{5466:{g:5466,gn:"天元区（栗雨街道、嵩山路街道、泰山路街道）",y:5466,s:0,d:0},5467:{g:5467,gn:"天元区（其他）",y:5467,s:0,d:0}}},430221:{g:430221,gn:"株洲县",y:1467,s:0,d:1467,l:{1467:{g:1467,gn:"株洲县（其他）",y:1467,s:0,d:0},6269:{g:6269,gn:"株洲县（渌口镇）",y:6269,s:0,d:0}}},430223:{g:430223,gn:"攸县",y:1470,s:0,d:1470,l:{1470:{g:1470,gn:"攸县（其他）",y:1470,s:0,d:0},6268:{g:6268,gn:"攸县（贾山乡、江桥街道、联星街道）",y:6268,s:0,d:0}}},430224:{g:430224,gn:"茶陵县",y:1469,s:0,d:0},430225:{g:430225,gn:"炎陵县",y:1468,s:0,d:0},430281:{g:430281,gn:"醴陵市",y:1466,s:0,d:1466,l:{1466:{g:1466,gn:"醴陵市（其他）",y:1466,s:0,d:0},6266:{g:6266,gn:"醴陵市（东富镇、黄泥坳街道、嘉树乡、来龙门街道、浦口镇）",y:6266,s:0,d:0},6267:{g:6267,gn:"醴陵市（泗汾镇、孙家湾乡、王仙镇、西山街道、阳三街道）",y:6267,s:0,d:0}}}}},430300:{g:430300,gn:"湘潭市",y:1475,s:0,d:430302,l:{430302:{g:430302,gn:"雨湖区",y:5476,s:0,d:5476,l:{5476:{g:5476,gn:"雨湖区（其他）",y:5476,s:0,d:0},6147:{g:6147,gn:"雨湖区（城正街街道、广场街道、平政路街道、窑湾街道）",y:6147,s:0,d:0},6148:{g:6148,gn:"雨湖区（雨湖路街道、云塘街道、中山路街道、羊牯塘街道）",y:6148,s:0,d:0}}},430304:{g:430304,gn:"岳塘区",y:5480,s:0,d:5480,l:{5480:{g:5480,gn:"岳塘区（其他）",y:5480,s:0,d:0},6149:{g:6149,gn:"岳塘区（板塘乡、荷塘物流园、荷塘乡、霞城乡）",y:6149,s:0,d:0},6150:{g:6150,gn:"岳塘区（易家湾镇、昭山旅游开发区、昭山乡）",y:6150,s:0,d:0}}},430321:{g:430321,gn:"湘潭县",y:6144,s:0,d:6144,l:{6144:{g:6144,gn:"湘潭县（易俗河镇）",y:6144,s:0,d:0},6145:{g:6145,gn:"湘潭县（其他）",y:6145,s:0,d:0}}},430381:{g:430381,gn:"湘乡市",y:5482,s:0,d:5482,l:{5482:{g:5482,gn:"湘乡市（其他）",y:5482,s:0,d:0},6146:{g:6146,gn:"湘乡市（东山街道、昆仑桥街道、望春门街道、新湘路街道）",y:6146,s:0,d:0}}},430382:{g:430382,gn:"韶山市",y:1478,s:0,d:0}}},430400:{g:430400,gn:"衡阳市",y:1481,s:1,d:430481,l:{430405:{g:430405,gn:"珠晖区",y:5485,s:0,d:5485,l:{5485:{g:5485,gn:"珠晖区（茶山坳镇、东阳渡镇、和平乡、金甲岭农场、酃湖乡）",y:5485,s:0,d:0},5486:{g:5486,gn:"珠晖区（其他）",y:5486,s:0,d:0}}},430406:{g:430406,gn:"雁峰区",y:5483,s:0,d:5483,l:{5483:{g:5483,gn:"雁峰区（湘江农场、湘江乡、岳屏镇）",y:5483,s:0,d:0},5484:{g:5484,gn:"雁峰区（其他）",y:5484,s:0,d:0}}},430407:{g:430407,gn:"石鼓区",y:5487,s:0,d:5487,l:{5487:{g:5487,gn:"石鼓区（角山乡、松木乡）",y:5487,s:0,d:0},5488:{g:5488,gn:"石鼓区（其他)",y:5488,s:0,d:0}}},430408:{g:430408,gn:"蒸湘区",y:5489,s:0,d:5489,l:{5489:{g:5489,gn:"蒸湘区（长湖乡、呆鹰岭镇、雨母山乡）",y:5489,s:0,d:0},5490:{g:5490,gn:"蒸湘区(其他)",y:5490,s:0,d:0}}},430412:{g:430412,gn:"南岳区",y:1491,s:0,d:0},430421:{g:430421,gn:"衡阳县",y:1484,s:1,d:1484,l:{1484:{g:1484,gn:"衡阳县（西渡镇）",y:1484,s:1,d:0},6412:{g:6412,gn:"衡阳县（其他）",y:6412,s:0,d:0}}},430422:{g:430422,gn:"衡南县",y:1487,s:0,d:0},430423:{g:430423,gn:"衡山县",y:1486,s:0,d:0},430424:{g:430424,gn:"衡东县",y:1485,s:0,d:1485,l:{1485:{g:1485,gn:"衡东县（城关镇）",y:1485,s:0,d:0},6411:{g:6411,gn:"衡东县（其他）",y:6411,s:0,d:0}}},430426:{g:430426,gn:"祁东县",y:1488,s:0,d:1488,l:{1488:{g:1488,gn:"祁东县（洪桥镇）",y:1488,s:0,d:0},6414:{g:6414,gn:"祁东县（其他）",y:6414,s:0,d:0}}},430481:{g:430481,gn:"耒阳市",y:1482,s:0,d:1482,l:{1482:{g:1482,gn:"耒阳市（蔡子池街道、三顺街道、水东江街道、五里牌街道、灶市街道）",y:1482,s:0,d:0},6413:{g:6413,gn:"耒阳市（其他）",y:6413,s:0,d:0}}},430482:{g:430482,gn:"常宁市",y:1483,s:0,d:1483,l:{1483:{g:1483,gn:"常宁市（培元街道、泉峰街道、宜阳街道）",y:1483,s:0,d:0},6410:{g:6410,gn:"常宁市（其他）",y:6410,s:0,d:0}}}}},430500:{g:430500,gn:"邵阳市",y:1494,s:0,d:430502,l:{430502:{g:430502,gn:"双清区",y:5545,s:0,d:5545,l:{5545:{g:5545,gn:"双清区(兴隆街道、小江湖街道、桥头街道、汽车站街道、龙须塘街道)",y:5545,s:0,d:0},5546:{g:5546,gn:"双清区(其他)",y:5546,s:0,d:0}}},430503:{g:430503,gn:"大祥区",y:5547,s:0,d:5547,l:{5547:{g:5547,gn:"大祥区(中心路街道、城北路街道、城西路街道、百春园街道、红旗路街道、翠园街道)",y:5547,s:0,d:0},5551:{g:5551,gn:"大祥区(其他)",y:5551,s:0,d:0}}},430511:{g:430511,gn:"北塔区",y:5549,s:0,d:5549,l:{5549:{g:5549,gn:"北塔区(状元洲街道)",y:5549,s:0,d:0},5550:{g:5550,gn:"北塔区(其他)",y:5550,s:0,d:0}}},430521:{g:430521,gn:"邵东县",y:1499,s:0,d:0},430522:{g:430522,gn:"新邵县",y:1501,s:0,d:0},430523:{g:430523,gn:"邵阳县",y:1504,s:0,d:0},430524:{g:430524,gn:"隆回县",y:1505,s:0,d:0},430525:{g:430525,gn:"洞口县",y:1500,s:0,d:0},430527:{g:430527,gn:"绥宁县",y:1502,s:0,d:0},430528:{g:430528,gn:"新宁县",y:1503,s:0,d:0},430529:{g:430529,gn:"城步苗族自治县",y:1506,s:0,d:0},430581:{g:430581,gn:"武冈市",y:1498,s:0,d:0}}},430600:{g:430600,gn:"岳阳市",y:1507,s:1,d:430682,l:{6249:{g:6249,gn:"屈原管理区",y:6249,s:0,d:0},430602:{g:430602,gn:"岳阳楼区",y:5501,s:0,d:5501,l:{5501:{g:5501,gn:"岳阳楼区（康王乡、三荷乡、西塘镇）",y:5501,s:0,d:0},5502:{g:5502,gn:"岳阳楼区(其他）",y:5502,s:0,d:0}}},430603:{g:430603,gn:"云溪区",y:1516,s:1,d:1516,l:{1516:{g:1516,gn:"云溪区（道仁矶镇、永济乡、云溪乡）",y:1516,s:1,d:0},6252:{g:6252,gn:"云溪区（其他）",y:6252,s:0,d:0}}},430611:{g:430611,gn:"君山区",y:1515,s:1,d:1515,l:{1515:{g:1515,gn:"君山区（柳林洲镇、西城街道）",y:1515,s:1,d:0},6244:{g:6244,gn:"君山区（其他）",y:6244,s:0,d:0}}},430621:{g:430621,gn:"岳阳县",y:1510,s:0,d:1510,l:{1510:{g:1510,gn:"岳阳县（城关镇）",y:1510,s:0,d:0},6251:{g:6251,gn:"岳阳县（其他）",y:6251,s:0,d:0}}},430623:{g:430623,gn:"华容县",y:1513,s:0,d:1513,l:{1513:{g:1513,gn:"华容县（城关镇）",y:1513,s:0,d:0},6243:{g:6243,gn:"华容县（其他）",y:6243,s:0,d:0}}},430624:{g:430624,gn:"湘阴县",y:1511,s:0,d:1511,l:{1511:{g:1511,gn:"湘阴县（文星镇）",y:1511,s:0,d:0},6250:{g:6250,gn:"湘阴县（其他）",y:6250,s:0,d:0}}},430626:{g:430626,gn:"平江县",y:1512,s:0,d:1512,l:{1512:{g:1512,gn:"平江县（汉昌镇）",y:1512,s:0,d:0},6248:{g:6248,gn:"平江县（其他）",y:6248,s:0,d:0}}},430681:{g:430681,gn:"汨罗市",y:1509,s:0,d:1509,l:{1509:{g:1509,gn:"汨罗市（城关镇）",y:1509,s:0,d:0},6247:{g:6247,gn:"汨罗市（其他）",y:6247,s:0,d:0}}},430682:{g:430682,gn:"临湘市",y:1508,s:0,d:1508,l:{1508:{g:1508,gn:"临湘市（长安街道、桃矿街道）",y:1508,s:0,d:0},6245:{g:6245,gn:"临湘市（其他）",y:6245,s:0,d:0}}}}},430700:{g:430700,gn:"常德市",y:1517,s:0,d:430702,l:{430702:{g:430702,gn:"武陵区",y:5503,s:0,d:5503,l:{5503:{g:5503,gn:"武陵区（三岔路街道、东江乡、东郊乡、丹洲乡、南坪岗乡、城东街道）",y:5503,s:0,d:0},5504:{g:5504,gn:"武陵区（城北街道、城西街道、德山街道、德山镇、柳叶湖旅游渡假区）",y:5504,s:0,d:0},5505:{g:5505,gn:"武陵区（其他）",y:5505,s:0,d:0}}},430703:{g:430703,gn:"鼎城区",y:5506,s:0,d:5506,l:{5506:{g:5506,gn:"鼎城区（武陵镇）",y:5506,s:0,d:0},5507:{g:5507,gn:"鼎城区（其他）",y:5507,s:0,d:0}}},430721:{g:430721,gn:"安乡县",y:1525,s:0,d:0},430722:{g:430722,gn:"汉寿县",y:1524,s:0,d:0},430723:{g:430723,gn:"澧县",y:1521,s:0,d:0},430724:{g:430724,gn:"临澧县",y:1522,s:0,d:0},430725:{g:430725,gn:"桃源县",y:1523,s:0,d:0},430726:{g:430726,gn:"石门县",y:1526,s:0,d:0},430781:{g:430781,gn:"津市市",y:1520,s:0,d:0}}},430800:{g:430800,gn:"张家界市",y:1527,s:0,d:430821,l:{430802:{g:430802,gn:"永定区",y:5523,s:0,d:5523,l:{5523:{g:5523,gn:"永定区（南庄坪街道、大庸桥街道、官黎坪街道、崇文街道、永定街道、西溪坪街道）",y:5523,s:0,d:0},5524:{g:5524,gn:"永定区（其他）",y:5524,s:0,d:0}}},430811:{g:430811,gn:"武陵源区",y:1531,s:0,d:0},430821:{g:430821,gn:"慈利县",y:1528,s:0,d:0},430822:{g:430822,gn:"桑植县",y:1529,s:0,d:0}}},430900:{g:430900,gn:"益阳市",y:1575,s:0,d:6426,l:{6426:{g:6426,gn:"大通湖区",y:6426,s:0,d:0},430902:{g:430902,gn:"资阳区",y:5521,s:0,d:5521,l:{5521:{g:5521,gn:"资阳区（大码头街道、汽车路街道）",y:5521,s:0,d:0},5522:{g:5522,gn:"资阳区（其他）",y:5522,s:0,d:0}}},430903:{g:430903,gn:"赫山区",y:5519,s:0,d:5519,l:{5519:{g:5519,gn:"赫山区（朝阳街道、赫山街道、会龙山街道、金银山街道）",y:5519,s:0,d:0},5520:{g:5520,gn:"赫山区（其他）",y:5520,s:0,d:0},6430:{g:6430,gn:"赫山区（兰溪镇、桃花仑街道、谢林港镇）",y:6430,s:0,d:0}}},430921:{g:430921,gn:"南县",y:1580,s:0,d:1580,l:{1580:{g:1580,gn:"南县（南洲镇）",y:1580,s:0,d:0},6427:{g:6427,gn:"南县（其他）",y:6427,s:0,d:0}}},430922:{g:430922,gn:"桃江县",y:1579,s:0,d:1579,l:{1579:{g:1579,gn:"桃江县（桃花江镇）",y:1579,s:0,d:0},6428:{g:6428,gn:"桃江县（其他）",y:6428,s:0,d:0}}},430923:{g:430923,gn:"安化县",y:1581,s:0,d:1581,l:{1581:{g:1581,gn:"安化县（东坪镇）",y:1581,s:0,d:0},6425:{g:6425,gn:"安化县（其他）",y:6425,s:0,d:0}}},430981:{g:430981,gn:"沅江市",y:1578,s:0,d:1578,l:{1578:{g:1578,gn:"沅江市（庆云山街道、琼湖街道）",y:1578,s:0,d:0},6429:{g:6429,gn:"沅江市（其他）",y:6429,s:0,d:0}}}}},431000:{g:431000,gn:"郴州市",y:1538,s:0,d:431002,l:{431002:{g:431002,gn:"北湖区",y:5510,s:0,d:5510,l:{5510:{g:5510,gn:"北湖区（下湄桥街道、北湖街道、燕泉街道、郴江镇）",y:5510,s:0,d:0},5511:{g:5511,gn:"北湖区（其他）",y:5511,s:0,d:0}}},431003:{g:431003,gn:"苏仙区",y:5512,s:0,d:5512,l:{5512:{g:5512,gn:"苏仙区（南塔街道、苏仙岭街道）",y:5512,s:0,d:0},5513:{g:5513,gn:"苏仙区（其他）",y:5513,s:0,d:0}}},431021:{g:431021,gn:"桂阳县",y:1549,s:0,d:0},431022:{g:431022,gn:"宜章县",y:1542,s:0,d:0},431023:{g:431023,gn:"永兴县",y:1548,s:0,d:0},431024:{g:431024,gn:"嘉禾县",y:1545,s:0,d:0},431025:{g:431025,gn:"临武县",y:1546,s:0,d:0},431026:{g:431026,gn:"汝城县",y:1543,s:0,d:0},431027:{g:431027,gn:"桂东县",y:1547,s:0,d:0},431028:{g:431028,gn:"安仁县",y:1544,s:0,d:0},431081:{g:431081,gn:"资兴市",y:1541,s:0,d:0}}},431100:{g:431100,gn:"永州市",y:1550,s:0,d:431121,l:{431102:{g:431102,gn:"零陵区",y:5515,s:0,d:5515,l:{5515:{g:5515,gn:"零陵区（七里店街道、南津渡街道、徐家井街道、朝阳街道）",y:5515,s:0,d:0},5516:{g:5516,gn:"零陵区（其他）",y:5516,s:0,d:0}}},431103:{g:431103,gn:"冷水滩区",y:1561,s:0,d:0},431121:{g:431121,gn:"祁阳县",y:1551,s:0,d:0},431122:{g:431122,gn:"东安县",y:1555,s:0,d:0},431123:{g:431123,gn:"双牌县",y:1558,s:0,d:0},431124:{g:431124,gn:"道县",y:1557,s:0,d:0},431125:{g:431125,gn:"江永县",y:1556,s:0,d:0},431126:{g:431126,gn:"宁远县",y:1553,s:0,d:0},431127:{g:431127,gn:"蓝山县",y:1552,s:0,d:0},431128:{g:431128,gn:"新田县",y:1554,s:0,d:0},431129:{g:431129,gn:"江华瑶族自治县",y:1559,s:0,d:0}}},431200:{g:431200,gn:"怀化市",y:1562,s:0,d:431202,l:{431202:{g:431202,gn:"鹤城区",y:5517,s:0,d:5517,l:{5517:{g:5517,gn:"鹤城区（坨院街道、城中街道、河西街道、石门乡、红星街道、迎丰街道）",y:5517,s:0,d:0},5518:{g:5518,gn:"鹤城区（其他）",y:5518,s:0,d:0}}},431221:{g:431221,gn:"中方县",y:1569,s:0,d:0},431222:{g:431222,gn:"沅陵县",y:1566,s:0,d:0},431223:{g:431223,gn:"辰溪县",y:1567,s:0,d:0},431224:{g:431224,gn:"溆浦县",y:1568,s:0,d:0},431225:{g:431225,gn:"会同县",y:1565,s:0,d:0},431226:{g:431226,gn:"麻阳苗族自治县",y:1574,s:0,d:0},431227:{g:431227,gn:"新晃侗族自治县",y:1570,s:0,d:0},431228:{g:431228,gn:"芷江侗族自治县",y:1571,s:0,d:0},431229:{g:431229,gn:"靖州苗族侗族自治县",y:1573,s:0,d:0},431230:{g:431230,gn:"通道侗族自治县",y:1572,s:0,d:0},431281:{g:431281,gn:"洪江市",y:1564,s:0,d:0}}},431300:{g:431300,gn:"娄底市",y:1532,s:0,d:431381,l:{431302:{g:431302,gn:"娄星区",y:5508,s:0,d:5508,l:{5508:{g:5508,gn:"娄星区（乐坪街道、大科街道、涟滨街道、花山街道、长青街道、黄泥塘街道）",y:5508,s:0,d:0},5509:{g:5509,gn:"娄星区（其他）",y:5509,s:0,d:0}}},431321:{g:431321,gn:"双峰县",y:1536,s:0,d:0},431322:{g:431322,gn:"新化县",y:1535,s:0,d:0},431381:{g:431381,gn:"冷水江市",y:1533,s:0,d:0},431382:{g:431382,gn:"涟源市",y:1534,s:0,d:0}}},433100:{g:433100,gn:"湘西土家苗族自治州",y:1582,s:0,d:433101,l:{433101:{g:433101,gn:"吉首市",y:5525,s:0,d:5525,l:{5525:{g:5525,gn:"吉首市（乾州街道、峒河街道）",y:5525,s:0,d:0},5526:{g:5526,gn:"吉首市（其他）",y:5526,s:0,d:0}}},433122:{g:433122,gn:"泸溪县",y:1588,s:0,d:0},433123:{g:433123,gn:"凤凰县",y:1587,s:0,d:0},433124:{g:433124,gn:"花垣县",y:1590,s:0,d:0},433125:{g:433125,gn:"保靖县",y:1589,s:0,d:0},433126:{g:433126,gn:"古丈县",y:1584,s:0,d:0},433127:{g:433127,gn:"永顺县",y:1586,s:0,d:0},433130:{g:433130,gn:"龙山县",y:1585,s:0,d:0}}}}},440000:{g:440000,gn:"广东省",y:403,s:1,d:440300,l:{440100:{g:440100,gn:"广州市",y:404,s:1,d:440104,l:{6591:{g:6591,gn:"广州大学城自提（大学城北地铁A出口13549884554）",y:6591,s:0,d:0},440103:{g:440103,gn:"荔湾区",y:5092,s:0,d:0},440104:{g:440104,gn:"越秀区",y:3763,s:0,d:0},440105:{g:440105,gn:"海珠区",y:418,s:0,d:0},440106:{g:440106,gn:"天河区",y:5085,s:0,d:0},440111:{g:440111,gn:"白云区",y:414,s:1,d:414,l:{414:{g:414,gn:"白云区（其他）",y:414,s:1,d:0},5563:{g:5563,gn:"白云区（金沙洲、神山镇、良田镇）",y:5563,s:0,d:0},5700:{g:5700,gn:"白云区（雅瑶镇、人和镇、钟落潭镇、竹料镇）",y:5700,s:0,d:0}}},440112:{g:440112,gn:"黄埔区",y:415,s:1,d:415,l:{415:{g:415,gn:"黄埔区（其他）",y:415,s:1,d:0},3762:{g:3762,gn:"黄埔区（广园快速以南，广澳高速以西，珠江以北）",y:3762,s:1,d:0}}},440113:{g:440113,gn:"番禺区",y:4042,s:0,d:4042,l:{4042:{g:4042,gn:"番禺区（其他）",y:4042,s:0,d:0},5086:{g:5086,gn:"番禺区(市桥、东环、钟村、桥南、沙湾街办)",y:5086,s:0,d:0},5087:{g:5087,gn:"番禺区(大石、南村、沙头、大龙街办、广州大学城)",y:5087,s:0,d:0}}},440114:{g:440114,gn:"花都区",y:405,s:1,d:405,l:{405:{g:405,gn:"花都区（新华镇、雅瑶镇、花山镇）",y:405,s:1,d:0},4026:{g:4026,gn:"花都区（其它）",y:4026,s:0,d:0}}},440115:{g:440115,gn:"南沙区",y:3499,s:1,d:3499,l:{3499:{g:3499,gn:"南沙区（南沙街道、黄阁镇）",y:3499,s:1,d:0},4025:{g:4025,gn:"南沙区（其它）",y:4025,s:0,d:0}}},440116:{g:440116,gn:"萝岗区",y:3500,s:1,d:0},440183:{g:440183,gn:"增城市",y:408,s:1,d:0},440184:{g:440184,gn:"从化市",y:407,s:1,d:407,l:{407:{g:407,gn:"从化市（街口镇）",y:407,s:1,d:0},4043:{g:4043,gn:"从化市（其它）",y:4043,s:0,d:0}}}}},440200:{g:440200,gn:"韶关市",y:441,s:1,d:440281,l:{3909:{g:3909,gn:"启明路以东、新华路以西、北江大桥以南、良村公路以北",y:3909,s:1,d:0},440203:{g:440203,gn:"武江区",y:452,s:0,d:0},440204:{g:440204,gn:"浈江区",y:451,s:0,d:0},440205:{g:440205,gn:"曲江县",y:447,s:0,d:0},440222:{g:440222,gn:"始兴县",y:445,s:0,d:0},440224:{g:440224,gn:"仁化县",y:444,s:0,d:0},440229:{g:440229,gn:"翁源县",y:446,s:0,d:0},440232:{g:440232,gn:"乳源瑶族自治县",y:449,s:0,d:0},440233:{g:440233,gn:"新丰县",y:448,s:0,d:0},440281:{g:440281,gn:"乐昌市",y:442,s:0,d:0},440282:{g:440282,gn:"南雄市",y:443,s:0,d:0}}},440300:{g:440300,gn:"深圳市",y:420,s:1,d:440304,l:{3605:{g:3605,gn:"光明新区",y:3605,s:1,d:0},440303:{g:440303,gn:"罗湖区",y:422,s:1,d:0},440304:{g:440304,gn:"福田区",y:421,s:1,d:0},440305:{g:440305,gn:"南山区",y:427,s:1,d:0},440306:{g:440306,gn:"宝安区",y:424,s:1,d:424,l:{424:{g:424,gn:"宝安区（除西乡镇，观澜镇，龙华镇）",y:424,s:1,d:0},5159:{g:5159,gn:"宝安区（西乡镇）",y:5159,s:1,d:0},5161:{g:5161,gn:"宝安区（观澜镇，龙华镇）",y:5161,s:1,d:0}}},440307:{g:440307,gn:"龙岗区",y:425,s:1,d:425,l:{425:{g:425,gn:"龙岗区（葵涌，大鹏，南澳）",y:425,s:1,d:0},3732:{g:3732,gn:"龙岗区（布吉镇）",y:3732,s:1,d:0},3746:{g:3746,gn:"龙岗区（坂田镇）",y:3746,s:1,d:0},3925:{g:3925,gn:"龙岗区（龙岗镇,坪山,平湖,坪地）",y:3925,s:1,d:0},6537:{g:6537,gn:"龙岗区（横岗镇）",y:6537,s:0,d:0}}},440308:{g:440308,gn:"盐田区",y:426,s:1,d:0}}},440400:{g:440400,gn:"珠海市",y:428,s:1,d:440403,l:{440402:{g:440402,gn:"香洲区",y:430,s:1,d:430,l:{430:{g:430,gn:"香洲区（新香洲、老香洲、前山、吉大、拱北)",y:430,s:0,d:0},3541:{g:3541,gn:"吉大区",y:3541,s:0,d:0},3602:{g:3602,gn:"拱北区",y:3602,s:0,d:0},4242:{g:4242,gn:"香洲区（其他)",y:4242,s:1,d:0}}},440403:{g:440403,gn:"斗门区",y:429,s:0,d:0},440404:{g:440404,gn:"金湾区",y:431,s:1,d:431,l:{431:{g:431,gn:"金湾区(除横琴镇、珠海机场)",y:431,s:1,d:0},4022:{g:4022,gn:"金湾区（其它）",y:4022,s:1,d:0}}}}},440500:{g:440500,gn:"汕头市",y:432,s:1,d:440515,l:{440507:{g:440507,gn:"龙湖区",y:437,s:1,d:0},440511:{g:440511,gn:"金平区",y:3505,s:1,d:0},440512:{g:440512,gn:"濠江区",y:3591,s:1,d:0},440513:{g:440513,gn:"潮阳区",y:3454,s:0,d:434,l:{434:{g:434,gn:"潮阳市",y:434,s:0,d:0}}},440514:{g:440514,gn:"潮南区",y:3590,s:0,d:0},440515:{g:440515,gn:"澄海区",y:3462,s:1,d:433,l:{433:{g:433,gn:"澄海市",y:433,s:1,d:0}}},440523:{g:440523,gn:"南澳县",y:435,s:0,d:0}}},440600:{g:440600,gn:"佛山市",y:492,s:1,d:440606,l:{440604:{g:440604,gn:"禅城区",y:497,s:1,d:497,l:{497:{g:497,gn:"禅城区（南庄镇）",y:497,s:1,d:0},5139:{g:5139,gn:"禅城区（市区 张槎 石湾 澜石）",y:5139,s:0,d:0}}},440605:{g:440605,gn:"南海区",y:494,s:1,d:0},440606:{g:440606,gn:"顺德区",y:493,s:0,d:0},440607:{g:440607,gn:"三水区",y:495,s:0,d:0},440608:{g:440608,gn:"高明区",y:496,s:0,d:0}}},440700:{g:440700,gn:"江门市",y:484,s:1,d:440781,l:{440703:{g:440703,gn:"蓬江区",y:491,s:1,d:491,l:{491:{g:491,gn:"蓬江区(其他)",y:491,s:0,d:0},3845:{g:3845,gn:"蓬江区（除棠下镇、荷塘镇、杜阮镇）",y:3845,s:1,d:0}}},440704:{g:440704,gn:"江海区",y:490,s:1,d:0},440705:{g:440705,gn:"新会区",y:486,s:1,d:486,l:{486:{g:486,gn:"新会区(其它)",y:486,s:0,d:0},3864:{g:3864,gn:"新会区（江门水道西,圭峰路东,南坦海以北）",y:3864,s:1,d:0}}},440781:{g:440781,gn:"台山市",y:485,s:0,d:0},440783:{g:440783,gn:"开平市",y:487,s:0,d:0},440784:{g:440784,gn:"鹤山市",y:488,s:0,d:0},440785:{g:440785,gn:"恩平市",y:489,s:0,d:0}}},440800:{g:440800,gn:"湛江市",y:505,s:1,d:440881,l:{3843:{g:3843,gn:"经济技术开发区",y:3843,s:0,d:0},440802:{g:440802,gn:"赤坎区",y:509,s:1,d:509,l:{509:{g:509,gn:"赤坎区(其他)",y:509,s:0,d:0},3904:{g:3904,gn:"赤坎区(除调顺岛)",y:3904,s:1,d:0}}},440803:{g:440803,gn:"霞山区",y:510,s:1,d:510,l:{510:{g:510,gn:"霞山区(其它)",y:510,s:0,d:0},3903:{g:3903,gn:"霞山区（除湖光镇、东海岛）",y:3903,s:1,d:0}}},440804:{g:440804,gn:"坡头区",y:511,s:0,d:0},440811:{g:440811,gn:"麻章区",y:512,s:0,d:0},440823:{g:440823,gn:"遂溪县",y:513,s:0,d:0},440825:{g:440825,gn:"徐闻县",y:514,s:0,d:0},440881:{g:440881,gn:"廉江市",y:506,s:0,d:0},440882:{g:440882,gn:"雷州市",y:507,s:0,d:0},440883:{g:440883,gn:"吴川市",y:508,s:0,d:0}}},440900:{g:440900,gn:"茂名市",y:515,s:1,d:440981,l:{3429:{g:3429,gn:"渡桥北西",y:3429,s:0,d:0},3885:{g:3885,gn:"东至高水公路、南至站前路、西至红旗路、北至官渡路",y:3885,s:1,d:0},440902:{g:440902,gn:"茂南区",y:520,s:0,d:0},440903:{g:440903,gn:"茂港区",y:521,s:0,d:0},440923:{g:440923,gn:"电白县",y:519,s:0,d:0},440981:{g:440981,gn:"高州市",y:516,s:0,d:0},440982:{g:440982,gn:"化州市",y:517,s:0,d:0},440983:{g:440983,gn:"信宜市",y:518,s:0,d:0}}},441200:{g:441200,gn:"肇庆市",y:522,s:1,d:441283,l:{441202:{g:441202,gn:"端州区",y:529,s:1,d:0},441203:{g:441203,gn:"鼎湖区",y:530,s:0,d:0},441223:{g:441223,gn:"广宁县",y:525,s:0,d:0},441224:{g:441224,gn:"怀集县",y:528,s:0,d:0},441225:{g:441225,gn:"封开县",y:527,s:0,d:0},441226:{g:441226,gn:"德庆县",y:526,s:0,d:0},441283:{g:441283,gn:"高要市",y:523,s:1,d:523,l:{523:{g:523,gn:"高要市(其他)",y:523,s:0,d:0},3886:{g:3886,gn:"高要市（南岸镇、金渡镇、科技学院高要学区）",y:3886,s:1,d:0}}},441284:{g:441284,gn:"四会市",y:524,s:0,d:0}}},441300:{g:441300,gn:"惠州市",y:469,s:1,d:470,l:{470:{g:470,gn:"惠阳市（除大亚湾塘布村、 霞涌）",y:470,s:1,d:0},441302:{g:441302,gn:"惠城区",y:474,s:1,d:474,l:{474:{g:474,gn:"惠城区（除横沥 芦洲 大岚 光明林场）",y:474,s:1,d:0},4024:{g:4024,gn:"惠城区（其它）",y:4024,s:0,d:0}}},441303:{g:441303,gn:"惠阳市",y:4023,s:0,d:4023,l:{4023:{g:4023,gn:"惠阳市（其它）",y:4023,s:0,d:0}}},441322:{g:441322,gn:"博罗县",y:472,s:0,d:0},441323:{g:441323,gn:"惠东县",y:471,s:0,d:0},441324:{g:441324,gn:"龙门县",y:473,s:0,d:0}}},441400:{g:441400,gn:"梅州市",y:460,s:1,d:441481,l:{441402:{g:441402,gn:"梅江区",y:468,s:1,d:3887,l:{3887:{g:3887,gn:"梅江区（环市北路以南、中环东路以北）",y:3887,s:1,d:0}}},441421:{g:441421,gn:"梅县",y:462,s:0,d:0},441422:{g:441422,gn:"大埔县",y:464,s:0,d:0},441423:{g:441423,gn:"丰顺县",y:465,s:0,d:0},441424:{g:441424,gn:"五华县",y:466,s:0,d:0},441426:{g:441426,gn:"平远县",y:467,s:0,d:0},441427:{g:441427,gn:"蕉岭县",y:463,s:0,d:0},441481:{g:441481,gn:"兴宁县",y:461,s:0,d:0}}},441500:{g:441500,gn:"汕尾市",y:475,s:1,d:441581,l:{441502:{g:441502,gn:"城区",y:479,s:1,d:479,l:{479:{g:479,gn:"城区(其他)",y:479,s:1,d:0},3844:{g:3844,gn:"城区(红草镇、东涌镇、马宫街道)",y:3844,s:1,d:0}}},441521:{g:441521,gn:"海丰县",y:477,s:1,d:477,l:{477:{g:477,gn:"海丰县(其他)",y:477,s:0,d:0},3863:{g:3863,gn:"海丰县（海城镇）",y:3863,s:1,d:0}}},441523:{g:441523,gn:"陆河县",y:478,s:0,d:0},441581:{g:441581,gn:"陆丰市",y:476,s:0,d:0}}},441600:{g:441600,gn:"河源市",y:453,s:1,d:441624,l:{441602:{g:441602,gn:"源城区",y:459,s:1,d:0},441621:{g:441621,gn:"紫金县",y:456,s:1,d:456,l:{456:{g:456,gn:"紫金县(其他)",y:456,s:0,d:0},3882:{g:3882,gn:"紫金县(临江镇)",y:3882,s:1,d:0}}},441622:{g:441622,gn:"龙川县",y:455,s:0,d:0},441623:{g:441623,gn:"连平县",y:457,s:0,d:0},441624:{g:441624,gn:"和平县",y:454,s:0,d:0},441625:{g:441625,gn:"东源县",y:458,s:1,d:458,l:{458:{g:458,gn:"东源县(其他)",y:458,s:0,d:0},3902:{g:3902,gn:"东源县(仙塘镇)",y:3902,s:1,d:0}}}}},441700:{g:441700,gn:"阳江市",y:499,s:1,d:441702,l:{441702:{g:441702,gn:"江城区",y:504,s:1,d:504,l:{504:{g:504,gn:"江城区(其他)",y:504,s:0,d:0},3907:{g:3907,gn:"江城区（建设路以东、江台路以北、金山路以南）",y:3907,s:1,d:0}}},441721:{g:441721,gn:"阳西县",y:502,s:0,d:0},441723:{g:441723,gn:"阳东县",y:503,s:1,d:503,l:{503:{g:503,gn:"阳东县(其他)",y:503,s:0,d:0},3908:{g:3908,gn:"阳东县（龙塘路以西、新华路以北、金山路以南）",y:3908,s:1,d:0}}},441781:{g:441781,gn:"阳春市",y:501,s:0,d:0}}},441800:{g:441800,gn:"清远市",y:531,s:1,d:441881,l:{3565:{g:3565,gn:"新城区",y:3565,s:0,d:0},441802:{g:441802,gn:"清城区",y:538,s:1,d:538,l:{538:{g:538,gn:"清城区(其他)",y:538,s:0,d:0},3883:{g:3883,gn:"清城区(环城路以南、清新大道以北)",y:3883,s:1,d:0}}},441821:{g:441821,gn:"佛冈县",y:534,s:0,d:0},441823:{g:441823,gn:"阳山县",y:535,s:0,d:0},441825:{g:441825,gn:"连山壮族瑶族自治县",y:536,s:0,d:0},441826:{g:441826,gn:"连南瑶族自治县",y:537,s:0,d:0},441827:{g:441827,gn:"清新县",y:539,s:0,d:0},441881:{g:441881,gn:"英德市",y:532,s:0,d:0},441882:{g:441882,gn:"连州市",y:533,s:0,d:0}}},441900:{g:441900,gn:"东莞市",y:480,s:1,d:481,l:{481:{g:481,gn:"东莞市(虎门镇）",y:481,s:1,d:0},4282:{g:4282,gn:"东莞市(其它)",y:4282,s:0,d:0},6542:{g:6542,gn:"东莞市（东城区、南城区、莞城区）",y:6542,s:0,d:0}}},442000:{g:442000,gn:"中山市",y:482,s:1,d:483,l:{483:{g:483,gn:"中山市（其它）",y:483,s:1,d:0},4142:{g:4142,gn:"中山市（东区、南区、西区、北区、石岐区街道办）",y:4142,s:0,d:0},5097:{g:5097,gn:"火炬开发区",y:5097,s:0,d:0}}},445100:{g:445100,gn:"潮州市",y:540,s:1,d:445121,l:{3884:{g:3884,gn:"枫溪区(其他)",y:3884,s:1,d:0},3906:{g:3906,gn:"枫溪区（外环北路以南，古竹公路以东，枫凤路以北）",y:3906,s:1,d:0},445102:{g:445102,gn:"湘桥区",y:543,s:1,d:543,l:{543:{g:543,gn:"湘桥区(其他)",y:543,s:1,d:0},3905:{g:3905,gn:"湘桥区（外环北路以南、韩江以西、提头村下村道以北）",y:3905,s:1,d:0}}},445121:{g:445121,gn:"潮安县",y:541,s:0,d:0},445122:{g:445122,gn:"饶平县",y:542,s:0,d:0}}},445200:{g:445200,gn:"揭阳市",y:544,s:1,d:445281,l:{3862:{g:3862,gn:"东山区",y:3862,s:1,d:0},445202:{g:445202,gn:"榕城区",y:549,s:1,d:0},445221:{g:445221,gn:"揭东县",y:546,s:0,d:0},445222:{g:445222,gn:"揭西县",y:547,s:0,d:0},445224:{g:445224,gn:"惠来县",y:548,s:0,d:0},445281:{g:445281,gn:"普宁市",y:545,s:0,d:0}}},445300:{g:445300,gn:"云浮市",y:550,s:0,d:445381,l:{445302:{g:445302,gn:"云城区",y:555,s:0,d:0},445321:{g:445321,gn:"新兴县",y:553,s:0,d:0},445322:{g:445322,gn:"郁南县",y:554,s:0,d:0},445323:{g:445323,gn:"云安县",y:552,s:0,d:0},445381:{g:445381,gn:"罗定市",y:551,s:0,d:0}}}}},450000:{g:450000,gn:"广西壮族自治区",y:556,s:0,d:450100,l:{450100:{g:450100,gn:"南宁市",y:600,s:0,d:450109,l:{450102:{g:450102,gn:"兴宁区",y:604,s:0,d:604,l:{604:{g:604,gn:"兴宁区（其他）",y:604,s:0,d:0},6544:{g:6544,gn:"兴宁区（朝阳街道、民生街道）",y:6544,s:0,d:0}}},450103:{g:450103,gn:"青秀区",y:3504,s:0,d:0},450105:{g:450105,gn:"江南区",y:607,s:0,d:0},450107:{g:450107,gn:"西乡塘区",y:3507,s:0,d:0},450108:{g:450108,gn:"良庆区",y:3593,s:0,d:0},450109:{g:450109,gn:"邕宁区",y:601,s:0,d:0},450122:{g:450122,gn:"武鸣县",y:602,s:0,d:0},450123:{g:450123,gn:"隆安县",y:617,s:0,d:0},450124:{g:450124,gn:"马山县",y:609,s:0,d:0},450125:{g:450125,gn:"上林县",y:612,s:0,d:0},450126:{g:450126,gn:"宾阳县",y:615,s:0,d:0},450127:{g:450127,gn:"横县",y:618,s:0,d:0}}},450200:{g:450200,gn:"柳州市",y:557,s:0,d:450221,l:{450202:{g:450202,gn:"城中区",y:560,s:0,d:0},450203:{g:450203,gn:"鱼峰区",y:561,s:0,d:0},450204:{g:450204,gn:"柳南区",y:563,s:0,d:0},450205:{g:450205,gn:"柳北区",y:562,s:0,d:0},450221:{g:450221,gn:"柳江县",y:558,s:0,d:0},450222:{g:450222,gn:"柳城县",y:559,s:0,d:0},450223:{g:450223,gn:"鹿寨县",y:564,s:0,d:0},450224:{g:450224,gn:"融安县",y:565,s:0,d:0},450225:{g:450225,gn:"融水苗族自治县",y:566,s:0,d:0},450226:{g:450226,gn:"三江侗族自治县",y:567,s:0,d:0}}},450300:{g:450300,gn:"桂林市",y:569,s:0,d:450321,l:{450302:{g:450302,gn:"秀峰区",y:582,s:0,d:582,l:{582:{g:582,gn:"秀峰区（其他）",y:582,s:0,d:0},6546:{g:6546,gn:"秀峰区（丽君街道、甲山街道、秀峰街道）",y:6546,s:0,d:0}}},450303:{g:450303,gn:"叠彩区",y:583,s:0,d:0},450304:{g:450304,gn:"象山区",y:584,s:0,d:0},450305:{g:450305,gn:"七星区",y:585,s:0,d:585,l:{585:{g:585,gn:"七星区（其他）",y:585,s:0,d:0},6545:{g:6545,gn:"七星区（七星区街道、东江街道、穿山街道、漓东街道、桂林华侨旅游经济区管理委员会）",y:6545,s:0,d:0}}},450311:{g:450311,gn:"雁山区",y:586,s:0,d:0},450321:{g:450321,gn:"阳朔县",y:570,s:0,d:0},450322:{g:450322,gn:"临桂县",y:571,s:0,d:0},450323:{g:450323,gn:"灵川县",y:572,s:0,d:0},450324:{g:450324,gn:"全州县",y:573,s:0,d:0},450325:{g:450325,gn:"兴安县",y:575,s:0,d:0},450326:{g:450326,gn:"永福县",y:579,s:0,d:0},450327:{g:450327,gn:"灌阳县",y:576,s:0,d:0},450328:{g:450328,gn:"龙胜各族自治县",y:580,s:0,d:0},450329:{g:450329,gn:"资源县",y:578,s:0,d:0},450330:{g:450330,gn:"平乐县",y:574,s:0,d:0},450331:{g:450331,gn:"荔浦县",y:577,s:0,d:0},450332:{g:450332,gn:"恭城瑶族自治县",y:581,s:0,d:0}}},450400:{g:450400,gn:"梧州市",y:587,s:0,d:450481,l:{450403:{g:450403,gn:"万秀区",y:592,s:0,d:0},450404:{g:450404,gn:"蝶山区",y:593,s:0,d:0},450405:{g:450405,gn:"长洲区",y:3592,s:0,d:0},450421:{g:450421,gn:"苍梧县",y:589,s:0,d:0},450422:{g:450422,gn:"藤县",y:590,s:0,d:0},450423:{g:450423,gn:"蒙山县",y:591,s:0,d:0},450481:{g:450481,gn:"岑溪市",y:588,s:0,d:0}}},450500:{g:450500,gn:"北海市",y:595,s:0,d:450521,l:{450502:{g:450502,gn:"海城区",y:597,s:0,d:597,l:{597:{g:597,gn:"海城区（其他）",y:597,s:0,d:0},6543:{g:6543,gn:"海城区（东街街道、中街街道、海角街道、西街街道、驿马街道、高德街道）",y:6543,s:0,d:0}}},450503:{g:450503,gn:"银海区",y:598,s:0,d:0},450512:{g:450512,gn:"铁山港区",y:599,s:0,d:0},450521:{g:450521,gn:"合浦县",y:596,s:0,d:0}}},450600:{g:450600,gn:"防城港市",y:652,s:0,d:450681,l:{450602:{g:450602,gn:"港口区",y:654,s:0,d:0},450603:{g:450603,gn:"防城区",y:655,s:0,d:0},450621:{g:450621,gn:"上思县",y:656,s:0,d:0},450681:{g:450681,gn:"东兴市",y:653,s:0,d:0}}},450700:{g:450700,gn:"钦州市",y:657,s:0,d:450721,l:{450702:{g:450702,gn:"钦南区",y:660,s:0,d:0},450703:{g:450703,gn:"钦北区",y:661,s:0,d:0},450721:{g:450721,gn:"灵山县",y:658,s:0,d:0},450722:{g:450722,gn:"浦北县",y:659,s:0,d:0}}},450800:{g:450800,gn:"贵港市",y:663,s:0,d:450881,l:{450802:{g:450802,gn:"港北区",y:666,s:0,d:0},450803:{g:450803,gn:"港南区",y:667,s:0,d:0},450804:{g:450804,gn:"覃塘区",y:3594,s:0,d:0},450821:{g:450821,gn:"平南县",y:665,s:0,d:0},450881:{g:450881,gn:"桂平市",y:664,s:0,d:0}}},450900:{g:450900,gn:"玉林市",y:621,s:0,d:450981,l:{450902:{g:450902,gn:"玉州区",y:626,s:0,d:0},450921:{g:450921,gn:"容县",y:627,s:0,d:0},450922:{g:450922,gn:"陆川县",y:623,s:0,d:0},450923:{g:450923,gn:"博白县",y:624,s:0,d:0},450924:{g:450924,gn:"兴业县",y:625,s:0,d:0},450981:{g:450981,gn:"北流市",y:622,s:0,d:0}}},451000:{g:451000,gn:"百色市",y:638,s:0,d:451002,l:{451002:{g:451002,gn:"右江区",y:650,s:0,d:0},451021:{g:451021,gn:"田阳县",y:644,s:0,d:0},451022:{g:451022,gn:"田东县",y:646,s:0,d:0},451023:{g:451023,gn:"平果县",y:651,s:0,d:0},451024:{g:451024,gn:"德保县",y:642,s:0,d:0},451025:{g:451025,gn:"靖西县",y:645,s:0,d:0},451026:{g:451026,gn:"那坡县",y:647,s:0,d:0},451027:{g:451027,gn:"凌云县",y:649,s:0,d:0},451028:{g:451028,gn:"乐业县",y:641,s:0,d:0},451029:{g:451029,gn:"田林县",y:643,s:0,d:0},451030:{g:451030,gn:"西林县",y:640,s:0,d:0},451031:{g:451031,gn:"隆林各族自治县",y:648,s:0,d:0}}},451100:{g:451100,gn:"贺州市",y:668,s:0,d:451102,l:{3922:{g:3922,gn:"平桂管理区",y:3922,s:0,d:0},451102:{g:451102,gn:"八步区",y:669,s:0,d:0},451121:{g:451121,gn:"昭平县",y:671,s:0,d:0},451122:{g:451122,gn:"钟山县",y:670,s:0,d:0},451123:{g:451123,gn:"富川瑶族自治县",y:672,s:0,d:0}}},451200:{g:451200,gn:"河池市",y:673,s:0,d:451281,l:{451202:{g:451202,gn:"金城江区",y:684,s:0,d:0},451221:{g:451221,gn:"南丹县",y:677,s:0,d:0},451222:{g:451222,gn:"天峨县",y:675,s:0,d:0},451223:{g:451223,gn:"凤山县",y:676,s:0,d:0},451224:{g:451224,gn:"东兰县",y:678,s:0,d:0},451225:{g:451225,gn:"罗城仫佬族自治县",y:680,s:0,d:0},451226:{g:451226,gn:"环江毛南族自治县",y:681,s:0,d:0},451227:{g:451227,gn:"巴马瑶族自治县",y:683,s:0,d:0},451228:{g:451228,gn:"都安瑶族自治县",y:679,s:0,d:0},451229:{g:451229,gn:"大化瑶族自治县",y:682,s:0,d:0},451281:{g:451281,gn:"宜州市",y:674,s:0,d:0}}},451300:{g:451300,gn:"来宾市",y:628,s:0,d:451302,l:{451302:{g:451302,gn:"兴宾区",y:629,s:0,d:0},451321:{g:451321,gn:"忻城县",y:634,s:0,d:0},451322:{g:451322,gn:"象州县",y:630,s:0,d:0},451323:{g:451323,gn:"武宣县",y:633,s:0,d:0},451324:{g:451324,gn:"金秀瑶族自治县",y:636,s:0,d:0},451381:{g:451381,gn:"合山市",y:631,s:0,d:0}}},451400:{g:451400,gn:"崇左市",y:685,s:0,d:451402,l:{451402:{g:451402,gn:"江州区",y:686,s:0,d:0},451421:{g:451421,gn:"扶绥县",y:688,s:0,d:0},451422:{g:451422,gn:"宁明县",y:691,s:0,d:0},451423:{g:451423,gn:"龙州县",y:692,s:0,d:0},451424:{g:451424,gn:"大新县",y:689,s:0,d:0},451425:{g:451425,gn:"天等县",y:690,s:0,d:0},451481:{g:451481,gn:"凭祥市",y:687,s:0,d:0}}}}},460000:{g:460000,gn:"海南省",y:789,s:1,d:460100,l:{460100:{g:460100,gn:"海口市",y:790,s:1,d:460105,l:{460105:{g:460105,gn:"秀英区",y:5537,s:1,d:5537,l:{5537:{g:5537,gn:"秀英区（海秀街道、海秀镇、秀英街道 、长流镇 ）",y:5537,s:1,d:0},5538:{g:5538,gn:"秀英区（其他）",y:5538,s:0,d:0}}},460106:{g:460106,gn:"龙华区",y:5542,s:1,d:5542,l:{5542:{g:5542,gn:"龙华区（中山街道、城西镇、大同街道 、海垦街道  ）",y:5542,s:1,d:0},5543:{g:5543,gn:"龙华区（滨海街道 、金宇街道 、金贸街道  ）",y:5543,s:1,d:0},5544:{g:5544,gn:"龙华区（其他）",y:5544,s:0,d:0}}},460107:{g:460107,gn:"琼山区",y:5535,s:1,d:5535,l:{5535:{g:5535,gn:"琼山区（国兴街道）",y:5535,s:1,d:0},5536:{g:5536,gn:"琼山区（其他）",y:5536,s:0,d:0}}},460108:{g:460108,gn:"美兰区",y:5539,s:1,d:5539,l:{5539:{g:5539,gn:"美兰区（人民路街道 、博爱街道 、和平南街道 、新埠街道、海府街道  ）",y:5539,s:1,d:0},5540:{g:5540,gn:"美兰区（海甸街道  、白沙街道 、白龙街道  、蓝天街道  ）",y:5540,s:1,d:0},5541:{g:5541,gn:"美兰区（其他）",y:5541,s:0,d:0}}}}},460200:{g:460200,gn:"三亚市",y:795,s:1,d:5527,l:{5527:{g:5527,gn:"河东区",y:5527,s:1,d:0},5528:{g:5528,gn:"河西区",y:5528,s:1,d:0},5529:{g:5529,gn:"崖城镇",y:5529,s:0,d:0},5530:{g:5530,gn:"天涯镇",y:5530,s:0,d:0},5531:{g:5531,gn:"育才镇",y:5531,s:0,d:0},5532:{g:5532,gn:"凤凰镇",y:5532,s:0,d:0},5533:{g:5533,gn:"吉阳镇",y:5533,s:0,d:0},5534:{g:5534,gn:"海棠湾镇",y:5534,s:0,d:0}}},469000:{g:469000,gn:"省直辖行政单位",y:797,s:0,d:469001,l:{469001:{g:469001,gn:"五指山市",y:798,s:0,d:0},469002:{g:469002,gn:"琼海市",y:799,s:0,d:0},469003:{g:469003,gn:"儋州市",y:800,s:0,d:0},469005:{g:469005,gn:"文昌市",y:802,s:0,d:0},469006:{g:469006,gn:"万宁市",y:803,s:0,d:0},469007:{g:469007,gn:"东方市",y:804,s:0,d:0},469021:{g:469021,gn:"定安县",y:806,s:0,d:0},469022:{g:469022,gn:"屯昌县",y:807,s:0,d:0},469023:{g:469023,gn:"澄迈县",y:805,s:0,d:0},469024:{g:469024,gn:"临高县",y:808,s:0,d:0},469025:{g:469025,gn:"白沙黎族自治县",y:809,s:0,d:0},469026:{g:469026,gn:"昌江黎族自治县",y:810,s:0,d:0},469027:{g:469027,gn:"乐东黎族自治县",y:811,s:0,d:0},469028:{g:469028,gn:"陵水黎族自治县",y:812,s:0,d:0},469029:{g:469029,gn:"保亭黎族苗族自治县",y:801,s:0,d:0},469030:{g:469030,gn:"琼中黎族苗族自治县",y:813,s:0,d:0}}}}},500000:{g:500000,gn:"重庆市",y:158,s:1,d:500100,l:{500100:{g:500100,gn:"重庆市",y:159,s:1,d:500103,l:{200:{g:200,gn:"高新区",y:200,s:1,d:0},5931:{g:5931,gn:"彭水苗族土家族自治县（汉葭镇、绍庆街道）",y:5931,s:0,d:0},5932:{g:5932,gn:"彭水苗族土家族自治县（其他）",y:5932,s:0,d:0},5939:{g:5939,gn:"石柱土家族自治县（南宾镇）",y:5939,s:0,d:0},5940:{g:5940,gn:"石柱土家族自治县（其他）",y:5940,s:0,d:0},5941:{g:5941,gn:"双桥区（龙滩子街道、双路镇）",y:5941,s:0,d:0},5942:{g:5942,gn:"双桥区（其他）",y:5942,s:0,d:0},5946:{g:5946,gn:"万盛区（东林街道、万盛街道）",y:5946,s:0,d:0},5947:{g:5947,gn:"万盛区（其他）",y:5947,s:0,d:0},500101:{g:500101,gn:"万州区",y:5044,s:0,d:5044,l:{5044:{g:5044,gn:"万州区（其他）",y:5044,s:0,d:0},5948:{g:5948,gn:"万州区（百安街道、百安坝街道、陈家坝街道、高笋塘街道、龙都街道）",y:5948,s:0,d:0},5949:{g:5949,gn:"万州区（牌楼街道、沙河街道、双河口街道、太白街道、太白岩街道）",y:5949,s:0,d:0},5950:{g:5950,gn:"万州区（五桥街道、钟鼓楼街道、周家坝街道）",y:5950,s:0,d:0}}},500102:{g:500102,gn:"涪陵区",y:5917,s:0,d:5917,l:{5917:{g:5917,gn:"涪陵区（白涛镇、崇义街道、敦仁街道、江北街道）",y:5917,s:0,d:0},5918:{g:5918,gn:"涪陵区（江东街道、李渡镇、荔枝街道）",y:5918,s:0,d:0},5919:{g:5919,gn:"涪陵区（其他）",y:5919,s:0,d:0}}},500103:{g:500103,gn:"渝中区",y:182,s:1,d:0},500104:{g:500104,gn:"大渡口区",y:4093,s:1,d:4093,l:{4093:{g:4093,gn:"大渡口区（内环高速以内）",y:4093,s:1,d:0},6073:{g:6073,gn:"大渡口区（内环高速以外）",y:6073,s:0,d:0}}},500105:{g:500105,gn:"江北区",y:184,s:1,d:184,l:{184:{g:184,gn:"江北区（内环高速以内）",y:184,s:1,d:0},6074:{g:6074,gn:"江北区（内环高速以外）",y:6074,s:0,d:0}}},500106:{g:500106,gn:"沙坪坝区",y:185,s:1,d:185,l:{185:{g:185,gn:"沙坪坝区（内环以内，包括童家桥，瓷器口）",y:185,s:1,d:0},4091:{g:4091,gn:"沙坪坝区（其它）",y:4091,s:0,d:0},5456:{g:5456,gn:"沙坪坝区（内环外（大学城，虎溪镇，陈家桥镇））",y:5456,s:1,d:0},6041:{g:6041,gn:"沙坪坝区(土主镇、曾家镇、中梁镇)",y:6041,s:0,d:0}}},500107:{g:500107,gn:"九龙坡区",y:186,s:1,d:186,l:{186:{g:186,gn:"九龙坡区（内环高速以内）",y:186,s:1,d:0},6042:{g:6042,gn:"九龙坡区（内环高速以外）",y:6042,s:0,d:0}}},500108:{g:500108,gn:"南岸区",y:187,s:1,d:187,l:{187:{g:187,gn:"南岸区（内环高速以内）",y:187,s:1,d:0},6503:{g:6503,gn:"南岸区(内环高速以外，除茶园新区、长生镇以外）",y:6503,s:0,d:0},6504:{g:6504,gn:"南岸区（茶园新区、长生镇）",y:6504,s:0,d:0}}},500109:{g:500109,gn:"北碚区",y:5897,s:0,d:5897,l:{5897:{g:5897,gn:"北碚区（天生街道、朝阳街道、北温泉街道、东阳街道、龙凤桥街道）",y:5897,s:0,d:0},5899:{g:5899,gn:"北碚区（歇马镇、澄江镇、蔡家岗镇、童家溪镇、水土镇）",y:5899,s:0,d:0},5901:{g:5901,gn:"北碚区（其他）",y:5901,s:0,d:0}}},500110:{g:500110,gn:"綦江区",y:5933,s:0,d:5933,l:{5933:{g:5933,gn:"綦江区（东林街道、古南街道、三江街道、万盛街道、文龙街道）",y:5933,s:0,d:0},5934:{g:5934,gn:"綦江区（其他）",y:5934,s:0,d:0},5987:{g:5987,gn:"綦江区 （桥河街道 ）",y:5987,s:0,d:0}}},500111:{g:500111,gn:"大足区 ",y:5019,s:0,d:5019,l:{5019:{g:5019,gn:"大足区 （其他 ）",y:5019,s:0,d:0},5912:{g:5912,gn:"大足区（龙水街道、龙岗街道、棠香街道）",y:5912,s:0,d:0}}},500112:{g:500112,gn:"渝北区",y:191,s:1,d:191,l:{191:{g:191,gn:"渝北区（其它）",y:191,s:0,d:0},4073:{g:4073,gn:"渝北区（内环高速以内）",y:4073,s:1,d:0},4491:{g:4491,gn:"渝北区（大竹林，礼嘉镇，空港）",y:4491,s:1,d:0},4492:{g:4492,gn:"渝北区（渝北城区，人和，鸳鸯，翠云，回兴，两路街道）",y:4492,s:1,d:0}}},500113:{g:500113,gn:"巴南区",y:192,s:1,d:192,l:{192:{g:192,gn:"巴南区（其它）",y:192,s:0,d:0},5103:{g:5103,gn:"巴南区（李家沱，花溪，龙州湾，鱼洞，大江街道）",y:5103,s:1,d:0},5883:{g:5883,gn:"巴南区（南泉街道、一品街道、南彭街道、惠民街道、界石镇）",y:5883,s:0,d:0}}},500114:{g:500114,gn:"黔江区",y:5006,s:0,d:5006,l:{5006:{g:5006,gn:"黔江区（其他）",y:5006,s:0,d:0},5935:{g:5935,gn:"黔江区（城东街道、城南街道、城西街道）",y:5935,s:0,d:0},5936:{g:5936,gn:"黔江区（冯家街道、正阳街道、正阳镇、舟白街道）",y:5936,s:0,d:0}}},500115:{g:500115,gn:"长寿区",y:5007,s:0,d:5007,l:{5007:{g:5007,gn:"长寿区（其他）",y:5007,s:0,d:0},5906:{g:5906,gn:"长寿区（晏家街道、凤城街道、渡舟街道、江南街道）",y:5906,s:0,d:0}}},500116:{g:500116,gn:"江津区",y:5010,s:0,d:5010,l:{5010:{g:5010,gn:"江津区（其他）",y:5010,s:0,d:0},5922:{g:5922,gn:"江津区（白沙镇、德感街道、鼎山街道、几江街道）",y:5922,s:0,d:0},5923:{g:5923,gn:"江津区（珞璜镇、双福街道、双福镇）",y:5923,s:0,d:0}}},500117:{g:500117,gn:"合川区",y:5011,s:0,d:5011,l:{5011:{g:5011,gn:"合川区（其他）",y:5011,s:0,d:0},5920:{g:5920,gn:"合川区（草街街道、大石街道、钓鱼城街道、合阳城街道）",y:5920,s:0,d:0},5921:{g:5921,gn:"合川区（南津街道、盐井街道、云门街道）",y:5921,s:0,d:0}}},500118:{g:500118,gn:"永川区",y:5014,s:0,d:5014,l:{5014:{g:5014,gn:"永川区（其他）",y:5014,s:0,d:0},5957:{g:5957,gn:"永川区（茶山竹海街道、陈食街道、大安街道、南大街道）",y:5957,s:0,d:0},5958:{g:5958,gn:"永川区（胜利路街道、卫星湖街道、中山路街道）",y:5958,s:0,d:0}}},500119:{g:500119,gn:"南川区",y:5929,s:0,d:5929,l:{5929:{g:5929,gn:"南川区（东城街道、南城街道、西城街道）",y:5929,s:0,d:0},5930:{g:5930,gn:"南川区（其他）",y:5930,s:0,d:0}}},500223:{g:500223,gn:"潼南县 ",y:5021,s:1,d:5021,l:{5021:{g:5021,gn:"潼南县 （梓潼街道，桂林街道）",y:5021,s:1,d:0},5945:{g:5945,gn:"潼南县（其他）",y:5945,s:0,d:0}}},500224:{g:500224,gn:"铜梁县",y:5023,s:0,d:5023,l:{5023:{g:5023,gn:"铜梁县（其他）",y:5023,s:0,d:0},5943:{g:5943,gn:"铜梁县（巴川街道、东城街道、南城街道）",y:5943,s:0,d:0}}},500226:{g:500226,gn:"荣昌县",y:5026,s:0,d:5026,l:{5026:{g:5026,gn:"荣昌县（其他）",y:5026,s:0,d:0},5937:{g:5937,gn:"荣昌县（安富镇、昌元街道、昌州街道、峰高镇、广顺街道、双河镇）",y:5937,s:0,d:0}}},500227:{g:500227,gn:"璧山县",y:5027,s:0,d:5027,l:{5027:{g:5027,gn:"璧山县（其他）",y:5027,s:0,d:0},5904:{g:5904,gn:"璧山县（璧城街道、来凤街道、大路街道、丁家街道、青杠街道、璧泉街道）",y:5904,s:0,d:0}}},500228:{g:500228,gn:"梁平县",y:5927,s:0,d:5927,l:{5927:{g:5927,gn:"梁平县（梁山镇）",y:5927,s:0,d:0},5928:{g:5928,gn:"梁平县（其他）",y:5928,s:0,d:0},5986:{g:5986,gn:"梁平县（双桂街道）",y:5986,s:0,d:0}}},500229:{g:500229,gn:"城口县",y:5910,s:0,d:5910,l:{5910:{g:5910,gn:"城口县（葛城镇）",y:5910,s:0,d:0},5911:{g:5911,gn:"城口县（其他）",y:5911,s:0,d:0}}},500230:{g:500230,gn:"丰都县",y:5032,s:0,d:5032,l:{5032:{g:5032,gn:"丰都县（其他）",y:5032,s:0,d:0},5914:{g:5914,gn:"丰都县（三合镇）",y:5914,s:0,d:0}}},500231:{g:500231,gn:"垫江县",y:5033,s:0,d:5033,l:{5033:{g:5033,gn:"垫江县（其他）",y:5033,s:0,d:0},5913:{g:5913,gn:"垫江县（桂溪镇）",y:5913,s:0,d:0}}},500232:{g:500232,gn:"武隆县",y:5035,s:1,d:5035,l:{5035:{g:5035,gn:"武隆县（巷口镇）",y:5035,s:1,d:0},5036:{g:5036,gn:"武隆县（其他）",y:5036,s:0,d:0}}},500233:{g:500233,gn:"忠县",y:5039,s:1,d:5039,l:{5039:{g:5039,gn:"忠县（忠州镇）",y:5039,s:1,d:0},5040:{g:5040,gn:"忠县（其他）",y:5040,s:0,d:0}}},500234:{g:500234,gn:"开县",y:5924,s:0,d:5924,l:{5924:{g:5924,gn:"开县（白鹤街道、丰乐街道、汉丰街道、文峰街道）",y:5924,s:0,d:0},5925:{g:5925,gn:"开县（云枫街道、赵家街道、镇东街道）",y:5925,s:0,d:0},5926:{g:5926,gn:"开县（其他）",y:5926,s:0,d:0}}},500235:{g:500235,gn:"云阳县",y:5961,s:0,d:5961,l:{5961:{g:5961,gn:"云阳县（青龙街道、双江街道）",y:5961,s:0,d:0},5962:{g:5962,gn:"云阳县（其他）",y:5962,s:0,d:0}}},500236:{g:500236,gn:"奉节县",y:5915,s:0,d:5915,l:{5915:{g:5915,gn:"奉节县（永安镇）",y:5915,s:0,d:0},5916:{g:5916,gn:"奉节县（其他）",y:5916,s:0,d:0}}},500237:{g:500237,gn:"巫山县",y:5951,s:0,d:5951,l:{5951:{g:5951,gn:"巫山县（高唐街道、巫峡镇）",y:5951,s:0,d:0},5952:{g:5952,gn:"巫山县（其他）",y:5952,s:0,d:0}}},500238:{g:500238,gn:"巫溪县",y:5953,s:0,d:5953,l:{5953:{g:5953,gn:"巫溪县（城厢镇）",y:5953,s:0,d:0},5954:{g:5954,gn:"巫溪县（其他）",y:5954,s:0,d:0}}},500241:{g:500241,gn:"秀山土家族苗族自治县",y:5955,s:0,d:5955,l:{5955:{g:5955,gn:"秀山土家族苗族自治县（中平乡）",y:5955,s:0,d:0},5956:{g:5956,gn:"秀山土家族苗族自治县（其他）",y:5956,s:0,d:0}}},500242:{g:500242,gn:"酉阳土家族苗族自治县",y:5959,s:0,d:5959,l:{5959:{g:5959,gn:"酉阳土家族苗族自治县（钟多镇）",y:5959,s:0,d:0},5960:{g:5960,gn:"酉阳土家族苗族自治县（其他）",y:5960,s:0,d:0}}}}}}},510000:{g:510000,gn:"四川省",y:2652,s:0,d:510100,l:{510100:{g:510100,gn:"成都市",y:2653,s:1,d:6505,l:{6505:{g:6505,gn:"高新南区（三环以外）",y:6505,s:0,d:0},6506:{g:6506,gn:"高新西区",y:6506,s:0,d:0},510104:{g:510104,gn:"锦江区",y:5077,s:1,d:5077,l:{5077:{g:5077,gn:"锦江区（三环以内）",y:5077,s:0,d:0},5078:{g:5078,gn:"锦江区（三环以外）",y:5078,s:1,d:0},6404:{g:6404,gn:"锦江区（三环以外，绕城高速以内）",y:6404,s:0,d:0},6405:{g:6405,gn:"锦江区（绕城高速以外）",y:6405,s:0,d:0}}},510105:{g:510105,gn:"青羊区",y:5079,s:1,d:5079,l:{5079:{g:5079,gn:"青羊区（三环以外）",y:5079,s:1,d:0},5080:{g:5080,gn:"青羊区（三环以内）",y:5080,s:0,d:0},6401:{g:6401,gn:"青羊区（绕城高速以外）",y:6401,s:0,d:0}}},510106:{g:510106,gn:"金牛区",y:5075,s:1,d:5075,l:{5075:{g:5075,gn:"金牛区（三环以外,除西华街道，金泉街道）",y:5075,s:1,d:0},5076:{g:5076,gn:"金牛区（三环以内）",y:5076,s:0,d:0},5089:{g:5089,gn:"金牛区（西华街道，金泉街道）",y:5089,s:0,d:0}}},510107:{g:510107,gn:"武侯区",y:5081,s:1,d:5081,l:{5081:{g:5081,gn:"武侯区（三环以内）",y:5081,s:0,d:0},5082:{g:5082,gn:"武侯区（三环以外）",y:5082,s:1,d:0}}},510108:{g:510108,gn:"成华区",y:5073,s:1,d:5073,l:{5073:{g:5073,gn:"成华区（三环以内）",y:5073,s:1,d:0},5074:{g:5074,gn:"成华区（三环以外，除龙潭乡、龙潭开发区）",y:5074,s:0,d:0},5173:{g:5173,gn:"成华区（龙潭乡、龙潭开发区）",y:5173,s:0,d:0}}},510112:{g:510112,gn:"龙泉驿区",y:5169,s:0,d:5169,l:{5169:{g:5169,gn:"龙泉驿区（龙泉镇、大面镇、洪河镇、同安街办、十陵镇）",y:5169,s:0,d:0},5170:{g:5170,gn:"龙泉驿区（其他区域）",y:5170,s:0,d:0},5973:{g:5973,gn:"龙泉驿区（西河镇）",y:5973,s:0,d:0}}},510113:{g:510113,gn:"青白江区",y:5978,s:0,d:5978,l:{5978:{g:5978,gn:"青白江区（成都北新经济技术开发区、大同镇、大弯街道、红阳街道、弥牟镇）",y:5978,s:0,d:0},5979:{g:5979,gn:"青白江区（其他）",y:5979,s:0,d:0}}},510114:{g:510114,gn:"新都区",y:5171,s:0,d:5171,l:{5171:{g:5171,gn:"新都区（新都街道、三河镇、大丰镇、木兰镇、斑竹园镇）",y:5171,s:0,d:0},5172:{g:5172,gn:"新都区（其他区域）",y:5172,s:0,d:0},5984:{g:5984,gn:"新都区（大丰街道、龙桥镇、三河街道、新都工业开发区东区、新繁镇）",y:5984,s:0,d:0}}},510115:{g:510115,gn:"温江区",y:2659,s:1,d:2659,l:{2659:{g:2659,gn:"温江区（其他）",y:2659,s:1,d:0},5090:{g:5090,gn:"温江区（永宁镇）",y:5090,s:0,d:0},5983:{g:5983,gn:"温江区（公平街道、金马镇、柳城街道、天府街道、万春镇、永盛镇、涌泉街道）",y:5983,s:0,d:0}}},510121:{g:510121,gn:"金堂县",y:5970,s:0,d:5970,l:{5970:{g:5970,gn:"金堂县（赵镇）",y:5970,s:0,d:0},5971:{g:5971,gn:"金堂县（其他）",y:5971,s:0,d:0}}},510122:{g:510122,gn:"双流县",y:2662,s:1,d:2662,l:{2662:{g:2662,gn:"双流县（太平镇、永兴镇、籍田镇、正兴镇、大林镇、煎茶镇、黄龙溪镇、金桥镇、胜利镇）",y:2662,s:1,d:0},5088:{g:5088,gn:"双流县（东升街道，西航港街道，九江街道，彭镇，双流蛟龙港，文星镇，白家镇）",y:5088,s:0,d:0},5982:{g:5982,gn:"双流县（公兴镇、华阳街道、黄甲街道、黄水镇、中和街道）",y:5982,s:0,d:0},6511:{g:6511,gn:"双流县（新兴镇、兴隆镇、万安镇、白沙镇、三星镇、合江镇、永安镇、三角镇）",y:6511,s:0,d:0}}},510124:{g:510124,gn:"郫县",y:2660,s:1,d:2660,l:{2660:{g:2660,gn:"郫县（其他）",y:2660,s:1,d:0},5091:{g:5091,gn:"郫县（德源镇，团结镇，郫筒镇，犀浦镇，安靖镇，红光镇，合作镇）",y:5091,s:0,d:0}}},510129:{g:510129,gn:"大邑县",y:5965,s:0,d:5965,l:{5965:{g:5965,gn:"大邑县（安仁镇、晋原镇、苏家镇、王泗镇）",y:5965,s:0,d:0},5966:{g:5966,gn:"大邑县（其他）",y:5966,s:0,d:0}}},510131:{g:510131,gn:"蒲江县",y:5976,s:0,d:5976,l:{5976:{g:5976,gn:"蒲江县（鹤山镇）",y:5976,s:0,d:0},5977:{g:5977,gn:"蒲江县（其他）",y:5977,s:0,d:0}}},510132:{g:510132,gn:"新津县",y:5985,s:0,d:5985,l:{5985:{g:5985,gn:"新津县（其他）",y:5985,s:0,d:0},5988:{g:5988,gn:"新津县（邓双镇、花桥镇、花源镇、五津镇、新平镇）",y:5988,s:0,d:0}}},510181:{g:510181,gn:"都江堰市",y:5967,s:0,d:5967,l:{5967:{g:5967,gn:"都江堰市（灌口镇、聚源镇、蒲阳镇、青城山镇）",y:5967,s:0,d:0},5968:{g:5968,gn:"都江堰市（石羊镇、幸福镇、胥家镇、玉堂镇、中兴镇）",y:5968,s:0,d:0},5969:{g:5969,gn:"都江堰市（其他）",y:5969,s:0,d:0}}},510182:{g:510182,gn:"彭州市",y:5974,s:0,d:5974,l:{5974:{g:5974,gn:"彭州市（丽春镇、天彭镇、致和镇）",y:5974,s:0,d:0},5975:{g:5975,gn:"彭州市（其他）",y:5975,s:0,d:0}}},510183:{g:510183,gn:"邛崃市",y:5980,s:0,d:5980,l:{5980:{g:5980,gn:"邛崃市（临邛镇）",y:5980,s:0,d:0},5981:{g:5981,gn:"邛崃市（其他）",y:5981,s:0,d:0}}},510184:{g:510184,gn:"崇州市",y:5963,s:0,d:5963,l:{5963:{g:5963,gn:"崇州市（其他）",y:5963,s:0,d:0},5964:{g:5964,gn:"崇州市（崇平镇、崇阳镇、大划乡、大划镇、羊马镇）",y:5964,s:0,d:0}}}}},510300:{g:510300,gn:"自贡市",y:2675,s:1,d:510321,l:{510302:{g:510302,gn:"自流井区",y:2678,s:1,d:0},510303:{g:510303,gn:"贡井区",y:2680,s:1,d:0},510304:{g:510304,gn:"大安区",y:2679,s:1,d:0},510311:{g:510311,gn:"沿滩区",y:2681,s:0,d:0},510321:{g:510321,gn:"荣县",y:2676,s:0,d:0},510322:{g:510322,gn:"富顺县",y:2677,s:0,d:0}}},510400:{g:510400,gn:"攀枝花市",y:2688,s:0,d:510421,l:{510402:{g:510402,gn:"东区",y:2691,s:0,d:0},510403:{g:510403,gn:"西区",y:2692,s:0,d:0},510411:{g:510411,gn:"仁和区",y:2693,s:0,d:0},510421:{g:510421,gn:"米易县",y:2689,s:0,d:0},510422:{g:510422,gn:"盐边县",y:2690,s:0,d:0}}},510500:{g:510500,gn:"泸州市",y:2694,s:1,d:510521,l:{510502:{g:510502,gn:"江阳区",y:2699,s:1,d:2699,l:{2699:{g:2699,gn:"江阳区（其他）",y:2699,s:1,d:0},6374:{g:6374,gn:"江阳区（北城街道、大山坪街道、华阳街道、黄舣镇、蓝田街道）",y:6374,s:0,d:0},6375:{g:6375,gn:"江阳区（邻玉街道、南城街道、茜草街道、泰安镇）",y:6375,s:0,d:0}}},510503:{g:510503,gn:"纳溪区",y:2700,s:0,d:2700,l:{2700:{g:2700,gn:"纳溪区（其他）",y:2700,s:0,d:0},6378:{g:6378,gn:"纳溪区（安福街道、棉花坡镇、新乐镇、永宁街道）",y:6378,s:0,d:0}}},510504:{g:510504,gn:"龙马潭区",y:2701,s:1,d:2701,l:{2701:{g:2701,gn:"龙马潭区（其他）",y:2701,s:1,d:0},6376:{g:6376,gn:"龙马潭区（高坝街道、高坝镇、红星街道、莲花池街道、罗汉镇、小市街道）",y:6376,s:0,d:0}}},510521:{g:510521,gn:"泸县",y:2695,s:0,d:2695,l:{2695:{g:2695,gn:"泸县（其他）",y:2695,s:0,d:0},6377:{g:6377,gn:"泸县（福集镇）",y:6377,s:0,d:0}}},510522:{g:510522,gn:"合江县",y:2696,s:0,d:2696,l:{2696:{g:2696,gn:"合江县（其他）",y:2696,s:0,d:0},6373:{g:6373,gn:"合江县（合江镇、榕山镇）",y:6373,s:0,d:0}}},510524:{g:510524,gn:"叙永县",y:2697,s:0,d:0},510525:{g:510525,gn:"古蔺县",y:2698,s:0,d:0}}},510600:{g:510600,gn:"德阳市",y:2702,s:1,d:510681,l:{510603:{g:510603,gn:"旌阳区",y:2708,s:1,d:2708,l:{2708:{g:2708,gn:"旌阳区（其他）",y:2708,s:1,d:0},6368:{g:6368,gn:"旌阳区（八角井镇、天元镇、孝感镇、扬嘉镇）",y:6368,s:0,d:0}}},510623:{g:510623,gn:"中江县",y:2707,s:0,d:2707,l:{2707:{g:2707,gn:"中江县（其他）",y:2707,s:0,d:0},6372:{g:6372,gn:"中江县（凯江镇、县城）",y:6372,s:0,d:0}}},510626:{g:510626,gn:"罗江县",y:2706,s:0,d:2706,l:{2706:{g:2706,gn:"罗江县（其他）",y:2706,s:0,d:0},6369:{g:6369,gn:"罗江县（万安镇）",y:6369,s:0,d:0}}},510681:{g:510681,gn:"广汉市",y:2703,s:0,d:2703,l:{2703:{g:2703,gn:"广汉市（其他）",y:2703,s:0,d:0},6367:{g:6367,gn:"广汉市（北外乡、东南乡、雒城镇、万福镇、西外乡、向阳镇、小汉镇、新丰镇）",y:6367,s:0,d:0}}},510682:{g:510682,gn:"什邡市",y:2704,s:0,d:2704,l:{2704:{g:2704,gn:"什邡市（其他）",y:2704,s:0,d:0},6371:{g:6371,gn:"什邡市（八角镇、方亭街道、方亭镇、回澜镇、元石镇、皂角街道、皂角镇）",y:6371,s:0,d:0}}},510683:{g:510683,gn:"绵竹市",y:2705,s:0,d:2705,l:{2705:{g:2705,gn:"绵竹市（其他）",y:2705,s:0,d:0},6370:{g:6370,gn:"绵竹市（剑南镇、东北镇、西南镇、清道镇）",y:6370,s:0,d:0}}}}},510700:{g:510700,gn:"绵阳市",y:2709,s:1,d:510781,l:{3607:{g:3607,gn:"高新区",y:3607,s:0,d:0},3608:{g:3608,gn:"科创园区",y:3608,s:0,d:0},3609:{g:3609,gn:"农科区",y:3609,s:0,d:0},3610:{g:3610,gn:"经开区",y:3610,s:0,d:0},3611:{g:3611,gn:"仙海区",y:3611,s:0,d:0},510703:{g:510703,gn:"涪城区",y:2717,s:1,d:0},510704:{g:510704,gn:"游仙区",y:2718,s:0,d:0},510722:{g:510722,gn:"三台县",y:2712,s:0,d:0},510723:{g:510723,gn:"盐亭县",y:2711,s:0,d:0},510724:{g:510724,gn:"安县",y:2715,s:0,d:0},510725:{g:510725,gn:"梓潼县",y:2716,s:0,d:0},510726:{g:510726,gn:"北川县",y:2714,s:0,d:0},510727:{g:510727,gn:"平武县",y:2713,s:0,d:0},510781:{g:510781,gn:"江油市",y:2710,s:0,d:0}}},510800:{g:510800,gn:"广元市",y:2719,s:0,d:510822,l:{2726:{g:2726,gn:"市中区",y:2726,s:0,d:0},510802:{g:510802,gn:"利州区",y:3542,s:0,d:0},510811:{g:510811,gn:"元坝区",y:2724,s:0,d:0},510812:{g:510812,gn:"朝天区",y:2725,s:0,d:0},510821:{g:510821,gn:"旺苍县",y:2721,s:0,d:0},510822:{g:510822,gn:"青川县",y:2720,s:0,d:0},510823:{g:510823,gn:"剑阁县",y:2722,s:0,d:0},510824:{g:510824,gn:"苍溪县",y:2723,s:0,d:0}}},510900:{g:510900,gn:"遂宁市",y:2727,s:1,d:510922,l:{6387:{g:6387,gn:"河东新区",y:6387,s:0,d:0},510903:{g:510903,gn:"船山区",y:3598,s:1,d:3598,l:{3598:{g:3598,gn:"船山区（保升乡、北固乡、复桥镇、桂花镇、河沙镇、老池乡）",y:3598,s:1,d:0},6384:{g:6384,gn:"船山区（其他）",y:6384,s:0,d:0},6385:{g:6385,gn:"船山区（南强镇、唐家乡、西宁乡、新桥镇、永兴镇）",y:6385,s:0,d:0}}},510904:{g:510904,gn:"安居区",y:3599,s:0,d:0},510921:{g:510921,gn:"蓬溪县",y:2729,s:0,d:0},510922:{g:510922,gn:"射洪县",y:2728,s:0,d:2728,l:{2728:{g:2728,gn:"射洪县（其他）",y:2728,s:0,d:0},6386:{g:6386,gn:"射洪县（太和镇）",y:6386,s:0,d:0}}},510923:{g:510923,gn:"大英县",y:2731,s:0,d:0}}},511000:{g:511000,gn:"内江市",y:2744,s:1,d:511025,l:{511002:{g:511002,gn:"市中区",y:2749,s:1,d:2749,l:{2749:{g:2749,gn:"市中区（其他）",y:2749,s:1,d:0},6381:{g:6381,gn:"市中区（城东街道、城南街道、城西街道、壕子口街道、乐贤镇、牌楼街道、玉溪街道）",y:6381,s:0,d:0}}},511011:{g:511011,gn:"东兴区",y:2750,s:1,d:2750,l:{2750:{g:2750,gn:"东兴区（其他）",y:2750,s:1,d:0},6379:{g:6379,gn:"东兴区（东兴街道、西林街道、新江街道）",y:6379,s:0,d:0}}},511024:{g:511024,gn:"威远县",y:2748,s:0,d:2748,l:{2748:{g:2748,gn:"威远县（其他）",y:2748,s:0,d:0},6382:{g:6382,gn:"威远县（严陵镇）",y:6382,s:0,d:0}}},511025:{g:511025,gn:"资中县",y:2745,s:0,d:2745,l:{2745:{g:2745,gn:"资中县（其他）",y:2745,s:0,d:0},6383:{g:6383,gn:"资中县（水南镇、重龙镇）",y:6383,s:0,d:0}}},511028:{g:511028,gn:"隆昌县",y:2746,s:0,d:2746,l:{2746:{g:2746,gn:"隆昌县（其他）",y:2746,s:0,d:0},6380:{g:6380,gn:"隆昌县（古湖街道、金鹅镇、山川镇）",y:6380,s:0,d:0}}}}},511100:{g:511100,gn:"乐山市",y:2732,s:1,d:511181,l:{511102:{g:511102,gn:"市中区",y:2743,s:1,d:0},511111:{g:511111,gn:"沙湾区",y:2741,s:0,d:0},511112:{g:511112,gn:"五通桥区",y:2740,s:0,d:0},511113:{g:511113,gn:"金口河区",y:2742,s:0,d:0},511123:{g:511123,gn:"犍为县",y:2736,s:0,d:0},511124:{g:511124,gn:"井研县",y:2735,s:0,d:0},511126:{g:511126,gn:"夹江县",y:2734,s:0,d:0},511129:{g:511129,gn:"沐川县",y:2737,s:0,d:0},511132:{g:511132,gn:"峨边彝族自治县",y:2739,s:0,d:0},511133:{g:511133,gn:"马边彝族自治县",y:2738,s:0,d:0},511181:{g:511181,gn:"峨眉山市",y:2733,s:0,d:0}}},511300:{g:511300,gn:"南充市",y:2762,s:1,d:511381,l:{511302:{g:511302,gn:"顺庆区",y:2769,s:1,d:0},511303:{g:511303,gn:"高坪区",y:2770,s:1,d:0},511304:{g:511304,gn:"嘉陵区",y:2771,s:1,d:0},511321:{g:511321,gn:"南部县",y:2767,s:0,d:0},511322:{g:511322,gn:"营山县",y:2764,s:0,d:0},511323:{g:511323,gn:"蓬安县",y:2765,s:0,d:0},511324:{g:511324,gn:"仪陇县",y:2766,s:0,d:0},511325:{g:511325,gn:"西充县",y:2768,s:0,d:0},511381:{g:511381,gn:"阆中市",y:2763,s:0,d:0}}},511400:{g:511400,gn:"眉山市",y:2832,s:1,d:511402,l:{511402:{g:511402,gn:"东坡区",y:2833,s:1,d:0},511421:{g:511421,gn:"仁寿县",y:2834,s:0,d:0},511422:{g:511422,gn:"彭山县",y:2835,s:0,d:0},511423:{g:511423,gn:"洪雅县",y:2836,s:0,d:0},511424:{g:511424,gn:"丹棱县",y:2837,s:0,d:0},511425:{g:511425,gn:"青神县",y:2838,s:0,d:0}}},511500:{g:511500,gn:"宜宾市",y:2751,s:1,d:511521,l:{511502:{g:511502,gn:"翠屏区",y:2761,s:1,d:0},511503:{g:511503,gn:"南溪县",y:2754,s:0,d:0},511521:{g:511521,gn:"宜宾县",y:2752,s:0,d:0},511523:{g:511523,gn:"江安县",y:2758,s:0,d:0},511524:{g:511524,gn:"长宁县",y:2756,s:0,d:0},511525:{g:511525,gn:"高县",y:2757,s:0,d:0},511526:{g:511526,gn:"珙县",y:2755,s:0,d:0},511527:{g:511527,gn:"筠连县",y:2759,s:0,d:0},511528:{g:511528,gn:"兴文县",y:2753,s:0,d:0},511529:{g:511529,gn:"屏山县",y:2760,s:0,d:0}}},511600:{g:511600,gn:"广安市",y:2682,s:1,d:511681,l:{511602:{g:511602,gn:"广安区",y:2687,s:1,d:0},511621:{g:511621,gn:"岳池县",y:2684,s:0,d:0},511622:{g:511622,gn:"武胜县",y:2686,s:0,d:0},511623:{g:511623,gn:"邻水县",y:2685,s:0,d:0},511681:{g:511681,gn:"华蓥市",y:2683,s:0,d:0}}},511700:{g:511700,gn:"达州市",y:2824,s:0,d:511702,l:{511702:{g:511702,gn:"通川区",y:2825,s:0,d:0},511721:{g:511721,gn:"达县",y:2827,s:0,d:0},511722:{g:511722,gn:"宣汉县",y:2829,s:0,d:0},511723:{g:511723,gn:"开江县",y:2830,s:0,d:0},511724:{g:511724,gn:"大竹县",y:2831,s:0,d:0},511725:{g:511725,gn:"渠县",y:2828,s:0,d:0},511781:{g:511781,gn:"万源市",y:2826,s:0,d:0}}},511800:{g:511800,gn:"雅安市",y:2777,s:1,d:511802,l:{511802:{g:511802,gn:"雨城区",y:2778,s:1,d:0},511803:{g:511803,gn:"名山县",y:2781,s:0,d:0},511822:{g:511822,gn:"荥经县",y:2783,s:0,d:0},511823:{g:511823,gn:"汉源县",y:2785,s:0,d:0},511824:{g:511824,gn:"石棉县",y:2780,s:0,d:0},511825:{g:511825,gn:"天全县",y:2782,s:0,d:0},511826:{g:511826,gn:"芦山县",y:2779,s:0,d:0},511827:{g:511827,gn:"宝兴县",y:2784,s:0,d:0}}},511900:{g:511900,gn:"巴中市",y:2819,s:0,d:511902,l:{511902:{g:511902,gn:"巴州区",y:2820,s:0,d:0},511921:{g:511921,gn:"通江县",y:2823,s:0,d:0},511922:{g:511922,gn:"南江县",y:2821,s:0,d:0},511923:{g:511923,gn:"平昌县",y:2822,s:0,d:0}}},512000:{g:512000,gn:"资阳市",y:2772,s:1,d:512002,l:{512002:{g:512002,gn:"雁江区",y:2773,s:1,d:0},512021:{g:512021,gn:"安岳县",y:2775,s:0,d:0},512022:{g:512022,gn:"乐至县",y:2776,s:0,d:0},512081:{g:512081,gn:"简阳市",y:2774,s:1,d:0}}},513200:{g:513200,gn:"阿坝藏族羌族自治州(马尔康县)",y:2786,s:0,d:513229,l:{513221:{g:513221,gn:"汶川县",y:2790,s:0,d:0},513222:{g:513222,gn:"理县",y:2792,s:0,d:0},513223:{g:513223,gn:"茂县",y:2799,s:0,d:0},513224:{g:513224,gn:"松潘县",y:2797,s:0,d:0},513225:{g:513225,gn:"九寨沟县",y:2788,s:0,d:0},513226:{g:513226,gn:"金川县",y:2796,s:0,d:0},513227:{g:513227,gn:"小金县",y:2794,s:0,d:0},513228:{g:513228,gn:"黑水县",y:2795,s:0,d:0},513229:{g:513229,gn:"马尔康县",y:2787,s:0,d:0},513230:{g:513230,gn:"壤塘县",y:2798,s:0,d:0},513231:{g:513231,gn:"阿坝县",y:2791,s:0,d:0},513232:{g:513232,gn:"若尔盖县",y:2793,s:0,d:0},513233:{g:513233,gn:"红原县",y:2789,s:0,d:0}}},513300:{g:513300,gn:"甘孜藏族自治州(康定县)",y:2800,s:0,d:513321,l:{513321:{g:513321,gn:"康定县",y:2801,s:0,d:0},513322:{g:513322,gn:"泸定县",y:2818,s:0,d:0},513323:{g:513323,gn:"丹巴县",y:2802,s:0,d:0},513324:{g:513324,gn:"九龙县",y:2804,s:0,d:0},513325:{g:513325,gn:"雅江县",y:2807,s:0,d:0},513326:{g:513326,gn:"道孚县",y:2809,s:0,d:0},513327:{g:513327,gn:"炉霍县",y:2803,s:0,d:0},513328:{g:513328,gn:"甘孜县",y:2805,s:0,d:0},513329:{g:513329,gn:"新龙县",y:2808,s:0,d:0},513330:{g:513330,gn:"德格县",y:2812,s:0,d:0},513331:{g:513331,gn:"白玉县",y:2810,s:0,d:0},513332:{g:513332,gn:"石渠县",y:2814,s:0,d:0},513333:{g:513333,gn:"色达县",y:2816,s:0,d:0},513334:{g:513334,gn:"理塘县",y:2811,s:0,d:0},513335:{g:513335,gn:"巴塘县",y:2817,s:0,d:0},513336:{g:513336,gn:"乡城县",y:2813,s:0,d:0},513337:{g:513337,gn:"稻城县",y:2815,s:0,d:0},513338:{g:513338,gn:"得荣县",y:2806,s:0,d:0}}},513400:{g:513400,gn:"凉山彝族自治州",y:2839,s:0,d:513401,l:{513401:{g:513401,gn:"西昌市",y:2840,s:0,d:0},513422:{g:513422,gn:"木里藏族自治县",y:2841,s:0,d:0},513423:{g:513423,gn:"盐源县",y:2842,s:0,d:0},513424:{g:513424,gn:"德昌县",y:2843,s:0,d:0},513425:{g:513425,gn:"会理县",y:2844,s:0,d:0},513426:{g:513426,gn:"会东县",y:2845,s:0,d:0},513427:{g:513427,gn:"宁南县",y:2846,s:0,d:0},513428:{g:513428,gn:"普格县",y:2847,s:0,d:0},513429:{g:513429,gn:"布拖县",y:2848,s:0,d:0},513430:{g:513430,gn:"金阳县",y:2849,s:0,d:0},513431:{g:513431,gn:"昭觉县",y:2850,s:0,d:0},513432:{g:513432,gn:"喜德县",y:2851,s:0,d:0},513433:{g:513433,gn:"冕宁县",y:2852,s:0,d:0},513434:{g:513434,gn:"越西县",y:2853,s:0,d:0},513435:{g:513435,gn:"甘洛县",y:2854,s:0,d:0},513436:{g:513436,gn:"美姑县",y:2855,s:0,d:0},513437:{g:513437,gn:"雷波县",y:2856,s:0,d:0}}}}},520000:{g:520000,gn:"贵州省",y:693,s:0,d:520100,l:{520100:{g:520100,gn:"贵阳市",y:694,s:0,d:520181,l:{3526:{g:3526,gn:"金阳新区",y:3526,s:0,d:0},520102:{g:520102,gn:"南明区",y:699,s:0,d:0},520103:{g:520103,gn:"云岩区",y:700,s:0,d:0},520111:{g:520111,gn:"花溪区",y:701,s:0,d:0},520112:{g:520112,gn:"乌当区",y:702,s:0,d:0},520113:{g:520113,gn:"白云区",y:703,s:0,d:0},520114:{g:520114,gn:"小河区",y:704,s:0,d:0},520121:{g:520121,gn:"开阳县",y:696,s:0,d:0},520122:{g:520122,gn:"息烽县",y:698,s:0,d:0},520123:{g:520123,gn:"修文县",y:697,s:0,d:0},520181:{g:520181,gn:"清镇市",y:695,s:0,d:0}}},520200:{g:520200,gn:"六盘水市",y:705,s:0,d:520221,l:{520201:{g:520201,gn:"钟山区",y:709,s:0,d:0},520203:{g:520203,gn:"六枝特区",y:708,s:0,d:0},520221:{g:520221,gn:"水城县",y:706,s:0,d:0},520222:{g:520222,gn:"盘县",y:707,s:0,d:0}}},520300:{g:520300,gn:"遵义市",y:710,s:0,d:520381,l:{520302:{g:520302,gn:"红花岗区",y:722,s:0,d:0},520303:{g:520303,gn:"汇川区",y:3517,s:0,d:0},520321:{g:520321,gn:"遵义县",y:723,s:0,d:0},520322:{g:520322,gn:"桐梓县",y:714,s:0,d:0},520323:{g:520323,gn:"绥阳县",y:713,s:0,d:0},520324:{g:520324,gn:"正安县",y:717,s:0,d:0},520325:{g:520325,gn:"道真仡佬族苗族自治县",y:720,s:0,d:0},520326:{g:520326,gn:"务川仡佬族苗族自治县",y:721,s:0,d:0},520327:{g:520327,gn:"凤冈县",y:716,s:0,d:0},520328:{g:520328,gn:"湄潭县",y:719,s:0,d:0},520329:{g:520329,gn:"余庆县",y:718,s:0,d:0},520330:{g:520330,gn:"习水县",y:715,s:0,d:0},520381:{g:520381,gn:"赤水市",y:711,s:0,d:0},520382:{g:520382,gn:"仁怀市",y:712,s:0,d:0}}},520400:{g:520400,gn:"安顺市",y:744,s:0,d:520422,l:{520402:{g:520402,gn:"西秀区",y:750,s:0,d:0},520421:{g:520421,gn:"平坝县",y:746,s:0,d:0},520422:{g:520422,gn:"普定县",y:745,s:0,d:0},520423:{g:520423,gn:"镇宁布依族苗族自治县",y:747,s:0,d:0},520424:{g:520424,gn:"关岭布依族苗族自治县",y:749,s:0,d:0},520425:{g:520425,gn:"紫云苗族布依族自治县",y:748,s:0,d:0}}},520500:{g:520500,gn:"毕节地区",y:735,s:0,d:736,l:{736:{g:736,gn:"毕节市",y:736,s:0,d:0},520521:{g:520521,gn:"大方县",y:737,s:0,d:0},520522:{g:520522,gn:"黔西县",y:743,s:0,d:0},520523:{g:520523,gn:"金沙县",y:739,s:0,d:0},520524:{g:520524,gn:"织金县",y:738,s:0,d:0},520525:{g:520525,gn:"纳雍县",y:741,s:0,d:0},520526:{g:520526,gn:"威宁彝族回族苗族自治县",y:742,s:0,d:0},520527:{g:520527,gn:"赫章县",y:740,s:0,d:0}}},520600:{g:520600,gn:"铜仁地区",y:724,s:0,d:725,l:{725:{g:725,gn:"铜仁市",y:725,s:0,d:0},520603:{g:520603,gn:"万山特区",y:733,s:0,d:0},520621:{g:520621,gn:"江口县",y:726,s:0,d:0},520622:{g:520622,gn:"玉屏侗族自治县",y:729,s:0,d:0},520623:{g:520623,gn:"石阡县",y:728,s:0,d:0},520624:{g:520624,gn:"思南县",y:727,s:0,d:0},520625:{g:520625,gn:"印江土家族苗族自治县",y:731,s:0,d:0},520626:{g:520626,gn:"德江县",y:734,s:0,d:0},520627:{g:520627,gn:"沿河土家族自治县",y:732,s:0,d:0},520628:{g:520628,gn:"松桃苗族自治县",y:730,s:0,d:0}}},522300:{g:522300,gn:"黔西南布依族苗族自治州",y:751,s:0,d:522301,l:{522301:{g:522301,gn:"兴义市",y:752,s:0,d:0},522322:{g:522322,gn:"兴仁县",y:753,s:0,d:0},522323:{g:522323,gn:"普安县",y:754,s:0,d:0},522324:{g:522324,gn:"晴隆县",y:756,s:0,d:0},522325:{g:522325,gn:"贞丰县",y:757,s:0,d:0},522326:{g:522326,gn:"望谟县",y:759,s:0,d:0},522327:{g:522327,gn:"册亨县",y:755,s:0,d:0},522328:{g:522328,gn:"安龙县",y:758,s:0,d:0}}},522600:{g:522600,gn:"黔东南苗族侗族自治州",y:771,s:0,d:522623,l:{522601:{g:522601,gn:"凯里市",y:788,s:0,d:0},522622:{g:522622,gn:"黄平县",y:779,s:0,d:0},522623:{g:522623,gn:"施秉县",y:772,s:0,d:0},522624:{g:522624,gn:"三穗县",y:782,s:0,d:0},522625:{g:522625,gn:"镇远县",y:775,s:0,d:0},522626:{g:522626,gn:"岑巩县",y:785,s:0,d:0},522627:{g:522627,gn:"天柱县",y:778,s:0,d:0},522628:{g:522628,gn:"锦屏县",y:774,s:0,d:0},522629:{g:522629,gn:"剑河县",y:781,s:0,d:0},522630:{g:522630,gn:"台江县",y:777,s:0,d:0},522631:{g:522631,gn:"黎平县",y:784,s:0,d:0},522632:{g:522632,gn:"榕江县",y:780,s:0,d:0},522633:{g:522633,gn:"从江县",y:773,s:0,d:0},522634:{g:522634,gn:"雷山县",y:783,s:0,d:0},522635:{g:522635,gn:"麻江县",y:776,s:0,d:0},522636:{g:522636,gn:"丹寨县",y:786,s:0,d:0}}},522700:{g:522700,gn:"黔南布依族苗族自治州",y:760,s:0,d:522702,l:{522701:{g:522701,gn:"都匀市",y:3496,s:0,d:0},522702:{g:522702,gn:"福泉市",y:761,s:0,d:0},522722:{g:522722,gn:"荔波县",y:765,s:0,d:0},522723:{g:522723,gn:"贵定县",y:3487,s:0,d:0},522725:{g:522725,gn:"瓮安县",y:764,s:0,d:0},522726:{g:522726,gn:"独山县",y:769,s:0,d:0},522727:{g:522727,gn:"平塘县",y:767,s:0,d:0},522728:{g:522728,gn:"罗甸县",y:763,s:0,d:0},522729:{g:522729,gn:"长顺县",y:768,s:0,d:0},522730:{g:522730,gn:"龙里县",y:766,s:0,d:0},522731:{g:522731,gn:"惠水县",y:762,s:0,d:0},522732:{g:522732,gn:"三都水族自治县",y:770,s:0,d:0}}}}},530000:{g:530000,gn:"云南省",y:3077,s:0,d:530100,l:{530100:{g:530100,gn:"昆明市",y:3078,s:0,d:3560,l:{3560:{g:3560,gn:"高新技术开发区",y:3560,s:0,d:0},5743:{g:5743,gn:"呈贡县（吴家营街道、大学城、斗南街道、洛羊街道）",y:5743,s:0,d:0},5744:{g:5744,gn:"呈贡县（洛龙街道、雨花街道、马金铺街道、龙城街道）",y:5744,s:0,d:0},5745:{g:5745,gn:"呈贡县（其他）",y:5745,s:0,d:0},530102:{g:530102,gn:"五华区",y:5702,s:0,d:5702,l:{5702:{g:5702,gn:"五华区（二环以内）",y:5702,s:0,d:0},5740:{g:5740,gn:"五华区（大观街道、普吉街道）",y:5740,s:0,d:0},5741:{g:5741,gn:"五华区（昆明国家高新技术产业开发区、红云街道、黑林铺街道）",y:5741,s:0,d:0},5742:{g:5742,gn:"五华区（其他）",y:5742,s:0,d:0}}},530103:{g:530103,gn:"盘龙区",y:5701,s:0,d:5701,l:{5701:{g:5701,gn:"盘龙区（二环以内）",y:5701,s:0,d:0},5752:{g:5752,gn:"盘龙区（联盟街道、茨坝街道）",y:5752,s:0,d:0},5753:{g:5753,gn:"盘龙区（金辰街道、青云街道、龙泉街道）",y:5753,s:0,d:0},5754:{g:5754,gn:"盘龙区（其他）",y:5754,s:0,d:0}}},530111:{g:530111,gn:"官渡区",y:5703,s:0,d:5703,l:{5703:{g:5703,gn:"官渡区（二环以内）",y:5703,s:0,d:0},5748:{g:5748,gn:"官渡区（六甲街道、昆明经济技术开发区、矣六街道）",y:5748,s:0,d:0},5749:{g:5749,gn:"官渡区（关上街道、金马街道）",y:5749,s:0,d:0},5750:{g:5750,gn:"官渡区（太和街道、官渡街道、小板桥街道）",y:5750,s:0,d:0},5751:{g:5751,gn:"官渡区（其他）",y:5751,s:0,d:0}}},530112:{g:530112,gn:"西山区",y:5704,s:0,d:5704,l:{5704:{g:5704,gn:"西山区（二环以内）",y:5704,s:0,d:0},5755:{g:5755,gn:"西山区（前卫街道、昆明滇池国家旅游度假区）",y:5755,s:0,d:0},5756:{g:5756,gn:"西山区（碧鸡街道）",y:5756,s:0,d:0},5757:{g:5757,gn:"西山区（福海街道、西苑街道、马街街道）",y:5757,s:0,d:0},5758:{g:5758,gn:"西山区（其他）",y:5758,s:0,d:0}}},530113:{g:530113,gn:"东川区",y:5761,s:0,d:5761,l:{5761:{g:5761,gn:"东川区（铜都镇）",y:5761,s:0,d:0},5762:{g:5762,gn:"东川区（其他）",y:5762,s:0,d:0}}},530122:{g:530122,gn:"晋宁县",y:3083,s:0,d:0},530124:{g:530124,gn:"富民县",y:3080,s:0,d:0},530125:{g:530125,gn:"宜良县",y:3084,s:0,d:0},530126:{g:530126,gn:"石林彝族自治县",y:3086,s:0,d:0},530127:{g:530127,gn:"嵩明县",y:3081,s:0,d:0},530128:{g:530128,gn:"禄劝彝族苗族自治县",y:3085,s:0,d:0},530129:{g:530129,gn:"寻甸回族彝族自治县",y:3087,s:0,d:0},530181:{g:530181,gn:"安宁市",y:5746,s:0,d:5746,l:{5746:{g:5746,gn:"安宁市（连然街道金方街道）",y:5746,s:0,d:0},5747:{g:5747,gn:"安宁市（其他）",y:5747,s:0,d:0}}}}},530300:{g:530300,gn:"曲靖地区(曲靖市)",y:3107,s:0,d:530381,l:{530302:{g:530302,gn:"麒麟区",y:5722,s:0,d:5722,l:{5722:{g:5722,gn:"麒麟区（南宁街道、寥廓街道、建宁街道、白石江街道、西城街道）",y:5722,s:0,d:0},5723:{g:5723,gn:"麒麟区（其他）",y:5723,s:0,d:0}}},530321:{g:530321,gn:"马龙县",y:3113,s:0,d:0},530322:{g:530322,gn:"陆良县",y:3109,s:0,d:0},530323:{g:530323,gn:"师宗县",y:3114,s:0,d:0},530324:{g:530324,gn:"罗平县",y:3112,s:0,d:0},530325:{g:530325,gn:"富源县",y:3111,s:0,d:0},530326:{g:530326,gn:"会泽县",y:3110,s:0,d:0},530328:{g:530328,gn:"沾益县",y:3115,s:0,d:0},530381:{g:530381,gn:"宣威市",y:3108,s:0,d:0}}},530400:{g:530400,gn:"玉溪地区(玉溪市)",y:3117,s:0,d:530402,l:{530402:{g:530402,gn:"红塔区",y:5726,s:0,d:5726,l:{5726:{g:5726,gn:"红塔区（凤凰路街道、玉兴路街道、玉带路街道）",y:5726,s:0,d:0},5727:{g:5727,gn:"红塔区（其他）",y:5727,s:0,d:0}}},530421:{g:530421,gn:"江川县",y:3123,s:0,d:0},530422:{g:530422,gn:"澄江县",y:3120,s:0,d:0},530423:{g:530423,gn:"通海县",y:3122,s:0,d:0},530424:{g:530424,gn:"华宁县",y:3119,s:0,d:0},530425:{g:530425,gn:"易门县",y:3121,s:0,d:0},530426:{g:530426,gn:"峨山彝族自治县",y:3126,s:0,d:0},530427:{g:530427,gn:"新平彝族傣族自治县",y:3125,s:0,d:0},530428:{g:530428,gn:"元江哈尼族彝族傣族自治县",y:3124,s:0,d:0}}},530500:{g:530500,gn:"保山地区(保山市)",y:3147,s:0,d:530502,l:{530502:{g:530502,gn:"隆阳区",y:5711,s:0,d:5711,l:{5711:{g:5711,gn:"隆阳区（永昌街道）",y:5711,s:0,d:0},5712:{g:5712,gn:"隆阳区（其他）",y:5712,s:0,d:0}}},530521:{g:530521,gn:"施甸县",y:3149,s:0,d:0},530522:{g:530522,gn:"腾冲县",y:3152,s:0,d:0},530523:{g:530523,gn:"龙陵县",y:3151,s:0,d:0},530524:{g:530524,gn:"昌宁县",y:3150,s:0,d:0}}},530600:{g:530600,gn:"昭通地区(昭通市)",y:3095,s:0,d:530602,l:{530602:{g:530602,gn:"昭阳区",y:5719,s:0,d:5719,l:{5719:{g:5719,gn:"昭阳区（凤凰街道龙泉街道）",y:5719,s:0,d:0},5720:{g:5720,gn:"昭阳区（其他）",y:5720,s:0,d:0}}},530621:{g:530621,gn:"鲁甸县",y:3106,s:0,d:0},530622:{g:530622,gn:"巧家县",y:3102,s:0,d:0},530623:{g:530623,gn:"盐津县",y:3101,s:0,d:0},530624:{g:530624,gn:"大关县",y:3100,s:0,d:0},530625:{g:530625,gn:"永善县",y:3097,s:0,d:0},530626:{g:530626,gn:"绥江县",y:3098,s:0,d:0},530627:{g:530627,gn:"镇雄县",y:3099,s:0,d:0},530628:{g:530628,gn:"彝良县",y:3103,s:0,d:0},530629:{g:530629,gn:"威信县",y:3104,s:0,d:0},530630:{g:530630,gn:"水富县",y:3105,s:0,d:0}}},530700:{g:530700,gn:"丽江地区(丽江纳西族自治县)",y:3153,s:0,d:530723,l:{530702:{g:530702,gn:"古城区",y:5709,s:0,d:5709,l:{5709:{g:5709,gn:"古城区（大研街道、束河街道、祥和街道、西安街道）",y:5709,s:0,d:0},5710:{g:5710,gn:"古城区（其他）",y:5710,s:0,d:0}}},530721:{g:530721,gn:"玉龙纳西族自治县",y:3158,s:0,d:0},530722:{g:530722,gn:"永胜县",y:3155,s:0,d:0},530723:{g:530723,gn:"华坪县",y:3154,s:0,d:0},530724:{g:530724,gn:"宁蒗彝族自治县",y:3157,s:0,d:0}}},530800:{g:530800,gn:"思茅地区(思茅县)",y:3127,s:0,d:530802,l:{530802:{g:530802,gn:"思茅区",y:5759,s:0,d:5759,l:{5759:{g:5759,gn:"思茅区（南屏镇、思茅镇）",y:5759,s:0,d:0},5760:{g:5760,gn:"思茅区（其他）",y:5760,s:0,d:0}}},530821:{g:530821,gn:"宁洱哈尼族彝族自治县",y:3129,s:0,d:0},530822:{g:530822,gn:"墨江哈尼族自治县",y:3133,s:0,d:0},530823:{g:530823,gn:"景东彝族自治县",y:3130,s:0,d:0},530824:{g:530824,gn:"景谷傣族彝族自治县",y:3132,s:0,d:0},530825:{g:530825,gn:"镇沅彝族哈尼族拉祜族自治县",y:3131,s:0,d:0},530826:{g:530826,gn:"江城哈尼族彝族自治县",y:3136,s:0,d:0},530827:{g:530827,gn:"孟连傣族拉祜族佤族自治县",y:3137,s:0,d:0},530828:{g:530828,gn:"澜沧拉祜族自治县",y:3134,s:0,d:0},530829:{g:530829,gn:"西盟佤族自治县",y:3135,s:0,d:0}}},530900:{g:530900,gn:"临沧地区(临沧县)",y:3138,s:0,d:530902,l:{530902:{g:530902,gn:"临翔区",y:3139,s:0,d:0},530921:{g:530921,gn:"凤庆县",y:3141,s:0,d:0},530922:{g:530922,gn:"云县",y:3142,s:0,d:0},530923:{g:530923,gn:"永德县",y:3143,s:0,d:0},530924:{g:530924,gn:"镇康县",y:3140,s:0,d:0},530925:{g:530925,gn:"双江拉祜族佤族布朗族傣族自治县",y:3144,s:0,d:0},530926:{g:530926,gn:"耿马傣族佤族自治县",y:3146,s:0,d:0},530927:{g:530927,gn:"沧源佤族自治县",y:3145,s:0,d:0}}},532300:{g:532300,gn:"楚雄彝族自治州(楚雄市)",y:3186,s:0,d:532301,l:{532301:{g:532301,gn:"楚雄市",y:5724,s:0,d:5724,l:{5724:{g:5724,gn:"楚雄市（鹿城镇）",y:5724,s:0,d:0},5725:{g:5725,gn:"楚雄市（其他）",y:5725,s:0,d:0}}},532322:{g:532322,gn:"双柏县",y:3193,s:0,d:0},532323:{g:532323,gn:"牟定县",y:3190,s:0,d:0},532324:{g:532324,gn:"南华县",y:3189,s:0,d:0},532325:{g:532325,gn:"姚安县",y:3196,s:0,d:0},532326:{g:532326,gn:"大姚县",y:3192,s:0,d:0},532327:{g:532327,gn:"永仁县",y:3195,s:0,d:0},532328:{g:532328,gn:"元谋县",y:3188,s:0,d:0},532329:{g:532329,gn:"武定县",y:3191,s:0,d:0},532331:{g:532331,gn:"禄丰县",y:3194,s:0,d:0}}},532500:{g:532500,gn:"红河哈尼族彝族自治州",y:3168,s:0,d:532501,l:{532501:{g:532501,gn:"个旧市",y:5728,s:0,d:5728,l:{5728:{g:5728,gn:"个旧市（城区街道、锡城镇）",y:5728,s:0,d:0},5729:{g:5729,gn:"个旧市（其他）",y:5729,s:0,d:0}}},532502:{g:532502,gn:"开远市",y:5732,s:0,d:5732,l:{5732:{g:5732,gn:"开远市（乐白道街道、灵泉街道））",y:5732,s:0,d:0},5733:{g:5733,gn:"开远市（其他）",y:5733,s:0,d:0}}},532503:{g:532503,gn:"蒙自市",y:5736,s:0,d:5736,l:{5736:{g:5736,gn:"蒙自市（文澜镇、新安所镇）",y:5736,s:0,d:0},5737:{g:5737,gn:"蒙自市（其他）",y:5737,s:0,d:0}}},532523:{g:532523,gn:"屏边苗族自治县",y:3180,s:0,d:0},532524:{g:532524,gn:"建水县",y:5730,s:0,d:5730,l:{5730:{g:5730,gn:"建水县（临安镇、曲江镇）",y:5730,s:0,d:0},5731:{g:5731,gn:"建水县（其他）",y:5731,s:0,d:0}}},532525:{g:532525,gn:"石屏县",y:3177,s:0,d:0},532526:{g:532526,gn:"弥勒县",y:3181,s:0,d:5734,l:{5734:{g:5734,gn:"弥勒县（弥阳镇）",y:5734,s:0,d:0},5735:{g:5735,gn:"弥勒县（其他）",y:5735,s:0,d:0}}},532527:{g:532527,gn:"泸西县",y:3174,s:0,d:0},532528:{g:532528,gn:"元阳县",y:3176,s:0,d:0},532529:{g:532529,gn:"红河县",y:3171,s:0,d:0},532530:{g:532530,gn:"金平苗族瑶族傣族自治县",y:3178,s:0,d:0},532531:{g:532531,gn:"绿春县",y:3172,s:0,d:0},532532:{g:532532,gn:"河口瑶族自治县",y:3179,s:0,d:0}}},532600:{g:532600,gn:"文山壮族苗族自治县(文山县)",y:3159,s:0,d:5717,l:{5717:{g:5717,gn:"文山县（古木镇、平坝镇、开化镇、追栗街镇、马塘镇)",y:5717,s:0,d:0},5718:{g:5718,gn:"文山县(其他）",y:5718,s:0,d:0},532622:{g:532622,gn:"砚山县",y:3162,s:0,d:0},532623:{g:532623,gn:"西畴县",y:3166,s:0,d:0},532624:{g:532624,gn:"麻栗坡县",y:3161,s:0,d:0},532625:{g:532625,gn:"马关县",y:3164,s:0,d:0},532626:{g:532626,gn:"丘北县",y:3167,s:0,d:0},532627:{g:532627,gn:"广南县",y:3163,s:0,d:0},532628:{g:532628,gn:"富宁县",y:3165,s:0,d:0}}},532800:{g:532800,gn:"西双版纳傣族自治州(景洪县)",y:3182,s:0,d:532801,l:{532801:{g:532801,gn:"景洪市",y:5738,s:0,d:5738,l:{5738:{g:5738,gn:"景洪市（允景洪街道、西双版纳州渡假区管理委员）",y:5738,s:0,d:0},5739:{g:5739,gn:"景洪市（其他）",y:5739,s:0,d:0}}},532822:{g:532822,gn:"勐海县",y:3184,s:0,d:0},532823:{g:532823,gn:"勐腊县",y:3185,s:0,d:0}}},532900:{g:532900,gn:"大理白族自治州(大理市)",y:3197,s:0,d:532901,l:{532901:{g:532901,gn:"大理市",y:5713,s:0,d:5713,l:{5713:{g:5713,gn:"大理市（下关镇、大理经济开发区天井、大理镇）",y:5713,s:0,d:0},5714:{g:5714,gn:"大理市（其他）",y:5714,s:0,d:0}}},532922:{g:532922,gn:"漾濞彝族自治县",y:3207,s:0,d:0},532923:{g:532923,gn:"祥云县",y:3204,s:0,d:0},532924:{g:532924,gn:"宾川县",y:3205,s:0,d:0},532925:{g:532925,gn:"弥渡县",y:3200,s:0,d:0},532926:{g:532926,gn:"南涧彝族自治县",y:3209,s:0,d:0},532927:{g:532927,gn:"巍山彝族回族自治县",y:3208,s:0,d:0},532928:{g:532928,gn:"永平县",y:3206,s:0,d:0},532929:{g:532929,gn:"云龙县",y:3201,s:0,d:0},532930:{g:532930,gn:"洱源县",y:3202,s:0,d:0},532931:{g:532931,gn:"剑川县",y:3199,s:0,d:0},532932:{g:532932,gn:"鹤庆县",y:3203,s:0,d:0}}},533100:{g:533100,gn:"德宏傣族景颇族自治州(潞西县)",y:3210,s:0,d:533103,l:{3567:{g:3567,gn:"芒市镇",y:3567,s:0,d:0},533102:{g:533102,gn:"瑞丽市",y:3212,s:0,d:0},533103:{g:533103,gn:"潞西市",y:3211,s:0,d:5715,l:{5715:{g:5715,gn:"芒市（芒市镇）",y:5715,s:0,d:0},5716:{g:5716,gn:"芒市（其他）",y:5716,s:0,d:0}}},533122:{g:533122,gn:"梁河县",y:3214,s:0,d:0},533123:{g:533123,gn:"盈江县",y:3213,s:0,d:0},533124:{g:533124,gn:"陇川县",y:3215,s:0,d:0}}},533300:{g:533300,gn:"怒江傈傈族自治州(泸水县六库镇)",y:3216,s:0,d:533321,l:{533321:{g:533321,gn:"泸水县",y:3217,s:0,d:0},533323:{g:533323,gn:"福贡县",y:3218,s:0,d:0},533324:{g:533324,gn:"贡山独龙族怒族自治县",y:3220,s:0,d:0},533325:{g:533325,gn:"兰坪白族普米族自治县",y:3219,s:0,d:0}}},533400:{g:533400,gn:"迪庆藏族自治州(香格里拉县)",y:3221,s:0,d:533421,l:{533421:{g:533421,gn:"香格里拉县",y:3222,s:0,d:0},533422:{g:533422,gn:"德钦县",y:3223,s:0,d:0},533423:{g:533423,gn:"维西傈僳族自治县",y:3224,s:0,d:0}}}}},540000:{g:540000,gn:"西藏自治区",y:2996,s:0,d:540100,l:{540100:{g:540100,gn:"拉萨市",y:2997,s:0,d:540121,l:{540102:{g:540102,gn:"城关区",y:3005,s:0,d:0},540121:{g:540121,gn:"林周县",y:2998,s:0,d:0},540122:{g:540122,gn:"当雄县",y:3001,s:0,d:0},540123:{g:540123,gn:"尼木县",y:3000,s:0,d:0},540124:{g:540124,gn:"曲水县",y:3002,s:0,d:0},540125:{g:540125,gn:"堆龙德庆县",y:3004,s:0,d:0},540126:{g:540126,gn:"达孜县",y:2999,s:0,d:0},540127:{g:540127,gn:"墨竹工卡县",y:3003,s:0,d:0}}},542100:{g:542100,gn:"昌都地区",y:3017,s:0,d:542121,l:{542121:{g:542121,gn:"昌都县",y:3018,s:0,d:0},542122:{g:542122,gn:"江达县",y:3025,s:0,d:0},542123:{g:542123,gn:"贡觉县",y:3020,s:0,d:0},542124:{g:542124,gn:"类乌齐县",y:3026,s:0,d:0},542125:{g:542125,gn:"丁青县",y:3027,s:0,d:0},542126:{g:542126,gn:"察雅县",y:3028,s:0,d:0},542127:{g:542127,gn:"八宿县",y:3021,s:0,d:0},542128:{g:542128,gn:"左贡县",y:3022,s:0,d:0},542129:{g:542129,gn:"芒康县",y:3019,s:0,d:0},542132:{g:542132,gn:"洛隆县",y:3024,s:0,d:0},542133:{g:542133,gn:"边坝县",y:3023,s:0,d:0}}},542200:{g:542200,gn:"山南地区",y:3029,s:0,d:542221,l:{542221:{g:542221,gn:"乃东县",y:3030,s:0,d:0},542222:{g:542222,gn:"扎囊县",y:3038,s:0,d:0},542223:{g:542223,gn:"贡嘎县",y:3034,s:0,d:0},542224:{g:542224,gn:"桑日县",y:3037,s:0,d:0},542225:{g:542225,gn:"琼结县",y:3031,s:0,d:0},542226:{g:542226,gn:"曲松县",y:3036,s:0,d:0},542227:{g:542227,gn:"措美县",y:3032,s:0,d:0},542228:{g:542228,gn:"洛扎县",y:3035,s:0,d:0},542229:{g:542229,gn:"加查县",y:3033,s:0,d:0},542231:{g:542231,gn:"隆子县",y:3040,s:0,d:0},542232:{g:542232,gn:"错那县",y:3039,s:0,d:0},542233:{g:542233,gn:"浪卡子县",y:3041,s:0,d:0}}},542300:{g:542300,gn:"日喀则地区",y:3042,s:0,d:542301,l:{542301:{g:542301,gn:"日喀则市",y:3043,s:0,d:0},542322:{g:542322,gn:"南木林县",y:3060,s:0,d:0},542323:{g:542323,gn:"江孜县",y:3046,s:0,d:0},542324:{g:542324,gn:"定日县",y:3048,s:0,d:0},542325:{g:542325,gn:"萨迦县",y:3045,s:0,d:0},542326:{g:542326,gn:"拉孜县",y:3047,s:0,d:0},542327:{g:542327,gn:"昂仁县",y:3054,s:0,d:0},542328:{g:542328,gn:"谢通门县",y:3053,s:0,d:0},542329:{g:542329,gn:"白朗县",y:3059,s:0,d:0},542330:{g:542330,gn:"仁布县",y:3058,s:0,d:0},542331:{g:542331,gn:"康马县",y:3049,s:0,d:0},542332:{g:542332,gn:"定结县",y:3044,s:0,d:0},542333:{g:542333,gn:"仲巴县",y:3056,s:0,d:0},542334:{g:542334,gn:"亚东县",y:3052,s:0,d:0},542335:{g:542335,gn:"吉隆县",y:3051,s:0,d:0},542336:{g:542336,gn:"聂拉木县",y:3050,s:0,d:0},542337:{g:542337,gn:"萨嘎县",y:3057,s:0,d:0},542338:{g:542338,gn:"岗巴县",y:3055,s:0,d:0}}},542400:{g:542400,gn:"那曲地区",y:3006,s:0,d:542421,l:{542421:{g:542421,gn:"那曲县",y:3007,s:0,d:0},542422:{g:542422,gn:"嘉黎县",y:3008,s:0,d:0},542423:{g:542423,gn:"比如县",y:3013,s:0,d:0},542424:{g:542424,gn:"聂荣县",y:3011,s:0,d:0},542425:{g:542425,gn:"安多县",y:3016,s:0,d:0},542426:{g:542426,gn:"申扎县",y:3009,s:0,d:0},542427:{g:542427,gn:"索县",y:3014,s:0,d:0},542428:{g:542428,gn:"班戈县",y:3015,s:0,d:0},542429:{g:542429,gn:"巴青县",y:3010,s:0,d:0},542430:{g:542430,gn:"尼玛县",y:3012,s:0,d:0}}},542500:{g:542500,gn:"阿里地区",y:3061,s:0,d:542523,l:{542521:{g:542521,gn:"普兰县",y:3064,s:0,d:0},542522:{g:542522,gn:"札达县",y:3067,s:0,d:0},542523:{g:542523,gn:"噶尔县",y:3062,s:0,d:0},542524:{g:542524,gn:"日土县",y:3066,s:0,d:0},542525:{g:542525,gn:"革吉县",y:3065,s:0,d:0},542526:{g:542526,gn:"改则县",y:3068,s:0,d:0},542527:{g:542527,gn:"措勤县",y:3063,s:0,d:0}}},542600:{g:542600,gn:"林芝地区",y:3069,s:0,d:542621,l:{542621:{g:542621,gn:"林芝县",y:3070,s:0,d:0},542622:{g:542622,gn:"工布江达县",y:3076,s:0,d:0},542623:{g:542623,gn:"米林县",y:3073,s:0,d:0},542624:{g:542624,gn:"墨脱县",y:3071,s:0,d:0},542625:{g:542625,gn:"波密县",y:3075,s:0,d:0},542626:{g:542626,gn:"察隅县",y:3074,s:0,d:0},542627:{g:542627,gn:"朗县",y:3072,s:0,d:0}}}}},610000:{g:610000,gn:"陕西省",y:2212,s:1,d:610100,l:{610100:{g:610100,gn:"西安市",y:2213,s:1,d:5053,l:{5053:{g:5053,gn:"高新区（绕城高速以内）",y:5053,s:1,d:0},5054:{g:5054,gn:"高新区（绕城高速以外）",y:5054,s:1,d:0},6072:{g:6072,gn:"西安经济技术开发区",y:6072,s:0,d:0},610102:{g:610102,gn:"新城区",y:2220,s:1,d:0},610103:{g:610103,gn:"碑林区",y:2226,s:1,d:0},610104:{g:610104,gn:"莲湖区",y:2219,s:1,d:0},610111:{g:610111,gn:"灞桥区",y:5051,s:1,d:5051,l:{5051:{g:5051,gn:"灞桥区（绕城高速以外）",y:5051,s:1,d:0},5052:{g:5052,gn:"灞桥区（绕城高速以内）",y:5052,s:1,d:0}}},610112:{g:610112,gn:"未央区",y:5055,s:1,d:5055,l:{5055:{g:5055,gn:"未央区（绕城高速以内）及未央大学城",y:5055,s:1,d:0},5056:{g:5056,gn:"未央区（绕城高速以外）",y:5056,s:1,d:0}}},610113:{g:610113,gn:"雁塔区",y:5057,s:1,d:5057,l:{5057:{g:5057,gn:"雁塔区（绕城高速以内）",y:5057,s:1,d:0},5058:{g:5058,gn:"雁塔区（绕城高速以外）",y:5058,s:1,d:0}}},610114:{g:610114,gn:"阎良区",y:6070,s:0,d:6070,l:{6070:{g:6070,gn:"阎良区（凤凰路街道、新华路街道）",y:6070,s:0,d:0},6071:{g:6071,gn:"阎良区（其他）",y:6071,s:0,d:0}}},610115:{g:610115,gn:"临潼区",y:2225,s:1,d:6068,l:{6068:{g:6068,gn:"临潼区（骊山街道、秦岭街道）",y:6068,s:0,d:0},6069:{g:6069,gn:"临潼区（其他）",y:6069,s:0,d:0}}},610116:{g:610116,gn:"长安区",y:5059,s:1,d:5059,l:{5059:{g:5059,gn:"长安区（大学城以内）",y:5059,s:1,d:0},5060:{g:5060,gn:"长安区（大学城以外）",y:5060,s:1,d:0}}},610122:{g:610122,gn:"蓝田县",y:2216,s:1,d:0},610124:{g:610124,gn:"周至县",y:2218,s:1,d:0},610125:{g:610125,gn:"户县",y:6066,s:0,d:6066,l:{6066:{g:6066,gn:"户县（甘亭镇）",y:6066,s:0,d:0},6067:{g:6067,gn:"户县（其他）",y:6067,s:0,d:0}}},610126:{g:610126,gn:"高陵县",y:6062,s:0,d:6062,l:{6062:{g:6062,gn:"高陵县（崇皇乡、泾河工业园、泾渭工业园）",y:6062,s:0,d:0},6063:{g:6063,gn:"高陵县（泾渭镇、鹿苑镇、通远镇、榆楚乡）",y:6063,s:0,d:0},6064:{g:6064,gn:"高陵县（其他）",y:6064,s:0,d:0}}}}},610200:{g:610200,gn:"铜川市",y:2227,s:0,d:6151,l:{6151:{g:6151,gn:"铜川新区（咸丰路街道、正阳路街道）",y:6151,s:0,d:0},6152:{g:6152,gn:"铜川新区（其他）",y:6152,s:0,d:0},610202:{g:610202,gn:"王益区",y:6153,s:0,d:6153,l:{6153:{g:6153,gn:"王益区（其他）",y:6153,s:0,d:0},6154:{g:6154,gn:"王益区（黄堡镇、王益乡）",y:6154,s:0,d:0}}},610203:{g:610203,gn:"印台区",y:6159,s:0,d:6159,l:{6159:{g:6159,gn:"印台区（城关街道、三里洞街道）",y:6159,s:0,d:0},6160:{g:6160,gn:"印台区（其他）",y:6160,s:0,d:0}}},610204:{g:610204,gn:"耀州区",y:6155,s:0,d:6155,l:{6155:{g:6155,gn:"耀州区（城关镇、关庄镇、柳林镇、庙湾镇）",y:6155,s:0,d:0},6156:{g:6156,gn:"耀州区（坡头镇、寺沟镇、天宝路街道、咸丰路街道）",y:6156,s:0,d:0},6157:{g:6157,gn:"耀州区（小丘镇、永安路街道、照金镇、正阳路街道）",y:6157,s:0,d:0},6158:{g:6158,gn:"耀州区（其他）",y:6158,s:0,d:0}}},610222:{g:610222,gn:"宜君县",y:2229,s:0,d:0}}},610300:{g:610300,gn:"宝鸡市",y:2232,s:1,d:2233,l:{2233:{g:2233,gn:"陈仓区（其他）",y:2233,s:1,d:0},6287:{g:6287,gn:"高新技术产业开发区",y:6287,s:0,d:0},610302:{g:610302,gn:"渭滨区",y:2243,s:1,d:2243,l:{2243:{g:2243,gn:"渭滨区（八鱼镇、晁峪乡、高家镇、神农镇）",y:2243,s:1,d:0},6290:{g:6290,gn:"渭滨区（其他）",y:6290,s:0,d:0}}},610303:{g:610303,gn:"金台区",y:2244,s:1,d:2244,l:{2244:{g:2244,gn:"金台区（金河乡、陵原乡、蟠龙镇、硖石乡）",y:2244,s:1,d:0},6288:{g:6288,gn:"金台区（其他）",y:6288,s:0,d:0}}},610304:{g:610304,gn:"陈仓区",y:6284,s:0,d:6284,l:{6284:{g:6284,gn:"陈仓区(东关街道、虢镇街道、虢镇镇)",y:6284,s:0,d:0},6285:{g:6285,gn:"陈仓区（胡店乡、千渭街道、桥镇镇）",y:6285,s:0,d:0}}},610322:{g:610322,gn:"凤翔县",y:2235,s:1,d:2235,l:{2235:{g:2235,gn:"凤翔县（其他）",y:2235,s:1,d:0},6286:{g:6286,gn:"凤翔县（城关镇）",y:6286,s:0,d:0}}},610323:{g:610323,gn:"岐山县",y:2234,s:1,d:2234,l:{2234:{g:2234,gn:"岐山县（其他）",y:2234,s:1,d:0},6289:{g:6289,gn:"岐山县（蔡家、蔡家坡镇）",y:6289,s:0,d:0}}},610324:{g:610324,gn:"扶风县",y:2239,s:1,d:0},610326:{g:610326,gn:"眉县",y:2241,s:1,d:0},610327:{g:610327,gn:"陇县",y:2236,s:0,d:0},610328:{g:610328,gn:"千阳县",y:2240,s:0,d:0},610329:{g:610329,gn:"麟游县",y:2238,s:0,d:0},610330:{g:610330,gn:"凤县",y:2242,s:0,d:0},610331:{g:610331,gn:"太白县",y:2237,s:0,d:0}}},610400:{g:610400,gn:"咸阳市",y:2245,s:1,d:610425,l:{5066:{g:5066,gn:"秦都区（主城区以外）",y:5066,s:1,d:0},610402:{g:610402,gn:"秦都区",y:5065,s:1,d:5065,l:{5065:{g:5065,gn:"秦都区（主城区）",y:5065,s:1,d:0}}},610403:{g:610403,gn:"杨陵区",y:2258,s:1,d:2258,l:{2258:{g:2258,gn:"杨陵区（杨陵街道）",y:2258,s:1,d:0},6769:{g:6769,gn:"杨陵区（其他）",y:6769,s:0,d:0}}},610404:{g:610404,gn:"渭城区",y:5067,s:1,d:5067,l:{5067:{g:5067,gn:"渭城区（主城区）",y:5067,s:1,d:0},5068:{g:5068,gn:"渭城区（主城区以外）",y:5068,s:1,d:0}}},610422:{g:610422,gn:"三原县",y:2249,s:1,d:2249,l:{2249:{g:2249,gn:"三原县（城关镇、中山街道）",y:2249,s:1,d:0},6767:{g:6767,gn:"三原县（其他）",y:6767,s:0,d:0}}},610423:{g:610423,gn:"泾阳县",y:2247,s:1,d:0},610424:{g:610424,gn:"乾县",y:2253,s:0,d:0},610425:{g:610425,gn:"礼泉县",y:2246,s:1,d:0},610426:{g:610426,gn:"永寿县",y:2248,s:0,d:0},610427:{g:610427,gn:"彬县",y:2250,s:0,d:0},610428:{g:610428,gn:"长武县",y:2252,s:0,d:0},610429:{g:610429,gn:"旬邑县",y:2251,s:0,d:0},610430:{g:610430,gn:"淳化县",y:2255,s:0,d:0},610431:{g:610431,gn:"武功县",y:2254,s:1,d:0},610481:{g:610481,gn:"兴平市",y:3437,s:1,d:3437,l:{3437:{g:3437,gn:"兴平市（东城街道、西城街道）",y:3437,s:1,d:0},6768:{g:6768,gn:"兴平市（其他）",y:6768,s:0,d:0}}}}},610500:{g:610500,gn:"渭南市",y:2273,s:1,d:610581,l:{610502:{g:610502,gn:"临渭区",y:2284,s:1,d:0},610521:{g:610521,gn:"华县",y:2280,s:1,d:0},610522:{g:610522,gn:"潼关县",y:2277,s:1,d:0},610523:{g:610523,gn:"大荔县",y:2283,s:0,d:0},610524:{g:610524,gn:"合阳县",y:2281,s:0,d:0},610525:{g:610525,gn:"澄城县",y:2279,s:0,d:0},610526:{g:610526,gn:"蒲城县",y:2276,s:1,d:0},610527:{g:610527,gn:"白水县",y:2278,s:0,d:0},610528:{g:610528,gn:"富平县",y:2282,s:1,d:0},610581:{g:610581,gn:"韩城市",y:2274,s:0,d:0},610582:{g:610582,gn:"华阴市",y:2275,s:1,d:0}}},610600:{g:610600,gn:"延安市",y:2259,s:1,d:610624,l:{610602:{g:610602,gn:"宝塔区",y:2272,s:1,d:0},610621:{g:610621,gn:"延长县",y:2266,s:0,d:0},610622:{g:610622,gn:"延川县",y:2264,s:0,d:0},610623:{g:610623,gn:"子长县",y:2262,s:0,d:0},610624:{g:610624,gn:"安塞县",y:2260,s:0,d:0},610625:{g:610625,gn:"志丹县",y:2269,s:0,d:0},610626:{g:610626,gn:"吴旗县",y:2271,s:0,d:0},610627:{g:610627,gn:"甘泉县",y:2267,s:0,d:0},610628:{g:610628,gn:"富县",y:2265,s:0,d:0},610629:{g:610629,gn:"洛川县",y:2261,s:0,d:0},610630:{g:610630,gn:"宜川县",y:2268,s:0,d:0},610631:{g:610631,gn:"黄龙县",y:2270,s:0,d:0},610632:{g:610632,gn:"黄陵县",y:2263,s:0,d:0}}},610700:{g:610700,gn:"汉中市",y:2317,s:1,d:610729,l:{610702:{g:610702,gn:"汉台区",y:2328,s:1,d:2328,l:{2328:{g:2328,gn:"汉台区（北关街道、东大街道、东关街道、汉中路街道）",y:2328,s:1,d:0},6770:{g:6770,gn:"汉台区（铺镇、中山街道、宗营镇、老君镇）",y:6770,s:0,d:0},6771:{g:6771,gn:"汉台区（其他）",y:6771,s:0,d:0}}},610721:{g:610721,gn:"南郑县",y:2321,s:0,d:2321,l:{2321:{g:2321,gn:"南郑县（其他）",y:2321,s:0,d:0},6772:{g:6772,gn:"南郑县（大河坎镇）",y:6772,s:0,d:0}}},610722:{g:610722,gn:"城固县",y:2320,s:0,d:0},610723:{g:610723,gn:"洋县",y:2322,s:0,d:0},610724:{g:610724,gn:"西乡县",y:2326,s:0,d:0},610725:{g:610725,gn:"勉县",y:2325,s:0,d:0},610726:{g:610726,gn:"宁强县",y:2323,s:0,d:0},610727:{g:610727,gn:"略阳县",y:2327,s:0,d:0},610728:{g:610728,gn:"镇巴县",y:2319,s:0,d:0},610729:{g:610729,gn:"留坝县",y:2318,s:0,d:0},610730:{g:610730,gn:"佛坪县",y:2324,s:0,d:0}}},610800:{g:610800,gn:"榆林市",y:2304,s:1,d:610826,l:{610802:{g:610802,gn:"榆阳区",y:2316,s:1,d:0},610821:{g:610821,gn:"神木县",y:2306,s:0,d:0},610822:{g:610822,gn:"府谷县",y:2308,s:0,d:0},610823:{g:610823,gn:"横山县",y:2311,s:0,d:0},610824:{g:610824,gn:"靖边县",y:2310,s:0,d:0},610825:{g:610825,gn:"定边县",y:2314,s:0,d:0},610826:{g:610826,gn:"绥德县",y:2305,s:0,d:0},610827:{g:610827,gn:"米脂县",y:2312,s:0,d:0},610828:{g:610828,gn:"佳县",y:2307,s:0,d:0},610829:{g:610829,gn:"吴堡县",y:2313,s:0,d:0},610830:{g:610830,gn:"清涧县",y:2315,s:0,d:0},610831:{g:610831,gn:"子洲县",y:2309,s:0,d:0}}},610900:{g:610900,gn:"安康地区(安康市)",y:2293,s:1,d:610902,l:{610902:{g:610902,gn:"汉滨区",y:2294,s:1,d:0},610921:{g:610921,gn:"汉阴县",y:2302,s:0,d:0},610922:{g:610922,gn:"石泉县",y:2299,s:0,d:0},610923:{g:610923,gn:"宁陕县",y:2300,s:0,d:0},610924:{g:610924,gn:"紫阳县",y:2295,s:0,d:0},610925:{g:610925,gn:"岚皋县",y:2303,s:0,d:0},610926:{g:610926,gn:"平利县",y:2298,s:0,d:0},610927:{g:610927,gn:"镇坪县",y:2297,s:0,d:0},610928:{g:610928,gn:"旬阳县",y:2296,s:0,d:0},610929:{g:610929,gn:"白河县",y:2301,s:0,d:0}}},611000:{g:611000,gn:"商洛地区(商州市)",y:2285,s:1,d:611002,l:{611002:{g:611002,gn:"商州区",y:2286,s:1,d:0},611021:{g:611021,gn:"洛南县",y:2289,s:0,d:0},611022:{g:611022,gn:"丹凤县",y:2291,s:0,d:0},611023:{g:611023,gn:"商南县",y:2290,s:0,d:0},611024:{g:611024,gn:"山阳县",y:2288,s:0,d:0},611025:{g:611025,gn:"镇安县",y:2287,s:0,d:0},611026:{g:611026,gn:"柞水县",y:2292,s:0,d:0}}}}},620000:{g:620000,gn:"甘肃省",y:299,s:0,d:620100,l:{620100:{g:620100,gn:"兰州市",y:300,s:1,d:620102,l:{620102:{g:620102,gn:"城关区",y:5763,s:0,d:5763,l:{5763:{g:5763,gn:"城关区（主城区）",y:5763,s:0,d:0},5764:{g:5764,gn:"城关区（其他区域）",y:5764,s:0,d:0}}},620103:{g:620103,gn:"七里河区",y:5765,s:0,d:5765,l:{5765:{g:5765,gn:"七里河区（主城区）",y:5765,s:0,d:0},5766:{g:5766,gn:"七里河区（其他区域）",y:5766,s:0,d:0}}},620104:{g:620104,gn:"西固区",y:307,s:1,d:0},620105:{g:620105,gn:"安宁区",y:5767,s:0,d:5767,l:{5767:{g:5767,gn:"安宁区（主城区）",y:5767,s:0,d:0},5768:{g:5768,gn:"安宁区（其他区域）",y:5768,s:0,d:0}}},620111:{g:620111,gn:"红古区",y:309,s:0,d:0},620121:{g:620121,gn:"永登县",y:302,s:0,d:0},620122:{g:620122,gn:"皋兰县",y:304,s:0,d:0},620123:{g:620123,gn:"榆中县",y:303,s:0,d:0}}},620200:{g:620200,gn:"嘉峪关市",y:329,s:0,d:330,l:{330:{g:330,gn:"嘉峪关市",y:330,s:0,d:0}}},620300:{g:620300,gn:"金昌市",y:310,s:0,d:620321,l:{620302:{g:620302,gn:"金川区",y:312,s:0,d:0},620321:{g:620321,gn:"永昌县",y:311,s:0,d:0}}},620400:{g:620400,gn:"白银市",y:313,s:0,d:620402,l:{620402:{g:620402,gn:"白银区",y:318,s:0,d:0},620403:{g:620403,gn:"平川区",y:319,s:0,d:0},620421:{g:620421,gn:"靖远县",y:315,s:0,d:0},620422:{g:620422,gn:"会宁县",y:317,s:0,d:0},620423:{g:620423,gn:"景泰县",y:316,s:0,d:0}}},620500:{g:620500,gn:"天水市",y:320,s:0,d:620502,l:{620502:{g:620502,gn:"秦州区",y:327,s:0,d:0},620503:{g:620503,gn:"麦积区",y:328,s:0,d:0},620521:{g:620521,gn:"清水县",y:324,s:0,d:0},620522:{g:620522,gn:"秦安县",y:325,s:0,d:0},620523:{g:620523,gn:"甘谷县",y:323,s:0,d:0},620524:{g:620524,gn:"武山县",y:322,s:0,d:0},620525:{g:620525,gn:"张家川回族自治县",y:326,s:0,d:0}}},620600:{g:620600,gn:"武威市",y:366,s:0,d:620621,l:{620602:{g:620602,gn:"凉州区",y:370,s:0,d:0},620621:{g:620621,gn:"民勤县",y:367,s:0,d:0},620622:{g:620622,gn:"古浪县",y:368,s:0,d:0},620623:{g:620623,gn:"天祝藏族自治县",y:369,s:0,d:0}}},620700:{g:620700,gn:"张掖市",y:371,s:0,d:620723,l:{620702:{g:620702,gn:"甘州区",y:377,s:0,d:0},620721:{g:620721,gn:"肃南裕固族自治县",y:376,s:0,d:0},620722:{g:620722,gn:"民乐县",y:375,s:0,d:0},620723:{g:620723,gn:"临泽县",y:372,s:0,d:0},620724:{g:620724,gn:"高台县",y:373,s:0,d:0},620725:{g:620725,gn:"山丹县",y:374,s:0,d:0}}},620800:{g:620800,gn:"平凉市",y:339,s:0,d:620822,l:{620802:{g:620802,gn:"崆峒区",y:346,s:0,d:0},620821:{g:620821,gn:"泾川县",y:344,s:0,d:0},620822:{g:620822,gn:"灵台县",y:340,s:0,d:0},620823:{g:620823,gn:"崇信县",y:342,s:0,d:0},620824:{g:620824,gn:"华亭县",y:343,s:0,d:0},620825:{g:620825,gn:"庄浪县",y:345,s:0,d:0},620826:{g:620826,gn:"静宁县",y:341,s:0,d:0}}},620900:{g:620900,gn:"酒泉市",y:378,s:0,d:620981,l:{620902:{g:620902,gn:"肃州区",y:380,s:0,d:0},620921:{g:620921,gn:"金塔县",y:383,s:0,d:0},620922:{g:620922,gn:"瓜州县",y:382,s:0,d:0},620923:{g:620923,gn:"肃北蒙古族自治县",y:385,s:0,d:0},620924:{g:620924,gn:"阿克塞哈萨克族自治县",y:384,s:0,d:0},620981:{g:620981,gn:"玉门市",y:379,s:0,d:0},620982:{g:620982,gn:"敦煌市",y:381,s:0,d:0}}},621000:{g:621000,gn:"庆阳市",y:347,s:0,d:621021,l:{621002:{g:621002,gn:"西峰区",y:355,s:0,d:0},621021:{g:621021,gn:"庆城县",y:348,s:0,d:0},621022:{g:621022,gn:"环县",y:352,s:0,d:0},621023:{g:621023,gn:"华池县",y:351,s:0,d:0},621024:{g:621024,gn:"合水县",y:350,s:0,d:0},621025:{g:621025,gn:"正宁县",y:354,s:0,d:0},621026:{g:621026,gn:"宁县",y:353,s:0,d:0},621027:{g:621027,gn:"镇原县",y:349,s:0,d:0}}},621100:{g:621100,gn:"定西市",y:331,s:0,d:621102,l:{621102:{g:621102,gn:"安定区",y:332,s:0,d:0},621121:{g:621121,gn:"通渭县",y:336,s:0,d:0},621122:{g:621122,gn:"陇西县",y:335,s:0,d:0},621123:{g:621123,gn:"渭源县",y:334,s:0,d:0},621124:{g:621124,gn:"临洮县",y:338,s:0,d:0},621125:{g:621125,gn:"漳县",y:337,s:0,d:0},621126:{g:621126,gn:"岷县",y:333,s:0,d:0}}},621200:{g:621200,gn:"陇南市",y:356,s:0,d:621221,l:{621202:{g:621202,gn:"武都县",y:360,s:0,d:0},621221:{g:621221,gn:"成县",y:357,s:0,d:0},621222:{g:621222,gn:"文县",y:365,s:0,d:0},621223:{g:621223,gn:"宕昌县",y:363,s:0,d:0},621224:{g:621224,gn:"康县",y:359,s:0,d:0},621225:{g:621225,gn:"西和县",y:364,s:0,d:0},621226:{g:621226,gn:"礼县",y:358,s:0,d:0},621227:{g:621227,gn:"徽县",y:362,s:0,d:0},621228:{g:621228,gn:"两当县",y:361,s:0,d:0}}},622900:{g:622900,gn:"临夏市",y:395,s:0,d:622921,l:{622901:{g:622901,gn:"临夏市",y:3766,s:0,d:0},622921:{g:622921,gn:"临夏县",y:396,s:0,d:0},622922:{g:622922,gn:"康乐县",y:397,s:0,d:0},622923:{g:622923,gn:"永靖县",y:398,s:0,d:0},622924:{g:622924,gn:"广河县",y:399,s:0,d:0},622925:{g:622925,gn:"和政县",y:400,s:0,d:0},622926:{g:622926,gn:"东乡族自治县",y:401,s:0,d:0},622927:{g:622927,gn:"积石山保安族东乡族撒拉族自治县",y:402,s:0,d:0}}},623000:{g:623000,gn:"甘南藏族自治州",y:386,s:0,d:623001,l:{623001:{g:623001,gn:"合作市",y:387,s:0,d:0},623021:{g:623021,gn:"临潭县",y:388,s:0,d:0},623022:{g:623022,gn:"卓尼县",y:389,s:0,d:0},623023:{g:623023,gn:"舟曲县",y:390,s:0,d:0},623024:{g:623024,gn:"迭部县",y:391,s:0,d:0},623025:{g:623025,gn:"玛曲县",y:392,s:0,d:0},623026:{g:623026,gn:"碌曲县",y:393,s:0,d:0},623027:{g:623027,gn:"夏河县",y:394,s:0,d:0}}}}},630000:{g:630000,gn:"青海省",y:2160,s:1,d:630100,l:{630100:{g:630100,gn:"西宁市",y:2161,s:1,d:630123,l:{5194:{g:5194,gn:"城南新区",y:5194,s:1,d:0},5195:{g:5195,gn:"海湖新区",y:5195,s:1,d:0},630102:{g:630102,gn:"城东区",y:2166,s:1,d:0},630103:{g:630103,gn:"城中区",y:2165,s:1,d:0},630104:{g:630104,gn:"城西区",y:2167,s:1,d:0},630105:{g:630105,gn:"城北区",y:2168,s:1,d:0},630121:{g:630121,gn:"大通回族土族自治县",y:2164,s:0,d:0},630122:{g:630122,gn:"湟中县",y:2163,s:0,d:0},630123:{g:630123,gn:"湟源县",y:2162,s:0,d:0}}},632100:{g:632100,gn:"海东地区(平安县)",y:2169,s:0,d:632121,l:{632121:{g:632121,gn:"平安县",y:2170,s:0,d:0},632122:{g:632122,gn:"民和回族土族自治县",y:2172,s:0,d:0},632123:{g:632123,gn:"乐都县",y:2171,s:0,d:0},632126:{g:632126,gn:"互助土族自治县",y:2173,s:0,d:0},632127:{g:632127,gn:"化隆回族自治县",y:2174,s:0,d:0},632128:{g:632128,gn:"循化撒拉族自治县",y:2175,s:0,d:0}}},632200:{g:632200,gn:"海北藏族自治州(门源回族自治县)",y:2176,s:0,d:632223,l:{632221:{g:632221,gn:"门源回族自治县",y:2180,s:0,d:0},632222:{g:632222,gn:"祁连县",y:2178,s:0,d:0},632223:{g:632223,gn:"海晏县",y:2177,s:0,d:0},632224:{g:632224,gn:"刚察县",y:2179,s:0,d:0}}},632300:{g:632300,gn:"黄南藏族自治州(同仁县)",y:2181,s:0,d:632321,l:{632321:{g:632321,gn:"同仁县",y:2182,s:0,d:0},632322:{g:632322,gn:"尖扎县",y:2184,s:0,d:0},632323:{g:632323,gn:"泽库县",y:2183,s:0,d:0},632324:{g:632324,gn:"河南蒙古族自治县",y:2185,s:0,d:0}}},632500:{g:632500,gn:"海南藏族自治州(共和县)",y:2186,s:0,d:632521,l:{632521:{g:632521,gn:"共和县",y:2187,s:0,d:0},632522:{g:632522,gn:"同德县",y:2188,s:0,d:0},632523:{g:632523,gn:"贵德县",y:2189,s:0,d:0},632524:{g:632524,gn:"兴海县",y:2190,s:0,d:0},632525:{g:632525,gn:"贵南县",y:2191,s:0,d:0}}},632600:{g:632600,gn:"果洛藏族自治州(玛沁县)",y:2192,s:0,d:632621,l:{632621:{g:632621,gn:"玛沁县",y:2193,s:0,d:0},632622:{g:632622,gn:"班玛县",y:2194,s:0,d:0},632623:{g:632623,gn:"甘德县",y:2195,s:0,d:0},632624:{g:632624,gn:"达日县",y:2196,s:0,d:0},632625:{g:632625,gn:"久治县",y:2197,s:0,d:0},632626:{g:632626,gn:"玛多县",y:2198,s:0,d:0}}},632700:{g:632700,gn:"玉树藏族自治州(玉树县)",y:2199,s:0,d:632721,l:{632721:{g:632721,gn:"玉树县",y:2200,s:0,d:0},632722:{g:632722,gn:"杂多县",y:2201,s:0,d:0},632723:{g:632723,gn:"称多县",y:2202,s:0,d:0},632724:{g:632724,gn:"治多县",y:2205,s:0,d:0},632725:{g:632725,gn:"囊谦县",y:2203,s:0,d:0},632726:{g:632726,gn:"曲麻莱县",y:2204,s:0,d:0}}},632800:{g:632800,gn:"海西蒙古族藏族自治州(德令哈市)",y:2206,s:0,d:632802,l:{632801:{g:632801,gn:"格尔木市",y:2208,s:0,d:0},632802:{g:632802,gn:"德令哈市",y:2207,s:0,d:0},632821:{g:632821,gn:"乌兰县",y:2209,s:0,d:0},632822:{g:632822,gn:"都兰县",y:2211,s:0,d:0},632823:{g:632823,gn:"天峻县",y:2210,s:0,d:0}}}}},640000:{g:640000,gn:"宁夏回族自治区",y:2130,s:0,d:640100,l:{640100:{g:640100,gn:"银川市",y:2131,s:1,d:640121,l:{640104:{g:640104,gn:"兴庆区",y:2136,s:1,d:0},640105:{g:640105,gn:"西夏区",y:2134,s:1,d:0},640106:{g:640106,gn:"金凤区",y:2135,s:1,d:0},640121:{g:640121,gn:"永宁县",y:2132,s:0,d:0},640122:{g:640122,gn:"贺兰县",y:2133,s:0,d:0},640181:{g:640181,gn:"灵武市",y:2137,s:0,d:0}}},640200:{g:640200,gn:"石嘴山市",y:2138,s:0,d:640221,l:{640202:{g:640202,gn:"大武口区",y:2142,s:0,d:0},640205:{g:640205,gn:"惠农区",y:2141,s:0,d:0},640221:{g:640221,gn:"平罗县",y:2139,s:0,d:0}}},640300:{g:640300,gn:"吴忠市",y:2145,s:0,d:640381,l:{640302:{g:640302,gn:"利通区",y:2152,s:0,d:0},640303:{g:640303,gn:"红寺堡区",y:3596,s:0,d:0},640323:{g:640323,gn:"盐池县",y:2149,s:0,d:0},640324:{g:640324,gn:"同心县",y:2148,s:0,d:0},640381:{g:640381,gn:"青铜峡市",y:2146,s:0,d:0}}},640400:{g:640400,gn:"固原市",y:2153,s:0,d:640402,l:{640402:{g:640402,gn:"原州区",y:2154,s:0,d:0},640422:{g:640422,gn:"西吉县",y:2156,s:0,d:0},640423:{g:640423,gn:"隆德县",y:2157,s:0,d:0},640424:{g:640424,gn:"泾源县",y:2158,s:0,d:0},640425:{g:640425,gn:"彭阳县",y:2159,s:0,d:0}}},640500:{g:640500,gn:"中卫市",y:3518,s:0,d:640502,l:{640502:{g:640502,gn:"沙坡头区",y:3519,s:0,d:0},640521:{g:640521,gn:"中宁县",y:3520,s:0,d:0},640522:{g:640522,gn:"海原县",y:3521,s:0,d:0}}}}},650000:{g:650000,gn:"新疆维吾尔自治区",y:2878,s:0,d:650100,l:{650100:{g:650100,gn:"乌鲁木齐市",y:2879,s:0,d:650102,l:{650102:{g:650102,gn:"天山区",y:2880,s:0,d:0},650103:{g:650103,gn:"沙依巴克区",y:2881,s:0,d:0},650104:{g:650104,gn:"新市区",y:2882,s:0,d:0},650105:{g:650105,gn:"水磨沟区",y:2883,s:0,d:0},650106:{g:650106,gn:"头屯河区",y:2884,s:0,d:0},650107:{g:650107,gn:"达坂城区",y:2885,s:0,d:0},650109:{g:650109,gn:"米东区",y:3506,s:0,d:0},650121:{g:650121,gn:"乌鲁木齐县",y:2887,s:0,d:0}}},650200:{g:650200,gn:"克拉玛依市",y:2888,s:0,d:650203,l:{650202:{g:650202,gn:"独山子区",y:2890,s:0,d:0},650203:{g:650203,gn:"克拉玛依区",y:2889,s:0,d:0},650204:{g:650204,gn:"白碱滩区",y:2891,s:0,d:0},650205:{g:650205,gn:"乌尔禾区",y:2892,s:0,d:0}}},652100:{g:652100,gn:"吐鲁番地区",y:2899,s:0,d:652101,l:{652101:{g:652101,gn:"吐鲁番市",y:2900,s:0,d:0},652122:{g:652122,gn:"鄯善县",y:2902,s:0,d:0},652123:{g:652123,gn:"托克逊县",y:2901,s:0,d:0}}},652200:{g:652200,gn:"哈密地区",y:2903,s:0,d:652201,l:{652201:{g:652201,gn:"哈密市",y:2904,s:0,d:0},652222:{g:652222,gn:"巴里坤哈萨克自治县",y:2906,s:0,d:0},652223:{g:652223,gn:"伊吾县",y:2905,s:0,d:0}}},652300:{g:652300,gn:"昌吉回族自治州",y:2954,s:0,d:652301,l:{652301:{g:652301,gn:"昌吉市",y:2955,s:0,d:0},652302:{g:652302,gn:"阜康市",y:2956,s:0,d:0},652323:{g:652323,gn:"呼图壁县",y:2961,s:0,d:0},652324:{g:652324,gn:"玛纳斯县",y:2959,s:0,d:0},652325:{g:652325,gn:"奇台县",y:2958,s:0,d:0},652327:{g:652327,gn:"吉木萨尔县",y:2963,s:0,d:0},652328:{g:652328,gn:"木垒哈萨克自治县",y:2962,s:0,d:0}}},652700:{g:652700,gn:"博尔塔拉蒙古自治州(博乐市)",y:2964,s:0,d:652701,l:{652701:{g:652701,gn:"博乐市",y:2965,s:0,d:0},652722:{g:652722,gn:"精河县",y:2966,s:0,d:0},652723:{g:652723,gn:"温泉县",y:2967,s:0,d:0}}},652800:{g:652800,gn:"巴音郭楞蒙古自治州(库尔勒市)",y:2944,s:0,d:652827,l:{652801:{g:652801,gn:"库尔勒市",y:2953,s:0,d:0},652822:{g:652822,gn:"轮台县",y:2950,s:0,d:0},652823:{g:652823,gn:"尉犁县",y:2946,s:0,d:0},652824:{g:652824,gn:"若羌县",y:2951,s:0,d:0},652825:{g:652825,gn:"且末县",y:2948,s:0,d:0},652826:{g:652826,gn:"焉耆回族自治县",y:2952,s:0,d:0},652827:{g:652827,gn:"和静县",y:2945,s:0,d:0},652828:{g:652828,gn:"和硕县",y:2947,s:0,d:0},652829:{g:652829,gn:"博湖县",y:2949,s:0,d:0}}},652900:{g:652900,gn:"阿克苏地区(阿克苏市)",y:2916,s:0,d:652901,l:{652901:{g:652901,gn:"阿克苏市",y:2917,s:0,d:0},652922:{g:652922,gn:"温宿县",y:2918,s:0,d:0},652923:{g:652923,gn:"库车县",y:2922,s:0,d:0},652924:{g:652924,gn:"沙雅县",y:2919,s:0,d:0},652925:{g:652925,gn:"新和县",y:2924,s:0,d:0},652926:{g:652926,gn:"拜城县",y:2920,s:0,d:0},652927:{g:652927,gn:"乌什县",y:2925,s:0,d:0},652928:{g:652928,gn:"阿瓦提县",y:2921,s:0,d:0},652929:{g:652929,gn:"柯坪县",y:2923,s:0,d:0}}},653000:{g:653000,gn:"克孜勒苏柯尔克孜自治州(阿图什布)",y:2939,s:0,d:653001,l:{653001:{g:653001,gn:"阿图什市",y:2940,s:0,d:0},653022:{g:653022,gn:"阿克陶县",y:2943,s:0,d:0},653023:{g:653023,gn:"阿合奇县",y:2941,s:0,d:0},653024:{g:653024,gn:"乌恰县",y:2942,s:0,d:0}}},653100:{g:653100,gn:"喀什地区(喀什市)",y:2926,s:0,d:653101,l:{653101:{g:653101,gn:"喀什市",y:2927,s:0,d:0},653121:{g:653121,gn:"疏附县",y:2936,s:0,d:0},653122:{g:653122,gn:"疏勒县",y:2933,s:0,d:0},653123:{g:653123,gn:"英吉沙县",y:2938,s:0,d:0},653124:{g:653124,gn:"泽普县",y:2929,s:0,d:0},653125:{g:653125,gn:"莎车县",y:2935,s:0,d:0},653126:{g:653126,gn:"叶城县",y:2931,s:0,d:0},653127:{g:653127,gn:"麦盖提县",y:2934,s:0,d:0},653128:{g:653128,gn:"岳普湖县",y:2932,s:0,d:0},653129:{g:653129,gn:"伽师县",y:2930,s:0,d:0},653130:{g:653130,gn:"巴楚县",y:2928,s:0,d:0},653131:{g:653131,gn:"塔什库尔干塔吉克自治县",y:2937,s:0,d:0}}},653200:{g:653200,gn:"和田地区(和田市)",y:2907,s:0,d:653201,l:{653201:{g:653201,gn:"和田市",y:2908,s:0,d:0},653221:{g:653221,gn:"和田县",y:2909,s:0,d:0},653222:{g:653222,gn:"墨玉县",y:2915,s:0,d:0},653223:{g:653223,gn:"皮山县",y:2912,s:0,d:0},653224:{g:653224,gn:"洛浦县",y:2910,s:0,d:0},653225:{g:653225,gn:"策勒县",y:2913,s:0,d:0},653226:{g:653226,gn:"于田县",y:2914,s:0,d:0},653227:{g:653227,gn:"民丰县",y:2911,s:0,d:0}}},654000:{g:654000,gn:"伊犁哈萨克自治州",y:2968,s:0,d:654003,l:{654002:{g:654002,gn:"伊宁市",y:2970,s:0,d:0},654003:{g:654003,gn:"奎屯市",y:2969,s:0,d:0},654021:{g:654021,gn:"伊宁县",y:2973,s:0,d:0},654022:{g:654022,gn:"察布查尔锡伯自治县",y:2980,s:0,d:0},654023:{g:654023,gn:"霍城县",y:2978,s:0,d:0},654024:{g:654024,gn:"巩留县",y:2979,s:0,d:0},654025:{g:654025,gn:"新源县",y:2977,s:0,d:0},654026:{g:654026,gn:"昭苏县",y:2976,s:0,d:0},654027:{g:654027,gn:"特克斯县",y:2974,s:0,d:0},654028:{g:654028,gn:"尼勒克县",y:2975,s:0,d:0},654201:{g:654201,gn:"塔城市",y:2971,s:0,d:0},654202:{g:654202,gn:"乌苏市",y:2972,s:0,d:0},654221:{g:654221,gn:"额敏县",y:2981,s:0,d:0},654223:{g:654223,gn:"沙湾县",y:2983,s:0,d:0},654224:{g:654224,gn:"托里县",y:2984,s:0,d:0},654225:{g:654225,gn:"裕民县",y:2982,s:0,d:0},654226:{g:654226,gn:"和布克赛尔蒙古自治县",y:2985,s:0,d:0},654301:{g:654301,gn:"阿勒泰市",y:2986,s:0,d:0},654321:{g:654321,gn:"布尔津县",y:2990,s:0,d:0},654322:{g:654322,gn:"富蕴县",y:2989,s:0,d:0},654323:{g:654323,gn:"福海县",y:3707,s:0,d:0},654324:{g:654324,gn:"哈巴河县",y:2992,s:0,d:0},654325:{g:654325,gn:"青河县",y:2987,s:0,d:0},654326:{g:654326,gn:"吉木乃县",y:2988,s:0,d:0}}},659000:{g:659000,gn:"直辖行政单位",y:2893,s:0,d:659001,l:{659001:{g:659001,gn:"石河子市",y:2894,s:0,d:0},659002:{g:659002,gn:"阿拉尔市",y:2897,s:0,d:0},659003:{g:659003,gn:"图木舒克市",y:2895,s:0,d:0},659004:{g:659004,gn:"五家渠市",y:2898,s:0,d:0}}}}}};
//初始化函数，主要进行数据的提取
regionYX.prototype.init=function(){
    if(!this.constructor.prototype.dataMap){
        //国标扩展版Map【以国标扩展版ID为key】
        var dataMap={};
        //易迅Map【以易迅ID为key】
        var dataYXMap={};
        //递归data的数据
        //父节点Id
        (function(data,p){
            if(!data)return;
            for(var i in data){
                data[i]["p"]=p;//父id
                dataMap[i]=data[i];

                //易迅id
                if(data[i].y && data[i].y!="0"){
                    dataYXMap[data[i].y]=data[i];
                }

                if(data[i].l){
                    arguments.callee(data[i].l,i);
                }
            }
        })(this.data,"0");
        this.constructor.prototype.dataMap=dataMap;
        this.constructor.prototype.dataYXMap=dataYXMap;
        //console.log(dataMap);
    }
}

regionYX.prototype.formatStdData=function(node){
    //console.log(node);
    var path=[{id:node.g,yid:node.y,name:node.gn}];

    //寻找父
    var p = node.p;
    while(p!="0" && this.dataMap[p]){
        var curNode=this.dataMap[p];
        path.unshift({id:curNode.g,yid:curNode.y,name:curNode.gn});
        p=curNode.p;
    }

    //寻找子
    var l = node.l;
    var d = node.d;
    while(l){
        var child = null;
        if(d!="0"&&l[d]){
            child=l[d];
        }else{
            //默认为第一个节点
            for(var i in l){
                child=l[i];
            }
        }

        if(child){
            path.push({id:child.g,yid:child.y,name:child.gn});
            l=child.l;
            d=child.d;
        }else{
            break;
        }
    }

    //把path数据转换成标准数据
    var retobj= {
        y_pid:(path[0]&&path[0].yid)||null,//易迅省
        y_pname:(path[0]&&path[0].name)||null,
        y_cid:(path[1]&&path[1].yid)||null,//易迅市
        y_cname:(path[1]&&path[1].name)||null,
        y_did:(path[path.length-1]&&path[path.length-1].yid)||null,//易迅区
        y_dname:(path[path.length-1]&&path[path.length-1].name)||null,
        g_pid:(path[0]&&path[0].id)||null,//国标扩展省
        g_pname:(path[0]&&path[0].name)||null,
        g_cid:(path[1]&&path[1].id)||null,//国标扩展市
        g_cname:(path[1]&&path[1].name)||null,
        g_did:(path[2]&&path[2].id)||null,//国标扩展区
        g_dname:(path[2]&&path[2].name)||null,
        g_aid:(path[3]&&path[3].id)||null,//国标扩展分区
        g_aname:(path[3]&&path[3].name)||null
    };

    return retobj;
}

//根据易标（区id）或（省id）获取层级地域数据
regionYX.prototype.getLocInfoByPrid=function(did,pid){
    var dataNode = null;
    if(!dataNode && did && did!="0"){
        dataNode = this.dataYXMap[did];
    }

    if(!dataNode && pid && pid!="0"){
        dataNode = this.dataYXMap[pid];
    }

    if(dataNode){
        return this.formatStdData(dataNode);
    }
    return null;
}



//根据国标扩展版四级ID，获取层级地域数据
regionYX.prototype.getLocInfo=function(aid,did,cid,pid){
    var dataNode = null;
    if(!dataNode && aid && aid!="0"){
        dataNode = this.dataMap[aid];
    }

    if(!dataNode && did && did!="0"){
        dataNode = this.dataMap[did];
    }

    if(!dataNode && cid && cid!="0"){
        dataNode = this.dataMap[cid];
    }

    if(!dataNode && pid && pid!="0"){
        dataNode = this.dataMap[pid];
    }

    if(dataNode){
        return this.formatStdData(dataNode);
    }
    return null;
}

//获取省的信息列表
regionYX.prototype.getProvinceList=function(){
    var retList=[];
    for(var i in this.dataMap){
        var node = this.dataMap[i];
        //必须要有子节点
        if(node.p=="0" && node.l){
            retList.push({
                cod:(node.s=="1"),
                y_pid:node.y,
                y_pname:node.gn,
                g_pid:node.g,
                g_pname:node.gn
            });
        }
    }
    return retList;
}

//获取市的信息列表
regionYX.prototype.getCityListByPid=function(pid){
    pid=pid+"";//转成字符串
    var retList=[];
    for(var i in this.dataMap){
        var node = this.dataMap[i];
        //必须要有子节点
        if(node.p==pid && node.l){
            retList.push({
                cod:(node.s=="1"),
                y_cid:node.y,
                y_cname:node.gn,
                g_cid:node.g,
                g_cname:node.gn
            });
        }
    }
    return retList;
}

//获取地级信息
regionYX.prototype.getDistrictListByCid=function(cid){
    cid=cid+"";//转成字符串
    var retList=[];
    for(var i in this.dataMap){
        var node = this.dataMap[i];
        if(node.p==cid){
            retList.push({
                cod:(node.s=="1"),
                y_did:node.y,
                y_dname:node.gn,
                g_did:node.g,
                g_dname:node.gn
            });
        }
    }
    return retList;
}

//获取区级信息
regionYX.prototype.getAreaListByDid=function(did){
    did=did+"";//转成字符串
    var retList=[];
    for(var i in this.dataMap){
        var node = this.dataMap[i];
        if(node.p==did){
            retList.push({
                cod:(node.s=="1"),
                g_aid:node.g,
                g_aname:node.gn
            });
        }
    }
    return retList;
}

//根据名称获取包含名称的地区
regionYX.prototype.getRegionInfoByName=function(name){
    var retList=[];
    for(var i in this.dataMap){
        var node = this.dataMap[i];
        if(node.gn.indexOf(name)>-1){
            retList.push({
                cod:(node.s=="1"),
                g_aid:node.g,
                g_aname:node.gn
            });
        }
    }
    return retList;
}

/*  |xGv00|93f04cc8e83dd9fc5f370a76e0fa34de */