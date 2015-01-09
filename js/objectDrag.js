/**!
 * author Lewis.ye
 * description 非完美拖拽
 * @params id:dom 的id
 **/

function Drag(id) {

    var _this = this;

    this.disX = 0;

    this.disY = 0;

    this.oDiv = $(id);

    this.oDiv.onmousedown = function(ev) {

        _this.fuDown(ev);

        return false; //处理拖拽过程中选中的问题  ,  IE 678 不支持

    }

}


Drag.prototype.fuDown = function(ev) {

    var _this = this;

    var oEvent = ev || event;

    this.disX = oEvent.clientX - this.oDiv.offsetLeft;

    this.disY = oEvent.clientY - this.oDiv.offsetTop;

    document.onmousemove = function(ev) {

        _this.fnMove(ev);

    }

    document.onmouseup = function() {

        _this.fnUp();

    }

}

Drag.prototype.fnMove = function(ev) {

    var oEvent = ev || event;

    this.oDiv.style.left = oEvent.clientX - this.disX + "px";

    this.oDiv.style.top = oEvent.clientY - this.disY + "px";

}

Drag.prototype.fnUp = function() {

    document.onmousemove = null;

    document.onmouseup = null;

}