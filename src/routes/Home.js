import { gql, useQuery } from '@apollo/client'

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
    }
  }
`

function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES)
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (data && data.movies) {
    return data.movies.map((m) => <h3 key={m.id}>{m.title}</h3>)
  }
}

export default Home
