import React, { useState, useEffect } from 'react';
import './App.css';
<span>🔐 Security Questions Setup</span>
function App() {
  const [questions, setQuestions] = useState([]);
  const [hide, setHide] = useState(true);
  const [formData, setFormData] = useState(
    Array.from({ length: 5 }, () => ({
  questionId: '',
  answer: '',
  confirmAnswer: ''
}))
  );

  useEffect(() => {
  fetch('http://localhost:5000/api/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
    .catch(() => setQuestions([]));
}, []);

  const updateField = (idx, field, val) => {
    const next = [...formData];
    next[idx] = { ...next[idx], [field]: val };
    setFormData(next);
  };

  const handleSave = () => {
  const selectedQuestions = [];

  for (let i = 0; i < formData.length; i++) {
    const row = formData[i];
    const rowNum = i + 1;

    
    if (!row.questionId) {
      alert(`Please select a question for Row ${rowNum}`);
      return;
    }

    
    if (selectedQuestions.includes(row.questionId)) {
      alert(`Duplicate question selected at Row ${rowNum}`);
      return;
    }
    selectedQuestions.push(row.questionId);

    
    if (!row.answer || row.answer.length < 5) {
      alert(`Answer ${rowNum} must be at least 5 characters long.`);
      return;
    }

    
    if (row.answer.length > 255) {
      alert(`Answer ${rowNum} cannot exceed 255 characters.`);
      return;
    }

    
    if (row.answer !== row.confirmAnswer) {
      alert(`Row ${rowNum} Error: Answer and Confirm Answer do not match!`);
      return;
    }
  }

  fetch('http://localhost:5000/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: formData })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(data.message);
    })
    .catch(err => alert(err.message));
};

  return (
    <div className="card-container">
      <div className="card-header">
        <span>Security Questions</span>
        <span className="close-icon">×</span>
      </div>
      
      <div className="card-body">
        {formData.map((row, i) => {
          const usedIds = formData.map((r, idx) => idx !== i ? r.questionId : null);
          const available = questions.filter(q => !usedIds.includes(q.id));

          return (
            <div key={i} className="row-item">
              <div className="q-group">
                <label>Question : </label>
                <select 
                  className="modern-select"
                  value={row.questionId} 
                  onChange={e => updateField(i, 'questionId', e.target.value)}
                >
                  <option value="">-- Please Select a Question --</option>
                  {available.map(q => <option key={q.id} value={q.id}>{q.text}</option>)}
                </select>
              </div>
              
              <div className="a-group">
                <input 
                  type={hide ? "password" : "text"} 
                  placeholder="Answer" 
                  value={row.answer} 
                  onChange={e => updateField(i, 'answer', e.target.value)} 
                />
                <input 
                  type={hide ? "password" : "text"} 
                  placeholder="Confirm Answer" 
                  value={row.confirmAnswer} 
                  onChange={e => updateField(i, 'confirmAnswer', e.target.value)} 
                />
              </div>
            </div>
          );
        })}

        <div className="card-footer">
          <label className="toggle-hide">
            <input type="checkbox" checked={hide} onChange={() => setHide(!hide)} /> 
            Hide Answer(s)
          </label>
          <ul className="guidelines">
            <li>The minimum length of the answer(s) should be 5 characters and maximum allowed is 255 characters</li>
          </ul>
          <button className="submit-button" onClick={handleSave}>Save Answers</button>
        </div>
      </div>
    </div>
  );
}

export default App;