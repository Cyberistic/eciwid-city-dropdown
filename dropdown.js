
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
        'value': cities[city[0]], // Default value
        'checkoutDisplaySection': 'shipping_address'
    }
}

function checkout_change() {
    document.getElementById("ec-country").addEventListener('DOMContentLoaded', function(event) {
        
        var countryselect=document.getElementById("ec-country");
        countryselect.options[0]=new Option("republic of cd", "CD",true,true); //replace 1st option with a new one
        console.log(countryselect.options[62])
        countryselect.options[62].selected = true;
        countryselect.options[62].defaultSelected = true;
        document.getElementsByClassName('ec-form__cell--country')[0].style.display = 'none';
      })

    }
    

let selected_city = 'KW-AH'
Ecwid.OnAPILoaded.add(function() {
    console.log("Ecwid storefront JS API has loaded");
    cur_cart = null;
    Ecwid.Cart.get(function(cart){
        cur_cart = cart.shippingPerson;
        selected_city = cur_cart.stateOrProvinceCode
    });
    Ecwid.Cart.setAddress({
        "name": cur_cart.name,
        "street": cur_cart.street,
        "city": cur_cart.city,
        "countryName": "Kuwait",
        "stateOrProvinceCode": cur_cart.stateOrProvinceCode,
        "phone": cur_cart.phone
        })
    // checkout_change()
    Ecwid.OnPageLoaded.add(function (page) {
        for (const city in cities) {
            if (city != selected_city) {
                document.getElementsByClassName('ec-form__cell--' + city)[0].style.display = 'none';
            }
        }
    })
    // document.getElementsByClassName('ec-form__cell--' + selected_city)[0].style.display = 'flex';
});

Ecwid.OnCartChanged.add(function(cart){
    console.log(cart)
});
Ecwid.refreshConfig && Ecwid.refreshConfig();
