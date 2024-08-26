import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then((response) => {
        console.log(response.data); 
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div>
      <h1>Next.js/Node.js app</h1>
      
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

