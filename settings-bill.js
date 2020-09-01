module.exports = function BillWithSetting() {

    var smsCost;
    var callCost;
    var warningLevel;
    var criticalLevel;

    var actionList = [];

    var callCostTotal = 0;
    var SmsCostTotal = 0;

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {

        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        var cost = 0;
        if (action === 'sms') {

            SmsCostTotal += smsCost;
            cost = smsCost;
        }
        else if (action === 'call') {
            callCostTotal += callCost;
            cost = callCost;
        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });



    }

    function actionList (){

        return actionList
    }

    function actionsFor(actionType) {

        // create a new empty list
        const filteredActions = [];

        // filter for the 

        // loop over actionList
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];



            // check if the current entry's type is equal to actionType
            // if it is add it to the newly created list

            if (action.type === actionType) {


                // if the loop is done...
                // return the values in the newly created list
                filteredActions.push(action);

            }
        }


        return filteredActions;

    }




    function hasReachedWarningLevel() {
        const total = getTotalCost();
        const reachedWarningLevel = total >= warningLevel
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = getTotalCost();
        return total >= criticalLevel;
    }

    function getTotalCost() {
        return callTotalBill() + smsTotalBill();
    }


    function callTotalBill() {
        return callCostTotal
    }

    function smsTotalBill() {
        return SmsCostTotal
    }

    function getTotal(type) {
        let total = 0;

        //    for (let i = 0; i< actionList.length; i++) {
        //      const element = actionList[i].type;
        //       if (element == type) {
        //           total += 
        //       }
        //    }
    }


    function setWarningLevel(WarningLevel) {

        theWarningLevel = WarningLevel;

    }

    function getWarningLevel() {

        return theWarningLevel;

    }

    function totalClassName() {

        if (hasReachedCriticalLevel()) {

            return "danger"
        }

        if (hasReachedWarningLevel()) {

            return "warning"
        }
    }


    function totals() {
        let smsTotal = smsTotalBill()
        let callTotal = callTotalBill()
        return {
            smsTotal,
            callTotal,
            grandTotal: getTotalCost(),
            colour: totalClassName()
        }
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        getTotalCost,
        totals,
        getTotal,
        setWarningLevel,
        getWarningLevel,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalClassName,
        actionsFor,
        actionList



    }
}


// module.exports = function BillWithSetting() {


//     var theCallCost = 0;
//     var theSmsCost = 0;
//     var theWarningLevel = 0;
//     var criticalLevel = 0;
//     var actionList = [];


//     var callCostTotal = 0;

//     var SmsCostTotal = 0;


//     function setCallCost(callCost) {

//         theCallCost = callCost;

//     }

//     function setSettings(settings) {
//         smsCost = Number(settings.smsCost);
//         callCost = Number(settings.callCost);
//         warningLevel = settings.warningLevel;
//         criticalLevel = settings.criticalLevel;
//     }

//     function getSettings() {

//         return {
//             theCallCost,
//             theSmsCost,
//             theWarningLevel,
//             criticalLevel
//         }
//     }

//     function recordAction(action) {

//         if (action === 'sms') {

//             SmsCostTotal =+ theSmsCost;
//             cost =+ theSmsCost;
//         }
//         else if (action === 'call') {
//             callCostTotal =+ theCallCost;
//             cost =+ theCallCost;
//         }

//         actionList.push({
//             type: action,
//             cost,
//             timestamp: new Date()
//         });

//     }

//     function actions() {

//         return actionList;
//     }


//     function getCallCost() {

//         return theCallCost;

//     }


//     function setSmsCost(SmsCost) {

//         theSmsCost = SmsCost;

//     }


//     function getSmsCost() {

//         return theSmsCost;

//     }

//     function setWarningLevel(WarningLevel) {

//         theWarningLevel = WarningLevel;

//     }

//     function getWarningLevel() {

//         return theWarningLevel;

//     }

//     function criticalLevel(criticalLevel) {

//         theDangerLevel = criticalLevel;

//     }

//     function getDangerLevel() {

//         return theDangerLevel;

//     }

//     function totals() {
//         let smsTotal = getTotalSmsCost()
//         let callTotal = getTotalCallCost()
//         return {
//             smsTotal,
//             callTotal,
//             grandTotal : getTotalCost()
//         }
//     }

//     function makeCall() {
//         if (!hasReachedDangerLevel()) {

//             callCostTotal += theCallCost;

//         }

//     }

//     function getTotalCost() {
//         return callCostTotal + SmsCostTotal;

//     }

//     function getTotalCallCost() {
//         return callCostTotal;

//     }

//     function getTotalSmsCost() {
//         return SmsCostTotal;

//     }

//     function sendSms() {
//         if (!hasReachedDangerLevel()) {

//             SmsCostTotal += theSmsCost;
//         }
//     }

//     function hasReachedDangerLevel() {
//         return getTotalCost() >= getDangerLevel();

//     }

//     function totalClassName() {

//         if (hasReachedDangerLevel()) {

//             return "danger"
//         }

//         if (getTotalCost() >= getWarningLevel()) {

//             return "warning"
//         }
//     }


//     return {
//         setCallCost,
//         getCallCost,
//         setSmsCost,
//         getSmsCost,
//         setWarningLevel,
//         getWarningLevel,
//         criticalLevel,
//         getDangerLevel,
//         makeCall,
//         getTotalCost,
//         getTotalCallCost,
//         getTotalSmsCost,
//         sendSms,
//         totalClassName,
//         getSettings,
//         recordAction,
//         actions,
//         setSettings,
//         totals
//     }

// }