function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/home";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}


function submitData() {
    const newData = document.getElementById('input1').value;
    let userData = [];
    if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('userData='))) {
      const existingData = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('userData='))
        .split('=')[1];
      userData = JSON.parse(existingData);
    }
    userData.push(newData);
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); 
    document.cookie = `userData=${JSON.stringify(userData)}; expires=${expirationDate.toUTCString()}`;
  
    alert('Data submitted successfully!');
  }

  function searchData() {
    const searchQuery = document.getElementById('input2').value;
    const matchingDataField = document.getElementById('matchingDataField');

    let userData = [];
    if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('userData='))) {
        const existingData = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('userData='))
          .split('=')[1];
        userData = JSON.parse(existingData);
        const matchingData = userData.filter(data => data.includes(searchQuery));
        if (matchingData.length > 0) {
            matchingDataField.value = matchingData.join(', ');
            alert(`Matching data found: ${matchingData.join(', ')}`);
        } else {
      
          matchingDataField.value = 'No matching data found!';

        }
    }else{
        matchingDataField.value = 'No data available!';

    }
   
  }
  
  function clearCookie() {
    document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('All cookie data cleared!');
  }
  
  function logout() {
    document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  }
  