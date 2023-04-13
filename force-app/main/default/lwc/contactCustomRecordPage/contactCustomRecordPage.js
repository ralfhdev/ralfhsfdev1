import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.Account.Name';
import MAILING_STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import MAILING_CITY_FIELD from '@salesforce/schema/Contact.MailingCity';
import MAILING_STATE_FIELD from '@salesforce/schema/Contact.MailingState';
import MAILING_POSTAL_CODE_FIELD from '@salesforce/schema/Contact.MailingPostalCode';
import MAILING_COUNTRY_FIELD from '@salesforce/schema/Contact.MailingCountry';

export default class ContactDetail extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ACCOUNT_FIELD, MAILING_STREET_FIELD, MAILING_CITY_FIELD, MAILING_STATE_FIELD, MAILING_POSTAL_CODE_FIELD, MAILING_COUNTRY_FIELD] })
    contact;

    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }

    get email() {
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }

    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }

    get account() {
        return getFieldValue(this.contact.data, ACCOUNT_FIELD);
    }

    get mailingStreet() {
        return getFieldValue(this.contact.data, MAILING_STREET_FIELD);
    }

    get mailingCity() {
        return getFieldValue(this.contact.data, MAILING_CITY_FIELD);
    }

    get mailingState() {
        return getFieldValue(this.contact.data, MAILING_STATE_FIELD);
    }

    get mailingPostalCode() {
        return getFieldValue(this.contact.data, MAILING_POSTAL_CODE_FIELD);
    }

    get mailingCountry() {
        return getFieldValue(this.contact.data, MAILING_COUNTRY_FIELD);
    }
}