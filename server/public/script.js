console.log('js');

let idCounter = 0;
let empList = [];

$(document).ready(readyNow);

function readyNow() {
	console.log('JQ');

	// Create event handlers
	$('#addEmployee').on('click', addNewEmployee);
	$('.employeeList').on('click', 'button', function() {
		let deletion = empList.indexOf($(this).attr('id'));
		let newList = [];
		for (let i = 0; i < empList.length; i++) {
			if (i !== deletion) {
				newList.push(empList[i]);
			}
		}
		empList = newList;
		$(this).parent().parent().remove();
		updateMonthly();
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

	$('#tableBody').append(
		'<tr id="emp' + idCounter + '" class="employeeList">' +
			'<td class="employeeFirstName">' + $('#employeeFirstName').val() + '</td>' +
			'<td class="employeeLastName">' + $('#employeeLastName').val() + '</td>' +
			'<td class="employeeID">' + $('#employeeID').val() + '</td>' +
			'<td class="employeeTitle">' + $('#employeeTitle').val() + '</td>' +
			'<td class="employeeSalary">' + commaDisplay($('#employeeSalary').val()) + '</td>' +
			'<td class="employeeDelete"><button id="' + idCounter + '" class="deleteButton">Delete</button></td>' +
		'</tr>'
	);
	empList.push(String(idCounter));
	idCounter++;
	// commaDisplay($('#employeeSalary').val());
	updateMonthly();
}

function updateMonthly() {
	$('#monthlyCalc').text(Math.round(calculateTotal() * 100) / 100);
	if (parseInt(calculateTotal()) > 20000) {
		$('#monthlyCalc').css('background-color', 'red');
	} else {
		$('#monthlyCalc').css('background-color', 'lightGreen');
	}
}

function calculateTotal() {
	let total = 0;
	for (let i = 0; i < empList.length; i++) {
		total += commaRemove(String($('#emp' + empList[i]).children('.employeeSalary').text()));
	}
	return (total / 12);
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
