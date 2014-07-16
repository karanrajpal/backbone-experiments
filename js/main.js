(function(){
	window.App={
		Models: {},
		Views: {},
		Collections: {}
	}

	window.template = function(id){
	return _.template($("#"+id).html());
	}

})();

App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Karan Rajpal',
		age: 30,
		occupation: 'Intern'
	}
});


App.Views.People = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		this.collection.each(function(person){
			var personView = new App.Views.Person({model: person});
			this.$el.append(personView.render().el);
		},this);
		return this;
	}
});

App.Collections.People = Backbone.Collection.extend({
	model : App.Models.Person
});

App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template("personTemplate"),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var peopleCollection = new App.Collections.People([
	{
		name: "Karan Rajpal",
		age: 22
	},
	{
		name: "Radhika",
		occupation: "Coder"
	}
]);

var peopleView = new App.Views.People({ collection: peopleCollection});
$(document.body).append(peopleView.render().el);