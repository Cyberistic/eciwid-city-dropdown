
// dummy test file adds text field in checkout
ec = ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// The field "how_did_you_find_us" asks user about how they found the store. Drop down type

const cities = {
    'KW-AH': [["Abu Halifa","أبو حليفة","أبو حليفة",3],["Aqila","العقيلة","العقيلة",3],["Mahbula","المهبولة","المهبولة",3],["Mangaf","المنقف","المنقف",3],["Riqqa","الرقة","الرقة",3],["Sabahiya","الصباحية","الصباحية",3],["Abdullah Al-Mubarak","عبدالله المبارك","عبدالله المبارك",2],["Airport District","منطقة المطار","منطقة المطار",2],["Andalous","الأندلس","الأندلس",2],["Ardiya","العارضية","العارضية",2]],
    'KW-HA': [["Anjafa","أنجفة","أنجفة",1],["Bayan","بيان","بيان",1],["Bida","البدع","البدع",1],["Hawally","حولي","حولي",1],["Hittin","حطين","حطين",1],["Jabriya","الجابرية","الجابرية",1],["Maidan Hawalli","ميدان حولي","ميدان حولي",1],["Mishrif","مشرف","مشرف",1],["Mubarak Abdulla Al Jabir","مبارك العبدالله الجابر","مبارك العبدالله الجابر",1],["Nigra","النقرة","النقرة",1],["Rumaithiya","الرميثية","الرميثية",1],["Salam","سلام","سلام",1],["Salmiya","السالمية","السالمية",1],["Salwa","سلوى","سلوى",1],["Shaab","الشعب","الشعب",1],["Shuhada","الشهداء","الشهداء",1],["Siddiq","الصديق","الصديق",1], ["South Surra","جنوب السرة","جنوب السرة",1],["Zahra","الزهراء","الزهراء",1]],
    'KW-JA': [['No delivery for this area', 'لا يوجد توصيل لهذه المحافظة', 'لا يوجد توصيل لهذه المحافظة', 1]],
    'KW-KU': [["Abdulla Al Salem","ضاحية عبد الله السالم","ضاحية عبد الله السالم",1],["Adailiya","العديلية","العديلية",1],["Bnaid Al Qar","بنيد القار","بنيد القار",1],["Daiya","الدعية","الدعية",1],["Dasma","الدسمة","الدسمة",1],["Faiha","الفيحاء","الفيحاء",1],["Ghornata","غرناطة","غرناطة",2],["Jibla","قبلة","قبلة",1],["Kaifan","كيفان","كيفان",1],["Khaldiya","الخالدية","الخالدية",1],["Mansuriya","المنصورية","المنصورية",1],["Mirgab","المرقاب","المرقاب",1],["Nahdha","النهضة","النهضة",3],["North West Sulaibikhat","شمال غرب الصليبيخات","شمال غرب الصليبيخات",3],["Nuzha","النزهة","النزهة",1],["Qadsiya","القادسية","القادسية",1],["Qurtuba","قرطبة","قرطبة",1],["Rawda","الروضة","الروضة",1],["Shamiya","الشامية","الشامية",1],["Sharq","شرق","شرق",1],["Shuwaikh","الشويخ","الشويخ",1],["Shuwaikh Industrial Area","الشويخ الصناعية","الشويخ الصناعية",2],["Shuwaikh Port","ميناء الشويخ","ميناء الشويخ",2],["Sulaibikhat","الصليبخات","الصليبخات",3],["Surra","السرة","السرة",1],["Yarmouk","اليرموك","اليرموك",1]],
    'KW-FA': [['No delivery for this area', 'لا يوجد توصيل لهذه المحافظة', 'لا يوجد توصيل لهذه المحافظة', 1]],
    'KW-MU': [["Abu Al Hasaniya","أبو الحصانية","أبو الحصانية",2],["Abu Futaira","أبو فطيرة","أبو فطيرة",2],["Adan","العدان","العدان",2],["Al Qurain","القرين","القرين",2],["Al-Qusour","القصور","القصور",2],["Fintas","الفنطاس","الفنطاس",3],["Funaitis","الفنيطيس","الفنيطيس",2],["Misila","المسيلة","المسيلة",2],["Mubarak Al Kabeer","مبارك الكبير","مبارك الكبير",2],["Sabah Al Salem","صباح السالم","صباح السالم",2]]
}

for (const city in cities) {
    ec.order.extraFields[city] = {
        'title': city,
        'type': 'select',
        'required': false,
        // 'selectOptions': cities[city],
        'options': cities[city].map(e => {return {
            'title': e[0],
            'titleTranslated': {
                'en': e[0],
                'ar': e[1]
            },
            'surcharge': e[3]
        }}),
        'surchargeType': 'ABSOLUTE',
        'surchargeShortName': {
            'name': 'Delivery',
            'nameTranslated': {
                'en': 'Delivery',
                'ar': 'سعر التوصيل'
            }
        },
        showZeroSurchargeInTotal = false,
        'value': '', // Default value
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

            let targeted = document.getElementsByClassName('ec-form__cell--' + e.target.value)[0].getElementsByClassName('form-control--select')[0].getElementsByClassName('form-control__select')[0]
            Ecwid.Cart.setAddress({
                "name": document.getElementById('ec-full-name').value,
                "phone": document.getElementById('ec-phone').value,
                "street": document.getElementById('ec-address-line1').value,
                "stateOrProvinceCode": e.target.value,
                "city": targeted.value
                })
            targeted.addEventListener('change', function (f) {
                Ecwid.Cart.setAddress({
                    "name": document.getElementById('ec-full-name').value,
                    "phone": document.getElementById('ec-phone').value,
                    "street": document.getElementById('ec-address-line1').value,
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
