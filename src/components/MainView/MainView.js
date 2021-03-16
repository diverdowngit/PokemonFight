import React from 'react'
import './MainView.css'
import Card from '../Card/Card'
import ReactPaginate from 'react-paginate';

export default function MainView({ pokemons }) {
    let num = 0
    console.log(pokemons)

    return (
        <div className="container">
            <div className="row text-center container-fluid">
                {pokemons.map((pokemon) => {
                    num++;
                    return <Card key={num} {...pokemon} />
                })}
                
            </div>
        </div>
    )
}



// <Card style={{ width: '18rem' }}>
// <Card.Img variant="top" src={pokemon.sprites.front_default} />
// <Card.Body>
//     <Card.Title>{pokemon.name}</Card.Title>
//     <Link to={`/${pokemon.id}`} >
//         <Button variant="primary">Open</Button>
//     </Link>
// </Card.Body>
// </Card>