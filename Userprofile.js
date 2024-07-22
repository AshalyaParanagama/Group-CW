const profileDetails = {};
const steps = [
  [
    { label: "First Name", key: "First Name", type: "text" },
    { label: "Last Name", key: "Last Name", type: "text" },
    { label: "Age", key: "Age", type: "number" },
    { label: "Sex", key: "Sex", type: "text" },
  ],
  [
    { label: "Birth of Date", key: "Birth of Date", type: "text" },
    { label: "E-mail", key: "E-mail", type: "text" },
    { label: "Phone No", key: "Phone No", type: "text" },
  ],
  [
    { label: "Area of Study", key: "Area of Study", type: "text" },
    { label: "University / Institute", key: "University / Institute", type: "text" },
    { label: "Country", key: "Country", type: "text" },
    { label: "Agree to Privacy Terms", key: "Agree with Privacy", type: "confirm" }
  ]
];
let currentStep = 0;

document.getElementById('startProfileButton').addEventListener('click', () => {
  currentStep = 0;
  updateProfile();
  collectStepData(currentStep);
});

document.getElementById('prevStepButton').addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    collectStepData(currentStep);
  }
});

document.getElementById('nextStepButton').addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    collectStepData(currentStep);
  }
});

document.getElementById('skipStepButton').addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateProfile();
    updateProgressBar();
  }
});

function collectStepData(step) {
  const stepData = steps[step];
  stepData.forEach(field => {
    let value;
    do {
      if (field.type === 'confirm') {
        value = confirm(field.label) ? "Yes" : "No";
      } else {
        value = prompt(field.label);
      }
    } while (!validateField(field.key, value));
    profileDetails[field.key] = value;
  });
  updateProfile();
  updateProgressBar();
}

function validateField(key, value) {
  switch (key) {
    case "First Name":
    case "Last Name":
      if (!value || !/[A-Za-z\s]/.test(value)) {
        alert("Names must contain only letters and spaces.");
        return false;
      }
      break;
    case "Age":
      if (!value || isNaN(value) || value <= 0) {
        alert("Age must be a positive number.");
        return false;
      }
      break;
    case "Sex":
      if (!value || !["Male", "Female", "Other"].includes(value)) {
        alert("Gender must be either 'Male', 'Female', or 'Other'.");
        return false;
      }
      break;
    case "University / Institute":
    case "Country":
    case "Area of Study":
      if (!value || !/[A-Za-z\s]/.test(value)) {
        alert("These must contain only letters and spaces.");
        return false;
      }
      break;
    case "Birth of Date":
      if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) {
        alert("Birth of Date must be in the format YYYY-MM-DD.");
        return false;
      }
      break;
    case "E-mail":
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]/.test(value)) {
        alert("E-mail must be a valid email address.");
        return false;
      }
      break;
    case "Phone No":
      if (!value || !/^\d{10,15}/.test(value)) {
        alert("Phone No must be a valid phone number with 10 to 15 digits.");
        return false;
      }
    default:
      return true;
  }
  return true;
}

function updateProfile() {
  const profileDetailsDiv = document.getElementById('profileDetails');
  profileDetailsDiv.innerHTML = '';
  for (const key in profileDetails) {
    const detailDiv = document.createElement('div');
    detailDiv.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${profileDetails[key]}`;
    profileDetailsDiv.appendChild(detailDiv);
  }
  document.getElementById('prevStepButton').disabled = currentStep === 0;
  document.getElementById('nextStepButton').disabled = currentStep === steps.length - 1;
  document.getElementById('skipStepButton').disabled = currentStep === steps.length - 1;
}

function updateProgressBar() {
  const totalFields = steps.flat().length;
  const completedFields = Object.keys(profileDetails).length;
  const progressPercent = (completedFields / totalFields) * 100;
  document.getElementById('progressBar').style.width = `${progressPercent}%`;
}
