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
		includeHierarchy: false,
		ultimateParentId: null
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
	initialize: function() {
		this.set({
			functionCodes: new Search.Model.FunctionCodes(), 
			targetedCompanies: new Search.Model.TargetedCompanies(), 
			naicsCodes: new Search.Model.NAICSCodes()
		});
	},
	
	// Initial attributes
	defaults: { 
		title: null,
		experienceType: "Executive",
		workCountries: [],
		workStates: [],
		mostCurrentWorkExperience: false,
		geographicExposure: [],
		baseSalaryMin: null,
		baseSalaryMax: null,
		educationLevel: null,
		interestedInInterim: false,
		certifications: [],
		interestedInNonExec: false,
		languages: [],
		resumeAvailable: false,
		willingToRelocate: false,
		annualRevenueMin: null,
		annualRevenueMax: null,
		companyCountries: [],
		ownership: null,
		companyStates: [],
		numberOfEmployees: null,	
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
	
	experienceSourceMap: {
		"Executive": "Work_Experience__c",
		"Non-Executive": "Board_Experience__c"
	},
	
	attributePredicateMap: {
		title: {field:"Position_Title__c", operator:"=", boolOp:"AND", type:"string"},
		workCountries: {field:"Country__c", operator:"=", boolOp:"AND", type:"string"},
		workStates: {field:"State__c", operator:"=", boolOp:"AND", type:"string"},
		geographicExposure: {field:"Geographic__c", operator:"=", boolOp:"AND", type:"string"},
		baseSalaryMin: {field:"Base_Salary__c", operator:">=", boolOp:"AND", type:"string"},
		baseSalaryMax: {field:"Base_Salary__c", operator:"<=", boolOp:"AND", type:"string"},
		mostCurrentWorkExperience: {field:"Most_Current_Position__c", operator:"=", boolOp:"AND", type:"bool"},
		educationLevel: {field:"Contact__r.Education_Levels__c", operator:"=", boolOp:"AND", type:"string"},
		interestedInInterim: {field:"Contact__r.Interest_in_Interim__c", operator:"=", boolOp:"AND", type:"bool"},
		certifications: {field:"Contact__r.Certifications__c", operator:"INCLUDES", boolOp:"AND", type:"string"},
		interestedInNonExec: {field:"Contact__r.Interest_in_Non_Exec__c", operator:"=", boolOp:"AND", type:"bool"},
		languages: {field:"Contact__r.Languages__c", operator:"=", boolOp:"AND", type:"string"},
		resumeAvailable: {field:"Contact__r.Resume_CV_Available__c", operator:"=", boolOp:"AND", type:"bool"},
		willingToRelocate: {field:"Contact__r.Relocate__c", operator:"=", boolOp:"AND", type:"bool"},
		annualRevenueMin: {field:"Company_Name__r.AnnualRevenue", operator:">=", boolOp:"AND", type:"string"},
		annualRevenueMax: {field:"Company_Name__r.AnnualRevenue", operator:"<=", boolOp:"AND", type:"string"},
		companyCountries: {field:"Company_Name__r.Primary_Country__c", operator:"=", boolOp:"AND", type:"string"},
		ownership: {field:"Company_Name__r.Ownership_Type__c", operator:"=", boolOp:"AND", type:"string"},
		companyStates: {field:"Company_Name__r.BillingState", operator:"=", boolOp:"AND", type:"string"},
		numberOfEmployees: {field:"Company_Name__r.Number_of_Employees__c", operator:"=", boolOp:"AND", type:"string"}
	},
	
	// Get condition text
	getConditionText: function(attribute, value) {
		if (!(value != null && value != "" && ((value.length != null && value.length > 0) || value.length == null)))
			return "";
			
		if (this.attributePredicateMap.hasOwnProperty(attribute)) {
			var predicate = this.attributePredicateMap[attribute];
			if (predicate == undefined)
				return "";
			
			var valueDelim = (predicate.type=="string") ? "\"" : "";
			
			return " " + predicate.boolOp + " " + predicate.field + predicate.operator + valueDelim+value+valueDelim;	
		}
		else {
			if (!this.attributes.hasOwnProperty(attribute))
				throw "Invalid attribute: " + attribute;
				
			return "";
		}
	},
	
	// Construct the FC component of the predicate
	getFCConditionText: function() {
		if (this.get("functionCodes").length == 0)
			return "";
			
		var soqlText="(";
		var fc;
		for (var i=0;i<this.get("functionCodes").length;i++) {
			fc = this.get("functionCodes").at(i);
			if (i>0)
				soqlText += " OR ";
			
			soqlText += "Primary_Function_Code__c=\"" + fc.id + "\" OR Second_Function_Code__c=\"" + fc.id + "\" OR Third_Function_Code__c=\"" + fc.id + "\" OR Fourth_Function_Code__c=\"" + fc.id + "\"";
		}
		soqlText += ")";
		
		return soqlText;
	},
	
	// Construct the TC component of the predicate
	getTCConditionText: function() {
		var soqlText="";
		
		for (var i=0;i<this.get("targetedCompanies").length;i++) {
			tc = this.get("targetedCompanies").at(i);
			if (i>0)
				soqlText += " OR ";
			
			soqlText += "Company_Name__c=\""+tc.id+"\"";
		}
		
		for (var i=0;i<this.get("targetedCompanies").length;i++) {
			tc = this.get("targetedCompanies").at(i);
			if (tc.get("includeHierarchy"))
				soqlText += " OR Company_Name__r.Company__r.Ultimate_Parent_Company__c=\""+tc.get("ultimateParentId")+"\"";
		}
		
		// Add Targeted Company Ids
		return soqlText;
	},
	
	// Construct the NC component of the predicate
	getNCConditionText: function() {
		if (this.get("naicsCodes").length == 0)
			return "";
			
		var soqlText="(";
		var nc;
		for (var i=0;i<this.get("naicsCodes").length;i++) {
			nc = this.get("naicsCodes").at(i);
			if (i>0)
				soqlText += " OR ";
			
			soqlText += "First_NAICS__c=\"" + nc.id + "\" OR Second_NAICS__c=\"" + nc.id + "\" OR Third_NAICS__c=\"" + nc.id + "\" OR Fourth_NAICS__c=\"" + nc.id + "\"";
		}
		soqlText += ")";
		
		return soqlText;
	},
	
	// Export data to SOQL predictate
	toSOQLPredicate: function() {
		var prefix="FROM " + this.experienceSourceMap[this.get("experienceType")] + " WHERE ";
		var soqlText="";
		for (var key in this.attributes) {
			soqlText += this.getConditionText(key, this.get(key));
		}
		// Remove first "AND"
		soqlText = soqlText.slice(5);
		return prefix + soqlText + this.getFCConditionText() + this.getTCConditionText() + this.getNCConditionText();
	},
	
	// Add Function Code
	addFunctionCode: function(code) {
		this.get("functionCodes").add(code);
	},
	
	// Add Targeted Company
	addTargetedCompany: function(company) {
		this.get("targetedCompanies").add(company);
	},
	
	// Add NAICS Code
	addNAICSCode: function(code) {
		this.get("naicsCodes").add(code);
	}
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
