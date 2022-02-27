import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 20px;
`

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
`

// query에 parameter를 전달할 때는 query의 이름을 명시해야 한다
// parameter 변수는 무조건 $ prefix와 data type을 붙여야 한다.

// 아래 query getMovie 부분이 바로 apollo를 위한 부분이고
// 여기서 전달받은 parameter를 graphql-yoga server로 전송할 query를 완성한다.
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
  }
`

function Detail() {
  const { id } = useParams()
  // useQuery에서 parameter 전달은 variables option으로 넘겨준다.

  // ApooloClient는 한번 사용한 query에 대한 응답값을 caching하기 때문에 gql server로 다시 요청을 보내지 않는다.
  // 그래서 api loading을 줄일 수 있다 -> 더 빠르게 contents를 제공할 수 있다.
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  })

  return (
    <Container>
      <Column>
        <Title>{loading ? 'Loading...' : data.movie.title}</Title>
        {!loading && data.movie && (
          // 여러 개의 컴포넌트들을 굳이 html element로 wrapping하지 않을거면 fragment(<></>)를 사용하면 된다
          // Vue에서 컴포넌트 template 내부에서 <template></template>과 동일한 기능을 한다.
          <>
            <Subtitle>
              {data.movie.language} · {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      {data && data.movie && (
        <Poster bg={data.movie.medium_cover_image}></Poster>
      )}
    </Container>
  )
}

export default Detail
