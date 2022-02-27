import { gql, useQuery } from '@apollo/client'
import Movie from '../components/Movie'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Subtitle = styled.h3`
  font-size: 35px;
`

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`

// 여기서 apollo한테 client 단에서 추가되는 필드임을 알려주기 위해서는 @client를 붙여야 한다.
// 왜냐하면 서버에서는 movies라는 query에 대한 응답필드로 isLiked가 없기 때문이다
const GET_MOVIES = gql`
  query movies {
    movies {
      id
      medium_cover_image
      isLiked @client
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
      {data?.movies && (
        <Movies>
          {data.movies.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              bg={m.medium_cover_image}
              isLiked={m.isLiked}
            />
          ))}
        </Movies>
      )}
    </Container>
  )
}

export default Home
