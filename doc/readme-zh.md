# EasyUIEx 使用手册

---------------

jQuery EasyUI + EasyUIEx 的架构产生于企业开发实践，遵循Easy的原则，目标是简化一切可以简化的部分。着重在CRUD方面进行了封装，也欢迎更多开发实践的精华加入。

[官方主页](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp '官方主页')

##  1. EasyUIEx 使用步骤：

1. 在项目中加入easyuiex目录（包含了easyuiex所需的css、images、js）

2. 在页面引入项目所需的静态资源（`jQuery`, `jQuery EasyUI`, `EasyUIEx`）
    ```HTML
    <!-- EasyUI CSS -->
    <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css" id="themeLink">
    <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
    
    <!-- EasyUI JS & Extension JS-->
    <script type="text/javascript" src="easyui/jquery.min.js"></script>
    <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="easyui/datagrid-dnd.js"></script>
    <script type="text/javascript" src="easyui/jquery.edatagrid.js"></script>
    <script type="text/javascript" src="easyui/datagrid-detailview.js"></script>
    
    <!-- EasyUIEx -->
    <link rel="stylesheet" type="text/css" href="easyuiex/css/easyuiex.css">
    <script type="text/javascript" src="easyuiex/easy.easyuiex.js"></script>
    <!-- 导入lang目录下相应语言文件 -->
     <script type="text/javascript" src="easyuiex/lang/easy.easyuiex-lang-zh_CN.js"></script> -->
    ```

3. EasyUIEx API 调用
   **uiEx是EasyUIEx的默认命名空间名称。EasyUIEx API 中带selector选择器参数针对指定类型DOM操作的的扩展函数都支持两种方式的调用。**

   - 命名空间直接调用：在第一个参数传入要操作的DOM对象的选择器或对象
   ```JavaScript
    uiEx.{methodName}(selector, [param1], ....);
   ```

   - jQuery对象扩展调用：使用jQuery对象直接调用方法
   ```JavaScript
   $(selector).{methodName}([param1], ....);
   ```   
   示例：
   ```javascript
    //方法一：uiEx命名空间调用
    uiEx.clearForm('#userForm')；
    
    uiEx.treeChk(
    	"#rightsTree",
    	{
    		url:"do/menuJson.jsp"
    	},
    	[11]
    );

    //方法二：jQuery对象扩展调用
    $('#userForm').clearForm();

    $("#rightsTree").treeChk(
        {
            url:"do/menuJson.jsp"
        },
        [11]
    );
   ```

 注意：由于EasyUIEx内部封装`datagrid`, `tree`等某些DOM对象时使用到了对象的`id属性`，所以这些DOM元素必须具有唯一的`id属性`。优先推荐使用ID选择器选择DOM元素。

##  2. EasyUIEx API：
 
#### 1. 全局配置参数

全局配置参数可以调整EasyUIEx的运行参数、方式和内容，可根据需要通过`uiEx.{paramName} = paramValue`方式修改。

具体作用参见注释，以下为默认配置：

```javascript
var uiEx = {
		/*
		 * ################# 消息内容和控制部分
		 */
		alertTitle : "操作提示", // 消息框的标题
		confirmTitle : "确认提示", // 消息框的标题
		promptTitle : "输入提示", // 消息框的标题
		msgTitle : "消息提示", // 消息框的标题
		showRowEditMsg : false, // 是否在行编辑完后提示msg
		showRowAddMsg : false, // 是否在行添加完后提示msg
		showRowDeleteMsg : true, // 是否在行删除完后提示msg
		rowEditSuccessMsg : "修改成功！",
		rowEditFailureMsg : "修改失败！",
		rowAddSuccessMsg : "添加成功！",
		rowAddFailureMsg : "添加失败！",
		deleteConfirmMsg : "确定要删除吗？",
		rowDeleteSuccessMsg : "删除成功！",
		rowDeleteFailureMsg : "删除失败！",
        /*
		 * ################# 自定义消息框的默认参数
		 */
		msgDefaults:{
			title : this.msgTitle,
			timeout : 4000,
			showType : 'slide' // null、slide、fade、show。默认是 slide。
            // width:250,
			// height:100,
			// showSpeed:600
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
			view : detailview,
			// 返回行明细内容的格式化函数
			detailFormatter : function(index, row) {
				return '<div class="ddv"></div>';
			}
		},
        /*
		 * ################# url中使用{expression}表达式，解析时用到的正则
		 */
		expReg : /\{([\s\S]+?)\}/g
	};
```

#### 2. alter、 confirm、 prompt、 msg 消息窗口相关函数
```javascript
/**
 * 操作提示
 * 
 * @param msg 消息内容
 * @param type 消息图标类型：error、info、question、warning
 */
uiEx.alert(msg, type);
 
/**
 * 确认提示
 * 
 * @param msg 消息内容
 * @param type 消息图标类型：error、info、question、warning
 */
uiEx.confirm(msg, callback);

/**
 * 输入提示
 * 
 * @param msg 消息内容
 * @param type 消息图标类型：error、info、question、warning
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

#### 3. dialog 对话框相关函数
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
 * 关闭指定对话框
 * 
 * @param dialogSelector dialog选择器
 * @return dialog对象
 */
uiEx.closeDialog(dialogSelector);
```


#### 4. form 表单相关函数

支持两种方式调用。
```javascript
/**
 * 清除指定id的form表单信息
 * 
 * @param selector  表单选择器
 * @return form对象
 */
uiEx.clearForm(selector);

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
 * 普通表单提交
 * 
 * @param formSelector 表单选择器
 * @param params  可选; form表单额外提交的参数
 * @param noValidate 可选; 是否验证; boolean; 默认为true
 */
uiEx.submitForm(formSelector, params, noValidate);

/**
 * 以Ajax进行带表单验证的表单提交
 * 
 * @param formSelector 表单选择器
 * @param callback AJAX请求后的回调处理函数
 * @param params 可选; form表单额外提交的参数
 * @param noValidate 可选; 是否验证; boolean; 默认为true
 */
uiEx.submitAjax(formSelector, callback, params, noValidate);
 
/**
* 将表单以Ajax提交到指定url
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


#### 5. tab 选项卡相关函数

支持两种方式调用。
```javascript
/**
 * 为指定Tab添加选项卡
 * 
 * @parma tabSelector 选项卡
 * @parma title 标题
 * @parma url 地址
 * @parma icon 可选；图标
 */
uiEx.openTab(tabSelector, title, url, icon);

/**
 * 刷新当前选项卡选中的Panel
 * 
 * @param tabSelector 选项卡选择器
 */
uiEx.reloadSelTab(tabSelector);

/**
 * 绑定tabs的右键菜单，实现：关闭，关闭其他，关闭所有；关闭左侧标签页、关闭右侧标签页；刷新等菜单功能
 * 必须在页面定义右键菜单标签（菜单id、菜单项的name不能修改）：
 * 	<div id="tabsMenu" class="easyui-menu" style="width:120px;">
		   <div name="close"   data-options="iconCls:'icon-close'">Close</div>  
		   <div name="other"   data-options="">Close others</div>  
		   <div name="all"  data-options="">Close all</div>
		   <div class="menu-sep"></div>
	       <div name="closeRight">Close right</div>
	       <div name="closeLeft">Close left</div>
	       <div class="menu-sep"></div>
	      <div name="refresh"  data-options="iconCls:'icon-reload'">Refresh</div> 
	</div>
 * @param tabSelector tab选择器
 */
uiEx.addTabsMenu(tabSelector);
```

#### 6. datagrid、edatagrid、detaildatagrid 数据网格相关函数

支持两种方式调用。

##### 6.1 数据网格初始化部分（datagrid，edatagrid，detaildatagrid）
使用EasyUIEx提供的数据网格初始化方法能简化数据网格初始化操作，并在CRUD操作时得到简化。
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
```

EasyUIEx针对CRUD应用进行了深入封装，在调用初始化方法时，配合传入`url`、`saveUrl`、`updateUrl`、`destroyUrl`等CRUD的服务器操作地址参数（和edatagrid的参数保持了一致），就能借助EasyUIEx的API极简完成CRUD操作。

**数据表格初始化示例：**
```javascript
// datagrid 初始化
$("#userDataGrid").initDatagrid({
	/*
	* 行编辑:saveUrl、updateUrl、destroyUrl配合uiEx使用
	*/
	url:'do/doList.jsp', //数据表格数据查询
	saveUrl : "do/doMyUsers.jsp?t=add", //保存
	updateUrl : "do/doMyUsers.jsp?t=edit", //修改
	destroyUrl : "do/doMyUsers.jsp?t=delete", //删除
	iconCls:'icon-group',
	onHeaderContextMenu:uiEx.onHeaderMenu, 	//表单添加右键菜单，可选择显示的列
    onClickRow : uiEx.onRowEdit,	//注册单击行编辑，可以代替edatagrid实现带行编辑的CRUD
    pageSize:5,
	pageList: [5, 10, 15,20]
});

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
	onHeaderContextMenu : uiEx.onHeaderMenu, //表单添加右键菜单，可选择显示的列
	pageSize : 5,
	pageList : [ 5, 10, 15, 20 ]
});
```



##### 6.2 数据网格行编辑CRUD——增、删、改、取消操作（datagrid，detaildatagrid）

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
 * datagrid：onClickRow事件处理注册函数，能在DataGrid的onClickRow时实现行编辑
 * 在数据网格初始化时通过注册onClickRow事件传入
 * onClickRow : uiEx.onRowEdit,	//注册单击行编辑功能，可以代替edatagrid实现带行编辑的
 */
uiEx.onRowEdit;

/**
 * datagrid：为指定DataGrid启用行编辑，会引起一次新加载
 * 
 * @param datagridSelector  datagrid选择器或对象
 */
uiEx.rowEdit(datagridSelector);

/**
 * 删除选中行
 * 
 * @param datagridSelector DataGrid选择器
 * @param reloadDataGrid 可选；是否reload重新加载 DataGrid，默认为false
 * @param showMsg 可选；boolean值，是否显示提示消息，会覆盖默认的全局uiEx.showRowDeleteMsg参数值
 */
uiEx.rowDelete(datagridSelector, reloadDataGrid, showMsg);


/*
* ############## DetailDataGrid CRUD
*/
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

##### 6.3 数据网格单元格编辑（datagrid）

```javascript
/**
 * 
 *  datagrid：onClickCell事件处理注册函数，能在DataGrid的onClickCell时实现列编辑
 * 在数据网格初始化时通过注册onClickCell事件传入
 * onClickCell : uiEx.onCellEdit,	//单元格编辑
 */
uiEx.onCellEdit;
```

##### 6.5 数据网格列头右键菜单（datagrid，edatagrid，detaildatagrid）

```javascript
/**
 * onHeaderContextMenu事件处理：DataGrid的onHeaderContextMenu事件的实现，能设置列头右键菜单，可选择和隐藏列
 * 在数据网格初始化时通过注册onHeaderContextMenu事件传入
 * onHeaderContextMenu:uiEx.onHeaderMenu 	//表单添加右键菜单，可选择显示的列
 */
uiEx.onHeaderMenu;

/**
 * 为指定DataGrid设置列头右键菜单，可选择和隐藏列，会引起一次新的datagrid加载
 * 
 * @param datagridSelector 数据表格选择器
 */
uiEx.headerMenu(datagridSelector);
```



#### 7. tree 树增强相关函数

支持两种方式调用。

##### 7.1 普通树菜单（Tree）
```javascript
/*
* ############## Tree 
*/
/**
 * Tree: tree初始化，包含两大默认功能：
 * 1. 点击菜单父节点打开子节点功能
 * 2. 点击菜单在tabSelector指定的tab打开
 * 
 * @param treeSelector datagrid选择器
 * @param tabSelector  打开树菜单url的tab选择器
 * @param params 可选；tree初始化参数
 */
uiEx.initTree(treeSelector, tabSelector, params);

/**
 * onSelect事件处理：Tree的onSelect事件的实现，能实现点击菜单父节点打开子节点功能
 * 在树初始化时通过注册onSelect事件传入
 * onSelect : uiEx.onSelectOpen,     //点击菜单父节点打开子节点功能
 */
uiEx.onSelectOpen;

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
uiEx.openMenuByText(menuSelector, tabSeelctor, menuText);

/**
 * 根据菜单Id自动在指定Tab打开某个菜单
 * 
 * @param menuSelector menu选择器
 * @param tabSeelctor 选项卡选择器
 * @param menuId 要打开的菜单id，可以使用数组定义多个菜单id
 */
uiEx.openMenuById(menuSelector, tabSelctor, menuId);
```

**普通树菜单初始化示例：**
```javascript
//普通树菜单初始化
uiEx.initTree(
		"#menu",  //树菜单selector
		"#tabs",  //打开树菜单url的tabSelector
        //其他树参数
		{
			data:[${menuJSON}]
	       //url : "json/menuTree.json.js", 
		}
	);
//自动打开指定Text的菜单 
uiEx.openMenuByText("#menu","#tabs","CRUD");
```



##### 7.2 复选框树（Checkbox Tree）
```javascript
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
uiEx.treeChk(treeSelector, param, values);
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
uiEx.getCheckedIds(treeSelector)
```

**带复选框的树初始化示例：**
```javascript
//复选框树初始化
$("#rightsTree").initTreeChk(
		//树加载参数
		{
			url:"do/menuJson.jsp"  //获取树JSON数据
		},
		[11] //默认选中值数组
);

//重置
rights.resetTree=function(){
	uiEx.treeChkRest("#rightsTree");
}
//提交
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
#### 8. 其他函数
```javascript
/**
 * 将变量uiEx的控制权让渡给第一个实现它的那个库
 * @return uiEx对象的引用
 */
uiEx.noConflict();
```

### 9. 自定义验证器
由于验证场景和规则不一，可根据需要扩展EasyUIEx，注册自定义的验证器
```javascript
$(function() {
	/*
	 * ################# 自定义验证部分
	 */

	/**
	 * 比较输入是否与指定元素一致
	 * 
	 * <input id="renewpwd" name="renewpwd"
	 *  class="easyui-textbox" type="password" 
	 *  data-options="required:true,validType:['minLength [6]','equals[\'#newpwd\',\'与新密码不一致.\']']">
	 *  </input>
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
			message : 'Length can not be less than {0}.'
		}
	});

})
```

##  3. EasyUIEx 实例：

[EasyUIEx demo online](http://www.easyproject.cn/easyUIExDemo 'EasyUIEx demo')


## 结束

[留言评论](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp#about '留言评论')

如果您有更好意见，建议或想法，请联系我。


联系、反馈、定制、培训 Email：<inthinkcolor@gmail.com>

<p>
<strong>支付宝钱包扫一扫捐助：</strong>
</p>
<p>

<img alt="支付宝钱包扫一扫捐助" src="http://www.easyproject.cn/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>


[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")