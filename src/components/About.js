import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Brain Safari</h1>
      <p>
        As the technology industry evolves, tech professionals must
        continuously update their skills and knowledge. While numerous online
        learning resources exist, they are often spread across different
        platforms and lack effective curation. Additionally, learners face
        challenges in staying motivated to complete learning paths, as most
        platforms fail to incorporate interactive or community-driven
        incentives. As a result, learners find it difficult to maintain
        progress, build expertise in specific areas, and engage with
        like-minded individuals in a shared journey of skill-building.
      </p>
      <p>
        To address this, Brain Safari was created as a platform that not only
        aggregates learning resources but also fosters a community-centered
        environment where users can collaborate, share, and engage meaningfully.
        Gamification elements further encourage participation and provide
        incentives for users to reach their learning goals.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Create and follow structured learning paths with quizzes and modules.</li>
        <li>Share, rate, and comment on resources to create a dynamic knowledge repository.</li>
        <li>Earn points and badges for completing learning tasks and contributing to the platform.</li>
        <li>
          Participate in challenges and view leaderboards to foster competition
          and community engagement.
        </li>
      </ul>
      <h2>User Roles</h2>
      <h3>Admin</h3>
      <p>
        - Reviews and approves shared resources and learning paths to maintain
        quality.<br />
        - Manages challenges, leaderboards, and user achievements.<br />
        - Oversees user interactions and ensures respectful conduct.<br />
      </p>
      <h3>Contributor</h3>
      <p>
        - Creates and shares learning resources like videos and articles.<br />
        - Designs learning paths and engages in discussions.<br />
        - Earns points, XP, and badges for contributions.<br />
      </p>
      <h3>Learner</h3>
      <p>
        - Accesses learning paths and completes modules.<br />
        - Earns badges and points for learning achievements.<br />
        - Participates in challenges and views leaderboards.<br />
      </p>
    </div>
  );
};

export default About;
