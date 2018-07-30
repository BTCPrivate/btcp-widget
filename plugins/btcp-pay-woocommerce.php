<?php
/*
Plugin Name: BTCP Pay for WooCommerce
Plugin URI: http://wordpress.org/plugins/btcp-pay-for-woocommerce/
Description: Official BTCP Pay plugin from the Bitcoin Private core dev team. Allows users to pay on the WooCommerce ecommerce system so merchants can take Bitcoin Private payments
Author: Bitcoin Private (J62 & MattPass)
Version: 1.0
Author URI: https://btcprivate.org
*/

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Function to change format of prices shown
function btcp_widget_add_price_suffix() {
  $currency = "BTCP";
  $format = '%2$s&nbsp;' . $currency;

  return $format;
}

// Pickup widget code, split into array pieces and set a flag that for now we haven't determined user has set "currency" : BTCP"
$btcp_widget_data = str_replace("\r","",get_option('btcp_woocommerce_widget_code'));
$btcp_widget_data = explode("\n",$btcp_widget_data);
$btcp_widget_currency_set = false;
// For each line in widget data
for($i=0; $i<count($btcp_widget_data); $i++) {
  // If we've found the currency line and the value is "BTCP"
  if (strpos($btcp_widget_data[$i], '"currency"') > -1 && explode('"',$btcp_widget_data[$i])[3] === "BTCP") {
    // User has set currency, replace all prices shown into the format
    $btcp_widget_currency_set = true;
    add_action('woocommerce_price_format', 'btcp_widget_add_price_suffix');
    ?>
    <script>
      // Update cart total, as doesn't seem to update using above, this is an override
      setInterval(function() {
        var symbol = document.getElementsByClassName("woocommerce-Price-currencySymbol")[0];
        if (symbol && symbol.innerHTML !== "") {
          // Clear symbol
          symbol.innerHTML = "";
          // Create new span node and add " BTCP" into it
          var node = document.createElement("SPAN");
          node.innerHTML = "&nbsp;BTCP";
          // Insert that node just after the price
          symbol.parentNode.insertBefore(node, symbol.parentNode.children[1]);
        }
      },10)
    </script>
    <?php
  }
}

// Go to settings page after activation
function btcp_woocommerce_activate($plugin) {
    if($plugin == plugin_basename( __FILE__ )) {
        exit(wp_redirect(admin_url('options-general.php?page=btcp-pay-woocommerce')));
    }
}
add_action('activated_plugin', 'btcp_woocommerce_activate');

// Add option to admin menu > settings section
add_action('admin_menu', function() {
  add_options_page('BTCP Pay WooCommerce Settings', 'BTCP Pay WooCommerce', 'manage_options', 'btcp-pay-woocommerce', 'btcp_woocommerce_settings');
});

// Form for user to paste widget code into
function btcp_woocommerce_settings() {
 ?>
   <h1>BTCP Pay WooCommerce Settings</h1>
   <p>Please paste the <strong>btcpWidget.data</strong> section from your widget code from your account on the <a href="https://btcppay.com" target="_blank">btcppay.com</a> site into the box below (as per the example below) and we'll take take of it working within WooCommerce.</p>
   <p>(Leave the "amount" line with a fixed value, we'll change to the users cart total automatically. We'll also add the currency and hideButton params for you automatically, no need to set those yourself. If you add "currency" : "BTCP" however, WooCommerce will show all prices as BTCP being the currency).</p>
   <p>You can return to this settings page at any time under the Settings > BTCP Pay WooCommerce section on the left.</p>
   <div class="wrap">
     <form action="options.php" method="post">
       <?php
       settings_fields('btcp-pay-woocommerce-settings');
       do_settings_sections('btcp-pay-woocommerce-settings');
       ?>
       <textarea placeholder='Paste the btcpWidget.data JSON from your BTCP Pay widget code here, eg:

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
  };' name="btcp_woocommerce_widget_code" style="width: 300px; height: 400px"><?php echo esc_attr( get_option('btcp_woocommerce_widget_code') ); ?></textarea>

       <?php submit_button(); ?>
     </form>
   </div>
 <?php
}
// Register that DB setting
add_action('admin_init', function() {
  register_setting('btcp-pay-woocommerce-settings', 'btcp_woocommerce_widget_code');
});

// When plugins loaded, run function to init our BTCP Pay plugin
add_action('plugins_loaded', 'btcp_widget_init_custom_gateway');
function btcp_widget_init_custom_gateway()
{

    class WC_Gateway_Custom extends WC_Payment_Gateway
    {

        public $domain;

        /**
         * Constructor for the gateway.
         */
        public function __construct()
        {

            $this->domain = 'custom_payment';

            $this->id                 = 'bitcoin_private';
            $this->icon               = apply_filters('woocommerce_custom_gateway_icon', '');
            $this->has_fields         = false;
            $this->method_title       = __('Bitcoin Private', $this->domain);
            $this->method_description = __('Allows payments with btcppay.com gateway.', $this->domain);

            // Load the settings.
            $this->init_form_fields();
            $this->init_settings();

            // Define user set variables
            $this->title        = $this->get_option('title');
            $this->description  = $this->get_option('description');
            //$this->widget_code  = $this->get_option('widget_code');
            $this->instructions = $this->get_option('instructions', $this->description);
            $this->order_status = $this->get_option('order_status', 'completed');

            // Actions
            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array(
                $this,
                'process_admin_options'
            ));
            add_action('woocommerce_thankyou_custom', array(
                $this,
                'thankyou_page'
            ));

            // Customer Emails
            add_action('woocommerce_email_before_order_table', array(
                $this,
                'email_instructions'
            ), 10, 3);
        }

        /**
         * Initialise Gateway Settings Form Fields.
         */
        public function init_form_fields()
        {

            $this->form_fields = array(
                'enabled' => array(
                    'title' => __('Enable/Disable', $this->domain),
                    'type' => 'checkbox',
                    'label' => __('Enable Bitcoin Private (btcppay.com) Custom Payment', $this->domain),
                    'default' => 'yes'
                ),
                'title' => array(
                    'title' => __('Title', $this->domain),
                    'type' => 'text',
                    'description' => __('This controls the title which the user sees during checkout.', $this->domain),
                    'default' => __('Bitcoin Private', $this->domain),
                    'desc_tip' => true
                ),
                'order_status' => array(
                    'title' => __('Order Status', $this->domain),
                    'type' => 'select',
                    'class' => 'wc-enhanced-select',
                    'description' => __('Choose which status you wish after checkout.', $this->domain),
                    'default' => 'wc-completed',
                    'desc_tip' => true,
                    'options' => wc_get_order_statuses()
                ),
/*                 'widget_code' => array(
                    'title' => __('btcppay.com Widget Code', $this->domain),
                    'type' => 'textarea',
                    'description' => __('Place your widget code here', $this->domain),
                    'default' => __('Place your widget code here', $this->domain),
                    'desc_tip' => true
                ), */
                'description' => array(
                    'title' => __('Description', $this->domain),
                    'type' => 'textarea',
                    'description' => __('Payment method description that the customer will see on your checkout.', $this->domain),
                    'default' => __('Pay via Bitcoin Private', $this->domain),
                    'desc_tip' => true
                ),
                'instructions' => array(
                    'title' => __('Instructions', $this->domain),
                    'type' => 'textarea',
                    'description' => __('Instructions that will be added to the thank you page and emails.', $this->domain),
                    'default' => '',
                    'desc_tip' => true
                )
            );
        }

        /**
         * Output for the order received page.
         */
        public function thankyou_page()
        {
            if ($this->instructions)
                echo wpautop(wptexturize($this->instructions));
        }

        /**
         * Add content to the WC emails.
         *
         * @access public
         * @param WC_Order $order
         * @param bool $sent_to_admin
         * @param bool $plain_text
         */
        public function email_instructions($order, $sent_to_admin, $plain_text = false)
        {
            if ($this->instructions && !$sent_to_admin && 'custom' === $order->payment_method && $order->has_status('on-hold')) {
                echo wpautop(wptexturize($this->instructions)) . PHP_EOL;
            }
        }

        public function payment_fields()
        {

            if ($description = $this->get_description()) {
                echo wpautop(wptexturize($description));
//                 echo wpautop(wptexturize($widget_code));
            }


?>
            <div id="custom_input">

              <input type="hidden" class="" name="i_payment_address" id="i_payment_address" placeholder="" value="">
              <input type="hidden" class="" name="i_payment_txid" id="i_payment_txid" placeholder="" value="">
              <input type="hidden" class="" name="i_payment_txref" id="i_payment_txref" placeholder="" value="">

              <p class="form-row form-row-wide">
              Clicking the Place Order button below, we'll establish the equivalent in BTCP and provide the address and QR code for payment.
              </p>

              <script id="btcp_widget_data">
                var btcpWidget = {};
                <?php
                // Pickup widget code and output after replacing "amount" value with cart amount and adding currency (unless user specified BTCP) and hideButton params also
                $btcp_widget_data = str_replace("\r","",get_option('btcp_woocommerce_widget_code'));
                $btcp_widget_data = explode("\n",$btcp_widget_data);
                for($i=0; $i<count($btcp_widget_data); $i++) {
                  global $btcp_widget_currency_set;
                  if (strpos($btcp_widget_data[$i], '"amount"') > -1) {
                    $btcp_widget_data[$i] = '    "amount"      : '.(WC()->cart->total).',\n'.
                                      ($btcp_widget_currency_set
                                        ? ''
                                        : '    "currency"   : "'.get_woocommerce_currency().'",\n'
                                      ).
                                      '    "hideButton"  : true,';
                  }
                }
                echo str_replace("\\n","\n",implode("\n",$btcp_widget_data));
                // Hide block overlays, seem to always show due to overriding currency?
                if ($btcp_widget_currency_set) {
                ?>
                </script>
                <style>
                  .blockOverlay {display: none !important}
                </style>
                <script>
                <?php
                }
                ?>

                btcpWidget.onPaymentSuccess = function(data) {
                  // Set 3 x transaction data values
                  document.getElementById('i_payment_address').value = data.address;
                  document.getElementById('i_payment_txid').value = data.txid;
                  document.getElementById('i_payment_txref').value = data.transactionRef;
                  // Set flag and place order to complete
                  completedPayment = true;
                  get('place_order').click();
                };

                btcpWidget.onPaymentFail = function(data) {
                  alert("Payment failed! Reason: " + data.reason);
                }
              </script>

              <!-- Load core functionality //-->
              <script src="//btcppay.com/widget.js" id="btcp_widget"></script>

              <script>
              // Add click event after a 0ms tickover so DOM elems available
              setTimeout(function() {
                get('place_order').addEventListener("click", function(e){
                  // If something other than Bitcoin Private selected, return early
                  if (!document.getElementById("payment_method_bitcoin_private").checked) {
                    return true;
                  }
                  // Get all the required fields and if shipping different to billing checkbox is checked
                  var reqFields = document.getElementsByClassName("validate-required");
                  var shippingDifferent = document.getElementById("ship-to-different-address-checkbox") && document.getElementById("ship-to-different-address-checkbox").checked;
                  // For each of the required fields
                  for (var i=0; i<reqFields.length; i++) {
                    // Get the form elem and find the input child node inside
                    var formElem = reqFields[i].childNodes[1].childNodes[0];
                    // If it's a billing item we're looking at, or shipping is different and the elem has an empty value, return true (so validation & messages can happen)
                    if ((formElem.name.indexOf("billing_") > -1 || shippingDifferent) && formElem.value == "") {
                      return true;
                    }
                  }
                  // OK, so it's a Bitcoin Private payment the user has chosen and all mandatory fields completed
                  if ("undefined" != typeof completedPayment) {
                    // do nothing else, payment already going ahead and order being completed
                  } else if (!btcpWidget.showPaymentScreenLockOn) {
                    // Prevent default to stop form action submission
                    e.preventDefault();
                    // If user has paid enough, inform them, else show payment screen
                    btcpWidget.paidEnough
                        ? alert("Payment in progress, please wait")
                        : btcpWidget.showPaymentScreen();
                    // Return false to go no further, let widget display
                    return false;
                  }
                });
              },0)
              </script>

            </div>
            <?php
        }

        /**
         * Process the payment and return the result.
         *
         * @param int $order_id
         * @return array
         */
        public function process_payment($order_id)
        {

            $order = wc_get_order($order_id);

            $status = 'wc-' === substr($this->order_status, 0, 3) ? substr($this->order_status, 3) : $this->order_status;

            // Set order status
            $order->update_status($status, __('Checkout with custom payment. ', $this->domain));

            // Reduce stock levels
            // depreceiated // $order->reduce_order_stock();
            //$order->reduce_stock_levels();

            // Remove cart
            WC()->cart->empty_cart();

            // Return thankyou redirect
            return array(
                'result' => 'success',
                'redirect' => $this->get_return_url($order)
            );
        }
    }
}

add_filter('woocommerce_payment_gateways', 'btcp_woocommerce_add_custom_gateway_class');
function btcp_woocommerce_add_custom_gateway_class($methods)
{
    $methods[] = 'WC_Gateway_Custom';
    return $methods;
}

/**
 * Update the order meta with field value
 */
add_action('woocommerce_checkout_update_order_meta', 'btcp_woocommerce_custom_payment_update_order_meta');
function btcp_woocommerce_custom_payment_update_order_meta($order_id)
{

    if ($_POST['payment_method'] != 'bitcoin_private')
        return;

    update_post_meta($order_id, 'btcp_payment_address', sanitize_text_field($_POST['i_payment_address']));
    update_post_meta($order_id, 'btcp_payment_txid', intval($_POST['i_payment_txid']));
    update_post_meta($order_id, 'btcp_payment_txref', sanitize_text_field($_POST['i_payment_txref']));
}

/**
 * Display field value on the order edit page
 */
add_action('woocommerce_admin_order_data_after_billing_address', 'btcp_woocommerce_custom_checkout_field_display_admin_order_meta', 10, 1);
function btcp_woocommerce_custom_checkout_field_display_admin_order_meta($order)
{
    $method = get_post_meta($order->id, '_payment_method', true);
    if ($method != 'bitcoin_private')
        return;

    $payment_address = sanitize_text_field(get_post_meta($order->id, 'btcp_payment_address', true));
    $payment_txid = intval(get_post_meta($order->id, 'btcp_payment_txid', true));
    $payment_txref = sanitize_text_field(get_post_meta($order->id, 'btcp_payment_txref', true));

    echo '<p><strong>' . __('Payment Address') . ':</strong> <a href="https://explorer.btcprivate.org/address/' . $payment_address . '" target="_blank"> ' . $payment_address . '</a></p>';
    echo '<p><strong>' . __('BTCP Transaction ID') . ':</strong> <a href="https://explorer.btcprivate.org/tx/' . $payment_txid . '" target="_blank"> ' . $payment_txid . '</a></p>';
    echo '<p><strong>' . __('BTCP Pay TransactionRef') . ':</strong> ' . $payment_txref . '</p>';

}
