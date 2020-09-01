import { useState, useEffect } from 'react'

const hola = ({ posts }) => {
    //console.log(posts)
    //console.log(value)
    const [value, setValue] = useState([])
    useEffect(() => {
        Promise.all(posts.results.map((pokemon) => {
            return new Promise(async (resolve, reject) => {
                const res = await fetch(pokemon.url)
                const pok = res.json()
                resolve(pok)
            });
        })).then(values => {
            setValue(values)
            console.log(values)
        })
    },[]);
    return (
        <div className="body">
            {
                value.length > 0 &&
                <div>
                    hola
                </div>
            }
            <div>about {posts.count}</div>
        </div>

    )
}

export async function getStaticProps() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    const posts = await res.json()
    let value

    return { props: { posts } }
}
export default hola;