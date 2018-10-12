import "reflect-metadata";
import { logger, Logger, attr, Collection, define, predefine, Record } from "type-r";
import "type-r/globals";

logger.off()
    .throwOn( 'error' )
    .throwOn( 'warn' );

function createLogger(){
    const logger = new Logger();
    return logger.count( 'error' ).count( 'warn' );
}

describe( 'Record', () =>{
    it( "can be instantiated", ()=>{
        new Record();
    } );

    describe( 'Subclass', ()=>{
        it( "attaches properties to prototype", ()=>{
            @define( {
                a : 'a'
            } )
            class M extends Record {
                a : string
            }

            expect( M.prototype.a ).toBe( 'a' );
        } );
    } );

    describe( "Attribute spec", () =>{
        describe( '...as constructors', () =>{
            @define class M extends Record {
                @attr( String ) s
                @attr( Number ) n
                @attr( Boolean ) b
                @attr( Object ) o
                @attr( Array ) a
                @attr d : Date
            }

            it( "invokes constructor to create defaults", () =>{
                const m = new M();
                expect( m.s ).toBe( '' );
                expect( m.n ).toBe( 0 );
                expect( m.b ).toBe( false );
                expect( m.o ).toEqual( {} );
                expect( m.a ).toEqual( [] );
                expect( m.d ).toBeInstanceOf( Date );
            } );

            it( "convert values to defined type in 'new'", () =>{
                const logger = createLogger();

                const m = new M( {
                    s : 55,
                    n : "1",
                    b : 'not bool',
                    o : "not an object",
                    a : "not an array",
                    d : 678678678
                }, { logger } );

                expect( logger.counter.error ).toBe( 2 );
                expect( m.s ).toBe( '55' );
                expect( m.n ).toBe( 1 );
                expect( m.b ).toBe( true );
                expect( m.o ).toBeInstanceOf( Object )
                expect( m.a ).toEqual( [] );
                expect( m.d ).toBeInstanceOf( Date );
            } );

            it( "convert values to defined types on assignment", () =>{
                const m = new M();

                // No way to pass custom logger, so we disable the global one.
                logger.off();

                m.s = 55 as any;
                m.n = "1" as any;
                m.b = 'not bool' as any;
                m.o = "not an object" as any;
                m.a = "not an array" as any;
                m.d = 678678678  as any;

                logger.throwOn( 'error' ).throwOn( 'warn' );

                expect( m.s ).toBe( '55' );
                expect( m.n ).toBe( 1 );
                expect( m.b ).toBe( true );
                expect( m.o ).toBeInstanceOf( Object );
                expect( m.a ).toEqual( [] );
                expect( m.d ).toBeInstanceOf( Date );
            } );

            it( "convert values to defined types on set", () =>{
                const m = new M(),
                    logger = createLogger();

                m.set({
                    s : 55,
                    n : "1",
                    b : 'not bool',
                    o : "not an object",
                    a : "not an array",
                    d : 678678678
                }, { logger });

                expect( logger.counter.error ).toBe( 2 );
                expect( m.s ).toBe( '55' );
                expect( m.n ).toBe( 1 );
                expect( m.b ).toBe( true );
                expect( m.o ).toBeInstanceOf( Object );
                expect( m.a ).toEqual( [] );
                expect( m.d ).toBeInstanceOf( Date );
            } );
        } );
        describe( '...as default values', () =>{
            @define class M extends Record {
                @attr s : string = 'b'
                @attr n : number = 1
                @attr b : boolean = true
                @attr o : object = {}
                @attr a : string[] = []
                @attr d : Date
            }

            it( "accepts values as type spec", () =>{
                const m = new M(), other = new M();
                expect( m.s ).toBe( 'b' );
                expect( m.n ).toBe( 1 );
                expect( m.b ).toBe( true );

                expect( m.o ).not.toBe( other.o );
                expect( m.o ).toBeInstanceOf( Object );

                expect( m.a ).not.toBe( other.a );
                expect( m.a ).toEqual( [] );

                expect( m.d ).toBeInstanceOf( Date );
            } );

            it( "infers types from values", () =>{
                const m = new M(),
                      { _attributes } = m;

                expect( _attributes.s.type ).toBe( String );
                expect( _attributes.n.type ).toBe( Number );
                expect( _attributes.b.type ).toBe( Boolean );
                expect( _attributes.o.type ).toBe( Object );
                expect( _attributes.a.type ).toBe( Array );
                expect( _attributes.d.type ).toBe( Date );
            } );
        } );
        describe( '...as constructors with values', () =>{
            it( "converts default values to defined types", () =>{
                @define( {
                    attributes : {
                        s : String.value( 55 ),
                        n : Number.value( "1" ),
                        b : Boolean.value( "some" ),
                        o : Object.value( "not an object" ),
                        a : Array.value( "not an array" ),
                        d : Date.value( 22222 )
                    }
                } )
                class M extends Record {
                    s : string
                    n : number
                    b : boolean
                    o : object
                    a : any[]
                    d : Date                    
                }

                const logger = createLogger();
                const m = new M( void 0 , { logger });

                expect( logger.counter.error ).toBe( 2 );
                expect( m.s ).toBe( '55' );
                expect( m.n ).toBe( 1 );
                expect( m.b ).toBe( true );
                expect( m.o ).toBeInstanceOf( Object );
                expect( m.a ).toEqual( [] );
                expect( m.d ).toBeInstanceOf( Date );
            } );

            it( "accepts null as default value", () =>{
                @define( {
                    attributes : {
                        s : String.value( null ),
                        n : Number.value( null ),
                        b : Boolean.value( null ),
                        o : Object.value( null ),
                        a : Array.value( null ),
                        d : Date.value( null )
                    }
                } )
                class M extends Record {
                    s : string
                    n : number
                    b : boolean
                    o : object
                    a : any[]
                    d : Date                    
                }

                const m = new M();

                expect( m.s ).toBe( null );
                expect( m.n ).toBe( null);
                expect( m.b ).toBe( null );
                expect( m.o ).toBe( null );
                expect( m.a ).toBe( null );
                expect( m.d ).toBe( null );
            } );
        } );
    });

    describe( "Record's collection", () =>{
        it( "is defined in the base Record", ()=>{
            expect( Record.Collection ).toBeInstanceOf( Function );
            expect( Record.Collection.prototype.model ).toBe( Record );
        } );

        it( "is created on Record's extension", () =>{
            @define
            class M extends Record {
            }

            const { prototype } = M.Collection;
            expect( prototype ).toBeInstanceOf( Record.Collection );
            expect( prototype.model ).toBe( M );
        } );

        it( "takes properties from .collection", () =>{
            @define( {
                collection : {
                    a : 'a'
                }
            } )
            class M extends Record {
            }

            expect( ( M as any ).Collection.prototype.a ).toBe( 'a' );
        } );

        it( "can be defined separately", () =>{
            @define( {
                a : 'a'
            } )
            class C extends Collection<M> {
                a : string
            }

            @define
            class M extends Record {
                static Collection = C as any; // Do something with it.
            }

            expect( M.Collection ).toBe( C );
            const { prototype } = M.Collection as any;
            expect( prototype ).toBeInstanceOf( Record.Collection );
            expect( prototype.a ).toBe( 'a' );
            expect( prototype.model ).toBe( M );
        } );
    } );

    describe( 'Attribute types', () =>{
        @define class Test extends Record {
            @attr( Function.value( null ) ) fun : Function
        }

        it( 'Supports function type', ()=>{
            const t = new Test();
            const t2 = t.clone();

            expect( t.fun ).toBe( t2.fun );
        } );
    });

    describe( 'Record pre-definition', ()=>{
        @define
        class M1 extends Record {
        }

        @predefine class M2 extends Record {}
        M2.define();

        it( 'predefine collection types', ()=>{
            expect( M1.Collection ).toBeInstanceOf( Function );
            expect( M2.Collection ).toBeInstanceOf( Function );
        } );

        it( "can't be instantiated", ()=>{
            new M1(); //should throw
        } );

        it( 'support forward declaration', () =>{
            @define
            class M extends Record {
                a : string
            }

            expect( M.Collection ).toBeInstanceOf( Function );
            expect( M.Collection.prototype.model ).toBe( M );

            M.define( {
                a : 'a'
            } );

            expect( M.prototype.a ).toBe( 'a' );
        } );

        it( 'can be defined', ()=>{
            M1.define( {
                a          : 'first',
                collection : {
                    b : 'second'
                }
            } );

            M2.define( {
                a : 'first'
            } );

            M2.Collection.define( {
                b : 'second'
            } );
        } );
    } );
} );