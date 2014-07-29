(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	}
	
	var vent = _.extend({}, Backbone.Events);

	console.log(vent);

	App.Router = Backbone.Router.extend({

		routes: {
			'': 'index',
			'download/:id': 'download',
			'show/*file': 'show',
			'appointment/:id': 'showAppointment',
			'*other': 'default'
		},
		index: function(){
			console.log('index scenes');
		},
		download: function(id){
			console.log('Download has begun for '+id);
		},
		show: function(file){
			console.log('showing file '+ file);

			//good to trigger an event to do creating a model, create view etc. Router not repsonsible for that
		},

		showAppointment: function(id){
			console.log('showing');
			vent.trigger('appointment:show',id);
		},

		default: function(){
			console.log('not found 404');
		}
	});

	new App.Router;
	Backbone.history.start();

	/* can do this in initialize function of appointment */
	vent.on('appointment:show',function(id){
		alert('showing appointment '+id);
	},this);
})();