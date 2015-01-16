# EasyUIEx Manual

---------------

jQuery EasyUI + EasyUIEx architecture produced in the enterprise development practices, Easy to follow the principle goal is to simplify everything can simplify part. Emphasis has been encapsulated in the CRUD, too, welcome the essence of the practice of adding more developers.

[The official home page](http://www.easyproject.cn/easyuiex/en/index.jsp The official home page')

##  1. EasyUIEx Use these steps:

1. Join easyuiex directory in the project (including the easyuiex required css, images, js)

2. Introduction of static resources required for the project in the page (`jQuery`,` jQuery EasyUI`, `EasyUIEx`)
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
    <!-- The default message language EasyUIEx for Chinese, use other languages need to import the appropriate language file -->
    <script type="text/javascript" src="easyuiex/lang/easy.easyuiex-lang-en.js"></script>
    ```

3. EasyUIEx API calls
   **uiEx is the default namespace name EasyUIEx of. EasyUIEx API extension functions in the band selector to select the operating parameters for the specified type of DOM support calls in two ways.**

   - Namespace direct calls: In the first parameter passed to operate DOM object or object selector
   ```JavaScript
    uiEx.{methodName}(selector, [param1], ....);
   ```

   - jQuery object extension calls: Using jQuery object directly invoke methods
   ```JavaScript
   $(selector).{methodName}([param1], ....);
   ```   
   Example:
   ```javascript
    //Method One: uiEx namespace call
    uiEx.clearForm('#userForm')；
    
    uiEx.treeChk(
    	"#rightsTree",
    	{
    		url:"do/menuJson.jsp"
    	},
    	[11]
    );

    //Method Two: jQuery object extension call
    $('#userForm').clearForm();

    $("#rightsTree").treeChk(
        {
            url:"do/menuJson.jsp"
        },
        [11]
    );
   ```

 Note: Due to EasyUIEx interior package `datagrid`,` tree` certain DOM objects, such as when to use the `id attribute`  of the object, so these DOM elements must have a unique `id attribute` . Priority recommend using the ID selector to select DOM elements.

##  2. EasyUIEx API：
 
#### 1. Global configuration parameters
Global configuration parameters can be adjusted EasyUIEx operating parameters, methods and content, can `uiEx needed by. {ParamName} = paramValue` modify.

See Note specific role, the following default configuration:

```javascript
var uiEx = {
		/*
		 * ################# Message content and control section
		 */
		alertTitle : "Operation Tips", 
		confirmTitle : "Confirmation tips", 
		promptTitle : "Input tips", 
		msgTitle : "Message tips",
		showRowEditMsg : false, 
		showRowAddMsg : false, 
		showRowDeleteMsg : true, 
		rowEditSuccessMsg : "Successful modified!",
		rowEditFailureMsg : "Failed modified!",
		rowAddSuccessMsg : "Successful added!",
		rowAddFailureMsg : "Failed added!",
		deleteConfirmMsg : "Are you sure you want to delete?",
		rowDeleteSuccessMsg : "Successful deleted!",
		rowDeleteFailureMsg : "Failed deleted",
        /*
		 * ################# The default parameters for msg box
		 */
		msgDefaults:{
			title : this.msgTitle,
			timeout : 4000,
			showType : 'slide' // null、slide、fade、show。default: slide。
            // width:250,
			// height:100,
			// showSpeed:600
		},
        /*
		 * ################# The default parameters for datagrid
		 */
		dataGridDefaults : {
			rownumbers : true, 
			fitColumns : true, 
			singleSelect : true, 
			pagination : true, 
			method : "post", 
			striped : true
		},
        /*
		 * ################# The default parameters for DetailDataGrid
		 */
		detailDataGridDefaults : {
			rownumbers : true,
			fitColumns : true, 
			singleSelect : true, 
			pagination : true, 
			method : "post", 
			striped : true, 
			view : detailview,
			detailFormatter : function(index, row) {
				return '<div class="ddv"></div>';
			}
		},
        /*
		 * ################# The use of {expression} expression in URL, regular analytic used
		 */
		expReg : /\{([\s\S]+?)\}/g
	};
```

#### 2. alter、 confirm、 prompt、 msg Message window  functions
```javascript
/**
 * Operation tips
 * 
 * @param msg The message content
 * @param type The message icon type:error、info、question、warning
 */
uiEx.alert(msg, type);
 
/**
 * Confirmation tips
 * 
 * @param msg The message content
 * @param type The message icon type:error、info、question、warning
 */
uiEx.confirm(msg, callback);

/**
 * Input tips
 * 
 * @param msg The message content
 * @param type The message icon type:error、info、question、warning
 */
uiEx.prompt(msg, callback);

/**
 * Message tips
 * 
 * @param msg The message content
 * @param position Message positiontopLeft, topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight; default is:bottomRight
 * @param params msgmessage box parameters
 */
uiEx.msg(msg, position, params);
```

#### 3. dialog functions
```javascript
/**
 * show dialog
 * 
 * @param dialogSelector dialog selector
 * @param title dialog title
 * @return dialog object
 */
uiEx.openDialog(dialogSelector, title);

/**
 * close dialog
 * 
 * @param dialogSelector dialog selector
 * @return dialog object
 */
uiEx.closeDialog(dialogSelector);
```


#### 4. form functions

Support calls in two ways.
```javascript
/**
 * clear form
 * 
 * @param selector  form selector
 * @return form object
 */
uiEx.clearForm(selector);

/**
 * enable form validate
 * 
 * @param selector form selector
 * @return form object
 */
uiEx.enableValidate(selector);

/**
 * disable form validate
 * 
 * @param selector form selector
 * @return form object
 */
uiEx.disableValidate(selector);

/**
 * validate form
 * 
 * @param selector form selector
 * @return form object
 */
uiEx.validate(selector);

/**
 * submit form
 * 
 * @param formSelector form selector
 * @param params  Optional; form parameters
 * @param noValidate Optional; is valication; boolean; default is true
 */
uiEx.submitForm(formSelector, params, noValidate);

/**
 * submit use ajax
 * 
 * @param formSelector form selector
 * @param callback ajax success callback method
 * @param params Optional; form parameters
 * @param noValidate Optional; is valication; boolean; default is true
 */
uiEx.submitAjax(formSelector, callback, params, noValidate);
 
/**
* submit use ajax by url
* 
* @param formSelector form selector
* @param url submit url
* @param callback ajax success callback method
* @param params Optional; form parameters
* @param noValidate Optional; is valication; boolean; default is true
*/
uiEx.submitURLAjax(formSelector, url, callback, params, noValidate) 

/**
 * serialize form data to json
 * 
 * @parama formSelector form selector
 */
uiEx.serializeJSON(formSelector);
```


#### 5. tab functions

Support calls in two ways.
```javascript
/**
 * Add a tab for the specified Tab
 * 
 * @parma tabSelector 
 * @parma title 
 * @parma url 
 * @parma icon Optional; 
 */
uiEx.openTab(tabSelector, title, url, icon);

/**
 * reload now selected Panel
 * 
 * @param tabSelector tabs selector
 */
uiEx.reloadSelTab(tabSelector);

/**
 * Bind the tabs right click menu, to achieve close, close other, close all, refresh function
 * 
 * @param tabSelector tabs selector
 */
uiEx.addTabsMenu(tabSelector);
```

#### 6. datagrid、edatagrid、detaildatagrid functions

Support calls in two ways.

##### 6.1 datagrid initialize(datagrid, edatagrid, detaildatagrid)
Method of data grid initialization provided by the use of EasyUIEx can simplify the data grid initialization operation, and simplified in CRUD operation.
```javascript
/**
 * DataGrid: datagrid initialization, include uiEx.dataGridDefaults default parameters
 * 
 * @param datagridSelector datagrid selector
 * @param params Optional; datagrid initialization parameters
 */
uiEx.initDatagrid(datagridSelector, params);

/**
 * EditDataGrid: edatagrid initialization, include uiEx.dataGridDefaults default parameters
 * 
 * @param datagridSelector datagrid selector
 * @param params Optional; datagrid initialization parameters
 */
uiEx.initEdatagrid(datagridSelector, params);

/**
 * DetailDataGrid: Detaildatagrid initialization, include detailDataGridDefaults
 * 
 * @param datagridSelector datagrid selector
 * @param detailUrl 
 * @param params Optional; Including data CRUD URL address
 */
uiEx.initDetailDatagrid(datagridSelector, detailUrl, params);
```

The EasyUIEx package for CRUD application of in-depth, in calling initialization methods, with the server operation address parameters to the `url`, `saveUrl`, `updateUrl`, `destroyUrl` (CRUD parameter and edatagrid is consistent with the aid of API EasyUIEx), can finish CRUD operation.

**datagrid initialization Example: **
```javascript
// datagrid  initialization 
$("#userDataGrid").initDatagrid({
	/*
	* row edit: saveUrl、updateUrl、destroyUrl With the use of uiEx
	*/
	url:'do/doList.jsp', //datagrid data query
	saveUrl : "do/doMyUsers.jsp?t=add", //save
	updateUrl : "do/doMyUsers.jsp?t=edit", //update
	destroyUrl : "do/doMyUsers.jsp?t=delete", //destory
	iconCls:'icon-group',
	onHeaderContextMenu:uiEx.onHeaderMenu, 	//Form added right-click menu, choose the columns to display
    onClickRow : uiEx.onRowEdit,	//Registered click line editing, can replace the edatagrid realization with the line edit CRUD
    pageSize:5,
	pageList: [5, 10, 15,20]
});

// detaildatagrid  initialization 
uiEx.initDetailDatagrid("#userDataGrid2","do/toDetailEdit.jsp",{
	/*
	* row edit: saveUrl、updateUrl、destroyUrl With the use of uiEx
	*/
	url : "do/doList.jsp", //datagrid data query
	saveUrl : "do/doMyUsers.jsp?t=add", //save
	updateUrl : "do/doMyUsers.jsp?t=edit&id={id}", //update
	destroyUrl : "do/doMyUsers.jsp?t=delete", //destory
	iconCls : "icon-group",
	onHeaderContextMenu : uiEx.onHeaderMenu, //Form added right-click menu, choose the columns to display
	pageSize : 5,
	pageList : [ 5, 10, 15, 20 ]
});
```



##### 6.2 datagrid row edit CRUD(datagrid, detaildatagrid)

```javascript
/*
* ############## DataGrid CRUD
*/
/**
 *  datagrid：append new row for row edit datagrid
 * 
 * @param datagridSelector DataGrid selector
 * @param rowParam Optional; new row data parameters
 */
uiEx.rowAdd(datagridSelector, rowParam);

/**
 * datagrid: The onClickRow event handling the registration function, can realize the line editor in DataGrid onClickRow
 *when datagrid initialize to register onClickRow
 * onClickRow : uiEx.onRowEdit,	//register onclick row edit, can replace edatagrid
 */
uiEx.onRowEdit;

/**
 * datagrid：register onclick row edit,  Will cause a new loading 
 * 
 * @param datagridSelector  datagrid selector
 */
uiEx.rowEdit(datagridSelector);

/**
 * destory selected row
 * 
 * @param datagridSelector DataGrid selector
 * @param reloadDataGrid Optional;  selected row
 * @param showMsg Optional; boolean, Whether the prompt message display, global uiEx.showRowDeleteMsg parameters will override the default value
 */
uiEx.rowDelete(datagridSelector, reloadDataGrid, showMsg);


/*
* ############## DetailDataGrid CRUD
*/
/**
 * DetailDataGrid: DetailDataGrid append row 
 * 
 * @param datagridSelector datagrid selector
 */
uiEx.detailRowAdd(datagridSelector);

/**
 * DetailDataGrid: DetailDataGrid save
 * 
 * @param datagridSelector datagrid selector
 * @param index Edit the row index, loaded with the data, the index value will be submitted to the server, the request parameters directly from the server to get passed into the function
 *            For example, JSP writing: uiEx.detailRowSave('#userDataGrid',${param.index})
 * @param showMsg Optional; Whether to display a message
 */
uiEx.detailRowSave(datagridSelector, index, showMsg);

/**
 * DetailDataGrid: DetailDataGrid cancel edit or add
 * 
 * @param datagridSelector datagrid selector
 * @param index Edit the row index, loaded with the data, the index value will be submitted to the server, the request parameters directly from the server to get passed into the function
 *            For example, JSP writing: uiEx.detailRowCancel('#userDataGrid',${param.index})
 */
uiEx.detailRowCancel(datagridSelector, index);
```

##### 6.3 datagrid cell edit(datagrid)

```javascript
/**
 * 
 *  datagrid：onClickCellevent register  function, To achieve the edit in DataGrid onClickCell
 * In data grid initialization by registering a onClickCell event for incoming
 * onClickCell : uiEx.onCellEdit,	//cell edit
 */
uiEx.onCellEdit;
```

##### 6.5 Datagrid column head right click menu(datagrid, edatagrid, detaildatagrid)

```javascript
/**
 * onHeaderContextMenu event processing: DataGrid onHeaderContextMenu event implements,  Can set the column header menu, choose and hide column 
 * In data grid initialization by registering a onHeaderContextMenu event for incoming
 * onHeaderContextMenu:uiEx.onHeaderMenu 	//Form added right-click menu, choose the columns to display
 */
uiEx.onHeaderMenu;

/**
 * Set the column head right-click menu for the specified DataGrid, can choose and hide columns, will cause a new DataGrid loading
 * 
 * @param datagridSelector datagrid selector
 */
uiEx.headerMenu(datagridSelector);
```



#### 7. tree functions

Support calls in two ways.

##### 7.1 Common tree menu(Tree)
```javascript
/*
* ############## Tree 
*/
/**
 * Tree: tree initialization , Includes two default function:
 * 1. Click the menu to open the child nodes of the parent node function
 * 2. Click on the menu to open the specified in tabSelector tab
 * 
 * @param treeSelector datagrid selector
 * @param tabSelector  Open the tree menu URL tab selector
 * @param params Optional; tree initialization parameters
 */
uiEx.initTree(treeSelector, tabSelector, params);

/**
 * onSelect event processing: Tree onSelect event implements, Click the menu to open the child nodes of the parent node function
 * In tree initialization by registered onSelect event introduction
 * onSelect : uiEx.onSelectOpen,     //Click the menu to open the child nodes of the parent node function
 */
uiEx.onSelectOpen;

/*
* ############## Tree Menu open to tab
*/
/**
 * According to the menu Text automatically opens a menu in the specified Tab
 * 
 * @param menuSelector menu selector
 * @param tabSeelctor tabs selector
 * @param menuText  The text of the menu to open, can use an array to define multiple menu text
 */
uiEx.openMenuByText(menuSelector, tabSeelctor, menuText);

/**
 * According to the menu id automatically opens a menu in the specified Tab
 * 
 * @param menuSelector menu selector
 * @param tabSeelctor tabs selector
 * @param menuId The id of the menu to open, can use an array to define multiple menu id
 */
uiEx.openMenuById(menuSelector, tabSelctor, menuId);
```

**Common tree menu initialization Example: **
```javascript
//Common tree menu initialization 
uiEx.initTree(
		"#menu",  //tree menu selector
		"#tabs",  //the tabSelector to open tree url
        //other tree parameters
		{
			data:[${menuJSON}]
	       //url : "json/menuTree.json.js", 
		}
	);
//auto open the menu by menu text
uiEx.openMenuByText("#menu","#tabs","CRUD");
```



##### 7.2 checkbox tree(Checkbox Tree)
```javascript
/*
* ############## Checkbox Tree
*/
/**
 * checkbox tree initialization 
 * 
 * @param treeSelector tree selector
 * @param param tree load parameters
 * @param values default checked value array
 */
uiEx.treeChk(treeSelector, param, values);
/**
 * include checkbox tree reset, must use with uiEx.treeChk
 * 
 * @param treeSelector tree selector
 */
uiEx.treeChkRest(treeSelector);

/**
 *Set selected the tree check box, note: this method must be called in tree rendering after
 * 
 * @param treeSelector tree selector
 * @param values Set selected the tree check box, note: this method must be called in tree rendering after
 */
uiEx.treeChkSetValues = function(treeSelector, values); 

/**
 * Get node ID array with checkbox selected by tree.
 * 
 * @param treeSelector  tree selector
 * @return Node ID array with checkbox selected by tree.
 */
uiEx.getCheckedIds(treeSelector)
```

**include checkbox tree initialization Example: **
```javascript
//checkbox tree initialization 
$("#rightsTree").initTreeChk(
		//tree load parameters
		{
			url:"do/menuJson.jsp"  //TreeJSON data acquisition
		},
		[11] //default checked value array
);

//reset 
rights.resetTree=function(){
	uiEx.treeChkRest("#rightsTree");
}
//submit
rights.submit=function(){
	$("#rightsForm").submitAjax(function(data){
			console.info("submit");
		},
		//RightsForm forms together with submit -- ID checkbox tree list of nodes to the selected parameter server (# separated)
		{
			ids:uiEx.getCheckedIds("#rightsTree").join("#")
		}
	);
}
```
#### 8. Other functions
```javascript
/**
 * The variable uiEx control rights to the first implementation of the library it
 * @return uiEx Object reference
 */
uiEx.noConflict();
```

### 9. A custom validator
Because a validation scenarios and rules, according to the need to expand EasyUIEx, registered a custom validator
```javascript
$(function() {
	/*
	 * ################# Custom validators
	 */

	/**
	 * Comparison of input and whether the specified element consistent
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
	 * The minimum length of input validation
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


##  3. EasyUIEx Demo：

[EasyUIEx demo online](http://www.easyproject.cn/easyUIExDemo 'EasyUIEx demo')



## End

[Comments](http://www.easyproject.cn/easyocr/zh-cn/index.jsp#about 'Comments')

If you have more comments, suggestions or ideas, please contact me.

Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")
