package com.emc.rpsp.editcg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.emc.rpsp.editcg.domain.ConsistencyGroupChanges;
import com.emc.rpsp.editcg.service.EditGroupService;

@Controller
public class EditGroupController {

	@Autowired
	private EditGroupService editGroupService;


	@SuppressWarnings("unchecked")
    @RequestMapping(value = "/groups/{groupId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public
    ResponseEntity<HttpStatus> createConsistencyGroup(
        @RequestBody ConsistencyGroupChanges consistencyGroupChanges) {
		editGroupService.editConsistencyGroup(consistencyGroupChanges);
        return new ResponseEntity<>(HttpStatus.OK);
    }

	
}
