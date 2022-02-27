$(document).ready(function (e) {
   $('.card-product__body-select-label').on('click',function (e){
      e.preventDefault();
      let target = $(this).attr('attr');
      let currentValue = $(this).attr('current-value');
      let targetContent =  $(this).closest('.card-product__body-select').find('.card-product__body-select-content[attr="'+target+'"]');
      targetContent.toggle();
      targetContent.find('div').removeClass('current');
      targetContent.find('div[value="'+currentValue+'"]').addClass('current');
   })
   $('.card-product__body-select-content-item').on('click',function (e){
      e.preventDefault();
      let parent = $(this).closest('.card-product__body-select-content');
      let newValue = $(this).attr('value');
      let targetLabel = $(this).closest('.card-product__body-select').find('.card-product__body-select-label[attr="'+parent.attr('attr')+'"]');
      parent.hide();
      targetLabel.attr('current-value', newValue);
      targetLabel.find('.card-product__body-select-label-current span').text(newValue)
   })
   $('.card-product__body-select-label-color').on('click',function (e){
      e.preventDefault();
      let target = $(this).attr('attr');
      let currentValue = $(this).attr('current-value');
      let targetContent =  $(this).closest('.card-product__body-select').find('.card-product__body-select-content-color[attr="'+target+'"]');
      targetContent.toggleClass('show');
      targetContent.find('div').removeClass('current');
      targetContent.find('div[value="'+currentValue+'"]').addClass('current');
   })
   $('.card-product__body-select-content-color-item').on('click',function (e){
      e.preventDefault();
      let parent = $(this).closest('.card-product__body-select-content-color');
      let newValue = $(this).attr('value');
      let targetLabel = $(this).closest('.card-product__body-select').find('.card-product__body-select-label-color[attr="'+parent.attr('attr')+'"]');
      parent.removeClass('show');
      targetLabel.attr('current-value', newValue);
      targetLabel.find('.card-product__body-select-label-color-current span').css('background-color', newValue);
   })
   $('.lang-switch__switcher').on('click',function (e){
      e.preventDefault();
      let switcher = $('.lang-switch');
      if ( switcher.hasClass('de') ) {
         switcher.removeClass('de');
         switcher.addClass('en');
      } else {
         switcher.removeClass('en');
         switcher.addClass('de');
      }
   })
});