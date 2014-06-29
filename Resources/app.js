// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var beaconSingleton = require("/models/beacons");


// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var WIN1 = require("/ui/common/win1");
var win1 = new WIN1();
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Single Button',
    window:win1
});

//
// create controls tab and root window
//
var WIN2 = require("/ui/common/win2");
var win2 = new WIN2();

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Ranging',
    window:win2
});


//
// create controls tab and root window
//
var WIN3 = require("/ui/common/win3");
var win3 = new WIN3();

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Indoor Nav',
    window:win3
});


//
// create controls tab and root window
//
var WIN4 = require("/ui/common/win4");
var win4 = new WIN4();

var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Indoor Nav',
    window:win4
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  


// open tab group
tabGroup.open();






var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);

TiBeacons.addEventListener("beaconRanges", function(e){
	Ti.API.debug({
		event : "beaconRanges",
		e : e
	});
	beaconSingleton.addBeacons(e.beacons);
});

var alertMonitor = function(e) {
	var txt = ("monitoring ::: \nRange : "+e.identifier+"/ state "+e.regionState+"\n "+e.type +"\n "+JSON.stringify(e));
	Ti.API.debug({
		fn : "alertMonitor",
		txt : txt,
		e : e
	});
};

TiBeacons.addEventListener("enteredRegion", alertMonitor);
TiBeacons.addEventListener("exitedRegion", alertMonitor);
TiBeacons.addEventListener("determinedRegionState", alertMonitor);
TiBeacons.enableAutoRanging();

Ti.App.addEventListener('app:start:ranging', function() {
	TiBeacons.startMonitoringForRegion({
	    uuid: "74278BDA-B644-4520-8F0C-720EAF059935",
	    identifier : "Test Region 1"
	});
})

/* other handy commands */

// TiBeacons.addEventListener("beaconProximity", function(e){
// Ti.API.info(e);
// label1.text = ("beaconProximity::\nbeacon "+e.major+"/"+e.minor+" is now "+e.proximity);
// 	
// });

// TiBeacons.addEventListener("beaconProximity", function(e){
// alert("beacon "+e.major+"/"+e.minor+" is now "+e.proximity);
// });


// look for iBeacons
// TiBeacons.startRangingForBeacons({
// uuid: "74278BDA-B644-4520-8F0C-720EAF059935",
// identifier: "TiBeacon Test"
// });


// or if you want to be an iBeacon
// TiBeacons.startAdvertisingBeacon({
// uuid: "00000000-0000-0000-0000-000000000000",
// identifier: "TiBeacon Test",
// major: 123,
// minor: 456
// });

