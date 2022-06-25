/*
  Client List component
 */

  import React, { useState } from 'react';
  import Project from './Project';
  
  const ProjectsList = ({ data } : any) => {
    const [selectedProjectId, setSelectedProject] = useState(null);
    console.log(selectedProjectId)
    return (
      <>
        <div className='flex'
          // style={{maxWidth: 1300, justifyContent: 'center'}}
          >
          {data.length &&
              data
                .map((project:any, index:any) => (
                  <Project
                    key={index}
                    project={project}
                    setSelectedProject={setSelectedProject}
                  />
                ))}
        </div>
      </>
    );
  };
  
  export default ProjectsList;
  