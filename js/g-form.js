  $(function() {
    $(".g-form").submit(function (event) {
      event.preventDefault();
   
      // Ссылка, которую получили на этапе публикации приложения
      let appLink = "https://script.google.com/macros/s/AKfycbyjzu8CTTZ1b6GM2C-B_uTzl2mps8BR6hF_4bONhUD8Afcc1F8t/exec";
   
      // Сообщение при успешной отправке данных
      let successRespond = 'Спасибо, ваша заявка отправлена. <br> Наш специалист свяжется с вами в течении 15 минут';
   
      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить сообщение. Cвяжитесь с администратором сайта';
   
      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];
   
      // h2 с ответом формы
      let formRespond = $(this).find('.g-form__title_respond');
   
      // h2 с заголовком формы
      let formTitle = $(this).find('.g-form__title_main');
   
      // Блок прелоадера
      let preloader = $(this).find('.g-form__preloader');
   
      // Кнопка отправки формы
      let submitButton = $(this).find('.g-form__button');
   
   
      // FormData
      let fd = new FormData(form);
   
   
      $.ajax({
   
        url: appLink,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function(){
   
          if(fd.get('honeypot')) {
            return false;
          } else {
            fd.delete('honeypot');
          }
   
        // Показываем прелоадер
        preloader.css('opacity', '1');
   
        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
   
        // валидация других полей.
   
      },
   
    }).done(function(res, textStatus, jqXHR) {
   
      if(jqXHR.readyState === 4 && jqXHR.status === 200) {
   
      // Прячем заголовок формы
      formTitle.css({
        'display': 'none'
      });
   
      // Прячем прелоадер
      preloader.css('opacity', '0');
   
      // Выводим ответ формы.
      formRespond.html(successRespond).css('color', '#53b374');
       
      // Возвращаем активность кнопке отправки
      submitButton.prop('disabled', false);
   
      } else {
        formTitle.css({
          'display': 'none'
        });
        formRespond.html(errorRespond).css('color', '#c64b4b');
        preloader.css('opacity', '0');
        setTimeout( () => {
          formRespond.css({
            'display': 'none'
          });
          formTitle.css({
            'display': 'block'
          });
   
          submitButton.prop('disabled', false);
        }, 1000);
   
        console.log('Гугл не ответил статусом 200');
      }
    }).fail(function(res, textStatus, jqXHR) {
      formTitle.css({
        'display': 'none'
      });
      preloader.css('opacity', '0');
      formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
      setTimeout( () => {
        formRespond.css({
          'display': 'none'
        });
        formTitle.css({
          'display': 'block'
        });
        submitButton.prop('disabled', false); 
      }, 1000);
    }); 
  });
  }(jQuery));  