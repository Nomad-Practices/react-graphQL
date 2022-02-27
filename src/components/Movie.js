import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`

const TOGGLE_MOVIE = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) @client
  }
`
function Movie({ id, bg, isLiked }) {
  const [toggleLike] = useMutation(TOGGLE_MOVIE, {
    variables: {
      id: +id,
    },
  })
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
    </Container>
  )
}

export default Movie
