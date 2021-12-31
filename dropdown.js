
// dummy test file adds text field in checkout
ec = ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// The field "how_did_you_find_us" asks user about how they found the store. Drop down type

const cities = {
    'KW-AH': ['City a', 'City b'],
    'KW-HA': ['City c', 'City e'],
    'KW-JA': ['City f', 'City g'],
    'KW-KU': ['City h', 'City i'], 
    'KW-FA': ['City j', 'City k'],
    'KW-MU': ['City l', 'City m']
}

for (const city in cities) {
    ec.order.extraFields[city] = {
        'title': city,
        'type': 'select',
        'required': false,
        // 'selectOptions': cities[city],
        'options': cities[city].map(e => {return {'title': e}}),
        // 'value': cities[city[0]], // Default value
        'checkoutDisplaySection': 'shipping_address'
    }
}
// ec.order.extraFields.how_did_you_find_us = {
//     'title': 'How did you find us?',
//     'type': 'select',
//     'required': false,
//     // 'selectOptions': ['Google Ads', 'Friend told me', 'TV show', 'Other'],
//     'options': [
//         {'title': 'Google Ads'},
//       {'title': 'Friend told me'},
//       {'title': 'TV show'},
//       {'title': 'Other'}
//     ],
//     'value': 'TV show', // Default value
//     'checkoutDisplaySection': 'shipping_address'
// };


// // Add pickup time selection for customer
// ec.order.extraFields.ecwid_pickup_time = {
//     'title': '_msg_ShippingDetails.pickup.customer_header',
//     'required': true,
//     'type': 'datetime',
//     'checkoutDisplaySection': 'shipping_address',
//     'orderDetailsDisplaySection': 'shipping_info',
// }

// // Hidden field, which is not shown at checkout
// ec.order.extraFields.my_custom_field = {
//     'value': 'abcd12345'
// };

function checkout_change() {
    document.getElementById("ec-country").addEventListener('DOMContentLoaded', function(event) {
        
        var countryselect=document.getElementById("ec-country");
        countryselect.options[0]=new Option("republic of cd", "CD",true,true); //replace 1st option with a new one
        console.log(countryselect.options[0])
        countryselect.options[62].selected = true;
        countryselect.options[62].defaultSelected = true;
        document.getElementsByClassName('ec-form__cell--country')[0].style.display = 'none';
      })

    }
    

Ecwid.OnAPILoaded.add(function() {
    console.log("Ecwid storefront JS API has loaded");
    checkout_change()
});

Ecwid.refreshConfig && Ecwid.refreshConfig();
