let currentSlide = 0;
let carouselArray = [
  { carouselText: "Pritam", carouselImage: "pritam3.png", pdf: "pritam.pdf" },
  { carouselText: "Havells", carouselImage: "havells.png", pdf: "Havells.pdf" },
  { carouselText: "GM", carouselImage: "GM.png", pdf: "GM.pdf" },
  { carouselText: "Crompton", carouselImage: "Crompton.png", pdf: "Crompton.pdf" },
  { carouselText: "Orient", carouselImage: "Orient.png", pdf: "Orient.pdf" },
];
let currentPdfSelected = carouselArray[0].pdf;

dialogPolyfill.registerDialog(document.getElementById("myDialog"));
dialogPolyfill.registerDialog(document.getElementById("orderPlacingModal"));

const nameRegex = "^[a-zA-Z.\\s]*$";
const emailRegex =
  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
const mobileRegex = "^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$";
const otherFileType = ["pdf", "xlsx", "docx"];
const NAME_ERROR = "Please enter a valid name between 6-20 characters";
const EMAIL_ERROR = "Please enter a valid Email ID";
const MOBILE_ERROR = "Please enter a valid Mobile Number";
const ADDRESS_ERROR = "Please enter a valid Address";
const UPLOAD_MAXIMUM_ERROR = "Maximum 3 Files are allowed to upload";
let uploadedImages = [];
let dataObject = {
  name: {
    isValid: false,
    value: "",
  },
  email: {
    isValid: true,
    value: "",
  },
  mobileNo: {
    isValid: false,
    value: "",
  },
  address: {
    isValid: false,
    value: "",
  },
};

const clearFieldsandErrors = () => {
  updateDataObject(false, "name", "");
  updateDataObject(false, "email", "");
  updateDataObject(false, "mobileNo", "");
  updateDataObject(false, "address", "");
  uploadedImages = [];
  document.getElementById("uploadFile").value = "";
  document.getElementById("customerName").value = "";
  toggleErrorIcon("hideIcons", "validCustomerName", "invalidCustomerName");
  document.getElementById("customerEmail").value = "";
  toggleErrorIcon("hideIcons", "validCustomerEmail", "invalidCustomerEmail");
  document.getElementById("customerMobile").value = "";
  toggleErrorIcon("hideIcons", "validCustomerMobile", "invalidCustomerMobile");
  document.getElementById("customerAddress").value = "";
  document.getElementById("itemsDescription").value = "";
  toggleErrorIcon(
    "hideIcons",
    "validCustomerAddress",
    "invalidCustomerAddress"
  );
  removeImages();
  document.getElementById("placeOrderText").innerText = "Place Order";
  const placeOrderButton = document.getElementById("placeOrderButton");
  placeOrderButton.disabled = true;
  placeOrderButton.classList.add("opacity-50");
  placeOrderButton.classList.add("cursor-not-allowed");
  placeOrderButton.classList.remove("cursor-pointer");
  document
    .getElementById("checkbox-background")
    .classList.remove("checkboxChecked");
};

// Validation Functions
const toggleErrorIcon = (isValid, validId, invalidId) => {
  const validIcon = document.getElementById(validId).classList;
  const invalidIcon = document.getElementById(invalidId).classList;
  if (isValid === true) {
    validIcon.contains("hidden") && validIcon.remove("hidden");
    !invalidIcon.contains("hidden") && invalidIcon.add("hidden");
  } else if (isValid === false) {
    invalidIcon.contains("hidden") && invalidIcon.remove("hidden");
    !validIcon.contains("hidden") && validIcon.add("hidden");
  } else if (isValid === "hideIcons") {
    !invalidIcon.contains("hidden") && invalidIcon.add("hidden");
    !validIcon.contains("hidden") && validIcon.add("hidden");
  }
};

const updateDataObject = (isValid, key, value = "") => {
  if (isValid) {
    dataObject[key].value = value;
    dataObject[key].isValid = true;
  } else {
    dataObject[key].value = value;
    dataObject[key].isValid = false;
  }
};

const removeError = (divId) => {
  const errorDiv = document.getElementById(divId).classList;
  !errorDiv.contains("hidden") && errorDiv.add("hidden");
};

const showError = (isValid, divId, textID, errorText) => {
  if (!isValid) {
    const errorDiv = document.getElementById(divId).classList;
    document.getElementById(textID).innerText = errorText;
    errorDiv.contains("hidden") && errorDiv.remove("hidden");
    setTimeout(() => removeError(divId), 3000);
  }
};

const validateName = () => {
  const name = document.getElementById("customerName").value;
  const isNameValid =
    name.length > 5 && name.length <= 20 && name.match(nameRegex);
  toggleErrorIcon(!!isNameValid, "validCustomerName", "invalidCustomerName");
  updateDataObject(!!isNameValid, "name", name);
  showError(!!isNameValid, "nameErrorDiv", "nameErrorText", NAME_ERROR);
};

// const validateEmail = () => {
//   const email = document.getElementById("customerEmail").value;
//   const isEmailValid = email.match(emailRegex);
//   toggleErrorIcon(!!isEmailValid, "validCustomerEmail", "invalidCustomerEmail");
//   updateDataObject(!!isEmailValid, "email", email);
//   showError(!!isEmailValid, "emailErrorDiv", "emailErrorText", EMAIL_ERROR);
// };

const validateMobile = () => {
  const mobile = document.getElementById("customerMobile").value;
  const isMobileValid = mobile.match(mobileRegex);
  toggleErrorIcon(
    !!isMobileValid,
    "validCustomerMobile",
    "invalidCustomerMobile"
  );
  updateDataObject(!!isMobileValid, "mobileNo", mobile);
  showError(!!isMobileValid, "mobileErrorDiv", "mobileErrorText", MOBILE_ERROR);
};

const validateAddress = () => {
  const address = document.getElementById("customerAddress").value;
  const isAddressValid = address.length > 10 && address.length < 100;
  toggleErrorIcon(
    !!isAddressValid,
    "validCustomerAddress",
    "invalidCustomerAddress"
  );
  updateDataObject(!!isAddressValid, "address", address);
  showError(
    !!isAddressValid,
    "addressErrorDiv",
    "addressErrorText",
    ADDRESS_ERROR
  );
};

// Carousel Functions

// setInterval(function () {
//   onNextBtnClick();
// }, 4500);

const onPrevBtnClick = () => {
  const carouselImageDiv = document.getElementById("carouselImage");
  const carouselTextDiv = document.getElementById("carouselText");
  currentSlide =
    currentSlide - 1 < 0 ? carouselArray.length - 1 : --currentSlide;
    carouselImageDiv.style.backgroundImage ="url(../img/" + carouselArray[currentSlide].carouselImage + ")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;
  currentPdfSelected = carouselArray[currentSlide].pdf;
};

const onNextBtnClick = () => {
  const carouselImageDiv = document.getElementById("carouselImage");
  const carouselTextDiv = document.getElementById("carouselText");
  currentSlide =
    currentSlide + 1 > carouselArray.length - 1 ? 0 : ++currentSlide;
    carouselImageDiv.style.backgroundImage ="url(../img/" + carouselArray[currentSlide].carouselImage + ")";
  carouselTextDiv.textContent = carouselArray[currentSlide].carouselText;
  currentPdfSelected = carouselArray[currentSlide].pdf;
};

// File Upload UI functions
const triggerFileUpload = () => {
  document.getElementById("uploadFile").click();
};

const getFileType = (file) => {
  return file.split(".").pop();
};

const displayImageorText = (file, textId, imageId, image) => {
  const fileType = getFileType(file.name);
  const displayFile = document.getElementById(textId);
  const displayImage = document.getElementById(imageId);
  if (otherFileType.includes(fileType)) {
    !displayImage.classList.contains("hidden") &&
      displayImage.classList.add("hidden");
    displayFile.classList.contains("hidden") &&
      displayFile.classList.remove("hidden");
    displayFile.innerText = fileType.toUpperCase();
  } else {
    !displayFile.classList.contains("hidden") &&
      displayFile.classList.add("hidden");
    displayImage.classList.contains("hidden") &&
      displayImage.classList.remove("hidden");
    displayImage.src = URL.createObjectURL(file);
  }
};

const displayImages = () => {
  const imagesLength = uploadedImages.length;
  const uploadFileText = document.getElementById("uploadFileText").classList;
  !uploadFileText.contains("hidden") && uploadFileText.add("hidden");
  if (imagesLength === 3) {
    const imageThree = document.getElementById("imageThree").classList;
    imageThree.contains("hidden") && imageThree.remove("hidden");
    displayImageorText(
      uploadedImages[2],
      "displayFileThree",
      "displayImageThree"
    );
  }
  if (imagesLength >= 2) {
    const imageTwo = document.getElementById("imageTwo").classList;
    imageTwo.contains("hidden") && imageTwo.remove("hidden");
    displayImageorText(uploadedImages[1], "displayFileTwo", "displayImageTwo");
  }
  if (imagesLength >= 1) {
    const imageOne = document.getElementById("imageOne").classList;
    imageOne.contains("hidden") && imageOne.remove("hidden");
    displayImageorText(uploadedImages[0], "displayFileOne", "displayImageOne");
  }
};

const removeImages = () => {
  const uploadFileText = document.getElementById("uploadFileText").classList;
  uploadFileText.contains("hidden") && uploadFileText.remove("hidden");
  const imageThree = document.getElementById("imageThree").classList;
  !imageThree.contains("hidden") && imageThree.add("hidden");
  const imageTwo = document.getElementById("imageTwo").classList;
  !imageTwo.contains("hidden") && imageTwo.add("hidden");
  const imageOne = document.getElementById("imageOne").classList;
  !imageOne.contains("hidden") && imageOne.add("hidden");
};

const uploadImage = () => {
  let newUploadedImages = Array.from(
    document.getElementById("uploadFile").files
  );
  document.getElementById("uploadFile").value = "";
  if (uploadedImages.length + newUploadedImages.length <= 3)
    uploadedImages = uploadedImages.concat(newUploadedImages);
  else if (uploadedImages.length + newUploadedImages.length > 3) {
    showError(false, "uploadErrorDiv", "uploadErrorText", UPLOAD_MAXIMUM_ERROR);
  }
  if (uploadedImages.length > 0 && uploadedImages.length <= 3) {
    const uploadFileText = document.getElementById("uploadFileText").classList;
    !uploadFileText.contains("hidden") && uploadFileText.add("hidden");
    removeImages();
    displayImages();
  }
};

const deleteImage = (index) => {
  uploadedImages.splice(index, 1);
  removeImages();
  if (uploadedImages.length > 0 && uploadedImages.length <= 3) displayImages();
};

const placeOrder = () => {
  const isReadyforSubmit = Object.values(dataObject).findIndex(
    (field) => field.isValid === false
  );
  if (isReadyforSubmit === -1) {
    const formData = new FormData();
    Object.keys(dataObject).forEach((field) => {
      formData.append(field, dataObject[field].value);
    });
    formData.append("remarks", document.getElementById('itemsDescription').value);
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });
    const options = {
      method: "POST",
      body: formData,
    };
    document.getElementById("orderPlacingModal").showModal();
    document.getElementById("orderModalText").innerText =
      "Please hold on a second we are placing your order...";
    document.getElementById("placeOrderButton").disabled = true;
    fetch("https://bijliman-backend.herokuapp.com/api/orders", options)
      .then((res) => {
        res
          .json()
          .then((data) => ({
            data: data,
            status: res.status,
          }))
          .then((res) => {
            if(res.status !== 500)
            {
              clearFieldsandErrors();
              document.getElementById("OrderConfirmationTitle").classList.remove('hidden');
              document.getElementById(
                "orderModalText"
              ).innerText = `Your order has been placed with Order Id: BIJLI000${res.data.order}
              We will contact you shortly for further details. For any queries please contact us at +91-6291838148`;
            }
            else
            {
              document.getElementById("orderModalText").innerText =
              "Some Error has occured, Please retry";
              console.log(res);
            }
          });
      })
      .catch((err) => {
        document.getElementById("orderModalText").innerText =
          "Some Error has occured, Please retry";
        console.log(err);
      });
  } else {
    validateName();
    validateMobile();
    // validateEmail();
    validateAddress();
  }
};

const checkboxClicked = () => {
  const checkbox = document.getElementById("checkbox-background");
  const placeOrderButton = document.getElementById("placeOrderButton");

  if (!checkbox.classList.contains("checkboxChecked")) {
    placeOrderButton.disabled = false;
    placeOrderButton.classList.remove("opacity-50");
    placeOrderButton.classList.remove("cursor-not-allowed");
    placeOrderButton.classList.add("cursor-pointer");
    checkbox.classList.add("checkboxChecked");
  } else {
    placeOrderButton.disabled = true;
    placeOrderButton.classList.add("opacity-50");
    placeOrderButton.classList.add("cursor-not-allowed");
    placeOrderButton.classList.remove("cursor-pointer");
    checkbox.classList.remove("checkboxChecked");
  }
};

const closeFunction = () => {
  document.getElementById("myDialog").close();
};

const openModal = () => {
  document.getElementById("myDialog").showModal();
};

const closeOrderModal = () => {
  document.getElementById("orderPlacingModal").close();
  document.getElementById("OrderConfirmationTitle").classList.add('hidden');
};

const openPDF = () => {
  window.open(`./img/${currentPdfSelected}`,'_blank');
}
