import React from 'react';

const QuestionRow = ({ index, questions, rowData, onUpdate, hide }) => {
  return (
    <div className="question-block">
      <div className="question-selector">
        <label>Question : </label>
        <select 
          value={rowData.questionId} 
          onChange={(e) => onUpdate(index, 'questionId', e.target.value)}
        >
          <option value="">-- Please Select a Question --</option>
          {questions.map(q => (
            <option key={q.id} value={q.id}>{q.text}</option>
          ))}
        </select>
      </div>
      
      <div className="answer-inputs">
        <input 
          type={hide ? "password" : "text"} 
          placeholder="Answer"
          value={rowData.answer}
          onChange={(e) => onUpdate(index, 'answer', e.target.value)}
        />
        <input 
          type={hide ? "password" : "text"} 
          placeholder="Confirm Answer"
          value={rowData.confirmAnswer}
          onChange={(e) => onUpdate(index, 'confirmAnswer', e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuestionRow;