import { ApolloClient, InMemoryCache } from '@apollo/client'

// client 단에서 cache를 추가하거나 cache에 있는 데이터를 수정할 때는 resolvers를 이용한다.
// 아래와 같이 작성하면 서버에는 없는 응답필드인 isLiked가 client 단에서 Movie 데이터에 추가한다.
// 그리고 Mutation
const client = new ApolloClient({
  uri: 'https://movieql2.vercel.app/',
  // uri: 'http://localhost:4000/graphql'
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    // 컴포넌트에서 parameter와 함께 toggleLike mutation을 수행하면
    // 먼저 cache에서 parameter로 전달한 id와 동일한 id를 가진 Movie 타입의 데이터를 먼저 찾고
    // 해당 데이터의 isLiked field의 값을 바꿀 것이다.

    // 단, 두 컴포넌트가 서로 다른 query로 동일한 타입의 데이터를 cache에 저장했을 때, 동일한 id를 가진 데이터는
    // 두 컴포넌트에서 사용할 수 있도록 field가 확장된다.
    // => 따라서 caching될 응답 데이터는 반드시 동일한 규칙을 따르는 id가 있어야 공유할 수 있게된다.

    // 여기서 알 수 있는 점은 apollo는 query, mutation 개별적으로가 아닌 (데이터 타입 + cacheID) 단위로 caching한다는 점을 알 수 있다.
    // 그래야 query, mutation 과정에서 데이터 공유가 용이해지기 때문이다.
    Mutation: {
      toggleLike: (_, { id }, { cache }) => {
        const newMovie = {
          __typename: 'Movie',
          id,
        }
        cache.modify({
          id: cache.identify(newMovie),
          fields: {
            isLiked: (prev) => !prev,
          },
        })
      },
    },
  },
})

export default client
