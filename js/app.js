'use strict';

const all = [];
function Horns (data) {
  this.image_url = data.image_url,
  this.title = data.title,
  this.description = data.description,
  this.keyword = data.keyword,
  this.horns = data.horns;
  all.push(this);

}

// randering manually
Horns.prototype.render1 = function () {

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


Horns.prototype.render2 = function () {
  let template = $('#div2').html();
  let html = Mustache.render(template,this);
  return html;
};


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

// $.ajax ('../data/page-1.json',ajaxSettings).then ( data => {
//   data.forEach(element => {

//     let horn = new Horns (element);
//     horn.render1();
//     console.log(horn.render2());

//     let optionEl = $(`<option value = "${horn.keyword}">${horn.keyword}</option>`);
//     $('#KeywordSelector').append(optionEl);


//   });

// });

$(document).ready(function(){
  $('#KeywordSelector').on('change', function(event){

    let selected = event.target.value; // selected = value === className
    console.log(selected);

    $(`div`).hide();
    $(`.${selected}`).fadeIn(1000);

  });

  let sortOption1 = $(`<option id="sortedKey">Sort By</option>`);
  let sortOption2 = $(`<option id="sortedKey">Sort By</option>`);
  $('#sortSelector').append(sortOption1,sortOption2);


});

$(function () {

  $('form').on('click' , function(event) {
    let pageEl = event.target.id;


    if ( pageEl === 'inputPg1' ) {

      $.ajax ('../data/page-1.json',ajaxSettings).then ( data => {
        data.forEach(element => {



          let horn = new Horns (element);
          horn.render2();
          console.log(horn.render1());

          let optionEl = $(`<option value = "${horn.keyword}">${horn.keyword}</option>`);
          $('#KeywordSelector').append(optionEl);




        });

      });

    }


    else if ( pageEl === 'inputPg2' ) {

      $.ajax ('../data/page-2.json',ajaxSettings).then ( data => {
        data.forEach(element => {



          let horn = new Horns (element);
          horn.render2();
          console.log(horn.render1());

          let optionEl = $(`<option value = "${horn.keyword}">${horn.keyword}</option>`);
          $('#KeywordSelector').append(optionEl);





        });

      });


    }

  } );




});








// // Using Mustache
// Neighborhood.prototype.render = function(){
//   // first we get the template from the HTML doc
//   let template = $('#neighborhood-template').html();
//   // Secondly we use mustaache render function to merge the template with the given data
//   let html = Mustache.render(template, this);
//   return html;
// };


// $('hornes').click(function () {

//   all.sort((a,b) => a.horns-b.horns );
//   all.forEach (element => {
//     let n = new Horns (element);

//   });
// }
// );
