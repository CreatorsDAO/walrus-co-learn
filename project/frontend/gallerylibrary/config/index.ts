import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

type Network = "mainnet" | "testnet" ;

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            package: "0xf671e77cd68eabb1922fc02f819e74119a826645656cb1da0cf53e5cf0afc1c9",
            state: "0x964df793dafe1a583a49630f10113c275fe16eef5e0542b0c5ba92a8a79336bf",
        },
    },
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            package: "0xf671e77cd68eabb1922fc02f819e74119a826645656cb1da0cf53e5cf0afc1c9",
            state: "0x964df793dafe1a583a49630f10113c275fe16eef5e0542b0c5ba92a8a79336bf",
        },
    }
});

// 创建全局 SuiClient 实例
const suiClient = new SuiClient({ url: networkConfig[network].url });

export { useNetworkVariable, useNetworkVariables, networkConfig, network, suiClient };
