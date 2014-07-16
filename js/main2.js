(function(){
	window.App={
		Models: {},
		Views: {},
		Collections: {}
	}

	window.template = function(id){
	return _.template($("#"+id).html());
	}

App.Models.Task = Backbone.Model.extend({
	validate: function(attrs){  //Doesn't work!
		if(attrs.title==null){
			return 'A task requires a valid title';
		}
	}
});

App.Collections.Task = Backbone.Collection.extend({
	model: App.Models.Task
});

App.Views.Tasks = Backbone.View.extend({
	tagName: "ul",

	render: function(){
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(task){
		var taskView = new App.Views.Task({model: task});
		this.$el.append(taskView.render().el);
	}
});

App.Views.Task = Backbone.View.extend({
	tagName: 'li',

	template: template('taskTemplate'),

	initialize: function(){
		this.model.on('change',this.render,this);
	},

	render: function(){
		var template = this.template(this.model.toJSON());
		this.$el.html(template);
		return this;
	},
	events: {
		'click .edit': 'editTask' //This is not $(.edit). Doesnt search the whole DOM. Just under li. Hence faster
	},
	editTask: function(){
		var newTaskTitle = prompt('What do you want to change it to?',this.model.get('title'));
		if($.trim(newTaskTitle)!="")
			this.model.set('title',newTaskTitle);
	}
});

var tasksCollection = new App.Collections.Task([
	{
		title: "Go to the Store",
		priority: 4
	},
	{
		title: "Update Resume",
		priority: 5
	},
	{
		title: "Hello Argentina",
		priority: 2
	}
]);
var tasksView = new App.Views.Tasks({collection: tasksCollection});
// tasksView.render();
// console.log(tasksView.render().el);
$('.tasks').html(tasksView.render().el);
// var taskView = new App.Views.Task({model: task});
// console.log(taskView.render().el);

})();