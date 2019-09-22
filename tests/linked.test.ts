import { type, define, value, Model, AttributesMixin } from '@type-r/models'


describe( 'Attribute value refs', () => {
    @define class Test extends Model {
        static attributes = {
            a : 0,
            b : '',
            c : value( false ).check( x => x, 'Error' )
        }
    }

    interface Test extends AttributesMixin<typeof Test>{}

    it( "can access the attribute's value", ()=>{
        const test = new Test();

        expect( test.$.a.value ).toBe( 0 );
        expect( test.$.b.value ).toBe( '' );
        expect( test.$.c.value ).toBe( false );

        test.$.a.set( 1 );
        expect( test.$.a.value ).toBe( 1 );
    } );

    it( "can access the attribute's error", ()=>{
        const test = new Test();

        expect( test.$.c.error ).toBe( 'Error' );
        test.$.c.set( true );
        expect( test.$.c.error ).toBeFalsy();
    } );

    it( "can access the attribute's descriptor", ()=>{
        const test = new Test();

        expect( test.$.c.descriptor ).toBe( ( test as any )._attributes.c );
    } );

    it( "unchanged value refs identities are retained", ()=>{
        const test = new Test();

        const { a, b, c } = test.$;

        a.set( 1 );
        
        expect( a ).not.toBe( test.$.a );
        expect( b ).toBe( test.$.b );
        expect( c ).toBe( test.$.c );
    } );

    it( 'updates the link on deep changes', () => {

        interface Test2 extends AttributesMixin<typeof Test2>{}

        @define class Test2 extends Model {
            static attributes = {
                deep : Test,
                other : Boolean
            }
        }

        const t2 = new Test2();
        const l1 = t2.$.deep,
            l2 = t2.$.other;

        t2.deep.a = 10;

        expect( l1 !== t2.$.deep ).toBeTruthy();
        expect( l2 === t2.$.other ).toBeTruthy();
    });
});