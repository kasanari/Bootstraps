function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function indexPageLoaded() {
    displayBurgers();
}

function Product(name, kcal, allergens, img) {
    this._name = name || '';
    this._kcal = kcal || 0;
    this._allergens = allergens || [];
    this._img = img || '';
}

Product.prototype.getName =
    function() {
    return this._name;
}

    Product.prototype.getKcal =
        function() {
    return this._kcal;
}

        Product.prototype.getAllergens =
            function() {
    return this._allergens;
}

            Product.prototype.getImg =
                function() {
    return this._img;
}

function createBurgerDiv(burger) {
    let div = document.createElement('div');
    div.className = 'burger-item';

    let title = document.createElement('h3');
    title.appendChild(document.createTextNode(burger.getName()));

    let infoList = document.createElement('ul');
    let kcalItem = document.createElement('li');
    kcalItem.appendChild(document.createTextNode(burger.getKcal() + ' kCal'));
    infoList.appendChild(kcalItem);

    burger.getAllergens().forEach(b => {
        let allergenItem = document.createElement('li');
        allergenItem.appendChild(document.createTextNode(b));
        allergenItem.className = 'allergenic';
        infoList.appendChild(allergenItem);
    });

    let img = document.createElement('img');
    img.className = 'img-product'
    img.setAttribute('src', burger.getImg());

    let orderCheckbox = document.createElement('input');
    orderCheckbox.setAttribute('type', 'checkbox');
    orderCheckbox.setAttribute('name', 'burger-type');
    orderCheckbox.setAttribute('value', burger.getName());
    orderCheckbox.setAttribute('id', 'checkbox-' + burger.getName());
    let orderLabel = document.createElement('label');
    orderLabel.appendChild(document.createTextNode('Vill beställa'));
    orderLabel.setAttribute('for', 'checkbox-' + burger.getName());

    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(infoList);
    div.appendChild(orderCheckbox);
    div.appendChild(orderLabel);
    return div;
}

function displayBurgers(products) {
    let burgerMenu = document.querySelector('#burger-menu');
    getMenu().food.forEach(b => {
        let food = new Product(b.name, b.kcal, b.allergens, b.img);
        burgerMenu.appendChild(createBurgerDiv(food));
    });
}
