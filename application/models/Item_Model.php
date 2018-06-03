<?php 
   class Item_Model extends CI_Model {
	
      function __construct() { 
         parent::__construct(); 
      } 
   
      
   
     public function getall(){
       $sql = "
        SELECT Item.*,
        CASE WHEN Wish_Item_List.id IS NULL  THEN 'valid' ELSE 'unvalid' END 'Status'  
        FROM Item 
        LEFT JOIN Wish_Item_List on Item.id = Wish_Item_List.item_id
        Order By Item.name;
        ";
       return $this->db->query($sql)->result();
     }

    
      
   } 
?> 