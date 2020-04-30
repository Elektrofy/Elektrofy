$(document).ready(function(){
    
    

    let glider = new Glider(document.querySelector('.glider'), {
        // Mobile-first defaults
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable:true,
        scrollLock: true,
        
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        },
        // responsive: [
        //   {
        //     // screens greater than >= 775px
        //     breakpoint: 775,
        //     settings: {
        //       // Set to `auto` and provide item width to adjust to viewport
        //       slidesToShow: 'auto',
        //       slidesToScroll: 'auto',
        //       //dots: '#dots',
        //       itemWidth: 150,
        //       duration: 0.25
        //     }
        //   },{
        //     // screens greater than >= 1024px
        //     breakpoint: 1024,
        //     settings: {
        //       slidesToShow: 4,
        //       slidesToScroll: 3,
        //       //dots: '#dots',
        //       itemWidth: 150,
        //       duration: 0.25
        //     }
        //   }
        // ]
      });



});

const nameRegex = '^[a-zA-Z\.\\s]*$';
const emailRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
const mobileRegex = '^[6-9]{1}[0-9]{9}$';
const addressRegex = '[A-Za-z0-9\.\-\s\,]';

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