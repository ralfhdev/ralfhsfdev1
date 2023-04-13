public with sharing class ContactDetailController {
    @AuraEnabled(cacheable=true)
    public static Contact getContact(String contactId) {
        return [SELECT Id, Name, Email, Phone, Account.Name, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry
        FROM Contact
        WHERE Id = :contactId
        WITH SECURITY_ENFORCED];
    }
}