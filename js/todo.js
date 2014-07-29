(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	},
	window.template =function(id){
		return _.template($('#'+id).html());
	}

App.Models.Task = Backbone.Model.extend({
	validate: function(attrs){
		console.log(attrs);
	}
});

App.Views.Task = Backbone.View.extend({
	tagName: 'li',

	template: template('taskTemplate'),

	initialize: function(){
		this.model.on('change',this.render,this);
		this.model.on('destroy',this.remove,this);
	},

	events: {
		'click .edit': 'editTask',
		'click .delete': 'destroy'
	},

	destroy: function(){
		this.model.destroy();
	},

	remove: function(){
		this.$el.remove();
	},

	editTask: function(){
		var newTask=prompt('What would you like to change the text to?',this.model.get('title'));
		if(!newTask) return;
		this.model.set('title',newTask);
		console.log(newTask);
		// this.render();
	},

	showAlert: function(){
		alert('clicked');
	},

	render: function(){
		var template = this.template(this.model.toJSON());
		this.$el.html(template);
		return this;
	}
});

App.Views.Tasks = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(){
		this.collection.on('add',this.addOne,this);
	},

	render: function(){
		this.collection.each(this.addOne,this);
		return this;
	},

	addOne: function(task){
		//need to create each li now. So need to call Task
		var taskView = new App.Views.Task({model: task});
		this.$el.append(taskView.render().el);
	}
});

App.Views.AddTask = Backbone.View.extend({
	el: '#addTask',

	initialize: function(){

	},

	events: {
		'submit': 'submit'
	},

	submit: function(e){
		e.preventDefault();
		console.log('Submitted');
		var newTask = $(e.currentTarget).find('input[type=text]').val();
		console.log(newTask);

		var task = new App.Models.Task({title: newTask});

		//need to add this to the collection

		this.collection.add(task);
		console.log(this.collection);

	}
});

App.Collections.Tasks = Backbone.Collection.extend({
	model: App.Models.Task
});

var taskCollection = new App.Collections.Tasks([
	{
		title: 'Go to the mall',
		priority: 5
	},
	{
		title: 'Go away',
		priority: 3
	}
]);

var tasksView = new App.Views.Tasks({collection: taskCollection});
var addView = new App.Views.AddTask({collection: taskCollection});

// console.log(tasksView.render().el);
$('.tasks').html(tasksView.render().el);

// var task = new App.Models.Task({
// 	title: 'No',
// 	priority: 6
// });

// var taskView = new App.Views.Task({model: task});
// console.log(taskView.render().el);
})();