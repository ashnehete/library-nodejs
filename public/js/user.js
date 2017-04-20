$(document).ready(function () {
    var name = $('#name');
    if (sessionStorage.getItem('id')) {
        $('#login').hide();
        $('#sign-up').hide();
        name.show();
        name.children().append(sessionStorage.getItem('name'));
    } else {
        name.hide();
    }

    name.click(function () {
        sessionStorage.clear();
        location.reload();
    })
});