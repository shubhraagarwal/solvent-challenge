import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { FC, useCallback } from "react";
import * as web3 from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";

export const SendOneLamportToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = React.useState<number>(0);
  const [imageMetadata, setImageMetadata] = React.useState<any | null>();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    // const transaction = new Transaction().add(
    //   SystemProgram.transfer({
    //     fromPubkey: publicKey,
    //     toPubkey: Keypair.generate().publicKey,
    //     lamports: 1,
    //   })
    // );
    const accountInfo = await connection.getAccountInfo(
      new web3.PublicKey(publicKey)
    );
    const ownedMetadata = await Metadata.findDataByOwner(connection, publicKey);
    console.log(ownedMetadata);
    // let temp: any = [];

    //   await Promise.all(ownedMetadata.map(({ data }) => axios.get(data.uri))).map(({ data }) => {
    //   temp.push(data);
    // });
    // setImageMetadata(images);

    let lamports = accountInfo?.lamports;
    if (lamports !== undefined) {
      setBalance(lamports / web3.LAMPORTS_PER_SOL);
    }
    const images = (
      await Promise.all(ownedMetadata.map(({ data }) => axios.get(data.uri)))
    ).map(({ data }) => data);
    let uniqueImages: any = [];
    images.forEach((c: any) => {
      //   if (!uniqueImages.includes(c.symbol)) {
      //     uniqueImages.push(c);
      //   }
      console.log(c);
      if (Object.values(uniqueImages).includes(c.symbol)) {
        console.log(Object.values(uniqueImages).includes(c.symbol));
        console.log("already exists");
      } else {
        uniqueImages.push(c);
        console.log(uniqueImages);
      }
    });

    setImageMetadata(uniqueImages);

    console.log(uniqueImages);
    // const signature = await sendTransaction(transaction, connection);

    // await connection.confirmTransaction(signature, "processed");
  }, [publicKey, sendTransaction, connection]);

  return (
    <div>
      <button onClick={onClick} disabled={!publicKey}>
        Send 1 lamport to a random address!
      </button>
      {balance !== 0 ? <p>Balance: {balance}</p> : null}
      {imageMetadata ? (
        imageMetadata.map((image: any) => <img src={image} alt="adfd" />)
      ) : (
        <p>lol</p>
      )}
      {/* <img src={imageMetadata[1]} alt="adfd" /> */}
    </div>
  );
};
