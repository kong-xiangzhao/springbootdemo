package com.donbala.emailManagement.model;

import java.io.Serializable;

/**
 * {\_/}
 * ( ^.^ )
 * / > @ zmf
 *
 * @date 2019/10/22
 */
public class EmailJobModel implements Serializable {
    //发送任务id
    private String emailJobCode;
    //发送任务名称
    private String emailJobName;
    //发件人邮箱
    private String emailSender;
    //收件人邮箱
    private String emailReceiver;
    //抄送人邮箱
    private String emailCopype;

    public String getEmailJobCode() {
        return emailJobCode;
    }

    public void setEmailJobCode(String emailJobCode) {
        this.emailJobCode = emailJobCode;
    }

    public String getEmailJobName() {
        return emailJobName;
    }

    public void setEmailJobName(String emailJobName) {
        this.emailJobName = emailJobName;
    }

    public String getEmailSender() {
        return emailSender;
    }

    public void setEmailSender(String emailSender) {
        this.emailSender = emailSender;
    }

    public String getEmailReceiver() {
        return emailReceiver;
    }

    public void setEmailReceiver(String emailReceiver) {
        this.emailReceiver = emailReceiver;
    }

    public String getEmailCopype() {
        return emailCopype;
    }

    public void setEmailCopype(String emailCopype) {
        this.emailCopype = emailCopype;
    }
}
