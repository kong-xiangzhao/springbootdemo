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
                            <h1>邮件管理</h1>
                        </div>
                    </div>
                </div>
                <!-- /# column -->
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li class="active">邮件管理</li>
                                <li><a href="#">发送管理</a></li>
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
                                            <input id="addjobplan" type="button" value="新增发送任务"
                                                   class="btn btn-primary m-b-10 m-l-5" data-toggle="modal"
                                                   data-target="#emailAddJobForm"></input>
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
                                <h4>邮箱列表</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table id="emailjobtable"
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
                    <!-- 增加邮箱表单（Modal） -->
                    <div class="modal fade" id="emailAddJobForm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="true">
                        <div class="modal-dialog" style="width:1000px">

                            <div class="modal-content zmf-modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        新增发送任务
                                    </h4>
                                </div>

                                <%--新start--%>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id="emailJobAddForm" role="form">

                                            <div class="row">


                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label">目标任务</label>
                                                            <div class="col-sm-8">
                                                                <select id="emailJob" name="emailJob"
                                                                        title="请选择" class="selectpicker"
                                                                        data-style="form-control"
                                                                        data-width="100%">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label ">发件人</label>

                                                            <div class="col-sm-8">
                                                                <select id="sender" name="sender"
                                                                        title="请选择" class="selectpicker"
                                                                        data-style="form-control"
                                                                        data-width="100%">

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label ">收件人</label>

                                                            <div class="col-sm-8">
                                                                <select id="receiver" name="receiver"
                                                                        title="请选择" class="selectpicker" multiple="multiple"
                                                                        data-style="form-control"
                                                                        data-width="100%">

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <div class="row">
                                                            <label class="col-sm-4 control-label ">抄送人</label>

                                                            <div class="col-sm-8">
                                                                <select id="copype" name="copype"
                                                                        title="请选择" class="selectpicker" multiple="multiple"
                                                                        data-style="form-control"
                                                                        data-width="100%">

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="initParam"  class="row">
                                                    <%--<div style="margin-left: 25px"><h4>作业参数</h4></div><hr style="width: 498px"/>
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <label class="col-sm-3 control-label">
                                                                参数1
                                                            </label>
                                                            <div class="col-sm-7">
                                                                <input class="form-control" id="1" name="1"
                                                                          rows="3"></input>
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                </div>


                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <%--新结束--%>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="saveEmailJobInfo"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </div>


                <!-- /# row -->

                <div class="row">
                    <!-- 修改邮箱表单（Modal） -->
                    <div class="modal fade" id="emailJobEditForm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="true">
                        <div class="modal-dialog" style="width:1000px">

                            <div class="modal-content zmf-modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times  关闭
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel1">
                                        修改发送任务
                                    </h4>
                                </div>

                                <%--新start--%>
                                <div class="modal-body">
                                    <div class="horizontal-form-elements">
                                        <form class="form-horizontal" id="emailInfoEditForm" role="form">

                                            <div class="row" id="emailHiddenID">


                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label">目标任务</label>
                                                        <div class="col-sm-8">
                                                            <select id="emailJobEdit" name="emailJobEdit"
                                                                    title="请选择" class="selectpicker"
                                                                    data-style="form-control"
                                                                    data-width="100%" disabled="disabled">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label ">发件人</label>

                                                        <div class="col-sm-8">
                                                            <select id="senderEdit" name="senderEdit"
                                                                    title="请选择" class="selectpicker"
                                                                    data-style="form-control"
                                                                    data-width="100%">
                                                                <%--<option value="1">有效</option>
                                                                <option value="0">无效</option>--%>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label ">收件人</label>

                                                        <div class="col-sm-8">
                                                            <select id="receiverEdit" name="receiverEdit"
                                                                    title="请选择" class="selectpicker" multiple="multiple"
                                                                    data-style="form-control"
                                                                    data-width="100%">

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                    <div class="row">
                                                        <label class="col-sm-4 control-label ">抄送人</label>

                                                        <div class="col-sm-8">
                                                            <select id="copypeEdit" name="copypeEdit"
                                                                    title="请选择" class="selectpicker" multiple="multiple"
                                                                    data-style="form-control"
                                                                    data-width="100%">

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="initParamEdit"  class="row">
                                                <%--<div style="margin-left: 25px"><h4>作业参数</h4></div><hr style="width: 498px"/>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <label class="col-sm-3 control-label">
                                                            参数1
                                                        </label>
                                                        <div class="col-sm-7">
                                                            <input class="form-control" id="1" name="1"
                                                                      rows="3"></input>
                                                        </div>
                                                    </div>
                                                </div>--%>
                                            </div>


                                        </form>
                                        <!--/#form-->
                                    </div>
                                </div>
                                <%--新结束--%>
                                <div class="modal-footer">
                                    <input type="button" value="保存" id="editEmailJobInfo"  class="btn btn-primary"></input>
                                    <input type="button" value="关闭" class="btn btn-default" data-dismiss="modal"></input>
                                </div>
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
<script src="emailjob.js"></script>
</body>

</html>