// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var createButton = document.querySelector('.create_new_button');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
createButton.addEventListener('click', function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    var questionTitle = document.getElementById('questionTitle').value;
    var questionDescription = document.getElementById('questionDescription').value;
    
    // Create an object to hold question data
    var questionData = {
        title: questionTitle,
        description: questionDescription
    };
    
    // Log the questionData object to the console
    console.log(questionData);
    
    // Clear form fields
    document.getElementById('questionTitle').value = '';
    document.getElementById('questionDescription').value = '';
    
    // Close the modal
    modal.style.display = "none";
});
