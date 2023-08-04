import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css';
import NotFound from "../assets/NotFound.jpeg"
import {
  Container,
  Heading,
  Card,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import Loader from './Loader';

const Home = ({ country, category }) => {
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopHeadings = async pageNum => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3220857c6c2544a696db27c444f69c8a&page=${pageNum}`
        );
        setNews(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 20));
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchTopHeadings(page);
  }, [page, country, category]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to truncate title to 5 words
  const truncateTitle = title => {
    if (title) {
      const words = title.split(' ');
      return words.slice(0, 4).join(' ');
    }
  };

  // Function to truncate description to 20 words
  const truncateDesc = description => {
    if (description) {
      const words = description.split(' ');
      return words.slice(0, 15).join(' ');
    }
  };

  // Function for format date
  const formatDate = (publishedAt) => {
    const date = new Date(publishedAt);
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const dateNumber = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day}, ${dateNumber} ${month} ${year}`;
  };

  return (
    <Container maxW={['container.sm', '90%']} id="home">
      <Heading as="h3" size="lg" mt={4} id="h3">
        TOP HEADLINES
      </Heading>
      <Heading as="h4" size="md" mt={4} id="h4">
        {category}
      </Heading>

      {isLoading ? (
        <Loader />
      ) : (
        <div id="div1">
          {news.map(item => (
            <Card
              maxW="300px"
              mt={'4'}
              border="1px"
              borderColor="gray.400"
              id="main-card"
              key={item.title}
            >
              <CardBody id="card-body">
                <Image
                  src={item.urlToImage ? item.urlToImage : NotFound}
                  alt={item.title}
                  borderRadius="lg"
                  w={'full'}
                  h="170px"
                  id="img"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{truncateTitle(item.title)}..</Heading>
                  <Text>{truncateDesc(item.description)}</Text>
                  <Text>By {!item.author?"unknown":item.author} on {formatDate(item.publishedAt)}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="purple">
                    <a href={item.url} target="blank">
                      Read More
                    </a>
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div id="div2">
        <Button
          colorScheme={'purple'}
          variant={'outline'}
          onClick={previousPage}
          disabled={page === 1}
          mr={1}
        >
          Previous
        </Button>

        <Button
          colorScheme={'purple'}
          onClick={nextPage}
          ml={1}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Home;
