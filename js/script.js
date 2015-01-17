// element containing the table
var $root = $('.table-container');

// download file
function fetchData(u, dt){
	var req = $.getJSON(u);
	req.then(dt);
}
// create td element
function createTD(inner){
	var td = $('<td>');
	td.append(inner);
	return td;
}

// generate table
function generateTable (data) {
	// rows
	var rows = [];
	// table headers
	var headers = ['Name', 'City/Region', 'Contact'];

	// table root element
	var table = $('<table>', {
		class:'community-table'
	});
	// create a td element
	var thead = $('<thead>');
	var tbody = $('<tbody>');

	// generate table headers
	var headRow = $('<tr>');
	for ( header in headers ){
		var th = $('<th>', {
			text: headers[header]
		});
		headRow.append(th);
	}
	thead.append(headRow);

	for( f in data.features ) {
		var item = data.features[f];
		// item row
		var row = $('<tr>');
		// get properties
		var property =  item.properties;

		var cname = $('<a>', {
			href: property.url,
			text: property.name
		});

		var country = property.city;
		// list of possible contacts
		var contacts = ['facebook', 'twitter', 'irc', 'email', 'googleplus', 'phone', 'jabber'];
		// create contact list
		var cList = $('<ul>').addClass('contacts');

		for ( c in contacts ) {

			var contact_name = contacts[c]
			var contact = property[contact_name];

			if (contact != undefined){
				var e = $('<a>', { 
					href: contact,
					text: contacts[c],
					class: 'link-'+contacts[c]
				});
				// special cases
				if ( contact_name == 'email') {
					e.attr('href', 'mailto:'+e.attr('href'))
				}
				if ( contact_name == 'phone') {
					e.attr('href', 'tel:'+e.attr('href'))
				}
				if ( contact_name == 'twitter'){
					e.attr('href', 'http://twitter.com/'+e.attr('href'));
				}
				var li = $('<li>');
				li.append(e);
				cList.append(li);
			}
		}

		var contactTD = createTD(cList);

		tds = [ createTD(cname), createTD(country), contactTD ];
		for (td in tds) {
			row.append(tds[td]);
		}
		
		rows.push(row);
	}
	// add the rows
	for (row in rows){
		tbody.append(rows[row]);
	}
	// add thead to table
	table.append(thead);
	// append table body
	table.append(tbody);
	// append to root
	$root.append(table);

	// remove loading sign
	$('.img-loading').css('display', 'none');
	// sort table
	$('.community-table').tablesorter({sortList:[[1,0]]})
}
