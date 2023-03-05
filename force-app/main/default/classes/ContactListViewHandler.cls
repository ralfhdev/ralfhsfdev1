public with sharing class ContactListViewHandler {
   
   @AuraEnabled(cacheable=True)
   public static List<Contact> getContacts(){
    return [SELECT Id, firstName, lastName, accountId, account.Name,
            mailingStreet, mailingCity, mailingState, mailingPostalCode, mailingCountry, email
            FROM Contact
            WITH SECURITY_ENFORCED
            LIMIT 1000];
   }

   @AuraEnabled(cacheable=True)
   public static List<Contact> searchContact(String searchString){
        List<List<SObject>> contacts = [FIND :searchString IN ALL FIELDS RETURNING Contact(FirstName, LastName, AccountId, account.Name,
        MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, Email)];
        return (List<Contact>) contacts[0]; 
   }

   @AuraEnabled
   public static void deleteContacts(List<Id> contactIds){
    if (contactIds.size() > 0){
        delete [SELECT Id FROM Contact WHERE Id in: contactIds]; 
    } 
   }
}