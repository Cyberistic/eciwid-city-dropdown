
// dummy test file adds text field in checkout
ec = ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// The field "how_did_you_find_us" asks user about how they found the store. Drop down type

const cities = {
    'KW-AH': ['أبو حليفة', 'العقيلة', 'المهبولة', 'المنقف', 'الرقة', 'الصباحية'],
    'KW-HA': ['أنجفة', 'بيان', 'البدع', 'حولي', 'حطين', 'الجابرية', 'ميدان حولي', 'مشرف', 'مبارك العبدالله الجابر', 'النقرة', 'الرميثية', 'سلام', 'السالمية', 'سلوى', 'الشعب', 'الشهداء', 'الصديق', 'جنوب السرة', 'الزهراء'],
    'KW-JA': ['لا يوجد توصيل لهذه المحاافظة'],
    'KW-KU': ['ضاحية عبد الله السالم', 'العديلية', 'بنيد القار', 'الدعية', 'الدسمة', 'الفيحاء', 'فيلكا', 'غرناطة', 'جِبْلَة', 'كيفان', 'الخالدية', 'المنصورية', 'المرقاب', 'النهضة', 'شمال غرب الصليبيخات', 'النزهة', 'القادسية', 'قرطبة', 'الروضة', 'الشامية', 'شرق', 'الشويخ', 'الشويخ الصناعية', 'ميناء الشويخ', 'الصليبخات', 'السرة', 'اليرموك'], 
    'KW-FA': ['عبدالله المبارك', 'منطقة المطار', 'الأندلس', 'العارضية', 'العارضية حرفية', 'العارضية المنطقة الصناعية', 'اشبيلية', 'الضجيج', 'الفروانية', 'الفردوس', 'جليب الشيوخ', 'خيطان', 'العمرية', 'الرابية', 'الري', 'الرقعي', 'الرحاب', 'صباح الناصر'],
    'KW-MU': ['أبو الحصانية', 'أبو فطيرة', 'العدان', 'القرين', 'القصور', 'الفنطاس', 'الفنيطيس', 'المسيلة', 'مبارك الكبير', 'صباح السالم']
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


    let selected_city = null
Ecwid.OnAPILoaded.add(function() {
    console.log("Ecwid storefront JS API has loaded");
    let cur_cart = null;

    Ecwid.Cart.get(function(cart){
        cur_cart = cart.shippingPerson;
        selected_city = cur_cart.stateOrProvinceCode
        ec.order.extraFields[selected_city] = { 
            ...ec.order.extraFields[selected_city],
            'required': true,
        }

    });
    Ecwid.Cart.setAddress({
        "name": cur_cart.name,
        "street": cur_cart.street,
        "city": cur_cart.city,
        "countryName": "Kuwait",
        "stateOrProvinceCode": cur_cart.stateOrProvinceCode,
        "phone": cur_cart.phone
        })

        // document.getElementsByClassName('ec-cart-step__section')
        
    Ecwid.OnPageLoaded.add(function (page) {
        for (const city in cities) {
            if (city != selected_city) {
                document.getElementsByClassName('ec-form__cell--' + city)[0].style.display = 'none';
            }
        }
                    ec.order.extraFields[selected_city] = { 
                    ...ec.order.extraFields[selected_city],
                    'required': true,
                }
        document.getElementsByClassName('ec-form__cell--' + selected_city)[0].getElementsByClassName('form-control--select')[0].getElementsByClassName('form-control__select')[0].addEventListener('change', function (f) {
            Ecwid.Cart.setAddress({
                    ...cur_cart,
                    "city": f.target.value
                })

        })

        document.getElementsByClassName('ec-form__cell--state')[0].getElementsByClassName('form-control--select')[0].getElementsByClassName('form-control__select')[0].addEventListener('change', function (e) {
            document.getElementsByClassName('ec-form__cell--' + selected_city)[0].style.display = 'none';
            document.getElementsByClassName('ec-form__cell--' + e.target.value)[0].style.display = 'flex';
            ec.order.extraFields[selected_city] = { 
                ...ec.order.extraFields[selected_city],
                'required': false,
            }
            ec.order.extraFields[e.target.value] = { 
                ...ec.order.extraFields[e.target.value],
                'required': true,
            }
            document.getElementsByClassName('ec-form__cell--' + selected_city)[0].getElementsByClassName('form-control--select')[0].getElementsByClassName('form-control__select')[0].removeEventListener("change", () => {});

            document.getElementsByClassName('ec-form__cell--' + e.target.value)[0].getElementsByClassName('form-control--select')[0].getElementsByClassName('form-control__select')[0].addEventListener('change', function (f) {
                Ecwid.Cart.setAddress({
                    ...cur_cart,
                    "stateOrProvinceCode": e.target.value,
                    "city": f.target.value
                    })
            })
            selected_city = e.target.value;
        })
    })
    // document.getElementsByClassName('ec-form__cell--' + selected_city)[0].style.display = 'flex';
});

Ecwid.OnCartChanged.add(function(cart){
    console.log(cart)
});
Ecwid.refreshConfig && Ecwid.refreshConfig();
