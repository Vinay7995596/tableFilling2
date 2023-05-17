document.getElementById('add-row').addEventListener('click', function() {
    var table = document.getElementById('data-table');
    var tbody = table.querySelector('tbody');
    
    // Create a new row
    var newRow = document.createElement('tr');
    
    // Create cells for the new row
    var descriptionCell = document.createElement('td');
    var unitCell = document.createElement('td');
    var rateCell = document.createElement('td');
    var amountCell = document.createElement('td');
    
    // Create input fields for each cell
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description[]';
    
    var unitInput = document.createElement('input');
    // unitInput.type = 'number';
    // unitInput.name = 'unit[]';
    unitInput.type = "text";
    unitInput.name = "currency-field";
    unitInput.id = "currency-field";
    unitInput.pattern = "^\$\d{1,3}(,\d{3})*(\.\d+)?$";
    unitInput.value = "";
    unitInput.setAttribute('data-type', 'currency');
    unitInput.placeholder = "$";
    
    var rateInput = document.createElement('input');
    rateInput.type = 'number';
    rateInput.name = 'rate[]';
    
    var amountInput = document.createElement('input');
    // amountInput.type = 'number';
    // amountInput.name = 'amount[]';
    amountInput.type = "text";
    amountInput.name = "currency-field";
    amountInput.id = "currency-field";
    amountInput.pattern = "^\$\d{1,3}(,\d{3})*(\.\d+)?$";
    amountInput.value = "";
    amountInput.setAttribute('data-type', 'currency');
    amountInput.placeholder = "$";
    
    // Append input fields to their respective cells
    descriptionCell.appendChild(descriptionInput);
    unitCell.appendChild(unitInput);
    rateCell.appendChild(rateInput);
    amountCell.appendChild(amountInput);
    
    // Append cells to the new row
    newRow.appendChild(descriptionCell);
    newRow.appendChild(unitCell);
    newRow.appendChild(rateCell);
    newRow.appendChild(amountCell);
    
    // Append the new row to the table body
    tbody.appendChild(newRow);
  });

function Data(description, unit, rate, amount) {
    this.description = description;
    this.unit = unit;
    this.rate = rate;
    this.amount = amount;
  }


  function Data(description, unit, rate, amount) {
    this.description = description;
    this.unit = unit;
    this.rate = rate;
    this.amount = amount;
  }
  
  document.getElementById('save-data').addEventListener('click', function() {
    var table = document.getElementById('data-table');
    var rows = table.querySelectorAll('tbody tr');
    
    var dataArr = [];
    
    rows.forEach(function(row) {
      var cells = row.querySelectorAll('td');
      
      var description = cells[0].querySelector('input').value;
      var unit = cells[1].querySelector('input').value;
      var rate = cells[2].querySelector('input').value;
      var amount = cells[3].querySelector('input').value;
      
      var data = new Data(description, unit, rate, amount);
      
      dataArr.push(data);
    });
    
    // Store the data in local storage as a JSON string
    localStorage.setItem('data', JSON.stringify(dataArr));
  });


  $("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}


