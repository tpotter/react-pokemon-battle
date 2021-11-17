const solana = require('@solana/web3.js');
const buffer = require('buffer');
const metaplex = require('@metaplex/js')
//import { PublicKey, Connection, AccountInfo, GetProgramAccountsConfig, GetProgramAccountsFilter, MemcmpFilter } from '@solana/web3.js'

let connection = new solana.Connection("https://api.devnet.solana.com");
const METADATA_PUBKEY = new solana.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
try {
    getNFTs().then(nfts => {console.log(nfts)});
}
catch (e) {
    console.log(e);
}

async function getNFTs() {
    // connection.getProgramAccounts(new solana.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), {
    //     filters: [{dataSize: 165}, { memcmp: { offset: 32, bytes: "3HxqsUguP6E7CNqjvpEAnJ8v86qbyJgWvN2idAKygLdD" } }]
    const accounts = await connection.getParsedTokenAccountsByOwner(new solana.PublicKey("3HxqsUguP6E7CNqjvpEAnJ8v86qbyJgWvN2idAKygLdD"), { programId: new solana.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
    )

    let tokens = [];
    accounts.value.forEach(account => {
        if (account.account.data.parsed.info.tokenAmount.uiAmount == 1 && account.account.data.parsed.info.tokenAmount.decimals == 0) {
            //console.log(account.account.data.parsed.info.mint);
            tokens.push(account.account.data.parsed.info.mint);
        }
    });

    console.log(tokens);

    let metadataAccountss = [];
    for (const token of tokens) {
        [pda, bump] = await solana.PublicKey.findProgramAddress([
            Buffer.from("metadata"),
            METADATA_PUBKEY.toBuffer(),
            new solana.PublicKey(token).toBuffer(),
        ], METADATA_PUBKEY);
        metadataAccountss.push(pda.toString());
    }

    console.log(metadataAccountss);

    let metadatas = []
    for (const metadataAccount of metadataAccountss) {
        try {
            //console.log(metadataAccount);
            let metadata = await metaplex.programs.metadata.Metadata.load(connection, metadataAccount)
            //console.log(metadata.data.updateAuthority);
            //console.log(metadata.data.data.name);
            if (metadata.data.updateAuthority == '3HxqsUguP6E7CNqjvpEAnJ8v86qbyJgWvN2idAKygLdD' && metadata.data.data.name.includes('Test Dinosol')) {
                //console.log(metadata);
                metadatas.push(metadata);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return metadatas;
}