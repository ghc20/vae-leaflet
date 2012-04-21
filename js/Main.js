var map;
function init(){
	map = new L.Map("map");
	
	/* ESRI tiled service */
	var natGeoLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");
	
	/* WFS GeoJSON layer */
	var wfsLayer = new L.GeoJSON.WFS("http://opengis.azexperience.org/geoserver/wfs", "vae:azcelebrates", {
		pointToLayer: function(latlng) { 
			return new L.Marker(latlng, { 
				icon: new L.Icon({ 
					iconUrl: $.browser.msie && parseFloat($.browser.version) < 9 ? "./style/images/celebrate.png" : "./style/images/celebrate.svg", 
					iconSize: new L.Point(40, 40) 
				}) 
			});
		},
		popupObj: new JadeContent("templates/example.jade"),
		popupOptions: { maxWidth: 1000, centered: true },
		hoverFld: "city"
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	
	map.setView(center, 7).addLayer(natGeoLayer);
	
	setTimeout(function(){
		map.addLayer(wmsLayer);},
		1000);
	
	map.addLayer(wfsLayer);

}