var source = $('#book-template').html();
var template = Handlebars.compile(source);
$('#search-btn').click(function () {
    var query = $('#search').val();
    var type = $('input[name=type]:checked').val();
    var input = {};
    input[type] = query;
    $.get('book/', input).done(function (books) {
        var issued_book_id = sessionStorage.getItem('issued_book_id')
        books.map(function (book) {
            if (issued_book_id) {
                book.issued = true;
                if (issued_book_id == book._id) {
                    book.return = true;
                }
            }
        });
        console.log(books);
        var html = template({
            books: books
        });
        $('#results').html(html);
        $('.issue').click(function (event) {
            book_id = event.target.dataset.target;
            if (user_id = sessionStorage.getItem('id')) {
                $.post('issue/', {
                    user_id: user_id,
                    book_id: book_id
                }).done(function (data) {
                    $.post('book/' + book_id, {
                        issued: true
                    }).done(function () {
                       sessionStorage.setItem('issued_book_id', book_id);
                    });
                    alert(data.message);
                    location.reload();
                })
            }
        });
        $('.return').click(function (event) {
            book_id = event.target.dataset.target;
            console.log(book_id);
            if (user_id = sessionStorage.getItem('id')) {
                $.get('issue/', {
                    book_id: book_id
                }).done(function (issue) {
                    console.log(issue);
                    if (issue[0] && issue[0]._id) {
                        $.post('issue/' + issue[0]._id, {
                            active: false,
                            return_date: Date.now()
                        }).done(function (data) {
                            $.post('book/' + book_id, {
                                issued: false
                            }).done(function () {
                                sessionStorage.removeItem('issued_book_id');
                            });
                            alert(data.message);
                            location.reload();
                        })
                    }
                })

            }
        });
    })
});