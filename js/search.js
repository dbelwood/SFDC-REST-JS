Search = {}
Search.Model = {}

Search.Model.FunctionCode = Backbone.Model.extend({
	defaults: {
		practice: "",
		sector: "",
		code: ""
	}
});

Search.Model.FunctionCodes = Backbone.Collection.extend({
	model: Search.Model.FunctionCode
});


Search.Model.TargetedCompany = Backbone.Model.extend({
	defaults: {
		name: "",
		includeHierarchy: false
	}
});

Search.Model.TargetedCompanies = Backbone.Collection.extend({
	model: Search.Model.TargetedCompany
});

Search.Model.NAICSCode = Backbone.Model.extend({
	defaults: {
		code: "",
		description: ""
	}
});

Search.Model.NAICSCodes = Backbone.Collection.extend({
	model: Search.Model.NAICSCode
});

Search.Model.SearchTerms = Backbone.Model.extend({
	// Initial attributes
	defaults: { 
		title: "",
		experienceType: "",
		workCountries: [],
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
		functionCodes: new Search.Model.FunctionCodes(),
		targetedCompanies: new Search.Model.TargetedCompanies(),
		naicsCodes: new Search.Model.NAICSCodes(),	
		engagementId: null
	},
	
	//  Set Defaults from Engagement
	setDefaults: function() {},
	
	// Set values by input json
	parseJSON: function(json) {
		data = JSON.parse(json);
		this.set({
			title: data.title,
			experienceType: data.experienceType,
			workCountries: data.workCountries,
			workStates: data.workStates,
			mostCurrentWorkExperience: data.mostCurrentWorkExperience,
			geographicExposure: data.geographicExposure,
			baseSalaryMin: data.baseSalaryMin,
			baseSalaryMax: data.baseSalaryMax,
			educationLevel: data.educationLevel,
			interestedInInterim: data.interestedInInterim,
			certifications: data.certifications,
			interestedInNonExec: data.interestedInNonExec,
			languages: data.languages,
			resumeAvailable: data.resumeAvailable,
			willingToRelocate: data.willingToRelocate,
			annualRevenueMin: data.annualRevenueMin,
			annualRevenueMax: data.annualRevenueMax,
			companyCountries:  data.companyCountries,
			ownership: data.ownership,
			companyStates: data.companyStates,
			numberOfEmployees: data.numberOfEmployees
		});
		//this.functionCodes: data.;
		//this.targetedCompanies: data.;
		//this.naicsCodes: data.;
	},
	
	// Serialize data to JSON
	toJSON: function() {
		return JSON.stringify(this.attributes);
	},
	
	// Export data to SOQL predictate
	toSOQLPredicate: function() {},
	
	// Add Function Code
	addFunctionCode: function(code) {},
	
	// Add Targeted Company
	addTargetedCompany: function(company) {},
	
	// Add NAICS Code
	addNAICSCode: function(code) {}
});

Search.Model.SearchResult = Backbone.Model.extend({
	defaults: {
		name: "",
		company: "",
		address: "",
		hasResume: false,
		hasContactProtocol: false,
		isOffLimits: false
	}
});

Search.Model.SearchResults = Backbone.Collection.extend({
	model: Search.Model.SearchResult
});

Search.Model.SelectedContacts = Backbone.Collection.extend({
	model: Search.Model.SearchResult
});

Search.Model.App = Backbone.Model.extend({
	terms: new Search.Model.SearchTerms(),
	searchResults: new Search.Model.SearchResults(),
	selectedContacts: new Search.Model.SelectedContacts(),
	// Issue search based on search terms
	search: function() {},
	
	// Add selected contacts to engagement
	addCandidates: function() {},
	
	// Save search terms
	saveSearchTerms: function() {},
	
	// Load search terms
	loadSearchTerms: function() {},
	
	// Save search results
	saveSearchResults: function() {},
	
	// Load search results
	loadSearchResults: function() {}
});
