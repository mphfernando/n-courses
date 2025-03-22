import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CourseGrid from '../../components/CourseGrid';
import CategoryGrid from '../../components/CategoryGrid';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };


  useEffect(() => {
    // Fetch featured courses
    fetch('http://localhost/backend/api/courses.php')
      .then((response) => response.json())
      .then((data) => {
        const transformedCourses = data.slice(0, 10).map((course) => ({
          id: course.id,
          imageUrl: course.imageUrl,
          provider: course.ins_user_name,
          title: course.course_name,
          type: course.course_description,
          contentLink: `/courseinfo/${course.id}`,
        }));
        setFeaturedCourses(transformedCourses);
      })
      .catch((error) => console.error('Error fetching featured courses:', error));

    // Fetch categories
    fetch('http://localhost/backend/api/category_courses.php')
      .then((response) => response.json())
      .then((data) => {
        const transformedCategories = data.map((category) => ({
          name: category.name,
          img: category.imageUrl,
        }));
        setCategories(transformedCategories);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="home-container">
      <div className="carousel-container">
        <Slider {...settings}>
          <div>
            <img src="/assets/1.png" alt="Slide 1" />
          </div>
          <div>
            <img src="/assets/2.png" alt="Slide 2" />
          </div>
          <div>
            <img src="/assets/3.png" alt="Slide 3" />
          </div>
        </Slider>
      </div>

      <div className="categories-container">
        <h2>Course Categories</h2>
        <CategoryGrid categories={categories} />
      </div>
      <div className="new-courses-container">
        <CourseGrid courses={featuredCourses} title="Featured Courses" />
      </div>

    
    </div>
  );
};

export default Home;