import { LightningElement , wire} from 'lwc';

import getContacts from "@salesforce/apex/ContactListViewHandler.getContacts"
import searchContact from "@salesforce/apex/ContactListViewHandler.searchContact"
import deleteContacts from "@salesforce/apex/ContactListViewHandler.deleteContacts"

import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';


const ACTIONS = [{label: 'Delete', name: 'delete'}]

const COLS = [{label: 'Name', fieldName: 'link', type: 'url', typeAttributes: {label: {fieldName: 'FullName'}}},
            {label: 'Email', fieldName: 'Email'},
            {label: 'Account', fieldName: 'accountLink', type: 'url', typeAttributes: {label: {fieldName: 'AccountName'}}},
            {label: 'Mailing Address', fieldName: 'MailingAddress'},
            {fieldName: 'actions', type: 'action', typeAttributes:{rowActions: ACTIONS}}
]  
export default class ContactListView extends NavigationMixin(LightningElement) {
    cols = COLS;
    contacts;
    wiredContacts;
    selectedContacts;
    baseData;

    get selectedContactsLen() {
        if(this.selectedContacts == undefined) return 0;
        return this.selectedContacts.length;
    }

    @wire(getContacts)
    contactsWire(result){
        this.wiredContacts = result;
        if(result.data){
            this.contacts = result.data.map((row) => {
                return this.mapContacts(row);
            })
            this.baseData = this.contacts;
        }
        if(result.error){
            console.error(result.error);
        }
    }

    mapContacts(row){
        var accountName = '';
        var accountLink = '';
        if (row.AccountId != undefined) {
            accountLink = `/${row.AccountId}`;
            accountName = row.Account['Name'];
        }

        var mStreet = row.MailingStreet;
        var mCity = row.MailingCity;
        var mState = row.MailingState;
        var mPostalCode = row.MailingPostalCode;
        var mCountry = row.MailingCountry;

        if (row.MailingStreet == undefined) {
            mStreet = '';
        }
        if (row.MailingCity == undefined) {
            mCity = '';
        }
        if (row.MailingState == undefined) {
            mState = '';
        }
        if (row.MailingPostalCode == undefined) {
            mPostalCode = '';
        }
        if (row.MailingCountry == undefined) {
            mCountry = '';
        }
        
        return {...row,
            FullName: `${row.FirstName} ${row.LastName}`,
            link: `/${row.Id}`,
            accountLink: accountLink,
            AccountName: accountName,
            MailingAddress: `${mStreet} ${mCity} ${mState} ${mPostalCode} ${mCountry}`
        };
    }

    handleRowSelection(event){
        this.selectedContacts = event.detail.selectedRows;
    }

    async handleSearch(event){
        if(event.target.value == ""){
            this.contacts = this.baseData
        } else if (event.target.value.length > 1){
            const searchContacts = await searchContact({searchString: event.target.value})
            this.contacts = searchContacts.map(row =>{
                return this.mapContacts(row);
            })
        }
    }

    navigateToNewRecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                    objectApiName: 'Contact',
                    actionName: 'new'
            }
        });
    }

    handleRowAction(event){
        deleteContacts({contactIds : [event.detail.row.Id]}).then(() => {
            refreshApex(this.wiredContacts);
        })
    }

    deleteSelectedContacts(){
        const IdList = this.selectedContacts.map( row => { return row.Id })
        deleteContacts({contactIds : IdList}).then(() => {
            refreshApex(this.wiredContacts);
        })
        this.template.querySelector('lightning-datatable').selectedRows = []; 
        this.selectedContacts = undefined;
    }
}