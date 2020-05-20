import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const JOB_QUERY = gql`
query ($jobSlug:String!,$companySlug:String!){
    job(input:{jobSlug:$jobSlug,companySlug:$companySlug}){
      title
      isPublished
      userEmail
      slug
      remotes{
        name
      }
      applyUrl
      cities {
        name
      }
      countries{
        name
        }
      company {
        name
        slug
      }
      description
      postedAt
    }
  }
`;
export default function JobDetail(props) {
  let { jobSlug } = props.match.params;
  let { companySlug } = props.match.params;
  console.log(companySlug, jobSlug);
  const { loading, error, data } = useQuery(JOB_QUERY, {
    variables: { jobSlug: jobSlug, companySlug: companySlug },
  });
  if (loading) return <p>Loading...</p>
  const { job } = data;
  console.log(data);
  return (
    <div className="row justify-content-center p-3">
      <div className="col-md-7">
        <div className="card full-width">
          <div className="card-body full-width">
            <h5 className="card-title">{job.title} <span className="badge  badge-success">{job.isPublished ? 'Published' : 'Not Published'}</span></h5>
            {
              job.userEmail ? <h6 className="card-subtitle mb-2 text-muted">Created by {job.userEmail}</h6>
                : null
            }
            {job.company ? <h6 className="card-subtitle mb-2 text-muted">Company: {job.company.name}</h6> : null}
            {job.countries.length ? <h6 className="card-subtitle mb-2 text-muted">Countries: {job.countries.map(el => { return el.name + ', ' })}</h6> : null}
            {job.cities.length ? <h6 className="card-subtitle mb-2 text-muted">Cities: {job.cities.map(el => { return el.name + ', ' })}</h6> : null}
            <a href={job.applyUrl} target="_blank" className="btn btn-primary mr-2">Apply here</a>
            <h3 className="mt-3">Description</h3>
            <p className="mt-3">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
