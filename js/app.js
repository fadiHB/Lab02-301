'use strict';

let all = [];

// this array used to ..
// 1 - add all keyword
// 2 - insure that there is not any keyword repated inside it
let arrayOfkeyword = [];

function Horns (hornData) {

  for (const key in hornData ) {
    this[key] = hornData[key];
  }
  all.push(this);

}


Horns.prototype.filterOption = function () {

  if (!arrayOfkeyword.includes(this.keyword)) {

    let optionEl = $(`<option value="${this.keyword}">${this.keyword}</option>`);
    $('#KeywordSelector').append(optionEl);
    arrayOfkeyword.push(this.keyword);

  }
};

Horns.prototype.render2 = function () {

  let template = $('template').html();
  let html = Mustache.render(template,this);
  $('main').append(html);

  return html;

};


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};


function readJson ( n ) {

  all = [];
  arrayOfkeyword = [];
  $('option').remove();

  $.ajax (`../data/page-${n}.json`,ajaxSettings).then ( data => {
    data.forEach(element => {
      let horn = new Horns (element);
      horn.render2();
      horn.filterOption();

    });

  });

}

function sortedByTitle (a,b) {
  let result = a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
  return result;
}

function sortedByHorns (a,b) {
  let result = a.horns.toUpperCase > b.horns.toUpperCase ? 1 : -1;
  return result;
}


$(document).ready(function(){
  $('#KeywordSelector').on('change', function(event){

    //---------- filter ----------//
    let selected = event.target.value;
    // selected = value of the option's selecter === className of tje div tamplate
    $(`div`).hide();
    $(`.${selected}`).fadeIn(1000);

  });

  //---------- load page 1 & page 2 ----------//
  let page1 = $('.page')[0];
  let page2 = $('.page')[1];

  function loadPage1whenClick () {
    $(page1).on('click', () => {
      $('.active').remove();
      $('input:radio').prop('checked', false);
      readJson(1);
    } );
  }

  function loadPage2whenClick () {
    $(page2).on('click', () => {
      $('.active').remove();
      $('input:radio').prop('checked', false);
      readJson(2);
    } );
  }
  loadPage1whenClick ();
  loadPage2whenClick ();
  readJson(1);


  //---------- sort page 1 & page 2 ----------//
  $('input:radio[name=sort]').change(function() {

    if (this.id === 'title') {
      all.sort((a,b) => sortedByTitle(a,b));
      $('.active').remove();
      all.forEach(element => {
        element.render2();
      });


    }
    else if (this.id === 'horns') {
      all.sort((a,b) => sortedByHorns(a,b));
      $('.active').remove();
      all.forEach(element => {
        element.render2();
      });
    }
  });

});
