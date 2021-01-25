import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');
  const tableStyle = {
    'border': '1px solid black'
  }
  const minuteInMisc = 60000;
  const myKey = '0ac0e7e967';
  const baseUrl = 'https://www.live-rates.com/rates';

  useEffect(() => {
    if (!data) getData();

    const updateData = setInterval(() => {
      getData();
    }, minuteInMisc);

    return () => clearInterval(updateData);
  }, [])

  const getData = () => {
    axios.get(`${baseUrl}`, { params: { key: myKey } })
      .then(response => response.data)
      .then(result => setData(result));
  }

  const renderTableData = () => {
    const headersOb = data[0]
    const headers = Object.keys(headersOb);
    return data.map((item, index) => {
      return (
        <tr key={index}>
          {headers.map((header, i) => {
            return (<td key={i} style={tableStyle}>{item[`${header}`]}</td>)
          })}
        </tr>
      )
    })
  }

  const renderTableHeader = () => {
    const headersOb = data[0]
    const headers = Object.keys(headersOb);
    return headers.map((header, index) => {
      return <th style={tableStyle} key={index}>{header.toUpperCase()}</th>
    })
  }

  return (
    <div className="App">
      {data ?
        (<table id='trades' style={tableStyle}>
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>)
        : ''}
    </div>
  );
}

export default App;
