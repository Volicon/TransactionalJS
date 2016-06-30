"use strict";
var typespec_ts_1 = require('./typespec.ts');
var tools_ts_1 = require('../tools.ts');
function compile(rawSpecs, baseAttributes) {
    var myAttributes = tools_ts_1.transform({}, rawSpecs, typespec_ts_1.createAttribute), allAttributes = tools_ts_1.defaults({}, myAttributes, baseAttributes), Attributes = createCloneCtor(allAttributes);
    return {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: tools_ts_1.transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }),
        forEach: createForEach(allAttributes),
        defaults: createDefaults(allAttributes),
        _toJSON: createToJSON(allAttributes),
        _parse: createParse(myAttributes, allAttributes)
    };
}
exports.compile = compile;
function createForEach(attrSpecs) {
    var statements = ['var v;'];
    for (var name_1 in attrSpecs) {
        statements.push("( v = a." + name_1 + " ) === void 0 || f( v, \"" + name_1 + "\" );");
    }
    return new Function('a', 'f', statements.join(''));
}
exports.createForEach = createForEach;
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name_2 in attrSpecs) {
        statements.push("this." + name_2 + " = x." + name_2 + ";");
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
exports.createCloneCtor = createCloneCtor;
function createDefaults(attrSpecs) {
    var assign_f = ['var v;'], create_f = [];
    function appendExpr(name, expr) {
        assign_f.push("this." + name + " = ( v = a." + name + " ) === void 0 ? " + expr + " : v;");
        create_f.push("this." + name + " = " + expr + ";");
    }
    for (var name_3 in attrSpecs) {
        var attrSpec = attrSpecs[name_3], value = attrSpec.value, type = attrSpec.type;
        if (value === void 0 && type) {
            appendExpr(name_3, "i." + name_3 + ".create()");
        }
        else {
            if (tools_ts_1.isValidJSON(value)) {
                appendExpr(name_3, JSON.stringify(value));
            }
            else if (value === void 0) {
                appendExpr(name_3, 'void 0');
            }
            else {
                appendExpr(name_3, "i." + name_3 + ".value");
            }
        }
    }
    var CreateDefaults = new Function('i', create_f.join('')), AssignDefaults = new Function('a', 'i', assign_f.join(''));
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'], create = false;
    for (var name_4 in allAttrSpecs) {
        var local = attrSpecs[name_4];
        if (local && local.parse)
            create = true;
        if (allAttrSpecs[name_4].parse) {
            var s = "r." + name_4 + " === void 0 ||( r." + name_4 + " = a." + name_4 + ".parse.call( this, r." + name_4 + ", \"" + name_4 + "\") );";
            statements.push(s);
        }
    }
    if (create) {
        statements.push('return r;');
        return new Function('r', statements.join(''));
    }
}
function createToJSON(attrSpecs) {
    var statements = ["var json = {},v=this.attributes,a=this._attributes;"];
    for (var key in attrSpecs) {
        var toJSON = attrSpecs[key].toJSON;
        if (toJSON) {
            statements.push("json." + key + " = a." + key + ".toJSON.call( this, v." + key + ", '" + key + "' );");
        }
    }
    statements.push("return json;");
    return new Function(statements.join(''));
}
//# sourceMappingURL=define.js.map