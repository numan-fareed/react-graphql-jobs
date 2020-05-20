import React, { Fragment } from 'react'
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

export default function Jobs() {
  const { loading, error, data } = useQuery(JOBS_QUERY, { variables: { search: "" } });
  let [searchTerm, setSearchTerm] = React.useState("");
  let [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = searchResults.filter(job =>
      job.title.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);
  }, [searchTerm]);
  if (loading) return <p>Loading...</p>
  const { commitments } = data;
  if (commitments && !searchTerm) {
    searchResults = commitments.reduce((jobs, commitment) => { return jobs.concat(commitment.jobs) }, [])
  }
  return <div className="row justify-content-center full-width mt-5">
    <Fragment>
      <div className="col-md-7">
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={searchTerm} onChange={handleChange} placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div className="input-group-append">
          </div>
        </div>
        {searchResults.length == 0 ? <div className="col-md-5"><p>No Job Found</p></div> : null}
      </div>
      {
        searchResults.map(job => (
          <JobCard key={job.id} job={job} />
        ))
      }
    </Fragment>
  </div>
}

