$(document).ready(function(){

});

let currentSlide = 0;
let carouselArray = [ {carouselText : "Havells",carouselImage : "havells.webp" }, { carouselText : "Crabtree", carouselImage : "crabtree.webp"},{carouselText : "Phillips",carouselImage : "phillips.webp"}]; 

const nameRegex = '^[a-zA-Z\.\\s]*$';
const emailRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
const mobileRegex = '^[6-9]{1}[0-9]{9}$';
const addressRegex = '[A-Za-z0-9\.\-\s\,]';
const otherFileType = ['pdf','xlsx','docx'];
let uploadedImages = [];
let dataObject = {
  name: {
    isValid: false,
    value: '',
  },
  email: {
    isValid: false,
    value: '',
  },
  mobileNo: {
    isValid: false,
    value: '',
  },
  address: {
    isValid: false,
    value: '',
  }
};

const clearFieldsandErrors = () => {
  updateDataObject(false, 'name', '');
  updateDataObject(false, 'email', '');
  updateDataObject(false, 'mobileNo', '');
  updateDataObject(false, 'address', '');
  uploadedImages = [];
  document.getElementById('customerName').value = '';
  toggleErrorIcon('hideIcons', 'validCustomerName', 'invalidCustomerName');
  document.getElementById('customerEmail').value = '';
  toggleErrorIcon('hideIcons', 'validCustomerEmail', 'invalidCustomerEmail');
  document.getElementById('customerMobile').value = '';
  toggleErrorIcon('hideIcons', 'validCustomerMobile', 'invalidCustomerMobile');
  document.getElementById('customerAddress').value = '';
  toggleErrorIcon('hideIcons', 'validCustomerAddress', 'invalidCustomerAddress');
  removeImages();
  document.getElementById('placeOrderText').innerText="Place Order";
  document.getElementById('placeOrderButton').disabled = false;
};

// Validation Functions
const toggleErrorIcon = (isValid, validId, invalidId) => {
  const validIcon = document.getElementById(validId).classList;
  const invalidIcon = document.getElementById(invalidId).classList;
  if(isValid === true){
    validIcon.contains('hidden') && validIcon.remove('hidden');
    !invalidIcon.contains('hidden') && invalidIcon.add('hidden');
  }
  else if(isValid === false){
    invalidIcon.contains('hidden') && invalidIcon.remove('hidden');
    !validIcon.contains('hidden') && validIcon.add('hidden');
  }
  else if(isValid === "hideIcons"){
    !invalidIcon.contains('hidden') && invalidIcon.add('hidden');
    !validIcon.contains('hidden') && validIcon.add('hidden');
  }
};

const updateDataObject = (isValid, key, value = '') => {
  if(isValid){
    dataObject[key].value = value;
    dataObject[key].isValid = true;
  }
  else{
    dataObject[key].value = value;
    dataObject[key].isValid = false;
  }
};

const validateName = () => {
  const name = document.getElementById('customerName').value;
  const isNameValid = name.length > 5 && name.length < 20 && name.match(nameRegex);
  toggleErrorIcon(!!isNameValid, 'validCustomerName', 'invalidCustomerName');
  updateDataObject(!!isNameValid, 'name', name);
};

const validateEmail = () => {
  const email = document.getElementById('customerEmail').value;
  const isEmailValid = email.match(emailRegex);
  toggleErrorIcon(!!isEmailValid, 'validCustomerEmail', 'invalidCustomerEmail');
  updateDataObject(!!isEmailValid, 'email', email);
};

const validateMobile = () => {
  const mobile = document.getElementById('customerMobile').value;
  const isMobileValid = mobile.match(mobileRegex);
  toggleErrorIcon(!!isMobileValid, 'validCustomerMobile', 'invalidCustomerMobile');
  updateDataObject(!!isMobileValid, 'mobileNo', mobile);
};

const validateAddress = () => {
  const address = document.getElementById('customerAddress').value;
  const isAddressValid = address.length > 10 && address.length < 30 && address.match(addressRegex);
  toggleErrorIcon(!!isAddressValid, 'validCustomerAddress', 'invalidCustomerAddress');
  updateDataObject(!!isAddressValid, 'address', address);
};

// Carousel Functions

setInterval(function() {
  onNextBtnClick();
}, 4500);

const onPrevBtnClick = () =>{
  const carouselImageDiv = document.getElementById('carouselImage');
  const carouselTextDiv = document.getElementById('carouselText');
  currentSlide = (currentSlide - 1) < 0 ?  carouselArray.length-1 : --currentSlide;
  carouselImageDiv.style.backgroundImage = "url(../img/"+carouselArray[currentSlide].carouselImage+")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;
};

const onNextBtnClick = () =>{
  const carouselImageDiv = document.getElementById('carouselImage');
  const carouselTextDiv = document.getElementById('carouselText');
  currentSlide = (currentSlide + 1) > carouselArray.length-1 ?  0: ++currentSlide;
  carouselImageDiv.style.backgroundImage = "url(../img/"+carouselArray[currentSlide].carouselImage+")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;   
};

// File Upload UI functions
const triggerFileUpload = () => {
  document.getElementById('uploadFile').click();
};

const getFileType = (file) => {
  return file.split('.').pop();
};

const displayImageorText = (file, textId, imageId, image) => {
  const fileType = getFileType(file.name);
  const displayFile = document.getElementById(textId);
  const displayImage = document.getElementById(imageId);
  if(otherFileType.includes(fileType)){
    !displayImage.classList.contains('hidden') && displayImage.classList.add('hidden');
    displayFile.classList.contains('hidden') && displayFile.classList.remove('hidden');
    displayFile.innerText = fileType.toUpperCase();
  }
  else{
    !displayFile.classList.contains('hidden') && displayFile.classList.add('hidden');
    displayImage.classList.contains('hidden') && displayImage.classList.remove('hidden');
    displayImage.src = URL.createObjectURL(file);
  }
};

const displayImages = () => {
  const imagesLength = uploadedImages.length;
  const uploadFileText = document.getElementById("uploadFileText").classList;
  !uploadFileText.contains('hidden') && uploadFileText.add('hidden');
  if(imagesLength === 3){
    const imageThree = document.getElementById("imageThree").classList;
    imageThree.contains('hidden') && imageThree.remove('hidden');
    displayImageorText(uploadedImages[2], 'displayFileThree', 'displayImageThree');
  }
  if(imagesLength >= 2){
    const imageTwo = document.getElementById("imageTwo").classList;
    imageTwo.contains('hidden') && imageTwo.remove('hidden');
    displayImageorText(uploadedImages[1], 'displayFileTwo', 'displayImageTwo');
  }
  if(imagesLength >= 1){
    const imageOne = document.getElementById("imageOne").classList;
    imageOne.contains('hidden') && imageOne.remove('hidden');
    displayImageorText(uploadedImages[0], 'displayFileOne', 'displayImageOne');
  }
};

const removeImages = () => {
  const uploadFileText = document.getElementById("uploadFileText").classList;
  uploadFileText.contains('hidden') && uploadFileText.remove('hidden');
  const imageThree = document.getElementById("imageThree").classList;
  !imageThree.contains('hidden') && imageThree.add('hidden');
  const imageTwo = document.getElementById("imageTwo").classList;
  !imageTwo.contains('hidden') && imageTwo.add('hidden');
  const imageOne = document.getElementById("imageOne").classList;
  !imageOne.contains('hidden') && imageOne.add('hidden');
};

const uploadImage = () => {
  let newUploadedImages = Array.from(document.getElementById("uploadFile").files);
  if(uploadedImages.length + newUploadedImages.length <=3)
    uploadedImages = uploadedImages.concat(newUploadedImages);
  if(uploadedImages.length > 0 && uploadedImages.length <= 3){
    const uploadFileText = document.getElementById("uploadFileText").classList;
    !uploadFileText.contains('hidden') && uploadFileText.add('hidden');
    removeImages();
    displayImages();
  }
};

const deleteImage = (index) => {
  uploadedImages.splice(index,1);
  removeImages();
  if(uploadedImages.length > 0 && uploadedImages.length <= 3)
    displayImages();
};

const placeOrder = () => {
  const isReadyforSubmit = Object.values(dataObject).findIndex((field) => field.isValid === false);
  if(isReadyforSubmit === -1 && uploadedImages.length > 0 && uploadedImages.length <= 3){
    const formData = new FormData();
    Object.keys(dataObject).forEach((field) => {
      formData.append(field,dataObject[field].value);
    });
    uploadedImages.forEach((image) => {
      formData.append('images', image);
    });
    const options = {
      method: "POST",
      body: formData
    };
    document.getElementById('placeOrderText').innerText="Placing your order";
    document.getElementById('placeOrderButton').disabled = true;
    fetch("https://bijliman-backend.herokuapp.com/api/orders", options)
        .then(res => { 
          clearFieldsandErrors();
          console.log(res);
        })
        .catch(err => { console.log(err);});
  }
  else{

  }
};

const checkboxClicked = ()=>{
  
  const checkbox = document.getElementById('checkbox-background');
  if(!checkbox.classList.contains('checkboxChecked'))
    checkbox.classList.add("checkboxChecked");
  else
    checkbox.classList.remove("checkboxChecked");
  
}

const closeFunction =()=>{
  document.getElementById("myDialog").close(); 
}
const  openModal=()=> { 
  document.getElementById("myDialog").showModal(); 
}