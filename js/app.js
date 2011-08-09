$(function(){
	window.SearchTermsView = Backbone.View.extend({
		el: $("#searchTerms"),
		fields: [
			{"name": "firstName", "fieldType":"Outpost.View.TextField", "label":"First Name", "defaultValue":"", "required":"true", "mode": Outpost.View.Mode.Edit},
			{"name": "lastName", "fieldType":"Outpost.View.TextField", "label":"Last Name", "defaultValue":"", "required":"true", "mode": Outpost.View.Mode.Edit}
		],
		sessionId: "",
		initialize: function(options) {
			this.sessionId=options["sessionId"];
			this.fieldCollection = Outpost.View.FieldCollection.load(this.fields);
		},
		render: function() {
			this.fieldCollection.each(function(metadata) {
				$("#"+metadata.get("name")).replaceWith(metadata.toField().render());
			});
		},
		search: function() {
			var client = new forcetk.Client();
			client.setSessionToken(this.sessionId);
			client.query("SELECT Id, Name FROM Account", this.setResults);
		},
		setResults: function(response) {
			if (response["records"] != null) {}
				var view = ResultsView.new({"collection":response["records"]});
			}
		}
	});
	
	window.Result = Backbone.Model.extend({
		
	});
	
	window.ResultsView = Backbone.View.extend({
		collection: [],
		render: function() {
			
		}
	});
	
	window.ResultCollection = Backbone.Collection.extend({
		model: Result,
	});
	
	window.AppView = Backbone.View.extend({
		el: $("#app"),
		searchTerms: new SearchTermsView,
		initialize: function() {
			this.render();
		},
		setSessionId: function(sessionId) {
			this.options["sessionId"] = sessionId;
		},
		render: function() {
			this.searchTerms.render();
		},
		
	});
	window.SearchController = Backbone.Controller.extend({
		routes: {
			"": "start"
		},
		sessionId: "",
		initialize: function(options) {
			this.sessionId = options["sessionId"];
		},
		results: new ResultCollection(),
		start: function() {
			var searchTermsView = new SearchTermsView({"sessionId": this.sessionId});
			searchTermsView.render();
			var resultsView = new ResultsView()
		}
	});
});