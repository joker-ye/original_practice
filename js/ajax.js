jQuery.fn.placeholder = function () {
	var i = document.createElement('input'),
		placeholdersupport = 'placeholder' in i;
	if (!placeholdersupport) {
		var inputs = jQuery(this);
		inputs.each(function () {
			var input = jQuery(this),
				text = input.attr('placeholder'),
				pdl = 0,
				height = input.outerHeight(),
				width = input.outerWidth(),
				placeholder = jQuery('<span class="phTips">' + text + '</span>');
			try {
				pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
			} catch (e) {
				pdl = 5;
			}
			placeholder.css({
				'margin': 0, 'margin-left': -(width - pdl),
				'height': height,
				'line-height': height + "px",
				'position': 'absolute',
				'color': "#cecfc9",
				'bottom': 'auto',
				'left': 'auto',
				'top': 'auto',
				'bottom': 'auto',
				'font-size': "12px"
			});
			placeholder.click(function () {
				input.focus();
			});
			if (input.val() !== "") {
				placeholder.css({display: 'none'});
			} else {
				placeholder.css({display: 'inline'});
			}
			placeholder.insertAfter(input);
			input.keyup(function (e) {
				if (jQuery(this).val() !== "") {
					placeholder.css({display: 'none'});
				} else {
					placeholder.css({display: 'inline'});
				}
			});
		});
	}
	return this;
};
jQuery('input[placeholder]').placeholder();


var fn_verify;
var login;
var security_passwd;
var security_verify;

(function ($) {
	"use strict";
	var AJAX_SUCCESS = 'success';
	var ajax = {
		init: function () {

		},
		send: function (url, data, option) {
			var that = this;
			var dtd = $.Deferred();
			// CSRF_TOKEN/CSRF_HASH
			var _data = {};
			_data[CSRF_TOKEN] = CSRF_HASH;
			data = $.extend(data, _data);

			option = option || {};
			var _option = {
				url: url,
				data: data
			};
			option = $.extend({
				type: 'post',
				dataType: 'json'
			}, option, _option);
			$.ajax(option).fail(function (jqXHR, testStatus, errorThrown) {
				// some error occur
				dtd.reject({}, '网络错误');
			}).done(function (data, textStatus, jqXHR) {
				data = $.extend({code: -1, err: {}, info: ''}, data);
				if (AJAX_SUCCESS == textStatus && 0 == data.code) {
					// success
					dtd.resolve(data.err, data.info)
				} else {
					// must be an error
					dtd.reject(data.err, data.info);
				}
			});
			return dtd.promise();
		}
	};

	var ERROR_CODE = {
		USERNAME_NOT_EXIST: -1,
		USERNAME_WRONG_FORMAT: -2,
		USERNAME_ALREADY_EXIST: 0
	};

	var fn_warn = function (id) {
		this.id = '#' + id;

		this.init = function () {
			this.ele = $(this.id);

		};
		this.init();
	};
	/*!
	 * @ page
	 * @ description 验证类
	 * @ author Lewis.ye
	 * @ date 2014-06-19
	 */
	fn_verify = {
		/**
		 * 需要验证的表单控件
		 */
		verifyCtrl: {},
		/**
		 * 提示框组
		 */
		warnCtrl: {},
		/**
		 * 验证配置。格式如下：
		 * 验证类型：[初始化方法，初始化参数]
		 */
		verifyType: {
			'login-username': ['_initUsername', {revert: false}, '_chkName'],
			'login-password': [],
			'captcha': ['_initCaptcha'],
			'login': ['_initLogin']
		},

		init: function () {
			var that = this;

			var verifyCtrl = $('.verify-ctrl');
			verifyCtrl.each(function (i, e) {
				var id = e.id || e.name || 'verify_' + (new Date()).getTime();
				that.verifyCtrl[id] = that._initVerify(this, id);
			});

			var warnCtrl = $('.warn-ctrl');
			warnCtrl.each(function (i, e) {
				var ctrl = that._initWarn(this);
				that.warnCtrl[ctrl.id] = ctrl;
			});
		},
		/**
		 * 初始化需验证的表单控件
		 * @param element HTMLElement dom控件
		 * @param id 该控件的序列化id
		 * @returns {{jq: (jQuery), index: int, verifyType: {}}}
		 * @private
		 */
		_initVerify: function (element, id) {
			var that = this;
			var jqCtrl = $(element);
			var verifyType = jqCtrl.data('verify');
			if (undefined != that.verifyType[verifyType]) {
				var verifyOptions = that.verifyType[verifyType];
				var initMethod = verifyOptions[0];
				initMethod && that[initMethod](jqCtrl, verifyOptions[1] || {});
			}

			jqCtrl[0].jq = jqCtrl;
			jqCtrl.prop('id', id);

			return {
				jq: jqCtrl,
				index: jqCtrl.data('verifyIndex'),
				verifyType: verifyType
			};
		},
		/**
		 * 初始化告警框组
		 * @param element HTMLElement
		 * @returns {{id: string, jq: jQuery, group: {}, parent: jQuery, i: jQuery}}
		 * @private
		 */
		_initWarn: function (element) {
			var jqCtrl = $(element);
			var id = jqCtrl.data('warnFor');
			var group = {};
			jqCtrl.find('.warn-group').each(function (i, e) {
				var ctrl = $(this);
				var groupId = ctrl.data('warnGroup');
				group[groupId] = ctrl;
			});
			var parent = jqCtrl.parent();
			return {
				id: id,
				jq: jqCtrl,
				group: group,
				parent: parent,
				i: parent.children("i")
			};
		},
		/**
		 * 一些预设变量
		 */
		vars: {
			"email": /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}([\\.][a-z]{2})?$/i,
			"phone": /^1\d{10}$/,
			"username": /^[_a-zA-Z][_0-9a-zA-Z-]{3,19}$/i,
			"password": /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,16}/
		},
		/**
		 * api列表
		 */
		api: {
			chkUserName: URL_MEMBER + '/check/chkUserName',
			chkCaptcha: URL_MEMBER + '/check/chkCaptcha',
			doLogin: URL_MEMBER + '/check/doLogin'
		},
		/**
		 * 初始化用户名检查
		 * @param jqCtrl
		 * @param options
		 * @private
		 */
		_initUsername: function (jqCtrl, options) {
			var that = this;
			that._createTypewriter(jqCtrl, options, that._verifyUsername);
		},
		/**
		 * 执行用户名检查
		 * @param jqCtrl
		 * @param options
		 */
		_verifyUsername: function (jqCtrl, options) {
			var that = this;
			var oldVal = jqCtrl.data('oldVal');
			var val = $.trim(jqCtrl.val());
			var id = jqCtrl.prop('id');
			if (val && oldVal != val) {
				jqCtrl.data('oldVal', val);
				var method = that.verifyType[that.verifyCtrl[id].verifyType][2];
				if (!(method && that[method] && that[method].call(that, val))) {
					// 报错
					that.showError(id, ERROR_CODE.USERNAME_WRONG_FORMAT);
				} else {
					var data = {
						username: val
					};
					var url = that.api.chkUserName;
					options.defCode = ERROR_CODE.USERNAME_ALREADY_EXIST;
					that._send(id, url, data, options);
				}
			}
			// 为空或者不变时，什么也不做
		},
		/**
		 * 字串格式是否为邮箱
		 * @param val
		 * @returns {string|*|Array|{index: number, input: string}}
		 * @private
		 */
		_isEmail: function (val) {
			var that = this;
			val = $.trim(val);
			return val && val.match(that.vars.email);
		},
		/**
		 * 字串格式是否为电话号码
		 * @param val
		 * @returns {string|*|Array|{index: number, input: string}}
		 * @private
		 */
		_isPhone: function (val) {
			var that = this;
			val = $.trim(val);
			return val && val.match(that.vars.phone);
		},
		/**
		 * 字串格式是否为用户名
		 * @param val
		 * @returns {string|*|Array|{index: number, input: string}}
		 * @private
		 */
		_isUsername: function (val) {
			var that = this;
			val = $.trim(val);
			return val && val.match(that.vars.username);
		},
		/**
		 * 检查名称是否符合要求
		 * @param val
		 * @returns {boolean}
		 * @private
		 */
		_chkName: function (val) {
			var that = this;
			return !(!that._isEmail(val) && !that._isPhone(val) && !that._isUsername(val));
		},
		/**
		 * 初始化验证码控件
		 * @param jqCtrl
		 * @param options
		 * @private
		 */
		_initCaptcha: function (jqCtrl, options) {
			var that = this;
			that._createTypewriter(jqCtrl, options, that._verifyCaptcha);
		},
		/**
		 * 执行验证码校验
		 * @param jqCtrl
		 * @param options
		 * @private
		 */
		_verifyCaptcha: function (jqCtrl, options) {
			var that = this;
			var oldVal = jqCtrl.data('oldVal');
			var val = $.trim(jqCtrl.val());
			var id = jqCtrl.prop('id');
			if (val && oldVal != val) {
				jqCtrl.data('oldVal', val);
				var data = {
					captcha: val,
					type: 1
				};
				var url = that.api.chkCaptcha;
				that._send(id, url, data, options);
			}
			// 为空或者不变时，什么也不做
		},
		/**
		 * 初始化登陆按钮
		 * @param jqCtrl
		 * @param options
		 * @private
		 */
		_initLogin: function (jqCtrl, options) {
			var that = this;
			jqCtrl.on('click', function () {
				var form = jqCtrl.data('verifyForm');
				form = form.split('|');
				var data = {};
				$.each(form, function (i, id) {
					var ctrl = that.verifyCtrl[id];
					var jqCtrl = ctrl.jq;
					var val, method;
					if (undefined != ctrl && undefined != jqCtrl && (val = jqCtrl.val())) {
						var type = ctrl.verifyType;
						var verifyOptions = that.verifyType[type];
						if (verifyOptions && undefined != (method = verifyOptions[2])) {
							if (that[method] && that[method].call(that, val)) {
								data[id] = val;
							}
						} else if (verifyOptions) {
							data[id] = val;
						}
					}
				});
				var url = that.api.doLogin;
				that._send(null, url, data).done(function () {
					URL_MEMBER_HOME && (window.location = URL_MEMBER_HOME);
				});
				return false;
			});
		},
		/**
		 * 发送数据
		 * @param id 验证控件的序列化id
		 * @param url api地址
		 * @param data 发送的数据
		 * @param [options] {revert, defCode}
		 * @returns {*}
		 * @private
		 */
		_send: function (id, url, data, options) {
			var that = this;
			options = options || {};
			var revert = options.revert || false;
			return ajax.send(url, data).fail(function (err, info) {
				if (revert) {
					that.hideError(id);
				} else {
					$.each(err, function (id, code) {
						that.showError(id, code);
					});
				}
			}).done(function (err, info) {
				if (revert) {
					var defCode = options.defCode;
					id && that.showError(id, defCode);
				} else {
					id && that.hideError(id);
				}
			});
		},
		/**
		 * input控件的语法糖
		 * 绑定blur和keyup操作，适当的函数去抖
		 * @param jqCtrl 控件jquery对象
		 * @param options 验证方法参数
		 * @param verify 验证方法名
		 * @private
		 */
		_createTypewriter: function (jqCtrl, options, verify) {
			var that = this;
			(function (jqCtrl, options, verify) {
				var isVerified = false;
				jqCtrl.on('keydown', function () {
					isVerified = false;
				});
				jqCtrl.on('blur', function () {
					if (!isVerified) {
						isVerified = true;
						verify.call(that, jqCtrl, options);
					}
				});
				jqCtrl.on('keyup', that.debounce(function () {
					if (!isVerified) {
						isVerified = true;
						verify.call(that, jqCtrl, options);
					}
				}, 500));
			})(jqCtrl, options, verify);
		},
		/**
		 * 函数去抖
		 * @param func
		 * @param wait
		 * @param [immediate]
		 * @returns {Function}
		 */
		debounce: function (func, wait, immediate) {
			var timeout, result;
			return function () {
				var context = this, args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate) result = func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) result = func.apply(context, args);
				return result;
			};
		},
		/**
		 * 显示错误
		 * @param id 表单序列化id
		 * @param code 错误号
		 */
		showError: function (id, code) {
			var ctrl = this.warnCtrl[id];
			if (undefined != ctrl) {
				ctrl.i.removeClass();
				ctrl.parent.data("verifyOn", 0);
				ctrl.parent.addClass("verify-off").removeClass("verify-on");

				$.each(ctrl.group, function (i, e) {
					e.hide();
				});
				ctrl.group[code] && ctrl.group[code].show();
			}
		},
		/**
		 * 隐藏错误
		 * @param id
		 */
		hideError: function (id) {
			var that = this;
			if (undefined != id) {
				var ctrl = that.warnCtrl[id];
				ctrl && that._hideError(ctrl);
			} else {
				$.each(that.warnCtrl, function (i, ctrl) {
					that._hideError(ctrl);
				});
			}
		},
		/**
		 * 执行隐藏错误
		 * @param ctrl
		 * @private
		 */
		_hideError: function (ctrl) {
			ctrl.i.addClass('icon-loss');
			ctrl.parent.data('verifyOn', 1);
			ctrl.parent.addClass('verify-on').removeClass('verify-off');
		},


		/*!
		 * @ author shaokr
		 * @ 创建验证
		 * @ date 2014-06-19
		 */
		addverify: function () {
			var self = this;
			//获取所以含data-fn-verify的元素
			$("[data-fn-verify]").each(function () {
				//var $this=$(this);
				//事件委派到input中
				$(this).on("blur", "input", function (e) {
					var $this = $(this),
						_name = $this.data("name") || $this.attr("name") || false;
					//判断是否存在验证方法
					if (_name && typeof self[_name] === "function") {
						//判断是否为重复密码
						if (_name == "passwds") {
							self[_name]($this, e);
						} else {
							$this.blur(function () {
								self[_name]($this);
							});
						}
					}
				});
			});
		},
		verify: function (e) {
			var self = this,
				_bool = true,
				$verify = $(e).parentsUntil("[data-fn-verify]").parent();
			if (!$verify.length) {
				$verify = $(e).parent();
			}
			//获取所以含data-fn-verify的元素
			$verify.find("input").each(function () {
				var $this = $(this);
				var _name = $this.data("name") || $this.attr("name") || false;
				if (_name && typeof self[_name] === "function") {
					if (!$this.data("ver-bo")) {
						$this.focus().blur();
						_bool = false;
					}
				}
			});
			return _bool;
		},
		email: function ($this, e) {
			var self = this,
				_val = $.trim($this.val()).match(self.vars.email),
				_bool = false;
			if (_val) {
				_bool = true;
			}
			self.result($this, _bool);
		},
		passwd: function ($this, e) {
			var self = this,
				_val = $.trim($this.val()),
				_bool = false;
			if (_val.length >= 6 && _val.length <= 16) {
				_bool = true;
			}
			self.result($this, _bool);
		},
		passwds: function ($this, e) {
			var self = this,
				$passwds = $(e.delegateTarget).find("[data-name='passwds']"),
				_val = $.trim($this.val()),
				_bool = false;
			if ($passwds.index($this)) {
				if ($passwds.eq(0).val() == _val) {
					_bool = true;
				}
			} else {
				if (_val.length >= 6 && _val.length <= 16) {
					_bool = true;
				}
			}
			self.result($this, _bool);
		},
		code: function ($this, e) {
			var self = this,
				_val = $.trim($this.val()),
				_bool = false;
			if (_val) {
				_bool = true;
			}
			self.result($this, _bool);
		},
		// 结果处理
		result: function ($this, res, fun) {
			fun = fun || '';
			if (fun && typeof fun === "function") {
				fun($this, res);
			} else {
				var $tips = $this.nextAll(".v-tips" + fun);
				if ($tips.length) {
					if (res) {
						$this.parent().removeClass("error")
						$tips.hide();
					} else {
						$this.parent().addClass("error")
						$tips.show();
					}
					$this.data("ver-bo", res);
				} else {
					//$this.after(fun)
				}
			}
		}
	};
//	fn_verify.addverify();
	login = {
		init: function () {
			var that = this;
			this.captchaRow = $('#captcha_row');
			var reloadCaptcha = $('#reloadCaptcha');
			this.imgDom = $('#' + reloadCaptcha.data('captchaFor'));
			this.captchaUrl = this.imgDom.data('src');
			reloadCaptcha.on('click', function () {
				that._reloadCaptcha();
			});
			if (!!NEED_CAPTCHA) {
				that.showCaptcha();
			} else {
				this.captchaRow.hide();
			}
			fn_verify.init();
		},
		showCaptcha: function () {
			this._reloadCaptcha();
			this.captchaRow.show();
		},
		_reloadCaptcha: function () {
			this.imgDom.prop('src', this.captchaUrl + '?' + (new Date()).getTime());
		},
		/**
		 * @ login tab shaokr
		 * @ date 20140623
		 */
		tab: function () {
			var param = {
				"tab": "fn-tab",//主框
				"l": "fn-tab-l",//导航
				"l_css": "fn-mask-on",//导航添加的css名称
				"d": "fn-tab-d",//显示内容
				"d_css": "fn-mask-on"//显示内容添加的css名称
			};
			//在主体框中添加导航元素的点击事件委派
			$("[data-" + param.tab + "]").on("click", "[data-" + param.l + "]",function () {
				var $this = $(this),
					$parent = $this.parentsUntil("[data-" + param.tab + "]").parent();
				$this.siblings("[data-" + param.l + "]").removeClass(param.l_css);
				$this.addClass(param.l_css);
				$parent.find("[data-" + param.d + "]").removeClass(param.d_css).filter("[data-" + param.d + "=" + $this.data(param.l) + "]").addClass(param.d_css);
			}).each(function () {
				$(this).find("[data-" + param.l + "]").eq(0).click();
			});
		},
		/**
		 * @ login 登陆页验证 shaokr
		 * @ date 20140623
		 */
		verify: function () {
			var $login_form = $("#login-form");
			//表单提交事件
			$login_form.on("submit", function () {
				var fn_bool = true;
				$login_form.find(">div[data-verify]").each(function () {
					if (!fn_bool && !$(this).data("verify-on")) {
						fn_bool = false;
					}
				});
				return false;
			});
			//input焦点获取和解除事件（事件委派）
			$login_form.on({
				'focus': function () {
					var $this = $(this);
					$this.parent().addClass("on");
				},
				'blur': function () {
					var $this = $(this),
						$par = $this.parent();
					$par.removeClass("on");

					var val = $this.val();
					if (val && $par.data("verify")) {
						$.ajax({
							url: $par.data("verify"),
							type: 'post',
							dataType: 'json',
							data: {'username': val}
						}).done(function (data) {
							if (data.code && 0 == data.code) {
								var err = data.err || null;
								if (err && err.exist && 0 == err.exist) {
									// 用户名存在
									$par.find(">i").removeClass();
									$par.data("verify-on", 0);
									$par.addClass("verify-off").removeClass("verify-on");
								} else {
									$par.find(">i").addClass("icon-loss");
									$par.addClass("verify-on").removeClass("verify-off");
									$par.data("verify-on", 1);
								}
							} else {
								// 节流控制
							}
						});
					}
				}
			}, "input");
		}
	};
	/*!
	 * @ page
	 * @ description
	 * @ author Lewis.ye
	 * @ date 2014-06-19
	 */
	security_passwd = {
		init: function () {
			this.selectTab();
			this.get_code();
			this.email();
		},
		/**
		 * @ author shaokr
		 * @
		 * @ date 20140624
		 */
		selectTab: function () {
			var self = this,
				$way = $("#way"),
				$way_se = $("#way-se");
			$way_se.on("change", "select", function () {
				var $this = $(this);
				$way.removeClass().addClass("step-col way-ul-" + $this.val());
			});
		},
		/**
		 * @ security_passwd selectTab shaokr
		 * @ 使用邮箱验证
		 * @ date 20140624
		 */
		email: function () {
			var self = this,
				$email = $("#fs_email");
			$email.on("click", function () {
				//点击发送验证邮件后执行的函数
				var $this = $(this),
					$way = $("#way");
				$way.addClass("off");
				$way.prev().removeClass("off")
			});
		},
		/**
		 * @ security_passwd selectTab shaokr
		 * @ 信使用短验证
		 * @ date 20140624
		 */
		get_code: function () {
			var self = this,
				$getmc = $("#getmc");
			$getmc.on("click", function () {
				var $this = $(this),
					_s = 5, time;
				$this.attr("disabled", true);
				$this.html(_s + "秒后重新获取");
				time = setInterval(function () {
					_s--;
					if (_s) {
						$this.html(_s + "秒后重新获取");
					} else {
						$this.attr("disabled", false);
						$this.html("获取短信验证码");
						clearTimeout(time);
					}
				}, 1000);
			});
		},
		code: function () {
			var self = this,
				$code = $("#fx_code");
			$code.on("ciclk", function () {
				//点击短信验证码后执行的函数
				var $this = $(this);
			});
		}
	};
	/*!
	 * @ page
	 * @ description
	 * @ author Lewis.ye
	 * @ date 2014-06-19
	 */
	security_verify = {
		init: function () {
			//点击获取短信
			this.get_code();
			//邮箱
			this.email();
		},
		/**
		 * @ security_passwd selectTab shaokr
		 * @ 验证邮箱
		 * @ date 20140624
		 */
		email: function () {
			var self = this,
				$email = $("#ve_email");
			$email.on("click", function () {
				//点击发送验证邮件后执行的函数
				var $this = $(this);
				if (fn_verify.verify(this)) {
					$this.parentsUntil(".steps-con").parent().hide().next().show();
				}
			});
		},
		/**
		 * @ security_passwd selectTab shaokr
		 * @ 验证短信
		 * @ date 20140624
		 */
		get_code: function () {
			var self = this,
				$getmc = $("#getmc");
			$getmc.on("click", function () {
				var $this = $(this),
					_s = 5, time;
				$this.attr("disabled", true);
				$this.next().show();
				$this.html(_s + "秒后重新获取");
				time = setInterval(function () {
					_s--;
					if (_s) {
						$this.html(_s + "秒后重新获取");
					} else {
						$this.attr("disabled", false);
						$this.html("获取短信验证码");
						clearTimeout(time);
					}
				}, 1000);
			});
		},
		code: function () {
			var self = this,
				$code = $("#fx_code");
			$code.on("ciclk", function () {
				//点击短信验证码后执行的函数
				var $this = $(this);
			});
		}
	};
})(jQuery);


