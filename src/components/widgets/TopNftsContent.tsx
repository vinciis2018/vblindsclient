import useInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect, useState } from "react";
import { StringParam, withQueryParams } from "use-query-params";
// api
import { useNfts } from "api/hooks";
// ui
import { Alert, AlertIcon, AlertTitle, AlertDescription, Button, Center, Spinner } from "@chakra-ui/react";
import { RenderNftsList } from "components/widgets";
import { refreshPage } from "services/utils";

const TopNftsContent = ({ query }: any) => {
  /*  */
  const { t: timeframe } = query;
  /* Get nfts based on the timeframe */
  const { data: nfts, isLoading, isError } = useNfts({ timeframe });

  /* Pagination */
  const [nftsView, setNftsView] = useState(nfts?.slice?.(0, 12));
  const [page, setPage] = useState(0);
  /* Get 12 more every scroll */
  useEffect(() => {
    setNftsView(nfts?.slice?.(0, page === 0 ? 12 : page * 12));
  }, [nfts, page]);
  /* Reset page index when changing timeframe */
  useEffect(() => {
    setPage(0);
  }, [timeframe]);

  const hasMore = nftsView?.length !== nfts?.length;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: () => {
      setPage(page => page + 1);
    },
    disabled: isError || isLoading,
    rootMargin: "0px 0px 0px 0px"
  });

  /* on Error */
  if (isError) {
    return (
      <Center>
        <Alert status="error" variant="left-accent" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Oops! Something went wrong
          </AlertTitle>
          <AlertDescription maxWidth="sm" mb="2">
            We are working to fix it.
          </AlertDescription>
          <Button onClick={refreshPage}>Try again</Button>
        </Alert>
      </Center>
    );
  }
  return (
    <>
      {isLoading && (
        <Center w="100%" minH={{ base: "300px", md: "600px" }}>
          <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
        </Center>
      )}
      {/* Loading | Nfts */}
      {!isLoading && <RenderNftsList nfts={nftsView} />}
      {!isLoading && hasMore && <div ref={sentryRef} />}
    </>
  );
};

export default withQueryParams(
  {
    t: StringParam
  },
  TopNftsContent
);
