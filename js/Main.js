var map;
var wmsLayer;
function init(){
	map = new L.Map("map");
	
	/* ESRI tiled service */
	var imgLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
	var boundLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
	
	/* WMS layer */
	var wmsUrl = "http://opengis.azexperience.org/geoserver/wms";
		wmsLayer = new L.TileLayer.WMS(wmsUrl, {
			maxZoom: 10, 
			layers: "vae:aziconic", 
			format: "image/png", 
			transparent: true 
		}); 
	
	/* WFS GeoJSON layer */
	var wfsLayer = new L.GeoJSON.WFS("http://opengis.azexperience.org/geoserver/wfs", "vae:aziconic", {
		pointToLayer: function(latlng) { return new L.CircleMarker(latlng, {
												opacity: 1,
												fillOpacity: 0,
												radius: 16,
												color: "#FFFF00",
												weight: 5
											}); 
										},
		popupObj: new JadeContent("templates/example.jade"),
		popupOptions: { maxWidth: 1000, centered: true },
		hoverFld: "name"
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	
	map.setView(center, 7).addLayer(imgLayer);

	setTimeout(function(){
		map.addLayer(boundLayer);},
		100);
	
	setTimeout(function(){
		map.addLayer(wmsLayer);},
		1000);
	
	map.addLayer(wfsLayer);

}