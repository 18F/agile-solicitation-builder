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

function getComponents(data, states){
	componentStates = {};
	for (i=0; i < states.length; i++){
		var state = states[i];
		componentStates[state] = data[state];
	}
	return componentStates;
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
	console.log(data);
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

function createRFQ(dataDict, callback){
	console.log(dataDict);
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

