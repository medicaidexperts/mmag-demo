var GLOBALS = {
    apiUrlForSendingPhone: 'https://script.google.com/macros/s/AKfycbyTiN2yC3DMiQZCa46Xo6R0Nw-LM-Z1L4UQQgLyGqHwpKb0EhGi/exec',
    thankYouPageToRedirectTo: '/thank-you/',
    minLengthOfTelephone: 5
};











// ------------ Listeners ------------

$(".control.control--open").on('click', openMenu);
$(".control.control--close").on('click', closeMenu);

$(".do-submitPhoneNumber").on('click', submitPhoneNumber);
$(".contact__input").on('keyup', function(e) {
    if (e.keyCode == 13) { submitPhoneNumber(e); }
});





// ------------- STICKY -----------

$("[data-sticky]").stick_in_parent();







// ------------ Functions ------------

function openMenu(event) {
    $(".header__nav").addClass('expanded');
    $(".control.control--open").addClass('is-hidden');
    $(".control.control--close").removeClass('is-hidden');
}

function closeMenu(event) {
    $(".header__nav").removeClass('expanded');
    $(".control.control--open").removeClass('is-hidden');
    $(".control.control--close").addClass('is-hidden');
}

function getButtonForInputId(id) {
    return $('button[data-inputId=' + id + ']');
}

function getInputForButtonDataAttribute(dataAttr) {
    return $('#' + dataAttr);
}

function isValidPhoneNumber(phonenumber) {
    if (phonenumber &&
        phonenumber.toString().length >= GLOBALS.minLengthOfTelephone) {
        return true;
    } else {
        return false;
    }
}

function submitPhoneNumber(event) {

    var targetInput;
    var targetButton;

    if (event.type === 'keyup') {
        targetInput = $(event.currentTarget);
        targetButton = getButtonForInputId($(event.currentTarget).attr('id'));
    } else if (event.type === 'click') {
        targetButton = $(event.currentTarget);
        targetInput = getInputForButtonDataAttribute($(event.currentTarget).attr('data-inputId'));
    }

    targetButton.prop("disabled", true);

    var phone = targetInput.val() || targetInput.value || '';

    if (!isValidPhoneNumber(phone)) {
        targetButton.prop("disabled", false);
        return;
    }

    var objectToSend = {
        'phone': phone,
        'page': window.location.href
    }

    $.ajax({
        type: 'POST',
        url: GLOBALS.apiUrlForSendingPhone,
        data: objectToSend,
        success: function(response) {
            console.log('Submitted phone.');
            console.log(response);
            debugger;
            targetButton.prop("disabled", false);
            window.location.href = GLOBALS.thankYouPageToRedirectTo;
        },
        error: function(err) {
            console.error(err);
            debugger;
            targetButton.prop("disabled", false);
        }
    });
}
