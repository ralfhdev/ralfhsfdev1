/*
Author:       Ralfh Noquera
Company:      Third Pillar
Description:  Trigger class for Account.

History
02/23/2023    Ralfh Noquera    Initial Release
*/

trigger AccountTrigger on Account (after update) {
    
    //Use as storage for all the account Id field
    Set<String> accountIdSet = new Set<String>();
    
	//Loop inside old records of all the Accounts 
    for (Account oldAccount : Trigger.old) {
        //Loop inside the records of all the updated Accounts 
        for (Account updatedAccount : Trigger.new) {
            //Add account Id field in the accountIdSet
            if (updatedAccount.Id == oldAccount.Id) { //Use Id to make sure that it is comparing the same record
                if (updatedAccount.Type != oldAccount.Type) { //Compare if the changes were made on the old account type field
                    accountIdSet.add(updatedAccount.Id);
                }
            }
        }
    }   
    
    //Binigay ko yung Set of Strings 'accountIdSet'
    //Magpporseso ng update of related contacts
    AccountTriggerOperation.updateAllRelatedContacts(accountIdSet);
    
    system.debug('Result accountIdSet: ' + accountIdSet);
}