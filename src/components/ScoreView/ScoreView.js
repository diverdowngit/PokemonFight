import React, {useState, useEffect } from 'react'
import { getApiData } from '../../api'
import { Table } from 'react-bootstrap';
import VertBar from '../VertBar/VertBar';
import spinner from '../../images/spinner.gif'
import './ScoreView.css'

const ScoreView = () => {

    // const userUrl = 'https://poke-express-api.herokuapp.com/api/v1/user'
    const scoreUrl = 'https://poke-express-api.herokuapp.com/api/v1/score/6050dd4f3146d8ebba7cd373'

    // const [users, setUsers] = useState([]);
    const [ownScores, setOwnScore] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // useEffect(() => {
    //       getApiData(userUrl)
    //       .then(result => {
    //             setUsers(result)
    //       })
    //       .catch(e => setError(true))
    //   }, []);

    useEffect(() => {
        getApiData(scoreUrl)
        .then(result => {
            setOwnScore(result)
            setLoading(false)
        })
        .catch(e => setError(true))
    }, []);

    if (loading) {
        return (
          <div>
            <img src={spinner} alt="spinner" className="spinner"/>
          </div>
        )
    }

    if (error) {
        return (
            <div className="bg-danger">
                <h2>Error occurred</h2>
            </div>
        )
    }
    
    ownScores && console.log(ownScores)

    if (ownScores) {
        return (
            <div className="container">
                <VertBar />

                <h3 className="text-white text-center">Own Scores</h3>
                <Table striped bordered hover variant="light" responsive size="md" rounded>
                    <thead>
                        <tr>
                            <th>own pokemon</th>
                            <th>opponent pokemon</th>
                            <th># Won</th>
                        </tr>
                    </thead>
                    <tbody>

                    {ownScores.map(score => {
                        return (
                            <tr key={score._id}>
                                <td>{score.user_pokemon}</td>
                                <td>{score.opponent_pokemon}</td>
                                <td>{score.user_wins === true 
                                        ? <span className="won">Won</span> 
                                        : <span className="lost">Lost</span> }
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>

                <hr />

                {/* <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th># Won</th>
                        </tr>
                    </thead>
                    <tbody>

                    {users.map(user => {
                        return (
                            <tr>
                                <td>1</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>12</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table> */}
            </div>
        )
    }
    
}

export default ScoreView
