Ext.define('Ext.Mapbox', { 
	extend: 'Ext.Component',
	requires: ['Ext.device.Geolocation'],
	map: null,
	config: {
		map: null
	},
	
	constructor: function() {
		this.callParent(arguments);
		this.element.setVisibilityMode(Ext.Element.OFFSETS);
		this.on('painted', this.showMap, this);
	},
	
	showMap: function() {
		
		if(this.map) {
			return true;
		} 
		
		var me = this.map;
		
		me = mapbox.map(this.element.dom).zoom(2);
		me.addLayer(mapbox.layer().id('examples.map-vyofok3q'));
		me.ui.attribution.add().content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');
		me.ui.zoomer.add();
		
		/* create an empty layer */
		var marker = mapbox.markers.layer();
		me.addLayer(marker);
		
		Ext.device.Geolocation.getCurrentPosition({
		    success: function(position) {
		        // console.log(position.coords.latitude);
				// zoom and update position
				me.zoom(20).center({ 
					lat: position.coords.latitude, 
					lon: position.coords.longitude 
				});
				
				marker.add_feature( {
					geometry: {
						coordinates: [
							position.coords.latitude,
							position.coords.longitude
						]
					},
					properties: {
						'marker_color': '#000',
						'marker_symbol': 'star-stroked',
					}
				});

		    },
		    failure: function() {
		        console.log('something went wrong!');
		    }
		});
		
	},
	
	onUpdate: function (map, e, options) {
        this.setHtml((options || {}).data);
    },

    onDestroy: function () {
        this.callParent();
    }
});