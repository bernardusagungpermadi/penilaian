import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [penilaian, setPenilaian] = useState(Array(10).fill({}));

  const handleChange = (event, index, aspek) => {
    const { value } = event.target;
    setPenilaian((prevPenilaian) => {
      const updatedPenilaian = [...prevPenilaian];
      updatedPenilaian[index] = {
        ...updatedPenilaian[index],
        [aspek]: Number(value),
      };
      return updatedPenilaian;
    });
  };

  const handleSave = () => {
    const jsonData = getJSONData(penilaian);
    downloadJson(jsonData, 'hasil_penilaian.json');

    // Reset penilaian to initial state
    setPenilaian(Array(10).fill({}));
  };

  const getJSONData = (penilaian) => {
    const data = {};
    penilaian.forEach((nilai, index) => {
      data[`mahasiswa_${index + 1}`] = nilai;
    });
    return JSON.stringify(data);
  };

  const downloadJson = (jsonData, filename) => {
    const element = document.createElement('a');
    const file = new Blob([jsonData], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container">
      <table className="penilaian-table">
        <thead>
          <tr>
            <th>Mahasiswa</th>
            <th>Aspek 1</th>
            <th>Aspek 2</th>
            <th>Aspek 3</th>
            <th>Aspek 4</th>
          </tr>
        </thead>
        <tbody>
          {penilaian.map((nilai, index) => (
            <tr key={index}>
              <td>Mahasiswa {index + 1}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={nilai.aspek1 || ''}
                  onChange={(e) => handleChange(e, index, 'aspek1')}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={nilai.aspek2 || ''}
                  onChange={(e) => handleChange(e, index, 'aspek2')}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={nilai.aspek3 || ''}
                  onChange={(e) => handleChange(e, index, 'aspek3')}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={nilai.aspek4 || ''}
                  onChange={(e) => handleChange(e, index, 'aspek4')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-container">
        <h3>Hasil Penilaian</h3>
        {penilaian.map((nilai, index) => (
          <div key={index} className="result-item">
            <span>Mahasiswa {index + 1}: </span>
            {Object.values(nilai).reduce((a, b) => a + b, 0)}
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Simpan dan Download</button>
    </div>
  );
};

export default App;
