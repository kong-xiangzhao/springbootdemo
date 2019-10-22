/* -----------------------变量区 begin------------------------------------------*/

/* -----------------------jquery主函数 begin------------------------------------------*/
$(function(){
    //新增模态框关闭时清空
    $('#jobAddForm').on('hidden.bs.modal', function (){
        emptyModel(["jobPlanAddForm","jobCode","initParam","repeatUnit"]);
    });

    //初始化表格
    initTable();

    //初始化任务计划表格数据
    queryJobplanList();


    //初始化日期控件
    initDatePicker('#jobStartDate');

    //初始化间隔下拉框
    initDropdown('#repeatUnit','jobInterval');
    // initDropdown('#repeatUnitEdit','jobInterval');
    //初始化任务名称下拉框
    initDropdown('#jobCode','jobCode');
    // initDropdown('#jobCodeEdit','jobCode');

    //任务名称下拉框值改变事件
    $('#jobCode').change(function(){
        initJobParam("#initParam","");
    });
    $('#jobCodeEdit').change(function(){
        initJobParam("#initParamEdit","Edit");
    });
    //新增计划点击
    $("#saveJob").click(function () {
        saveJob();
    });


    //修改计划点击
    $("#editJobPlan").click(function () {
        editJobPlan();
    })


});


/* -----------------------成员函数 begin------------------------------------------*/
function initTable() {
    $("#jobplantable").bootstrapTable('destroy').bootstrapTable({
        columns: [
            [{
                title: '计划ID',
                field: 'jobPlanCode',
                align: 'center',
                valign: 'middle',
                visible: 0,
                width: 50
            }, {
                title: '任务名称',
                field: 'jobName',
                align: 'center',
                valign: 'middle',
                width: 100
            }, {
                title: '计划描述',
                field: 'jobPlanDesc',
                align: 'center',
                valign: 'middle',
                width: 150
            }, {
                title: '执行频率',
                field: 'repeatInterval',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '开始时间',
                field: 'startDate',
                align: 'center',
                valign: 'middle',
                width: 150
            },{
                title: '执行ip',
                field: 'paramValue',
                align: 'center',
                valign: 'middle',
                width: 100
            },{
                title: '启用/停止',
                field: 'useFlag',
                align: 'center',
                valign: 'middle',
                width: 50
            },{
                title: '运行状态',
                field: 'runState',
                align: 'center',
                valign: 'middle',
                width: 100
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
    if(row.useFlag=='停止'){
        sas='<a id="startJob" href="javascript:void(0)" title="启用" style="color: green">';
        sasstr='启用';
    }else if(row.useFlag=='启用'){
        sas='<a id="stopJob" href="javascript:void(0)" title="停止" style="color: red">';
        sasstr='停止';
    }
    return [
        '<a id="jobDetail" href="javascript:void(0)" title="详情" data-toggle="modal" data-target="#jobDetailForm" style="color: #f1a899">',
        '详情',
        '</a>  ',
        '<a id="editJob" href="javascript:void(0)" title="编辑" data-toggle="modal" data-target="#jobEditForm" style="color: blue">',
        '编辑',
        '</a>  ',
        sas,
        sasstr,
        '</a> ',
        '<a id="deleteJob" href="javascript:void(0)" title="删除" data-toggle="modal" data-target=""  style="color: red">',
        '删除',
        '</a>'
    ].join('');
}

/*操作列的按钮方法*/
window.operateEvents = {
    'click #jobDetail': function (e, value, row, index) {

        jobPlanDetail(row.jobPlanCode,row.paramValue);
    },
    'click #editJob': function (e, value, row, index) {
        jobReturnView(row.jobPlanCode,row.paramValue);
    },
    'click #startJob': function (e, value, row, index) {
        startJob(row.jobPlanCode,row.paramValue);
    },
    'click #stopJob': function (e, value, row, index) {
        stopJob(row.jobPlanCode,row.paramValue);
    },
    'click #deleteJob': function (e, value, row, index) {
        isDeleteJob(row.jobPlanCode,row.paramValue);
    }
}



/*任务计划详情*/
function jobPlanDetail(jobPlanCode,IP) {
    var params = {
        jobPlanCode: jobPlanCode,
        paramValue: IP
    };
    $.ajax({
        url: systemPath + "/quartz/management/returnJobView",
        type: "POST",
        dateType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function (data) {
            // console.log(data);
            // $("#jobCodeDetail").selectpicker('val', data.returnView[0].jobCode);
            // $("#jobCodeDetail").selectpicker("refresh");

            $("#jobCodeDetail").val(data.returnView[0].jobCode);

            $("#repeatIntervalDetail").val(data.returnView[0].repeatInterval);

            // $("#repeatUnitDetail").selectpicker('val', data.returnView[0].repeatUnit);
            // $("#repeatUnitDetail").selectpicker("refresh");

            $("#repeatUnitDetail").val(data.returnView[0].paramName);

            $("#jobStartDateDetail").val(data.returnView[0].startDate);

            $("#jobDescDetail").val(data.returnView[0].jobPlanDesc);
            let len = data.paramByCode.length;
            if(len!=0){
                // console.log(len);
                $("#initParamDetail").empty();//每次加载清空div的内容
                var suffix = "Detail";
                var labelText = "";
                var inputId = "";
                var inputName = "";
                for(var i=0;i<len;i++){
                    labelText = data.paramByCode[i].paramName;
                    inputId = data.paramByCode[i].paramCode + suffix;
                    inputName = data.paramByCode[i].paramCode + suffix;
                    $("#initParamDetail").append("<div class=\"form-group col-sm-6\">\n" +
                        "                     <div class=\"row\">\n" +
                        "                         <label class=\"col-sm-4 control-label\">"+labelText+"</label>\n" +
                        "                         <div class=\"col-sm-8\">\n" +
                        "                             <input id=\""+inputId+"\" name=\""+inputName+"\" type=\"text\"\n" +
                        "                                    class=\"form-control\" disabled=\"disabled\">\n" +
                        "                         </div>\n" +
                        "                     </div>\n" +
                        "                  </div>");

                    //如果参数是开始时间和结束时间，就加上时间控件(这里的判断条件写死了)
                    /*if(data.paramByCode[i].paramCode=='startDate' || data.paramByCode[i].paramCode=='endDate'){
                        // initDatePicker('#'+inputId);
                    }*/
                    $("#"+inputId).val(data.paramByCode[i].paramValue);
                }
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

/*计划回显*/
function jobReturnView(jobPlanCode,IP) {
    //初始化日期控件
    initDatePicker('#jobStartDateEdit');
    initDropdown('#repeatUnitEdit','jobInterval');
    initDropdown('#jobCodeEdit','jobCode');
    var params = {
        jobPlanCode: jobPlanCode,
        paramValue: IP
    };
    $.ajax({
        url: systemPath + "/quartz/management/returnJobView",
        type: "POST",
        dateType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function (data) {
            // console.log(data);
            // JSON.stringify(data.returnView.jobCode);
            $("#jobCodeEdit").selectpicker('val', data.returnView[0].jobCode);
            $("#jobCodeEdit").selectpicker("refresh");

            $("#repeatIntervalEdit").val(data.returnView[0].repeatInterval);

            $("#repeatUnitEdit").selectpicker('val', data.returnView[0].repeatUnit);
            $("#repeatUnitEdit").selectpicker("refresh");

            $("#jobStartDateEdit").val(data.returnView[0].startDate);

            $("#jobDescEdit").val(data.returnView[0].jobPlanDesc);
            let len = data.paramByCode.length;
            if(len!=0){
                // console.log(len);
                $("#initParamEdit").empty();//每次加载清空div的内容
                $("#initParamEdit").append("<div style=\"margin-left: 1.5%\"><h4>作业参数</h4></div><hr style=\"width: 100%\"/>");
                $("#jobEditHiddenByJobPlanCode").append("<input id=\"jobPlanCodeEdit\" name=\"jobPlanCodeEdit\" type=\"hidden\" value=\""+jobPlanCode+"\">")
                var suffix = "Edit";
                var labelText = "";
                var inputId = "";
                var inputName = "";
                for(var i=0;i<len;i++){
                    labelText = data.paramByCode[i].paramName;
                    inputId = data.paramByCode[i].paramCode + suffix;
                    inputName = data.paramByCode[i].paramCode + suffix;
                    $("#initParamEdit").append("<div class=\"form-group col-sm-6\">\n" +
                        "                     <div class=\"row\">\n" +
                        "                         <label class=\"col-sm-4 control-label\">"+labelText+"</label>\n" +
                        "                         <div class=\"col-sm-8\">\n" +
                        "                             <input id=\""+inputId+"\" name=\""+inputName+"\" type=\"text\"\n" +
                        "                                    class=\"form-control\">\n" +
                        "                         </div>\n" +
                        "                     </div>\n" +
                        "                  </div>");
                    //如果参数是开始时间和结束时间，就加上时间控件(这里的判断条件写死了)
                    if(data.paramByCode[i].paramCode=='startDate' || data.paramByCode[i].paramCode=='endDate'){
                        initDatePicker('#'+inputId);
                    }
                    $("#"+inputId).val(data.paramByCode[i].paramValue);
                }
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
/*是否删除任务*/
function isDeleteJob(jobPlanCode,IP) {
    swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "狠心删除",
            cancelButtonText:"我还爱你",
            closeOnConfirm: false
        },
        function(){
            deleteJob(jobPlanCode,IP);
        });
}

/*删除任务*/
function deleteJob(jobPlanCode,IP) {
    var params = {
        jobPlanCode: jobPlanCode,
        paramValue: IP
    };
    $.ajax({
        url: systemPath + "/quartz/management/deleteJob",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {
            swal({
                    title: data.msg,
                    type: "success"
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
/*停止任务*/
function stopJob(jobPlanCode,IP) {
    var params = {
        jobPlanCode: jobPlanCode,
        paramValue: IP
    };
    $.ajax({
        url: systemPath + "/quartz/management/stopJob",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {
            // $("#jobplantable").bootstrapTable('load',data);
            swal({
                    title: data.msg,
                    type: "success"
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

/*启动任务*/
function startJob(jobPlanCode,IP) {
    console.log(jobPlanCode, IP);
    var params = {
        jobPlanCode: jobPlanCode,
        paramValue: IP
    };
    $.ajax({
        url: systemPath + "/quartz/management/startJob",
        type: "POST",
        dateType: "json",
        data: params,
        success: function (data) {
            // $("#jobplantable").bootstrapTable('load',data);
            swal({
                    title: data.msg,
                    type: "success"
                },
                function(){
                    // $("#jobAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
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

function queryJobplanList() {
    $.ajax({
        url: systemPath + "/controller/queryjobplanlist",
        type: "GET",
        dateType: "json",
        data: [],
        success: function (data) {
            $("#jobplantable").bootstrapTable('load',data);
        },
        error: function () {
            swal({
                title: "查询出错了 o(╯□╰)o",
                type: "error"
            });
        }
    });
}

/**
 * 新增计划
 */
function saveJob() {
    var jobCode="";
    var repeatInterval="";
    var repeatUnit="";
    var jobStartDate="";
    var jobDesc="";
    var paramValue = "";

    var initParam = $("#jobPlanAddForm").serializeArray();//获取form表单中的录入项，input，select、、、
    console.log(initParam);
    var paramId;
    for(let i=0;i<initParam.length;i++){
        console.log(initParam[i].name)
        paramId=initParam[i].name
        if(paramId=="jobCode"){
            jobCode=$("#"+paramId).val();
        }
        if(paramId=="repeatInterval"){
            repeatInterval=$("#"+paramId).val();
        }
        if(paramId=="repeatUnit"){
            repeatUnit=$("#"+paramId).val();
        }
        if(paramId=="jobStartDate"){
            jobStartDate=$("#"+paramId).val();
        }
        if(paramId=="jobDesc"){
            jobDesc=$("#"+paramId).val();
        }

        if(paramId!="jobCode"&&paramId!="repeatInterval"&&paramId!="repeatUnit"&&paramId!="jobStartDate"&&paramId!="jobDesc"){
            paramValue=paramValue+$("#"+paramId).val();
        }
    }


    var params = {
        jobCode: jobCode,
        repeatInterval: repeatInterval,
        repeatUnit: repeatUnit,
        startDate: jobStartDate,
        // endDate: jobEndDate,
        jobPlanDesc: jobDesc,
        // paramValue: paramValue
    };
    var paramDiv = $("#initParam").html();
    if(paramDiv.length>0){
        params.paramValue = paramValue;
    }
    //验证非空
    let flag=checkIsNull(params);
    if(flag) {
        $.ajax({
            url: systemPath + "/quartz/management/insertJob",
            type: "POST",
            dateType: JSON,
            data: params,
            success: function (data) {
                // $("#jobplantable").bootstrapTable('load',data);
                swal({
                        title: data.msg,
                        type: "success"
                    },
                    function () {
                        $("#jobAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
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

/**
 * 修改计划提交-实现
 */
function editJobPlan() {
    var jobCode="";
    var repeatInterval="";
    var repeatUnit="";
    var jobStartDate="";
    var jobDesc="";
    var paramValue = "";

    var initParam = $("#jobPlanEditForm").serializeArray();//获取form表单中的录入项，input，select、、、
    console.log(initParam);
    var paramId;
    for(let i=0;i<initParam.length;i++){
        console.log(initParam[i].name)
        paramId=initParam[i].name
        if(paramId=="jobCodeEdit"){
            jobCode=$("#"+paramId).val();
        }
        if(paramId=="repeatIntervalEdit"){
            repeatInterval=$("#"+paramId).val();
        }
        if(paramId=="repeatUnitEdit"){
            repeatUnit=$("#"+paramId).val();
        }
        if(paramId=="jobStartDateEdit"){
            jobStartDate=$("#"+paramId).val();
        }
        if(paramId=="jobDescEdit"){
            jobDesc=$("#"+paramId).val();
        }

        if(paramId!="jobCodeEdit"&&paramId!="repeatIntervalEdit"&&paramId!="repeatUnitEdit"&&paramId!="jobStartDateEdit"&&paramId!="jobDescEdit"){
            paramValue=paramValue+$("#"+paramId).val();
        }
    }


    var params = {
        jobCode: jobCode,
        repeatInterval: repeatInterval,
        repeatUnit: repeatUnit,
        startDate: jobStartDate,
        jobPlanDesc: jobDesc,
        // paramValue: paramValue
    };
    var paramDiv = $("#initParamEdit").html();
    if(paramDiv.length>0){
        params.paramValue = paramValue;
    }

    //验证非空
    let flag=checkIsNull(params);
    if(flag){
        $.ajax({
            url: systemPath + "/quartz/management/editJobPlan",
            type: "POST",
            dateType: JSON,
            data: params,
            success: function (data) {
                // $("#jobplantable").bootstrapTable('load',data);
                swal({
                        title: data.msg,
                        type: "success"
                    },
                    function(){
                        $("#jobAddForm").modal('hide');//保存成功则关闭模态框，并且重置模态框
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
/**
 * 作业名称下拉值改变事件_实现（生成计划参数）
 * elementid  标签id
 * suffix   后缀---多个下拉值改变都使用这个
 */
function initJobParam(elementId,suffix) {
    var jobCode=$("#jobCode"+suffix).val();
    // alert(jobCode);
    var params = {
        jobCode: jobCode
    }
    $.ajax({
        url:systemPath + "/quartz/management/getJobParamList",
        type: "POST",
        dataType: "json",
        data:params,
        success: function (returndata) {
            // console.log(returndata);
            var len = returndata.length;
            $(elementId).empty();//每次加载清空div的内容
            //
            if(len>0) {
                $(elementId).append("<div style=\"margin-left: 1.5%\"><h4>作业参数</h4></div><hr style=\"width: 100%\"/>");
                var labelText = "";
                var inputId = "";
                var inputName = "";
                //循环生成作业参数
                for (var i = 0; i < len; i++) {
                    labelText = returndata[i].paramName;
                    inputId = returndata[i].paramCode + suffix;
                    inputName = returndata[i].paramCode + suffix;
                    $(elementId).append("<div class=\"form-group col-sm-6\">\n" +
                        "                     <div class=\"row\">\n" +
                        "                         <label class=\"col-sm-4 control-label\">" + labelText + "</label>\n" +
                        "                         <div class=\"col-sm-8\">\n" +
                        "                             <input id=\"" + inputId + "\" name=\"" + inputName + "\" type=\"text\"\n" +
                        "                                    class=\"form-control\" autocomplete=\"off\">\n" +
                        "                         </div>\n" +
                        "                     </div>\n" +
                        "                  </div>");


                    //如果参数是开始时间和结束时间，就加上时间控件(这里的判断条件写死了)
                    if (returndata[i].paramCode == 'startDate' || returndata[i].paramCode == 'endDate') {
                        initDatePicker('#' + inputId);
                    }
                }
            }
        },
        error: function () {
            swal({
                title: "o(╯□╰)o，服务调用出错！",
                type: "warning",
            });
        }
    });


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
    console.log(params);
    let flag=true;

    for (let prop in params) {
        console.log(prop+"1111");
        if(params[prop]=="" || params[prop]==undefined){
            console.log(params[prop]);
            flag = false;
            if(prop=="jobCode"){
                alertSwal("任务名称不能为空", "warning");
                return flag;
            }else if(prop=="repeatInterval"){
                alertSwal("循环间隔不能为空", "warning");
                return flag;
            }else if(prop=="repeatUnit"){
                alertSwal("执行频率不能为空", "warning");
                return flag;
            }else if(prop=="startDate"){
                alertSwal("执行开始时间不能为空", "warning");
                return flag;
            }else if(prop=="jobPlanDesc"){
                alertSwal("计划描述不能为空", "warning");
                return flag;
            }
        }else if(prop=="paramValue"){
            flag = checkParamValue(params.paramValue.split(","));
            return flag;
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