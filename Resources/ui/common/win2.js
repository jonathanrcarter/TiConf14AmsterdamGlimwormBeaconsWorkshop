var beaconSingleton = require("/models/beacons");

function fn(obj) {
	//create object instance, a parasitic subclass of Observable

	var self = Ti.UI.createWindow({
		width : '100%',
		height : '100%',
		navBarHidden : false,
		title : "Ranging Demo",
		navTintColor : "#ffffff",
		barColor : "#FA9B1E",
		backgroundColor : "#eeeeee",
		top : 0
 	});

 	var r = Ti.UI.createButton({
 		title : "START"
 	});
 	self.rightNavButton = r;
	r.addEventListener("click", function() {
		Ti.App.fireEvent('app:start:ranging');
	})

	var near = 1000000000;
	var nearkey = "xxx";
	var THIS = this;
	var _ts = beaconSingleton.ts();
	
	var table = Ti.UI.createTableView({
		top : 0
	});
	self.add(table);
	
	var close = 0;
	var update = function(e) {
		var _ts = beaconSingleton.ts();

		var rows = [];

		rows.push(Ti.UI.createTableViewRow({
			title : "XX ts : "+_ts
		}));
		
		for (var key in beaconSingleton.beacons) {
			var b = beaconSingleton.beacons[key];
			
			var avgd = 0;
			var db = "";
			for (var i=0; i < b.da.length; i++) {
				db += "\n "+i+", n:"+(b.da[i]);
				avgd += Number(b.da[i]);
			}
			var svg = beaconSingleton.dp3(avgd / b.da.length);
			
			
			var row = Ti.UI.createTableViewRow({
				title : beaconSingleton.d3(b.major) + " / " + beaconSingleton.d3(b.minor) + " : d"+ beaconSingleton.dp3(b.d) + "/t" + beaconSingleton.dp3((_ts - b.ts) / 1000) + " / " + svg + db,
				height : 32,
				backgroundColor : (((_ts - b.ts)/1000) < 5) ? "#ffffff" : "#cccccc"

			});
			rows.push(row);
		} 
		table.setData(rows);
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