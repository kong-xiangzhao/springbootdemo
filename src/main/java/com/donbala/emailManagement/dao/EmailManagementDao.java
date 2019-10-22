package com.donbala.emailManagement.dao;

import com.donbala.emailManagement.model.EmailJobModel;
import com.donbala.emailManagement.model.EmailModel;

import java.util.List;

public interface EmailManagementDao {
    //插入邮箱信息
    int insertEmailInfo(EmailModel emailModel);
    //查询邮箱信息
    List<EmailModel> selectEmailInfo();
    //启/停 用邮箱
    int startOrStopEmail (EmailModel emailModel);
    //删除邮箱
    int deleteEmail(EmailModel emailModel);
    //回显
    EmailModel selectReturnEmailInfo(EmailModel emailModel);
    //修改邮箱
    int editEmail(EmailModel emailModel);
    //查询每个发送任务的邮箱信息
    List<EmailModel> selectEmailInfoByCode(EmailModel emailModel);
    //发送任务表格查询
    List<EmailJobModel> selectEmailJobList();
}
