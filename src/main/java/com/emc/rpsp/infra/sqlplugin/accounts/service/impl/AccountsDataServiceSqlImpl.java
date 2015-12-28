package com.emc.rpsp.infra.sqlplugin.accounts.service.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emc.rpsp.accounts.domain.Account;
import com.emc.rpsp.accounts.domain.AccountConfig;
import com.emc.rpsp.accounts.repository.AccountRepository;
import com.emc.rpsp.infra.common.accounts.service.AccountsDataService;
import com.emc.rpsp.packages.domain.PackageDefinition;

@Service
public class AccountsDataServiceSqlImpl implements AccountsDataService {
	
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public List<Account> findAll() {
		List<Account> accounts = accountRepository.findAll();
		return accounts;
	}

	@Override
	public List<AccountConfig> findAccountConfigsByAccount(Account account) {
		List<AccountConfig> res = new LinkedList<AccountConfig>();
		List<PackageDefinition> packageDefs = account.getPackages();
		for(PackageDefinition currPackageDefinition : packageDefs){
			AccountConfig prodConfig = new AccountConfig();
			prodConfig.setIsProductionCluster(true);
			prodConfig.setClusterId(currPackageDefinition.getSourceClusterId());
			prodConfig.setVcId(currPackageDefinition.getSourceVcId());
			prodConfig.setDataCenterId(currPackageDefinition.getSourceDataCenterId());
			prodConfig.setEsxClusterId(currPackageDefinition.getSourceEsxClusterId());
			prodConfig.setEsxId(currPackageDefinition.getSourceEsxId());
			prodConfig.setDatastoreId(currPackageDefinition.getSourceDatastoreId());
			res.add(prodConfig);
			
			AccountConfig replicaConfig = new AccountConfig(); 
			replicaConfig.setIsProductionCluster(false);
			replicaConfig.setClusterId(currPackageDefinition.getTargetClusterId());
			replicaConfig.setVcId(currPackageDefinition.getTargetVcId());
			replicaConfig.setDataCenterId(currPackageDefinition.getTargetDataCenterId());
			replicaConfig.setEsxClusterId(currPackageDefinition.getTargetEsxClusterId());
			replicaConfig.setEsxId(currPackageDefinition.getTargetEsxId());
			replicaConfig.setDatastoreId(currPackageDefinition.getTargetDatastoreId());
			res.add(replicaConfig);
		}
		return res;
		//return account.getAccountConfigs();
		
	}

}
