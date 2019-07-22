import { IOEndpoint, IOOptions, IOPromise } from '@type-r/models';
export declare function attributesIO(): AttributesEndpoint;
export declare class AttributesEndpoint implements IOEndpoint {
    create(json: any, options: IOOptions): IOPromise<any>;
    update(id: any, json: any, options: IOOptions): IOPromise<any>;
    read(id: any, options: IOOptions, record: any): IOPromise<any>;
    destroy(id: any, options: IOOptions): IOPromise<any>;
    list(options?: IOOptions): IOPromise<any>;
    subscribe(events: any): any;
    unsubscribe(events: any): any;
}
