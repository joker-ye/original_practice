<ul class="J_nav">
<li></li>
<li></li>
<li></li>
</ul>

<div class="J_content">

<div></div>
<div></div>
<div></div>

</div>


function Tab(){

  this.tabs = document.queryElements('.J_content').getElementsByTagName('div');
  this.currentTable;

  var navs = document.queryElements('.J_nav').getElementsByTagName('li');
  for(var nav in vavs) {
    navs[nav].onClick = function(index){
      this.setTab(index);
    }).bind(this, nav);
  }
}

Tab.protoType.setTab = function(index) {
  this.tabs[this.currentTable].style.display='none';
  this.tabs[this.currentTable = index].style.display='';

}
