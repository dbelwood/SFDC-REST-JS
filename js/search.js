DataSerializer.parse = function(json) {
	return JSON.parse(json);
};
	
// Data Structure -> JSON
DataSerializer.serialize = function(data) {
	return JSON.stringify(data);
};

var Search.FunctionCode = Backbone.Model.extend({
	practice: "",
	sector: "",
	code: ""
});

var Search.FunctionCodes = Backbone.Collection.extend({
	model: Search.FunctionCode
});


var Search.TargetedCompany = Backbone.Model.extend({
	name: "",
	includeHierarchy: false
});

var Search.TargetedCompanies = Backbone.Collection.extend({
	model: Search.TargetedCompany
});

var Search.NAICSCode = Backbone.Model.extend({
	code: "",
	description: ""
});

var Search.NAICSCodes = Backbone.Collection.extend({
	model: Search.NAICSCode
});

var Search.SearchTerms = Backbone.Model.extend({
	// Initial attributes
	title: "",
	experienceType: "",
	workContries: [],
	workStates: [],
	mostCurrentWorkExperience: false,
	geographicExposure: [],
	baseSalaryMin: null,
	baseSalaryMax: null,
	educationLevel: "",
	interestedInInterim: false,
	certifications: [],
	interestedInNonExec: false,
	languages: [],
	resumeAvailable: false,
	willingToRelocate: false,
	annualRevenueMin: null,
	annualRevenueMax: null,
	companyCountries: [],
	ownership: "",
	companyStates: [],
	numberOfEmployees: "",
	functionCodes: new Search.FunctionCodes(),
	targetedCompanies: new Search.TargetedCompanies(),
	naicsCodes: new Search.NAICSCodes(),
	
	engagementId: null,
	
	//  Set Defaults from Engagement
	setDefaults: function() {},
	
	// Set values by input json
	parseJSON: function(json) {}.
	
	// Serialize data to JSON
	serialize: function() {},
	
	// Export data to SOQL predictate
	toSOQLPredicate: function() {},
	
	// Add Function Code
	addFunctionCode: function(code) {},
	
	// Add Targeted Company
	addTargetedCompany: function(company) {},
	
	// Add NAICS Code
	addNAICSCode: function(code) {}
});

var Search.SearchResult = Backbone.Model.extend({
	name: "",
	company: "",
	address: "",
	hasResume: false,
	hasContactProtocol: false,
	isOffLimits: false
});

var Search.SearchResults = Backbone.Collection.extend({
	model: Search.SearchResult
});

var Search.SelectedContacts = Backbone.Collection.extend({
	model: Search.SearchResult
});

var Search.Search = Backbone.Model.extend({
	terms: new Search.SearchTerms(),
	searchResults: new Search.SearchResults(),
	selectedContacts: new Search.SelectedContacts(),
});
