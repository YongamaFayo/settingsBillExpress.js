const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
const moment = require('moment');
moment().format();

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.static('public'));

    
app.get('/', function (req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.totalClassName()

    });
});

app.post('/settings', function (req, res) {

    const callCost = req.body.callCost
    const smsCost = req.body.smsCost
    const warningLevel = req.body.warningLevel
    const criticalLevel = req.body.criticalLevel

    settingsBill.setSettings({
        callCost,
        smsCost,
        warningLevel,
        criticalLevel
    })

    res.redirect('/')
});

app.post('/action', function (req, res) {

    settingsBill.recordAction(req.body.actionType)

    res.redirect('/')

})

app.get('/actions', function (req, res) {

    // console.log(settingsBill.totalClassName());
    var actionList = settingsBill.actions()
console.log(actionList)
    for (var key of actionList) {
        key.ago = moment(key.timestamp).fromNow()
    }
    res.render('actions', {   
        actions:  actionList
    });

});



app.get('/actions/:type', function (req, res) {

    const actionType = req.params.type;

    const actionLists = settingsBill.actionsFor(actionType)
    for (const key of actionLists) {
        key.ago = moment(key.timestamp).fromNow()
    }

    res.render('actions', {

        actions:actionLists

    });

})
const PORT = process.env.PORT || 3014;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})


