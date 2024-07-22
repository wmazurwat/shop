import Head from "next/head";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: {
    url: string;
  };
}

interface HomeProps {
  allProducts: Product[];
}

const Home = ({ allProducts }: HomeProps) => {
  // console.log("allProducts", allProducts);
  return (
    <>
      <Head>
        <title>Plants | Home</title>
      </Head>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold my-8">
          All Products <span>🌿</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <Link href={`products/${product.slug}`}>
                <div className="block relative h-48 w-full">
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </Link>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg">${product.price}</p>
                <button className="btn bg-blue-500 text-white py-2 px-4 mt-2 rounded">
                  Add to cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
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
  const allProducts: Product[] = data.data.products;
  return {
    props: {
      allProducts,
    },
  };
}
