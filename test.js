eFormEvents.onFormLoadComplete = function() {
	//_loadScript("/ssbti/js/jquery.min.js");
	//_loadScript("/ssbti/js/kendo.all.min.js");
	_loadScript("/ssbti/js/_Common_Core_JS.js");
	_loadScript("/ssbti/js/_Common_JS.js");
	//utils.loadCSS("/ssbti/css/default-main.css", $.noop, $.noop);
	_commonLoad();

	function _loadScript(url) {
		$.ajax({
			dataType: "script",
			cache: false,
			async: false,
			url: url,
			error: function(xhr, status, error) {
				console.log(arguments);
			}
		});
	}
	eFormCustomSettings.currentForm.lookupCaching.excludeItems.push({
		lookupName: "loopupInputOutput"
	});
init();
}
function init()
{
	eFormHelper.getLoggedInUserDetails($.noop(), function(result) {
	
	    efh.setFieldValue('txtcurrentLoginUser', result.data.UserDetails.UserName);
	  Search();
	
	});
	
}
function Search() {
	efh.triggerAutoLookup('AutoInputoutputLookup', null);
}

function Add() {
	window.open(
		'/appbuilder/formrender?FormApplication=InputOutput_New%20InputOutput'
		);
}

function iterateEachSFRecord(elm) {
debugger;
	var fieldData = $(elm).val();

	var records = [];
	eFormHelper.getSubFormData({
		fieldId: 'inputoutput'
	}, function(res) {
		records = res.data;
	});

	var recordIndex = records.findIndex(function(record) {
		return record.subID === fieldData;
	});
	var rowIndex = recordIndex + 1;

	eFormHelper.getField({
		fieldId: 'inputoutput/subaction:[' + rowIndex + ']'
	}, function(response) {
		if (response.isSuccess === true) {
debugger;
			var id = efh.getFieldValue('inputoutput/subID:[' + rowIndex + ']');
			var updated_url = getUpdateLink(id);

			response.data.empty().append(
				
'<a href="' + updated_url +
				'" target="_blank"> 更新 </a>'
         
                   );

		}

	});

}



function getUpdateLink(idValue) {
	var options = {
		formName: 'InputOutput_Update InputOutput',
		dataSourceName: 'InputOutput',
		dataSourceType: 'APDataEntityDataSource',
		primaryKeyColumnName: 'ID',
		primaryKeyColumnValue: idValue
	};
	return constructFormUrl(options);
}

function constructFormUrl(params) {
    var options = {
        formName: '',
        dataSourceName: '',
        dataSourceType: '',
        primaryKeyColumnName: '',
        primaryKeyColumnValue: ''
    };
    Object.assign(options, params);
 
    var url = window.location.href,
        queryString = window.location.search;
 
    var updateFormUrl = url.replace(queryString, '') + '?FormApplication=' + options.formName + '&ds=' + btoa('dsn=' + options.dataSourceName + ';dst=' + options.dataSourceType + ';pk=' + encodeURIComponent('' + options.primaryKeyColumnName + '=' + options.primaryKeyColumnValue + ';')) + '&dsvp=' + btoa(queryString.replace('?', ''));
 
    return updateFormUrl;
}