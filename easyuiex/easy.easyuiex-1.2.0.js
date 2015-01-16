/**
 * EasyUIEx 1.2.0
 * 
 * 
 * Copyright 2014 ray [ inthinkcolor@gmail.com ]
 * 
 * Dependencies: jQuery EasyUI
 * 
 */
(function() {
	var _uiEx = window.uiEx;
	
	/**
	 * 自定义命名空间，EasyUI扩展对象
	 */
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

	/*
	 * ################# 内容缓存部分
	 */
	// 保存所有行编辑DataGrid的最后一次编辑行的行索引
	var dgLastEditIndex = {};
	// 保存所有行编辑DataGrid的最后一次编辑行的类型：add或edit
	var dgLastEditType = {};
	// 保存所有DataGrid的Header菜单
	var dgHeaderMenu = {};
	// 保存所有带复选框树加载的数据
	var treeChkData = {};

	/*
	 * ################# 窗口对话框部分
	 */
	/**
	 * 操作提示
	 * 
	 * @param msg
	 *            消息内容
	 * @param type
	 *            消息图标类型：error、info、question、warning
	 */
	uiEx.alert = function(msg, type) {
		$.messager.alert(this.alertTitle, msg, type);
	}

	/**
	 * 确认提示
	 * 
	 * @param msg
	 *            消息内容
	 * @param type
	 *            消息图标类型：error、info、question、warning
	 */
	uiEx.confirm = function(msg, callback) {
		$.messager.confirm(this.confirmTitle, msg, callback);
	}
	/**
	 * 输入提示
	 * 
	 * @param msg
	 *            消息内容
	 * @param type
	 *            消息图标类型：error、info、question、warning
	 */
	uiEx.prompt = function(msg, callback) {
		$.messager.prompt(this.promptTitle, msg, callback);
	}
	/**
	 * 消息提示
	 * 
	 * @param msg
	 *            消息内容
	 * @param position
	 *            消息位置：topLeft, topCenter, topRight, centerLeft, center,
	 *            centerRight, bottomLeft, bottomCenter, bottomRight;
	 *            默认为：bottomRight（右下角）
	 * @param params msg消息框参数
	 */
	uiEx.msg = function(msg, position, params) {
		var style; // bottomright or others
		if (position) {
			position = position.toLowerCase();
			if (position == "topleft") {
				style = {
					right : '',
					left : 0,
					top : document.body.scrollTop
							+ document.documentElement.scrollTop,
					bottom : ''
				};
			} else if (position == "topcenter") {
				style = {
					right : '',
					top : document.body.scrollTop
							+ document.documentElement.scrollTop,
					bottom : ''
				};
			} else if (position == "topright") {
				style = {
					left : '',
					right : 0,
					top : document.body.scrollTop
							+ document.documentElement.scrollTop,
					bottom : ''
				};
			} else if (position == "centerleft") {
				style = {
					left : 0,
					right : '',
					bottom : ''
				}
			} else if (position == "center") {
				style = {
					right : '',
					bottom : ''
				}
			} else if (position == "centerright") {
				style = {
					left : '',
					right : 0,
					bottom : ''
				}
			} else if (position == "bottomleft") {
				style = {
					left : 0,
					right : '',
					top : '',
					bottom : -document.body.scrollTop
							- document.documentElement.scrollTop
				}
			} else if (position == "bottomcenter") {
				style = {
					right : '',
					top : '',
					bottom : -document.body.scrollTop
							- document.documentElement.scrollTop
				}
			}
		}
		
		var p={};
		
		if(!params){
			params={};
		}
		
		params.style=style;
		params.msg=msg;
		params.title=this.msgTitle,
		$.extend(p,uiEx.msgDefaults,params);
		$.messager.show(p);
	}

	/**
	 * 显示指定对话框
	 * 
	 * @param dialogSelector
	 *            dialog选择器
	 * @param title
	 *            对话框标题
	 * @return dialog对象
	 */
	uiEx.openDialog = function(dialogSelector, title) {
		if (!title) {
			title = $(dialogSelector).panel('options').title;
		}
		return $(dialogSelector).dialog({
			closed : false,
			title : title
		});
	}

	/**
	 * 关闭指定对话框
	 * 
	 * @param dialogSelector
	 *            dialog选择器
	 * @return dialog对象
	 */
	uiEx.closeDialog = function(dialogSelector) {
		return $(dialogSelector).dialog({
			closed : true
		});
	}

	/*
	 * ################# 表单处理部分
	 */
	/**
	 * 清除指定id的form表单信息
	 * 
	 * @param selector
	 *            表单选择器
	 * @return form对象
	 */
	uiEx.clearForm = function(selector) {
		return this.disableValidate(selector).form('clear');
	}

	/**
	 * 开启表单验证
	 * 
	 * @param selector
	 *            表单选择器
	 * @return form对象
	 */
	uiEx.enableValidate = function(selector) {
		return $(selector).form('enableValidation');
	}
	/**
	 * 禁用表单验证
	 * 
	 * @param selector
	 *            表单选择器
	 * @return form对象
	 */
	uiEx.disableValidate = function(selector) {
		return $(selector).form('disableValidation');
	}

	/**
	 * 对表单进行验证
	 * 
	 * @param selector
	 *            表单选择器
	 * @return form对象
	 */
	uiEx.validate = function(selector) {
		return this.enableValidate(selector).form('validate');
	}
	/**
	 * 将form表单信息格式化为JSON返回
	 * 
	 * @parama formSelector form选择器
	 * @return form表单序列化后的JSON对象
	 */
	uiEx.serializeJSON = function(formSelector) {
		var o = {};
		var a = $(formSelector).serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});

		return o;
	};
	/**
	 * 普通表单提交
	 * 
	 * @param formSelector
	 *            表单选择器
	 * @param params
	 *            可选; form表单额外提交的参数
	 * @param noValidate
	 *            可选; 是否验证; boolean; 默认为true
	 */
	uiEx.submitForm = function(formSelector, params, noValidate) {
		// 动态添加参数
		var addDoms = [];
		if (params) {
			$.each(params, function(name, value) {
				var newDom = $('<input type="text" name="' + name + '" value="'
						+ value + '"/>');
				$(formSelector).append(newDom);
				addDoms.push(newDom);
			});
		}

		// false不验证表单，直接提交
		if (noValidate == false) {
			$(formSelector)[0].submit();
		} else {
			if (this.validate(formSelector)) {
				$(formSelector)[0].submit();
			}
		}
		// 移除动态添加的参数
		$.each(addDoms, function(i, dom) {
			$(dom).remove();
		})
	}
	/**
	 * 以Ajax进行带表单验证的表单提交
	 * 
	 * @param formSelector
	 *            表单选择器
	 * @param callback
	 *            AJAX请求后的回调处理函数
	 * @param params
	 *            可选; form表单额外提交的参数
	 * @param noValidate
	 *            可选; 是否验证; boolean; 默认为true
	 */
	uiEx.submitAjax = function(formSelector, callback, params, noValidate) {
		$(formSelector).form('submit', {
			onSubmit : function(param) {
				if (params) {
					$.extend(param, params);
				}
				if (noValidate == false) {
					return true;
				} else {
					return uiEx.validate(formSelector);
				}
			},
			success : callback
		});
	}

	/**
	 * 将表单以Ajax提交到指定url
	 * 
	 * @param formSelector
	 *            表单选择器
	 * @param url
	 *            提交到的URL地址
	 * @param callback
	 *            AJAX请求后的回调处理函数
	 * @param params
	 *            可选; form表单额外提交的参数
	 * @param noValidate
	 *            可选; 是否验证; boolean; 默认为true
	 */
	uiEx.submitURLAjax = function(formSelector, url, callback, params,
			noValidate) {
		$(formSelector).form('submit', {
			url : url,
			onSubmit : function() {
				if (params) {
					$.extend(param, params);
				}
				if (noValidate == false) {
					return true;
				} else {
					return uiEx.validate(formSelector);
				}
			},
			success : callback
		});
	}

	/*
	 * ################# Tab 选项卡部分
	 */
	/**
	 * 为指定Tab添加选项卡
	 * 
	 * @parma tabSelector 选项卡
	 * @parma title 标题
	 * @parma url 地址
	 * @parma icon 可选；图标
	 */
	uiEx.openTab = function(tabSelector, title, url, icon) {
		var tab = $(tabSelector);
		if (tab.tabs('exists', title)) {
			tab.tabs('select', title);
		} else {
			// var content = '<iframe scrolling="auto" frameborder="0"
			// src="http://127.0.0.1:8080/easyuiDemo/'
			// + url + '" style="width:100%;height:100%;"></iframe>';

			tab.tabs('add', {
				title : title,
				closable : true,
				// content : content,
				// href 不能有body，否则加载的内容内部的JS文件文法执行
				href : url,
				iconCls : icon

			// ,tools:[{
			// iconCls:'icon-mini-refresh',
			// handler:function(){
			// alert('refresh');
			// }
			// }]
			});
		}
	}
	/**
	 * 刷新当前选项卡选中的Panel
	 * 
	 * @param tabSelector
	 *            选项卡选择器
	 */
	uiEx.reloadSelTab = function(tabSelector) {
		$(tabSelector).tabs("getSelected").panel("refresh");
	}

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
	uiEx.openMenuByText = function(menuSelector, tabSeelctor, menuText) {
		var menu = $(menuSelector);

		var menuOpen = function(txt) {
			var node = menu.tree("getNode", $(".tree-node:contains('" + txt
					+ "')")[0]);
			if (node) {
				uiEx.openTab(tabSeelctor, node.text, node.url, node.iconCls);
				menu.tree('select', node.target);
			}
		}

		if ($.isArray(menuText)) {
			for (var i = 0; i < menuText.length; i++) {
				menuOpen(menuText[i]);
			}
		} else {
			menuOpen(menuText);
		}

	}
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
	uiEx.openMenuById = function(menuSelector, tabSelctor, menuId) {
		var menu = $(menuSelector);

		var menuOpen = function(id) {
			var node = menu.tree('find', id);
			if (node) {
				uiEx.openTab(tabSelctor, node.text, node.url, node.iconCls);
				menu.tree('select', node.target);
			}
		}

		if ($.isArray(menuId)) {
			for (var i = 0; i < menuId.length; i++) {
				menuOpen(menuId[i]);
			}
		} else {
			menuOpen(menuId);
		}
	}

	var contextMenuTab; // 当前显示右键菜单的Tab对象
	/**
	 * 绑定tabs的右键菜单，实现关闭，关闭其他，关闭所有，刷新功能
	 * 
	 * @param tabSelector
	 *            tab选择器
	 */
	uiEx.addTabsMenu = function(tabSelector) {
		// 添加右键菜单
		$(tabSelector)
				.tabs(
						{
							onContextMenu : function(e, title, index) {
								e.preventDefault();

								var tabMenu = $('#tabsMenu');
								// 当前右键的标签页
								contextMenuTab = $(this).tabs("getTab", index);
								// 当前选中的标签页
								// contextMenuTab=$(this).tabs("getSelected");

								if (contextMenuTab.panel("options").closable) {
									tabMenu
											.menu(
													'enableItem',
													tabMenu
															.find("[name=close],[name=all],[name=other]"));
								} else {
									tabMenu.menu('disableItem', tabMenu
											.find("[name=close]"));
								}
								tabMenu.menu('show', {
									left : e.pageX,
									top : e.pageY
								}).data("tabTitle", title);
							}
						});

		// 处理tabs右键菜单的单击事件
		$("#tabsMenu").menu({
			onClick : function(item) {

				// 当前Tab
				// var curTab=tabs.tabs("getSelected");
				var curTab = contextMenuTab;

				// 所有tabs
				var tabs = $(tabSelector);

				if (curTab) {
					// 要关闭的tabs
					var closeTabs = [];

					if (item.name == "close") {
						closeTabs.push(curTab);
					} else if (item.name == "all") {
						$.each(tabs.tabs("tabs"), function(i, tab) {
							closeTabs.push(tab);
						});
					} else if (item.name == "other") {
						$.each(tabs.tabs("tabs"), function(i, tab) {
							if (tab != curTab) {
								closeTabs.push(tab);
							}
						});
					} else if (item.name == "refresh") { // 刷新
						curTab.panel("refresh");
					}
					// 关闭需要关闭的选项卡
					for (var i = 0; i < closeTabs.length; i++) {
						var opt = closeTabs[i].panel("options");
						if (opt.closable) {
							tabs.tabs("close", opt.title);
						}
					}
				}

			}
		});
	}

	/*
	 * ################# DataGrid 数据表格部分
	 */

	/**
	 * 内部调用函数：为指定DataGrid创建列头右键菜单
	 * 
	 * @datagridSelector DataGrid选择器或对象
	 * @return 菜单Menu对象
	 */
	var createColumnMenu = function(datagridSelector) {
		var cmenu = $("<div/>").appendTo("body");
		cmenu.menu({
			onClick : function(item) {
				if (item.iconCls == "icon-ok") {
					$(datagridSelector).datagrid("hideColumn", item.name);
					cmenu.menu("setIcon", {
						target : item.target,
						iconCls : 'icon-empty'
					});
				} else {
					$(datagridSelector).datagrid("showColumn", item.name);
					cmenu.menu("setIcon", {
						target : item.target,
						iconCls : "icon-ok"
					});
				}
			}
		});
		var fields = $(datagridSelector).datagrid("getColumnFields");
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			var col = $(datagridSelector).datagrid("getColumnOption", field);
			cmenu.menu("appendItem", {
				text : col.title,
				name : field,
				iconCls : 'icon-ok'
			});
		}
		return cmenu;
	}
	/*
	 * ################# 数据网格初始化部分，包括datagrid，edatagrid，detaildatagrid
	 */
	/**
	 * DataGrid: datagrid初始化，包含了uiEx.dataGridDefaults默认参数
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 * @param params
	 *            可选；datagrid初始化参数
	 */
	uiEx.initDatagrid = function(datagridSelector, params) {
		var p = {};
		$.extend(p, uiEx.dataGridDefaults, params);
		$(datagridSelector).datagrid(p);
	};
	/**
	 * EditDataGrid: edatagrid初始化，包含了uiEx.dataGridDefaults默认参数
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 * @param params
	 *           可选；datagrid初始化参数
	 */
	uiEx.initEdatagrid = function(datagridSelector, params) {
		var p = {};
		$.extend(p, uiEx.dataGridDefaults, params);
		$(datagridSelector).edatagrid(p);
	};
	/**
	 * DetailDataGrid: DetailDataGrid初始化，包含了detailDataGridDefaults参数的默认值
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 * @param detailUrl
	 *            加载详细视图的url
	 * @param params
	 *            可选；其他参数，主要包括数据CRUD的url地址
	 */
	uiEx.initDetailDatagrid = function(datagridSelector, detailUrl, params) {
		var dg = $(datagridSelector);
		var p = {
			view : detailview,
			// 当展开一行时触发
			onExpandRow : function(index, row) {
				var ddv = $(this).datagrid("getRowDetail", index).find(
						"div.ddv");
				ddv.panel({
					border : false,
					cache : true,
					href : detailUrl + "?index=" + index,
					// 加载完url的内容后渲染视图
					onLoad : function() {
						dg.datagrid("fixDetailRowHeight", index);
						dg.datagrid("selectRow", index);
						dg.datagrid("getRowDetail", index).find("form").form(
								"load", row);
					}
				});
				// 固定明细行的高度
				$("#userDataGrid5").datagrid("fixDetailRowHeight", index);
			}
		};
		
		$.extend(p, uiEx.detailDataGridDefaults, params);
		dg.datagrid(p);
	};
	/*
	 * ################# 数据网格增删改操作
	 */
	/**
	 * DetailDataGrid: DetailDataGrid添加行
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 */
	uiEx.detailRowAdd = function(datagridSelector) {
		var dg = $(datagridSelector);
		dg.datagrid('appendRow', {
			isNewRecord : true
		});
		var index = dg.datagrid('getRows').length - 1;
		dg.datagrid('expandRow', index);
		dg.datagrid('selectRow', index);
	}
	
	/**
	 * DetailDataGrid: DetailDataGrid编辑保存
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 * @param index
	 *            编辑行索引，加载详细数据时，index值会提交到服务器，直接从服务器端请求参数获得传入该函数
	 *            例如，JSP写法：uiEx.detailRowSave('#userDataGrid',${param.index})
	 * @param showMsg
	 *            可选；是否显示提示信息
	 */
	uiEx.detailRowSave = function(datagridSelector, index, showMsg) {
		var dg = $(datagridSelector);
		var row = dg.datagrid('getRows')[index];
		var saveUrl = dg.datagrid("options").saveUrl;
		var updateUrl = dg.datagrid("options").updateUrl;

		var url = row.isNewRecord ? saveUrl : updateUrl;
		url = url.replace(uiEx.expReg, function($0, $1) {
			return row[$1];
		});

		var successMsg = uiEx.rowEditSuccessMsg;
		var failureMsg = uiEx.rowEditFailureMsg;
		if (row.isNewRecord) {
			if (showMsg == undefined) {
				showMsg = uiEx.showRowAddMsg;
			}
			successMsg = uiEx.rowAddSuccessMsg;
			failureMsg = uiEx.rowAddFailureMsg;
		} else{
			if (showMsg == undefined) {
				showMsg = uiEx.showRowEditMsg;
			}
		}

		dg.datagrid("getRowDetail", index).find("form").form(
				"submit",
				{
					url : url,
					onSubmit : function() {
						return $(this).form('validate');
					},
					success : function(data) {
						data = eval('(' + data + ')');
						data.isNewRecord = false;
						dg.datagrid("collapseRow", index);
						dg.datagrid("updateRow", {
							index : index,
							row : dg.datagrid("getRowDetail", index).find(
									"form").serializeJSON()
						});
						if (showMsg) {
							uiEx.msg(successMsg);
						}
					}
				});
	}
	
	/**
	 * DetailDataGrid: DetailDataGrid取消编辑或添加
	 * 
	 * @param datagridSelector
	 *            datagrid选择器
	 * @param index
	 *            编辑行索引，加载详细数据时，index值会提交到服务器，直接从服务器端请求参数获得传入该函数
	 *            例如，JSP写法：uiEx.detailRowCancel('#userDataGrid',${param.index})
	 */
	uiEx.detailRowCancel = function(datagridSelector, index) {
		var dg = $(datagridSelector);
		var row = dg.datagrid("getRows")[index];
		if (row.isNewRecord) {
			dg.datagrid("deleteRow", index);
		} else {
			dg.datagrid("collapseRow", index);
		}
	}
	
	
	

	// 行编辑DataGrid最后一行编辑提交
	/**
	 * 完成行编辑功能
	 * 
	 * @param datagridSelector
	 *            datagrid选择器或对象
	 * @param showMsg
	 *            是否显示提示信息
	 */
	var endEditing = function(datagridSelector, showMsg) {
		var dg = $(datagridSelector);
		var dgId = dg.attr("id");
		var lastEditIndex = dgLastEditIndex[dgId];
		if (lastEditIndex == undefined) {
			return true;
		}
		var type = dgLastEditType[dgId];
		if (dg.datagrid('validateRow', lastEditIndex)) {

			dg.datagrid("endEdit", lastEditIndex);

			// 执行更新请求
			var url = dg.datagrid("options").updateUrl;
			var success = uiEx.rowEditSuccessMsg;
			var failure = uiEx.rowEditFailureMsg;
			var method=dg.datagrid("options").method;

			if (type == "add") {
				if (showMsg == undefined) {
					showMsg = uiEx.showRowAddMsg;
				}
				url = dg.datagrid("options").saveUrl;
				success = uiEx.rowAddSuccessMsg;
				failure = uiEx.rowAddFailureMsg;
			} else if (type == "edit") {
				if (showMsg == undefined) {
					showMsg = uiEx.showRowEditMsg;
				}
			}

			$.ajax({
				url : url, // 请求的URL
				type : method, // 请求方式(POST、GET），默认GET
				// 发送到服务器端的数据，也可以{key1: 'value1', key2: 'value2'}
				data : dg.datagrid('getRows')[lastEditIndex],
				error : function() {
					if (showMsg) {
						uiEx.msg(failure);
					}
				},
				success : function(data) {
					if (showMsg) {
							uiEx.msg(success);
					}
				}
			});

			dgLastEditIndex[dgId] = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * datagrid：为行编辑DataGrid追加新行
	 * 
	 * @param datagridSelector
	 *            DataGrid选择器
	 * @param rowParam
	 *            可选；新数据行的数据参数
	 */
	uiEx.rowAdd = function(datagridSelector, rowParam) {
		if (rowParam == undefined) {
			rowParam = {};
		}
		var dg = $(datagridSelector);
		var dgId = dg.attr("id");
		if (endEditing(datagridSelector)) {
			dg.datagrid("appendRow", rowParam);
			var editIndex = dg.datagrid("getRows").length - 1;
			dg.datagrid("selectRow", editIndex)
					.datagrid("beginEdit", editIndex);
			dgLastEditIndex[dgId] = editIndex;
			dgLastEditType[dgId] = "add";
		}
	}
	/**
	 * datagrid：为指定DataGrid启用行编辑，会引起一次新加载
	 * 
	 * @param datagridSelector
	 *            datagrid选择器或对象
	 */
	uiEx.rowEdit = function(datagridSelector) {
		var dg = $(datagridSelector);
		var dgId = dg.attr("id");
		dg.datagrid({
			onClickRow : function(rowIndex, rowData) {
				var lastEditIndex = dgLastEditIndex[dgId];
				if (lastEditIndex != rowIndex) {
					if (endEditing(dgId)) {
						dg.datagrid('selectRow', rowIndex).datagrid(
								"beginEdit", rowIndex);
						dgLastEditIndex[dgId] = rowIndex;
						dgLastEditType[dgId] = "edit";
					} else {
						dg.datagrid("selectRow", rowIndex);
					}
				}
			}
		});
	}
	/**
	 * datagrid：onClickRow事件处理注册函数，能在DataGrid的onClickRow时实现行编辑
	 * 在数据网格初始化时通过注册onClickRow事件传入
	 * onClickRow : uiEx.onRowEdit,	//注册单击行编辑功能，可以代替edatagrid实现带行编辑的
	 * 
	 * @param rowIndex  单击的行索引
	 * @param rowData 可选；单击的行数据
	 */
	uiEx.onRowEdit = function(rowIndex, rowData) {
		var dg = $(this);
		var dgId = dg.attr("id");
		var lastEditIndex = dgLastEditIndex[dgId];
		if (lastEditIndex != rowIndex) {
			if (endEditing(dg)) {
				dg.datagrid('selectRow', rowIndex).datagrid("beginEdit",
						rowIndex);
				dgLastEditIndex[dgId] = rowIndex;
				dgLastEditType[dgId] = "edit";
			} else {
				dg.datagrid("selectRow", rowIndex);
			}
		}
	}
	

	/**
	 * 删除选中行
	 * 
	 * @param datagridSelector
	 *            DataGrid选择器
	 * @param reloadDataGrid
	 *            可选；是否reload重新加载 DataGrid，默认为false
	 * @param showMsg
	 *            可选；boolean值，是否显示提示消息，会覆盖默认的全局uiEx.showRowDeleteMsg参数值
	 */
	uiEx.rowDelete = function(datagridSelector, reloadDataGrid, showMsg) {
		var dg = $(datagridSelector);
		var dgId = dg.attr("id");
		var delRows = [];
		var selRows = dg.datagrid("getSelections");
		if (selRows.length == 0) {
			return;
		} else {
			$.each(selRows, function(i, row) {
				delRows.push(dg.datagrid("getRowIndex", row));
			});

		}

		delRows.sort(function(i, j) {
			return j - i;
		});

		if (showMsg == undefined) {
			showMsg = uiEx.showRowDeleteMsg;
		}
		uiEx.confirm(uiEx.deleteConfirmMsg, function(res) {
			if (res) {
				$.each(delRows, function(i, rowIndex) {
					var lastEditIndex = rowIndex;
					dg.datagrid("endEdit", lastEditIndex);
					// 执行删除请求
					var url = dg.datagrid("options").destroyUrl;
					
					var method=dg.datagrid("options").method;
					
					$.ajax({
						url : url, // 请求的URL
						type : method, // 请求方式(POST、GET），默认GET
						// 发送到服务器端的数据，也可以{key1: 'value1', key2: 'value2'}
						data : dg.datagrid('getRows')[lastEditIndex],
						error : function() {
							if (showMsg) {
								uiEx.msg(uiEx.rowDeleteFailureMsg);
							}
						},
						success : function(data) {
							if (showMsg) {
									uiEx.msg(uiEx.rowDeleteSuccessMsg);
							}
						}
					});
					
					dg.datagrid('cancelEdit', lastEditIndex).datagrid(
							'deleteRow', lastEditIndex);
					dgLastEditIndex[dgId] = undefined;
				});
				if (reloadDataGrid) {
					dg.datagrid('reload');
				}
			}
		});

	}

	/*
	 * 列编辑扩展
	 */
	$.extend($.fn.datagrid.methods, {
		editCell : function(jq, param) {
			return jq.each(function() {
				var fields = $(this).datagrid('getColumnFields', true).concat(
						$(this).datagrid('getColumnFields'));
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if (fields[i] != param.field) {
						col.editor = null;
					}
				}
				$(this).datagrid('beginEdit', param.index);
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}
			});
		}
	});

	/**
	 * 
	 *  datagrid：onClickCell事件处理注册函数，能在DataGrid的onClickCell时实现列编辑
	 * 在数据网格初始化时通过注册onClickCell事件传入
	 * onClickCell : uiEx.onCellEdit,	//单元格编辑
	 * 
	 * @param rowIndex
	 *            单击的行索引
	 * @param field
	 *            单击的列字段
	 * @param value
	 *            单击的列数据
	 */
	uiEx.onCellEdit = function(rowIndex, field, value) {
		var dg = $(this);
		var dgId = dg.attr("id");
		if (endEditing(dg)) {
			dg.datagrid('selectRow', rowIndex).datagrid('editCell', {
				index : rowIndex,
				field : field
			});
			dgLastEditIndex[dgId] = rowIndex;
			dgLastEditType[dgId] = "edit";
		}
	}
	
	
	/**
	 * onHeaderContextMenu事件处理：DataGrid的onHeaderContextMenu事件的实现，能设置列头右键菜单，可选择和隐藏列
	 * 在数据网格初始化时通过注册onHeaderContextMenu事件传入
	 * onHeaderContextMenu:uiEx.onHeaderMenu 	//表单添加右键菜单，可选择显示的列
	 * 
	 * @param e 事件对象
	 * @param field 列字段
	 */
	uiEx.onHeaderMenu = function(e, field) {
		e.preventDefault();
		var datagridSelector = this;
		var dgId = $(this).attr("id");

		var cmenu = dgHeaderMenu[dgId];
		if (cmenu == undefined) {
			cmenu = createColumnMenu(datagridSelector);
			dgHeaderMenu[dgId] = cmenu;
		}
		cmenu.menu("show", {
			left : e.pageX,
			top : e.pageY
		});
	}

	/**
	 * 为指定DataGrid设置列头右键菜单，可选择和隐藏列，会引起一次新的datagrid加载
	 * 
	 * @param datagridSelector
	 *            数据表格选择器
	 */
	uiEx.headerMenu = function(datagridSelector) {

		$(datagridSelector).datagrid({
			onHeaderContextMenu : function(e, field) {
				e.preventDefault();
				var dgId = $(this).attr("id");
				var cmenu = dgHeaderMenu[dgId];
				if (cmenu == undefined) {
					cmenu = createColumnMenu(this);
					dgHeaderMenu[dgId] = cmenu;
				}
				cmenu.menu("show", {
					left : e.pageX,
					top : e.pageY
				});
			}
		});
	}

	/*
	 * ################# tree树菜单增强部分
	 */
	/**
	 * 复选框树初始化
	 * 
	 * @param treeSelector
	 *            树选择器或对象
	 * @param param
	 *            树加载参数
	 * @param values
	 *            默认选中值数组
	 */
	uiEx.initTreeChk = function(treeSelector, param, values) {
		if (!param) {
			param = {};
		}
		var tree = $(treeSelector);
		var tid = tree.attr("id");
		// 缓存加载到的数据
		var loadSuccess = function(node, data) {
			treeChkData[tid] = data;
			uiEx.treeChkSetValues(treeSelector, values);
		}
		// 单击节点选中
		var click = function(node) {
			if (!node.checked) {
				tree.tree("check", node.target);
			} else {
				tree.tree("uncheck", node.target);
			}
		}
		if (param["onLoadSuccess"]) {
			var success = param["onLoadSuccess"];
			loadSuccess = function(node, data) {
				success(node, data);
				// 缓存加载到的数据
				treeChkData[tid] = data;
				uiEx.treeChkSetValues(treeSelector, values);
			}
		}
		if (param["onClick"]) {
			var c = param["onClick"];
			click = function(node, data) {
				c(node, data);
				tree.tree("check", node.target);
			}
		}
		param["onLoadSuccess"] = loadSuccess;
		param["onClick"] = click;
		tree.tree(param);
	}
	/**
	 * 带复选框的树重置，配合uiEx.treeChk使用
	 * 
	 * @param treeSelector
	 *            树选择器或对象
	 */
	uiEx.treeChkRest = function(treeSelector) {
		var tree = $(treeSelector);
		var tid = tree.attr("id");
		tree.tree("loadData", treeChkData[tid]);
	}

	/**
	 * 设置选中的树复选框，注意：此方法必须在树渲染完后调用
	 * 
	 * @param treeSelector
	 *            树选择器或对象
	 * @param values
	 *            选中的树节点ID数组
	 */
	uiEx.treeChkSetValues = function(treeSelector, values) {
		var tree = $(treeSelector);
		$.each(values, function(i, v) {
			var n = tree.tree('find', v);
			if (n) {
				tree.tree('check', n.target);
			}
		});
	}
	
	/**
	 * 获得带复选框树选中的节点id数组
	 * 
	 * @param treeSelector  树选择器或对象
	 * @return 带复选框树选中的节点id数组
	 */
	uiEx.getCheckedIds=function(treeSelector){
		var nodes=$(treeSelector).tree("getChecked",['checked','indeterminate']);
		var ids=$.map(nodes,function(n){
			return n.id;
		});
		
		return ids;
	}
	
	/**
	 * Tree: tree初始化，包含两大默认功能：
	 * 1. 点击菜单父节点打开子节点功能
	 * 2. 点击菜单在tabSelector指定的tab打开
	 * 
	 * @param treeSelector datagrid选择器
	 * @param tabSelector  打开树菜单url的tab选择器
	 * @param params 可选；tree初始化参数
	 */
	uiEx.initTree=function(treeSelector, tabSelector, params){
		var p={
			onClick : function(node) {
				if (node.url) {
					uiEx.openTab(tabSelector, node.text, node.url,node.iconCls);
				}
			},
			onSelect : uiEx.onSelectOpen
		}
		$.extend(p,params);
		$(treeSelector).tree(p);
	}
	
	/**
	 * onSelect事件处理：Tree的onSelect事件的实现，能实现点击菜单父节点打开子节点功能
	 * 在树初始化时通过注册onSelect事件传入
	 * onSelect : uiEx.onSelectOpen,     //点击菜单父节点打开子节点功能
	 * 
	 * @param node 事件调用时传入点击的节点对象
	 */
	uiEx.onSelectOpen=function(node) {
		$(this).tree('toggle', node.target);
	}
	
	/*
	 * ################# 其他函数
	 */
	
	/**
	 * 将变量uiEx的控制权让渡给第一个实现它的那个库
	 * @return uiEx对象的引用
	 */
	uiEx.noConflict = function() {
		if (window.uiEx === uiEx) {
			window.uiEx = _uiEx;
		}
		return uiEx;
	}

	/*
	 * jQuery对象插件注册
	 */

	jQuery.fn.extend({
		/**
		 * tabs:绑定tabs的右键菜单
		 */
		addTabsMenu : function() {
			return this.each(function(i, v) {
				uiEx.addTabsMenu(this);
			});
		},
		/**
		 * form:清除指定id的form表单信息
		 * 
		 * @return form对象
		 */
		clearForm : function() {
			var f;
			this.each(function(i, v) {
				f=uiEx.clearForm(this);
			});
			return f;
		},
		/**
		 * 显示指定对话框
		 * 
		 * @return dialog对象
		 */
		openDialog : function(title) {
			var dialog;
			this.each(function(i, v) {
				dialog=uiEx.openDialog(this, title);
			});
			return dialog;
		},
		/**
		 * form:关闭指定对话框
		 * 
		 * @return dialog对象
		 */
		closeDialog : function() {
			var dialog;
			this.each(function(i, v) {
				dialog=uiEx.closeDialog(this);
			});
			return dialog;
		},
		/**
		 * form:开启表单验证
		 * 
		 * @return form对象
		 */
		enableValidate : function() {
			var f;
			this.each(function(i, v) {
				f=uiEx.enableValidate(this);
			});
			return f;
		},
		/**
		 * form:禁用表单验证
		 * 
		 * @return form对象
		 */
		disableValidate : function() {
			var f;
			this.each(function(i, v) {
				f=uiEx.disableValidate(this);
			});
			return f;
		},
		/**
		 * datagrid:为指定DataGrid设置列头右键菜单，可选择和隐藏列，会引起一次新的datagrid加载
		 */
		headerMenu : function() {
			return this.each(function(i, v) {
				uiEx.headerMenu(this);
			});
		},
		/**
		 * menu:根据菜单Id自动在指定Tab打开某个菜单
		 * 
		 * @param tabSelctor
		 *            tab选择器或对象
		 * @param menuId
		 *            菜单Id
		 */
		openMenuById : function(tabSelctor, menuId) {
			return this.each(function(i, v) {
				uiEx.openMenuById(this, tabSelctor, menuId);
			});
		},
		/**
		 * menu:根据菜单Text文本自动在指定Tab打开某个菜单
		 * 
		 * @param tabSelctor
		 *            tab选择器或对象
		 * @param menuText
		 *            菜单Text文本
		 */
		openMenuByText : function(tabSelctor, menuText) {
			return this.each(function(i, v) {
				uiEx.openMenuByText(this, tabSelctor, menuText);
			});
		},
		/**
		 * tab:为指定Tab添加选项卡
		 * 
		 * @param title
		 *            标题
		 * @param url
		 *            打开的url
		 * @param icon
		 *            显示的图标
		 */
		openTab : function(title, url, icon) {
			return this.each(function(i, v) {
				uiEx.openTab(this, title, url, icon);
			});
		},
		/**
		 * DataGrid: datagrid初始化，包含了uiEx.dataGridDefaults参数的以下默认参数：
		 * rownumbers:true, fitColumns:true, singleSelect:true, pagination:true,
		 * method:"post"
		 * 
		 * @param params
		 *            datagrid初始化参数
		 */
		initDatagrid : function(params) {
			return this.each(function(i, v) {
				uiEx.initDatagrid(this, params);
			});
		},
		/**
		 * DataGrid: datagrid初始化，包含了uiEx.dataGridDefaults参数的以下默认参数：
		 * rownumbers:true, fitColumns:true, singleSelect:true, pagination:true,
		 * method:"post"
		 * 
		 * @param params
		 *            datagrid初始化参数
		 */
		initEdatagrid : function(params) {
			return this.each(function(i, v) {
				uiEx.initEdatagrid(this, params);
			});
		},
		/**
		 * DetailDataGrid: DetailDataGrid初始化，包含了detailDataGridDefaults参数的默认值
		 * 
		 * @param detailUrl
		 *            加载详细视图的url
		 * @param params
		 *            其他参数，主要包括数据CRUD的url地址
		 */
		initDetailDatagrid : function(detailUrl, params) {
			return this.each(function(i, v) {
				uiEx.initDetailDatagrid(this, detailUrl, params);
			});
		},
		/**
		 * tab:刷新当前选项卡选中的Panel
		 */
		reloadSelTab : function() {
			return this.each(function(i, v) {
				uiEx.reloadSelTab(this);
			});
		},
		/**
		 * datagird:为行编辑DataGrid追加新行
		 * 
		 * @param rowParam
		 *            可选;新行显示的数据参数
		 */
		rowAdd : function(rowParam) {
			return this.each(function(i, v) {
				uiEx.rowAdd(this, rowParam);
			});
		},
		/**
		 * datagird:删除选中行
		 * 
		 * @param showMsg
		 *            boolean值，可选;是否显示提示消息，会覆盖默认的全局uiEx.showRowDeleteMsg参数值
		 * @param reloadDataGrid
		 *            是否reload重新加载 DataGrid，默认为false
		 */
		rowDelete : function(showMsg, reloadDataGrid) {
			return this.each(function(i, v) {
				uiEx.rowDelete(this, showMsg, reloadDataGrid);
			});
		},
		/**
		 * datagird:为指定DataGrid启用行编辑，会引起一次新加载
		 */
		rowEdit : function() {
			return this.each(function(i, v) {
				uiEx.rowEdit(this);
			});
		},
		/**
		 * DetailDataGrid: DetailDataGrid添加行
		 */
		detailRowAdd : function() {
			return this.each(function(i, v) {
				uiEx.detailRowAdd(this);
			});
		},
		/**
		 * DetailDataGrid: DetailDataGrid取消编辑或添加
		 * 
		 * @param index
		 *            编辑行索引，一般从服务器端请求参数传入
		 */
		detailRowCancel : function(index) {
			return this.each(function(i, v) {
				uiEx.detailRowCancel(this, index);
			});
		},
		/**
		 * DetailDataGrid: DetailDataGrid取消编辑或添加
		 * 
		 * @param index
		 *            编辑行索引，一般从服务器端请求参数传入
		 */
		detailRowSave : function(index) {
			return this.each(function(i, v) {
				uiEx.detailRowSave(this, index);
			});
		},

		/**
		 * form:将form表单信息格式化为JSON返回
		 */
		serializeJSON : function() {
			var res = {};
			this.each(function(i, v) {
				res = uiEx.serializeJSON(this);
			});
			return res;
		},
		/**
		 * form:普通表单提交
		 * 
		 * @param params
		 *            可选; form表单额外提交的参数
		 * @param noValidate
		 *            可选; boolean, 是否验证; 默认为true
		 */
		submitForm : function(params, noValidate) {
			return this.each(function(i, v) {
				uiEx.submitForm(this, params, noValidate);
			});
		},
		/**
		 * form:以Ajax进行带表单验证的表单提交
		 * 
		 * @param callback
		 *            AJAX请求后的回调处理函数
		 * @param params
		 *            可选; form表单额外提交的参数
		 * @param noValidate
		 *            可选; 是否验证; boolean; 默认为true
		 */
		submitAjax : function(callback, params, noValidate) {
			return this.each(function(i, v) {
				uiEx.submitAjax(this, callback, params, noValidate);
			});
		},
		/**
		 * form:将表单以Ajax提交到指定url
		 * 
		 * @param url
		 *            提交到的URL地址
		 * @param callback
		 *            AJAX请求后的回调处理函数
		 * @param params
		 *            可选; form表单额外提交的参数
		 * @param noValidate
		 *            可选; 是否验证; boolean; 默认为true
		 */
		submitURLAjax : function(url, callback, params, noValidate) {
			return this.each(function(i, v) {
				uiEx.submitURLAjax(this, url, callback, params, noValidate);
			});
		},
		/**
		 * tree:复选框树初始化
		 * 
		 * @param param
		 *            树加载参数
		 * @param values
		 *            默认选中值
		 */
		initTreeChk : function(param, values) {
			return this.each(function(i, v) {
				uiEx.initTreeChk(this, param, values);
			});
		},
		/**
		 * Tree: tree初始化，包含两大默认功能： 
		 * 1. 点击菜单父节点打开子节点功能 
		 * 2. 点击菜单在tabSelector指定的tab打开 
		 * 
		 * @param tabSelector 打开树菜单url的tab选择器
		 * @param params 可选；tree初始化参数
		 */
		initTree : function(tabSelector, params) {
			return this.each(function(i, v) {
				uiEx.initTree(this, tabSelector, params)
			});
		},
		/**
		 * tree:带复选框的树重置，配合uiEx.treeChk使用
		 */
		treeChkRest : function() {
			return this.each(function(i, v) {
				uiEx.treeChkRest(this);
			});
		},
		/**
		 * tree:设置选中的树复选框，注意：此方法必须在树渲染完后调用
		 * 
		 * @param values 选中的树节点ID数组
		 */
		treeChkSetValues : function(values) {
			return this.each(function(i, v) {
				uiEx.treeChkSetValues(this, values);
			});
		},
		/**
		 * tree:设置选中的树复选框，注意：此方法必须在树渲染完后调用
		 * 
		 * @return 带复选框树选中的节点id数组
		 */
		getCheckedIds : function() {
			var ids;
			 this.each(function(i, v) {
				ids=uiEx.getCheckedIds(this);
			});
		    return ids;
		},
		/**
		 * form:对表单进行验证
		 * @return form对象
		 */
		validate : function() {
			var f;
			this.each(function(i, v) {
				f=uiEx.validate(this);
			});
			return f;
		}

	});
	
	
	// 注册对外发布的命名空间
	window.uiEx = uiEx;
})();

/*
 * ################ EasyUi功能定义
 */
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
			message : 'Length can not be less than {0}.'
		}
	});

})