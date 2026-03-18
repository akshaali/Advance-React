import { useState } from 'react';
import './App.css';
import FileExplorer from './features/FileExplorer/index';
const initialData = [
    {
      id: 1,
      name: 'README.md',
    },
    {
      id: 2,
      name: 'Documents',
      children: [
        {
          id: 3,
          name: 'Word.doc',
        },
        {
          id: 4,
          name: 'Powerpoint.ppt',
        },
      ],
    },
    {
      id: 5,
      name: 'Downloads',
      children: [
        {
          id: 6,
          name: 'unnamed.txt',
        },
        {
          id: 7,
          name: 'Misc',
          children: [
            {
              id: 8,
              name: 'foo.txt',
            },
            {
              id: 9,
              name: 'bar.txt',
            },
          ],
        },
      ],
    },
  ];

function App() {
  const [data, setData] = useState(initialData);
  return (
    <div className="App">
      <FileExplorer data={data} setData={setData} />
    </div>
  );
}

export default App;
