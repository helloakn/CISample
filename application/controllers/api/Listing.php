<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Listing extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	function __construct() { 
		parent::__construct(); 
		$this->load->helper('url'); 
		$this->load->database(); 
		
	} 

	public function index()
	{
		echo "this is api";
		
	}
	public function getall()
	{
		$this->load->model('Item_Model');
		$list = $this->Item_Model->getall();
		$data = [];
		foreach($list as $row){
			$data[] = array(
				"id" => $row->id,
				"name" => $row->name,
				"price" => $row->price,
				"description" => $row->description,
				"status" => $row->Status,
			);
		}
		echo json_encode($data);
	}
	public function addtowish($id){
		$this->load->model('Wish_Item_Model');
		$user_id = 1;
		$status = $this->Wish_Item_Model->Add_Wish($id,$user_id);
		echo json_encode(array(
			"status" => $status,
		));
	}
}
