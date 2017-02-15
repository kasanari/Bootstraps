import io from 'socket.io-client';

export default class ClientAPI {
    constructor(url) {
        // If url is undefined, socket io tries to use same host as client
        this._io = io(url);
        this._menu = null;
        this._orders = null;

        this._addHandlers();
    }

    // Expose a vue plugin install function
    install(Vue, options) {
        // Expose this clientAPI to all vue elements
        Vue.prototype.clientAPI = this;
    }

    _addHandlers() {
        this._io.on('initialize', this._onInitialize.bind(this));
        this._io.on('orders', this._onOrders.bind(this));
    }

    getMenu() {
        return this._promiseForProp('_menu');
    }

    getOrders() {
        return this._promiseForProp('_orders');
    }

    _promiseForProp(prop) {
        return new Promise((resolve, reject) => {
            let waitFunc = () => {
                if (this[prop]) {
                    resolve(this[prop]);
                    return;
                }

                setTimeout(waitFunc, 1000);
            }
            waitFunc();
        });
    }

    _onInitialize(data) {
        this._menu = data.menu;
        this._orders = data.orders;
    }

    _onOrders(data) {
        this._orders = data.orders;
    }
}