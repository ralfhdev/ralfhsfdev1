import { LightningElement, api } from 'lwc';

export default class ContactCustomRecordPage extends LightningElement {
    @api recordId;
    customField;

    connectedCallback() {
        // Replace 'Custom_Field__c' with the API name of your custom field
        // This example assumes that the custom field is a text field
        this.customField = 'Loading...';
        this.loadCustomField();
    }

    async loadCustomField() {
        const fields = ['Custom_Field__c'];
        const record = await this.fetchRecord(fields);
        this.customField = record.Custom_Field__c;
    }

    async fetchRecord(fields) {
        const response = await fetch(`/services/data/v52.0/sobjects/Contact/${this.recordId}?fields=${fields.join(',')}`);
        const data = await response.json();
        return data;
    }
}
