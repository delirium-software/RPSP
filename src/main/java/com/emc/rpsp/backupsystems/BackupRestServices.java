package com.emc.rpsp.backupsystems;

import com.emc.rpsp.backupsystems.tasks.BackupWorker;
import com.emc.rpsp.backupsystems.tasks.DisableBackupAccessTask;
import com.emc.rpsp.backupsystems.tasks.EnableImageAccessTask;
import com.emc.rpsp.backupsystems.tasks.Task;
import com.emc.rpsp.config.auditing.AuditConsts;
import com.emc.rpsp.config.auditing.annotations.RpspAuditResult;
import com.emc.rpsp.config.auditing.annotations.RpspAuditSubject;
import com.emc.rpsp.config.auditing.annotations.RpspAudited;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Created by morand3 on 1/3/2016.
 */

@Controller
public class BackupRestServices {

    @Autowired
    private BackupApi backupApi;
    @Autowired
    private VmBackupRepository vmBackupRepository;

    @RequestMapping(value = "/backup/{vm}/enable/{backup}",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @RpspAudited(action = AuditConsts.ENABLE_BACKUP_ACCESS)
    @ResponseBody
    public
    @RpspAuditResult(AuditConsts.TASK)
    ResponseEntity<Task> enableBackupAccess(
        @PathVariable("vm") String vmName,
        @PathVariable("backup") @RpspAuditSubject(AuditConsts.BACKUP_NAME) String backupName) {
        VmBackup backup = vmBackupRepository.findByName(vmName);
        Task task = new EnableImageAccessTask(backupApi, backup.getBackupSystem(), backupName);
        BackupWorker.addTask(task);
        return new ResponseEntity<Task>(task, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/backup/{vm}/disable/{backup}",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @RpspAudited(action = AuditConsts.ENABLE_BACKUP_ACCESS)
    @ResponseBody
    public
    @RpspAuditResult(AuditConsts.TASK)
    ResponseEntity<Task> disableBackupAccess(
        @PathVariable("vm") String vmName,
        @PathVariable("backup") @RpspAuditSubject(AuditConsts.BACKUP_NAME) String backupName) {
        VmBackup backup = vmBackupRepository.findByName(vmName);
        Task task = new DisableBackupAccessTask(backupApi, backup.getBackupSystem(), backupName);
        BackupWorker.addTask(task);
        return new ResponseEntity<Task>(task, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/backup/{vm}/list",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @RpspAudited(action = AuditConsts.ENABLE_BACKUP_ACCESS)
    @ResponseBody
    public ResponseEntity<List<String>> listBackups(
        @PathVariable("vm") @RpspAuditSubject(AuditConsts.BACKUP_NAME) String vmName) {
        List<String> backupList = backupApi.getBackupsList(vmName);
        return new ResponseEntity<>(backupList, HttpStatus.OK);
    }

    @RequestMapping(value = "/backup/{vm}/status",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<String>> vmBackupStatus(
        @PathVariable("vm") String vmName) {
        String accessedBackup = backupApi.getVmBackupStatus(vmName);
        List<String> res=null;
        if(null!=accessedBackup){
            res=Arrays.asList(accessedBackup);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/backup/tasks",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @RpspAudited(action = AuditConsts.ENABLE_BACKUP_ACCESS)
    @ResponseBody
    public
    @RpspAuditResult(AuditConsts.TASKS)
    ResponseEntity<Collection<Task>> listTasks() {
        return new ResponseEntity<Collection<Task>>(BackupWorker.getTasks(), HttpStatus.OK);
    }

    @RequestMapping(value = "/backup/sampleBackupSystem",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<BackupSystem> sampleBackupSystem() {
        return new ResponseEntity<>(new BackupSystem(), HttpStatus.OK);
    }
}
