<?php
/*
Plugin Name: BTCP Pay for WordPress
Plugin URI: http://wordpress.org/plugins/btcp-pay-wordpress/
Description: Official BTCP Pay plugin from the Bitcoin Private core dev team. Allows users to add their widget button directly into the Wordpress website so they can take Bitcoin Private payments
Author: Bitcoin Private (MattPass)
Version: 0.2
Author URI: https://btcprivate.org
*/

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Go to settings page after activation
function btcp_pay_wordpress_activate( $plugin ) {
    if( $plugin == plugin_basename( __FILE__ ) ) {
        exit(wp_redirect(admin_url('options-general.php?page=btcp-pay-wordpress')));
    }
}
add_action('activated_plugin', 'btcp_pay_wordpress_activate');

// Add option to admin menu > settings section
add_action('admin_menu', function() {
  add_options_page('BTCP Pay WordPress Settings', 'BTCP Pay WordPress', 'manage_options', 'btcp-pay-wordpress', 'btcp_pay_wordpress');
});

// Form for user to paste widget code into
function btcp_pay_wordpress() {
 ?>
   <h1>BTCP Pay WordPress Settings</h1>
   <p>Please paste the widget code from your account on the <a href="https://btcppay.com" target="_blank">btcppay.com</a> site into the box below (as per the example below) and we'll take take of it working within WordPress.</p>
   <p>(Leave the "amount" line with a fixed value and we'll use that fixed value, else you can pass the value in dynamically as detailed below. Also please consider unescaping further, eg \n becomes \\n).</p>
   <p><b>Usage within areas you control from Admin, eg post pages, can use WordPress's 'Shortcodes':</b><br>
     - Fixed value use: <b>[btcp_pay_widget]</b><br>
     - Attribute value use: <b>[btcp_pay_widget amount="987.654"]</b></p>
   <p><b>Usage within code, eg templates, can use the PHP function:</b><br>
     - Fixed value use: <b>btcp_pay_widget();</b><br>
     - Function argument value use: <b>btcp_pay_widget(987.654);</b></p>
   <div class="wrap">
     <form action="options.php" method="post">
       <?php
       settings_fields( 'btcp-pay-wordpress-settings' );
       do_settings_sections( 'btcp-pay-wordpress-settings' );
       ?>
       <textarea placeholder='Paste the btcpWidget.data JSON from your BTCP Pay widget code here, eg:

<!-- BTCP Pay Widget // -->
<!-- Set parameters and actions //-->
<script id="btcp_widget_data">
  var btcpWidget = {};
  btcpWidget.data = {
    "id"          : "btcp_widget",
    "buttonData"  : "buy_A1_0",
    "merchantid"  : "414",
    "walletid"    : "2",
    "amount"      : 123.45,
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
<script src="//btcppay.com/widget.js" id="btcp_widget"></script>' name="btcp_pay_wordpress_widget_code" style="width: 300px; height: 400px"><?php echo esc_attr( get_option('btcp_pay_wordpress_widget_code') ); ?></textarea>

       <?php submit_button(); ?>
     </form>
   </div>
 <?php
}
// Register that DB setting
add_action('admin_init', function() {
  register_setting('btcp-pay-wordpress-settings', 'btcp_pay_wordpress_widget_code');
});

function btcp_pay_widget($data = false, $shortcode = false) {
  // Attribute passed in via shortcode?
  if (isset($data['amount'])) {
    $amount = $data['amount'];
  // Value passed in via argument?
  } else if (isset($data) && $data > 0) {
    $amount = $data;
  // Nothing passed in!
  } else {
    $amount = false;
  }
  // Pickup widget code and if amount passed in, output after replacing "amount" value
  $widgetData = str_replace("\r","",get_option('btcp_pay_wordpress_widget_code'));
  $widgetData = explode("\n",$widgetData);
  for($i=0; $i<count($widgetData); $i++) {
    if (strpos($widgetData[$i], '"amount"') > -1 && $amount !== false) {
      $widgetData[$i] = '    "amount"      : '.$amount.',\n';
    }
  }
  $widgetData = str_replace("\\n","\n",implode("\n",$widgetData));

  if ($shortcode) {
    return $widgetData;
  } else {
    echo $widgetData;
  }
};

function btcp_pay_widget_shortcode($atts) {
  return btcp_pay_widget($atts, true);
}

add_shortcode('btcp_pay_widget', 'btcp_pay_widget_shortcode');
?>
