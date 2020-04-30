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