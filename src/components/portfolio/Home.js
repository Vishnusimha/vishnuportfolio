import React, { useState, useCallback } from "react";
import { ReactTyped } from "react-typed";
import Lottie from "lottie-react";
import codingAnimation from "../../assets/LottieFiles/vishnusimha.json";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaShieldAlt,
  FaSync,
  FaCalendarAlt,
  FaArrowUp,
  FaMapMarkerAlt,
  FaCode,
  FaHeart,
  FaCoffee,
  FaVideo,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Home = React.forwardRef((props, ref) => {
  // Constants
  const REFRESH_DELAY = 1000;

  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const handleRefreshStats = useCallback(() => {
    setIsRefreshing(true);
    setError(null);
    setRefreshKey((prev) => prev + 1);

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, REFRESH_DELAY);
  }, [REFRESH_DELAY]);

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/Vishnusimha",
      label: "GitHub Profile",
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:vishnusimha98@gmail.com",
      label: "Email Contact",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/vishnusimhadussa/",
      label: "LinkedIn Profile",
    },
    {
      icon: <SiLeetcode />,
      url: "https://leetcode.com/u/vishnusimha98/",
      label: "LeetCode Profile",
    },
    {
      icon: <FaShieldAlt />,
      url: "https://www.credly.com/users/vishnu-simha-dussa/",
      label: "Credly Certifications",
    },
  ];

  const credlyUrl = "https://www.credly.com/users/vishnu-simha-dussa/";

  const handleCertificationsClick = () => {
    window.open(credlyUrl, "_blank");
  };

  const handleMyWorkClick = () => {
    props.onNavigate("projects");
  };

  const handlePostsClick = () => {
    props.onNavigate("Blogs");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScheduleCall = () => {
    // Create Google Calendar event with Google Meet
    const now = new Date();
    const startDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes later

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const eventDetails = {
      text: "Technical Discussion with Vishnu Simha",
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `Hi Vishnu! I'm interested in discussing a potential collaboration opportunity with you.

📋 Meeting Agenda:
• Introduction and project requirements
• Technical discussion and approach
• Timeline and next steps
• Q&A session

🔗 This meeting will include Google Meet for video conferencing.
📧 Meeting with: vishnusimha98@gmail.com

Looking forward to connecting with you!`,
      location: "Google Meet (link will be provided)",
      add: "vishnusimha98@gmail.com", // Add Vishnu as attendee
      src: "Google Meet", // This helps Google Calendar recognize it should add Meet
      trp: false, // Don't show guests in the event
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.text
    )}&dates=${eventDetails.dates}&details=${encodeURIComponent(
      eventDetails.details
    )}&location=${encodeURIComponent(
      eventDetails.location
    )}&add=${encodeURIComponent(eventDetails.add)}&src=${encodeURIComponent(
      eventDetails.src
    )}&trp=${eventDetails.trp}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const GitHubStatsCard = ({ src, alt, title, href, className = "" }) => (
    <div className={`github-stats-container ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        aria-label={`View ${title} on GitHub`}
      >
        {isRefreshing ? (
          <div
            className="stats-loading-skeleton"
            role="img"
            aria-label="Loading GitHub statistics"
          >
            <div className="skeleton-content"></div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="github-stats-image"
            loading="lazy"
            onError={(e) => {
              setError(`Failed to load ${alt}`);
              console.error(`Failed to load GitHub stat: ${alt}`);
            }}
          />
        )}
      </a>
    </div>
  );

  const techStack = [
    "Kotlin",
    "Java",
    "Python",
    "Android",
    "Jetpack Compose",
    "Spring Boot/Microservices",
    "SQL",
    "AWS",
    "React/HTML/CSS",
    "Docker",
    "Kubernetes",
    "Github Actions",
    "Jenkins",
  ];

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section ref={ref} className="home-welcome-section">
        <div className="home-welcome-content">
          <div className="home-welcome-text">
            <h1 className="home-greeting">Hi There!</h1>
            <h1 className="home-name">
              I'M <span className="highlight">Vishnu Simha</span>
            </h1>
            <h2 className="home-typing-text">
              <ReactTyped
                strings={[
                  "Software Engineer",
                  "Full stack Developer",
                  "Android Developer",
                  "AWS Solution Architect - Associate",
                ]}
                typeSpeed={30}
                backSpeed={10}
                loop
              />
            </h2>
            <p className="home-description">
              I craft exceptional digital experiences through clean, efficient
              code and scalable architectures. Currently, I specialize in
              building reliable mobile applications, backed by robust backend
              systems and cutting-edge cloud technologies.
            </p>

            {/* Call to Action Buttons - Updated Names */}
            <div className="cta-buttons">
              <button
                className="primary-btn"
                onClick={handleMyWorkClick} // Use the updated handler
              >
                My Work
              </button>
              <button
                className="secondary-btn"
                onClick={handlePostsClick} // Use the updated handler
              >
                Posts
              </button>
            </div>

            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="home-welcome-image">
            <Lottie
              animationData={codingAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about-section">
        <div className="home-about-container">
          <div className="home-about-header">
            <h2>About Me</h2>
            <div className="home-about-divider"></div>
          </div>

          <div className="home-about-content">
            <div className="home-about-text">
              <h3>Who am I?</h3>
              <p>
                I'm a <strong>passionate software engineer</strong> with
                expertise in Android development and backend systems. I
                specialize in creating robust, scalable applications that
                deliver exceptional user experiences.
              </p>
              <p>
                With <strong>4+ years</strong> of professional experience, I've
                helped companies build products used by millions of users
                worldwide. My technical expertise spans{" "}
                <strong>Kotlin, Java, Python, AWS, and SQL</strong>, with
                certifications as an{" "}
                <strong>AWS Solutions Architect Associate</strong> and{" "}
                <strong>Cloud Practitioner</strong>.
              </p>
              <p>
                When I'm not coding, you can find me exploring 📸 photography,
                🎬 watching movies, or 🛠️ experimenting with IoT projects🔌.
              </p>

              <div className="about-tech-stack">
                <h4>Technologies I work with:</h4>
                <div className="tech-tags">
                  {techStack.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <h3>4+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-card">
                <h3>20+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-card">
                <h3>1M+</h3>
                <p>Users Impacted</p>
              </div>
              <div
                className="stat-card"
                style={{ cursor: "pointer" }}
                onClick={handleCertificationsClick}
              >
                <h3>6+</h3>
                <p>Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Section - Third Half */}
      <section className="home-github-section">
        <div className="home-github-container">
          <div className="home-github-header">
            <h2>GitHub Stats</h2>
            <div className="home-github-divider"></div>
          </div>

          <div className="github-stats-content">
            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                <span>⚠️ {error}</span>
                <button
                  onClick={() => setError(null)}
                  aria-label="Dismiss error message"
                  className="error-dismiss-btn"
                >
                  ×
                </button>
              </div>
            )}
            <div className="github-stats-header">
              <h4>Real-time Coding Activity:</h4>
              <div className="github-controls">
                <div className="current-date">
                  <FaCalendarAlt aria-hidden="true" />
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <button
                  className="refresh-stats-btn"
                  onClick={handleRefreshStats}
                  disabled={isRefreshing}
                  title="Refresh GitHub Stats"
                  aria-label="Refresh GitHub statistics"
                  aria-describedby="refresh-status"
                >
                  <FaSync
                    className={isRefreshing ? "spinning" : ""}
                    aria-hidden="true"
                  />
                  <span className="sr-only" id="refresh-status">
                    {isRefreshing
                      ? "Refreshing statistics..."
                      : "Click to refresh"}
                  </span>
                </button>
              </div>
            </div>
            <div className="github-stats-grid">
              <GitHubStatsCard
                src={`https://github-readme-stats.vercel.app/api?username=Vishnusimha&theme=dark&hide_border=false&include_all_commits=true&count_private=true&v=${refreshKey}`}
                alt="GitHub Profile Stats"
                title="View my GitHub profile stats"
                href="https://github.com/Vishnusimha"
              />
              <GitHubStatsCard
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=Vishnusimha&theme=dark&hide_border=false&layout=compact&v=${refreshKey}`}
                alt="GitHub Top Languages"
                title="View my GitHub languages"
                href="https://github.com/Vishnusimha"
              />
              <GitHubStatsCard
                src={`https://github-readme-streak-stats.herokuapp.com/?user=Vishnusimha&theme=dark&hide_border=false&v=${refreshKey}`}
                alt="GitHub Streak Stats"
                title="View my GitHub streak"
                href="https://github.com/Vishnusimha"
              />
              <GitHubStatsCard
                src={`https://github-readme-activity-graph.vercel.app/graph?username=Vishnusimha&theme=github-dark&hide_border=false&area=true&custom_title=GitHub%20Activity%20Graph&v=${refreshKey}`}
                alt="GitHub Activity Graph"
                title="View my GitHub activity graph"
                href="https://github.com/Vishnusimha"
                className="activity-graph-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        {/* CTA Section */}
        <div className="footer-cta-section">
          <div className="footer-cta-container">
            <div className="footer-cta-content">
              <h2>Let's Build Something Amazing Together</h2>
              <p>
                Ready to turn your ideas into scalable, high-performance
                applications?
              </p>
              <div className="footer-cta-buttons">
                <button
                  className="footer-primary-btn"
                  onClick={() =>
                    window.open(
                      "mailto:vishnusimha98@gmail.com?subject=Project Collaboration&body=Hi Vishnu, I would like to discuss a project opportunity with you.",
                      "_blank"
                    )
                  }
                >
                  <FaEnvelope />
                  Start a Project
                </button>
                <button
                  className="footer-secondary-btn"
                  onClick={handleScheduleCall}
                >
                  <FaVideo />
                  Schedule Call
                </button>
              </div>
            </div>
            <div className="footer-cta-status">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>
                  <strong>Available for new opportunities</strong>
                </span>
              </div>
              <div className="coffee-chat">
                <FaCoffee style={{ fontSize: "1.2em" }} />
                <span>Always up for a coffee chat about tech!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-container">
            <div className="footer-grid">
              {/* About Column */}
              <div className="footer-column">
                <h3>Vishnu Simha</h3>
                <p className="footer-description">
                  Full Stack Developer specializing in Android, Spring Boot, and
                  AWS. I build scalable applications that impact millions.
                </p>
                <div className="footer-location">
                  <FaMapMarkerAlt />
                  <span>Based in 🇮🇳India/🇮🇪Ireland</span>
                </div>
                <div className="footer-social-links">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="footer-social-link"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="footer-column">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#home" onClick={() => scrollToTop()}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" onClick={() => props.onNavigate("home")}>
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      onClick={() => props.onNavigate("projects")}
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#blog" onClick={() => props.onNavigate("Blogs")}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#resume"
                      onClick={() => props.onNavigate("resume")}
                    >
                      Resume
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={() => props.onNavigate("contact")}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Services Column */}
              <div className="footer-column">
                <h4>Services</h4>
                <ul className="footer-links">
                  <li>Android App Development</li>
                  <li>Full Stack Web Development</li>
                  <li>IoT Solutions</li>
                  <li>Technical Consulting</li>
                </ul>
              </div>

              {/* Technologies Column */}
              <div className="footer-column">
                <h4>Technologies</h4>
                <div className="footer-tech-grid">
                  <span className="footer-tech-tag">Kotlin</span>
                  <span className="footer-tech-tag">Java</span>
                  <span className="footer-tech-tag">Android</span>
                  <span className="footer-tech-tag">Spring Boot</span>
                </div>
                <div className="footer-experience">
                  <div className="experience-item">
                    <strong>4+</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="experience-item">
                    <strong>20+</strong>
                    <span>Projects Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>
                  © {new Date().getFullYear()} Vishnu Simha. All rights
                  reserved.
                </p>
                <p className="footer-built-with">
                  Built with <FaHeart className="heart-icon" /> using <FaCode />{" "}
                  React & deployed on Vercel
                </p>
              </div>
              <div className="footer-bottom-right">
                <div className="footer-last-updated">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <button
                  className="back-to-top"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                >
                  <FaArrowUp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Home;
