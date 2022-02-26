import { gql, useQuery } from '@apollo/client'
import {
  Container,
  Header,
  Title,
  Subtitle,
  Loading,
  Movies,
} from '../components/styled'
import Movie from '../components/Movie'

const GET_MOVIES = gql`
  query {
    movies {
      id
      medium_cover_image
    }
  }
`

function Home() {
  const { loading, data } = useQuery(GET_MOVIES)

  return (
    <Container>
      <Header>
        <Title>Apollo 2022</Title>
        <Subtitle>GraphQL amazing</Subtitle>
      </Header>
      {loading && <Loading>Loading</Loading>}
      {data && data.movies.map((m) => <Movie key={m.id} id={m.id} />)}
    </Container>
  )
}

export default Home
