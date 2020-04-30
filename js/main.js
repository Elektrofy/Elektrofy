$(document).ready(function(){

});

let currentSlide = 0;
let carouselArray = [ {carouselText : "Havells",carouselImage : "havells.jpg" }, { carouselText : "Crabtree", carouselImage : "crabtree.jpg"},{carouselText : "Phillips",carouselImage : "phillips.jpg"}]; 

const nameRegex = '^[a-zA-Z\.\\s]*$';
const emailRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
const mobileRegex = '^[6-9]{1}[0-9]{9}$';
const addressRegex = '[A-Za-z0-9\.\-\s\,]';
let uploadedImages = [];

setInterval(function() {
  onNextBtnClick();
}, 4500);

const toggleErrorIcon = (isValid, validId, invalidId) => {
  const validIcon = document.getElementById(validId).classList;
  const invalidIcon = document.getElementById(invalidId).classList;
  if(isValid){
    validIcon.contains('hidden') && validIcon.remove('hidden');
    !invalidIcon.contains('hidden') && invalidIcon.add('hidden');
  }
  else{
    invalidIcon.contains('hidden') && invalidIcon.remove('hidden');
    !validIcon.contains('hidden') && validIcon.add('hidden');
  }
}

const validateName = () => {
  const name = document.getElementById('customerName').value;
  const isNameValid = name.length > 5 && name.length < 20 && name.match(nameRegex);
  toggleErrorIcon(isNameValid, 'validCustomerName', 'invalidCustomerName');
}

const validateEmail = () => {
  const email = document.getElementById('customerEmail').value;
  const isEmailValid = email.match(emailRegex);
  toggleErrorIcon(isEmailValid, 'validCustomerEmail', 'invalidCustomerEmail');
}

const validateMobile = () => {
  const mobile = document.getElementById('customerMobile').value;
  const isMobileValid = mobile.match(mobileRegex);
  toggleErrorIcon(isMobileValid, 'validCustomerMobile', 'invalidCustomerMobile');
}

const validateAddress = () => {
  const address = document.getElementById('customerAddress').value;
  const isAddressValid = address.length > 10 && address.length < 30 && address.match(addressRegex);
  toggleErrorIcon(isAddressValid, 'validCustomerAddress', 'invalidCustomerAddress');
}

const onPrevBtnClick = () =>{
  const carouselImageDiv = document.getElementById('carouselImage');
  const carouselTextDiv = document.getElementById('carouselText');
  currentSlide = (currentSlide - 1) < 0 ?  carouselArray.length-1 : --currentSlide;
  carouselImageDiv.style.backgroundImage = "url(../img/"+carouselArray[currentSlide].carouselImage+")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;
}

const onNextBtnClick = () =>{
  const carouselImageDiv = document.getElementById('carouselImage');
  const carouselTextDiv = document.getElementById('carouselText');
  currentSlide = (currentSlide + 1) > carouselArray.length-1 ?  0: ++currentSlide;
  carouselImageDiv.style.backgroundImage = "url(../img/"+carouselArray[currentSlide].carouselImage+")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;   
}

const triggerFileUpload = () => {
  document.getElementById('uploadFile').click();
}

const displayImages = () => {
  const imagesLength = uploadedImages.length;
  const uploadFileText = document.getElementById("uploadFileText").classList;
  !uploadFileText.contains('hidden') && uploadFileText.add('hidden');
  if(imagesLength === 3){
    const imageThree = document.getElementById("imageThree").classList;
    imageThree.contains('hidden') && imageThree.remove('hidden');
    document.getElementById("displayImageThree").src = URL.createObjectURL(uploadedImages[2]);
  }
  if(imagesLength >= 2){
    const imageTwo = document.getElementById("imageTwo").classList;
    imageTwo.contains('hidden') && imageTwo.remove('hidden');
    document.getElementById("displayImageTwo").src = URL.createObjectURL(uploadedImages[1]);
  }
  if(imagesLength >= 1){
    const imageOne = document.getElementById("imageOne").classList;
    imageOne.contains('hidden') && imageOne.remove('hidden');
    document.getElementById("displayImageOne").src = URL.createObjectURL(uploadedImages[0]);
  }
}

const removeImages = () => {
  const uploadFileText = document.getElementById("uploadFileText").classList;
  uploadFileText.contains('hidden') && uploadFileText.remove('hidden');
  const imageThree = document.getElementById("imageThree").classList;
  !imageThree.contains('hidden') && imageThree.add('hidden');
  const imageTwo = document.getElementById("imageTwo").classList;
  !imageTwo.contains('hidden') && imageTwo.add('hidden');
  const imageOne = document.getElementById("imageOne").classList;
  !imageOne.contains('hidden') && imageOne.add('hidden');
}

const uploadImage = () => {
  uploadedImages = Array.from(document.getElementById("uploadFile").files);
  if(uploadedImages.length > 0 && uploadedImages.length <= 3){
    const uploadFileText = document.getElementById("uploadFileText").classList;
    !uploadFileText.contains('hidden') && uploadFileText.add('hidden');
    removeImages();
    displayImages();
  }
}

const deleteImage = (index) => {
  uploadedImages.splice(index,1);
  removeImages();
  if(uploadedImages.length > 0 && uploadedImages.length <= 3)
    displayImages();
}
