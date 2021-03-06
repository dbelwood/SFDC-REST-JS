module("Search.Model.SearchTerms");
test ("setDefaults", function(){ok(false, "TODO: Write test.");});
test ("parseJSON", function() {
	var terms = new Search.Model.SearchTerms();
	terms.parseJSON("{\"title\":\"Test JSON\", \"experienceType\":\"Executive\", \"workCountries\": [\"id1\", \"id2\"], \"workStates\": [\"id1\"], \"mostCurrentWorkExperience\": \"true\", \"geographicExposure\": [\"id1\"], \"baseSalaryMin\": \"USD100000\",\"baseSalaryMax\": \"USD400000\",\"educationLevel\": \"Graduate\", \"interestedInInterim\": \"true\", \"certifications\": [\"CPA\"], \"interestedInNonExec\": \"true\", \"languages\": [\"French\"], \"resumeAvailable\": \"true\", \"willingToRelocate\": \"true\", \"annualRevenueMin\": \"USD100000\", \"annualRevenueMax\": \"USD1000000\", \"companyCountries\": [\"id1\"], \"ownership\": \"Wholly Owned Subsidiary\", \"companyStates\": [\"id1\"], \"numberOfEmployees\": \">1000\"}");
	equal(terms.get("title"), "Test JSON");
	equal(terms.get("experienceType"), "Executive");
	equal(terms.get("workCountries")[0], "id1");
	equal(terms.get("workCountries")[1], "id2");
	equal(terms.get("workStates")[0], "id1");
	ok(terms.get("mostCurrentWorkExperience"));
	equal(terms.get("geographicExposure")[0], "id1");
	equals(terms.get("baseSalaryMin"), "USD100000");
	equals(terms.get("baseSalaryMax"), "USD400000");
	equals(terms.get("educationLevel"), "Graduate");
	ok(terms.get("interestedInInterim"));
	equals(terms.get("certifications")[0], "CPA");
	ok(terms.get("interestedInNonExec"));
	equals(terms.get("languages")[0], "French");
	ok(terms.get("resumeAvailable"));
	ok(terms.get("willingToRelocate"));
	equals(terms.get("annualRevenueMin"), "USD100000");
	equals(terms.get("annualRevenueMax"), "USD1000000");
	equal(terms.get("companyCountries")[0], "id1");
	equal(terms.get("numberOfEmployees"), ">1000");
});

test ("toJSON", function() {
	var terms = new Search.Model.SearchTerms();
	terms.parseJSON("{\"title\":\"Test JSON\", \"experienceType\":\"Executive\", \"workCountries\": [\"id1\", \"id2\"], \"workStates\": [\"id1\"], \"mostCurrentWorkExperience\": \"true\", \"geographicExposure\": [\"id1\"], \"baseSalaryMin\": \"USD100000\",\"baseSalaryMax\": \"USD400000\",\"educationLevel\": \"Graduate\", \"interestedInInterim\": \"true\", \"certifications\": [\"CPA\"], \"interestedInNonExec\": \"true\", \"languages\": [\"French\"], \"resumeAvailable\": \"true\", \"willingToRelocate\": \"true\", \"annualRevenueMin\": \"USD100000\", \"annualRevenueMax\": \"USD1000000\", \"companyCountries\": [\"id1\"], \"ownership\": \"Wholly Owned Subsidiary\", \"companyStates\": [\"id1\"], \"numberOfEmployees\": \">1000\"}");
	equal(terms.toJSON(), "{\"title\":\"Test JSON\",\"experienceType\":\"Executive\",\"workCountries\":[\"id1\",\"id2\"],\"workStates\":[\"id1\"],\"mostCurrentWorkExperience\":\"true\",\"geographicExposure\":[\"id1\"],\"baseSalaryMin\":\"USD100000\",\"baseSalaryMax\":\"USD400000\",\"educationLevel\":\"Graduate\",\"interestedInInterim\":\"true\",\"certifications\":[\"CPA\"],\"interestedInNonExec\":\"true\",\"languages\":[\"French\"],\"resumeAvailable\":\"true\",\"willingToRelocate\":\"true\",\"annualRevenueMin\":\"USD100000\",\"annualRevenueMax\":\"USD1000000\",\"companyCountries\":[\"id1\"],\"ownership\":\"Wholly Owned Subsidiary\",\"companyStates\":[\"id1\"],\"numberOfEmployees\":\">1000\",\"engagementId\":null,\"functionCodes\":[],\"targetedCompanies\":[],\"naicsCodes\":[]}");
});
test ("toSOQLPredicate - Simple", function(){
	var terms = new Search.Model.SearchTerms();
	terms.set({
		title: "Test Title",
		experienceType: "Executive",
		mostCurrentWorkExperience: true,
		baseSalaryMin: "USD1",
		baseSalaryMax: "USD10"
	});
	equal(terms.toSOQLPredicate(), "FROM Work_Experience__c WHERE Position_Title__c=\"Test Title\" AND Most_Current_Position__c=true AND Base_Salary__c>=\"USD1\" AND Base_Salary__c<=\"USD10\"");
});
test ("toSOQLPredicate - Function Codes", function(){
	var terms = new Search.Model.SearchTerms();
	var fc1 = new Search.Model.FunctionCode();
	fc1.set({id:"a1DF0000001IuoBMAS"});
	var fc2 = new Search.Model.FunctionCode();
	fc2.set({id:"a1DF0000001IySuMAK"});
	terms.get("functionCodes").add(fc1);
	terms.get("functionCodes").add(fc2);
	equal(terms.toSOQLPredicate(), "FROM Work_Experience__c WHERE (Primary_Function_Code__c=\"a1DF0000001IuoBMAS\" OR Second_Function_Code__c=\"a1DF0000001IuoBMAS\" OR Third_Function_Code__c=\"a1DF0000001IuoBMAS\" OR Fourth_Function_Code__c=\"a1DF0000001IuoBMAS\" OR Primary_Function_Code__c=\"a1DF0000001IySuMAK\" OR Second_Function_Code__c=\"a1DF0000001IySuMAK\" OR Third_Function_Code__c=\"a1DF0000001IySuMAK\" OR Fourth_Function_Code__c=\"a1DF0000001IySuMAK\")");
});
test ("toSOQLPredicate - Targeted Companies", function(){
	var terms = new Search.Model.SearchTerms();
	var tc1 = new Search.Model.TargetedCompany();
	tc1.set({id:"a1DF0000001IuoBMAF", includeHierarchy: true, ultimateParentId:"a1DF0000001IuoBMAG"});
	var tc2 = new Search.Model.TargetedCompany();
	tc2.set({id:"a1DF0000001IySuMAF"});
	terms.addTargetedCompany(tc1);
	terms.addTargetedCompany(tc2);
	equal(terms.toSOQLPredicate(), "FROM Work_Experience__c WHERE Company_Name__c=\"a1DF0000001IuoBMAF\" OR Company_Name__c=\"a1DF0000001IySuMAF\" OR Company_Name__r.Company__r.Ultimate_Parent_Company__c=\"a1DF0000001IuoBMAG\"");
});
test ("toSOQLPredicate - NAICS Codes", function(){
	var terms = new Search.Model.SearchTerms();
	var nc1 = new Search.Model.NAICSCode();
	nc1.set({id:"a1DF0000001IuoBMAS"});
	var nc2 = new Search.Model.NAICSCode();
	nc2.set({id:"a1DF0000001IySuMAK"});
	terms.addNAICSCode(nc1);
	terms.addNAICSCode(nc2);
	equal(terms.toSOQLPredicate(), "FROM Work_Experience__c WHERE (First_NAICS__c=\"a1DF0000001IuoBMAS\" OR Second_NAICS__c=\"a1DF0000001IuoBMAS\" OR Third_NAICS__c=\"a1DF0000001IuoBMAS\" OR Fourth_NAICS__c=\"a1DF0000001IuoBMAS\" OR First_NAICS__c=\"a1DF0000001IySuMAK\" OR Second_NAICS__c=\"a1DF0000001IySuMAK\" OR Third_NAICS__c=\"a1DF0000001IySuMAK\" OR Fourth_NAICS__c=\"a1DF0000001IySuMAK\")");
});
test ("addFunctionCode", function(){
	var terms = new Search.Model.SearchTerms();
	equal(terms.get("functionCodes").models.length, 0);
	var fc1 = new Search.Model.FunctionCode();
	fc1.set({id:"a1DF0000001IuoBMAF"});
	var fc2 = new Search.Model.FunctionCode();
	fc2.set({id:"a1DF0000001IySuMAF"});
	terms.addFunctionCode(fc1);
	terms.addFunctionCode(fc2);
	equal(terms.get("functionCodes").models.length, 2);
	equal(terms.get("functionCodes").at(0).get("id"), "a1DF0000001IuoBMAF");
	equal(terms.get("functionCodes").at(1).get("id"), "a1DF0000001IySuMAF");
});
test ("addTargetedCompany", function(){
	var terms = new Search.Model.SearchTerms();
	equal(terms.get("targetedCompanies").models.length, 0);
	var tc1 = new Search.Model.TargetedCompany();
	tc1.set({id:"a1DF0000001IuoBMAF"});
	var tc2 = new Search.Model.TargetedCompany();
	tc2.set({id:"a1DF0000001IySuMAF"});
	terms.addTargetedCompany(tc1);
	terms.addTargetedCompany(tc2);
	equal(terms.get("targetedCompanies").models.length, 2);
	equal(terms.get("targetedCompanies").at(0).get("id"), "a1DF0000001IuoBMAF");
	equal(terms.get("targetedCompanies").at(1).get("id"), "a1DF0000001IySuMAF");
});
test ("addNAICSCode", function(){
	var terms = new Search.Model.SearchTerms();
	equal(terms.get("naicsCodes").models.length, 0);
	var nc1 = new Search.Model.NAICSCode();
	nc1.set({id:"a1DF0000001IuoBMAF"});
	var nc2 = new Search.Model.NAICSCode();
	nc2.set({id:"a1DF0000001IySuMAF"});
	terms.addNAICSCode(nc1);
	terms.addNAICSCode(nc2);
	equal(terms.get("naicsCodes").models.length, 2);
	equal(terms.get("naicsCodes").at(0).get("id"), "a1DF0000001IuoBMAF");
	equal(terms.get("naicsCodes").at(1).get("id"), "a1DF0000001IySuMAF");
});

module("Search.Model.SearchResult");
test ("basicTest", function(){
	var result = new Search.Model.SearchResult({
		name: "Test Name",
		company: "Test Company",
		address: "123 Fake Street",
		hasResume: true,
		hasContactProtocol: true,
		isOffLimits: true
	});
	equal(result.get("name"), "Test Name");
	equal(result.get("company"), "Test Company");
	equal(result.get("address"), "123 Fake Street");
	ok(result.get("hasResume"));
	ok(result.get("hasContactProtocol"));
	ok(result.get("isOffLimits"));
});

module("Search.Model.SearchResults");
test ("addToCollection", function(){
	var result = new Search.Model.SearchResult({
		name: "Test Name",
		company: "Test Company",
		address: "123 Fake Street",
		hasResume: true,
		hasContactProtocol: true,
		isOffLimits: true
	});
	var results = new Search.Model.SearchResults();
	results.add(result);
	equal(results.length, 1);
	equal(results.at(0).get("name"), "Test Name");
});
test ("removeFromCollection", function(){
	var result = new Search.Model.SearchResult({
		name: "Test Name",
		company: "Test Company",
		address: "123 Fake Street",
		hasResume: true,
		hasContactProtocol: true,
		isOffLimits: true
	});
	var results = new Search.Model.SearchResults();
	results.add(result);
	equal(results.length, 1);
	results.remove(result);
	equal(results.length, 0);
});

module("Search.Model.SelectedContacts");
test ("addContact", function(){
	var result = new Search.Model.SearchResult({
		name: "Test Name",
		company: "Test Company",
		address: "123 Fake Street",
		hasResume: true,
		hasContactProtocol: true,
		isOffLimits: true
	});
	var results = new Search.Model.SelectedContacts();
	results.add(result);
	equal(results.length, 1);
	equal(results.at(0).get("name"), "Test Name");
});

test ("removeContact", function(){
	var result = new Search.Model.SearchResult({
		name: "Test Name",
		company: "Test Company",
		address: "123 Fake Street",
		hasResume: true,
		hasContactProtocol: true,
		isOffLimits: true
	});
	var results = new Search.Model.SelectedContacts();
	results.add(result);
	equal(results.length, 1);
	results.remove(result);
	equal(results.length, 0);
});

module("Search.Model.App");
test ("search", function(){ok(false, "TODO: Write test.");});
test ("addCandidates", function(){ok(false, "TODO: Write test.");});
test ("saveSearchTerms", function(){ok(false, "TODO: Write test.");});
test ("loadSearchTerms", function(){ok(false, "TODO: Write test.");});
test ("saveSearchResults", function(){ok(false, "TODO: Write test.");});
test ("loadSearchResults", function(){ok(false, "TODO: Write test.");});