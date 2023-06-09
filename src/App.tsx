import { useQuery } from '@tanstack/react-query'
import GuessGame from './components/GuessGame/GuessGame'
import PokemonList from './components/PokemonList/PokemonList'
import RandomPokemon from './components/RandomPokemon/RandomPokemon'

export interface IPokemon {
  name: string
  url: string
}

function App() {
  // Access the client
  // const queryClient = useQueryClient()

  // Queries
  const { data: pokemonData, status } = useQuery({
    queryKey: ['pokemon'],
    queryFn: getPokemon,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  function getPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then((res) => res.json())

    //   {
    //     "count": 1281,
    //     "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    //     "previous": null,
    //     "results": [
    //         {
    //             "name": "bulbasaur",
    //             "url": "https://pokeapi.co/api/v2/pokemon/1/"
    //         },
    //         {
    //             "name": "ivysaur",
    //             "url": "https://pokeapi.co/api/v2/pokemon/2/"
    //         },
    // }
    // return data
    // })
  }

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postPokemon,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['pokemon'] })
  //   },
  // })

  // <button
  // onClick={() => {
  // mutation.mutate({
  //   id: Date.now(),
  //   title: 'Do Laundry',
  // })
  //   }}
  // >
  //   Add Todo
  // </button>

  // console.log('pokemonData', pokemonData)

  if (status === 'error') {
    return <h1>Error</h1>
  }

  if (!pokemonData) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className='my-8'>
        <img
          src='./pokemon-logo.png'
          alt='Pokemon'
          className='h-32 mx-auto object-contain'
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-4 relative p-2'>
        <GuessGame pokemonData={pokemonData.results} />
        <div className='flex gap-16 justify-center flex-wrap'>
          <RandomPokemon pokemonData={pokemonData.results} />
          <PokemonList pokemonData={pokemonData.results} />
        </div>
      </div>
    </>
  )
}

export default App
