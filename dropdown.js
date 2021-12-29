
// dummy test file adds text field in checkout
ec = ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// The field "how_did_you_find_us" asks user about how they found the store. Drop down type
ec.order.extraFields.how_did_you_find_us = {
    'title': 'How did you find us?',
    'type': 'select',
    'required': false,
    // 'selectOptions': ['Google Ads', 'Friend told me', 'TV show', 'Other'],
    'options': [
        {'title': 'Google Ads'},
      {'title': 'Friend told me'},
      {'title': 'TV show'},
      {'title': 'Other'}
    ],
    'value': 'TV show', // Default value
    'checkoutDisplaySection': 'shipping_address'
};

// Add pickup time selection for customer
ec.order.extraFields.ecwid_pickup_time = {
    'title': '_msg_ShippingDetails.pickup.customer_header',
    'required': true,
    'type': 'datetime',
    'checkoutDisplaySection': 'shipping_address',
    'orderDetailsDisplaySection': 'shipping_info',
}

// Hidden field, which is not shown at checkout
ec.order.extraFields.my_custom_field = {
    'value': 'abcd12345'
};

function checkout_change() {
    console.log('test')
    // document.getElementById("gwt-uid-17").value="Ah";
    var countryselect=document.getElementById("ec-country");
    countryselect.options[0]=new Option("CD", "GB","","selected"); //replace 1st option with a new one
    }
    
window.onload = checkout_change; 

Ecwid.refreshConfig && Ecwid.refreshConfig();