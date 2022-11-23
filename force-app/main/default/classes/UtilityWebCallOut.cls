/*
Author:       Ralfh Noquera
Company:      Third Pillar
Description:  Implements operation from Utility Web Callout.

History
11/21/2022	Ralfh Noquera	Initial Release
11/23/2022	Ralfh Noquera	Update
*/

public class with sharing UtilityWebCallOut {     
    public static Web_Services_Credential__mdt getCustomMtdataByName(String webServiceName){
        return [SELECT Accept__c, Authorization__c, ClientId__c, ClientSecret__c, Content_Type__c, Endpoint__c, Timeout__c FROM Web_Services_Credential__mdt WHERE MasterLabel =: webServiceName LIMIT 1];
    }  
     
    public static HttpResponse sendAPIRequest(String endPoint, String contentType, String clientId, String clientSecret, String auth, String jsonBody, String methodType, Integer timeOut){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPoint);
        request.setHeader('Content-Type', contentType);
        request.setHeader('Client-Id', clientId);
        request.setHeader('Client-Secret', clientSecret);
        request.setHeader('Authorization', auth);
        request.setBody(jsonBody);
        request.setMethod(methodType);
        request.setTimeout(timeOut);
        HttpResponse response = new HttpResponse();
        response = http.send(request);
        return response;
    }
}