'use strict';


function Horns (data) {
  this.image_url = data.image_url,
  this.title = data.title,
  this.description = data.description,
  this.keyword = data.keyword,
  this.horns = data.horns;

}

Horns.prototype.render = function () {

  let photoTemplateCloned = $('#photo-template').clone();
  $('main').append(photoTemplateCloned);
  //   photoTemplateCloned.className=this.keyword;
  //   photoTemplateCloned.id = this.keyword;

  photoTemplateCloned.html (

    `   
        <div class = "${this.keyword}">
        <h2>${this.title}</h2>
        <img src="${this.image_url}" alt="">
        <p id="dec">${this.description}</p>
        <p id="numHorns">number of horns is ${this.horns}</p>
        </div>
        
    `
  );

  //   photoTemplateCloned.find('h2').text(this.title);
  //   photoTemplateCloned.find('img').attr('src',this.image_url);
  //   photoTemplateCloned.find('#dec').text(this.description);
  //   photoTemplateCloned.find('#numHorns').text('number of horns: ' + this.horns);

};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax ('../data/page-1.json',ajaxSettings).then ( data => {
  data.forEach(element => {

    let horn = new Horns (element);
    horn.render();

    let optionEl = $(`<option value = "${horn.keyword}">${horn.keyword}</option>`);
    $('select').append(optionEl);


  });

});

$(document).ready(function(){
  $('select').on('change', function(event){

    let selected = event.target.value; // selected = value === className
    console.log(selected);

    $(`div`).hide();
    $(`.${selected}`).fadeIn(1000);

  });
});



// $(document).ready(function(){

//   all.forEach(element => {
//     let optionEl = `<option>${element.title}</option>`;
//     console.log(optionEl);
//     $('select').append('optionEl');
//   });

// });



// for (let i = 0; i < all.length; i++) {
//   let optionEl = $('<option>' + all[i].title + '</option>');
//   $('main').append('select');
// }

// all.forEach(element => {
//   let optionEl = `<option>${element.title}</option>`;
//   console.log(optionEl);
//   $('select').append('optionEl');
// });
