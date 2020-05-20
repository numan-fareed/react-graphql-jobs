import React from 'react'
import { Link } from 'react-router-dom'
export default function JobCard(props) {
    const job = props.job;
    return (
        <div key={job.id} className="col-md-7 m-3">
            <div className="card full-width">
                <div className="card-body full-width">
                    <h5 className="card-title">{job.title} <span className="badge  badge-success">{job.isPublished ? 'Published' : 'Not Published'}</span></h5>
                    {
                        job.userEmail ? <h6 className="card-subtitle mb-2 text-muted">Created by {job.userEmail}</h6>
                            : ''
                    }
                    {job.company ? <h6 className="card-subtitle mb-2 text-muted">Company: {job.company.name}</h6> : null}
                    <p className="card-text giveMeEllipsis">{job.description}</p>
                    <a href={job.applyUrl} target="_blank" className="btn btn-primary mr-2">Apply here</a>
                    <Link to={`/job/${job.slug}/${job.company.slug}`} className="btn btn-secondary">View Details</Link>
                </div>
            </div>
        </div>
    )
}
