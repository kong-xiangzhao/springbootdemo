/* -----------------------变量区 begin------------------------------------------*/

/* -----------------------jquery主函数 begin------------------------------------------*/
$(function(){
    //新增模态框关闭时清空
    $('#emailAddJobForm').on('hidden.bs.modal', function (){
        emptyModel(["emailJobAddForm","emailJob","sender","receiver","copype"]);
    });

    //初始化表格
    initTable();
    queryEmailList();
    //邮箱角色下拉框值改变事件
    // $('#eRole').change(function(){
    //     initJobParam("#initParam","");
    // });
    // $('#eRoleEdit').change(function(){
    //     initJobParam("#initParamEdit","Edit");
    // });

    //初始化下拉框
    initDropdown('#emailJob','emailJob');
    initDropdown('#sender','emailSender');
    initDropdown('#receiver','emailReceiver');
    initDropdown('#copype','emailCopype');

    initDropdown('#emailJobEdit','emailJob');
    initDropdown('#senderEdit','emailSender');
    initDropdown('#receiverEdit','emailReceiver');
    initDropdown('#copypeEdit','emailCopype');

    //新增邮箱点击
    $("#saveEmailJobInfo").click(function () {
        saveEmailJob();
    });
    //修改邮箱点击
    $("#editEmailJobInfo").click(function () {
        editEmailJobInfo();
    });
});


/* -----------------------成员函数 begin------------------------------------------*/
function initTable() {
    $("#emailjobtable").bootstrapTable('destroy').bootstrapTable({
        columns: [
            [{
                title: 'ID',
                field: 'emailJobCode',
                align: 'center',
                valign: 'middle',
                visible: 0,
                width: 50
            }, {
                title: '发送任务',
                field: 'emailJobName',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '发件人',
                field: 'emailSender',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '收件人',
                field: 'emailReceiver',
                align: 'center',
                valign: 'middle',
                formatter: contentTooMore1,//内容多，收起1
                width: 100
            },{
                title: '抄送人',
                field: 'emailCopype',
                align: 'center',
                valign: 'middle',
                width: 150,
                formatter: contentTooMoreFormatter,
                cellStyle: contentTooMoreCellStyle
            },{
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                width: 150,
                events: window.operateEvents,
                formatter: operateFormatter
            }]
        ],
        formatNoMatches: function(){
            return "你瞅啥，没有！";
        },
        formatLoadingMessage: function(){
            return "请稍等，正在加载中。。。";
        }
    });
}







/*操作列的格式*/
function operateFormatter(value, row, index) {
    return [
        '<a id="editEmailJob" href="javascript:void(0)" title="编辑" data-toggle="modal" data-target="#emailJobEditForm" style="color: blue">',
        '编辑',
        '</a>  ',
        '</a> ',
        '<a id="deleteEmailJob" href="javascript:void(0)" title="删除" data-toggle="modal" data-target=""  style="color: red">',
        '删除',
        '</a>'
    ].join('');
}

/*操作列的按钮方法*/
window.operateEvents = {

    'click #editEmailJob': function (e, value, row, index) {
        emailJobReturnView(row.emailJobCode);
    },
    'click #deleteEmailJob': function (e, value, row, index) {
        isDeleteEmailJob(row.emailJobCode);
    }
}
function queryEmailList() {
    $.ajax({
        url: systemPath + "/email/management/selectEmailJobInfo",
        type: "POST",
        dateType: "json",
        data: [],
        success: function (data) {
            $("#emailjobtable").bootstrapTable('load',data);
        },
        error: function () {
            swal({
                title: "查询出错了 o(╯□╰)o",
                type: "error"
            });
        }
    });
}


//修改邮箱实现
function editEmailJobInfo() {

    var emailJob=$("#emailJobEdit").val();
    var sender=$("#senderEdit").val();
    var receiver=$("#receiverEdit").val();
    var copype=$("#copypeEdit").val();

    receiver=getTextByJs(receiver);
    copype=getTextByJs(copype);
    var params={
        emailJobCode:emailJob,
        emailSender:sender,
        emailReceiver:receiver,
        emailCopype:copype
    };
    console.log(params);
    var flag=checkIsNull(params);
    // console.log(flag);
    if(flag){
        $.ajax({
            url: systemPath + "/email/management/editEmailJob",
            type: "POST",
            dateType: JSON,
            data: params,
            success: function (data) {
                // $("#jobplantable").bootstrapTable('load',data);
                swal({
                        title: data.msg,
                        type: data.status
                    },
                    function(){
                        if(data.status=="success"){
                            $("#emailAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
                            window.location.reload();//重新刷新页面
                        }
                    }
                );

            },
            error: function () {
                swal({
                    title: "出错了 o(╯□╰)o",
                    type: "error"
                });
            }
        });
    }


}
//发送任务回显
function emailJobReturnView(emailJobCode) {
    var params={
        emailJobCode:emailJobCode
    }
    $.ajax({
        url:systemPath + "/email/management/returnEmailJob",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {

            $("#emailJobEdit").selectpicker('val', data.emailJobCode);
            $("#senderEdit").selectpicker('val', data.emailSender);
            //多选下拉框获取值的时候是字符串数组，回显的时候也传入字符串数组
            if(data.emailReceiver!=null){
                $("#receiverEdit").selectpicker('val', data.emailReceiver.split(','));
            }
            if(data.emailCopype!=null){
                $("#copypeEdit").selectpicker('val', data.emailCopype.split(','));
            }
        },
        error: function () {
            swal({
                title: "出错了 o(╯□╰)o",
                type: "error"
            });
        }
    });
}

/*是否删除发送任务*/
function isDeleteEmailJob(emailJobCode) {
    swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "狠心删除",
            cancelButtonText:"我还爱你",
            closeOnConfirm: false
        },
        function(){
            deleteEmailJob(emailJobCode);
        });
}
//删除发送任务
function deleteEmailJob(emailJobCode) {
    var params={
        emailJobCode:emailJobCode
    }

    $.ajax({
        url:systemPath + "/email/management/deleteEmailJob",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {
            swal({
                    title: data.msg,
                    type: data.status
                },
                function(){
                    window.location.reload();//重新刷新页面
                }
            );
        },
        error: function () {
            swal({
                title: "出错了 o(╯□╰)o",
                type: "error"
            });
        }
    });

}

/**
 * 新增发送任务-实现
 */
function saveEmailJob() {
    var emailJob=$("#emailJob").val();
    var sender=$("#sender").val();
    var receiver=$("#receiver").val();
    var copype=$("#copype").val();

    receiver=getTextByJs(receiver);
    copype=getTextByJs(copype);
    var params={
        emailJobCode:emailJob,
        emailSender:sender,
        emailReceiver:receiver,
        emailCopype:copype
    };
    // console.log(params);

    var flag=checkIsNull(params);
    // console.log(flag);

    if(flag){
        $.ajax({
            url: systemPath + "/email/management/insertEmailJob",
            type: "POST",
            dateType: JSON,
            data: params,
            success: function (data) {
                // $("#jobplantable").bootstrapTable('load',data);
                swal({
                        title: data.msg,
                        type: data.status
                    },
                    function(){
                        if(data.status=="success"){
                            $("#emailAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
                            window.location.reload();//重新刷新页面
                        }
                    }
                );

            },
            error: function () {
                swal({
                    title: "出错了 o(╯□╰)o",
                    type: "error"
                });
            }
        });
    }


}


/**
 * 时间控件
 * @param elementid 标签的id
 */
function initDatePicker(elementid) {
    //初始化日期input-makedate
    $(elementid).datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',//设置时间展现格式
        language:  'zh-CN',//选择语言
        weekStart: 1,//设置起始周
        todayBtn:  1,//打开底部今天按钮,false为关闭
        autoclose: 1,//选中日期后自动关闭选择器
        todayHighlight: 1,//高亮显示选中日期
        // startView: 2,//设置为小时视图 ,  hour 1 day 2 month 3 year 4 decade(十年)
        //minView: 2,//设置最小视图为小时视图, hour 1 day 2 month 3 year 4 decade(十id年)
        showhour: 1,
        // bottom: top,
        pickerPosition: 'bottom-right',
        forceParse: 0//是否强制解析时间格式和类型
    });
}


/**
 * 验证是否为空
 * @param params
 */
function checkIsNull(params) {
    // console.log(params);
    var flag=true;
    for (let prop in params) {
        // console.log(prop+"1111");

        if(params[prop]=="" || params[prop]==undefined){
            // console.log(params[prop]);
            if(prop=="emailJobCode"){
                alertSwal("发送任务不能为空", "warning");
                flag = false;
                return params;
            }else if(prop=="emailSender"){
                alertSwal("发件人不能为空", "warning");
                flag = false;
                return params;
            }else if(prop=="emailReceiver"){
                alertSwal("收件人不能为空", "warning");
                flag = false;
                return params;
            }

        }
    }
    return flag;

}
//弹框
function alertSwal(title,type) {
    swal({
        title: title,
        type: type
    });
}
//验证计划参数是否为空
function checkParamValue(params) {
    let flag = true;
    for (let prop in params) {
        if(params[prop]==""||params[prop]=="undefined"){
            flag = false;
            alertSwal("计划参数不能为空","warning")
        }
    }
    return flag;
}