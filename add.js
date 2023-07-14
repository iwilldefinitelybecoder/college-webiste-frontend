
const bookForm = document.getElementById('bookForm');
const fileUpload = document.getElementById('fileUpload');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const successMessage = document.getElementById('successMessage');
const failureMessage = document.getElementById('failureMessage')
const uploadImg = document.getElementById('uploadImg')
const uploadImgPic = document.getElementById('uploadImgPic')
const failedUpload = document.getElementById('failedUpload')

  function keypress(e){
    let code = e.keyCode || e.which;
    if(code === 13) { 
      e.preventDefault();

  const bookName = document.getElementById('bookName').value.trim();
  const authorName = document.getElementById('authorName').value.trim();
  const imageUrl = fileNameDisplay.textContent.trim()

  // Send the book data to the backend
  fetch('http://localhost:3000/addRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookName, authorName, imageUrl })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Book added successfully:');
    // Reset the form
    bookForm.reset();
    fileNameDisplay.innerText = ' '
    fileNameDisplay.textContent = ' '
    uploadImgPic.src = ' '
    uploadImg.style.display = 'none'
    successMessage.classList.remove('hidden');

function showSuccessMessage() {
  successMessage.classList.add('hidden');
}


setTimeout(showSuccessMessage, 3500);
  }) 
  .catch(error => {
    failureMessage.classList.remove('hiddened');
    function showFailureMessage() {
      failureMessage.classList.add('hiddened');
    }
    setTimeout(showFailureMessage, 3500);
    console.error('Error:', error)});
    
    }
  }



 function submit (e) {
  e.preventDefault();

  const bookName = document.getElementById('bookName').value.trim();
  const authorName = document.getElementById('authorName').value.trim();
  const imageUrl = fileNameDisplay.textContent.trim()

  // Send the book data to the backend
  fetch('http://localhost:3000/addRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookName, authorName, imageUrl })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Book added successfully:');
    // Reset the form
    bookForm.reset();
    fileNameDisplay.innerText = ' '
    fileNameDisplay.textContent = ' '
    uploadImgPic.src = ' '
    uploadImg.style.display = 'none'
    successMessage.classList.remove('hidden');
function showSuccessMessage() {
  successMessage.classList.add('hidden');
}

setTimeout(showSuccessMessage, 3500);
  })
  .catch(error => {
    failureMessage.classList.remove('hiddened');
    function showFailureMessage() {
      failureMessage.classList.add('hiddened');
    }
    setTimeout(showFailureMessage, 3500);
    console.error('Error:', error)});
};


bookForm.addEventListener('submit',  submit)
bookForm.addEventListener('keypress', keypress)

//upload file
fileUpload.addEventListener('change', async () => {
  const file = fileUpload.files[0];
  if (!file) {
    return;
  }



  const formData = new FormData()
  formData.append('name',file.name)
  formData.append('file',file)
  try {
    response = await fetch('http://localhost:3000/file/upload', {
      method: 'POST',
      body:formData
    })
    const filename = await response.json();
    uploadImg.style.display = 'block'
    // if(uploadImg){
    uploadImgPic.src = filename
    uploadImgPic.classList.add('uploadedImg')
    // }else{
    //   const img  = document.createElement('img')
    //   img.src = filename
    //   img.classList.add('uploadedImg')
    //   uploadImg.appendChild(img)
    // }
   
    fileNameDisplay.textContent = filename;
  } catch (error) {
    failedUpload.classList.remove('hiddened');
    function showFailureMessage() {
      failedUpload.classList.add('hiddened');
    }
    setTimeout(showFailureMessage, 3500);
    console.log(error.message)
  }

  
});

function Delete(e){
  fileNameDisplay.textContent = ' '
  uploadImgPic.src = ' '
  uploadImg.style.display = 'none'
}


const customFileUpload = document.querySelector('.custom-file-upload');
const selectFileButton = customFileUpload.querySelector('span');

selectFileButton.addEventListener('click', () => {
  fileUpload.click(); 
});


