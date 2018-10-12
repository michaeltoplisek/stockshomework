const stockList = ['IBM', 'AAPL', 'FB'];

const renderButtons = function(){
    $('#buttonList').empty()
for ( let i=0; i < stockList.length; i++ ) {
    $('#buttonList').append(`<button value="${stockList[i]}"> ${stockList[i]} </button>`);
}}

renderButtons()

$('#buttonList').on('click', 'button', function (){
    $('#stockInfo').empty()
    const symbol = $(this).val()
    const queryURL = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,logo,news,chart&range=1m&last=10`
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response){
            $('#stockInfo').append(`<div><p>${response.quote.companyName}</p>
            <p><img src="${response.logo.url}"</p>
            <p>${response.quote.latestPrice}</p>
            <p>${response.news[0].headline}</p>
            <p>${response.news[0].summary}</p></div>`);          
          })
      })
    $('#newStock').on('click', function(e) {
        e.preventDefault()
        let newStock = $('#userInput').val().toUpperCase()
        $.ajax({
            url: 'https://api.iextrading.com/1.0/ref-data/symbols',
            method: 'GET'
          }).then(function(response){
            const validationList = response
            console.log(validationList)
            if(validationList.filter(function(list){ return list.symbol === newStock })) {
                stockList.push(newStock)
                console.log(stockList)
                renderButtons()
            } else {}
    
          })
        })