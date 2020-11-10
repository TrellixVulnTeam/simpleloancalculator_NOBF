// Listen for submit
document.querySelector('.loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.querySelector('.results').style.display ='none';
    // Show Loader
    document.getElementById('loading').style.display ='block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results Function
function calculateResults(){
    console.log('Calculating');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        // Show Results
        document.querySelector('.results').style.display ='block';
        // Hide loader
        document.getElementById('loading').style.display ='none';
    } else {
        showError('Please check your numbers');
    }
}

// Show Error Function
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errorDiv.className = 'alert';
    // Create text node and append to the div
    errorDiv.appendChild(document.createTextNode(error));
    // Hide loader
    document.getElementById('loading').style.display ='none';
    // Insert Error above Heading
    card.insertBefore(errorDiv, heading);
    // Clear Error after time
    setTimeout(clearError, 3000);

};

// Clear Error Function
function clearError(){
    document.querySelector('.alert').remove();
}