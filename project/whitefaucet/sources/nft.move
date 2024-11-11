module whitefaucet::nft{
    use std::string::String;
    use sui::{
        package,
        display,
    };

    public struct BlackList has key, store{
        id: UID,
        list: vector<ID>,
    }

    public struct NFT has drop{}

    public struct AdminCap has key, store{
        id: UID,
    }

    public struct Member has key, store{
        id: UID, 
        name: String,
        image_url: String,
        link: String,
        points: u64,
        last_claim: u64,
    }

    fun init(otw:NFT,ctx:&mut TxContext){
        let deployer = ctx.sender();
        
        let blackList = BlackList{id: object::new(ctx), list: vector::empty<ID>()};

        let adminCap = AdminCap{id: object::new(ctx)};
        
        let keys = vector[
            b"name".to_string(),
            b"image_url".to_string(),
            b"link".to_string(),
        ];
        let mut image_url:vector<u8> = b"https://example.com/nft.png";
        image_url.append(b"{id}");
        let link:vector<u8> = b"https://example.com";

        let values = vector[
            b"{name}".to_string(),
            image_url.to_string(),
            link.to_string(),
        ];

         
        let publisher = package::claim(otw,ctx);
        let mut nft_display = display::new_with_fields<Member>(
            &publisher,
            keys,
            values,
            ctx);

        nft_display.update_version();

        transfer::public_transfer(publisher,deployer);
        transfer::public_transfer(adminCap,deployer);
        transfer::public_transfer(nft_display,deployer);
        transfer::public_share_object(blackList);
    }

    public(package) fun add_points(
        member: &mut Member,
        points:u64){
            member.points = member.points + points;
    }

    public fun add_member(
        _admin: &AdminCap,
        recipient:address,
        name:String,
        image_url:String,
        link:String,
        points: u64,
        last_claim: u64,
        ctx:&mut TxContext){
            let member = Member{id: object::new(ctx), name: name, image_url: image_url, link: link, points: points, last_claim: last_claim};
            transfer::public_transfer(member,recipient);
    }

    public fun check_if_valid_member(
        member: &Member,
        blackList: &BlackList,
    ):bool{
        let valid = !vector::contains(&blackList.list, &member.id.to_inner());
        valid
    }

    public entry fun add_to_black_list(
        _admin: &AdminCap,
        blackList: &mut BlackList,
        member: &Member){
            let blackList = &mut blackList.list;
            if(!vector::contains(blackList,&member.id.to_inner())){
                vector::push_back(blackList,member.id.to_inner());
            }
    }

    public entry fun remove_from_black_list(
        _admin: &AdminCap,
        blackList: &mut BlackList,
        member: &Member){
            let blackList = &mut blackList.list;
            if(vector::contains(blackList,&member.id.to_inner())){
                vector::pop_back(blackList);
            }
    }

    public fun get_last_claim(
        member: &Member,
    ):u64{
        member.last_claim
    }

    public(package) fun set_last_claim(
        member: &mut Member,
        last_claim: u64,
    ){
        member.last_claim = last_claim;
    }

}