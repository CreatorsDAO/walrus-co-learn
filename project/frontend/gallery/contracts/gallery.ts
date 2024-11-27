import { suiClient } from "@/config";
import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { isValidSuiObjectId } from "@mysten/sui/utils";



type NetworkVariables = {
    package: string;
    state: string;
}

export type Library = {
    id: {id: string};
    name: string;
    b36addr: string;
    owner: string;
    blobs: string[];
    members: string[];
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
            members: library_detail.fields?.member,
        }
    });
    return libraries_result;
}
