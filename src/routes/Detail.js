import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Loading } from '../components/styled'

// query에 parameter를 전달할 때는 query의 이름을 명시해야 한다
// parameter 변수는 무조건 $ prefix와 data type을 붙여야 한다.

// 아래 query getMovie 부분이 바로 apollo를 위한 부분이고
// 여기서 전달받은 parameter를 graphql-yoga server로 전송할 query를 완성한다.
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`

function Detail() {
  const { id } = useParams()
  // useQuery에서 parameter 전달은 variables option으로 넘겨준다.
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  })

  if (loading) {
    return <Loading>Loading...</Loading>
  }
  if (data && data.movie) {
    return <h1>{data.movie.title}</h1>
  }
}

export default Detail
