document.addEventListener('DOMContentLoaded', function(){
	const companySelect = document.getElementById('company');
	const carrierSelect = document.getElementById('carrier');
	const employeeSelect = document.getElementById('employee');

	const otherCompanyInput = document.getElementById('otherCompanyInput');
	const otherCarrierInput = document.getElementById('otherCarrierInput');
	const otherEmployeeInput = document.getElementById('otherEmployeeInput');
	
	companySelect.addEventListener('change', function(){
		const selectedValue = companySelect.value;
		if (selectedValue === 'Outros'){
			otherCompanyInput.style.display = 'block';
		} else {
			otherCompanyInput.style.display = 'none';
		}
	});

	carrierSelect.addEventListener('change', function(){
		const selectedValue = carrierSelect.value;
		if (selectedValue === 'Outros'){
			otherCarrierInput.style.display = 'block';
		} else {
			otherCarrierInput.style.display = 'none';
		}
	});

	employeeSelect.addEventListener('change', function(){
		const selectedValue = employeeSelect.value;
		if (selectedValue === 'Outros'){
			otherEmployeeInput.style.display = 'block';
		} else {
			otherEmployeeInput.style.display = 'none';
		}
	});
	
});

let order = 1;

function addToArrivalList(){
	const company = getSelectedOption('company');
	const carrier = getSelectedOption('carrier');
	const driverName = document.getElementById('driverName').value;
	const shift = getSelectedOption('shift');
	const employee = getSelectedOption('employee');

	const listItem = document.createElement('li');
	listItem.innerHTML = `<strong>${order}° Lugar:</strong> ${company} | ${carrier} | ${driverName} | ${shift}° Turno | Funcionário: ${employee} <button onclick="removeFromList(this)">Remover</button>`;
	
	const list = document.getElementById('list');
	list.appendChild(listItem);

	order++;
	
	clearInputFields();
	}

	function getSelectedOption(selectId){
		const select = document.getElementById(selectId);
		const selectedValue = select.value;
		if (selectedValue === 'Outros'){
			if (selectId === 'company'){
				return document.getElementById('otherCompanyInput').value;
			} else if (selectId === 'carrier'){
				return document.getElementById('otherCarrierInput').value;
			} else if (selectId === 'employee'){
				return document.getElementById('otherEmployeeInput').value;
			}
		}
		return selectedValue;
	}
	
	function clearInputFields(){
		document.getElementById('company').value = '';
		document.getElementById('carrier').value = '';
		document.getElementById('driverName').value = '';
		document.getElementById('shift').value = '';
		document.getElementById('employee').value = '';
		document.getElementById('otherCompanyInput').value = '';
		document.getElementById('otherCarrierInput').value = '';
		document.getElementById('otherEmployeeInput').value = '';

		document.getElementById('otherCompanyInput').style.display = 'none';
		document.getElementById('otherCarrierInput').style.display = 'none';
		document.getElementById('otherEmployeeInput').style.display = 'none';
	}
	

	function removeFromList(button){
		const listItem = button.parentNode;
		const list = document.getElementById('list');
		list.removeChild(listItem);
	
		order--;

	const listItems = list.querySelectorAll('li');
		listItems.forEach((item, index) => {
		item.querySelector('strong').textContent = `${index + 1}° Lugar:`;
	});
	
}

function updateLogoVisibility(){
	var logoImage = document.getElementById("logo-image");
	if (window.innerWidth <= 980){
		logoImage.style.display = "none";
	} else {
		logoImage.style.display = "block";	
	}
}

updateLogoVisibility();

window.addEventListener("resize", updateLogoVisibility);

function printArrivalList(){
	var printContents = document.getElementById("arrival-list").innerHTML;
	var originalContents = document.body.innerHTML;
	
	document.body.innerHTML = printContents;
	
	window.print();
	
	document.body.innerHTML = originalContents;
}

document.getElementById("printButton").addEventListener("click", printArrivalList);