<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>

<head>
    <title>任务执行计划</title>
    <link href="../assets/fontAwesome/css/fontawesome-all.min.css" rel="stylesheet">
    <link href="../assets/css/lib/themify-icons.css" rel="stylesheet">
    <link href="../assets/css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/css/lib/nixon.css" rel="stylesheet">
    <link href="../assets/lib/lobipanel/css/lobipanel.min.css" rel="stylesh1eet">
    <link href="../assets/css/lib/sidebar.css" rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">
    <link href="../assets/bstable/bootstrap-table.css" rel="stylesheet"/>
    <link href="../assets/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="../assets/treeview/bootstrap-treeview.min.css" rel="stylesheet">
    <link href="../assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet"/>
    <link href="../assets/bsselect/css/bootstrap-select.min.css" rel="stylesheet"/>
    <style type="text/css">
        .zmf-modal-content{


        }

    </style>
</head>

<body>
<div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
    <div class="nano">
        <div class="nano-content">
            <ul>
                <%--动态菜单end--%>
                <c:forEach items="${menus}" var="menu" varStatus="loop">
                    <c:if test="${(menu.parentmenuid == '0000')&&(menu.menulink != null)}">
                        <li><a href="<c:url value="${menu.menulink}" />"><i class="ti-home"></i>${menu.menuname}</a></li>
                    </c:if>

                    <c:if test="${(menu.parentmenuid == '0000')&&(menu.menulink == null)&&(menu.menuid != param.pmenuid)}">
                        <li>
                            <a class="sidebar-sub-toggle"><i class="ti-user"></i>${menu.menuname}<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                            <ul>
                                <c:forEach items="${menus}" var="menuchild" varStatus="loop">
                                    <c:if test="${menuchild.parentmenuid == menu.menuid}">
                                        <li><a href="<c:url value="${menuchild.menulink}?menuid=${menuchild.menuid}&pmenuid=${menuchild.parentmenuid}"/>">${menuchild.menuname}</a></li>
                                    </c:if>
                                </c:forEach>
                            </ul>
                        </li>
                    </c:if>

                    <c:if test="${(menu.parentmenuid == '0000')&&(menu.menulink == null)&&(menu.menuid == param.pmenuid)}">
                        <li class="active open">
                            <a class="sidebar-sub-toggle"><i class="ti-user"></i>${menu.menuname}<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                            <ul>
                                <c:forEach items="${menus}" var="menuchild" varStatus="loop">
                                    <c:if test="${(menuchild.parentmenuid == menu.menuid)&&(menuchild.menuid == param.menuid)}">
                                        <li><a class="beselect" href="<c:url value="${menuchild.menulink}?menuid=${menuchild.menuid}&pmenuid=${menuchild.parentmenuid}"/>">${menuchild.menuname}</a></li>
                                    </c:if>
                                    <c:if test="${(menuchild.parentmenuid == menu.menuid)&&(menuchild.menuid != param.menuid)}">
                                        <li><a href="<c:url value="${menuchild.menulink}?menuid=${menuchild.menuid}&pmenuid=${menuchild.parentmenuid}"/>">${menuchild.menuname}</a></li>
                                    </c:if>
                                </c:forEach>
                            </ul>
                        </li>
                    </c:if>
                </c:forEach>

                <%--动态菜单end--%>

                <li><a href="<c:url value="/userlogout" />"><i class="ti-close"></i>退出系统</a></li>
            </ul>
        </div>
    </div>
</div>
<!-- /# sidebar -->
<div class="header">·
    <div class="pull-left">
        <div class="logo">
            <a href="index.jsp">
                <img id="logoImg" src="../logo/logo.png" data-logo_big="../logo/logo.png" data-logo_small="../logo/logoSmall.png" alt="Nixon" />
            </a>
        </div>
        <div class="hamburger sidebar-toggle">
            <span class="ti-menu"></span>
        </div>
    </div>
    <div class="pull-right p-r-15">
        <%--头部右侧--%>
    </div>
</div>
<!-- END chat Sidebar-->
<div class="content-wrap">
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <h1>任务管理</h1>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li class="active">任务管理</li>
                                <li><a href="#">任务管理</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
            </div>
            <!-- /# row -->
            <div class="main-content">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-body">
                                <div class="horizontal-form-elements">
                                    <form class="form-horizontal">
                                        <div class="row">
                                            <input id="addjobplan" type="button" value="新增任务计划"
                                                   class="btn btn-primary m-b-10 m-l-5" data-toggle="modal"
                                                   data-target="#jobAddForm"></input>
                                        </div>
                                    </form><!--/#form-->
                                </div>
                            </div>
                        </div><!-- /# card -->
                    </div><!-- /# column -->

                </div>
                <!-- /# form end row -->
                <!-- /# table row begin -->
                <div class="row">


                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-header">
                                <h4>任务计划列表</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="jobplantable"
                                           class="table  table-bordered table-striped"
                                           data-toggle="table"
                                           data-click-to-select="true"
                                           data-pagination="true"
                                           data-show-footer="true"
                                           data-side-pagination="client">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div><!-- /# card -->

                </div>
                <!-- /# row -->

                <div class="row">
                    <!-- 增加计划表单（Modal） -->
                    <div class="modal fade" id="jobAddForm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="true">
                        <div class="modal-dialog" style="width:1000px">

                            <div class="modal-content zmf-modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        增加任务计划
                                    </h4>
                                </div>

                                <%--新start--%>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id="jobPlanAddForm" role="form">

                                            <div class="row">


                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label">任务名称</label>
                                                            <div class="col-sm-8">
                                                                <select id="jobCode" name="jobCode" title="请选择"
                                                                        class="selectpicker"
                                                                        data-style="form-control" data-width="100%">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label ">多久执行一次</label>
                                                            <div class="col-sm-4">
                                                                <input id="repeatInterval" name="repeatInterval" type="text"
                                                                       class="form-control " autocomplete="off" >
                                                            </div>
                                                            <%--autocomplete="off" 不会自动提示之前输入的值--%>
                                                            <div class="col-sm-4">
                                                                <select id="repeatUnit" name="repeatUnit"
                                                                        title="请选择" class="selectpicker"
                                                                        data-style="form-control"
                                                                        data-width="100%">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label">计划生效日期</label>
                                                            <div class="col-sm-8">
                                                                <input id="jobStartDate" name="jobStartDate" type="text"
                                                                       class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label">计划结束日期</label>
                                                            <div class="col-sm-8 ">
                                                                <input id="jobEndDate1" name="jobEndDate"
                                                                       value="9999-12-12 00:00:00" type="text"
                                                                       class="form-control" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <%--<div class="form-group col-sm-12" >--%>
                                                        <div class="row form-group">
                                                            <label class="col-sm-2 control-label" >
                                                                <计划描述></计划描述>
                                                            </label>
                                                            <div class="col-sm-10 ">
                                                                <textarea class="form-control " id="jobDesc" name="jobDesc"
                                                                          rows="3" ></textarea>
                                                            </div>
                                                        </div>
                                                    <%--</div>--%>
                                                    <%--<div class="form-group col-sm-3" ></div>--%>

                                                <div id="initParam" ></div>

                                            </div>

                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <%--新结束--%>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="saveJob"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </div>


                <!-- /# row -->
                <div class="row">
                    <!-- 修改计划表单（Modal） -->
                    <div class="modal fade" id="jobEditForm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="true">
                        <div class="modal-dialog" style="width:1000px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel1">
                                        修改任务计划
                                    </h4>
                                </div>

                                <%--新start--%>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id="jobPlanEditForm" role="form">
                                            <div class="row" id="jobEditHiddenByJobPlanCode">
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">任务名称</label>
                                                        <div class="col-sm-8">
                                                            <select id="jobCodeEdit" name="jobCodeEdit" title="请选择"
                                                                    class="selectpicker"
                                                                    data-style="form-control" data-width="100%" disabled="disabled">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">多久执行一次</label>
                                                        <div class="col-sm-4">
                                                            <input id="repeatIntervalEdit" name="repeatIntervalEdit" type="text"
                                                                   class="form-control" autocomplete="off">
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <select id="repeatUnitEdit" name="repeatUnitEdit"
                                                                    title="请选择" class="selectpicker"
                                                                    data-style="form-control"
                                                                    data-width="100%">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">计划生效日期</label>
                                                        <div class="col-sm-8">
                                                            <input id="jobStartDateEdit" name="jobStartDateEdit" type="text"
                                                                   class="form-control" autocomplete="off">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">计划结束日期</label>
                                                        <div class="col-sm-8">
                                                            <input id="jobEndDateEdit" name="jobEndDateEdit"
                                                                   value="9999-12-12 00:00:00" type="text"
                                                                   class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">

                                                        <label class="col-sm-2 control-label">
                                                            <计划描述></计划描述>
                                                        </label>
                                                        <div class="col-sm-10">
                                                            <textarea class="form-control" id="jobDescEdit" name="jobDescEdit"
                                                                      rows="3"></textarea>
                                                        </div>

                                                </div>
                                                <div id="initParamEdit" ></div>
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <%--新结束--%>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="editJobPlan"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </div>


                <!-- /# row -->
                <div class="row">
                    <!-- 计划表单详情（Modal） -->
                    <div class="modal fade" id="jobDetailForm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="true">
                        <div class="modal-dialog" style="width:1000px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel2">
                                        任务计划详情
                                    </h4>
                                </div>

                                <%--新start--%>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id="jobPlanDetailForm" role="form">
                                            <div class="row">
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">任务名称</label>
                                                        <div class="col-sm-8">

                                                            <input id="jobCodeDetail" name="jobCodeDetail" type="text"
                                                                   class="form-control " disabled="disabled">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">多久执行一次</label>
                                                        <div class="col-sm-4">
                                                            <input id="repeatIntervalDetail" name="repeatIntervalDetail" type="text"
                                                                   class="form-control" disabled="disabled">
                                                        </div>
                                                        <div class="col-sm-4">

                                                            <input id="repeatUnitDetail" name="repeatUnitDetail" type="text"
                                                                   class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">计划生效日期</label>
                                                        <div class="col-sm-8">
                                                            <input id="jobStartDateDetail" name="jobStartDateDetail" type="text"
                                                                   class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">计划结束日期</label>
                                                        <div class="col-sm-8">
                                                            <input id="jobEndDateDetail" name="jobEndDateDetail"
                                                                   value="9999-12-12 00:00:00" type="text"
                                                                   class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">

                                                        <label class="col-sm-2 control-label">
                                                            <计划描述></计划描述>
                                                        </label>
                                                        <div class="col-sm-10">
                                                            <textarea class="form-control" id="jobDescDetail" name="jobDescDetail"
                                                                      rows="3" disabled="disabled"></textarea>
                                                        </div>

                                                </div>
                                                <div id="initParamDetail">

                                                </div>
                                            </div>
                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <%--新结束--%>

                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </div>




            </div>
            <!-- /# main content -->
        </div>
        <!-- /# container-fluid -->
    </div>
    <!-- /# main -->
</div>
<!-- /# content wrap -->


<script src="../assets/js/lib/jquery.min.js"></script>
<!-- jquery vendor -->
<script src="../assets/js/lib/jquery.nanoscroller.min.js"></script>
<!-- nano scroller -->
<script src="../assets/js/lib/sidebar.js"></script>
<!-- sidebar -->
<script src="../assets/js/lib/bootstrap.min.js"></script>
<script src="../assets/bstable/bootstrap-table.js"></script>
<script src="../assets/bstable/locale/bootstrap-table-zh-CN.js"></script>
<script src="../assets/datetime/bootstrap-datetimepicker.js" ></script>
<script src="../assets/datetime/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../assets/treeview/bootstrap-treeview.min.js"></script>
<script src="../assets/jqvalidate/jquery.validate.min.js"></script>
<script src="../assets/jqvalidate/localization/messages_zh.js"></script>
<script src="../assets/js/lib/sweetalert/sweetalert.min.js"></script>
<script src="../assets/bsselect/js/bootstrap-select.min.js"></script>
<script src="../assets/bsselect/js/i18n/defaults-zh_CN.min.js"></script>
<script src="../common/common.js"></script>
<!-- bootstrap -->
<script src="jobplan.js"></script>
</body>

</html>