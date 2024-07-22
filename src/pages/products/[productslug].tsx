import { GetStaticPaths, GetStaticProps } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

interface Product {
  id: string;
  name: string;
  price: number;
  description: {
    html: string;
  };
  image: {
    url: string;
  };
}

interface Params extends ParsedUrlQuery {
  productslug: string;
}

interface ProductProps {
  product: Product;
}

const SingleProduct = ({ product }: ProductProps) => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <div className="relative md:w-1/2 h-96 p-4">
        <Image
          src={product?.image.url}
          layout="fill"
          objectFit="cover"
          alt={product.name}
          className="rounded"
        />
      </div>
      <div className="md:w-1/2 p-4">
        <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
        <p className="text-xl text-gray-800 mb-4">${product.price}</p>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description.html }}
        ></div>
        <button className="btn bg-blue-500 text-white py-2 px-4 mt-4 rounded">
          Add to cart 🛒
        </button>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhz4y4nz2ip801ta2wxd5u5c/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query ProductsQuery {
        products {
          slug
        }
      }
    `,
  });

  const paths = data.data.products.map((singleProduct: { slug: string }) => ({
    params: { productslug: singleProduct.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = new ApolloClient({
    uri: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhz4y4nz2ip801ta2wxd5u5c/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query MyQuery($slug: String!) {
        product(where: { slug: $slug }) {
          id
          name
          price
          description {
            html
          }
          image {
            url
          }
        }
      }
    `,
    variables: { slug: params?.productslug },
  });

  const product: Product = data.data.product;
  return {
    props: { product },
  };
};

export default SingleProduct;
