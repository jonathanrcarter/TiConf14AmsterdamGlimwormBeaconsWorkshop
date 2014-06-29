exports.beacons = [];


exports.ts = function() {
	return new Date().getTime();
};
exports.d3 = function(n) {
	var S = ("0000000000"+n);
	return S.substring(S.length-3);
}
exports.dp3 = function(n) {
	var S = (Math.round(n*1000)/1000);
	return S;
};

exports.addBeacons = function (beacons) {
//	var txt = ("beacon Ranges ::: \nRange : "+e.identifier+"/ state "+e.state+" is now "+e.proximity);

	for (var i = 0; i < beacons.length; i++) {
		var b = beacons[i];
		var idx = b.major+"_"+b.minor;
		if (!this.beacons[idx]) {
			this.beacons[idx] = {
				major : b.major,
				minor : b.minor,
				d : b.accuracy,
				ts : this.ts(),
				da : [Number(b.accuracy)]
			};
		} else {
			if (b.accuracy > 0) {
				this.beacons[idx].d = b.accuracy;
				this.beacons[idx].ts = this.ts();
				this.beacons[idx].da.push(Number(b.accuracy));
				if (this.beacons[idx].da.length > 10) {
					this.beacons[idx].da.shift();
				}
			}
		}
	}
};




exports.nearestData = function(e) {
	var near = 1000000000;
	var nearkey = "xxx";
	var THIS = this;
	var _ts = THIS.ts();


	var win1 = Ti.UI.createWindow({
		backgroundColor:'#006600',
	});
	
	var img1 = Ti.UI.createImageView({
		top : 0,
		width : "100%",
		height : Ti.UI.SIZE,
		image : "/images/bg.jpg"
	});
	win1.add(img1);
	
	var table = Ti.UI.createTableView({
		top : 40
	});
	win1.add(table);
	
	var close = 0;
	var update = function(e) {
		var _ts = THIS.ts();

		var rows = [];

		rows.push(Ti.UI.createTableViewRow({
			title : "XX ts : "+_ts
		}));
		
		for (var key in THIS.beacons) {
			var b = THIS.beacons[key];
			
			var avgd = 0;
			var db = "";
			for (var i=0; i < b.da.length; i++) {
				db += "\n "+i+", n:"+(b.da[i]);
				avgd += Number(b.da[i]);
			}
			var svg = (avgd / b.da.length);
			
			
			var row = Ti.UI.createTableViewRow({
				title : b.major + " / " + b.minor + " : "+ b.d + "/" + ((_ts - b.ts) / 1000) + " / " + svg + db
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
	
	
	var winclose = function(e) {
		close = 1;
	};

	win1.addEventListener('swipe',winclose);
	win1.open({modal : true});
	
	setTimeout(update,1000);
};

exports.nearest = function(e){
	var near = 1000000000;
	var nearkey = "xxx";
	var _ts = this.ts();
	
	for (var key in this.beacons) {
		var b = this.beacons[key];
		if (((_ts - b.ts) < 10000) && b.d > 0 && b.d < near) {
			nearkey = key;
			near = b.d;
		}
	} 

	var win1 = Ti.UI.createWindow({
		backgroundColor:'#000066',
	});
	
	var img1 = Ti.UI.createImageView({
		top : 0,
		width : "100%",
		height : Ti.UI.SIZE,
		image : "/images/bg.jpg"
	});
	win1.add(img1);
	
// 	win1.add(Ti.UI.createImageView({
// 		top : 0,
// 		width : Ti.UI.SIZE,
// 		height : Ti.UI.SIZE,
// 		image : "https://careforceams.herokuapp.com/"+nearkey+".jpg"
// //			image : "http://jon651.glimworm.com/ibeacon/demo/heineken/"+nearkey+".png"
// 	}));
	


	win1.add(Ti.UI.createLabel({
		text : nearkey,
		color : "#ffffff",
		font : {
			fontSize : 90
		}
	}));


// 	var xhr = Ti.Network.createHTTPClient()
// 	xhr.onload = function(e) {
// 	};
// 	xhr.onerror = function(e) {
// 	};
// 	xhr.onreadystatechange = function(e) {
// 		//actIndMsg.text = "ready state change ("+(actIndMsgCnt++)+")";
// 	};
// 	xhr.onsendstream = function(e) {
// //		if (obj.image) ind.value = e.progress ;
// 		//actIndMsg.text = "sendstream ("+(actIndMsgCnt++)+")";
// 	};
// 	xhr.ondatastream = function(e) {
// 		Titanium.API.debug(e);
// 		//actIndMsg.text = "datastream ("+(actIndMsgCnt++)+")";
// 	};
// 	xhr.open("GET","https://careforceams.herokuapp.com/demo_rest.php?name=nearest beacon : "+nearkey,true);
// 	xhr.send({});
	
	



	win1.addEventListener('swipe',function(e){
		win1.close();
	});
	win1.open({modal : true});
	


	
//		alert(ba[nearkey]);
//		alert(ba);
	
};

