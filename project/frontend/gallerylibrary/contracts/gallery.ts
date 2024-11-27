import { suiClient } from "@/config";
import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { fromHex, isValidSuiObjectId, toHex } from "@mysten/sui/utils";



type NetworkVariables = {
    package: string;
    state: string;
}

// public struct BlobLibrary has key{
//     id:UID,
//     name:String,
//     owner:address,
//     b36addr:String,
//     member:vector<address>,
//     blobs:vector<String>
// }

export type Library = {
    id: {id: string};
    name: string;
    b36addr: string;
    owner: string;
    blobs: string[];
    member: string[];
}

//public entry fun create_library(state: &mut State, name:String, ctx: &mut TxContext)
export const createLibrary = async (networkVariables: NetworkVariables, name: string) => {
    const tx = new Transaction();
    tx.moveCall(
        {
            package: networkVariables.package,
            module: "gallery",
            function: "create_library",
            arguments: [
                tx.object(networkVariables.state),
                tx.pure(bcs.string().serialize(name).toBytes())
            ]
        }
    )
    return tx;
}

export const getLibraries = async (address: string) => {
    if(!isValidSuiObjectId(address)) throw new Error("Invalid address");
    const state = await suiClient.getObject({
        id: address,
        options: {
            showContent: true
        }
    })
    const libraries = state.data?.content as {
        dataType: string;
        fields?: {
            id: {id: string};
            libraries: string[];
        };
    };
    if(!libraries.fields?.libraries){
        return [];
    }
    const libraries_objects = await suiClient.multiGetObjects({
        ids: libraries.fields?.libraries,
        options: {
            showContent: true
        }
    });
    const libraries_result: Library[] = libraries_objects.map((library) => {
        if (!library.data?.content) {
            throw new Error("Library content not found");
        }
        const library_detail = library.data.content as unknown as {
            dataType: string;
            fields: {
                id: {id: string};
                name: string;
                b36addr: string;
                owner: string;
                blobs: string[];
                member: string[];
            }
        };
        return {
            id: library_detail.fields?.id,
            name: library_detail.fields?.name,
            b36addr: library_detail.fields?.b36addr,
            owner: library_detail.fields?.owner,
            blobs: library_detail.fields?.blobs,
            member: library_detail.fields?.member,
        }
    });
    return libraries_result;
}

export const getLibrary = async (address: string) => {
    if(!isValidSuiObjectId(address)) throw new Error("Invalid address");
    const library = await suiClient.getObject({
        id: address,
        options: {
            showContent: true
        }
    })
    const library_detail = library.data?.content as unknown as {
        dataType: string;
        fields: Library;
    };
    return library_detail.fields;
}

//public entry fun add_blob(library: &mut BlobLibrary, blob:String, ctx: &mut TxContext)
export const addBlob = async (networkVariables: NetworkVariables, library: string, blob: string) => {
    const tx = new Transaction();
    if(!isValidSuiObjectId(library)) throw new Error("Invalid library address");
    tx.moveCall(
        {
            package: networkVariables.package,
            module: "gallery",
            function: "add_blob",
            arguments: [
                tx.object(library),
                tx.pure(bcs.string().serialize(blob).toBytes())
            ]
        }
    )
    return tx;
}
//public entry fun add_member(library: &mut BlobLibrary, member:address, ctx: &mut TxContext)
export const addMember = async (networkVariables: NetworkVariables, library: string, member: string) => {
    if(!isValidSuiObjectId(library)) throw new Error("Invalid library address");
    const tx = new Transaction();
    tx.moveCall(
        {
            package: networkVariables.package,
            module: "gallery",
            function: "add_member",
            arguments: [
                tx.object(library), 
                tx.pure(Address.serialize(member).toBytes())
            ]
        }
    )
    return tx;
}

const Address = bcs.bytes(32).transform({
	// To change the input type, you need to provide a type definition for the input
	input: (val: string) => fromHex(val),
	output: (val) => toHex(val),
});

