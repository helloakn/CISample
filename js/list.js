$(document).ready(function(){

    /* ----- Start Listing ----- */

    function getall(){
        var url = "../index.php/api/listing/getall";
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
        
        if(row.status == 'valid')
            {
                html += "    <div tag='"+row.id+"' class='itembutton'>";
                html += "Add to List";
            }
            else{
                html += "    <div tag='"+row.id+"' class='itembutton clsred'>";
                html += "Alread Added to List";
            }
       
        html += "</div>";
        html += "</div>";
        return html;
    }

    getall();

    /* ----- End Listing ----- */

    /* ----- Add to WishList ----- */
    function add_to_Wish(){
        var text = $(this).html();
        console.log(text);
        if(text=="Add to List"){
            var me = this;
            var id = $(this).attr("tag");
            var url = "../index.php/api/listing/addtowish/"+id;
            $.ajax({
                type: "POST",
                url:url,
                scriptCharset: 'utf-8',
                contentType: false,       // The content type used when sending data to the server.
                dataType:'json',
                cache: false,             // To unable request pages to be cached
                processData:false
            }).done(function (json) {
                swal("Success!", "Successfully Added to your list!", "success");
                $(me).html("Alread Added to List");
                $(me).css({"background-color":"#db1f1fb3"});
            });
        }
        
    }
    /* ----- End Add to WishList ----- */

});