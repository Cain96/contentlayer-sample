import { Container, Divider, HStack, Heading, Tag, Text, VStack } from "@chakra-ui/react";
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
      </Head>
      <main>
        <Container mx="auto" my="4" px="4" borderWidth="1px" borderRadius="lg" maxWidth="container.lg">
          <VStack py="4">
            <Text fontSize="sm">{post.category}</Text>
            <Heading as="h1" fontSize="2xl" fontWeight="bold">
              {post.title}
            </Heading>
            <time dateTime={post.date}>{dayjs(post.date).format("YYYY-MM-DD")}</time>
            <Text color="gray.600">{post.author}</Text>
            <HStack spacing="2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </HStack>
          </VStack>
          <Divider w="full" />
          <Container dangerouslySetInnerHTML={{ __html: post.body.html }} my="4" maxW="full"></Container>
        </Container>
      </main>
    </>
  );
};

export default Page;
