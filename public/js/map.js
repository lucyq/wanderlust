var map;

var mapOptions = {
	zoom: 5,
	center: BLS, 
	mapTypeId: google.maps.MapTypeId.ROADMAP
};


function init() {
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	request.open("GET", "/group_data", true);

	request.send();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			data = JSON.parse(request.responseText);
			storeData();
			renderMarkers();
		}
	};
}


function renderMarkers() {
	for (var i = 0; i < group_data.length; i++) {

		var pos = new google.maps.LatLng(lat, lng);
						
		var marker = new google.maps.Marker({
			map: map,
			icon: image,
			position: pos
		});

		var infoWindow = new google.maps.InfoWindow();

		var contentString = name;

		google.maps.event.addListener(marker, 'click', function(marker, contentString, infoWindow){
			return function(){
				infoWindow.setContent(contentString);
				infoWindow.open(map, marker);
			};
		}(marker, contentString, infoWindow));
	}
} 