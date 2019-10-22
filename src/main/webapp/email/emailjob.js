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

    //初始化邮箱状态下拉框
    initDropdown('#emailJob','emailJob');
    initDropdown('#sender','emailSender');
    initDropdown('#receiver','emailReceiver');
    initDropdown('#copype','emailCopype');

    //新增邮箱点击
    $("#saveEmailJobInfo").click(function () {
        saveEmailJob();
    });
    //修改邮箱点击
    $("#editEmailInfo").click(function () {
        editEmail();
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
                width: 100
            },{
                title: '抄送人',
                field: 'emailCopype',
                align: 'center',
                valign: 'middle',
                width: 150
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
            return "没有相关的匹配结果";
        },
        formatLoadingMessage: function(){
            return "请稍等，正在加载中。。。";
        }
    });
}

/*操作列的格式*/
function operateFormatter(value, row, index) {
    var sas = '';
    var sasstr = '';
    if(row.eStatus=='停用'){
        sas='<a id="startEmail" href="javascript:void(0)" title="启用" style="color: green">';
        sasstr='启用';
    }else if(row.eStatus=='启用'){
        sas='<a id="stopEmail" href="javascript:void(0)" title="停用" style="color: red">';
        sasstr='停用';
    }
    return [
        '<a id="editEmail" href="javascript:void(0)" title="编辑" data-toggle="modal" data-target="#emailEditForm" style="color: blue">',
        '编辑',
        '</a>  ',
        sas,
        sasstr,
        '</a> ',
        '<a id="deleteEmail" href="javascript:void(0)" title="删除" data-toggle="modal" data-target=""  style="color: red">',
        '删除',
        '</a>'
    ].join('');
}

/*操作列的按钮方法*/
window.operateEvents = {

    'click #editEmail': function (e, value, row, index) {
        emailReturnView(row.id);
    },
    'click #startEmail': function (e, value, row, index) {
        startEmail(row.id);
    },
    'click #stopEmail': function (e, value, row, index) {
        stopEmail(row.id);
    },
    'click #deleteEmail': function (e, value, row, index) {
        isDeleteEmail(row.id);
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
function editEmail() {
    var email=$("#emailEdit").val();
    var eStatus=$("#eStatusEdit").val();
    var eRole=$("#eRoleEdit").val();
    var eHost=$("#eHostEdit").val();
    var ePassword=$("#ePasswordEdit").val();
    var nickName=$("#nickNameEdit").val();
    var emailid=$("#emailid").val();


    var params={
        id:emailid,
        email:email,
        eStatus:eStatus,
        eRole:eRole,
        eHost:eHost,
        ePassword:ePassword,
        nickName:nickName
    };
    //验证非空
    params=checkIsNull(params);
    // console.log(params.flag)
    //将undefined的转为空字符串
    for (let param in params){
        if(params[param]==undefined){
            params[param] = "";
        }
    }
    if(params.flag){
        $.ajax({
            url: systemPath + "/email/management/editEmail",
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
                        $("#emailEditForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
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

}
//邮箱回显
function emailReturnView(id) {
    console.log(id);
    var params={
        id:id
    }
    $.ajax({
        url:systemPath + "/email/management/returnEmail",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {
            $("#emailEdit").val(data.email);
            $("#eStatusEdit").selectpicker('val', data.eStatus);
            $("#eRoleEdit").selectpicker('val', data.eRole);
            $("#emailHiddenID").append("<input id=\"emailid\" name=\"emailid\" type=\"hidden\" value=\""+data.id+"\">");
            $("#initParamEdit").empty();//每次加载清空div的内容
            if(data.eRole=="S"){

                //
                $("#initParamEdit").append("<div style=\"margin-left: 1.5%\"><h4>发件人参数</h4></div><hr style=\"width: 100%\"/>");


                $("#initParamEdit").append("<div class=\"form-group col-sm-6\">\n" +
                    "                     <div class=\"row\">\n" +
                    "                         <label class=\"col-sm-4 control-label\">" + "邮箱服务器" + "</label>\n" +
                    "                         <div class=\"col-sm-8\">\n" +
                    "                             <input id=\"" + "eHostEdit" + "\" value= \"" + data.eHost + "\" type=\"text\"\n" +
                    "                                    class=\"form-control\" autocomplete=\"off\">\n" +
                    "                         </div>\n" +
                    "                     </div>\n" +
                    "                  </div>");
                $("#initParamEdit").append("<div class=\"form-group col-sm-6\">\n" +
                    "                     <div class=\"row\">\n" +
                    "                         <label class=\"col-sm-4 control-label\">" + "密码" + "</label>\n" +
                    "                         <div class=\"col-sm-8\">\n" +
                    "                             <input id=\"" + "ePasswordEdit" + "\" value=\"" + data.ePassword + "\" type=\"text\"\n" +
                    "                                    class=\"form-control\" autocomplete=\"off\">\n" +
                    "                         </div>\n" +
                    "                     </div>\n" +
                    "                  </div>");
                $("#initParamEdit").append("<div class=\"form-group col-sm-6\">\n" +
                    "                     <div class=\"row\">\n" +
                    "                         <label class=\"col-sm-4 control-label\">" + "昵称" + "</label>\n" +
                    "                         <div class=\"col-sm-8\">\n" +
                    "                             <input id=\"" + "nickNameEdit" + "\" value=\"" + data.nickName + "\" type=\"text\"\n" +
                    "                                    class=\"form-control\" autocomplete=\"off\">\n" +
                    "                         </div>\n" +
                    "                     </div>\n" +
                    "                  </div>");
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

/*是否删除邮箱*/
function isDeleteEmail(id) {
    swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "狠心删除",
            cancelButtonText:"我还爱你",
            closeOnConfirm: false
        },
        function(){
            deleteEmail(id);
        });
}
//删除邮箱
function deleteEmail(id) {
    var params={
        id:id
    }
    $.ajax({
        url:systemPath + "/email/management/deleteEmail",
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
 * 新增邮箱-实现
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
    console.log(params);
    // for (let param in params){
    //     console.log(params[param])
    // }
    /*
    //验证非空
    params=checkIsNull(params);
    // console.log(params.flag)
    //将undefined的转为空字符串
    for (let param in params){
        if(params[param]==undefined){
            params[param] = "";
        }
    }
    if(params.flag){
        $.ajax({
            url: systemPath + "/email/management/insertEmail",
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
                        $("#emailAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
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
*/

}
//字符串数组转化成以逗号分隔的字符串
function getTextByJs(params) {
    var str = "";
    if(params!=null){
        for (var i = 0; i < params.length; i++) {
            str += params[i]+ ",";
        }
        //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
    }
    return str;
}


/**
 * 邮件角色下拉值改变事件_实现（生成发件人参数）
 * elementid  标签id
 * suffix   后缀---多个下拉值改变都使用这个（新增和修改）
 */
function initJobParam(elementId,suffix) {
    var jobCode=$("#eRole"+suffix).val();
    var param1 = {
        paramName: "邮箱服务器",
        paramCode: "eHost"
    };
    var param2 = {
        paramName: "密码",
        paramCode: "ePassword"
    };
    var param3 = {
        paramName: "昵称",
        paramCode: "nickName"
    }
    var params=[param1,param2,param3];

    if(jobCode=="S"){
        $(elementId).empty();//每次加载清空div的内容
        //
        $(elementId).append("<div style=\"margin-left: 1.5%\"><h4>发件人参数</h4></div><hr style=\"width: 100%\"/>");

        for (let i = 0; i <params.length ; i++) {

            $(elementId).append("<div class=\"form-group col-sm-6\">\n" +
                "                     <div class=\"row\">\n" +
                "                         <label class=\"col-sm-4 control-label\">"+params[i].paramName+"</label>\n" +
                "                         <div class=\"col-sm-8\">\n" +
                "                             <input id=\""+params[i].paramCode+suffix+"\" name=\""+params[i].paramCode+suffix+"\" type=\"text\"\n" +
                "                                    class=\"form-control\" autocomplete=\"off\">\n" +
                "                         </div>\n" +
                "                     </div>\n" +
                "                  </div>");

        }

    }else {
        $(elementId).empty();
    }



}

function initEstatus(elementid) {
    var param1 = {
        paramName: "启用",
        paramCode: "1"
    };
    var param2 = {
        paramName: "停用",
        paramCode: "0"
    };

    var params=[param1,param2];
    initEmailSelect(elementid,params);
}

function  initEmailSelect(elementid,params){
    $(elementid).empty();//每次加载前要先清空
    $(elementid).append("<option style='display: none' ></option>");//默认空白
    for (let i = 0; i <params.length ; i++) {
        $(elementid).append("<option value=" + params[i].paramCode + ">" + params[i].paramName + "</option>");
    }
    $(elementid).selectpicker('refresh');
    $(elementid).selectpicker('render');
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

    for (let prop in params) {
        // console.log(prop+"1111");

        if(params[prop]=="" || params[prop]==undefined){
            console.log(params[prop]);
            if(prop=="email"){
                alertSwal("邮箱不能为空", "warning");
                params.flag = false;
                return params;
            }else if(prop=="eStatus"){
                alertSwal("启停状态不能为空", "warning");
                params.flag = false;
                return params;
            }else if(prop=="eRole"){
                alertSwal("邮箱角色不能为空", "warning");
                params.flag = false;
                return params;
            }else if(params.eRole=="S"){
                if(prop=="eHost"){
                    alertSwal("邮箱服务器不能为空", "warning");

                    params.flag = false;
                    return params;
                }else if(prop=="ePassword"){
                    alertSwal("密码不能为空", "warning");
                    params.flag = false;
                    return params;
                }else if(prop=="nickName"){
                    alertSwal("昵称不能为空", "warning");
                    params.flag = false;
                    return params;
                }
            }

        }
    }
    params.flag = true;
    return params;

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