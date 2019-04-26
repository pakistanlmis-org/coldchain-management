<?php

/**
 * Form_StockRequisitionSearch
 *
 * 
 *
 *     Logistics Management Information System for Vaccines
 * @author     Ajmal Hussain <ajmal@deliver-pk.org>
 * @version    2.5.1
 */

/**
*  Form for Stock Requisition Search
*/

class Form_StockRequisitionSearch extends Form_Base
{

    /**
     * $_fields
     * 
     * Form Fields
     * @searchby: Search By
     * @voucher_type: Voucher Type
     * @number: Number
     * @warehouses: Warehouse/Supplier
     * @product: Product
     * @activity_id: Purpose
     * @date_from: Date From
     * @date_to: Date To
     * 
     * @var type 
     */
    private $_fields = array(
        "searchby" => "Search By",
        "voucher_type" => "Status",
        "number" => "Number",
        "warehouses" => "Warehouse/Supplier",
        "product" => "Product",
        "activity_id" => "Purpose",
        "date_from" => "Date From",
        "date_to" => "Date To",
    );
    
    /**
     * $_list
     * 
     * List
     * @searchby:
     * Select
     * Issue No
     * Issue Ref
     * Batch No
     * @voucher_type:
     * Issued
     * Cancelled
     * @product
     * @warehouses
     * 
     * @var type 
     */
    private $_list = array(
        'searchby' => array(
            "0" => "Select",
            "1" => "Requisition No",
            "2" => "Requisition Ref"
        ),
        'voucher_type' => array(
            "0" => "Draft",
            "1" => "Submitted",
            "2" => "Approved",
            "3" => "UnApproved"
        ),
        'product' => array(),
        'warehouses' => array()
    );

    /**
     * Initializes Form Fields
     */
    public function init()
    {
        //Generate Products(items) Combo
        $item_pack_sizes = new Model_ItemPackSizes();
        $result2 = $item_pack_sizes->getAllManageItems();

        foreach ($result2 as $item)
        {
            $this->_list["product"][''] = 'Select';
            $this->_list["product"][$item['pkId']] = $item['itemName'];
        }

        $warehouses = new Model_Warehouses();
        $toWarehouses = $warehouses->getToRequisitionWarehouses();
        $this->_list["warehouses"][''] = "Select";
        foreach ($toWarehouses as $toWarehouse) {
            $this->_list["warehouses"][$toWarehouse['pk_id']] = $toWarehouse['warehouse_name'];
        }        
     
        foreach ($this->_fields as $col => $name)
        {
            $date_from = date('01/' . 'm/Y');
            $date_to = date('d/m/Y');
            switch ($col)
            {
                case "number":
                    parent::createText($col);
                    break;
                case "date_from":
                    parent::createReadOnlyTextWithValue($col, $date_from);
                    break;
                case "date_to":
                    parent::createReadOnlyTextWithValue($col, $date_to);
                    break;
                default :
                    break;
            }

            if (in_array($col, array_keys($this->_list)))
            {
                parent::createSelect($col, $this->_list[$col]);
            }
            //Generate Purpose(activity_id) combo 
            $stk_activities = new Model_StakeholderActivities();
            $result1 = $stk_activities->getAllStakeholderActivities();
            foreach ($result1 as $stk_activity)
            {
                $this->_list["activity_id"][''] = "Select";
                $this->_list["activity_id"][$stk_activity['pkId']] = $stk_activity['activity'];
            }
        }
    }

}
