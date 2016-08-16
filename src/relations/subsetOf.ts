import { Collection, CollectionOptions } from '../collection'
import { tools, define } from '../object-plus'
import { Record, TransactionalType } from '../record'
import { parseReference, CollectionReference } from './commons'
import { ChainableAttributeSpec } from '../record'
import { Transactional, TransactionOptions } from '../transactions'

const { fastDefaults } = tools;

type RecordsIds = ( string | number )[];

Collection.subsetOf = function subsetOf( masterCollection : CollectionReference ) : ChainableAttributeSpec {
    const SubsetOf = this._SubsetOf || ( this._SubsetOf = defineSubsetCollection( this ) ),
        getMasterCollection = parseReference( masterCollection ),
        typeSpec = new ChainableAttributeSpec({
            type : SubsetOf
        });

    typeSpec.get(
        function( refs ){
            !refs || refs.resolvedWith || refs.resolve( getMasterCollection( this ) );
            return refs;
        }
    );

    return typeSpec;
};

/** @private */
function subsetOptions( options : CollectionOptions ){
    const subsetOptions = { parse : true };
    if( options ) fastDefaults( subsetOptions, options );
    return subsetOptions;
}

function defineSubsetCollection( CollectionConstructor : typeof Collection ) {
    @define({})
    class SubsetOfCollection extends CollectionConstructor {
        refs : any[];
        resolvedWith : Collection = null;

        constructor( recordsOrIds?, options? ){
            super( recordsOrIds, subsetOptions( options ), true );
        }

        add( elements, options? ){
            return super.add( elements, subsetOptions( options ) );
        }

        reset( elements?, options? ){
            return super.reset( elements, subsetOptions( options ) );
        }

        _createTransaction( elements, options? ){
            return super._createTransaction( elements, subsetOptions( options ) );
        }

        // Serialized as an array of model ids.
        toJSON() : RecordsIds {
            return this.refs ?
                this.refs.map( objOrId => objOrId.id || objOrId ) :
                this.models.map( model => model.id );
        }

        // Must be shallow copied on clone.
        clone( owner? ){
            var Ctor = (<any>this).constructor,
                copy = new Ctor( this.models, {
                    model : this.model,
                    comparator : this.comparator
                });

            copy.resolvedWith = this.resolvedWith;
            copy.refs         = this.refs;

            return copy;
        }

        // Parse is always invoked. Careful, performance-sensitive.
        parse( raw : any ) : Record[] {
            const { resolvedWith } = this,
                elements = Array.isArray( raw ) ? raw : [ raw ],
                records : Record[] = [];                            

            if( resolvedWith ){
                for( let element of elements ){
                    const record = resolvedWith.get( element );
                    if( record ) records.push( record );
                }
            }
            else{
                this.refs = raw;
            }

            return records;
        }

        resolve( collection : Collection ) : this {
            if( collection && collection.length ){
                this.resolvedWith = collection;

                if( this.refs ){
                    this.reset( this.refs, { silent : true } );
                    this.refs = null;
                }
            }

            return this;
        }

        getModelIds() : RecordsIds { return this.toJSON(); }

        toggle( modelOrId : any, val : boolean ) : boolean {
            return super.toggle( this.resolvedWith.get( modelOrId ), val );
        }

        addAll() : Record[] {
            return this.reset( this.resolvedWith.models );
        }

        toggleAll() : Record[] {
            return this.length ? this.reset() : this.addAll();
        }
    }

    return SubsetOfCollection;
}
