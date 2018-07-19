<?php
/**
 * @package BTCP_Pay
 * @version 1.0
 */
/*
Plugin Name: BTCP Pay
Plugin URI: http://wordpress.org/plugins/btcp-pay/
Description: Official BTCP Pay plugin from the Bitcoin Private core dev team. Allows users to add their widget button directly into the Wordpress website so they can take Bitcoin Private payments.
Author: Bitcoin Private
Version: 1.0
Author URI: https://btcprivate.org
*/

function btcp_pay_widget() {
echo '

<!-- BTCP Pay Widget // -->
<!-- Set parameters and actions //-->
<script id="btcp_widget_data">
  var btcpWidget = {};
  btcpWidget.data = {
    "id"          : "btcp_widget",
    "buttonData"  : "buy_A1_6",
    "merchantid"  : "414",
    "walletid"    : "2",
    "amount"      : 0.001,
    "itemid"      : "0",
    "description" : "Pepperoni Pizza",
    "transactiondetails" :
      {
          "size"    : "12 inch",
          "crust"   : "stuffed",
          "pan"     : "thin base"
      }
  };

  btcpWidget.onPaymentSuccess = function(data) {
    alert("Payment success! Data:\n\n" + JSON.stringify(data));
  };

  btcpWidget.onPaymentFail = function(data) {
    alert("Payment failed! Reason: " + data.reason);
  }
</script>

<!-- Load core functionality //-->
<script src="//mattpass.com/lab/widget.js" id="btcp_widget"></script>

';
}
?>
