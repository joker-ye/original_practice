/*!
 * move 原生运动框架
 * author Lewis.ye
 * common Javascript Library  - v0.1 (2013-12-01 AM9:00)
 * Copyright 2012-2013 trueland
 */


/*!
 * move 原生完美运动框架  还有 css3运动框架
 * author Lewis.ye
 * @params obj -id
 * @params json -目标
 * @params fnEnd -动画完成后的回调
 */


//运动ctrl
function startMove(obj, json, fnEnd) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        var bStop = true; //假设所有的值都已经到了

        for (var attr in json) {

            // var cur = parseInt(getStyle(obj, attr));

            var cur = 0;

            if (attr == "opacity") {

                // alert(0.07*100);
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);

            } else {

                cur = parseInt(getStyle(obj, attr));

            }

            var speed = (json[attr] - cur) / 6;

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[attr]) {

                bStop = false;

            }

            if (attr == "opacity") {

                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';

                obj.style.opacity = (cur + speed) / 100;

                // $("text1").value = obj.style.opacity;

            } else {

                obj.style[attr] = cur + speed + "px";

            }


        }


        if (bStop) {

            clearInterval(obj.timer);

            if (fnEnd) {

                fnEnd();

            }

        }

    }, 30);

}

//获取当前样式.offsetWidth offsetHeight 有风险
function getStyle(obj, name) {

    if (obj.currentStyle) {

        return obj.currentStyle[name];

    } else {

        return getComputedStyle(obj, false)[name];

    }

}