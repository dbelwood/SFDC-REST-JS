$(function(){
	window.SearchTermsView = Backbone.View.extend({
		el: $("#searchTerms"),
		fields: [
			{"name": "firstName", "fieldType":"Outpost.View.TextField", "label":"First Name", "defaultValue":"", "required":"true", "mode": Outpost.View.Mode.Edit},
			{"name": "lastName", "fieldType":"Outpost.View.TextField", "label":"Last Name", "defaultValue":"", "required":"true", "mode": Outpost.View.Mode.Edit}
		],
		initialize: function() {
			this.fieldCollection = Outpost.View.FieldCollection.load(this.fields);
		},
		render: function() {
			this.fieldCollection.each(function(metadata) {
				$("#"+metadata.get("name")).replaceWith(metadata.toField().render());
			});
		}
	});
	window.AppView = Backbone.View.extend({
		el: $("#app"),
		searchTerms: new SearchTermsView,
		initialize: function() {
			this.render();
		},
		render: function() {
			this.searchTerms.render();
		}
	});
	window.App = new AppView;
});