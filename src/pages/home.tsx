import { GetStaticProps } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import React from "react";
import ProductPage from "../pages/ProductPage";
import { Product } from "../types";

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return <ProductPage products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhz4y4nz2ip801ta2wxd5u5c/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
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

  const products: Product[] = data.products;

  return {
    props: {
      products,
    },
  };
};

export default Home;
