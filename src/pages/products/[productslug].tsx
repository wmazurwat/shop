// pages/products/[productslug].js

import Head from "next/head";
import styles from "../../styles/SingleProduct.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

const singleproduct = ({ product }) => {
  console.log(product.image);
  return (
    <div className="container single-container">
      <div className="left-section">
        <Image src={product.image.url} width={300} height={700} alt="" />
      </div>
      <div className="right-section">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: product.description.html,
          }}
        ></div>
        <a className="btn">Add to cart 🛒</a>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhz4y4nz2ip801ta2wxd5u5c/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query ProductsQuery {
        products {
          id
          name
          slug
          price
          image {
            url
          }
        }
      }
    `,
  });

  const paths = data.data.products.map((singleProduct) => {
    return {
      params: {
        productslug: singleProduct.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhz4y4nz2ip801ta2wxd5u5c/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query MyQuery($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          price
          slug
          description {
            html
          }
          image {
            url
          }
        }
      }
    `,
    variables: {
      slug: params.productslug,
    },
  });

  const product = data.data.product;
  return {
    props: {
      product,
    },
  };
}
export default singleproduct;
