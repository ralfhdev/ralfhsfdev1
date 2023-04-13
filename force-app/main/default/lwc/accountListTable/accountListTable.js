import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Industry', fieldName: 'Industry', type: 'text'},
    { label: 'Type', fieldName: 'Type', type: 'text'},
];

export default class AccountListTable extends LightningElement {
    accounts;
    wiredAccountsResult;
    showModal = false;

    @wire(getAccounts)
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
        }
    }

    get columns() {
        return columns;
    }

    openModal() {
        this.showModal = true;
    }

    handleSuccess() {
        this.showModal = false;
        return refreshApex(this.wiredAccountsResult);
    }

    handleCancel() {
        this.showModal = false;
    }
}

