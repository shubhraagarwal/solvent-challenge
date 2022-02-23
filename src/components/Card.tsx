import React from "react";
import { Link } from "react-router-dom";
import Store from "../Store";
type Props = {
  image: string;
  metadata: any;
  imageMetadata: any;
};

const Card = (props: Props) => {
  return (
    <div>
      <img src={props.image} alt="" height={500} width={500} />
      <Link
        to="/details"
        onClick={() => {
          Store.setMetaData(props.metadata);
          Store.setImage(props.image);
          Store.setImageMetaData(props.imageMetadata);
        }}
      >
        <button>More Details</button>
      </Link>
    </div>
  );
};

export default Card;
