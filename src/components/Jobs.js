import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import JobCard from './JobCard';
const JOBS_QUERY = gql`
query($search: String!) {
  commitments {
    id
    title
    slug
    jobs(
      where: {
        AND: [
          { NOT: { company: null } }
          {
            OR: [
              { title_contains: $search }
              { company: { name_contains: $search } }
            ]
          }
        ]
      }
    ) {
      id
      title
      isPublished
      userEmail
      applyUrl
      locationNames
      slug
      cities {
        name
      }
      company {
        name
        slug
      }
      description
    }
  }
}
`;
export default function Jobs(props) {
  const { loading, error, data } = useQuery(JOBS_QUERY, { variables: { search: "" } });
  if (loading) return <p>Loading...</p>
  const { commitments } = data;
  let jobs = [];
  if (commitments) {
    jobs = commitments.reduce((jobs, commitment) => { return jobs.concat(commitment.jobs) }, [])
  }
  return <div className="row justify-content-center full-width">
    <Fragment>
      {
        jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))
      }
    </Fragment>
  </div>
}
// export class Jobs extends Component {


// render() {
//     return (
//         <div className="row justify-content-center full-width">
//             <Query query={JOBS_QUERY}>
//                 {({ loading, data }) => {
//                     if (loading) return "Loading..."
//                     const { jobs } = data;
//                     console.log(data);
//                     return <Fragment>
//                         {
//                             jobs.map(job => (
//                                 <JobCard key={job.id} job={job} />
//                             ))
//                         }
//                     </Fragment>
//                 }}
//             </Query>
//         </div>
//     )
// }
// }

// export default Jobs
