Outpost = {}
// Utilities
Outpost.Utilities = {}
Outpost.Utilities.stringToFunction = function(str) {
  var arr = str.split(".");

  var fn = (window || this);
  for (var i = 0, len = arr.length; i < len; i++) {
    fn = fn[arr[i]];
  }

  if (typeof fn !== "function") {
    throw new Error("function not found");
  }

  return  fn;
};

// Models
Outpost.Model={}
// Fields
// Base field
Outpost.Model.Field = Backbone.Model.extend({
	defaults : {
		label : "",
		value : null,
		required : false
	},
	validate : function() {
		if (this.required && this.value == null) {
			return "Required fields must have a value."
		}
	}
});

// Text-based fields

// Text field
Outpost.Model.TextField = Outpost.Model.Field.extend({
	
});

// Picklist field
Outpost.Model.PicklistField = Outpost.Model.TextField.extend({
	
});

// Multi-select picklist field
Outpost.Model.MultiSelectPicklistField = Outpost.Model.PicklistField.extend({
	
});

// Textarea field
Outpost.Model.TextAreaField = Outpost.Model.TextField.extend({
	
});

// URL field
Outpost.Model.URLField = Outpost.Model.TextField.extend({
	
});

// Email field
Outpost.Model.EmailField = Outpost.Model.TextField.extend({
	
});

// Date field
Outpost.Model.DateField = Outpost.Model.TextField.extend({
	
});

// Datetime field
Outpost.Model.DatetimeField = Outpost.Model.DateField.extend({
	
});

// Number-based field

// Number field
Outpost.Model.NumberField = Outpost.Model.Field.extend({
	
});

// Currency field
Outpost.Model.CurrencyField = Outpost.Model.NumberField.extend({
	
});

// Percent field
Outpost.Model.PercentField = Outpost.Model.NumberField.extend({
	
});

// Checkbox field
Outpost.Model.CheckboxField = Outpost.Model.Field.extend({
	
});

// Views
Outpost.View={}

Outpost.View.Templater = function() {}
Outpost.View.Templater.render = function(template,view) {
	return Mustache.to_html(template, view)
}

Outpost.View.Mode = {Display:0, Edit:1};

// Field Views
Outpost.View.Field = Backbone.View.extend({
	defaults : {
		mode : Outpost.View.Mode.Display
	},
	render: function() {
		 return Outpost.View.Templater.render(this.template(), this.model.attributes);
	}
});

// Text-based fields

// Text field
Outpost.View.TextField = Outpost.View.Field.extend({
	initialize : function(){
		this.model = new Outpost.Model.TextField({"label":this.options["label"]});
		this.mode = this.options["mode"];
	},
	template: function() {
		if (this.mode==Outpost.View.Mode.Edit)
			return "<div class='field'><span class='label'>{{label}}</span><input class='value'>{{value}}</input></div>";
		else
			return "<div class='field'><span class='label'>{{label}}</span><span class='value'>{{value}}</span></div>";
	}
});

// Picklist field
Outpost.View.PicklistField = Outpost.View.TextField.extend({
	initialize : function(){
		this.model = new Outpost.Model.PicklistField()
	},
	template: ""
});

// Multi-select picklist field
Outpost.View.MultiSelectPicklistField = Outpost.View.PicklistField.extend({
	initialize : function(){
		this.model = new Outpost.Model.MultiSelectPicklistField()
	},
	template: ""
});

// Textarea field
Outpost.View.TextAreaField = Outpost.View.TextField.extend({
	initialize : function(){
		this.model = new Outpost.Model.TextAreaField()
	},
	template: ""
});

// URL field
Outpost.View.URLField = Outpost.View.TextField.extend({
	initialize : function(){
		this.model = new Outpost.Model.URLField()
	},
	template: ""
});

// Email field
Outpost.View.EmailField = Outpost.View.TextField.extend({
	initialize : function(){
		this.model = new Outpost.Model.EmailField()
	},
	template: ""
});

// Date field
Outpost.View.DateField = Outpost.View.TextField.extend({
	initialize : function(){
		this.model = new Outpost.Model.DateField()
	},
	template: ""
});

// Datetime field
Outpost.View.DatetimeField = Outpost.View.DateField.extend({
	initialize : function(){
		this.model = new Outpost.Model.DatetimeField()
	},
	template: ""
});

// Number-based field

// Number field
Outpost.View.NumberField = Outpost.View.Field.extend({
	initialize : function(){
		this.model = new Outpost.Model.NumberField()
	},
	template: ""
});

// Currency field
Outpost.View.CurrencyField = Outpost.View.NumberField.extend({
	initialize : function(){
		this.model = new Outpost.Model.CurrencyField()
	},
	template: ""
});

// Percent field
Outpost.View.PercentField = Outpost.View.NumberField.extend({
	initialize : function(){
		this.model = new Outpost.Model.PercentField()
	},
	template: ""
});

// Checkbox field
Outpost.View.CheckboxField = Outpost.View.Field.extend({
	initialize : function(){
		this.model = new Outpost.Model.CheckboxField()
	},
	template: ""
});

Outpost.View.FieldMetadata = Backbone.Model.extend({
	toField: function() {
		var className = Outpost.Utilities.stringToFunction(this.get("fieldType"));
		var field = new className({"label": this.get("label"), "required": this.get("required"), "value": this.get("defaultValue"), "mode": this.get("mode")});		
		return field;
	}
});

Outpost.View.FieldCollection = Backbone.Collection.extend({
	initialize: function() {
		this.model = Outpost.Model.FieldMetadata;
	}
});
Outpost.View.FieldCollection.load = function(items) {
	var metadataRecords = [];
	for (item in items) {
		metadataRecords.push(new Outpost.View.FieldMetadata(items[item]));
	}
	return new Outpost.View.FieldCollection(metadataRecords);
}