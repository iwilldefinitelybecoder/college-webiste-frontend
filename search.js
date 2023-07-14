const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');
const deleteBtnn = document.getElementById('deleteBtnn')

deleteBtnn.style.display = 'none'
let a
function fetchRecords() {
  const searchText = searchInput.value.trim();

  // Send the search text to the backend
  fetch(`http://localhost:3000/search?bookname=${searchText}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
  // Clear previous results
  if(data.length !== 0){
    resultsList.innerHTML = '';
    // Display the filtered results
    data.forEach(result => {

      deleteBtnn.style.display = 'block'

      const card = document.createElement('div');
      card.classList.add('card');
      document.addEventListener('keyup',(e)=>deleteApi(e))
    
      const img = document.createElement('img');
      img.src = result.image;
      img.alt = 'Book Cover';
      img.loading = 'lazy'
      img.classList.add('card-image');
    
      const bookInfo = document.createElement('div');
      bookInfo.classList.add('card-info');
    
      const bookName = document.createElement('p');
      bookName.textContent = `Bookname:${result.bookname}`;
      bookName.classList.add('book-name');
    
      const author = document.createElement('p');
      author.textContent =`Author:${result.author}` ;
      author.classList.add('author');
      
      const label = document.createElement('label')
      label.innerText = 'Select'
      label.classList.add('deleteBoxx')
      label.id = 'deleteBox'
      label.style.display = 'none'
      label.style.alignItems = 'center';
      label.style.marginRight = ' 20px'

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.id = 'deleteBox'
      checkbox.classList.add('deleteBoxx')
      checkbox.style.display = 'none'
      checkbox.style.transform = 'scale(1.5)'
      checkbox.style.marginLeft = ' 15px'
      checkbox.addEventListener('change',(e)=>deleteRecord(e,result._id))

      label.appendChild(checkbox)

      bookInfo.appendChild(bookName);
      bookInfo.appendChild(author);
      bookInfo.appendChild(label)
    
      card.appendChild(img);
      card.appendChild(bookInfo);
    
      resultsList.appendChild(card);
    });
  }else{
    resultsList.innerHTML = '';
    deleteBtnn.style.display = 'none'
    const cards = document.getElementsByClassName('card')
    if(cards.length === 0){

      const card = document.createElement('div');
        card.classList.add('card');
        document.addEventListener('keyup',(e)=>deleteApi(e))
      
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('card-info');
      
        const bookName = document.createElement('p');
        bookName.textContent = `No Results Found!`;
        bookName.classList.add('book-name');
  
        bookInfo.appendChild(bookName);
        card.appendChild(bookInfo);
      
        resultsList.appendChild(card);
    }
  }
  })
  .catch(error => console.error('Error:', error));
};

searchInput.addEventListener('keyup',(e)=>fetchRecords())


function enableDelete(e) {
  const checkboxes = document.querySelectorAll('#deleteBox');
 
  checkboxes.forEach(checkbox => {
    checkbox.style.display = checkbox.style.display === 'none' ? 'flex' : 'none';
  });
}

let arr = []
function deleteRecord(e,ID){
  
  function duplicate(id){
    const value = arr.find(ar=>ar === id)
    if(value){
      let values = arr.filter(ar=>ar!==id)
      arr = values
    }
    return !value
  }
 
     if(duplicate(ID) ){
      arr.push(ID)
    }
  }
   
function deleteApi(e){
  let code = e.keyCode || e.which;
  if(code === 13) { 
    e.preventDefault();
    const checkboxes = document.getElementById('deleteBox');
    if(checkboxes.style.display === 'flex' && arr.length !== 0 ){
      arr.forEach(ar=>{
        let values = arr.filter(ars=>ars!==ar)
        arr = values
      fetch('http://localhost:3000/delete/records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ar})
        })
        .then(response=> response.text())
        .then(res=>{
          fetchRecords()
          function showUpdateMessage() {
            const message = document.getElementById('update-message');
            message.style.display = 'block'
            
            setTimeout(() => {
              message.style.display = 'none';
            }, 5000);
          }
          
          
          showUpdateMessage();
          
        })
        .catch(err=>{console.log(err.message)})
    })
    }
  }
}
