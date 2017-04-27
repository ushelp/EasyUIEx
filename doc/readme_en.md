# EasyUIEx Manual

---------------

**jQuery EasyUI + EasyUIEx** architecture produced in the enterprise development practices, Easy to follow the principle goal is to simplify everything can simplify part, do not have to provide extended to all the needs. CRUD focus on aspects of the package extensions are also welcome to join the essence of more development practices.

[English API online](http://www.easyproject.cn/easyuiex/doc/easyuiex-api_en.html 'EasyUIEx English API online')


##  1. Download:

With the use of `easy.jquery.edatagrid.js` instead of` jquery.edatagrid.js`, easyUIEx of edatagrid performance and logic optimization and provides additional functionality.

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
<script type="text/javascript" src="easyuiex/easy.easyuiex.min-2.2.3.js"></script>
<script type="text/javascript" src="easyuiex/easy.easyuiex-validate.js"></script>
<!-- EasyUIEx 'easy.jquery.edatagrid.js' instead of 'jquery.edatagrid.js' -->
<script type="text/javascript" src="easyuiex/easy.jquery.edatagrid.js"></script>
<!-- Language file -->
<script type="text/javascript" src="easyuiex/lang/easy.easyuiex-lang-zh_CN.js"></script> 
```

## 2. EasyUIEx API Invoke

**uiEx** is the default namespace name EasyUIEx of. EasyUIEx API for DOM operation in extended function with selector selectors are supported calls in two ways.

> **Note: Please set id attribute for dom element. ** 
   
- **Directly within uiEx namespace**
 
   The first argument is dom selector.
 
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
   
- **Within jQuery function extend**
 
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



##  3. EasyUIEx API：

### API online

[English API online](http://www.easyproject.cn/easyuiex/doc/easyuiex-api_en.html)
 
### 3.1. Global configuration parameters

- **Message international configuration**

 Modify in lang / easy.easyuiex-lang-`LANG_COUNTRY`.js

- **Global configuration parameters**

 can be adjusted EasyUIEx operating parameters, methods and content, modify parameters:
 
 `uiEx.{paramName} = paramValue`

  See note specific role, the following default configuration:
  ```javascript
  var uiEx = {
  	/*
  	 * ################# Message content and control section
  	 */
  	showRowEditMsg : false, // After editing the line whether prompt msg
  	showRowAddMsg : false, // Whether to add the line after the prompt msg
  	showRowDeleteMsg : true, // Whether to delete the line after the prompt msg
  	/*
  	 * ################# The default parameters to customize the message box
  	 */
  	msgDefaults : {
  		timeout : 4000,
  		showType : 'slide' // null、slide、fade、show。 Default is slide。
  	// width:250,
  	// height:100,
  	 
  	},
  	/*
  	 * ################# Data Grid default parameters
  	 */
  	dataGridDefaults : {
  		rownumbers : true, // Show Line Numbers
  		fitColumns : true, // Automatically expand or shrink the size of the column width to fit the grid and prevent the horizontal scroll bar
  		singleSelect : true, // Single Select
  		pagination : true, // Display pagination
  		method : "post", // Submit Information
  		striped : true
  	// Form stripes, alternating row colors parity
  	},
  	/*
  	 * ################# Data Grid default parameters detailed view
  	 */
  	detailDataGridDefaults : {
  		rownumbers : true, // Show Line Numbers
  		fitColumns : true, // Automatically expand or shrink the size of the column width to fit the grid and prevent the horizontal scroll bar
  		singleSelect : true, // Single Select
  		pagination : true, // Display pagination
  		method : "post", // Submit Information
  		striped : true, // Form stripes, alternating row colors parity
  		// Return line detail content formatting functions
  		detailFormatter : function(index, row) {
  			return '<div class="ddv"></div>';
  		}
  	},
  	/*
  	 * ################# url use {expression} expression used when parsing regular
  	 */
  	expReg : /\{([\s\S]+?)\}/g,
  	/*
  	 * ################# Verify prompt message
  	 */
  	msg : {}
  };
  ```
  
### 3.2. Messager API
  
  ```javascript
  /**
   * alert
   * 
   * @param msg Message Content
   * @param type Message Icon Type: error, info, question, warning
   * @param callback Callback
   */
  uiEx.alert(msg, type, callback);
   
  /**
   * confirm
   * 
   * @param msg Message Content
   * @param callback Callback
   */
  uiEx.confirm(msg, callback);
  
  /**
   * prompt
   * 
   * @param msg 消Message Content
   * @param callback Callback
   */
  uiEx.prompt(msg, callback);
  
  /**
   * msg
   * 
   * @param msg Message Content
   * @param position topLeft, topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight; Default is bottomRight
   * @param params msg The message box parameters
   */
  uiEx.msg(msg, position, params);
  ```

### 3.3 dialog API

- Two ways to call

- Dialog EasyUI need to solve the problem defined in the global page, when you close a tab inside the loaded automatically destroyed Tab Dialog
> Closed tab, specify loaded automatically destroyed dialog, to prevent the repeated loading.
> Since the Dialog EasyUI after the label closed and will not be destroyed (easyUI when parsing dialog, regardless of where the definition dialog will be put body), so in order to prevent duplicate tab page defined at each load, usually by The following approaches:
> 1, the dialog into the main interface, rather than through the tab to load
> 2, refresh the tab through the time off to be destroyed before the dialog

 
- API

 ```javascript
 /**
  * show Dialog
  * 
  * @param dialogSelector dialog selector
  * @param title 
  * @return dialog object
  */
 uiEx.openDialog(dialogSelector, title);
 
 /**
  * show href in dialog
  * 
  * @param dialogSelector dialog selector
  * @param href the request href
  * @param title 
  * @return dialog object
  */
 uiEx.openHrefDialog(dialogSelector, href, title)
 
 /**
  * close Dialog
  * 
  * @param dialogSelector dialog selector
  * @return dialog object
  */
 uiEx.closeDialog(dialogSelector);
 ```


### 3.4. form API

- Two ways to call

- Ajax form submit
`EasyUIEx.submitAjax` and` EasyUIEx.submitURLAjax` encapsulated in a `xRequestedWith = XMLHttpRequest` parameters will be submitted along with the form to the server, the server side to help developers through` `xRequestedWith parameter to determine whether the Ajax request.
> Submit EasyUI form components of form submission method has certain confusing and misleading. Its internal use of the iframe submit submit, is not really Ajax submission.
> So when a user on the server side when trying to pass the request header information (X-Requested-With = XMLHttpRequest) to determine whether a request submitted by Ajax, and can not accurately judge.

  Meanwhile, uiEx Ajax form submission provides a global event handlers `formSubmitSuccess`, Ajax form submission can monitor the success of the event, registered global handler.

 ```JS
 /*
  * EasyUIEx.submitAjax and EasyUIEx.submitURLAjax form using form submission succes successful global event registered a system must perform the function
   * Global ajaxSuccess function similar to jQuery
  * @param data Data form submitted to the successful return of Ajax data
  *
  */
 uiEx.formSubmitSuccess=function(data){
 	//...
 }
 ```

- API

 ```javascript
 /**
  * Clear form
  * 
  * @param selector  
  * @return form
  */
 uiEx.clearForm(selector);
 
 /**
  * Reset form
  * 
  * @param selector
  * @return form
  */
 uiEx.resetForm(selector);
 
 /**
  * Enable validate
  * 
  * @param selector 
  * @return form
  */
 uiEx.enableValidate(selector);
 
 /**
  * Disable validate
  * 
  * @param selector 
  * @return form
  */
 uiEx.disableValidate(selector);
 
 /**
  * To validate form
  * 
  * @param selector 
  * @return form
  */
 uiEx.validate(selector);
 
 /**
  * Instead of the form ("load", data); for form filling data
  * You can specify the form name prefix, will fill the data to the specified prefix attribute to
  * As the name attribute value data in the fill to user.name
  * 
  * @param selector 
  * @param data form data
  * @param prefix form element name suffix
  * @return form
  */
 uiEx.loadForm(selector, data, prefix);
 
 /**
  * Common form submit
  * 
  * @param formSelector 
  * @param params  Optional; additional submission form parameter form
  * @param noValidate Optional; Verify; boolean; default is true
  */
 uiEx.submitForm(formSelector, params, noValidate);
 
 /**
  * Band with Ajax form validation form submission, internal encapsulates a `xRequestedWith = XMLHttpRequest` parameters;
  * Will be submitted along with the form to the server, help developers to determine whether the server through Ajax request parameter `` xRequestedWith.
  * 
  * @param formSelector 
  * @param callback 
  * @param params Optional; additional submission form parameter form
  * @param noValidate Optional; Verify; boolean; default is true
  */
 uiEx.submitAjax(formSelector, callback, params, noValidate);
  
 /**
 * Band with Ajax form validation form submission, internal encapsulates a `xRequestedWith = XMLHttpRequest` parameters;
 * Will be submitted along with the form to the server, help developers to determine whether the server through Ajax request parameter `` xRequestedWith.
 * 
 * @param formSelector 
 * @param url 
 * @param callback 
 * @param params Optional; additional submission form parameter form
 * @param noValidate Optional; Verify; boolean; default is true
 */
 uiEx.submitURLAjax(formSelector, url, callback, params, noValidate) 
 
 /**
  * Will form form information formatted as JSON return
  * 
  * @parama formSelector 
  */
 uiEx.serializeJSON(formSelector);
 ```


### 3.5. tabs API

- Two ways to call

- The difference between the two dynamic EasyUI Tabs dynamic loading between:
   - Use content (iframe frame) into the page:
     - `Content: '<iframe scrolling =" auto "frameborder =" 0 "src ="' + url + '"style =" width: 100%; height: 100%; "> </ iframe>';`
     - Exist as a separate window, the page content independent, non-interfering with the current page
	 - The need to introduce independent JS and CSS resources needed
     - Pop-up content is within the window
     - Use href methods:
   - `Href: url,`
     - Content loaded clip, the content and the introduction of combined current page
     - Need to introduce JS and CSS resource page has introduced
     - A reference to the page can not have a body, otherwise the loaded content inside of JS file execution grammar
     - Html rendering prompt resolution displays
 - Context menu HTML snippet:
 
    ```HTML
    <%-- ##################Tab Tab context menu can not be deleted################## --%>
    <div id="tabsMenu" class="easyui-menu" style="width:120px;">
    	   <div name="close"   data-options="iconCls:'icon-close'">close</div>  
    	   <div name="other"   data-options="">close others</div>  
    	   <div name="all"  data-options="">close all</div>
    	   <div class="menu-sep"></div>
           <div name="closeRight">close right</div>
           <div name="closeLeft">close left</div>
           <div class="menu-sep"></div>
          <div name="refresh"  data-options="iconCls:'icon-reload'">refresh</div> 
    </div>
    ```
    
  - API
  
      ```javascript
      /**
       * Add a tab for a specified Tab, supports double-click to close
       * 
       * @parma tabSelector 
       * @parma title
       * @parma url 
       * @parma icon Optional; icon
       * @parma isIframe Optional; boolean value; whether to use iframe incorporated, true way to use iframe introduced href default mode
       * 
       * 
       */
      uiEx.openTab(tabSelector, title, url, icon, isIframe);
      
      /**
       * Refresh the current tab selected Panel
       * 
       * @param tabSelector 
       */
      uiEx.reloadSelTab(tabSelector);
      
      /**
       * Text automatically at specified according to the menu to open a menu Tab
       * 
       * @param menuSelector
       *            
       * @param tabSeelctor
       *            
       * @param menuText
       *            To open the menu text, you can use an array to define a plurality of menu text
       */
      uiEx.openMenuByText(menuSelector, tabSeelctor, menuText);
      
      /**
       * Id according to the menu automatically at specified Tab to open a menu
       * 
       * @param menuSelector
       *            
       * @param tabSeelctor
       *            
       * @param menuId
       *            To open the menu id, you can use an array to define multiple menu id
       */
      uiEx.openMenuById(menuSelector, tabSelctor, menuId);
      
      /**
       * Binding tabs of the right-click menu, to achieve: close, close other, close all; Close the left tab close tabs to the right; refreshing the menu function
       * 
       * @param tabSelector 
       * @param menuSelector menu selector; Optional, the default of the #tabsMenu
       * 
       * You must be defined in the page context menu label (menu id, name of the menu item can not be changed):
      <%-- ##################Tab Tab context menu can not be deleted################## --%>
    <div id="tabsMenu" class="easyui-menu" style="width:120px;">
    	   <div name="close"   data-options="iconCls:'icon-close'">close</div>  
    	   <div name="other"   data-options="">close others</div>  
    	   <div name="all"  data-options="">close all</div>
    	   <div class="menu-sep"></div>
           <div name="closeRight">close right</div>
           <div name="closeLeft">close left</div>
           <div class="menu-sep"></div>
          <div name="refresh"  data-options="iconCls:'icon-reload'">refresh</div> 
    </div>
       */
      uiEx.addTabsContextMenu(tabSelector, menuSelector)
      ```

#### 6. datagrid、edatagrid、detaildatagrid API

- Two ways to call

- **Package and extended**: EasyUIEx related components for the use of datagrid depth CRUD application package, provides additional functionality, when you call the  Initialization method, with the incoming `url`,` saveUrl`, `updateUrl`,` destroyUrl` address and other CRUD server operating parameters (and edatagrid the parameters remain the same), can be in a consistent manner by means of API EasyUIEx complete CRUD operations.

- **Performance Optimization**: the datagrid and edatagrid provides line editing condition monitoring, optimization request to modify. When line editing, column editing, does not submit a request unmodified content.

- **rowData returns the parameter**: 

	When adding or modifying data, you can return a `rowData` attribute in the` JSON` response, and EasyUIEx automatically refreshes the static data for the page that was added or edited based on the contents of `rowData`.
	
	For example, when adding data, if the current data primary key is submitted to the server side after the generation (such as the data key by the automatic growth generator control), add data, in the return of `JSON` set a **rowData** Property, which returns the most recent data that contains the `primary key id attribute` (other properties are optionally optional if no refresh is required) to automatically refresh the newly added front row. **Otherwise, after the new data, delete the data, you have previously added data in the client does not have the primary key, there will be a failure to delete tips.**

	```JSON
	{
		"msg":"Save  Successed!",
		"locationUrl":"",
		"callback":"",
		"statusCode":200,
		"rowData":{"deptno":10,"dname":"x","loc":"x"} // Returns the auto increment primary key to update the client data
	}
	```

- datagrid、edatagrid、detaildatagrid、treegrid Extended Attributes common

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| url  | string | Query url; get:`dg.datagrid("options").url` | false |
| saveUrl  | string | Save url；get：`dg.datagrid("options").saveUrl` | false |
| updateUrl  | string | Update url；get：`dg.datagrid("options").updateUrl` | false |
| destroyUrl  | string | Destory url；get：`dg.datagrid("options").destroyUrl` | false |
| showHeaderContextMenu  | boolean | Whether the meter display the context menu, choose to display a column  | false |
| showContextMenu  | boolean | Whether to display the context menu, with menuSelector property use  | false |
| menuSelector  | string | Menu Selector  | &nbsp; |
| successKey  | string | Success mark key returned by the server, for example: "statusCode"  | &nbsp; |
| successValue  | string | The server returned successfully labeled value, for example: "200" | &nbsp; |
| mutipleDelete  | boolean | Whether to open a multi-line submission delete  | false |
| mutipleDeleteProperty  | string/Array | Multi-line reference to the property and the value of the server will not delete sendRowDataPrefix prefix added, supports the use of an array to specify multiple attribute names  | &nbsp; |


- datagrid、edatagrid Extended Attributes common

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| sendRowDataPrefix  | boolean | Add, delete, update data, support setting submitting row data prefix `sendRowDataPrefix:". SysUser "`, before the data parameter names such submission will increase the specified prefix, handy when using the Struts framework such as submitting data to sysUser object reception  | &nbsp; |


- datagrid

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| clickRowEdit  | boolean | When you click to achieve line editing in DataGrid, you can replace edatagrid achieve with line editing datagrid | false |
| clickCellEdit  | boolean | Click column editing function is turned on  | false |

- edatagrid Extended Attributes
**Use `easy.jquery.edatagrid.js` instead of ` jquery.edatagrid.js`, easyUIEx of edatagrid performance and logic optimization, and provide additional functionality**。

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| clickEdit  | boolean | Whether to open, click Edit (edatagrid default double-click to open editor)  | false |
| showMsg  | boolean | Whether to add, modify alert message  | false |

- Demo

 ```javascript
 // datagrid  Initialization
var dg = $("#sysUserDataGrid");
dg.initDatagrid({
	iconCls : 'icon-group',
	/*
	 * DataGrid editing: saveUrl, updateUrl, destroyUrl with uiEx use
	 */
	url : "sysUser_list.action",
	saveUrl : "sysUser_save.action",
	updateUrl : "sysUser_update.action",
	destroyUrl : "sysUser_delete.action",
	showHeaderContextMenu:true, // Header add context menu, choose to display a column
	// clickRowEdit:true, //Register Click-line editing, you can replace with line editing edatagrid implement CRUD
	pageSize : 10,
	pageList : [ 5, 10, 15, 20 ],
	checkbox : true,
	singleSelect : false,
	checkOnSelect : true,
	// Double-click operation
	onDblClickRow : function(rowIndex, rowData) {
		toEdit(rowData);
	},
	menuSelector:"#sysUserContextMenu",
	showContextMenu:true,
	sendRowDataPrefix:"sysUser.",
	mutipleDelete: true, // Submit delete multiple rows
	mutipleDeleteProperty:"userId" // Multi-line reference to the property and the value of the server will not delete sendRowDataPrefix prefix added, supports the use of an array to specify multiple attribute names
});
```

 ```javascript
 // edatagrid  Initialization
 $("#deptDataGrid").initEdatagrid({
     /*
      * DataGrid editing: saveUrl, updateUrl, destroyUrl with uiEx use
      */
     url : "dept_list.action",
     saveUrl : "dept_save.action",
     updateUrl : "dept_update.action",
     destroyUrl : "dept_delete.action",
     idField : "deptno",
     showHeaderContextMenu : true, // Header add context menu, choose to display a column
     pagination : true,
     checkbox : true,
     checkOnSelect : true,
     singleSelect : false,
     autoSave : true,
     //queryParam:{"rows":dg.datagrid("options").pageSize},
     clickEdit : true, // Click Edit
     showMsg : true, // Show operation msg
     //右键菜单
     menuSelector : "#deptContextMenu",
     showContextMenu : true,
     sendRowDataPrefix : "dept.", //submit data suffix
     successKey : "statusCode", //Success marks the return key on the server side
     successValue : "200" //Success marks the return value on the server side
 });
 ```

 ```JS
// detaildatagrid  Initialization
uiEx.initDetailDatagrid("#userDataGrid2","do/toDetailEdit.jsp",{
	/*
	* DataGrid editing: saveUrl, updateUrl, destroyUrl with uiEx use
	*/
	url : "do/doList.jsp", //Datagrid query
	saveUrl : "do/doMyUsers.jsp?t=add", //Save
	updateUrl : "do/doMyUsers.jsp?t=edit&id={id}", //Update
	destroyUrl : "do/doMyUsers.jsp?t=delete", //Delete
	iconCls : "icon-group",
	showHeaderContextMenu : true, // Header add context menu, choose to display a column
	pageSize : 5,
	pageList : [ 5, 10, 15, 20 ]
});
```

 ```JS
// treegrid  Initialization
$("#sysMenuPermissionDataGrid").initTreegrid({
	url : 'sysMenuPermission_list.action',
	rownumbers : true,
	idField : "id",
	treeField : 'text',
	lines : true,
	// Double-click operation
	onDblClickRow : function(rowData) {
		toEdit(rowData);
	},
	// Header add context menu, choose to display a column
	showHeaderContextMenu : true,
	menuSelector : "#sysMenuPermissionContextMenu",
	showContextMenu : true
});
 ```

- API

 - grid  Initialization API
 
   ```javascript
 /**
  * DataGrid: datagrid Initialization, It contains the default parameters uiEx.dataGridDefaults
  * 
  * @param datagridSelector 
  * @param params Optional; datagrid Initialization parameters
  */
 uiEx.initDatagrid(datagridSelector, params);
 
 /**
  * EditDataGrid: edatagrid Initialization, It contains the default parameters uiEx.dataGridDefaults
  * 
  * @param datagridSelector 
  * @param params Optional; datagrid Initialization parameters
  */
 uiEx.initEdatagrid(datagridSelector, params);
 
 /**
  * DetailDataGrid: DetailDataGrid Initialization, It contains the default parameters uiEx.detailDataGridDefaults
  * 
  * @param datagridSelector 
  * @param detailUrl Load detailed view url
  * @param params Optional; other parameters, including data CRUD the url address
  */
 uiEx.initDetailDatagrid(datagridSelector, detailUrl, params);

 /**
  * Treegird: Treegird Initialization
  * 
  * @param treegridSelector
  *           
  * @param params
  *            Optional; treegrid other parameters
  */
 uiEx.initTreegrid(treegridSelector, params); 
 ```

 - datagrid CRUD API

   ```javascript
 /*
 * ############## DataGrid CRUD
 */
 /**
  *  datagrid: To add a new row to row to edit DataGrid
  * 
  * @param datagridSelector 
  * @param rowParam Optional; data parameters of the new data row
  */
 uiEx.rowAdd(datagridSelector, rowParam);
 
 /**
  * datagrid: DataGrid for the specified line editing is enabled, it will cause a new load
  * 
  * @param datagridSelector  
  */
 uiEx.rowEdit(datagridSelector);
 
 /**
  * Cancel edit the selected row
  * 
  * @param datagridSelector
  *           
  */
 uiEx.rowCancelEdit(datagridSelector)；
 
 /**
  * datagird, edatagrid, detaildatagrid, treegrid: delete the selected row, supports multi-row delete parameters mutipleDelete
  * 
  * @param datagridSelector
  *            
  * @param showMsg
  *            Optional; boolean value, whether a message is displayed, it will override the default parameter values global uiEx.showRowDeleteMsg
  * @param reloadDataGrid
  *           Optional; if reload reload DataGrid, default is false
  * @param successKey
  *            可Selected; the string value, perform a successful return to the mark key, value must be the same as before representatives successValue deleted successfully
  * @param successValue
  *            Optional; String value, execution marks the successful return value
  * @param callback
  *            Optional; After the successful implementation of the callback function, the server-side parameters for the return of data
  *  - demo：
  *  dg.rowDelete(true, false, "statusCode", "200");
  */
 uiEx.rowDelete(datagridSelector,  showMsg, reloadDataGrid, successKey, successValue)；
 ```

 - DetailDataGrid API

   ```JS 
  /**
   * DetailDataGrid: DetailDataGrid add the line
   * 
   * @param datagridSelector 
   */
  uiEx.detailRowAdd(datagridSelector);
  
  /**
   * DetailDataGrid: DetailDataGrid edit save
   * 
   * @param datagridSelector
   * @param index Edit line index, when loading detailed data, index value will be submitted to the server directly from the server to get the request parameters passed to the function
   *            For example, JSP : uiEx.detailRowSave('#userDataGrid',${param.index})
   * @param showMsg Optional; whether to display a message
   */
  uiEx.detailRowSave(datagridSelector, index, showMsg);
  
  /**
   * DetailDataGrid: DetailDataGrid cancel edit or add
   * 
   * @param datagridSelector
   * @param index Edit line index, when loading detailed data, index value will be submitted to the server directly from the server to get the request parameters passed to the function
   *            For example, JSP : uiEx.detailRowCancel('#userDataGrid',${param.index})
   */
  uiEx.detailRowCancel(datagridSelector, index);
  ```

 - Edatagrid API

   ```JS
	/**
	 * edatagrid, start editing, direct Click Edit, do not need to double-click to open the Edit
	 * 
	 * @param datagridSelector
	 *            
	 */
	uiEx.beginEditGrid(datagridSelector);

	/**
	 * edatagrid, finish editing into editable Unlike disableEditing editing disabled, you can not edit editing disabled
	 * 
	 * @param datagridSelector
	 *            
	 */
	uiEx.endEditGrid(datagridSelector);
```


### 3.7. treegrid API

- Two ways to call

- Supports tree rendering using the `parentId` attribute
> EasyUI The default tree constructs use the `children array`. EasyUIEx allows the `parentId attribute` to be used to represent and render tree components.

- Extended Attributes

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| showHeaderContextMenu  | boolean | Whether the meter display the context menu, choose to display a column  | false |
| showContextMenu  | boolean | Whether to display the context menu, with menuSelector property use  | false |
| menuSelector  | string | Menu Selector  | &nbsp; |

- Demo

 ```JS
$("#sysMenuPermissionDataGrid").initTreegrid({
	url : 'sysMenuPermission_list.action',
	rownumbers : true,
	idField : "id",
	treeField : 'text',
	lines : true,
	// Double-click operation
	onDblClickRow : function(rowData) {
		toEdit(rowData);
	},
	// Header add context menu, choose to display a column
	showHeaderContextMenu : true,
	menuSelector : "#sysMenuPermissionContextMenu",
	showContextMenu : true
});
```

 ```HTML
<!-- Collapse and expand the current directory -->
<div id="sysMenuRightContextMenu" class="easyui-menu" style="width:120px;">
	<div onclick="uiEx.collapse('#sysMenuRightDataGrid')">Collapse</div>
	<div onclick="uiEx.expand('#sysMenuRightDataGrid')">Expand</div>
</div>
```

- API

  ```JS
  /**
  * Treegird: Treegird Initialization
  * 
  * @param treegridSelector
  *            
  * @param params
  *            Optional; treegrid other parameters
  */
  uiEx.initTreegrid(treegridSelector, params)

  /**
  * Treegird: Use parentId attribute rendering Treegird Initialization
  * 
  * @param treegridSelector
  *            
  * @param params
  *            Optional; treegrid other parameters
  */
  uiEx.initParentIdTreegrid(treegridSelector, params)
  
  /**
  * Collapse the select folder
  * @param treeGridSelector  
  * 
  */
  uiEx.collapse(treeGridSelector);
  
  /**
  * Expand the select folder
  * @param treeGridSelector  
  * 
  */
  uiEx.expand(treeGridSelector);
  ```

#### 3.8. tree API

- Two ways to call

- Supports tree rendering using the `parentId` attribute

- Support Tabs binding

- Extended Attributes

 | Name | Type | Description | Default |
| ----------- | ------------ | ----------- | ----------- |
| expandChilds  | boolean | Click to expand menu parent child node function  | false |

- Demo

  ```javascript
//Common tree menu Initialization
uiEx.initTree(
	"#menu",  //Tree menu selector
	"#tabs",  //Open the menu tree url of tabSelector
       //Other tree parameters
	{
		expandChilds: true, //Click the parent menu, expand the submenu
		data: EasySSH.menuTreeJson
       //url : "json/menuTree.json.js", 
	}
);
```

  ```javascript
  //Text automatically opens the specified menu
  uiEx.openMenuByText("#menu","#tabs","CRUD");
  ```

- API

  ```javascript
  /*
  * ############## Tree 
  */
  /**
   * Tree: tree Initialization, contains two default functionality:
   * 1. Click on the menu to open the parent node child node function
   * 2. Click on the menu open in tabSelector specified tab
   * 3. tab, double-click to close
   * 
   * @param treeSelector
   * @param tabSelector  Open the menu tree url of tab selector
   * @param params Optional; tree Initialization parameters
   */
  uiEx.initTree(treeSelector, tabSelector, params);
  
    /**
   * Tree: Use parentId attribute rendering tree Initialization, contains two default functionality:
   * 1. Click on the menu to open the parent node child node function
   * 2. Click on the menu open in tabSelector specified tab
   * 3. tab, double-click to close
   * 
   * @param treeSelector
   * @param tabSelector  Open the menu tree url of tab selector
   * @param params Optional; tree Initialization parameters
   */
  uiEx.initParentIdTree(treeSelector, tabSelector, params);
  
  /**
   * onSelect event processing: achieving Tree of onSelect event, to achieve click menu to open the parent node when the child node function tree Initialization incoming event by registering onSelect
   * onSelect : uiEx.expandChilds, //Click to open the sub-menu parent node functionality
   * 
   * By initTree of expandChilds property can achieve the same effect:
   * expandChilds: true; 
   * 
   * @param node
   *            Click on the node object passed when the event call
   */
  uiEx.expandChilds(node);
  ```

- Binding tabs associated API

  ```javascript
  /*
  * ############## Tree Menu open to tab
  */
  /**
   * Text automatically at specified according to the menu to open a menu Tab
   * 
   * @param menuSelector menu selector
   * @param tabSeelctor tab selector
   * @param menuText  To open the menu text, you can use an array to define a plurality of menu text
   */
  uiEx.openMenuByText(menuSelector, tabSelector, menuText);
  
  /**
   * Id according to the menu automatically at specified Tab to open a menu
   * 
   * @param menuSelector menu selector
   * @param tabSeelctor tab selector
   * @param menuId To open the menu id, you can use an array to define multiple menu id
   */
  uiEx.openMenuById(menuSelector, tabSelctor, menuId);
  ```


### 3.9. Checkbox tree API

- Two ways to call

- Supports tree rendering using the `parentId` attribute

- Extended Attributes

 | Name |	Type |	Description |	Default |
| ----------- | ------------ | ----------- | ----------- |
|showTitle |	string |	Mouse serving individual title prompts, you can specify the attributes displayed |	 &nbsp; |
|noChildCascadeCheck |	boolean |	Cascade Select parent, but the parent does not cascade selected select child nodes. And cascadeCheck: true will cause the parent node is selected automatically select all child nodes. | 	false |

- Demo
 
 ```JS
 /*
 * Checkbox tree Initialization
 */
 $("#rightsTree").initTreeChk(
        //Loading parameters tree
        {
            url:"do/menuJson.jsp"  //Get Tree JSON data
        },
        [11] //The default value of the array is selected
 );
 ```

 ```JS
 /*
 *  Initialization Rights check box
 */
 uiEx.initTreeChk("#sysRoleEditRights", {
    url : "sysMenuRight_listAll.action",
    checkbox:true,
    animate:true,
    lines:true,
    noChildCascadeCheck: true, //Cascade Select parent, but the parent does not cascade selected select child nodes
    showTitle:"remark" //The remark attribute as a title display
 }, data.list);
 ```

 ```JS
 /*
 * Reset
 */
 rights.resetTree=function(){
    uiEx.treeChkRest("#rightsTree");
 }
 ```

 ```JS
 /*
 * Submit
 */
 rights.submit=function(){
    $("#rightsForm").submitAjax(function(data){
            console.info("Submitted successfully");
        },
        //With rightsForm form is submitted to the server with the selected parameters --Checkbox tree node id list (# separated)
        {
            ids:uiEx.getCheckedIds("#rightsTree").join("#")
        }
    );
 }
 ```

 ```JS
 /*
 * Property values specified node attributeArray get Checkbox tree selected, returns an array of values to obtain a list of
 */
 uiEx.getCheckedInfos("#sysRoleAddRights",["id","type"])
 ```

- API

 ```JS
 /*
 * ############## Checkbox Tree
 */
 /**
 * Checkbox tree Initialization
 * 
 * @param treeSelector tree selector or dom
 * @param param tree loading parameters 
 * @param values The default value of the array is selected
 */
 uiEx.initTreeChk(treeSelector, param, values);
 
  /**
 * Use parentId attribute renderingCheckbox tree Initialization
 * 
 * @param treeSelector tree selector or dom
 * @param param tree loading parameters 
 * @param values The default value of the array is selected
 */
 uiEx.initParentIdTreeChk(treeSelector, param, values);
 
 /**
 * Tree with check boxes reset, with uiEx.treeChk use
 * 
 * @param treeSelector tree selector or dom
 */
 uiEx.treeChkRest(treeSelector);
 
 /**
 * Set the selected tree box, Note: This method must be rendered in the tree after the call
 * 
 * @param treeSelector tree selector or dom
 * @param values The selected tree node ID array
 */
 uiEx.treeChkSetValues = function(treeSelector, values); 
 
 /**
 * Id get an array of nodes with Checkbox tree selected
 * 
 * @param treeSelector  tree selector or dom
 * @return Id array with Checkbox tree node selected
 */
 uiEx.getCheckedIds(treeSelector);
 
 /**
 * Property values specified node attributeArray get Checkbox tree selected, returns an array of values to obtain a list of
 * 
 * @param treeSelector tree selector or dom
 * @param propertyArray Array tree property
 * @return Get an array of value list
 */
 uiEx.getCheckedInfos(treeSelector, propertyArray);
 ```

### 3.10. Custom validator
- Because authentication scenario and rules vary, according to the need to expand `easy.easyuiex-validate.js`, register the custom validator.

- Demo：
  ```HTML
  <input id="renewpwd" name="renewpwd" class="easyui-textbox" 
  type="password"  
  data-options="required:true,validType:['minLength [6]','equals[\'#newpwd\',\'Is inconsistent with the new password.\']']"> </input>
  ```
- API
  ```javascript
  $(function() {
  	/*
  	 * ################# Custom Validator
  	 */
  
  	/**
  	 * Comparing equals whit other input
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
  	 * Comparing equals whit other input
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


### 3.11. Other API

```javascript
/**
 * The control variable uiEx of transfer to first realize that its library
 * @return Object reference uiEx
 */
uiEx.noConflict();

/*
 * The parentId type tree generates a transform function that is called in the loadFilter function of the tree component
 */
loadFilter:function(rows){
	uiEx.convert(rows);
}
```


##  4. EasyUIEx Demo：

[EasyUIEx demo online](http://www.easyproject.cn/easyUIExDemo 'EasyUIEx demo')

[EasyEE](http://www.easyproject.cn/easyee 'EasyEE')



## END
### [The official home page](http://www.easyproject.cn/easyuiex/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easyuiex/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.


### [官方主页](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easyuiex/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。




Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")





We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")
