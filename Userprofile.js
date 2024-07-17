const profileDetails = {};
const steps = [
  [
    { label: "First Name", key: "First Name", type: "text" },
    { label: "Last Name", key: "Last Name", type: "text" },
    { label: "Age", key: "Age", type: "number" },
    { label: "Gender", key: "Gender", type: "text" },
    { label: "Agree to Privacy Terms", key: "Agree with Privacy", type: "confirm" }
  ],
  [
    { label: "Rational", key: "Rational", type: "text" },
    { label: "DoA", key: "DoA", type: "text" },
    { label: "Task", key: "Task", type: "text" },
    { label: "Place", key: "Place", type: "text" },
    { label: "Assignment Type", key: "Assignment Type", type: "text" }
  ],
  [
    { label: "Area of Study", key: "Area of Study", type: "text" },
    { label: "Highest Study", key: "Highest Study", type: "text" },
    { label: "University / Institute", key: "University / Institute", type: "text" },
    { label: "Year of Completion", key: "Year of Completion", type: "text" },
    { label: "Country", key: "Country", type: "text" }
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
  if (currentStep < steps.length - 1){
    currentStep++;
    updateProfile();
    updateProgressBar();
  }  
});

function collectStepData(step) {
  const stepData = steps[step];
  stepData.forEach(field => {
    let value;
    if (field.type === 'confirm') {
      value = confirm(field.label) ? "Yes" : "No";
    } else {
      value = prompt(field.label);
    }
    profileDetails[field.key] = value;
  });
  updateProfile();
  updateProgressBar();
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
