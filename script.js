console.log('js');

let dark = false;
let idCounter = 0;

$(document).ready(readyNow);

function readyNow() {
	console.log('JQ');

	// Create event handlers
	$('#addEmployee').on('click', addNewEmployee);
	$('.employeeList').on('click', 'button', function() {
		$(this).parent().parent().remove();
		$('#monthlyCalc').text(calculateTotal());
	});
}

function isFormFilled() {
	if ($('#employeeFirstName').val() && $('#employeeLastName').val() && $('#employeeID').val() && $('#employeeTitle').val() && $('#employeeSalary').val()){
		return true;
	} else {
		return false;
	}
}

function addNewEmployee() {
	if (isFormFilled() == false) {
		return null;
	}
	let backgroundColor;
	if (dark) {
		backgroundColor = 'dark';
	} else {
		backgroundColor = 'light';
	}

	$('#tableBody').append(
		'<tr id="employee' + idCounter + '" class="employeeList ' + backgroundColor + '">' +
			'<td class="employeeListFirstName' + idCounter + '">' + $('#employeeFirstName').val() + '</td>' +
			'<td class="employeeListLastName' + idCounter + '">' + $('#employeeLastName').val() + '</td>' +
			'<td class="employeeListID' + idCounter + '">' + $('#employeeID').val() + '</td>' +
			'<td class="employeeListTitle' + idCounter + '">' + $('#employeeTitle').val() + '</td>' +
			'<td class="employeeListSalary' + idCounter + '">' + commaDisplay($('#employeeSalary').val()) + '</td>' +
			'<td class="employeeDelete"><button class="deleteButton">Delete</button></td>' +
		'</tr>'
	);
	dark ^= true;
	idCounter++;
	// commaDisplay($('#employeeSalary').val());
	$('#monthlyCalc').text(calculateTotal());
}

function calculateTotal() {
	let total = 0;
	for (let i = 0; i < idCounter; i++) {
		if ($('.employeeListSalary' + i).html() != undefined) {
			total += commaRemove($('.employeeListSalary' + i).html());
		}
	}
	return total / 12;
}

function commaRemove(quantity) {
	let noComma = '';
	for (let i = 0; i < quantity.length; i++) {
		if (quantity[i] != ',') {
			noComma += quantity[i];
		}
	}
	return parseInt(noComma);
}

function commaDisplay(quantity) {
	let commafy = '';
	for (let i = 0; i < quantity.length; i++) {
		commafy += quantity[i];
		if ((quantity.length - i) % 3 == 1 && i != quantity.length - 1) {
			commafy += ',';
		}
	}
	return commafy;
}
