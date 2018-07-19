<?php
/*
Plugin Name: Bitcoin Private for Woocommerce
Description: BTCPPay.com WooCommerce Payment Gateway Integration for payments with Bitcoin Private
Author: J62 & MattPass
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}


add_action('plugins_loaded', 'init_custom_gateway_class');
function init_custom_gateway_class()
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
            $this->method_description = __('Allows payments with BTCPPAY.com gateway.', $this->domain);

            // Load the settings.
            $this->init_form_fields();
            $this->init_settings();

            // Define user set variables
            $this->title        = $this->get_option('title');
            $this->description  = $this->get_option('description');
            $this->widget_code  = $this->get_option('widget_code');
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
                    'label' => __('Enable Bitcoin Private (BTCPPay.com) Custom Payment', $this->domain),
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
                    'description' => __('Choose whether status you wish after checkout.', $this->domain),
                    'default' => 'wc-completed',
                    'desc_tip' => true,
                    'options' => wc_get_order_statuses()
                ),
                'widget_code' => array(
                    'title' => __('BTCPPay.com Widget Code', $this->domain),
                    'type' => 'textarea',
                    'description' => __('Place your widget code here', $this->domain),
                    'default' => __('Place your widget code here', $this->domain),
                    'desc_tip' => true
                ),
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
                echo wpautop(wptexturize($widget_code));
            }


?>
            <div id="custom_input">


              <p class="form-row form-row-wide">
                  <input type="hidden" class="" name="i_payment_address" id="i_payment_address" placeholder="" value="">
              </p>

              <p class="form-row form-row-wide">
                  <input type="hidden" class="" name="i_payment_txid" id="i_payment_txid" placeholder="" value="">
              </p>

              <p class="form-row form-row-wide">
                  <input type="hidden" class="" name="i_payment_txref" id="i_payment_txref" placeholder="" value="">
              Clicking the Place Order button below, we'll establish the equivalent in BTCP and provide the address and QR code for payment.
              </p>

<script id="btcp_widget_data">
  var btcpWidget = {};
  btcpWidget.data = {
    "id"          : "btcp_widget",
    "buttonData"  : "buy_A1_0",
    "hideButton"  : true,
    "merchantid"  : "414",
    "walletid"    : "2",
    "amount"      : <?php echo WC()->cart->total; ?>,
    "currency"    : "<?php echo get_woocommerce_currency();?>",
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
    console.log("Payment Success:\n\n" + JSON.stringify(data));
    paymentAddress = data.address;
    paymentTxid = data.txid;
    paymentTxref = data.transactionRef;

    var payment_address_textbox = document.getElementById('i_payment_address');
    payment_address_textbox.value = paymentAddress;
    var payment_txid_textbox = document.getElementById('i_payment_txid');
    payment_txid_textbox.value = paymentTxid;
    var payment_txref_textbox = document.getElementById('i_payment_txref');
    payment_txref_textbox.value = paymentTxref;
    //document.getElementById('i_payment_address').innerHTML = paymentAddress;

    console.log("address: " + paymentAddress);
    console.log("txid: " + paymentTxid);
    console.log("txref: " + paymentTxref);
    //alert("Payment success! Data:\n\n" + JSON.stringify(data));
    completedPayment = true;
    get('place_order').click();
  };

  btcpWidget.onPaymentFail = function(data) {
    alert("Payment failed! Reason: " + data.reason);
  }
</script>

<!-- Load core functionality //-->
<script src="//mattpass.com/lab/widget.js" id="btcp_widget"></script>

<script>
setTimeout(function() {
  get('place_order').addEventListener("click", function(e){
    if ("undefined" != typeof completedPayment) {
//       return true;
    } else if (!btcpWidget.showPaymentScreenLockOn) {
      e.preventDefault();
      btcpWidget.paidEnough
          ? alert("Payment in progress, please wait")
          : btcpWidget.showPaymentScreen();
      return false;
    }
  });
},3000)
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

add_filter('woocommerce_payment_gateways', 'add_custom_gateway_class');
function add_custom_gateway_class($methods)
{
    $methods[] = 'WC_Gateway_Custom';
    return $methods;
}

add_action('woocommerce_checkout_process', 'process_custom_payment');
function process_custom_payment()
{

    if ($_POST['payment_method'] != 'bitcoin_private')
        return;

      if( !isset($_POST['i_payment_address']) || empty($_POST['i_payment_address']) )
           wc_add_notice( __( 'Payment address not populated'), 'error' );
      if( !isset($_POST['i_payment_txid']) || empty($_POST['i_payment_txid']) )
           wc_add_notice( __( 'Payment txid not populated'), 'error' );
      if( !isset($_POST['i_payment_txref']) || empty($_POST['i_payment_txref']) )
           wc_add_notice( __( 'Payment txref not populated'), 'error' );

}

/**
 * Update the order meta with field value
 */
add_action('woocommerce_checkout_update_order_meta', 'custom_payment_update_order_meta');
function custom_payment_update_order_meta($order_id)
{

    if ($_POST['payment_method'] != 'bitcoin_private')
        return;

  //   echo "<pre>";
  //   print_r($_POST);
  //   echo "</pre>";
  //   exit();

    update_post_meta($order_id, 'paymentAddress', $_POST['i_payment_address']);
    update_post_meta($order_id, 'paymentTxid', $_POST['i_payment_txid']);
    update_post_meta($order_id, 'paymentTxref', $_POST['i_payment_txref']);
}

/**
 * Display field value on the order edit page
 */
add_action('woocommerce_admin_order_data_after_billing_address', 'custom_checkout_field_display_admin_order_meta', 10, 1);
function custom_checkout_field_display_admin_order_meta($order)
{
    $method = get_post_meta($order->id, '_payment_method', true);
    if ($method != 'bitcoin_private')
        return;

    $paymentAddress = get_post_meta($order->id, 'paymentAddress', true);
    $paymentTxid = get_post_meta($order->id, 'paymentTxid', true);
    $paymentTxref = get_post_meta($order->id, 'paymentTxref', true);

    echo '<p><strong>' . __('Payment Address') . ':</strong> <a href="https://explorer.btcprivate.org/address/' . $paymentAddress . '" target="_blank"> ' . $paymentAddress . '</a></p>';
    echo '<p><strong>' . __('BTCP Transaction ID') . ':</strong> <a href="https://explorer.btcprivate.org/tx/' . $paymentTxid . '" target="_blank"> ' . $paymentTxid . '</a></p>';
    echo '<p><strong>' . __('BTCP Pay TransactionRef') . ':</strong> ' . $paymentTxref . '</p>';

}
