import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AboutProject({ pool }) {
  return (
    <section className="about-project">
       <ToastContainer />
      <h1>About the Project</h1>
      <div className="">
        <p>{pool?.aboutProject}</p>
        {console.log(pool)}
        <ul>
          {pool.projectBenefits?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>MENZY ECOSYSTEM</p>
      </div>
    </section>
  );
}
