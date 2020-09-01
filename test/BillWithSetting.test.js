const assert = require('assert');

const SettingsBill = require('../settings-bill');

describe('settings-bill', function(){

    const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.recordAction('call');
        assert.equal(1, settingsBill.actionsFor('call').length);
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())


    });

    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(2.35, settingsBill.totals().smsTotal);
        assert.equal(3.35, settingsBill.totals().callTotal);
        assert.equal(5.70, settingsBill.totals().grandTotal);

    });

    it('should calculate the right totals for multiple actions', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(4.70, settingsBill.totals().smsTotal);
        assert.equal(6.70, settingsBill.totals().callTotal);
        assert.equal(11.40, settingsBill.totals().grandTotal);

    });

    it('should know when warning level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedWarningLevel());
    });

    it('should know when critical level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedCriticalLevel());

    });
});




// describe("the bill with settings factory function", function () {
//     describe("set values", function () {

//         it("should be able to set call cost", function () {
//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(10);

//             settingsBill.setCallCost(1.85);
//             assert.equal(1.85, settingsBill.getCallCost())

//             let settingsBill2 = BillWithSettings()
//             settingsBill2.setCallCost(2.75);
//             assert.equal(2.75, settingsBill2.getCallCost())

//         });

//         it("should be able to set Sms cost", function () {
//             let settingsBill = BillWithSettings()
//             settingsBill.setSmsCost(0.85);
//             assert.equal(0.85, settingsBill.getSmsCost())

//             let settingsBill2 = BillWithSettings()
//             settingsBill2.setSmsCost(0.75);
//             assert.equal(0.75, settingsBill2.getSmsCost())

//         });

//         it("should be able to set Sms cost and call cost", function () {
//             let settingsBill = BillWithSettings()
//             settingsBill.setCallCost(2.75);
//             settingsBill.setSmsCost(0.85);

//             assert.equal(0.85, settingsBill.getSmsCost())
//             assert.equal(2.75, settingsBill.getCallCost())

//         });


//         it("should be able to set the warning level", function () {
//             let settingsBill = BillWithSettings()
//             settingsBill.setWarningLevel(20);


//             assert.equal(20, settingsBill.getWarningLevel())
//             //assert.equal(2.75,settingsBill.getCallCost())

//         });

//         it("should be able to set the danger level", function () {
//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(50);


//             assert.equal(50, settingsBill.getDangerLevel())
//             //assert.equal(2.75,settingsBill.getCallCost())

//         });

//         it("should be able to set the warning and danger level", function () {

//             let settingsBill = BillWithSettings()

//             settingsBill.setWarningLevel(30);
//             settingsBill.setDangerLevel(50);


//             assert.equal(30, settingsBill.getWarningLevel())
//             assert.equal(50, settingsBill.getDangerLevel())
//             //assert.equal(2.75,settingsBill.getCallCost())

//         });

//     })





//     describe("use values", function () {
//         it("should be able to use the call cost settings", function () {

//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(10);

//             settingsBill.setCallCost(2.25);
//             settingsBill.setSmsCost(0.85);

//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();

//             assert.equal(6.75, settingsBill.getTotalCost());
//             assert.equal(6.75, settingsBill.getTotalCallCost());
//             assert.equal(0.00, settingsBill.getTotalSmsCost());
//         })

//         it("should be able to use the call cost settings for 2 calls at 1.35 each", function () {

//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(10);
//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);

//             settingsBill.makeCall();
//             settingsBill.makeCall();

//             assert.equal(2.70, settingsBill.getTotalCost());
//             assert.equal(2.70, settingsBill.getTotalCallCost());
//             assert.equal(0.00, settingsBill.getTotalSmsCost());
//         })

//         it("should be able to send 2 sms's at 0.85 each", function () {

//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(10);
//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);

//             settingsBill.sendSms();
//             settingsBill.sendSms();

//             assert.equal(1.70, settingsBill.getTotalCost());
//             assert.equal(0.00, settingsBill.getTotalCallCost());
//             assert.equal(1.70, settingsBill.getTotalSmsCost());
//         })

//         it("should be able to send 2 sms's at 0.85 each and make a call at 1.35", function () {

//             let settingsBill = BillWithSettings()
//             settingsBill.setDangerLevel(10);
//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);

//             settingsBill.sendSms();
//             settingsBill.makeCall();
//             settingsBill.sendSms();

//             assert.equal(3.05, settingsBill.getTotalCost());
//             assert.equal(1.35, settingsBill.getTotalCallCost());
//             assert.equal(1.70, settingsBill.getTotalSmsCost());
//         })

//     })

//     describe("warning level and danger level", function () {

//         it("it should return a class name of 'warning' if the warning level is reached", function () {

//             let settingsBill = BillWithSettings()

//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(5);
//             settingsBill.setDangerLevel(10);

//             // settingsBill.sendSms();
//             // settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             // settingsBill.makeCall();
//             // settingsBill.sendSms();
//             assert.equal("warning", settingsBill.totalClassName())
//         })

//         it("it should return a class name of 'danger' if the danger level has been reached", function () {

//             let settingsBill = BillWithSettings()

//             settingsBill.setCallCost(2.50);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(0);
//             settingsBill.setDangerLevel(10);

//             // settingsBill.sendSms();
//             // settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             // settingsBill.makeCall();
//             // settingsBill.sendSms();
//             assert.equal("danger", settingsBill.totalClassName())
//         })

//         it("it should stop the Total Call cost from increasing when the danger level is reached", function () {

//             let settingsBill = BillWithSettings()

//             settingsBill.setCallCost(2.50);
//             settingsBill.setSmsCost(0.85);
            
//             settingsBill.setDangerLevel(10);

            
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
            
//             assert.equal("danger", settingsBill.totalClassName())
//             assert.equal(10, settingsBill.getTotalCallCost())
//         });

//         it("it should allow the total to increase after reaching the critical level and then upping the critical level", function () {

//             let settingsBill = BillWithSettings()

//             settingsBill.setCallCost(2.50);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(8);
//             settingsBill.setDangerLevel(10);

//             // settingsBill.sendSms();
//             // settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             // settingsBill.makeCall();
//             // settingsBill.sendSms();
//             assert.equal("danger", settingsBill.totalClassName());
//             assert.equal(10, settingsBill.getTotalCallCost());

//             settingsBill.setDangerLevel(20);

//             assert.equal("warning", settingsBill.totalClassName());

//             settingsBill.makeCall();
//             settingsBill.makeCall();
//             assert.equal(15, settingsBill.getTotalCallCost());

//         });



//     });

// });
