# TransactionalJS

Transactional, reactive, and serializable state management core written with TypeScript.

Properly implemented two-phase update transactions on object ownership tree, dude. Change events, with updates in the scope of current transaction. All serializable. All dynamically type safe. Just what the doctors prescribe for the modern data layer.

Mostly compatible by API with your backbonejs, but 10 times faster in all browsers and capable of way more than your old plugins are, dude. :) 

Will be the basis of NestedTypes 2.0 version. Does to your React app the same thing as mobx does, but adds serialization. And to be fair, we started earler, so it's appropriate to say that they do the part of tricks we're doing for two years.

## Rationale

Because we can.

## Current state

- [x] Basic regression tests passes. Transactional core seems to work.
- [x] New integral performance tests shows 2-3 times performance improvement in complex structure updates. Good enough to go further.
- [ ] Launching backbone Model/Collection regression to implement missing core functionality. That's gonna be tough.
    - [x] Model regression passes.
    - [ ] Collection regression passes.
- [ ] Implement relations.
- [ ] Implement NestedTypes compatibility layer.
- [ ] Test it with NestedReact examples.
- [ ] Release ObjectPlus as separate package.
- [ ] Implement classes support in NestedReact.
- [ ] Deploy NestedReact and NestedTypes 2.0 RC to Volicon Observer product.
- [ ] Release NestedTypes 2.0 and NestedReact 1.0

## Compatibility notes

- `model.initialize( attrs, options, owner )` uses third parameter to set owner, `options.collection` is ignored.
- default model cid prefix is `m`.
- model.set `unset` option is deprecated. In Type-R, model os no hash. Just assign attributes with void 0 instead.
- model `change:attr` events are not bubbled up by collection by default. Manual `bubbleEvents` spec is required. Performance reasons.
- Collection doesn't have `_addReference` and `_removeReference` callbacks. Impossible to implement efficiently. Use 'add' and 'remove' events instead.