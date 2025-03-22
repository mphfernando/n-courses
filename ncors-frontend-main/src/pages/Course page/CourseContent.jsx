import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, ChevronDown, ChevronRight, BookOpen, Video, FileText, File } from 'lucide-react';
import './CourseContent.css';

const ContentPage = () => {
  const [course, setContent] = useState([]); // Initialize state
  const previewLink = "https://www.youtube.com/watch?v=Y4qO9unerGs&list=PLYwpaL_SFmcBhOEPwf5cFwqo5B-cP9G4P"; // Hardcoded video URL
  const courseDocuments = [
    { title: "Course Syllabus", url: "https://example.com/syllabus.pdf" },
    { title: "Reading Material", url: "https://example.com/reading.pdf" },
  ];

  // Simulating fetched content
  useEffect(() => {
    const transformedContent = [
      {
        title: "Introduction to Data Science", // Placeholder for course title
        thumbnailUrl: "https://via.placeholder.com/150", // Placeholder thumbnail URL
        url: previewLink,
      },
    ];
    setContent(transformedContent); // Set state with transformed content
  }, []); // Empty dependency array ensures the fetch happens only once after the component mounts

  // Accordion component
  const Accordion = ({ title, children, lessonsCount }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
        <button className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
          <div className="accordion-title-content">
            <span className="accordion-icon">
              {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </span>
            <span className="accordion-text">{title}</span>
          </div>
          <span className="lessons-count">{lessonsCount} lessons</span>
        </button>
        {isOpen && <div className="accordion-content">{children}</div>}
      </div>
    );
  };

  // Lesson item component
  const LessonItem = ({ title, type }) => {
    const getIcon = () => {
      switch (type) {
        case 'video':
          return <Video size={16} />;
        case 'quiz':
          return <FileText size={16} />;
        default:
          return <BookOpen size={16} />;
      }
    };

    return (
      <li className="lesson-item">
        <span className="lesson-icon">{getIcon()}</span>
        <span className="lesson-title">{title}</span>
      </li>
    );
  };

  // Comment section component
  const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim() !== '') {
        setComments([...comments, newComment]);
        setNewComment('');
      }
    };

    return (
      <div className="comment-section">
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Link preview component
  const LinkPreview = ({ url }) => {
    const videoId = url ? new URL(url).searchParams.get('v') : null;

    if (!videoId) return null;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    return (
      <div className="link-preview">
        <img src={thumbnailUrl} alt="Video thumbnail" />
        <div className="link-preview-info">
          <h3>Course Preview Video</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      </div>
    );
  };

  // Document item component
  const DocumentItem = ({ title, url }) => (
    <li className="document-item">
      <File size={16} />
      <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
    </li>
  );

  // Course content component
  const CourseContent = ({ previewLink, courseDocuments, courseTitle = "Introduction to Data Science" }) => {
    const courseStructure = [
      {
        title: "Module 1: Introduction to the Course",
        lessons: [
          { title: "Welcome to the Course", type: "video" },
          { title: "Course Overview", type: "text" },
          { title: "Setting Up Your Environment", type: "video" },
          { title: "Quick Start Guide", type: "text" },
        ]
      },
      {
        title: "Module 2: Fundamentals and Core Concepts",
        lessons: [
          { title: "Understanding the Basics", type: "video" },
          { title: "Key Principles Explained", type: "video" },
          { title: "Hands-on Exercise: Applying Core Concepts", type: "text" },
          { title: "Quiz: Test Your Knowledge", type: "quiz" },
        ]
      },
      {
        title: "Module 3: Advanced Techniques and Best Practices",
        lessons: [
          { title: "Deep Dive into Advanced Topics", type: "video" },
          { title: "Case Study: Real-world Application", type: "video" },
          { title: "Workshop: Implementing Best Practices", type: "text" },
          { title: "Final Project: Putting It All Together", type: "text" },
          { title: "Course Wrap-up and Next Steps", type: "video" },
        ]
      }
    ];

    const instructor = {
      name: "Mr. Y.M.Awishka Dilshan yapa",
      bio: "Mr. Y.M.Awishka Dilshan yapa is a renowned expert in the field with over 15 years of experience. He has published numerous papers and is passionate about teaching.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXXNRemSvgKeHb3nvSBxCDci0HOkjpkvM9A&s" // Placeholder image
    };

    return (
      <div className="course-content">
        <h1 className="course-title">{courseTitle}</h1>
        <div className="content-layout">
          <div className="main-content">
            <div className="video-area">
              <div className="video-card">
                <div className="link-preview-container">
                  {previewLink ? (
                    <LinkPreview url={previewLink} />
                  ) : (
                    <div className="link-preview-placeholder">
                      <Link size={48} />
                      <p>No preview available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="course-documents">
              <h2>Course Documents</h2>
              {courseDocuments.length > 0 ? (
                <ul className="document-list">
                  {courseDocuments.map((doc, index) => (
                    <DocumentItem key={index} title={doc.title} url={doc.url} />
                  ))}
                </ul>
              ) : (
                <p>No documents available for this course.</p>
              )}
            </div>
          </div>
          <div className="course-structure">
            <h2>Course Structure</h2>
            {courseStructure.map((module, index) => (
              <Accordion key={index} title={module.title} lessonsCount={module.lessons.length}>
                <ul className="lesson-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <LessonItem key={lessonIndex} title={lesson.title} type={lesson.type} />
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="instructor-details">
          <h2>Your Instructor</h2>
          <div className="instructor-card">
            <img src={instructor.image} alt={instructor.name} className="instructor-image" />
            <div className="instructor-info">
              <h3>{instructor.name}</h3>
              <p>{instructor.bio}</p>
            </div>
          </div>
        </div>
        <CommentSection />
      </div>
    );
  };

  return (
    <CourseContent previewLink={previewLink} courseDocuments={courseDocuments} />
  );
};

export default ContentPage;
