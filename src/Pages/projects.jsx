import React from 'react';
import './projects.css';
import project1 from './images/PrixEssence.jpg';

const projects = [
  { title: 'FuelPrice', description: 'Application pour suivre les prix du carburant', image: project1 },
  { title: 'WeatherApp', description: 'Application pour suivre la météo', image: project1 },
  { title: 'PrayerTimes', description: 'Application pour suivre les horaires de prières', image: project1 },
];

function small_projects() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Small Projects</h1>
      </header>
      <main className="projects-grid">
      {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </main>
      <footer>
        <p>© 2023 Small Projects</p>
      </footer>
    </div>
  );
}

export default small_projects;
