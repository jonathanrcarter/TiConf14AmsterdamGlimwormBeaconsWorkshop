var beaconSingleton = require("/models/beacons");

function fn(obj) {
	//create object instance, a parasitic subclass of Observable

	var self = Ti.UI.createWindow({
		width : '100%',
		height : '100%',
		navBarHidden : false,
		title : "Indoor Navigation Demo",
		navTintColor : "#ffffff",
		barColor : "#F19539",
		backgroundColor : "#eeeeee",
		top : 0
 	});

	var near = 1000000000;
	var nearkey = "xxx";
	var THIS = this;
	var _ts = beaconSingleton.ts();
	

	var view = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : 0
	});
	self.add(view);

	var squares = [];
	var max_x = 0;
	var max_y = 0;

	var SZ = 50;
	var grid = 2; // in meters

	
	var close = 0;
	var update = function(e) {
		var _ts = beaconSingleton.ts();

		var rows = [];

		rows.push(Ti.UI.createTableViewRow({
			title : "XX ts : "+_ts
		}));
		
		for (var key in beaconSingleton.beacons) {
			var b = beaconSingleton.beacons[key];
			if (Number(b.major) < 20 && Number(b.major) > max_x) max_x = Number(b.major);
			if (Number(b.minor) < 20 && Number(b.minor) > max_y) max_y = Number(b.minor);
		}

		for (var x = 1; x <= max_x; x++) {
			if ((x < squares.length) === false) {
				squares[x] = [];
			};
			for (var y = 1; y <= max_y; y++) {
				if ((y < squares[x].length) === false) {
					squares[x][y] = Ti.UI.createView({});
					view.add(squares[x][y]); 

					squares[x][y].add(Ti.UI.createLabel({

					}));

				};

				var b = {
					d : 0,
					bc : "#cccccc"
				};
				if (beaconSingleton.beacons[x+"_"+y]) {
//					b.d = beaconSingleton.beacons[x+"_"+y].d;
					b.bc = "#00cc00";

					var avgd = 0;
					for (var i=0; i < beaconSingleton.beacons[x+"_"+y].da.length; i++) {
						avgd += Number(beaconSingleton.beacons[x+"_"+y].da[i]);
					}
					var svg = (avgd / beaconSingleton.beacons[x+"_"+y].da.length);
					b.d = svg;

				}

				var SZZ = (b && b.d) ? (b.d) * (SZ/grid) : 0;
				var SZZ_half = (SZZ == 0) ? 0 : (SZZ/2);
				squares[x][y].setCenter({
					x : (y*SZ),
					y : (x*SZ)
				});


				var opv = Math.min(4,Number(b.d));		//	0.6 = 0.6
				var opv2 = 4 - opv;						// 0.6 = 3.4
				var op = (opv2/8);		// always at least 0.5

				squares[x][y].width = SZZ;
				squares[x][y].height = SZZ;
				squares[x][y].borderRadius = SZZ_half;
				squares[x][y].borderWidth = 1;
				squares[x][y].borderColour = "#000000";
				squares[x][y].backgroundColor = b.bc;
				squares[x][y].opacity = op;
				//squares[x][y].visible = (b.d !== 0 && (((_ts - b.ts)/1000) < 5));


				squares[x][y].children[0].text = x+"_"+y;
			}
		}
		if (close == 0) {
			setTimeout(update,1000);
		} else {
			win1.close();
		}
	};

	self.addEventListener("open", function() {
		setTimeout(update,1000);
	});
	

	return self;
}

module.exports = fn;