function getMenu() {
    return {
        'food': [
            {
              'name': 'Pulled jackfruit-burgare',
              'kcal': 101,
              'allergens': [],
              'img':
                  'http://blog.fatfreevegan.com/wp-content/uploads/2011/10/colleen-chickpea-burgers3.jpg'
            },
            {
              'name': 'Kikärtsburgare',
              'kcal': 102,
              'allergens': ['soy', 'gluten'],
              'img':
                  'http://veganheaven.org/wp-content/uploads/2015/08/Pulled-Jackfruit-Sandwich-with-Avocado-4.jpg'
            },
            {
              'name': 'Seitan-tofu burgare',
              'kcal': 103,
              'allergens': ['soy'],
              'img':
                  'https://c1.staticflickr.com/9/8338/8217092065_13c3355a5e_b.jpg'
            },
            {
              'name': 'burgare4',
              'kcal': 104,
              'allergens': ['gluten'],
              'img': 'http://placehold.it/150x150'
            },
            {
              'name': 'burgare5',
              'kcal': 105,
              'allergens': [],
              'img': 'http://placehold.it/150x150'
            }
        ]
    }
}

if (typeof global !== 'undefined') {
    global.getMenu = getMenu;
}
