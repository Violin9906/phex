var nav=document.getElementById('nav');
nav.innerHTML+="<li id='navtab1'><a href='"+root+"/index.html'>首页</a></li>";
nav.innerHTML+="<li id='navtab2' class='dropdown'><a href='#' data-toggle='dropdown' class='dropdown-toggle'>不确定度分析<strong class='caret'></strong></a><ul class='dropdown-menu'><li><a href='"+root+"/uncertainty/singlevar.html'>单变量不确定度分析</a></li></ul></li>";
nav.innerHTML+="<li id='navtab3'class='dropdown'><a href='#' data-toggle='dropdown' class='dropdown-toggle'>回归分析<strong class='caret'></strong></a><ul class='dropdown-menu'><li><a href='"+root+"/regression/liner.html'>线性回归</a></li></ul></li>";
nav.innerHTML+="<li id='navtab4'class='dropdown'><a href='#' data-toggle='dropdown' class='dropdown-toggle'>数理统计分析<strong class='caret'></strong></a><ul class='dropdown-menu'><li><a href='"+root+"/stat/sd.html'>单变量数理统计</a></li></ul></li>";
nav.innerHTML+="<li id='navtab5'class='dropdown'><a href='#' data-toggle='dropdown' class='dropdown-toggle'>大雾百科<strong class='caret'></strong></a><ul class='dropdown-menu'><li><a href='"+root+"/pedia/constant.html'>物理学常数表</a></li></ul></li>";

