import { Box, Container, HStack, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { Post, allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

type Props = {
  tag: string;
  posts: Post[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...new Set(allPosts.flatMap((post) => post.tags))].map((tag) => `/tags/${tag}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tag = (params?.slug ?? "") as string;
  const posts = allPosts.filter((post) => post.tags.includes(tag));
  return {
    props: {
      tag,
      posts,
    },
  };
};

const Page: NextPage<Props> = ({ tag, posts }) => {
  if (posts.length === 0) throw new Error("Post Not Found");

  return (
    <>
      <Head>
        <title>タグ {tag} の一覧</title>
      </Head>
      <main>
        <Container mx="auto" my="4" px="4" maxWidth="container.lg">
          <VStack py="4" spacing="4">
            {posts.map((post) => (
              <Box key={post._id} border="1px" borderColor="gray" borderRadius="lg" p="4" w="full">
                <NextLink href={post.url} passHref>
                  <Link>
                    <Heading as="h3" fontSize="2xl" fontWeight="bold">
                      {post.title}
                    </Heading>
                    <HStack pt="2" justify="space-between">
                      <Text color="gray.600">{post.author}</Text>
                      <time dateTime={post.date}>{dayjs(post.date).format("YYYY-MM-DD")}</time>
                    </HStack>
                  </Link>
                </NextLink>
              </Box>
            ))}
          </VStack>
        </Container>
      </main>
    </>
  );
};

export default Page;
