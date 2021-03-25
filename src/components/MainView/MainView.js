import React, {useState} from 'react'
import './MainView.css'
import Card from '../Card/Card'

import ReactPaginate from 'react-paginate';

export default function MainView({ pokemons, error }) {
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 18;
    const offset = currentPage * PER_PAGE;
    let num = 0

    let currentPageData = pokemons && pokemons
                            .slice(offset, offset + PER_PAGE)
                            .map((pokemon) => {
                                num++;
                                console.log(pokemon)
                                return <Card key={num} {...pokemon} />
                            });

    let pageCount = 0;
    if (pokemons) {
        pageCount = Math.ceil(pokemons.length / PER_PAGE)
    }

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    return (
        <div className="container">
            <div className="row text-center container-fluid">
                {
                error 
                    ? <h1 className="text-white">Could not find pokemon</h1>
                    : currentPageData
                }

                {!error && 
                    <div className="col-12 mt-5">
                        <ReactPaginate
                            previousLabel={<i className="fas fa-chevron-circle-left mk"></i>}
                            nextLabel={<i className="fas fa-chevron-circle-right"></i>}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />
                    </div>
                    
                    }
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