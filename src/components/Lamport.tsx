import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useCallback } from "react";
import * as web3 from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import Card from "./Card";

export const SendOneLamportToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
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
    // Get the values of the attributes.
    const imageObjectValues = Object.values(images);

    // Filter out all the duplicate symbol images in the `images` array.
    const uniqueImages = imageObjectValues.filter(
      (image, index, self) =>
        index === self.findIndex((t) => t.symbol === image.symbol)
    );

    setImageMetadata(uniqueImages);
  }, [publicKey, connection]);
  let i = -1;
  return (
    <div>
      <button onClick={onClick} disabled={!publicKey}>
        Get NFTs
      </button>
      {balance !== 0 ? <p>Balance: {balance}</p> : null}
      {imageMetadata
        ? imageMetadata.map((image: any) => {
            i = i + 1;
            return (
              <Card
                image={image.image}
                metadata={metadata[i]}
                imageMetadata={image}
              />
            );
          })
        : null}
      {/* <img src={imageMetadata[1]} alt="adfd" /> */}
    </div>
  );
};
