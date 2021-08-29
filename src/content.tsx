import React from 'react';
import ReactDOM from 'react-dom';

import './content.css';


const Main = () => {
  return <span>Injected text</span>;
};

const app = document.createElement('div');
app.id = 'root';

document.body.append(app);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);