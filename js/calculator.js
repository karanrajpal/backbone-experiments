(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	}
	var expression='';

	window.template =function(id){
		return _.template($('#'+id).html());
	}

	App.Models.Result = Backbone.Model.extend({
		default: {
			exp: 0
		}
	});

	App.Views.Result = Backbone.View.extend({
		tagName: 'div',

		className: 'result',

		template: template('result'),

		initialize: function(){
			this.model.on('change',this.render,this);
		},

		render: function(){
			var template = this.template(this.model.toJSON());
			this.$el.html(template);
			return this;
		}
	});

	App.Views.Calculator = Backbone.View.extend({
		tagName: 'div',

		className: 'calculator',

		render: function(){
			this.collection.each(this.addOne,this);
			return this;
		},

		addOne: function(button){
			//need to create each button now.
			var buttonView = new App.Views.Button({model: button});
			this.$el.append(buttonView.render().el);
		}
	});


	function evaluate(expr){
		var chars = expr.split(" ");
		console.log(chars);
		for(var i=0;i<chars.length;i++){
			if(!(parseInt(chars[i])) && (chars[i]=='*') || (chars[i]=='/')){
				console.log('evaluating the mult and div');
			}
		}
	}

	function expr (expr) {

    var chars = expr.split("");
    var n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {

        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    // Calculate the expression
    expr = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                expr = expr + num;
                break;
            case "-":
                expr = expr - num;
                break;
            case "*":
                expr = expr * num;
                break;
            case "/":
                expr = expr / num;
                break;
        }
    }

    return expr;
	}

	App.Models.Button = Backbone.Model.extend({

	});

	window.result = new App.Models.Result({exp: 0});
	var resultView = new App.Views.Result({model: result});

	App.Views.Button = Backbone.View.extend({
		tagName: 'div',

		className: 'button',

		events: {
			'click': 'append'
		},
		append: function() {
			var clicked = this.model.get('value');
			if(clicked==' = '){
				var finalResult = evaluate(expression);
				console.log("result is : "+ finalResult);
				expression='0';
				result.set('exp',finalResult);
			}
			else if(clicked==='CLR'){
				expression='0';
				result.set('exp',expression);
			}
			else {
				expression+= clicked;
				result.set('exp',expression);

				console.log(clicked+' was clicked!');
				
				console.log(expression);
			}


		},

		template: template('calculatorButton'),

		render: function(){
			var template = this.template(this.model.toJSON());
			this.$el.html(template);
			return this;
		}
	});

	App.Collections.Buttons = Backbone.Collection.extend({

	});

	var buttonsCollection = new App.Collections.Buttons([
	{
		value: ' + '
	},
	{
		value: ' - '
	},
	{
		value: ' * '
	},
	{
		value: ' / '
	},
	{
		value: ' = '
	},
	{
		value: 'CLR'
	},
	{
		value: 1
	},
	{
		value: 2
	},
	{
		value: 3
	},
	{
		value: 4
	},
	{
		value: 5
	},
	{
		value: 6
	},
	{
		value: 7
	},
	{
		value: 8
	},
	{
		value: 9
	},
	{
		value: 0
	},
	]);

	var calculatorView = new App.Views.Calculator({collection: buttonsCollection});
	
	$('#calculator').append(resultView.render().el);
	$('#calculator').append(calculatorView.render().el);

})();

