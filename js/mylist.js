$(document).ready(function(){

    /* ----- Start Listing ----- */

    function getall(){
        var url = "../index.php/api/MyItem/getall";
        $.ajax({
            type: "GET",
            url: url,
            scriptCharset: 'utf-8',
            dataType:'json',
            cache: false,             // To unable request pages to be cached
        }).done(function (json) {
           var tmp_html = "";
           $("#divcontent").html("");
           json.forEach(function(value,key){
            $("#divcontent").append(template(value));
           });

           $(".item").undelegate(".itembutton", "click",add_to_Wish);
           $(".item").delegate(".itembutton", "click", add_to_Wish);
        });
    }

    

    function template(row){
        var html = "";
        html += "<div class='item'>";
        html += "    <div class='itemtitle'>";
        html += row.name;
        html += "    </div>";
        html += "    <div class='itemprice'>";
        html += "        Price : "+row.price+"$";
        html += "    </div>";
        html += "    <div class='itemdescription'>";
        html += row.description; 
        html += "    </div>";
        html += "    <div tag='"+row.id+"' class='itembutton clsred'>";
        html += "Remove From List";
           
       
        html += "    </div>";
        html += "</div>";
        return html;
    }

    getall();

    /* ----- End Listing ----- */

    /* ----- Add to WishList ----- */
    function add_to_Wish(){
        var id = $(this).attr("tag");
        var me = this;
       

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var url = "../index.php/api/MyItem/removeitem/"+id;
                $.ajax({
                    type: "POST",
                    url:url,
                    scriptCharset: 'utf-8',
                    contentType: false,       // The content type used when sending data to the server.
                    dataType:'json',
                    cache: false,             // To unable request pages to be cached
                    processData:false
                }).done(function (json) {
                    swal("Success","Successfully Removed!");
                    $(me).parent().remove();
                });
            } else {
              swal("OK","Your item is safe!");
            }
          });
    }
    /* ----- End Add to WishList ----- */

});