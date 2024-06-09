// Get all necessary elements
const form = document.querySelector("#form");

// Compose function for support
const compose =
  (f, g) =>
  (...args) =>
    f(g(...args));

const ValidateForm = (...fns) => fns.reduce(compose);

// Support functions

// Prevent default behavior
function preventDefault(e) {
  e.preventDefault();
  return e; // Ensure the event is returned for the next function
}

// Validate API function using closure
function validateAPI() {
  let isValid = false; // Initial state set to false

  // Function to update the isValid state
  function updateValidity(e) {
    isValid = form.checkValidity(); // Check form validity and update isValid
    return e; // Return the event for the next function in the chain
  }

  // Function to act based on the updated isValid state
  function checkValidityState(e) {
    const messageContainer = document.querySelector('#error-massage')
    const massage = document.querySelector('#massage')
    if (isValid) {
        messageContainer.classList.add('valid-message-container')
        massage.classList.add('valid-message')
        messageContainer.classList.remove('invalid-message-container')
        massage.classList.remove('invalid-message')
        massage.textContent = "Form is invalid. Please fix it!"
      massage.textContent = "Form is valid. Proceed with submission."
    } else {
        messageContainer.classList.remove('valid-message-container')
        massage.classList.remove('valid-message')
        messageContainer.classList.add('invalid-message-container')
        massage.classList.add('invalid-message')
        massage.textContent = "Form is invalid. Please fix it!"
      return;
    }
    return e; // Return the event for the next function in the chain
  }

  // Return both functions
  return [updateValidity, checkValidityState];
}

// Get the functions from the closure
const [updateStateForm, checkStateForm] = validateAPI();

// Event listener for form submission
form.addEventListener("submit", (e) => {
  // Compose preventDefault, updateStateForm, and checkStateForm to handle form submission
  ValidateForm(checkStateForm, updateStateForm, preventDefault)(e);
});
