$(document).ready(function() {
    $("#search-box").keyup(function(event) {
        if(event.keyCode === 13) {
            getResults();
        }
    })
})

function getResults() {

    var searchQuery = $("#search-box").val();

    $.ajax({url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search="+searchQuery,
        success:function(result) {
            console.log(result);

            var titles = result[1];
            var descriptions = result[2];
            var links = result[3];

            for(var i = 0; i < 10; i++) {

                var newEntry = "<tr class = 'clickable-row' data-href = "+links[i]+">" +
                                "<td><p class='row-title'>"+titles[i]+"</p>"+
                                "<p class='row-description'>&nbsp;&nbsp;&nbsp;&nbsp;"+descriptions[i]+"</p></td></tr>";

                $("table").append(newEntry);
            }
            
            $(".clickable-row").click(function() {
                window.location = $(this).data("href");
            })
        }});

}