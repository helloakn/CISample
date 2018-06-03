<?php 
   class Wish_Item_Model extends CI_Model {
	
      function __construct() { 
         parent::__construct(); 
      } 
   
      
   
     public function getall(){
       $sql = "
        SELECT Item.*,
        CASE WHEN Wish_Item_List.id IS NULL  THEN 'valid' ELSE 'unvalid' END 'Status'  
        FROM Item 
        JOIN Wish_Item_List on Item.id = Wish_Item_List.item_id
        Order By Item.name;
        ";
       return $this->db->query($sql)->result();
     }

     public function Add_Wish($id,$user_id){
        
        $data = array( 
            'user_id' => $user_id, 
            'item_id' => $id 
         );
         $this->db->set($data); 
         
         $this->db->insert("Wish_Item_List", $data);
         return "success";
      }

      public function Delete_Wish($id,$user_id){
       
        $data = array( 
            'user_id' => $user_id, 
            'item_id' => $id 
         );
         $this->db->set($data); 
         
         $this->db->delete("Wish_Item_List", $data);
         return "success";
      }
   
      
   } 
?> 