package com.donbala.emailManagement.service;

import com.donbala.emailManagement.model.EmailJobModel;
import com.donbala.emailManagement.model.EmailModel;

import java.util.List;
import java.util.Map;

public interface EmailManagementService {
    Map<String, Object> insertEmailInfo(EmailModel emailModel);
    List<EmailModel> selectEmailInfo();
    Map<String, Object> startEmail(EmailModel emailModel);
    Map<String, Object> stopEmail(EmailModel emailModel);
    Map<String, Object> deleteEmail(EmailModel emailModel);
    EmailModel selectReturnEmailInfo(EmailModel emailModel);
    Map<String,Object> editEmail(EmailModel emailModel);

    List<EmailJobModel> selectEmailJobList();

    int sendEmailCommon(String theme,String content,String emailJobCode);
}
