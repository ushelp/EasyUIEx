# EasyUIEx 使用手册

---------------

**jQuery EasyUI + EasyUIEx** 的架构产生于企业开发实践，遵循Easy的原则，目标是简化一切可以简化的部分，为一切不具备的需求提供扩展。着重在CRUD方面进行了封装扩展，也欢迎更多开发实践的精华加入。

[中文 API 在线速览](http://www.easyproject.cn/easyuiex/doc/easyuiex-api_zh_CN.html 'EasyUIEx 中文 API 在线速览')


##  1. 下载使用

使用`easy.jquery.edatagrid.js`替换`jquery.edatagrid.js`，easyUIEx的edatagrid对性能和逻辑进行了优化，并提供附加功能。
 
 ```HTML
<!-- EasyUI CSS -->
<link rel="stylesheet" type="text/css" href="easyui/themes/bootstrap/easyui.css" id="themeLink">
<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">

<!-- EasyUI JS & Extension JS...-->
<script type="text/javascript" src="easyui/jquery.min.js"></script>
<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>

<!-- **EasyUIEx** -->
<link rel="stylesheet" type="text/css" href="easyuiex/css/easyuiex.css">
<script type="text/javascript" src="easyuiex/easy.easyuiex.min-2.2.4.js"></script>
<script type="text/javascript" src="easyuiex/easy.easyuiex-validate.js"></script>
<!-- EasyUIEx 'easy.jquery.edatagrid.js' instead of 'jquery.edatagrid.js' -->
<script type="text/javascript" src="easyuiex/easy.jquery.edatagrid.js"></script>
<!-- Language file -->
<script type="text/javascript" src="easyuiex/lang/easy.easyuiex-lang-zh_CN.js"></script> 
```

## 2. EasyUIEx API 调用

**uiEx** 是EasyUIEx的默认命名空间名称。
EasyUIEx API 中针对 DOM 操作，带 selector 选择器的扩展函数都支持两种方式的调用。

> **注意：请为元素指定唯一的 `id 属性`。**由于 EasyUIEx 内部封装 `datagrid`, `tree` 等某些 DOM 对象时使用到了对象的 `id 属性`，所以这些 DOM元素必须具有唯一的 `id 属性`。优先推荐使用 `id 选择器`选择 DOM 元素。


- **uiEx命名空间直接调用**
  
  在第一个参数传入要操作的DOM对象的选择器或对象
 
   `uiEx.{methodName}(selector, [param1], ....);` 
   
    ```JavaScript
   uiEx.clearForm('#userForm')；

   uiEx.treeChk(
     "#rightsTree",
     {
        url:"do/menuJson.json"
     },
     [11]
   );
   ```
   
- **使用 jQuery 扩展函数**
 
   `$(selector).{methodName}([param1], ....);`
  
    ```JavaScript
    $('#userForm').clearForm();
  
    $("#rightsTree").treeChk(
        {
            url:"do/menuJson.json"
        },
        [11]
    );
    ```



## 3. API 详解

### 在线 API 速览

[中文 API 在线速览](http://www.easyproject.cn/easyuiex/doc/easyuiex-api_zh_CN.html)

 
### 3.1. 全局配置

- **消息国际化配置**

  在 lang/easy.easyuiex-lang-`LANG_COUNTRY`.js 中修改

- **全局配置参数**

 可以调整 EasyUIEx 的运行参数、方式和内容，修改参数。
 
 `uiEx.{paramName} = paramValue`

   默认配置：
   
  ```javascript
  var uiEx = {
  	/*
  	 * ################# 消息内容和控制部分
  	 */
  	showRowEditMsg : false, // 是否在行编辑完后提示msg
  	showRowAddMsg : false, // 是否在行添加完后提示msg
  	showRowDeleteMsg : true, // 是否在行删除完后提示msg
  	/*
  	 * ################# 自定义消息框的默认参数
  	 */
  	msgDefaults : {
  		timeout : 4000,
  		showType : 'slide' // null、slide、fade、show。默认是 slide。
  	// width:250,
  	// height:100,
  	 
  	},
  	/*
  	 * ################# 数据网格默认参数
  	 */
  	dataGridDefaults : {
  		rownumbers : true, // 显示行号
  		fitColumns : true, // 自动扩展或收缩列的大小以适应网格宽度和防止水平滚动条
  		singleSelect : true, // 单选
  		pagination : true, // 显示分页
  		method : "post", // 提交方式
  		striped : true
  	// 表格条纹，奇偶行颜色交替
  	},
  	/*
  	 * ################# 数据网格详细视图默认参数
  	 */
  	detailDataGridDefaults : {
  		rownumbers : true, // 显示行号
  		fitColumns : true, // 自动扩展或收缩列的大小以适应网格宽度和防止水平滚动条
  		singleSelect : true, // 单选
  		pagination : true, // 显示分页
  		method : "post", // 提交方式
  		striped : true, // 表格条纹，奇偶行颜色交替
  		// 返回行明细内容的格式化函数
  		detailFormatter : function(index, row) {
  			return '<div class="ddv"></div>';
  		}
  	},
  	/*
  	 * ################# url中使用{expression}表达式，解析时用到的正则
  	 */
  	expReg : /\{([\s\S]+?)\}/g,
  	/*
  	 * ################# 验证提示消息
  	 */
  	msg : {}
  };
  ```
  
### 3.2. alter、 confirm、 prompt、 msg 消息窗口相关函数 
  ```javascript
  /**
   * 操作提示
   * 
   * @param msg 消息内容
   * @param type 消息图标类型：error、info、question、warning
   * @param callback 回调函数
   */
  uiEx.alert(msg, type, callback);
   
  /**
   * 确认提示
   * 
   * @param msg 消息内容
   * @param callback 回调函数
   */
  uiEx.confirm(msg, callback);
  
  /**
   * 输入提示
   * 
   * @param msg 消息内容
   * @param callback 回调函数
   */
  uiEx.prompt(msg, callback);
  
  /**
   * 消息提示
   * 
   * @param msg 消息内容
   * @param position 消息位置：topLeft, topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight; 默认为：bottomRight（右下角）
   * @param params msg消息框参数
   */
  uiEx.msg(msg, position, params);
  ```

### 3.3. dialog 对话框相关函数 

- 支持两种调用方式

   解决了 EasyUI 中 Dialog 需要定义在全局页面问题，关闭标签页时自动销毁 Tab 内部加载的 Dialog
 > 关闭 tab 时，自动销毁加载的指定 dialog，防止重复加载。
 > 由于 EasyUI 的 Dialog 在标签关闭后并不会被销毁（easyUI在解析 dialog 的时候，不论 dialog 定义在哪里，都会被放到 body），所以为了防止在 tab 页面每次加载时重复定义，一般通过以下途径解决：
 > 1、将 dialog 放到主界面中，而不是通过 tab 来加载
 > 2、通刷新的 tab 的时候去销毁掉之前的 dialog

 
- API

 ```javascript
 /**
  * 显示指定对话框
  * 
  * @param dialogSelector dialog选择器
  * @param title 对话框标题
  * @return dialog对象
  */
 uiEx.openDialog(dialogSelector, title);
 
 /**
  * 显示指定href的对话框
  * 
  * @param dialogSelector dialog选择器
  * @param href 请求内容的href
  * @param title 对话框标题
  * @return dialog对象
  */
 uiEx.openHrefDialog(dialogSelector, href, title)
 
 /**
  * 关闭指定对话框
  * 
  * @param dialogSelector dialog选择器
  * @return dialog对象
  */
 uiEx.closeDialog(dialogSelector);
 ```


### 3.4. form 表单相关函数 

- 支持两种方式调用

- Ajax表单提交
`EasyUIEx.submitAjax`和`EasyUIEx.submitURLAjax`内部封装了一个`xRequestedWith=XMLHttpRequest`参数，会随表单一同提交到服务器，帮助开发者在服务器端通过`xRequestedWith 参数`来判断是否是Ajax请求。
>  EasyUI的form表单组件的submit提交方法具有一定迷惑和误导性。其内部submit使用的是iframe提交，并非真正的Ajax方式提交。
> 所以当使用者在服务器端试图通过请求头信息（X-Requested-With=XMLHttpRequest）判断是否是Ajax提交的请求时，并无法准确判断。

 同时，uiEx 提供了一个 Ajax 表单提交全局事件处理函数`formSubmitSuccess`，能够监听表单Ajax提交成功事件，注册全局的处理函数。

 ```JS
 /*
  * 为使用EasyUIEx.submitAjax和EasyUIEx.submitURLAjax form表单提交成功的succes事件注册一个系统全局的必须执行函数
  * 类似于jQuery的全局ajaxSuccess函数
  * @param data 表单Ajax提交执行成功返回的数据
  *
  */
 uiEx.formSubmitSuccess=function(data){
 	//...
 }
 ```

- API

 ```javascript
 /**
  * 清除指定id的form表单信息
  * 
  * @param selector  表单选择器
  * @return form对象
  */
 uiEx.clearForm(selector);
 
 /**
  * 重置reset指定id的form表单信息
  * 
  * @param selector
  *            表单选择器
  * @return form对象
  */
 uiEx.resetForm(selector);
 
 /**
  * 开启表单验证
  * 
  * @param selector 表单选择器
  * @return form对象
  */
 uiEx.enableValidate(selector);
 
 /**
  * 禁用表单验证
  * 
  * @param selector 表单选择器
  * @return form对象
  */
 uiEx.disableValidate(selector);
 
 /**
  * 对表单进行验证
  * 
  * @param selector 表单选择器
  * @return form对象
  */
 uiEx.validate(selector);
 
 /**
  * 代替form("load", data);为表单填充数据
  * 可以指定表单名前缀，将数据填充到指定前缀的属性中去
  * 如将data中的name属性值填充到user.name中
  * 
  * @param selector 表单选择器
  * @param data 表单数据
  * @param prefix 表单名称前缀
  * @return form对象
  */
 uiEx.loadForm(selector, data, prefix);
 
 /**
  * 普通表单提交
  * 
  * @param formSelector 表单选择器
  * @param params  可选; form表单额外提交的参数
  * @param noValidate 可选; 是否验证; boolean; 默认为true
  */
 uiEx.submitForm(formSelector, params, noValidate);
 
 /**
  * 以Ajax进行带表单验证的表单提交，内部封装了一个`xRequestedWith=XMLHttpRequest`参数；
  * 会随表单一同提交到服务器，帮助开发者在服务器端通过`xRequestedWith参数`来判断是否是Ajax请求。
  * 
  * @param formSelector 表单选择器
  * @param callback AJAX请求后的回调处理函数
  * @param params 可选; form表单额外提交的参数
  * @param noValidate 可选; 是否验证; boolean; 默认为true
  */
 uiEx.submitAjax(formSelector, callback, params, noValidate);
  
 /**
 * 将表单以Ajax提交到指定url，内部封装了一个`xRequestedWith=XMLHttpRequest`参数；
 * 会随表单一同提交到服务器，帮助开发者在服务器端通过`xRequestedWith参数`来判断是否是Ajax请求。
 * 
 * @param formSelector 表单选择器
 * @param url 提交到的URL地址
 * @param callback AJAX请求后的回调处理函数
 * @param params 可选; form表单额外提交的参数
 * @param noValidate 可选; 是否验证; boolean; 默认为true
 */
 uiEx.submitURLAjax(formSelector, url, callback, params, noValidate) 
 
 /**
  * 将form表单信息格式化为JSON返回
  * 
  * @parama formSelector form选择器
  */
 uiEx.serializeJSON(formSelector);
 ```


### 3.5. tab 选项卡相关函数

- 支持两种方式调用。

- EasyUI Tabs两种动态动态加载方式之间的区别：
  - 使用content(iframe框架)引入页面:
    - `content : '<iframe scrolling="auto" frameborder="0" src="'+ url + '" style="width:100%;height:100%;"></iframe>';`
    - 作为独立窗口存在，页面内容独立，与当前页面互不干扰
  	 - 需要独立引入需要的JS和CSS资源
  	 - 弹出的内容是在内部窗口内
  - 使用href方法：
  	-	`href : url,`
  	- 内容片段加载，引入的内容和当前页面合并在一起
  	- 不需要引入页面已经引入的JS和CSS资源
  	- 引用的页面不能有body，否则加载的内容内部的JS文件文法执行
  	- 会显示html渲染解析的提示
 - 右键菜单HTML片段：
 
    ```HTML
    <%-- ##################Tab选项卡的右键菜单，不能删除################## --%>
    <div id="tabsMenu" class="easyui-menu" style="width:120px;">
    	   <div name="close"   data-options="iconCls:'icon-close'">关闭标签</div>  
    	   <div name="other"   data-options="">关闭其他标签</div>  
    	   <div name="all"  data-options="">关闭所有标签</div>
    	   <div class="menu-sep"></div>
           <div name="closeRight">关闭右侧标签</div>
           <div name="closeLeft">关闭左侧标签</div>
           <div class="menu-sep"></div>
          <div name="refresh"  data-options="iconCls:'icon-reload'">刷新标签</div> 
    </div>
    ```
    
  - API
  
    ```javascript
    /**
     * 为指定Tab添加选项卡，支持双击关闭
     * 
     * @parma tabSelector 选项卡
     * @parma title 标题
     * @parma url 地址
     * @parma icon 可选；图标
     * @parma isIframe 可选；boolean值；是否使用iframe方式引入，true为使用iframe方式引入，默认为href方式
     * 
     * # EasyUI Tabs两种动态动态加载方式之间的区别：
     * - 使用content(iframe框架)引入页面:
     * 		content : '<iframe scrolling="auto" frameborder="0" src="'+ url + '" style="width:100%;height:100%;"></iframe>';
     *		- 作为独立窗口存在，页面内容独立，与当前页面互不干扰
     * 		- 需要独立引入需要的JS和CSS资源
     * 		- 弹出的内容是在内部窗口内
     * - 使用href方法：
     * 		href : url,
     * 		- 内容片段加载，引入的内容和当前页面合并在一起
     * 		- 不需要引入页面已经引入的JS和CSS资源
     * 		- 引用的页面不能有body，否则加载的内容内部的JS文件文法执行
     * 		- 会显示html渲染解析的提示
     * 
     */
    uiEx.openTab(tabSelector, title, url, icon, isIframe);
    
    /**
     * 刷新当前选项卡选中的Panel
     * 
     * @param tabSelector 选项卡选择器
     */
    uiEx.reloadSelTab(tabSelector);
    
    /**
     * 根据菜单Text自动在指定Tab打开某个菜单
     * 
     * @param menuSelector
     *            menu选择器
     * @param tabSeelctor
     *            选项卡选择器
     * @param menuText
     *            要打开的菜单文本，可以使用数组定义多个菜单文本
     */
    uiEx.openMenuByText(menuSelector, tabSeelctor, menuText);
    
    /**
     * 根据菜单Id自动在指定Tab打开某个菜单
     * 
     * @param menuSelector
     *            menu选择器
     * @param tabSeelctor
     *            选项卡选择器
     * @param menuId
     *            要打开的菜单id，可以使用数组定义多个菜单id
     */
    uiEx.openMenuById(menuSelector, tabSelctor, menuId);
    
    /**
     * 绑定tabs的右键菜单，实现：关闭，关闭其他，关闭所有；关闭左侧标签页、关闭右侧标签页；刷新等菜单功能
     * 
     * @param tabSelector tab选择器
     * @param menuSelector menu选择器；可选，默认之为#tabsMenu
     * 
     * 必须在页面定义右键菜单标签（菜单id、菜单项的name不能修改）：
     * 	  
    <%-- ##################Tab选项卡的右键菜单，不能删除################## --%>
    <div id="tabsMenu" class="easyui-menu" style="width:120px;">
    	   <div name="close"   data-options="iconCls:'icon-close'">关闭标签</div>  
    	   <div name="other"   data-options="">关闭其他标签</div>  
    	   <div name="all"  data-options="">关闭所有标签</div>
    	   <div class="menu-sep"></div>
           <div name="closeRight">关闭右侧标签</div>
           <div name="closeLeft">关闭左侧标签</div>
           <div class="menu-sep"></div>
          <div name="refresh"  data-options="iconCls:'icon-reload'">刷新标签</div> 
    </div>
     */
    uiEx.addTabsContextMenu(tabSelector, menuSelector)
    ```

### 3.6. datagrid、edatagrid、detaildatagrid 数据网格相关函数

- 支持两种方式调用

- **封装和扩展**：EasyUIEx 针对使用 datagrid 相关组件的 CRUD 应用进行了深入封装，提供了附加功能，在调用初始化方法时，配合传入`url`、`saveUrl`、`updateUrl`、`destroyUrl`等 CRUD 的服务器操作地址参数（和 edatagrid 的参数保持了一致），就能以一致的方式借助 EasyUIEx 的 API 完 CRUD 操作。

- **性能优化**：为datagrid和edatagrid 提供了行编辑状态监测，优化修改的请求。当行编辑，列编辑，未修改内容时并不提交请求。


- **rowData 返回参数**: 

	当新增或修改数据后，可以在响应的 `JSON` 中返回一个` rowData` 属性，EasyUIEx 可以根据 `rowData` 的内容自动刷新新增或编辑的页面静态数据。
	
	例如， 在新增数据时，如果当前数据主键是提交到服务器端后生成（如数据主键由自动增长生成器控制），则添加数据后，请在返回的 `JSON` 中设置一个 **rowData** 属性，返回您包含`主键 id 属性`的最新数据（其他属性如果不需要刷新则可选可选），以自动刷新新添加的前行。**否则在新增数据后，删除该条数据，您之前新增的数据在客户端并没有主键，会出现删除失败的提示。**

	```JSON
	{
		"msg":"Save  Successed!",
		"locationUrl":"",
		"callback":"",
		"statusCode":200,
		"rowData":{"deptno":10,"dname":"x","loc":"x"} // 返回自动增长主键来更新客户端数据
	}
	```

- datagrid、edatagrid、detaildatagrid、treegrid 共同扩展属性

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| url  | string | 查询数据url；获取：`dg.datagrid("options").url` | false |
| saveUrl  | string | 保存数据url；获取：`dg.datagrid("options").saveUrl` | false |
| updateUrl  | string | 修改数据url；获取：`dg.datagrid("options").updateUrl` | false |
| destroyUrl  | string | 删除数据url；获取：`dg.datagrid("options").destroyUrl` | false |
| showHeaderContextMenu  | boolean | 是否在表头显示右键菜单，可选择显示的列  | false |
| showContextMenu  | boolean | 是否显示右键菜单，配合menuSelector属性使用  | false |
| menuSelector  | string | 菜单选择器  | &nbsp; |
| successKey  | string | 服务器端返回的成功标记key，例如："statusCode"  | &nbsp; |
| successValue  | string | 服务器端返回的成功标记value，例如："200" | &nbsp; |
| mutipleDelete  | boolean | 是否开启多行提交删除  | false |
| mutipleDeleteProperty  | string/Array | 多行删除时提及给服务器的属性和值，不会添加sendRowDataPrefix前缀，支持使用数组指定多个属性名  | &nbsp; |


- datagrid、edatagrid 共同扩展属性

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| sendRowDataPrefix  | boolean | 添加、删除、更新数据时，支持设置提交row数据前缀`sendRowDataPrefix:"sysUser."`，这样提交的数据参数名前会增加指定的前缀，方便在使用Struts等框架时将数据提交到sysUser对象中接收。  | &nbsp; |


- datagrid 扩展属性

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| clickRowEdit  | boolean | 在DataGrid单击时实现行编辑，可以代替edatagrid实现带行编辑的datagrid  | false |
| clickCellEdit  | boolean | 是否开启单击列编辑功能  | false |

- edatagrid 扩展属性
**使用`easy.jquery.edatagrid.js`替换`jquery.edatagrid.js`，easyUIEx的edatagrid对性能和逻辑进行了优化，并提供附加功能**。

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| clickEdit  | boolean | 是否开启单击编辑(edatagrid默认为双击开启编辑)  | false |
| showMsg  | boolean | 是否显示添加、修改提示消息  | false |

- Demo

 ```javascript
 // datagrid 初始化
var dg = $("#sysUserDataGrid");
dg.initDatagrid({
	iconCls : 'icon-group',
	/*
	 * 行编辑:saveUrl、updateUrl、destroyUrl配合uiEx使用
	 */
	url : "sysUser_list.action",
	saveUrl : "sysUser_save.action",
	updateUrl : "sysUser_update.action",
	destroyUrl : "sysUser_delete.action",
	showHeaderContextMenu:true, // 表头添加右键菜单，可选择显示的列
	// clickRowEdit:true, //注册单击行编辑，可以代替edatagrid实现带行编辑的CRUD
	pageSize : 10,
	pageList : [ 5, 10, 15, 20 ],
	checkbox : true,
	singleSelect : false,
	checkOnSelect : true,
	//双击操作
	onDblClickRow : function(rowIndex, rowData) {
		toEdit(rowData);
	},
	menuSelector:"#sysUserContextMenu",
	showContextMenu:true,
	sendRowDataPrefix:"sysUser.",
	mutipleDelete: true, // 多行提交删除
	mutipleDeleteProperty:"userId" // 多行删除时提及给服务器的属性和值，不会添加sendRowDataPrefix前缀，支持使用数组指定多个属性名
});
```

 ```javascript
 // edatagrid 初始化
 $("#deptDataGrid").initEdatagrid({
     /*
      * 行编辑:saveUrl、updateUrl、destroyUrl配合uiEx使用
      */
     url : "dept_list.action",
     saveUrl : "dept_save.action",
     updateUrl : "dept_update.action",
     destroyUrl : "dept_delete.action",
     idField : "deptno",
     showHeaderContextMenu : true, // 表头添加右键菜单，可选择显示的列
     pagination : true,
     checkbox : true,
     checkOnSelect : true,
     singleSelect : false,
     autoSave : true,
     //queryParam:{"rows":dg.datagrid("options").pageSize},
     clickEdit : true, //单击编辑
     showMsg : true, // 显示操作消息
     //右键菜单
     menuSelector : "#deptContextMenu",
     showContextMenu : true,
     sendRowDataPrefix : "dept.", //提交数据前缀
     successKey : "statusCode", //服务器端返回的成功标记key
     successValue : "200" //服务器端返回的成功标记value
 });
 ```

 ```JS
// detaildatagrid 初始化
uiEx.initDetailDatagrid("#userDataGrid2","do/toDetailEdit.jsp",{
	/*
	* 行编辑:saveUrl、updateUrl、destroyUrl配合uiEx使用
	*/
	url : "do/doList.jsp", //数据表格数据查询
	saveUrl : "do/doMyUsers.jsp?t=add", //保存
	updateUrl : "do/doMyUsers.jsp?t=edit&id={id}", //修改
	destroyUrl : "do/doMyUsers.jsp?t=delete", //删除
	iconCls : "icon-group",
	showHeaderContextMenu : true, // 表头添加右键菜单，可选择显示的列
	pageSize : 5,
	pageList : [ 5, 10, 15, 20 ]
});
```

 ```JS
// treegrid 初始化
$("#sysMenuPermissionDataGrid").initTreegrid({
	url : 'sysMenuPermission_list.action',
	rownumbers : true,
	idField : "id",
	treeField : 'text',
	lines : true,
	//双击操作
	onDblClickRow : function(rowData) {
		toEdit(rowData);
	},
	// 表头添加右键菜单，可选择显示的列
	showHeaderContextMenu : true,
	menuSelector : "#sysMenuPermissionContextMenu",
	showContextMenu : true
});
 ```

- API

 - grid 初始化 API
 
   ```javascript
 /**
  * DataGrid: datagrid初始化，包含了uiEx.dataGridDefaults默认参数
  * 
  * @param datagridSelector datagrid选择器
  * @param params 可选；datagrid初始化参数
  */
 uiEx.initDatagrid(datagridSelector, params);
 
 /**
  * EditDataGrid: edatagrid初始化，包含了uiEx.dataGridDefaults默认参数
  * 
  * @param datagridSelector datagrid选择器
  * @param params 可选；datagrid初始化参数
  */
 uiEx.initEdatagrid(datagridSelector, params);
 
 /**
  * DetailDataGrid: DetailDataGrid初始化，包含了detailDataGridDefaults参数的默认值
  * 
  * @param datagridSelector datagrid选择器
  * @param detailUrl 加载详细视图的url
  * @param params 可选；其他参数，主要包括数据CRUD的url地址
  */
 uiEx.initDetailDatagrid(datagridSelector, detailUrl, params);

 /**
  * Treegird: Treegird初始化
  * 
  * @param treegridSelector
  *            treegrid选择器
  * @param params
  *            可选；treegrid其他参数
  */
 uiEx.initTreegrid(treegridSelector, params); 
 ```

 - datagrid CRUD API

   ```javascript
 /*
 * ############## DataGrid CRUD
 */
 /**
  *  datagrid：为行编辑DataGrid追加新行
  * 
  * @param datagridSelector DataGrid选择器
  * @param rowParam 可选；新数据行的数据参数
  */
 uiEx.rowAdd(datagridSelector, rowParam);
 
 /**
  * datagrid：为指定DataGrid启用行编辑，会引起一次新加载
  * 
  * @param datagridSelector  datagrid选择器或对象
  */
 uiEx.rowEdit(datagridSelector);
 
 /**
  * 取消选中行的编辑
  * 
  * @param datagridSelector
  *            DataGrid选择器
  */
 uiEx.rowCancelEdit(datagridSelector)；
 
 /**
  * datagird、edatagrid、detaildatagrid、treegrid:删除选中行，支持mutipleDelete多行删除参数
  * 
  * @param datagridSelector
  *            DataGrid选择器
  * @param showMsg
  *            可选；boolean值，是否显示提示消息，会覆盖默认的全局uiEx.showRowDeleteMsg参数值
  * @param reloadDataGrid
  *            可选；是否reload重新加载 DataGrid，默认为false
  * @param successKey
  *            可选；字符串值，执行成功返回的标记key，值必须和successValue相同才代表删除成功
  * @param successValue
  *            可选；字符串值，执行成功返回的标记value
  * @param callback
  *            可选；执行删除成功后的回调函数，参数为服务器端返回的数据
  *  
  *  - demo：
  *  dg.rowDelete(true, false, "statusCode", "200");
  */
 uiEx.rowDelete(datagridSelector,  showMsg, reloadDataGrid, successKey, successValue)；
 ```

 - DetailDataGrid API

   ```JS 
  /**
   * DetailDataGrid: DetailDataGrid添加行
   * 
   * @param datagridSelector datagrid选择器
   */
  uiEx.detailRowAdd(datagridSelector);
  
  /**
   * DetailDataGrid: DetailDataGrid编辑保存
   * 
   * @param datagridSelector datagrid选择器
   * @param index 编辑行索引，加载详细数据时，index值会提交到服务器，直接从服务器端请求参数获得传入该函数
   *            例如，JSP写法：uiEx.detailRowSave('#userDataGrid',${param.index})
   * @param showMsg 可选；是否显示提示信息
   */
  uiEx.detailRowSave(datagridSelector, index, showMsg);
  
  /**
   * DetailDataGrid: DetailDataGrid取消编辑或添加
   * 
   * @param datagridSelector datagrid选择器
   * @param index 编辑行索引，加载详细数据时，index值会提交到服务器，直接从服务器端请求参数获得传入该函数
   *            例如，JSP写法：uiEx.detailRowCancel('#userDataGrid',${param.index})
   */
  uiEx.detailRowCancel(datagridSelector, index);
  ```

 - Edatagrid API

   ```JS
	/**
	 * edatagrid, 开始编辑，直接单击编辑，无需双击开启编辑
	 * 
	 * @param datagridSelector
	 *            EDataGrid选择器
	 */
	uiEx.beginEditGrid(datagridSelector);

	/**
	 * edatagrid, 结束编辑，进入可编辑状态 不同于disableEditing禁用编辑，禁用编辑则无法编辑
	 * 
	 * @param datagridSelector
	 *            EDataGrid选择器
	 */
	uiEx.endEditGrid(datagridSelector);
```


### 3.7. treegrid 树形网格相关函数

- 支持两种方式调用

- 支持使用  `parentId 属性` 方式的树渲染
> EasyUI 默认的 tree 构建使用的是 `children 数组`。EasyUIEx 允许使用 `parentId 属性` 来表示并渲染树形组件。

- 扩展属性

  | Name | Type | Description | Default |
  | ----------- | ------------ | ----------- | ----------- |
  | showHeaderContextMenu  | boolean | 是否在表头显示右键菜单，可选择显示的列  | false |
  | showContextMenu  | boolean | 是否显示右键菜单，配合menuSelector属性使用  | false |
  | menuSelector  | string | 菜单选择器  | &nbsp; |

- Demo

  ```JS
$("#sysMenuPermissionDataGrid").initTreegrid({
	url : 'sysMenuPermission_list.action',
	rownumbers : true,
	idField : "id",
	treeField : 'text',
	lines : true,
	//双击操作
	onDblClickRow : function(rowData) {
		toEdit(rowData);
	},
	// 表头添加右键菜单，可选择显示的列
	showHeaderContextMenu : true,
	menuSelector : "#sysMenuPermissionContextMenu",
	showContextMenu : true
});
```

 ```HTML
<!-- 折叠和展开当前目录 -->
<div id="sysMenuRightContextMenu" class="easyui-menu" style="width:120px;">
	<div onclick="uiEx.collapse('#sysMenuRightDataGrid')">折叠目录</div>
	<div onclick="uiEx.expand('#sysMenuRightDataGrid')">展开目录</div>
</div>
```

- API

  ```JS
  /**
  * Treegird: Treegird 初始化
  * 
  * @param treegridSelector
  *            treegrid选择器
  * @param params
  *            可选；treegrid其他参数
  */
  uiEx.initTreegrid(treegridSelector, params)
  
  /**
  * Treegird: 使用 parentId 属性表示的 Treegird 初始化
  * 
  * @param treegridSelector
  *            treegrid选择器
  * @param params
  *            可选；treegrid其他参数
  */
  uiEx.initParentIdTreegrid(treegridSelector, params)
  
  /**
  * 折叠选中目录
  * @param treeGridSelector treeGrid选择器 
  * 
  */
  uiEx.collapse(treeGridSelector);
  
  /**
  * 展开选中目录
  * @param treeGridSelector treeGrid选择器 
  * 
  */
  uiEx.expand(treeGridSelector);
  ```

### 3.8. tree 树增强相关函数

- 支持两种方式调用

- 支持与 Tabs 绑定

- 支持使用  `parentId 属性` 方式的树渲染

- 扩展属性

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| expandChilds  | boolean | 点击菜单父节点展开子节点功能  | false |

- Demo

 ```javascript
//普通树菜单初始化
uiEx.initTree(
	"#menu",  //树菜单selector
	"#tabs",  //打开树菜单url的tabSelector
       //其他树参数
	{
		expandChilds: true, //点击父菜单，展开子菜单
		data: EasySSH.menuTreeJson
       //url : "json/menuTree.json.js", 
	}
);
```

  ```javascript
  //自动打开指定Text的菜单 
  uiEx.openMenuByText("#menu","#tabs","CRUD");
  ```

- API
  ```javascript
  /*
  * ############## Tree 
  */
  /**
   * Tree: tree初始化，包含两大默认功能：
   * 1. 点击菜单父节点打开子节点功能
   * 2. 点击菜单在tabSelector指定的tab打开
   * 3. tab双击关闭
   * 
   * @param treeSelector datagrid选择器
   * @param tabSelector  打开树菜单url的tab选择器
   * @param params 可选；tree初始化参数
   */
  uiEx.initTree(treeSelector, tabSelector, params);
  
    /**
   * Tree: 使用 parentId 属性表示的 tree 初始化，包含两大默认功能：
   * 1. 点击菜单父节点打开子节点功能
   * 2. 点击菜单在 tabSelector 指定的 tab 打开
   * 3. tab 双击关闭
   * 
   * @param treeSelector datagrid选择器
   * @param tabSelector  打开树菜单url的tab选择器
   * @param params 可选；tree初始化参数
   */
  uiEx.initParentIdTree(treeSelector, tabSelector, params);
  
  /**
   * onSelect事件处理：Tree的onSelect事件的实现，能实现点击菜单父节点打开子节点功能 在树初始化时通过注册onSelect事件传入
   * onSelect : uiEx.expandChilds, //点击菜单父节点打开子节点功能
   * 
   * 通过initTree的expandChilds属性可以实现相同效果：
   * expandChilds: true; 
   * 
   * @param node
   *            事件调用时传入点击的节点对象
   */
  uiEx.expandChilds(node);
  ```

- tabs 绑定相关 API

  ```javascript
  /*
  * ############## Tree Menu open to tab
  */
  /**
   * 根据菜单Text自动在指定Tab打开某个菜单
   * 
   * @param menuSelector menu选择器
   * @param tabSeelctor 选项卡选择器
   * @param menuText  要打开的菜单文本，可以使用数组定义多个菜单文本
   */
  uiEx.openMenuByText(menuSelector, tabSelector, menuText);
  
  /**
   * 根据菜单Id自动在指定Tab打开某个菜单
   * 
   * @param menuSelector menu选择器
   * @param tabSeelctor 选项卡选择器
   * @param menuId 要打开的菜单id，可以使用数组定义多个菜单id
   */
  uiEx.openMenuById(menuSelector, tabSelctor, menuId);
  ```


### 3.9. Checkbox Tree 复选框树

- 支持两种方式调用

- 支持使用  `parentId 属性` 方式的树渲染

- 扩展属性

 | Name |	Type |	Description |	Default |
| ----------- | ------------ | ----------- | ----------- |
|showTitle |	string |	鼠标移上菜单项title提示功能，可指定显示的属性 |	 &nbsp; |
|noChildCascadeCheck |	boolean |	级联选中父节点，但选中父节点不级联选中子节点。而cascadeCheck:true会导致父节点选中时子节点自动全选。 | 	false |

- Demo
 
 ```JS
 /*
 * 复选框树初始化
 */
 $("#rightsTree").initTreeChk(
        //树加载参数
        {
            url:"do/menuJson.jsp"  //获取树JSON数据
        },
        [11] //默认选中值数组
 );
 ```

 ```JS
 /*
 * 初始化权限复选框
 */
 uiEx.initTreeChk("#sysRoleEditRights", {
    url : "sysMenuRight_listAll.action",
    checkbox:true,
    animate:true,
    lines:true,
    noChildCascadeCheck: true, //级联选中父节点，但选中父节点不级联选中子节点
    showTitle:"remark" //将remark属性作为title显示
 }, data.list);
 ```

 ```JS
 /*
 * 重置
 */
 rights.resetTree=function(){
    uiEx.treeChkRest("#rightsTree");
 }
 ```

 ```JS
 /*
 * 提交
 */
 rights.submit=function(){
    $("#rightsForm").submitAjax(function(data){
            console.info("提交成功");
        },
        //随rightsForm表单一同提交到服务器的参数——复选框树选中的节点id列表（#分隔）
        {
            ids:uiEx.getCheckedIds("#rightsTree").join("#")
        }
    );
 }
 ```

 ```JS
 /*
 * 获得复选框树选中的节点中attributeArray指定的属性值，返回获得值列表的数组
 */
 uiEx.getCheckedInfos("#sysRoleAddRights",["id","type"])
 ```

- API

 ```JS
 /*
 * ############## Checkbox Tree
 */
 /**
 * 复选框树初始化
 * 
 * @param treeSelector 树选择器或对象
 * @param param 树加载参数
 * @param values 默认选中值数组
 */
 uiEx.initTreeChk(treeSelector, param, values);
 
  /**
 * parentId 表示的复选框树初始化
 * 
 * @param treeSelector 树选择器或对象
 * @param param 树加载参数
 * @param values 默认选中值数组
 */
 uiEx.initParentIdTreeChk(treeSelector, param, values);
 
 /**
 * 带复选框的树重置，配合uiEx.treeChk使用
 * 
 * @param treeSelector 树选择器或对象
 */
 uiEx.treeChkRest(treeSelector);
 
 /**
 * 设置选中的树复选框，注意：此方法必须在树渲染完后调用
 * 
 * @param treeSelector 树选择器或对象
 * @param values 选中的树节点ID数组
 */
 uiEx.treeChkSetValues = function(treeSelector, values); 
 
 /**
 * 获得带复选框树选中的节点id数组
 * 
 * @param treeSelector  树选择器或对象
 * @return 带复选框树选中的节点id数组
 */
 uiEx.getCheckedIds(treeSelector);
 
 /**
 * 获得复选框树选中的节点中attributeArray指定的属性值，返回获得值列表的数组
 * 
 * @param treeSelector 树选择器或对象
 * @param propertyArray 树属性数组
 * @return 获得值列表的数组
 */
 uiEx.getCheckedInfos(treeSelector, propertyArray);
 ```

### 3.10. 自定义验证器
- 由于验证场景和规则不一，可根据需要扩展`easy.easyuiex-validate.js`，注册自定义的验证器。

- Demo：

  ```HTML
  <input id="renewpwd" name="renewpwd" class="easyui-textbox" 
  type="password"  
  data-options="required:true,validType:['minLength [6]','equals[\'#newpwd\',\'与新密码不一致.\']']"> </input>
  ```
- API
  ```javascript
  $(function() {
  	/*
  	 * ################# 自定义验证部分
  	 */
  
  	/**
  	 * 比较输入是否与指定元素一致
  	 */
  	$.extend($.fn.validatebox.defaults.rules, {
  		equals : {
  			validator : function(value, param) {
  				return value == $(param[0]).val();
  			},
  			message : '{1}'
  		}
  	});
  
  	/**
  	 * 输入最小长度验证
  	 */
  	$.extend($.fn.validatebox.defaults.rules, {
  		minLength : {
  			validator : function(value, param) {
  				return value.length >= param[0];
  			},
  			message : uiEx.msg.minLength
  		}
  	});
  
  })
  ```


#### 3.11. 其他函数

```javascript
/**
 * 将变量uiEx的控制权让渡给第一个实现它的那个库
 * @return uiEx对象的引用
 */
uiEx.noConflict();

/*
 * parentId 类型树生成转换函数，在树形组件的 loadFilter 函数中调用
 */
loadFilter:function(rows){
	uiEx.convert(rows);
}
```

##  4. EasyUIEx 实例：

[EasyUIEx demo online](http://www.easyproject.cn/easyUIExDemo 'EasyUIEx demo')

[EasyEE](http://www.easyproject.cn/easyee 'EasyEE')



## END
### [官方主页](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。

### [The official home page](http://www.easyproject.cn/easyuiex/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easyuiex/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.



Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")



**支付宝钱包扫一扫捐助：**

我们相信，每个人的点滴贡献，都将是推动产生更多、更好免费开源产品的一大步。

**感谢慷慨捐助，以支持服务器运行和鼓励更多社区成员。**

<img alt="支付宝钱包扫一扫捐助" src="http://www.easyproject.cn/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>



We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")



