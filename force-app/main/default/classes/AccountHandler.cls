/*
Author:       Ralfh Noquera
Company:      Third Pillar
Description:  Implements operation from SF API Callout.

History
11/3/2022	Ralfh Noquera	Initial Release
*/

public class AccountHandler {
    public static String getAccountRecords(String apiUserName){
        API_User__c au = API_User__c.getValues('');   
        Identification__c id = new Identification__c(); 
        /*String clientId =  webServiceList[0].Client_ID__c;
        String clientSecret =  webServiceList[0].Client_Secret__c; 
        String endPoint =  webServiceList[0].URL__c;
        String methodType =  webServiceList[0].Method_Type__c;
        Integer timeOut =  Integer.valueOf(webServiceList[0].Timeout__c);
        String retMessage = '';*/
        
        return '';
    }
}