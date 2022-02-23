import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { FC, useCallback } from "react";
import * as web3 from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import Card from "./Card";

export const SendOneLamportToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = React.useState<number>(0);
  const [imageMetadata, setImageMetadata] = React.useState<any | null>();
  const [metadata, setMetadata] = React.useState<any | null>();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const accountInfo = await connection.getAccountInfo(
      new web3.PublicKey(publicKey)
    );
    const ownedMetadata = await Metadata.findDataByOwner(connection, publicKey);
    setMetadata(ownedMetadata);

    let lamports = accountInfo?.lamports;
    if (lamports !== undefined) {
      setBalance(lamports / web3.LAMPORTS_PER_SOL);
    }
    const images = (
      await Promise.all(ownedMetadata.map(({ data }) => axios.get(data.uri)))
    ).map(({ data }) => data);
    let uniqueImages: any = [];
    images.forEach((c: any) => {
      if (uniqueImages.length === 0) {
        uniqueImages.push(c);
      } else {
        for (let i = 0; i < uniqueImages.length; i++) {
          console.log(c.symbol, uniqueImages[i].symbol);
          if (c.symbol !== uniqueImages[i]?.symbol) {
            uniqueImages.push(c);
          } else {
            break;
          }
        }
      }
      console.log(uniqueImages);
    });
    console.log(uniqueImages);
    setImageMetadata(images);
  }, [publicKey, connection]);
  let i = -1;
  return (
    <div>
      <button onClick={onClick} disabled={!publicKey}>
        Get NFTs
      </button>
      {balance !== 0 ? <p>Balance: {balance}</p> : null}
      {imageMetadata ? (
        imageMetadata.map((image: any) => {
          i = i + 1;
          return (
            <Card
              image={image.image}
              metadata={metadata[i]}
              imageMetadata={image}
            />
          );
        })
      ) : (
        <p>lol</p>
      )}
      {/* <img src={imageMetadata[1]} alt="adfd" /> */}
    </div>
  );
};
