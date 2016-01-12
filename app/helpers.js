function getId(url){
	var number = url.split("#/rfp/")[1].split("/question")[0];
	return parseInt(number);
}

function getStates(states){
	var statesDict = {"edit": null};
	for (i=0; i < states.length; i++){
		var state = states[i];
		statesDict[state] = "";
	}
	return statesDict;
}

function getComponents(data){
	states = Object.keys(data);
	// for (i=0; i < states.length; i++){
	// 	console.log('"' + states[i] + '",');
	// }
	componentStates = {};	
	for (i=0; i < states.length; i++){
		var state = states[i];
		componentStates[state] = data[state];
	}
	return componentStates;
}

function getDeliverables(doc_id, callback){
	$.ajax({
		type: "GET",
		url: "/api/get_deliverables/" + doc_id,
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function putDeliverables(doc_id, data, callback){
	$.ajax({
		type: "PUT",
		url: "/api/get_deliverables/" + doc_id,
		data: JSON.stringify({data: data}),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function get_data(section, doc_id, callback){
	$.ajax({
		type: "GET",
		url: "/api/get_content/" + doc_id + "/sections/" + section,
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function put_data(section, doc_id, data, callback){
	$.ajax({
		type: "PUT",		
		url: "/api/get_content/" + doc_id + "/sections/" + section,
		data: JSON.stringify({data: data}),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function getRFQs(callback){
	$.ajax({
		type: "GET",
		url: "/api/rfqs",
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function getAgencies(callback){
	$.ajax({
		type: "GET",
		url: "/api/agencies",
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function createRFQ(dataDict, callback){
	$.ajax({
		type: "POST",
		url: "/api/rfqs",
		data: dataDict,
		dataType: 'json',
		success: function(data){
			if (callback){				
				callback(data);
			}
		}
	});
}

function createComponent(roleData, rfqId, sectionId, callback){
	$.ajax({
		type: "POST",
		url: "/api/custom_component/" + rfqId + "/section/" + sectionId,
		data: JSON.stringify({data: roleData}),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			if (callback){				
				callback(data);
			}
		}
	});
}

function getCustomComponents(rfqId, sectionId, callback){
	$.ajax({
		type: "GET",
		url: "/api/custom_component/" + rfqId + '/section/' + sectionId,
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

function createCLIN(clinData, rfqId, callback){
	window.cd = clinData;
	$.ajax({
		type: "POST",
		url: "/api/clins/" + rfqId,
		data: JSON.stringify({data: clinData['clinData']}),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){			
			if (callback){				
				callback(data);
			}
		}
	});
}

function getCLINs(rfqId, callback){
	$.ajax({
		type: "GET",
		url: "/api/clins/" + rfqId,
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}

