/*
Author:       Ralfh Noquera
Company:      Third Pillar
Description:  Implements operation for Account Update.

History
02/23/2023    Ralfh Noquera    Initial Release
*/

public class AccountTriggerOperation {
    //Nanghingi ako ng Set of Strings 'Set<String>'
    public static void updateAllRelatedContacts(Set<String> accountIdSet){
        List<Contact> relatedContactList = new List<Contact>(); 
        List<Contact> contactsToBeUpdatedList = new List<Contact>(); 
        
        relatedContactList = [SELECT Id, Account_Status__c FROM Contact WHERE AccountId IN: accountIdSet];
        
        for (Contact cont : relatedContactList) {
            cont.Account_Status__c = 'Updated';
            contactsToBeUpdatedList.add(cont);
        }
        
        Account__e actevent = new Account__e();
        actevent.Account_Name__c = 'Testing';
        EventBus.publish(actevent);
        
        update contactsToBeUpdatedList;
    }
}