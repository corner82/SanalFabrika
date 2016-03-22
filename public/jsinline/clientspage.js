
$('#paginationBar').bootpag({
    total: 50,
    page: 2,
    maxVisible: 5,
    leaps: true,
    firstLastUse: true,
    first: '<span aria-hidden="true">&larr;</span>',
    last: '<span aria-hidden="true">&rarr;</span>',
    wrapClass: 'pagination',
    activeClass: 'active',
    disabledClass: 'disabled',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first'
}).on("page", function (event, num) {
    $("#pagination_content").html("Page " + num); // or some ajax content loading...
}).find('.pagination');


