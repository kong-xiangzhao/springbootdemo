package com.donbala.emailManagement.service.impl;

import ch.qos.logback.classic.Logger;
import com.donbala.emailManagement.dao.EmailManagementDao;
import com.donbala.emailManagement.model.EmailJobModel;
import com.donbala.emailManagement.model.EmailModel;
import com.donbala.emailManagement.service.EmailManagementService;
import com.donbala.emailManagement.util.EmailSender;
import com.donbala.util.DateUtil;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * {\_/}
 *( ^.^ )
 * / > @ zmf
 *
 * @date 2019/10/17
 */
@Service
public class EmailManagementServiceImpl implements EmailManagementService {
    public final static Logger log = (Logger) LoggerFactory.getLogger(EmailManagementServiceImpl.class);

    @Autowired
    private EmailManagementDao emailManagementDao;
    /**
     * 新增邮件信息
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/17 16:09
     * @param emailModel 1
     * @return java.util.Map<java.lang.String,java.lang.Object>
     */
    @Override
    @Transactional
    public Map<String, Object> insertEmailInfo(EmailModel emailModel) {
        Map<String,Object> map = new HashMap<>();
        String date = DateUtil.getSysDate();
        emailModel.setMakeDate(date);
        emailModel.setModifyDate(date);
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        emailModel.setId(uuid);
        try {
            //新增前做只有一个发件人校验--以后
            emailManagementDao.insertEmailInfo(emailModel);

            map.put("code", "200");
            map.put("status", "success");
            map.put("msg", "邮箱新增成功");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code", "500");
            map.put("status", "error");
            map.put("msg", "邮箱新增失败");
        }
        return map;
    }
    /**
     * 查询邮箱信息
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 10:51
     * @param
     * @return java.util.List<com.donbala.emailManagement.model.EmailModel>
     */
    @Override
    public List<EmailModel> selectEmailInfo() {
        return emailManagementDao.selectEmailInfo();
    }
    /**
     * 启用
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 11:17
     * @param emailModel 1
     * @return java.util.Map<java.lang.String,java.lang.Object>
     */
    @Override
    public Map<String, Object> startEmail(EmailModel emailModel) {
        Map<String,Object> map = new HashMap<>();
        emailModel.seteStatus("1");
        try {
            emailManagementDao.startOrStopEmail(emailModel);
            map.put("code", "200");
            map.put("status", "success");
            map.put("msg", "邮箱启用成功");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code", "200");
            map.put("status", "error");
            map.put("msg", "邮箱启用失败");
        }
        return map;
    }
    /**
     * 停用
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 11:17
     * @param emailModel 1
     * @return java.util.Map<java.lang.String,java.lang.Object>
     */
    @Override
    public Map<String, Object> stopEmail(EmailModel emailModel) {
        Map<String,Object> map = new HashMap<>();
        emailModel.seteStatus("0");
        try {
            emailManagementDao.startOrStopEmail(emailModel);
            map.put("code", "200");
            map.put("status", "success");
            map.put("msg", "邮箱启用成功");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code", "200");
            map.put("status", "error");
            map.put("msg", "邮箱启用失败");
        }
        return map;
    }
    /**
     * 删除邮箱
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 14:02
     * @param emailModel 1
     * @return java.util.Map<java.lang.String,java.lang.Object>
     */
    @Override
    public Map<String, Object> deleteEmail(EmailModel emailModel) {
        Map<String,Object> map = new HashMap<>();
        emailManagementDao.deleteEmail(emailModel);
        map.put("code", "200");
        map.put("status", "success");
        map.put("msg", "邮箱删除成功");
        return map;
    }
    /**
     * 回显
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 14:30
     * @param emailModel 1
     * @return com.donbala.emailManagement.model.EmailModel
     */
    @Override
    public EmailModel selectReturnEmailInfo(EmailModel emailModel) {
        return emailManagementDao.selectReturnEmailInfo(emailModel);
    }
    /**
     * 修改
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/18 15:24
     * @param emailModel 1
     * @return int
     */
    @Override
    @Transactional
    public Map<String,Object> editEmail(EmailModel emailModel) {
        Map<String,Object> map = new HashMap<>();
        String date = DateUtil.getSysDate();
        emailModel.setModifyDate(date);
        //修改前做只有一个发件人校验--以后
        emailManagementDao.editEmail(emailModel);
        map.put("code", "200");
        map.put("status", "success");
        map.put("msg", "邮箱修改成功");
        return map;
    }
    /**
     * 发送任务表格查询
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/22 10:49
     * @param
     * @return java.util.List<com.donbala.emailManagement.model.EmailJobModel>
     */
    @Override
    public List<EmailJobModel> selectEmailJobList() {
        return emailManagementDao.selectEmailJobList();
    }

    /**
     * 发邮件公共方法
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/21 10:27
     * @param theme 邮件主题
     * @param content 邮件内容
     * @param emailJobCode 发送任务id
     * @return int
     */
    @Override
    public int sendEmailCommon(String theme,String content,String emailJobCode) {

        String host = "";
        String user = "";
        String password = "";
        String sender = "";
        String copype = "";
        String nickName = "";
        String errMsg = "";

        List<String> receviceList = new ArrayList<>();
        List<String> copypeList = new ArrayList<>();

        EmailModel emailModel = new EmailModel();
        emailModel.setEmailJobCode(emailJobCode);

        List<EmailModel> eList = emailManagementDao.selectEmailInfoByCode(emailModel);

        for (int i = 0; i <eList.size() ; i++) {
            EmailModel em=eList.get(i);
            //发送人
            if(em.geteRole().equals("S")){
                host = em.geteHost();
                user = em.getEmail();
                password = em.getePassword();
                nickName = em.getNickName();
            }
            //收件人
            if(em.geteRole().equals("R")){
                receviceList.add(em.getEmail());
            }
            //抄送人
            if(em.geteRole().equals("C")){
                copypeList.add(em.getEmail());
            }
        }
        sender = listTOStringOfComma(receviceList);
        copype = listTOStringOfComma(copypeList);

        if(user.equals("")){
            errMsg = "发件人邮箱没有或停用，不发邮件";
            //记录邮件日志

            return 0;
        }
        if(sender.equals("")){
            errMsg = "收件人邮箱没有或停用，不发邮件";
            //记录邮件日志

            return 0;
        }
        Map<String, Object> emailMap = new HashMap<>();
        emailMap.put("host", host);//邮箱服务器
        emailMap.put("user", user);//发件人
        emailMap.put("password", password);//密码
        emailMap.put("receivers", sender);//收件人
        emailMap.put("copies", copype);//抄送人
        emailMap.put("nickName", nickName);//昵称
        emailMap.put("content", content);//内容
        emailMap.put("subject", theme);//主题
        errMsg = EmailSender.sendEmail(emailMap, 2);

        if(errMsg.equals("success")){
            //记录邮件日志

            return 1;
        }else {
            //记录邮件日志

            return 0;
        }

    }


/*    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
//        list.add("1");
//        list.add("2");
//        list.add("3");
//        list.add("4");

        EmailManagementServiceImpl e = new EmailManagementServiceImpl();

        System.out.println(e.listTOStringOfComma(list).equals(""));
    }*/
    /**
     * list集合中的各个字符串转化成用逗号(,)拼接的大字符串
     *  {\_/}
     * ( ^.^ )
     *  / > @ zhangmaofei
     * @date 2019/10/21 10:41
     * @param list 1
     * @return java.lang.String
     */
    public String listTOStringOfComma(List<String> list){
        StringBuffer sb = new StringBuffer();
        for (int i=0;i<list.size();i++) {
            if(i<list.size()-1){
                sb.append(list.get(i));
                sb.append(",");
            }else {
                sb.append(list.get(i));
            }
        }
        return sb.toString();
    }

}
