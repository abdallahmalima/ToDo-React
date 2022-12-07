import {
  useLocation, Link,
} from 'react-router-dom';
import SinglePage from './SinglePage';

const About = () => {
  const { pathname: path } = useLocation();
  return (
    <div className="about__content">
      <ul className="about__list">
        <li>
          <Link to={`${path}/about-app`}>About App</Link>
        </li>
        <li>
          <Link to={`${path}/about-author`}>About Author</Link>
        </li>
      </ul>
    </div>
  );
};

export default About;