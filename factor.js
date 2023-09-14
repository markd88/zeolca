eFormEvents.onFormLoadComplete = function() {
	_loadScript("/ssbti/js/jquery.min.js");
	_loadScript("/ssbti/js/kendo.all.min.js");
	_loadScript("/ssbti/js/_Common_Core_JS.js");
	_loadScript("/ssbti/js/_Common_JS.js");
	utils.loadCSS("/ssbti/css/default-main.css", $.noop, $.noop);
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
	loadData();
}

function loadData() {
	efh.executeLookup('lookupAllFactor', (result) => {
		const level1Array = new Array();
		debugger;
		$.each(result.data, function(index, value) {
			debugger;
			if ($('[level1="' + value.level1 + '"]').length === 0) {
				$('#RawHtmlforFactor').append(
					'<div class="ant-card" id="card' + value.id + '">' +
					'	<div class="ant-card-head"> ' +
					'		<div class="ant-card-head-title">' + value.level1 + '</div> ' +
					'	</div> ' +
					'	<div class="ant-card-body" id="level1' + value.id + '" level1="' + value
					.level1 + '"> ' +

					'	</div> ' +
					'</div> '
				);

			}

      debugger;
			if ($('[level21="' + value.level1 + '"][level2="' + value.level2 + '"]').length === 0) {

				$('[level1="' + value.level1 + '"]').append(

					'		<div id="level2' + value.id + '"> ' +
					'			<div class="ant-item-container" id="itemcontainer' + value.id +
					'" level21="' + value.level1 + '" level2="' + value.level2 + '" > ' +
					'				 ' +
					'			</div> ' +
					'		</div> '

				);

			}
			if ($('[level3_1="' + value.level1 +
					'"][level2="' + value.level2 + '"]' +
					'[level3="' + value.level3 + '"]').length === 0) {
				$('[level21="' + value.level1 + '"][level2="' + value.level2 + '"]').append(

					'<div class="ant-space">' +
					'	<a target="_blank" class="ant-item" href="/appbuilder/forms?code=9FED000C29EB6E4111EE13C541409A21&Process=factor_detail&id='+value.id+'" id="level3' + value.id +
					'" level3_1="' + value.level1 +
					'" level2="' + value.level2 +
					+'" level3="' + value.level3 +
					'" > ' +
					value.level3 +
					'    </a>' +
					'</div> '

				);
			}
		})

		efh.executeLookup('lookupLevel1Level2', (result) => {
			$.each(result.data, function(index, value) {
				$('[level21="' + value.level1 + '"][level2="' + value.level2 + '"]')
					.kendoExpansionPanel({
						title: value.level2,
						subTitle: ''
					});
			});
		}, undefined);


	});
}
