var beaconSingleton = require("/models/beacons");

function fn(obj) {
	//create object instance, a parasitic subclass of Observable

	var self = Ti.UI.createWindow({
		width : '100%',
		height : '100%',
		navBarHidden : false,
		title : "Single Button App",
		navTintColor : "#ffffff",
		barColor : "#F19539",
		backgroundColor : "#eeeeee",
		backgroundImage : "/images/bg.jpg",
		top : 0
 	});

 	var r = Ti.UI.createButton({
 		title : "start"
 	});
 	self.rightNavButton = r;
	r.addEventListener("click", function() {
		Ti.App.fireEvent('app:start:ranging');
	})


	var img = Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		image : "/images/fg.png"
	});

	self.add(img);


	var nearest = function(e) {
		beaconSingleton.nearest(e);	
	};
	var nearestData = function(e) {
		beaconSingleton.nearestData(e);	
	};
	img.addEventListener("longpress",nearest);

	// TiBeacons.startRangingForBeacons({
	//     uuid: "74278BDA-B644-4520-8F0C-720EAF059935",
	//     identifier: "TiBeacon Test"
	// });



	return self;
}

module.exports = fn;