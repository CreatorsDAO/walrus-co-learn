/*
/// Module: gallery
module gallery::gallery;
*/

module gallery::gallery;

    use std::string::String;
    use sui::{
        display,
        package,
        event::{emit},
    };
    use gallery::utils::{to_b36};

    const LIBRARY_VISUALIZATION_SITE:address = @0xc74ed4dc6a2dd4659beb39396d3b10289557e0e52b0f2dddafc165dea95607cb;

    public struct State has key,store {
        id:UID,
        libraries:vector<address>
    }

    public struct BlobLibrary has key{
        id:UID,
        name:String,
        owner:address,
        b36addr:String,
        member:vector<address>,
        blobs:vector<String>
    }

    public struct GALLERY has drop {}

    const ENOT_OWNER:u64 = 0;
    const EALREADY_EXISTS:u64 = 1;

    public struct Event_LibraryAdded has copy,drop {
        id:ID,
        name:String,
        b36addr:String,
    }

    fun init(otw:GALLERY, ctx: &mut TxContext) {
        let publisher = package::claim(otw,ctx);
        let mut site_display = display::new<BlobLibrary>(&publisher,ctx);

        site_display.add(
            b"link".to_string(),
            b"https://{b36addr}.walrus.site".to_string(),
        );

        site_display.add(
            b"walrus site address".to_string(),
            LIBRARY_VISUALIZATION_SITE.to_string(),
        );        

        site_display.update_version();

        let gallery_site = State{
            id:object::new(ctx),
            libraries:vector::empty(),
        };

        transfer::public_share_object(gallery_site);
        transfer::public_transfer(publisher,ctx.sender());
        transfer::public_transfer(site_display,ctx.sender());
    }

    public entry fun create_library(state: &mut State, name:String, ctx: &mut TxContext) {
        let sender = ctx.sender();
        let id =  object::new(ctx);
        let object_address = object::uid_to_address(&id);
        let b36addr = to_b36(object_address);
        let event_id =  id.to_inner();

        let mut library = BlobLibrary{
            id:id,
            name:name,
            owner:sender,
            b36addr:b36addr,
            member:vector::empty(),
            blobs:vector::empty(),
        };

        vector::push_back(&mut library.member,sender);

        vector::push_back(&mut state.libraries,object_address);
       
        transfer::transfer(library,sender);     

        emit(Event_LibraryAdded{id:event_id,name:name,b36addr:b36addr});
        
    }

    public entry fun add_blob(library: &mut BlobLibrary, blob:String, ctx: &mut TxContext) {
        assert!(library.owner == ctx.sender(),ENOT_OWNER);
        assert!(!vector::contains(&library.blobs,&blob),EALREADY_EXISTS);
        vector::push_back(&mut library.blobs,blob);
    }

    public entry fun add_member(library: &mut BlobLibrary, member:address, ctx: &mut TxContext) {
        assert!(library.owner == ctx.sender(),ENOT_OWNER);
        vector::push_back(&mut library.member,member);
    }

    public entry fun transfer_library(library: BlobLibrary,recipient:address, ctx: &mut TxContext) {
        assert!(library.owner == ctx.sender(),ENOT_OWNER);
        transfer::transfer(library,recipient);
    }