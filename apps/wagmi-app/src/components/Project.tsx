import React from 'react';
import classnames from 'classnames';

const styleProject = classnames('w-54 my-2 mx-2 px-2 py-2 bg-white');

type IProjectProps = {
  project: any;
  setSelectedProject: any;
};

const Project = ({
  project,
  setSelectedProject = (id: string) => console.log(id),
} : IProjectProps ) => {
  // business logic
  const onProjectClick = () => {
    setSelectedProject(project.id);
    // TODO: open project page
  };

  return (
    <div style={{ width: 250, height: 300 }} className={styleProject}>
      <h2>{project.name}</h2>
      <div onClick={() => onProjectClick()}>{project.level}</div>
    </div>
  );
};

export default Project;