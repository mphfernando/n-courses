import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CourseContent from './pages/Course page/CourseContent';
import Courses from './pages/Course page/Courses';
import Home from './pages/Home/Home'
import LoginForm from './pages/Sign-in/LoginForm';
import RegistrationForm from './pages/Sign-in/RegistrationForm';
import InsRegForm from './pages/Sign-in/InsRegForm'
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import CourseInfo from './pages/CourseInfo/CourseInfo'
import UserDashboard from './UserDashboard/UserDashboard';
import LoginForm_teacher from './pages/Sign-in/LoginForm_teacher';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';




function App() {
  return (
   <Router>
    <div className="App">
     
      <Navbar />
       
 <Switch>
        <Route exact  path = "/">
      <Home/>
      </Route>
      <Route path= "/courses">
      <Courses/>

      </Route>
      <Route path = "/content">
      <CourseContent/>
      </Route>
      
      <Route path = "/login">
        <LoginForm/>
      </Route>
      <Route path = "/LoginForm_teacher">
        <LoginForm_teacher/>
      </Route>
      <Route path = "/Register">
        <RegistrationForm/>
      </Route>
      <Route path = "/teach">
        <InsRegForm/>
      </Route>
      <Route path = "/about">
        <AboutUs/>
      </Route>
      <Route path = "/contact">
        <ContactUs/>
      </Route>
      <Route path="/courseinfo/:courseId">
        <CourseInfo />
      </Route>
      <Route path="/dashboard">
      <UserDashboard/>
      </Route>
      <Route path="/dashboard-teacher">
      <TeacherDashboard/>
      </Route>
      
        </Switch>

          <Footer />

    </div>
    </Router>
    
    
  );
}

export default App;
