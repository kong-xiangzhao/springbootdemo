/*

变量区 by wangran
---------------------------begin------------------------------------------*/

var $menutreedata ;
var $operatetype ;
/*

变量区 by wangran
---------------------------end------------------------------------------*/

/*

表格初始化 by maofei
---------------------------begin------------------------------------------*/

function initTable1() {
    var questUrl=systemPath + "/quartz/runlog/search";
    $("#jobRunLogTable").bootstrapTable('destroy').bootstrapTable({
        url: questUrl,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        method: 'POST',
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        queryParams : function(params) {//上传服务器的参数
            var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                //page : (params.offset / params.limit) + 1, //当前页码

                jobCode : $("#jobCode").val(),
                startDate : $("#startDate").val(),
                endDate : $("#endDate").val(),
                runState : $("#runState").val()
            };
            return temp;
        },
        columns: [
            [{
                title: '编号',
                field: 'no',
                align: 'center',
                valign: 'middle',
                width: 100,
                formatter: function (value, row, index) {
                    return index+1;
                }
            },{
                title: '作业名称',
                field: 'jobName',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '开始执行时间',
                field: 'startDate',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '执行结束时间',
                field: 'endDate',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '执行状态',
                field: 'runState',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '执行结果',
                field: 'runResult',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '创建时间',
                field: 'makeDate',
                align: 'center',
                valign: 'middle',
                width: 150
            },{
                title: '创建人',
                field: 'makeUser',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '更改时间',
                field: 'modifyDate',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '更改人',
                field: 'modifyUser',
                align: 'center',
                valign: 'middle',
                width: 100
            }]
        ]

    })
}



function test() {
    initTable1();
}

/*

表格初始化 by wangran
---------------------------end------------------------------------------*/




/*

日期控件的初始化函数 by wangran
---------------------------begin------------------------------------------*/

/**
 * 时间控件
 * @param elementid 标签的id
 */
function initDatePicker(elementid) {
    //初始化日期input-makedate
    $(elementid).datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',//设置时间展现格式
        language: 'zh-CN',//选择语言
        weekStart: 1,//设置起始周
        todayBtn: 1,//打开底部今天按钮,false为关闭
        autoclose: 1,//选中日期后自动关闭选择器
        todayHighlight: 1,//高亮显示选中日期
        // startView: 2,//设置为小时视图 ,  hour 1 day 2 month 3 year 4 decade(十年)
        //minView: 2,//设置最小视图为小时视图, hour 1 day 2 month 3 year 4 decade(十id年)
        showhour: 1,
        // bottom: top,
        forceParse: 0//是否强制解析时间格式和类型
    });
}
/*
日期控件的初始化function by wangran
---------------------------end------------------------------------------*/



/**
*@methodname: jquery主函数
*@description: role.js 页面主流程操作的main函数
*@param:
*@return:
*@date: 2019/7/5 14:41
*@author: wangran
*/
$(function(){

    //初始化表格
    initTable1();

    //初始化日期控件
    initDatePicker("#startDate");
    initDatePicker("#endDate");

    //初始化任务名称下拉框
    initDropdown('#jobCode1','jobCode');

    //查询按钮动作，填充table
    $("#queryRunLog").click(function () {
        // queryRunLoglist();
        test();
    });



});
