import { LightningElement } from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';

export default class EmpApiLWC extends LightningElement {
    result = '';
    channelName = '/event/Test__e';
    isSubscribed = false;
    subscription;

    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;

    subscription = {};

    connectedCallback() {
        if (!isEmpEnabled) {
            console.log('Dont support EMP');
            return;
        }

        setDebugFlag(true);
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }

    get subscriptionButtonLabel() {
        return this.isSubscribed ?  "Unsubscribe" : "Subscribe";
    }

    handleChannelNameChange({ target }){
        this.channelName = target.value;
    }

    handleSubscription () {
        if (!this.channelName) return;
        
        if (!this.isSubscribed) {
            this.handleSubscribe();
        } else {
            this.handleUnsubscribe();
        }
    }

    handleSubscribe() {
        const messageCallback = (response) => {
            this.result = JSON.stringify(response, null, 2);
        };

        subscribe(this.channelName, -1, messageCallback)
            .then((response) => {
            this.subscription = response;
            this.isSubscribed = true;
        });
    }

    handleUnsubscribe() {
        unsubscribe(this.subscription, (response) => {
            this.isSubscribed = false;
            this.result = '';
        });
    }   
}