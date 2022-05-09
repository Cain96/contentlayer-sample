import { Container, Divider, HStack, Text } from "@chakra-ui/react";
import { Post, allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

type PostProps = {
  post: Post | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params?.slug) ?? null;
  return {
    props: {
      post,
    },
  };
};

const Page: NextPage<PostProps> = ({ post }) => {
  if (post == null) throw new Error("Post Not Found");

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <main>
          <Container mx="auto" my="4" p="4" border="1" borderRadius="lg" maxWidth="720px">
            <HStack justify="space-between">
              <Text as="h1" fontSize="lg" fontWeight="bold">
                {post.title}
              </Text>
              g<time dateTime={post.date}>{dayjs(post.date).format("YYYY/MM/DD")}</time>
            </HStack>
            <Divider w="full" />
            <Text dangerouslySetInnerHTML={{ __html: post.body.html }} />
          </Container>
        </main>
      </Head>
    </>
  );
};

export default Page;
