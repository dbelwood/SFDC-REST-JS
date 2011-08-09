module("Search.Model.SearchTerms");
test ("setDefaults", function(){});
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
	equal(terms.toJSON(), "{\"title\":\"Test JSON\",\"experienceType\":\"Executive\",\"workCountries\":[\"id1\",\"id2\"],\"workStates\":[\"id1\"],\"mostCurrentWorkExperience\":\"true\",\"geographicExposure\":[\"id1\"],\"baseSalaryMin\":\"USD100000\",\"baseSalaryMax\":\"USD400000\",\"educationLevel\":\"Graduate\",\"interestedInInterim\":\"true\",\"certifications\":[\"CPA\"],\"interestedInNonExec\":\"true\",\"languages\":[\"French\"],\"resumeAvailable\":\"true\",\"willingToRelocate\":\"true\",\"annualRevenueMin\":\"USD100000\",\"annualRevenueMax\":\"USD1000000\",\"companyCountries\":[\"id1\"],\"ownership\":\"Wholly Owned Subsidiary\",\"companyStates\":[\"id1\"],\"numberOfEmployees\":\">1000\",\"functionCodes\":[],\"targetedCompanies\":[],\"naicsCodes\":[],\"engagementId\":null}");
});
test ("toSOQLPredicate", function(){});
test ("addFunctionCode", function(){});
test ("addTargetedCompany", function(){});
test ("addNAICSCode", function(){});

module("Search.Model.SearchResult");
test ("basicTest", function(){});

module("Search.Model.SearchResults");
test ("addToCollection", function(){});
test ("removeFromCollection", function(){});

module("Search.Model.SelectedContacts");
test ("addContact", function(){});
test ("removeContact", function(){});

module("Search.Model.App");
test ("search", function(){});
test ("addCandidates", function(){});
test ("saveSearchTerms", function(){});
test ("loadSearchTerms", function(){});
test ("saveSearchResults", function(){});
test ("loadSearchResults", function(){});