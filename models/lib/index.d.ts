import { Mixable as Class } from '@type-r/mixture';
import { CollectionConstructor } from './collection';
import { ChainableAttributeSpec, Model, ModelConstructor } from './model';
export { Linked } from '@linked/value';
export * from '@type-r/mixture';
export * from './collection';
export * from './io-tools';
export * from './model';
export * from './relations';
export * from './transactions';
export { Model as Record, Class };
export declare const on: any, off: any, trigger: any, once: any, listenTo: any, stopListening: any, listenToOnce: any;
export declare function transaction<F extends Function>(method: F): F;
export declare function type<T extends new (...args: any) => Model>(t: T[]): ChainableAttributeSpec<CollectionConstructor<InstanceType<T>>>;
export declare function type<T extends object>(t: T[]): ChainableAttributeSpec<CollectionConstructor<InstanceType<ModelConstructor<T>>>>;
export declare function type<T extends Function>(t: T | ChainableAttributeSpec<T>): ChainableAttributeSpec<T>;
export declare function type<T extends object>(t: T): ChainableAttributeSpec<ModelConstructor<T>>;
