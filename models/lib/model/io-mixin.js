import { __assign } from "tslib";
import { startIO } from '../io-tools';
export var IOModelMixin = {
    save: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var endpoint = this.getEndpoint(), json = this.toJSON(__assign({ ioMethod: 'save' }, options));
        return startIO(this, this.isNew() ?
            endpoint.create(json, options, this) :
            endpoint.update(this.id, json, options, this), options, function (update) {
            _this.set(update, __assign({ parse: true, ioMethod: 'save' }, options));
        });
    },
    fetch: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().read(this.id, options, this), options, function (json) { return _this.set(json, __assign({ parse: true, ioMethod: 'fetch' }, options)); });
    },
    destroy: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().destroy(this.id, options, this), options, function () {
            var collection = _this.collection;
            if (collection) {
                collection.remove(_this, options);
            }
            else {
                _this.dispose();
            }
            return _this;
        });
    }
};
//# sourceMappingURL=io-mixin.js.map