/*
/// Module: walruscolearn
module walruscolearn::walruscolearn;
*/
module walruscolearn::projects;

use std::string::String;
use sui::{
    table::{Self,Table},
    vec_set::{Self,VecSet},
    event::{emit},
};

    const EALREADY_EXISTS:u64 = 0;
    const ENOT_FOUND:u64 = 1;

    public struct State has key,store {
        id:UID,
        projects:Table<address,ID>,
        votes:Table<ID,VecSet<address>>,
    }

    public struct Project has key,store{
        id:UID,
        name:String,
        description:String,
        url:String,
    }

    public struct AdminCap has key,store {
        id:UID,
    }

    fun init(ctx: &mut TxContext) {
        let sender = ctx.sender();
        let state = State{
            id:object::new(ctx),
            projects:table::new(ctx),
            votes:table::new(ctx),
        };

        let admin_cap = AdminCap{
            id:object::new(ctx),
        };

        transfer::public_share_object(state);
        transfer::public_transfer(admin_cap,sender);
    }

    public entry fun create_project(state: &mut State, name:String, description:String, url:String, ctx: &mut TxContext) {
        let sender = ctx.sender();
        assert!(!table::contains(&state.projects,sender),EALREADY_EXISTS);
        let project = Project{
            id:object::new(ctx),
            name,
            description,
            url,
        };

        let project_id = project.id.to_inner();
        state.votes.add(project_id,vec_set::empty());
        table::add(&mut state.projects,sender,project_id);
        transfer::public_transfer(project,sender);
    }

    public fun edit_project(project: &mut Project, name:String, description:String, url:String) {       
        project.name = name;
        project.description = description;
        project.url = url;
    }

    public fun delete_project(_: &AdminCap, state: &mut State, project: Project, ctx: &mut TxContext) {
        assert!(table::contains(&state.projects,ctx.sender()),ENOT_FOUND);       
        let Project {id,name:_,description:_,url:_} = project;
        table::remove(&mut state.projects,ctx.sender());
        object::delete(id);
    }

    public fun vote(state: &mut State, project:&Project, ctx: &mut TxContext) {
        let sender = ctx.sender();
        assert!(table::contains(&state.projects,sender),ENOT_FOUND);
        vec_set::insert(&mut state.votes[project.id.to_inner()],sender);
    }

    public fun unvote(state: &mut State, project:&Project, ctx: &mut TxContext) {
        let sender = ctx.sender();
        assert!(vec_set::contains(&state.votes[project.id.to_inner()],&sender),ENOT_FOUND);
        vec_set::remove(&mut state.votes[project.id.to_inner()],&sender);
    }


