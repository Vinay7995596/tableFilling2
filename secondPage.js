var storedData = localStorage.getItem('data');
  var dataArr = JSON.parse(storedData);

  // consoling data of its come or not
  console.log(JSON.parse(storedData)[0].description)
  
  // Function to display the stored data in the table
  function displayStoredData() {
    var table = document.getElementById('stored-data-table');
    var tbody = table.querySelector('tbody');
  
    // Clear existing table rows
    tbody.innerHTML = '';
  
    var amount = 0
    // Iterate over the data array and create table rows
    dataArr.forEach(function(data) {
      var newRow = document.createElement('tr');
  
      var descriptionCell = document.createElement('td');
      descriptionCell.textContent = data.description;
  
      var unitCell = document.createElement('td');
      unitCell.textContent = '$' + data.unit;
  
      var rateCell = document.createElement('td');
      rateCell.textContent = data.rate;
  
      var amountCell = document.createElement('td');
      amountCell.textContent = '$' + data.amount;
      amount += parseInt(data.amount);
  
      newRow.appendChild(descriptionCell);
      newRow.appendChild(unitCell);
      newRow.appendChild(rateCell);
      newRow.appendChild(amountCell);
  
      tbody.appendChild(newRow);
    });

    // adding amount
    console.log(amount)

    let invoceTotalAmountEl = document.getElementById('invoceTotalAmount')
    invoceTotalAmountEl.textContent = '$'+ amount;
    let subtotalEl = document.getElementById('subtotal');
    subtotalEl.textContent = '$' + amount
  }
  
  // Call the function to display the stored data when the page loads
  displayStoredData();


// let printbuttonEl = document.getElementById('printButton');

// printbuttonEl.addEventListener('click',function(){
//     window.print();
//   })

function downloadPdf() {
  const element = document.getElementById('pdfContainer');
  html2pdf().from(element).save();
}