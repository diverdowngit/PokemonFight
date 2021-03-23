import React, {useState} from 'react'
import './MainView.css'
import Card from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar'

import ReactPaginate from 'react-paginate';

export default function MainView({ pokemons }) {
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 18;
    const offset = currentPage * PER_PAGE;
    let num = 0

    const currentPageData = pokemons && pokemons
        .slice(offset, offset + PER_PAGE)
        .map((pokemon) => {
            num++;
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
                    <SearchBar />

            <div className="row text-center container-fluid">
                {currentPageData}
            </div>
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