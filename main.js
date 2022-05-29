const host = 'http://localhost:3000'

/**
 * The main function
 */
$(function() {
    showConversionRequester();
    // Prevent form from submition
    $('#form').submit(function(event) {
    event.preventDefault();
    });
    $('#submit').click(function () {
    var $this = $(this)
    $this.html('Requesting, please wait...').off('click')

    const numberToConvert = $('#number').val()
    if(!numberToConvert) showError()        
    requestConversion({ numberToConvert })
    });

})

/**
 * This function compiles and displays the request template to the user
 */
function showConversionRequester() {
    const source = $("#request-template").html();
    const template = Handlebars.compile(source);
    const html = template();
    $("#content").html(html);
}

/**
 * This function makes an ajax request to convert the input
 * @param {Number} numberToConvert 
 */
function requestConversion({ numberToConvert }) {
    try {
        const settings = {
            url: `${host}/convert-to-roman-numbers?number_to_convert=${numberToConvert}`,
            type: 'GET'
        }
        $.ajax(settings)
        .done((data) => { 
            showInfo(data) 
        }).fail((error) => {
            showError(error)
        })
    } catch (error) {
        showError(error)
    }  
}

/**
 * This function compiles and displays the output template to the user
 * @param {*} data - the output/result of the conversion
 */
function showInfo(data) {      
    const source = $("#result-template").html();
    const template = Handlebars.compile(source);
    const html = template(data);
    $("#content").html(html);
}

/**
 * This function compiles and displays the error template to the user
 * @param {*} error - the error object, if any 
 */
function showError(error) {
    const error_data = {
      'status': error.status,
      'statusText': error.responseText
    };
    const source = $("#error-template").html();
    const template = Handlebars.compile(source);
    const html = template(error_data);
    $("#content").html(html);
}