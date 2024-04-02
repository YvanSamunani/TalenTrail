import React from 'react';

function Survey() {
  return (
    <div className="container mt-5">
      <h2>Initial Survey</h2>
      <p>Please answer the following questions to help us tailor your TalenTrail experience.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="favoriteSubject" className="form-label">What's your favorite subject?</label>
          <select className="form-select" id="favoriteSubject">
            <option>Science</option>
            <option>Math</option>
            <option>History</option>
            <option>Art</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="careerGoal" className="form-label">What is your career goal?</label>
          <input type="text" className="form-control" id="careerGoal" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Survey;
