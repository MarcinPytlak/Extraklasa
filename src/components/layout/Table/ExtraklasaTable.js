import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import styles from './ExtraklasaTable.module.scss';

function ExtraklasaTable(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    fetch('https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=rs86utpab8axq6fkedt5yubf')
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.schedules);
          //setCompetitors(result.schedules.map(item => item.sport_event));
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const isResult = (home, away) => {
    return home>=0 && away>= 0 
      ? 
      home + ':' + away 
      : 
      'postponed due to COVID';
  };

  const isWinner =( team, tie, winner) =>{
    if(tie){
      return styles.draw;
    }
    return team === winner 
      ? 
      styles.winner 
      : 
      styles.looser;
  };

  const breakScore = (it) => {
    if(it.status === 'closed'){
      return it.period_scores[0].home_score + ' : ' + it.period_scores[0].away_score;
    } else {
      return 'postponed';
    }
  };
  var count = 1;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(items);
    return (
      <div className={styles.container}>
        <Table striped bordered hover>
          <thead>
            <tr className={styles.headings}>
              <th>Match</th>
              <th>Host</th>
              <th>Guest</th>
              <th>Final results</th>
              <th>Match date</th>
              <th>Half-Time score</th>
              <th>Stadium Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => 
              <tr key={item.id} className={styles.rows}>
            
                <td>{count++}</td>
                <td className={isWinner(item.sport_event.competitors[0].id, item.sport_event_status.match_tie, item.sport_event_status.winner_id)}>{item.sport_event.competitors[0].name}</td>
                <td className={isWinner(item.sport_event.competitors[1].id, item.sport_event_status.match_tie, item.sport_event_status.winner_id)}>{item.sport_event.competitors[1].name}</td>
                <td>{isResult(item.sport_event_status.home_score ,item.sport_event_status.away_score)}</td>
                <td>{item.sport_event.start_time.substr(0,10)}</td>
                <td>{breakScore(item.sport_event_status)}</td>
                <td>{item.sport_event.venue.name}</td>
              </tr>
            )}
          
          </tbody>
        </Table>
      </div>  
    );
  }
}

export default ExtraklasaTable;