({
    doInit : function(component, event, helper) {
        let workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function (response) {
            let focusedTabId = response.tabId;
            workspaceAPI
            .setTabLabel({
                tabId: focusedTabId,
                label: "Account List"
            })
            .then(function (response) {
                workspaceAPI.setTabIcon({
                    icon: "standard:avatar",
                });
            })
        });
    }
})