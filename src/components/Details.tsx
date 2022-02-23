import React from "react";
import Store from "../Store";
type Props = {};

const Details = (props: Props) => {
  console.log(Store.image, Store.imageMetaData, Store.metaData);
  let url: string = Store.image;
  //   let name: string = Store.imageMetaData?.name;
  return (
    <div>
      <h1>Details</h1>
      {url && <img src={url} alt="" height={500} width={500} />}
      <p>Name: {Store.imageMetaData.name}</p>
      <p>Description: {Store.imageMetaData.description}</p>
      <p>Mint Address : {Store.metaData.mint}</p>

      <table>
        <tr>
          <th>Trait Type</th>
          <th>value</th>
        </tr>
        {Store.imageMetaData.attributes.length > 1 ? (
          Store.imageMetaData.attributes.map((data: any) => (
            <tr>
              <td>{data.trait_type}</td>
              <td>{data.value}</td>
            </tr>
          ))
        ) : (
          <div>Attribute data not found</div>
        )}
      </table>
    </div>
  );
};

export default Details;
