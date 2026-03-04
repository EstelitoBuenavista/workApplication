'use client';

import { useState } from 'react';

const questions = [
  { id: 'Q1', text: 'I worry about things.' },
  { id: 'Q2', text: 'I make friends easily.' },
  { id: 'Q3', text: 'I have a vivid imagination.' },
];

const options = [
  { label: 'Very Inaccurate', value: '1' },
  { label: 'Moderately Inaccurate', value: '2' },
  { label: 'Neither Accurate Nor Inaccurate', value: '3' },
  { label: 'Moderately Accurate', value: '4' },
  { label: 'Very Accurate', value: '5' },
];

export default function Home() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setError('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <h1 className="title">Programming Test 1</h1>
        <div className="success-message">
          <h2>Thank you!</h2>
          <p>Your survey has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Programming Test 1</h1>

      {questions.map((question, index) => (
        <div key={question.id} className="question-card">
          <div className="question-border"></div>
          <p className="question-text">{index + 1}. {question.text}</p>
          <div className="options-row">
            {options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${answers[question.id] === option.value ? 'selected' : ''
                  }`}
                onClick={() => handleSelect(question.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="error-text">{error}</p>}

      <div className="submit-row">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
