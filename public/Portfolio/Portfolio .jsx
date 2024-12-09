import React from 'react';

const Portfolio = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      {/* Navigation */}
      <header className="fixed w-full bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Logeshwaran C</h1>
          <nav>
            <a href="#about" className="mx-3 hover:text-blue-400">About</a>
            <a href="#skills" className="mx-3 hover:text-blue-400">Skills</a>
            <a href="#experience" className="mx-3 hover:text-blue-400">Experience</a>
            <a href="#projects" className="mx-3 hover:text-blue-400">Projects</a>
            <a href="#education" className="mx-3 hover:text-blue-400">Education</a>
            <a href="#contact" className="mx-3 hover:text-blue-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Hi, I'm Logeshwaran</h2>
          <p className="text-xl mb-6">Full Stack Developer | Crafting Modern Solutions</p>
          <a href="#about" className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition">Explore My Work</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg leading-relaxed">
                I'm a driven Full Stack Developer with a passion for building efficient and innovative web applications. My skills span across front-end and back-end development, with a focus on solving complex problems and creating scalable solutions.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed">
                Proficient in ReactJS, Node.js, and various databases, I bring a comprehensive skill set to every project. I am continuously learning and adapting to new challenges, committed to delivering high-quality results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Front-End</h3>
              <p>ReactJS, Tailwind CSS</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Back-End</h3>
              <p>Node.js, Express</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Databases</h3>
              <p>SQL Server, MongoDB</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Version Control</h3>
              <p>Git, GitHub, GitLab</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section id="experience" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Full Stack Developer Intern</h3>
              <p className="text-sm text-gray-500 mb-4">Transform Tech Private Limited, January 2024 - June 2024</p>
              <ul className="list-disc list-inside text-left space-y-2">
                <li>Debugged and enhanced existing codebases.</li>
                <li>Developed scalable web applications in collaboration with a team.</li>
                <li>Designed and optimized database schemas.</li>
                <li>Implemented effective backup solutions to ensure data integrity.</li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      <section id="experience" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 ">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer Intern</h3>
            <p className="italic text-gray-400">Transform Tech Private Limited, January 2024 - June 2024</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Debugged and enhanced existing codebases.</li>
              <li>Developed scalable web applications in collaboration with a team.</li>
              <li>Designed and optimized database schemas.</li>
              <li>Ensured data integrity by implementing effective backup solutions.</li>
            </ul>
          </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Teaching Learning Evaluation</h3>
              <p className="text-sm">Developed an evaluation system for effective teaching and learning.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Student Attendance</h3>
              <p className="text-sm">Built a comprehensive student attendance tracking system.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Staff Management</h3>
              <p className="text-sm">Created a streamlined management system for staff operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Master of Computer Applications</h3>
              <p className="text-sm text-gray-500 mb-4">RVS College of Arts And Science College, Coimbatore, Tamil Nadu, India (April 2024)</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Bachelor of Computer Applications</h3>
              <p className="text-sm text-gray-500 mb-4">RVS College of Arts And Science College, Coimbatore, Tamil Nadu, India (April 2022)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <p className="text-lg mb-8">Feel free to reach out for collaborations or just a friendly chat.</p>
          <a href="mailto:logeshwaranchandrakumar@outlook.com" className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition">Get in Touch</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-center">
        <p className="text-gray-500">&copy; 2024 Logeshwaran C. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
